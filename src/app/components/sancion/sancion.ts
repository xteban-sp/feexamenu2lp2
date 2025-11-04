import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Header } from '../header/header';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sancion } from '../../models/sancion';
import { Cliente } from '../../models/cliente';
import { SancionService } from '../../services/sancion';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-sancion',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './sancion.html',
  styleUrls: ['./sancion.css'],
})
export class SancionComponent {
  private fb = inject(FormBuilder);
  private sancionService = inject(SancionService);
  private clienteService = inject(ClienteService);

  sanciones: Sancion[] = [];
  listaClientes: Cliente[] = [];
  tituloModal = 'Nueva Sanción';
  editId: number | null = null;

  // ✅ Inicializa idCliente como "null as number | null"
  form = this.fb.group({
    idCliente: [null as number | null, [Validators.required]],
    tipoSancion: ['', [Validators.required, Validators.minLength(3)]],
    nroDiasSancion: [1, [Validators.required, Validators.min(1)]],
  });

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private bsModal: any;

  ngOnInit() {
    this.listar();
    this.clienteService.listar().subscribe(x => this.listaClientes = x);
  }

  listar() {
    this.sancionService.listar().subscribe(x => this.sanciones = x);
  }

  abrirNuevo() {
    this.tituloModal = 'Nueva Sanción';
    this.editId = null;
    this.form.reset({ nroDiasSancion: 1 });
    this.showModal();
  }

  abrirEditar(s: Sancion) {
    this.tituloModal = 'Editar Sanción';
    this.editId = s.idSancion!;
    this.form.patchValue({
      idCliente: s.idCliente ?? null,
      tipoSancion: s.tipoSancion ?? '',
      nroDiasSancion: s.nroDiasSancion ?? 1,
    });
    this.showModal();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar sanción?')) {
      this.sancionService.eliminar(id).subscribe(() => this.listar());
    }
  }

  guardar() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const dto: Sancion = {
      idSancion: this.editId ?? undefined,
      idCliente: v.idCliente!,
      tipoSancion: v.tipoSancion!,
      nroDiasSancion: v.nroDiasSancion!,
    };
    const obs = this.editId
      ? this.sancionService.actualizar(this.editId, dto)
      : this.sancionService.crear(dto);
    obs.subscribe({
      next: () => {
        this.hideModal();
        this.listar();
      },
    });
  }

  private showModal() {
    // @ts-ignore
    this.bsModal = new bootstrap.Modal(this.modalRef.nativeElement);
    this.bsModal.show();
  }

  private hideModal() {
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }
}