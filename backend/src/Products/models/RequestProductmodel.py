from pydantic import BaseModel

class RequestProductsModel(BaseModel):
    name: str
    unit: int
    frequency: int
    stock: float
    min_stock: float
    max_stock: float
    active: bool