from sqlmodel import Field, SQLModel
from ..dtos.EmployeesDto import EmployeesDto

class EmployeesModel(SQLModel, table=True):
    __tablename__ = "Employees"
    id: int = Field(..., primary_key=True)
    name: str = Field(...)
    rol_id: int = Field(...)

    def dto_to_model(self, dto: EmployeesDto):
        self.name = dto.name
        self.rol_id = dto.rol
        return self