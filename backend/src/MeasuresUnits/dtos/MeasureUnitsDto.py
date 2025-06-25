from pydantic import Field, BaseModel

class MeasureUnitsDto(BaseModel):
    unit: str = Field(...)