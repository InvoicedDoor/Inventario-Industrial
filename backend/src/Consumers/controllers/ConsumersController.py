from fastapi import APIRouter, Request, HTTPException
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

        json_data = jsonable_encoder(consumers_data)

        return JSONResponse(json_data, consumers.code)
    
    except Exception as ex:
        return JSONResponse([], 500)
    

@consumers_router.get("/{id}")
def get_consumer_by_id_controller(request: Request):
    try:
        consumer_id: int = int(request.path_params["id"])

        if int(consumer_id) <= 0:
            empty_consumer = ConsumersModel()
            return JSONResponse(jsonable_encoder(empty_consumer), 404)
        
        consumer = get_consumers_by_id_service(consumer_id)

        if consumer.data == None:
            empty_consumer = ConsumersModel()
            return JSONResponse(jsonable_encoder(empty_consumer), 404) 

        consumer_data: ConsumersModel = consumer.data

        json_data = jsonable_encoder(consumer_data)

        return JSONResponse(json_data, consumer.code)
    except Exception as ex:
        empty_consumer = ConsumersModel()
        return JSONResponse(empty_consumer.model_dump_json(), 500)


@consumers_router.post("")
def add_consumer_controller(consumer: ConsumersDto):
    try:
        if consumer.name == None:
            return JSONResponse("El cuerpo no puede estar vacío", 409)
        
        response_service = add_consumer_service(consumer)

        if response_service.data == None:
            return JSONResponse(response_service.message, 409)
        
        return JSONResponse("Registrado")
    except Exception as ex:
        empty_consumer = ConsumersModel()
        return JSONResponse(empty_consumer.model_dump_json(), 500)


@consumers_router.patch("/{id}")
def update_consumer_controller(request: Request, consumer: ConsumersDto):
    try:
        consumer_id: int = request.query_params.get("id")

        if consumer_id == None or consumer_id == "":
            return JSONResponse("El parámetro id no puede estar vacío", 409)
        
        if consumer.name == "":
            return JSONResponse("El cuerpo no puede estar vacío", 409)
        
        response_service = update_consumer_service(consumer_id, consumer)

        return JSONResponse(response_service.message, response_service.code)
    except Exception as ex:
        empty_consumer = ConsumersModel()
        return JSONResponse(empty_consumer.model_dump_json(), 500)