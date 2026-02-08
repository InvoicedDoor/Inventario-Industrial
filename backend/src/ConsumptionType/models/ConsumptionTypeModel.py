from sqlmodel import Field, SQLModel

class ConsumptionTypeModel(SQLModel, table=True):
    __tablename__ = "ConsumptionType"
    id: int = Field(..., primary_key=True)
    consumption_type: str = Field(...)