from pydantic import BaseModel, Field
from typing import Optional

class ResponseEmployeeDto(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    rol: int = Field(...)