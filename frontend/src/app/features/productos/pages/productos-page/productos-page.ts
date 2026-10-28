import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { SearchBox } from '../../../../shared/components/search-box/search-box';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { UbicacionForm } from '../../components/ubicacion-form/ubicacion-form';
import { Producto, Ubicacion } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos-page',
  imports: [SearchBox, ProductoCard, UbicacionForm],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.scss',
})
export class ProductosPage implements OnInit {
  servicio = inject(ProductosService);

  buscar = signal('');
  categoria = signal('');
  soloSinUbicacion = signal(false);

  productoEditando = signal<Producto | null>(null);
  guardando = signal(false);
  errorGuardar = signal<string | null>(null);

  productosVisibles = computed(() => {
    const lista = this.servicio.productos();
    return this.soloSinUbicacion()
      ? lista.filter((p) => p.ubicacion.zona === 'Sin asignar')
      : lista;
  });

  ngOnInit() {
    this.cargar();
    this.servicio.cargarCategorias();
    this.servicio.cargarZonas();
  }

  cambiarBusqueda(texto: string) {
    this.buscar.set(texto);
    this.cargar();
  }

  cambiarCategoria(categoria: string) {
    this.categoria.set(this.categoria() === categoria ? '' : categoria);
    this.cargar();
  }

  abrirMover(producto: Producto) {
    this.errorGuardar.set(null);
    this.productoEditando.set(producto);
  }

  cerrarMover() {
    this.productoEditando.set(null);
  }

  guardarUbicacion(ubicacion: Ubicacion) {
    const producto = this.productoEditando();
    if (!producto) return;

    this.guardando.set(true);
    this.errorGuardar.set(null);

    this.servicio.moverProducto(producto.id, ubicacion).subscribe({
      next: () => {
        this.guardando.set(false);
        this.cerrarMover();
      },
      error: () => {
        this.guardando.set(false);
        this.errorGuardar.set('No se pudo guardar. Revisa que el servidor esté encendido.');
      },
    });
  }

  private cargar() {
    this.servicio.cargarProductos({
      categoria: this.categoria() || undefined,
      buscar: this.buscar() || undefined,
    });
  }
}
