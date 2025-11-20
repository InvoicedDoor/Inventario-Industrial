from pydantic import BaseModel, Field
from typing import Optional

class EmployeesDto(BaseModel):
    name: str = Field(...)
    rol: Optional[int] = Field(None)