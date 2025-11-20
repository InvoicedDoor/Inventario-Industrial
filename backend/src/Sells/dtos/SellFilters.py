from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from ..models.SellModel import SellModel

class SellFilters(BaseModel):
    consumer: Optional[int] = Field(None, description="User who made the sell order")
    product: Optional[int] | None = Field(None, description="Product being sold")
    intake_type: Optional[int] | None = Field(None, description="Identifier of buller")
    quantity: Optional[int] = Field(None, description="Quantity of the product being sold")
    date: Optional[datetime] = Field(None)
    metric_unit: Optional[int] = Field(None, description="Metric unit of the product")
    pay_status: Optional[int] = Field(None, description="Status of the sell order")
    status: Optional[bool] = Field(None, description="Status of the sell order")

    def dto_to_model(self):
        return SellModel(
            user_id=self.consumer,
            product_id=self.product,
            type_of_product_id=self.intake_type,
            quantity=self.quantity,
            created_at=self.date,
            metric_unit_id=self.metric_unit,
            status_id=self.pay_status,
            status=self.status)