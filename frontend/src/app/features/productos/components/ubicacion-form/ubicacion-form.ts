import { Component, input, linkedSignal, output } from '@angular/core';

import { Producto, Ubicacion } from '../../models/producto.model';

@Component({
  selector: 'app-ubicacion-form',
  imports: [],
  templateUrl: './ubicacion-form.html',
  styleUrl: './ubicacion-form.scss',
})
export class UbicacionForm {
  producto = input.required<Producto>();
  zonas = input<string[]>([]);
  guardando = input(false);
  error = input<string | null>(null);

  guardar = output<Ubicacion>();
  cancelar = output<void>();

  zona = linkedSignal(() => {
    const actual = this.producto().ubicacion.zona;
    return actual === 'Sin asignar' ? '' : actual;
  });
  estante = linkedSignal(() => this.producto().ubicacion.estante);

  zonasSugeridas() {
    return this.zonas().filter((z) => z !== 'Sin asignar');
  }

  cambiarEstante(valor: string) {
    const numero = Number(valor);
    this.estante.set(valor && numero >= 1 ? numero : null);
  }

  enviar(evento: Event) {
    evento.preventDefault();
    const zona = this.zona().trim();
    if (!zona) return;
    this.guardar.emit({ zona, estante: this.estante() });
  }
}
