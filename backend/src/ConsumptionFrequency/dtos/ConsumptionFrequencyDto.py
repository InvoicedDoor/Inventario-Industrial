from pydantic import BaseModel,  Field
from typing import Optional

class ConsumptionFrequencyDto(BaseModel):
    frequency: Optional[str] = Field(default=None, description="Key to recognice the consumption frequency")