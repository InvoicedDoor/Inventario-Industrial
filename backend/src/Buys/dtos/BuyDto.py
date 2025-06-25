from pydantic import BaseModel, Field
from typing import Optional

class BuyDto(BaseModel):
    user_id: int = Field(..., description="Unique identifier for the user who made the buy order")
    product_id: Optional[int] = Field(None, description="Unique identifier for the product being bought")
    product_name: Optional[str] = Field(None, description="Name of the product being bought")
    type_of_product_id: int = Field(..., description="Unique identifier for the type of product")
    quantity: int = Field(..., description="Quantity of the product being bought")
    metric_unit_id: int = Field(..., description="Unique identifier for the metric unit of the product")
    status_id: int = Field(..., description="Status of the buy order")