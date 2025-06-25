from sqlmodel import Field, SQLModel

class IntakesTypeModel(SQLModel, table=True):
    __tablename__ = "IntakeType"
    id: int = Field(...)
    intake_type: str = Field(...)