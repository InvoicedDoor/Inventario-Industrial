from pydantic import BaseModel, Field
from typing import Optional

class ProductDto(BaseModel):
    name: Optional[str] = Field(default=None)
    unit: Optional[int] = Field(default=None)
    frequency: Optional[int] = Field(default=None)
    stock: Optional[float] = Field(default=None)
    min_stock: Optional[float] = Field(default=None)
    max_stock: Optional[float] = Field(default=None)
    active: Optional[bool | int] = Field(default=None)