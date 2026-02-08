from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.DBConnection.DBConnect import engine
from src.Utilities.models.RepoResponse import RepoResponse
from ..models.ConsumptionTypeModel import ConsumptionTypeModel
from ..dtos.ConsumptionTypeDto import IntakeTypeDto

def get_intake_types(filters: ConsumptionTypeModel):
    try:
        with Session(engine) as session:
            query = select(ConsumptionTypeModel)

            annotations = ConsumptionTypeModel.__annotations__
            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(ConsumptionTypeModel, field)
                
                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)
                
            results = session.exec(query)

            elements = results.all()
            
            return RepoResponse(data=elements, message="Success")

    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def get_intake_type_by_id(product_id: int):
    try:
        with Session(engine) as session:
            results = session.get(ConsumptionTypeModel, product_id)

            if results is None:
                return RepoResponse(False, "No se encontró el producto")
            
            return RepoResponse(message="Correcto", data=results)
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def add_intake_type(product: IntakeTypeDto):
    try:
        with Session(engine) as session:
            new_product = ConsumptionTypeModel(**product.model_dump())
            session.add(new_product)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Producto agregado")
            
            session.rollback()
            return RepoResponse(False, "El producto ya está agregado en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def modify_intake_type(product: ConsumptionTypeModel):
    try:
        with Session(engine) as session:
            result = session.merge(product)

            if result is not None:
                session.commit()
                return RepoResponse(message="Producto modificado", data=result)
            
            session.rollback()
            return RepoResponse(False, "No se pudo modificar el producto")
    
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")