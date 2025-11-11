import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css'],
})
export class ClienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  tituloModal = 'Nuevo Cliente';
  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    telefono: ['', [Validators.required, Validators.maxLength(11)]],
    email: ['', [Validators.required, Validators.email]],
    direccion: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    fechaInscripcion: ['', [Validators.required]],
    temaInteres: ['', [Validators.required]],
  });

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private bsModal: any;
  editId: number | null = null;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.clienteService.listar().subscribe((response) => (this.clientes = response));
  }

  abrirEditar(cliente: Cliente) {
    this.tituloModal = 'Editar Cliente';
    this.editId = cliente.idCliente!;
    this.form.patchValue({
      nombre: cliente.nombre,
      dni: cliente.dni,
      telefono: cliente.telefono,
      email: cliente.email,
      direccion: cliente.direccion,
      fechaNacimiento: cliente.fechaNacimiento,
      fechaInscripcion: cliente.fechaInscripcion,
      temaInteres: cliente.temaInteres,
    });
    this.showModal();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar cliente?')) {
      this.clienteService.eliminar(id).subscribe(() => this.listar());
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const dto: Cliente = {
      idCliente: this.editId || undefined,
      nombre: this.form.value.nombre!,
      dni: this.form.value.dni!,
      telefono: this.form.value.telefono!,
      email: this.form.value.email!,
      direccion: this.form.value.direccion!,
      fechaNacimiento: this.form.value.fechaNacimiento!,
      fechaInscripcion: this.form.value.fechaInscripcion!,
      temaInteres: this.form.value.temaInteres!,
    };

    const obs = this.editId
      ? this.clienteService.actualizar(this.editId, dto)
      : this.clienteService.crear(dto);

    obs.subscribe({
      next: () => {
        this.hideModal();
        this.listar();
      },
      error: (err) => {
        console.error('Error al guardar cliente:', err);
        alert('Error al guardar el cliente. Revise los datos únicos (DNI, teléfono, email).');
      },
    });
  }

  abrirNuevo() {
    this.tituloModal = 'Nuevo Cliente';
    this.editId = null;
    this.form.reset({
      nombre: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: '',
      fechaNacimiento: '',
      fechaInscripcion: '',
      temaInteres: '',
    });
    this.showModal();
  }

  private showModal() {
    const m = this.modalRef.nativeElement;
    // @ts-ignore
    this.bsModal = new bootstrap.Modal(m);
    this.bsModal.show();
  }

  private hideModal() {
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }
}