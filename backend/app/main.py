from fastapi import FastAPI

from app.core.cors import configurar_cors
from app.routes.productos_routes import router as productos_router

app = FastAPI(
    title="API El Alba Abarrotes",
    description="Consulta de precios, existencias y ubicación de productos.",
    version="1.0.0",
)

configurar_cors(app)

app.include_router(productos_router, prefix="/productos", tags=["Productos"])


@app.get("/")
def inicio():
    return {"mensaje": "API de El Alba funcionando correctamente"}