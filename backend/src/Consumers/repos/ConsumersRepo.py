from sqlmodel import Session, select
from sqlalchemy import String
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.DBConnection.DBConnect import engine
from ..models.ConsumersModel import ConsumersModel
from ..dtos.ConsumersDtos import ConsumersDto
from src.Utilities.models.RepoResponse import RepoResponse

def get_consumers(filters: ConsumersModel):
    try:
        with Session(engine) as session:
            query = select(ConsumersModel)

            annotations = ConsumersModel.__annotations__
            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(ConsumersModel, field)

                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)

            results = session.exec(query)

            elements = results.all()
            
            return RepoResponse(data=elements, message="Success")
        
    except Exception as ex:
        print(ex)
        return RepoResponse(False, f"Error: {ex}")


def get_consumer_by_id(id: int):
    try:
        with Session(engine) as session:    
            results = session.get(ConsumersModel, id)

            if results is None:
                return RepoResponse(False, "No se encontró el consumidor")
            
            return RepoResponse(message="Correcto", data=results)
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    


def add_consumer(consumer: ConsumersModel):
    try:
        new_consumer = ConsumersModel(name=consumer.name)
        with Session(engine) as session:
            session.add(new_consumer)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Consumidor agregado")
            session.rollback()
            return RepoResponse(False, "El elemento ya existe en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    
    
def modify_consumer(consumer: ConsumersModel):
    try:
        with Session(engine) as session:
            result = session.merge(consumer)

            if result is not None:
                session.commit()
                return RepoResponse(message="Elemento modificado", data=result)
            
            session.rollback()
            return RepoResponse(False, "No se pudo modificar el elemento")

    except Exception as ex: 
        return RepoResponse(False, f"Error: {ex}")