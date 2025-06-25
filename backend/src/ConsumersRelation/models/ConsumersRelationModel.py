from sqlmodel import Field, SQLModel

class ConsumersRelation(SQLModel, table=True):
    __tablename__ = "CustomersRelation"
    id: int = Field(...)
    customer_id: int = Field(...)
    employee_id: int = Field(...)