from sqlmodel import Field, SQLModel
from datetime import datetime

class IntakesModel(SQLModel, table=True):
    __tablename__ = "Intakes"
    id: int = Field(...)
    intake_type_id: int = Field(...)
    product_id: int = Field(...)
    consumer_id: int = Field(...)
    quantity: float = Field(...)
    unit_id: int = Field(...)
    date: datetime = Field(...)
    status_id: int = Field(...)
    active: bool = Field(...)