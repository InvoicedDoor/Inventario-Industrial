from pydantic import BaseModel

class ResponseProductsModel(BaseModel):
    id: int
    name: str
    unit: int
    frequency: int
    stock: float
    min_stock: float
    max_stock: float
    active: bool