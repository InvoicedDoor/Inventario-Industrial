from fastapi import APIRouter, Path, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.ConsumptionFrequencyService import (get_consumptions_frequency_service, 
                                                    add_consumption_frequency_service,
                                                    get_consumption_frequency_by_id_service, 
                                                    update_consumption_frequency_service)
from ..dtos.ConsumptionFrequencyDto import ConsumptionFrequencyDto
from ..models.ConsumptionFrequencyModel import ConsumptionFrequencyModel

consumption_frequency_router = APIRouter()

consumption_frequency_router.prefix = "/consumption-frequency"

@consumption_frequency_router.get('')
def get_consumption_frequencies_controller(request: Request,
                                           filters: ConsumptionFrequencyDto = Depends()):
    try:
        consumption_frequencies = get_consumptions_frequency_service(filters)

        if len(consumption_frequencies.data) == 0:
            return JSONResponse({"details": "Información no encontrada"}, 404)
        
        return JSONResponse({"data": jsonable_encoder(consumption_frequencies.data)}, 200)
    except Exception as ex:
        print(ex)
        return JSONResponse({"details": "Información no encontrada"}, 500)
    

@consumption_frequency_router.get("/{frequency_id}")
def get_consumption_frequency_by_id_controller(request: Request, frequency_id: int = Path(..., gt=0)):
    try:
        frequency = get_consumption_frequency_by_id_service(frequency_id)

        if frequency.data == None:
            return JSONResponse({"details": "Información no econtrada"}, 404)

        frequency_data: ConsumptionFrequencyModel = frequency.data

        json_data = jsonable_encoder({"data": frequency_data})

        return JSONResponse(json_data, frequency.code)
    except:
        return JSONResponse({"details": "Error en el servidor"}, 500)


@consumption_frequency_router.post("")
def add_consumption_frequency_controller(request: Request, frequency_to_add: ConsumptionFrequencyDto):
    try:        
        response_service = add_consumption_frequency_service(frequency_to_add)

        if response_service.data == False:
            return JSONResponse({"detail": response_service.message}, 409)

        return JSONResponse({"message": "Agregado"}, 201)
    
    except Exception as ex:
        return JSONResponse({"detail": "Error interno del servidor"}, 500)


@consumption_frequency_router.patch("/{frequency_id}")
def update_consumption_frequency_controller(request: Request, consumption_frequency: ConsumptionFrequencyDto, frequency_id: int = Path(..., gt=0)):
    try:
        frequency = get_consumption_frequency_by_id_service(frequency_id)

        if frequency.data == None:
            return JSONResponse(404, {"details": "No existe la frequencia ingresada"})
        
        res_service_update = update_consumption_frequency_service(frequency_id, consumption_frequency)

        return JSONResponse(res_service_update.code, {
            "message": res_service_update.message
        })

    except:
        return JSONResponse({"details": "Error en el servidor"}, 500)