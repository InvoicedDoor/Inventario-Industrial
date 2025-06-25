from pydantic import BaseModel,  Field

class ConsumptionFrequencyDto(BaseModel):
    frequency: str = Field(..., description="Key to recognice the consumption frequency")