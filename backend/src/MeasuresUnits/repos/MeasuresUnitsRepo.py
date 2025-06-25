from sqlmodel import Session, select
from src.Utilities.DBConnection.DBConnect import engine
from ..models.MeasureUnitsModel import MeasureUnitsModel
from ..dtos.MeasureUnitsDto import MeasureUnitsDto
from src.Utilities.models.RepoResponse import RepoResponse

def get_measure_units(filters: MeasureUnitsModel):
    try:
        with Session(engine) as session:
            query = select(MeasureUnitsModel)

            for field, value in filters.model_dump(exclude_none=True).items():
                query = query.where(getattr(MeasureUnitsModel, field) == value)

            results = session.exec(query)
            elements = results.all()

            return RepoResponse(data=elements, message="Success")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    
def get_measure_unit_by_id(id: int):
    try:
        with Session(engine) as session:
            results = session.get(MeasureUnitsModel, id)

            if results is None:
                return RepoResponse(False, "No se encontró el elemento")
            
            return RepoResponse(message="Correcto", data=results)
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")

def add_measure_unit(unit: MeasureUnitsDto):
    try:
        new_unit = MeasureUnitsModel(unit=unit.unit.lower())
        with Session(engine) as session:
            session.add(new_unit)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Elemento agregado",data=len(session.new))
            session.rollback()
            return RepoResponse(False, "El elemento ya existe en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")

def modify_measure_unit(unit: MeasureUnitsModel):
    try:
        with Session(engine) as session:
            result = session.merge(unit)

            if result is not None:
                session.commit()
                return RepoResponse(message="Elemento modificado", data=result)

            session.rollback()
            return RepoResponse(False, "No se pudo modificar el elemento")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")