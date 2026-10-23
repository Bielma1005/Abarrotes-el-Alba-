from fastapi import APIRouter, Query

from app.controllers import productos_controller
from app.models.producto_model import Producto, Seccion, UbicacionUpdate

router = APIRouter()


@router.get("/", response_model=list[Producto])
def obtener_productos(
    seccion: Seccion | None = Query(None, description="Filtrar por sección"),
    categoria: str | None = Query(None, description="Filtrar por categoría"),
    buscar: str | None = Query(None, description="Buscar por nombre, marca o presentación"),
):
    return productos_controller.listar_productos(seccion, categoria, buscar)


@router.get("/categorias", response_model=list[str])
def obtener_categorias(seccion: Seccion | None = None):
    return productos_controller.listar_categorias(seccion)


@router.get("/zonas", response_model=list[str])
def obtener_zonas():
    return productos_controller.listar_zonas()


@router.get("/{producto_id}", response_model=Producto)
def obtener_producto(producto_id: int):
    return productos_controller.buscar_producto(producto_id)


@router.put("/{producto_id}/ubicacion", response_model=Producto)
def cambiar_ubicacion(producto_id: int, datos: UbicacionUpdate):
    return productos_controller.mover_producto(producto_id, datos)