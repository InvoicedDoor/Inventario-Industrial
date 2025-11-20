from pydantic import BaseModel

class ResponseProductsModel(BaseModel):
    id: int
    name: str
    unit: int | None
    frequency: int | None
    stock: float | None
    min_stock: float | None
    max_stock: float | None
    active: bool | None