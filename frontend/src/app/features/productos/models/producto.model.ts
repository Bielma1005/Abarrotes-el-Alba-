export type Seccion = 'abarrotes' | 'ferreteria' | 'ropa' | 'mezcal' | 'tipicos';

export interface Ubicacion {
  zona: string;
  estante: number | null;
}

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  presentacion: string;
  seccion: Seccion;
  categoria: string;
  precio_venta: number;
  unidades: number;
  ubicacion: Ubicacion;
  disponible: boolean;
}

export interface FiltrosProducto {
  seccion?: Seccion;
  categoria?: string;
  buscar?: string;
}
