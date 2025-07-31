from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from ..dtos.ConsumptionFrequencyDto import ConsumptionFrequencyDto
from ..models.ConsumptionFrequencyModel import ConsumptionFrequencyModel
from src.Utilities.DBConnection.DBConnect import engine
from src.Utilities.models.RepoResponse import RepoResponse

def get_consumption_frequencies(filters: ConsumptionFrequencyDto):
    try:
        with Session(engine) as session:
            query = select(ConsumptionFrequencyModel)

            annotations = ConsumptionFrequencyModel.__annotations__

            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(ConsumptionFrequencyModel, field)

                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)

            results = session.exec(query)

            elements = results.all()

            return RepoResponse(data=elements, message="Success")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def get_consumption_frequency_by_id(frequency_id: int):
    try:
        with Session(engine) as session:
            results = session.get(ConsumptionFrequencyModel, frequency_id)

            if results is None:
                return RepoResponse(False, "No se encontró la frequencia")
            
            return RepoResponse(message="Correcto", data=results)
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def add_consumption_frequency(consumption_frequency: ConsumptionFrequencyDto):
    try:
        new_frequency: ConsumptionFrequencyModel = ConsumptionFrequencyModel(**consumption_frequency.model_dump())
        with Session(engine) as session:
            session.add(new_frequency)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Frecuencia agregada")
            
            session.rollback()
            return RepoResponse(False, "El elemento no se puede agregar")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def modify_consumption_frequency(frequency: ConsumptionFrequencyModel):
    try:
        with Session(engine) as session:
            result = session.merge(frequency)

            if result is not None:
                session.commit()
                return RepoResponse(message="Elemento modificado", data=result)
            
            session.rollback()
            return RepoResponse(message="El elemento no se pudo modificar")
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")