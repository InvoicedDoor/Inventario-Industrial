from pydantic import BaseModel, Field
from typing import Optional

class RolesDto(BaseModel):
    rol: Optional[str] = Field(default=None)