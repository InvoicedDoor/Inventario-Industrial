from sqlmodel import Field, SQLModel

class IntakesTypeModel(SQLModel, table=True):
    __tablename__ = "IntakeType"
    id: int = Field(..., primary_key=True)
    intake_type: str = Field(...)