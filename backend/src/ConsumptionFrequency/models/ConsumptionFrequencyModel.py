from sqlmodel import Field, SQLModel

class ConsumptionFrequencyModel(SQLModel, table=True):
    __tablename__ = "ConsumptionFrequency"
    id: int = Field(..., description="Identifier of consumtion frequency table")
    frequency: str = Field(..., description="Key to recognice the consumption frequency")