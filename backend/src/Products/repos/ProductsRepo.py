from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.DBConnection.DBConnect import engine
from src.Utilities.models.RepoResponse import RepoResponse
from ..models.ProductsModel import ProductsModel
from ..models.ResponseProductModel import ResponseProductsModel
from ..dtos.ProductDto import ProductDto

def get_products(filters: ProductsModel):
    try:
        with Session(engine) as session:
            query = select(ProductsModel)

            annotations = ProductsModel.__annotations__
            for field, value in filters.model_dump(exclude_none=True).items():
                column: InstrumentedAttribute = getattr(ProductsModel, field)
                
                if annotations.get(field) == str:
                    query = query.where(column.like(f"%{value}%"))
                else:
                    query = query.where(column == value)
                
            results = session.exec(query)

            elements = results.all()

            newModel = [
                ResponseProductsModel(
                    id=product.id,
                    name=product.name,
                    unit=product.measureunit_id,
                    frequency=product.frequency_id,
                    stock=product.stock,
                    min_stock=product.min_stock,
                    max_stock=product.max_stock,
                    active=product.active
                )
                for product in elements]
            
            return RepoResponse(data=newModel, message="Success")

    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def get_product_by_id(product_id: int):
    try:
        with Session(engine) as session:
            results = session.get(ProductsModel, product_id)

            if results is None:
                return RepoResponse(False, "No se encontró el producto")
            
            return RepoResponse(message="Correcto", data=results)
        
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")
    

def add_product(product: ProductDto):
    try:
        with Session(engine) as session:
            new_product = ProductsModel(**product.model_dump())
            session.add(new_product)

            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Producto agregado")
            
            session.rollback()
            return RepoResponse(False, "El producto ya está agregado en la base de datos")
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")


def modify_product(product: ProductsModel):
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