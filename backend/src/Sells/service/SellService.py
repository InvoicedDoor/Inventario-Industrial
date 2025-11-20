from ..dtos.SellDto import SellDto
from ..models.SellModel import SellModel
from ..repo.SellRepo import make_sell_repo, modify_sell_repo, get_sell_by_id_repo, get_sells_repo
from src.Products.models.ProductsModel import ProductsModel
from src.Products.repos.ProductsRepo import get_product_by_id
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_all_sells_service(filters: SellDto):
    try:
        applied_filters: SellModel = filters.dto_to_model()
        sells: list[SellModel] = get_sells_repo(applied_filters)

        if not sells.is_success:
            return ServiceResponse(409, "Error al devolver los resultados", [])
        
        sells_list: list[SellDto] = [
            SellDto(
                id=sell.id,
                product=sell.product_id,
                consumer=sell.user_id,
                intake_type=sell.type_of_product_id,
                quantity=sell.quantity,
                metric_unit=sell.metric_unit_id,
                pay_status=sell.status_id,
                date=sell.created_at,
                status=sell.status

            )
            for sell in sells.data
        ]
        return ServiceResponse(message=sells.message, data=sells_list)
    
    except Exception as ex:
        return ServiceResponse(500, "Error en el servidor.")

def make_sell_service(sell: SellDto):
    try:
        product_raw = get_product_by_id(sell.product)

        if not product_raw.is_success:
            return ServiceResponse(404, "El producto no fue encontrado.")
        
        product: ProductsModel = product_raw.data
        
        if product.stock < sell.quantity:
            return ServiceResponse(409, "El Stock no puede cumplir el pedido.")
        
        new_sell = make_sell_repo(sell)

        if not new_sell.is_success:
            return ServiceResponse(409, "No se pudo completar la transacción.")
        
        return ServiceResponse(message="Transacción completa.")
    except:
        return ServiceResponse(500, "Error en el servidor.")
    
def update_sell_service(sell_id: int, sell: SellDto):
    try:
        sell_raw = get_sell_by_id_repo(sell_id)

        if not sell_raw.is_success:
            return ServiceResponse(404, "El producto no fue encontrado.")
        
        selected_sell: ProductsModel = sell_raw.data

        converted_sell_model = sell.dto_to_model()

        for field, value in converted_sell_model.model_dump(exclude_unset=True).items():
            setattr(selected_sell, field, value)

        updated_sell = modify_sell_repo(selected_sell)

        if not updated_sell.is_success:
            return ServiceResponse(409, "No se pudo completar la actualización.")
        
        return ServiceResponse(message="Actualización correcta.")
    except Exception as ex:
        pass