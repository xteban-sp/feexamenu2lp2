import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sancion } from '../models/sancion';

@Injectable({
  providedIn: 'root',
})
export class SancionService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/v1/sanciones';

  listar(): Observable<Sancion[]> {
    return this.http.get<Sancion[]>(this.base);
  }

  obtener(id: number): Observable<Sancion> {
    return this.http.get<Sancion>(`${this.base}/${id}`);
  }

  crear(dto: Sancion): Observable<Sancion> {
    return this.http.post<Sancion>(this.base, dto);
  }

  actualizar(id: number, dto: Sancion): Observable<Sancion> {
    return this.http.put<Sancion>(`${this.base}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}