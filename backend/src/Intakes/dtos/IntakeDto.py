from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from ..models.IntakesModel import IntakesModel

class IntakeDto(BaseModel):
    id: Optional[int] = Field(None)
    intake_type: int = Field(...)
    product: int = Field(...)
    provider: int = Field(...)
    quantity: float = Field(...)
    unit: int = Field(...)
    date: datetime = Field(...)
    pay_status: int = Field(...)
    status: Optional[bool] = Field(...)

    def dto_to_model(self):
        return IntakesModel(
            intake_type_id=self.intake_type,
            product_id=self.product,
            provider_id=self.provider,
            quantity=self.quantity,
            unit_id=self.unit,
            date=self.date,
            status_id=self.pay_status,
            active=self.status
        )