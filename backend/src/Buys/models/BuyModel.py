from sqlmodel import Field, SQLModel

class BuyModel(SQLModel, table=True):
    __tablename__ = "buys"
    id: int = Field(..., description="Unique identifier for the buy order", primary_key=True)
    user_id: int = Field(..., description="Unique identifier for the user who made the buy order")
    product_id: int | None = Field(..., description="Unique identifier for the product being bought")
    type_of_product_id: int | None = Field(..., description="Unique identifier for the type of product")
    quantity: int = Field(..., description="Quantity of the product being bought")
    metric_unit_id: int = Field(..., description="Unique identifier for the metric unit of the product")
    status_id: int = Field(..., description="Status of the buy order")
    created_at: str = Field(..., description="Timestamp when the buy order was created")