from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.MeasuresUnitsService import (get_measure_units_service,
                                             get_measure_unit_by_id_service,
                                             add_measure_unit_service,
                                             update_measure_unit_service)
from ..models.MeasureUnitsModel import MeasureUnitsModel
from ..dtos.MeasureUnitsDto import MeasureUnitsDto

measure_units_router = APIRouter()

measure_units_router.prefix = "/measure-units"

@measure_units_router.get("")
def get_measure_units_controller(request: Request):
    try:
        filters: MeasureUnitsModel = request.query_params
        
        measure_units = get_measure_units_service(filters)
        
        measure_units_data: list[MeasureUnitsModel] = measure_units.data

        json_data = jsonable_encoder(measure_units_data)

        return JSONResponse(json_data, measure_units.code)
    
    except Exception as ex:
        return JSONResponse([], 500)
    

@measure_units_router.get("/{id}")
def get_measure_units_by_id_controller(request: Request):
    try:
        measure_id: int = int(request.path_params["id"])

        if int(measure_id) <= 0:
            empty_measure = MeasureUnitsModel()
            return JSONResponse(jsonable_encoder(empty_measure), 422)
    
        measure_unit = get_measure_unit_by_id_service(measure_id)

        measure_unit_data: MeasureUnitsModel = measure_unit.data
    
        if measure_unit.data == None:
            empty_measure = MeasureUnitsModel()
            return JSONResponse(jsonable_encoder(empty_measure), 404)
        
        json_data = jsonable_encoder(measure_unit_data)

        return JSONResponse(json_data, measure_unit.code)
    except Exception as ex:
        empty_measure = MeasureUnitsModel()
        return JSONResponse(empty_measure.model_dump_json(), 500)
    
@measure_units_router.post("")
async def add_measure_unit_controller(request: Request, measure_unit_data: MeasureUnitsDto):
    try:
        if (measure_unit_data.unit == ""):
            return JSONResponse("El valor no puede estar vacío", 400)

        response_service = add_measure_unit_service(measure_unit_data)

        if response_service.data == None:
            return JSONResponse("No se agregó el valor", 409)

        return JSONResponse("Registrado")
    except Exception as ex:
        print(ex)
        return JSONResponse("Error en el servidor", 500)
    
@measure_units_router.patch("")
def update_measure_unit_controller(request: Request, measure_unit_data: MeasureUnitsDto):
    try:
        measure_id: int = request.query_params.get("id")

        if (measure_id == None or measure_id == ""):
            return JSONResponse("El parámetro id no puede estar vacío", 400)

        if (measure_unit_data.unit == ""):
            return JSONResponse("El cuerpo no puede estar vacío", 400)

        response_service = update_measure_unit_service(measure_id, measure_unit_data)

        return JSONResponse(response_service.message, response_service.code)
    
    except Exception as ex:
        print(ex)
        return JSONResponse("Error en el servidor", 500)