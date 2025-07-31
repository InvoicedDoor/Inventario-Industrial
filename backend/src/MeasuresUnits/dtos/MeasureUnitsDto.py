from pydantic import Field, BaseModel
from typing import Optional

class MeasureUnitsDto(BaseModel):
    unit: Optional[str] = Field(default=None)