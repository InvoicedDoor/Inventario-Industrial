from pydantic import BaseModel, Field
from typing import Optional

class ProductDto(BaseModel):
    name: Optional[str] = Field(default=None)
    measureunit_id: Optional[int] = Field(default=None)
    frequency_id: Optional[int] = Field(default=None)
    stock: Optional[float] = Field(default=None)
    min_stock: Optional[float] = Field(default=None)
    max_stock: Optional[float] = Field(default=None)
    active: Optional[bool | int] = Field(default=None)