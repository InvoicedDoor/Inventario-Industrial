from sqlmodel import Session, Field, SQLModel
from typing import Optional
from src.Utilities.DBConnection.DBConnect import engine

class SellModel(SQLModel, table=True):
    __tablename__ = "Sells"
    id: int = Field(..., description="Unique identifier for the sell order", primary_key=True)
    user_id: int = Field(..., description="Unique identifier for the user who made the sell order")
    product_id: int = Field(..., description="Unique identifier for the product being sold")
    type_of_product_id: int = Field(..., description="Unique identifier for the type of product")
    quantity: int = Field(..., description="Quantity of the product being sold")
    metric_unit_id: Optional[int] = Field(None, description="Unique identifier for the metric unit of the product")
    status_id: Optional[int] = Field(None, description="Status of the sell order")
    created_at: str = Field(..., description="Timestamp when the sell order was created")
    status: Optional[bool] = Field(None)
    