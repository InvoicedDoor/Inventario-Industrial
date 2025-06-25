from sqlmodel import Field, SQLModel

class RolesModel(SQLModel, table=True):
    __tablename__ = "Roles"
    id: int = Field(...)
    rol: str = Field(...)