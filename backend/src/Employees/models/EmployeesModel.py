from sqlmodel import Field, SQLModel

class EmployeesModel(SQLModel, table=True):
    __tablename__ = "Employees"
    id: int = Field(...)
    name: str = Field(...)
    rol_id: int = Field(...)