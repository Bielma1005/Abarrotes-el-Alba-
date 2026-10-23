from app.models.producto_model import Producto, Seccion, UbicacionUpdate
from app.services import productos_service


def listar_productos(
    seccion: Seccion | None,
    categoria: str | None,
    buscar: str | None,
) -> list[Producto]:
    return productos_service.obtener_productos(seccion, categoria, buscar)


def buscar_producto(producto_id: int) -> Producto:
    return productos_service.obtener_producto_por_id(producto_id)


def mover_producto(producto_id: int, datos: UbicacionUpdate) -> Producto:
    return productos_service.actualizar_ubicacion(producto_id, datos)


def listar_categorias(seccion: Seccion | None) -> list[str]:
    return productos_service.obtener_categorias(seccion)


def listar_zonas() -> list[str]:
    return productos_service.obtener_zonas()