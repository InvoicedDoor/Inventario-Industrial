from pydantic import BaseModel, Field
from typing import Optional

class IntakeTypeDto(BaseModel):
    intake_type: Optional[str] = Field(default=None)