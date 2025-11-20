from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.DBConnection.DBConnect import engine
from src.Utilities.models.RepoResponse import RepoResponse
from ..models.EmployeesModel import EmployeesModel
from ..dtos.EmployeesDto import EmployeesDto

def get_employees(filters: EmployeesModel):
    try:
        with Session(engine) as session:
            query = select(EmployeesModel)

            annotations = EmployeesModel.__annotations__
            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(EmployeesModel, field)
                
                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)
                
            results = session.exec(query)

            elements = results.all()
            
            return RepoResponse(data=elements, message="Success")

    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def get_employee_by_id(employee_id: int):
    try:
        with Session(engine) as session:
            results = session.get(EmployeesModel, employee_id)

            if results is None:
                return RepoResponse(False, "No se encontró el empleado")
            
            return RepoResponse(message="Correcto", data=results)
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def add_employee(employee: EmployeesDto):
    try:
        with Session(engine) as session:
            new_employee = EmployeesModel(
                name=employee.name,
                rol_id=employee.rol)
            session.add(new_employee)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Empleado agregado")
            
            session.rollback()
            return RepoResponse(False, "El empleado ya está agregado en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def modify_employee(employee: EmployeesModel):
    try:
        with Session(engine) as session:
            result = session.merge(employee)

            if result is not None:
                session.commit()
                return RepoResponse(message="Empleado modificado", data=result)
            
            session.rollback()
            return RepoResponse(False, "No se pudo modificar al empleado")
    
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")