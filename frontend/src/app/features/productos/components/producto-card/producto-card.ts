import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss',
})
export class ProductoCard {
  producto = input.required<Producto>();
  mover = output<Producto>();

  sinUbicacion = computed(() => this.producto().ubicacion.zona === 'Sin asignar');

  estadoStock = computed(() => {
    const unidades = this.producto().unidades;
    if (unidades === 0) return { texto: 'Agotado', clase: 'agotado' };
    if (unidades <= 3) return { texto: 'Últimas piezas', clase: 'pocas' };
    return { texto: 'Disponible', clase: 'disponible' };
  });
}
