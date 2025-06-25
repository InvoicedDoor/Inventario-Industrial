from sqlmodel import Session, Field, SQLModel
from src.Utilities.DBConnection.DBConnect import engine

class SellModel(SQLModel, table=True):
    id: int = Field(..., description="Unique identifier for the sell order", primary_key=True)
    user_id: int = Field(..., description="Unique identifier for the user who made the sell order")
    product_id: int | None = Field(..., description="Unique identifier for the product being sold")
    type_of_product_id: int | None = Field(..., description="Unique identifier for the type of product")
    quantity: int = Field(..., description="Quantity of the product being sold")
    metric_unit_id: int = Field(..., description="Unique identifier for the metric unit of the product")
    status_id: int = Field(..., description="Status of the sell order")
    created_at: str = Field(..., description="Timestamp when the sell order was created")