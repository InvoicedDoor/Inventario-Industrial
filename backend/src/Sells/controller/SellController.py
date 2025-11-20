from fastapi.responses import JSONResponse
from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from typing import Optional
from ..service.SellService import make_sell_service, update_sell_service,get_all_sells_service
from ..dtos.SellDto import SellDto
from ..models.SellModel import SellModel
from ..dtos.SellFilters import SellFilters

sell_route = APIRouter(prefix="/sells")

@sell_route.get("")
def get_all_sells_controller(
    consumer: Optional[int] = None,
    product: Optional[int] = None,
    pay_status: Optional[int] = None,
    date: Optional[datetime] = None,
    intake_type: Optional[int] = None,
    metric_unit: Optional[int] = None,
    quantity: Optional[int] = None,
    status: Optional[bool] = True):
    try:
        filters = SellFilters(consumer=consumer or 0,
                          product=product or 0,
                          pay_status=pay_status or 0,
                          date=date,
                          intake_type=intake_type or 0,
                          metric_unit=metric_unit or 0,
                          quantity=quantity or 0,
                          status=status)
        
        sells = get_all_sells_service(filters)

        sells_list: list[SellDto] = jsonable_encoder({"data": sells.data})

        return JSONResponse(sells_list, sells.code)
    
    except Exception as ex:
        return JSONResponse({"message" : "Error en el servidor."}, 500)

@sell_route.post("")
def make_sell_controller(sell: SellDto):
    try:
        new_sell = make_sell_service(sell)

        if not new_sell.ok():
            return JSONResponse({"message": new_sell.message}, new_sell.code)
        
        return JSONResponse({"message": new_sell.message}, new_sell.code)
    except:
        return JSONResponse({"message": "Error al procesar la petición."}, 500)
    
@sell_route.patch("/{id}")
def update_sell_controller(id: int, sell: SellDto):
    try:
        updated_sell = update_sell_service(id, sell)

        return JSONResponse({"message": updated_sell.message}, updated_sell.code)
    except Exception as ex:
        print(ex)
        return JSONResponse({"message": "Error en el servidor"}, 500)