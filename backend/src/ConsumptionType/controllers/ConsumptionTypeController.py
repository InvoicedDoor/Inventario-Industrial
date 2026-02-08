from fastapi import APIRouter, Request, Path
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.ConsumptionTypeService import (add_intake_type_service,
                                           get_intake_type_by_id_service,
                                           get_intake_types_service,
                                           update_intake_type_service)
from ..models.ConsumptionTypeModel import ConsumptionTypeModel
from ..dtos.ConsumptionTypeDto import IntakeTypeDto

consumption_type_router = APIRouter(prefix="/consumption-type")

@consumption_type_router.get("")
def get_products_controller(request: Request):
    try:
        filters: ConsumptionTypeModel = ConsumptionTypeModel(**request.query_params)

        products = get_intake_types_service(filters)

        products_data: list[ConsumptionTypeModel] = products.data

        json_data = jsonable_encoder({"data": products_data})

        return JSONResponse(json_data, products.code)
    
    except Exception as ex:
        return JSONResponse({"message": "No hay datos"}, 500)
    

@consumption_type_router.get("/{intake_type_id}")
def get_product_by_id_controller(request: Request, intake_type_id: int=Path(..., gt=0)):
    try:
        product = get_intake_type_by_id_service(intake_type_id)

        if product.data == None:
            empty_product = ConsumptionTypeModel()
            return JSONResponse({"message": "Producto no encontrado"}, 404)
        
        product_data = product.data

        product_data: ConsumptionTypeModel = ConsumptionTypeModel(**product_data.model_dump())

        json_data = jsonable_encoder({"data": product_data})

        return JSONResponse(json_data, product.code)
    
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    
@consumption_type_router.post("")
def add_product_controller(request: Request, intake_type: IntakeTypeDto):
    try: 
        response_service = add_intake_type_service(intake_type)

        if response_service.data == False or not response_service.ok():
            return JSONResponse(response_service.message, 409)

        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    

@consumption_type_router.patch("/{intake_type_id}")
def update_product_controller(request: Request, intake_type: IntakeTypeDto, intake_type_id: int = Path(..., gt=0)):
    try:
        existent_product = get_intake_type_by_id_service(intake_type_id)

        if existent_product.data == None:
            return JSONResponse(404, {"message": "No hay productos con ese id"})
        
        res_service = update_intake_type_service(intake_type_id, intake_type)

        return JSONResponse(status_code=res_service.code, content={
            "message": res_service.message
            })

    except:
        return JSONResponse(500, {"message": "Hubo un error en el servidor"})
    
# @consumption_type_router.shutdown("")
# def shutdown_routes():
#     pass