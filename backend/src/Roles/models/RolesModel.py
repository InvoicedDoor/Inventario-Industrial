from sqlmodel import Field, SQLModel

class RolesModel(SQLModel, table=True):
    __tablename__ = "Roles"
    id: int = Field(..., primary_key=True)
    rol: str = Field(...)