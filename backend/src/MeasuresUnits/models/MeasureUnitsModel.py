from sqlmodel import Field, SQLModel

class MeasureUnitsModel(SQLModel, table=True):
    __tablename__ = "MeasuresUnits"
    id: int = Field(..., primary_key=True)
    unit: str = Field(...)