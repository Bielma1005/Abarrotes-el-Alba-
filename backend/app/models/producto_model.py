from enum import Enum
from pydantic import BaseModel, Field, computed_field


class Seccion(str, Enum):
    ABARROTES = "abarrotes"
    FERRETERIA = "ferreteria"
    ROPA = "ropa"
    MEZCAL = "mezcal"
    TIPICOS = "tipicos"


class Ubicacion(BaseModel):
    zona: str = Field(..., min_length=1, examples=["Pasillo 1"])
    estante: int | None = Field(None, ge=1, examples=[2])


class Producto(BaseModel):
    id: int
    nombre: str
    marca: str
    presentacion: str
    seccion: Seccion
    categoria: str
    precio_venta: float
    unidades: int
    ubicacion: Ubicacion

    @computed_field
    @property
    def disponible(self) -> bool:
        return self.unidades > 0


class UbicacionUpdate(Ubicacion):
    pass