import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/v1/clientes';

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.base);
  }

  obtener(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.base}/${id}`);
  }

  crear(dto: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.base, dto);
  }

  actualizar(id: number, dto: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}