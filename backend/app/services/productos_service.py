import unicodedata

from fastapi import HTTPException

from app.data.productos_data import productos_db
from app.models.producto_model import Producto, Seccion, UbicacionUpdate


def _normalizar(texto: str) -> str:
    """Pasa a minúsculas y quita acentos: 'Lácteos' -> 'lacteos'."""
    sin_acentos = unicodedata.normalize("NFD", texto)
    sin_acentos = "".join(c for c in sin_acentos if unicodedata.category(c) != "Mn")
    return sin_acentos.lower().strip()


def _buscar_registro(producto_id: int) -> dict:
    for producto in productos_db:
        if producto["id"] == producto_id:
            return producto

    raise HTTPException(status_code=404, detail="Producto no encontrado")


def obtener_productos(
    seccion: Seccion | None = None,
    categoria: str | None = None,
    buscar: str | None = None,
) -> list[Producto]:
    resultado = productos_db

    if seccion is not None:
        resultado = [p for p in resultado if p["seccion"] == seccion.value]

    if categoria:
        cat = _normalizar(categoria)
        resultado = [p for p in resultado if _normalizar(p["categoria"]) == cat]

    if buscar:
        texto = _normalizar(buscar)
        resultado = [
            p for p in resultado
            if texto in _normalizar(f'{p["nombre"]} {p["marca"]} {p["presentacion"]}')
        ]

    return [Producto(**p) for p in resultado]


def obtener_producto_por_id(producto_id: int) -> Producto:
    return Producto(**_buscar_registro(producto_id))


def actualizar_ubicacion(producto_id: int, datos: UbicacionUpdate) -> Producto:
    producto = _buscar_registro(producto_id)

    producto["ubicacion"] = {
        "zona": datos.zona.strip(),
        "estante": datos.estante,
    }

    return Producto(**producto)


def obtener_categorias(seccion: Seccion | None = None) -> list[str]:
    productos = productos_db
    if seccion is not None:
        productos = [p for p in productos if p["seccion"] == seccion.value]

    return sorted({p["categoria"] for p in productos})


def obtener_zonas() -> list[str]:
    return sorted({p["ubicacion"]["zona"] for p in productos_db})