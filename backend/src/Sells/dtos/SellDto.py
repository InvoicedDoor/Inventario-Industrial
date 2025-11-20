from pydantic import BaseModel, Field
from ..models.SellModel import SellModel
from typing import Optional
from datetime import datetime

class SellDto(BaseModel):
    id: Optional[int] = Field(None)
    product: int | None = Field(..., description="Product being sold")
    date: datetime = Field(...)
    quantity: int = Field(..., description="Quantity of the product being sold")
    consumer: int = Field(..., description="User who made the sell order")
    product_type: int | None = Field(..., description="Identifier the product consumtpion frequency")
    metric_unit: Optional[int] = Field(None, description="Metric unit of the product")
    consumption_type: Optional[int] = Field(None, description="It gives the consumption information.")
    sale_status: Optional[int] = Field(None, description="Status of the sell order")
    status: Optional[bool] = Field(None)

    def dto_to_model(self):
        return SellModel(
            user_id=self.consumer,
            product_id=self.product,
            product_type_id=self.product_type,
            quantity=self.quantity,
            created_at=self.date,
            metric_unit_id=self.metric_unit,
            status_id=self.sale_status,
            status=self.status)