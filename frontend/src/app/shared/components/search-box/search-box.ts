import { Component, input, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss',
})
export class SearchBox implements OnDestroy {
  placeholder = input('Buscar...');
  buscar = output<string>();

  private temporizador?: ReturnType<typeof setTimeout>;

  alEscribir(texto: string) {
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.buscar.emit(texto.trim()), 300);
  }

  ngOnDestroy() {
    clearTimeout(this.temporizador);
  }
}
