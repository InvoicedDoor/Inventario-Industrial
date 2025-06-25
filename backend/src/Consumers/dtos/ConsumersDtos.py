from pydantic import Field, BaseModel

class ConsumersDto(BaseModel):
    name: str