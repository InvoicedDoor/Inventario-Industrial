from sqlmodel import SQLModel, Field

class ProductsModel(SQLModel, table=True):
    __tablename__ = "Products"
    id: int = Field(..., primary_key=True)
    name: str = Field(...)
    measureunit_id: int = Field(...)
    frequency_id: int = Field(...)
    stock: float = Field(...)
    min_stock: float = Field(...)
    max_stock: float = Field(...)
    active: bool = Field(...)