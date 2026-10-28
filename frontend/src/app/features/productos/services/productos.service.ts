import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { FiltrosProducto, Producto, Ubicacion } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/productos`;

  productos = signal<Producto[]>([]);
  categorias = signal<string[]>([]);
  zonas = signal<string[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  cargarProductos(filtros: FiltrosProducto = {}) {
    let params = new HttpParams();
    if (filtros.seccion) params = params.set('seccion', filtros.seccion);
    if (filtros.categoria) params = params.set('categoria', filtros.categoria);
    if (filtros.buscar) params = params.set('buscar', filtros.buscar);

    this.cargando.set(true);
    this.error.set(null);

    this.http.get<Producto[]>(`${this.apiUrl}/`, { params }).subscribe({
      next: (respuesta) => {
        this.productos.set(respuesta);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor.');
        this.cargando.set(false);
      },
    });
  }

  cargarCategorias() {
    this.http.get<string[]>(`${this.apiUrl}/categorias`).subscribe({
      next: (respuesta) => this.categorias.set(respuesta),
    });
  }

  cargarZonas() {
    this.http.get<string[]>(`${this.apiUrl}/zonas`).subscribe({
      next: (respuesta) => this.zonas.set(respuesta),
    });
  }

  moverProducto(id: number, ubicacion: Ubicacion): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/ubicacion`, ubicacion).pipe(
      tap((actualizado) => {
        this.productos.update((lista) =>
          lista.map((p) => (p.id === actualizado.id ? actualizado : p))
        );
        this.cargarZonas();
      })
    );
  }
}
