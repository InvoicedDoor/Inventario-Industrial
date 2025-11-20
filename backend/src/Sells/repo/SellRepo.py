from sqlmodel import Session, select
from sqlalchemy.orm.attributes import InstrumentedAttribute
from src.Utilities.models.RepoResponse import RepoResponse
from src.Utilities.DBConnection.DBConnect import engine
from src.Sells.dtos.SellDto import SellDto
from ..models.SellModel import SellModel
from ..dtos.SellDto import SellDto

def get_sells_repo(filters: SellDto):
    try:
        with Session(engine) as session:
            # Base query: seleccionar todas las ventas
            query = select(SellModel)
            
            # Convertir el DTO a diccionario y quitar los valores nulos o vacíos
            conditions = {k: v for k, v in filters.dict().items() if v not in (None, "", 0)}

            # Si hay filtros, los agregamos dinámicamente
            for key, value in conditions.items():
                # Evitar errores si el campo no existe en el modelo
                if hasattr(SellModel, key):
                    query = query.where(getattr(SellModel, key) == value)

            # Ejecutar la consulta
            sells = session.exec(query).all()

            if not sells:
                return RepoResponse(False, "No se encontraron ventas.", [])
            
            return RepoResponse(message="Ventas encontradas.", data=sells)
    except Exception as ex:
        return RepoResponse(False, f"Error en el servidor: {ex}")


def get_sell_by_id_repo(id: int):
    try:
        with Session(engine) as session:
            results = session.get(SellModel, id)

            if results is None:
                return RepoResponse(False, "No se encontró la venta")
            
            return RepoResponse(message="Correcto", data=results)
    except Exception as ex:
        return RepoResponse(False, f"Error: {ex}")

def make_sell_repo(sell: SellDto):
    try:
        with Session(engine) as session:
            new_sell = sell.dto_to_model()
            session.add(new_sell)
            
            if len(session.new) > 0:
                session.commit()
                return RepoResponse(message="Venta consumada.")
            
            session.rollback()
            return RepoResponse(False, "No se pudo consumar la compra.")
    except Exception as ex:
        return RepoResponse(False, "Ocurrió un error al consumar la venta.")

def modify_sell_repo(updated_sell: SellModel):
    try:
        with Session(engine) as session:
            
            result = session.merge(updated_sell)

            if result is not None:
                session.commit()
                return RepoResponse(message="Venta modificada")
            
            return RepoResponse(False, "No se pudo modificar la venta")
    except Exception as ex:
        RepoResponse(False, f"Error: {ex}")

def cancell_sell_repo(id: int):
    try:
        pass
    except:
        pass