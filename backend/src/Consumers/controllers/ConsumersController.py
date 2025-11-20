from fastapi import APIRouter, Request, Path
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.ConsumersService import (add_consumer_service,
                                         get_consumers_by_id_service,
                                         get_consumers_service,
                                         update_consumer_service)
from ..models.ConsumersModel import ConsumersModel
from ..dtos.ConsumersDtos import ConsumersDto

consumers_router = APIRouter(prefix="/consumers")

@consumers_router.get("")
def get_consumers_controller(request: Request):
    try:
        filters: ConsumersModel = ConsumersModel(**request.query_params)

        consumers = get_consumers_service(filters)
        
        consumers_data: list[ConsumersModel] = consumers.data

        json_data = jsonable_encoder({"data": consumers_data})

        return JSONResponse(json_data, consumers.code)
    
    except Exception as ex:
        return JSONResponse({"message": "No hay datos"}, 500)
    

@consumers_router.get("/{consumer_id}")
def get_consumer_by_id_controller(consumer_id: int = Path(..., gt=0)):
    try:

        if int(consumer_id) <= 0:
            empty_consumer = ConsumersModel()
            return JSONResponse({"message": "No se puede procesar la petición"}, 409)
        
        consumer = get_consumers_by_id_service(consumer_id)

        if consumer.data == None:
            empty_consumer = ConsumersModel()
            return JSONResponse({"message": "Persona no encontrada"}, 404) 

        consumer_data: ConsumersModel = consumer.data

        json_data = jsonable_encoder({"data": consumer_data})

        return JSONResponse(json_data, consumer.code)
    except Exception as ex:
        return JSONResponse({"message": "Error en la petición"}, 500)


@consumers_router.post("")
def add_consumer_controller(consumer: ConsumersDto):
    try:
        if consumer.name == None:
            return JSONResponse({"message": "El cuerpo no puede estar vacío"}, 409)
        
        response_service = add_consumer_service(consumer)

        if not response_service.ok():
            return JSONResponse({"message": response_service.message}, 409)
        
        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        empty_consumer = ConsumersModel()
        return JSONResponse({"message": "Error en la petición"}, 500)


@consumers_router.patch("/{consumer_id}")
def update_consumer_controller(consumer: ConsumersDto, consumer_id: int = Path(..., gt=0)):
    try:
        if consumer_id == None or consumer_id == "":
            return JSONResponse({"message":"El parámetro id no puede estar vacío"}, 409)
        
        if consumer.name == "":
            return JSONResponse({"message": "El cuerpo no puede estar vacío"}, 409)
        
        response_service = update_consumer_service(consumer_id, consumer)

        return JSONResponse({"message": response_service.message}, response_service.code)
    except Exception as ex:
        empty_consumer = ConsumersModel()
        return JSONResponse({"message": "Error en la petición"}, 500)