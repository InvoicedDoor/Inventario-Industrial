from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.DBConnection.DBConnect import engine
from src.Utilities.models.RepoResponse import RepoResponse
from ..models.RolesModel import RolesModel
from ..dtos.RolesDto import RolesDto

def get_roles(filters: RolesModel):
    try:
        with Session(engine) as session:
            query = select(RolesModel)

            annotations = RolesModel.__annotations__
            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(RolesModel, field)
                
                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)
                
            results = session.exec(query)

            elements = results.all()
            
            return RepoResponse(data=elements, message="Success")

    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def get_rol_by_id(rol_id: int):
    try:
        with Session(engine) as session:
            results = session.get(RolesModel, rol_id)

            if results is None:
                return RepoResponse(False, "No se encontró el rol")
            
            return RepoResponse(message="Correcto", data=results)
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def add_rol(rol: RolesDto):
    try:
        with Session(engine) as session:
            new_rol = RolesModel(**rol.model_dump())
            session.add(new_rol)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Rol agregado")
            
            session.rollback()
            return RepoResponse(False, "El rol ya está agregado en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def modify_rol(rol: RolesModel):
    try:
        with Session(engine) as session:
            result = session.merge(rol)

            if result is not None:
                session.commit()
                return RepoResponse(message="Rol modificado", data=result)
            
            session.rollback()
            return RepoResponse(False, "No se pudo modificar el rol")
    
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")