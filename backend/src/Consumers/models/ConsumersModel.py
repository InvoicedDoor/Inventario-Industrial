from sqlmodel import SQLModel, Field

class ConsumersModel(SQLModel, table=True):
    __tablename__ = "Consumers"
    id: int = Field(..., primary_key=True)
    name: str = Field(...)
