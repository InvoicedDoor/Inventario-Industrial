from fastapi import APIRouter, Request, Depends, Path
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
def get_measure_units_controller(request: Request, filters: MeasureUnitsDto = Depends()):
    try:     
        measure_units = get_measure_units_service(filters)
        
        measure_units_data: list[MeasureUnitsModel] = measure_units.data

        json_data = jsonable_encoder(measure_units_data)

        return JSONResponse({"data": json_data}, measure_units.code)
    
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    

@measure_units_router.get("/{measure_id}")
def get_measure_units_by_id_controller(request: Request, measure_id: int = Path(..., gt=0)):
    try:
        measure_unit = get_measure_unit_by_id_service(measure_id)

        measure_unit_data: MeasureUnitsModel = MeasureUnitsModel(**dict(measure_unit.data))
    
        if measure_unit.data == None:
            return JSONResponse({"message": "No se encontraron elementos"}, 404)
        
        json_data = jsonable_encoder(measure_unit_data)

        return JSONResponse({"data": json_data}, measure_unit.code)
    except Exception as ex:
        empty_measure = MeasureUnitsModel()
        return JSONResponse(empty_measure.model_dump_json(), 500)
    
@measure_units_router.post("")
async def add_measure_unit_controller(request: Request, measure_unit_data: MeasureUnitsDto):
    try:
        if (measure_unit_data.unit == ""):
            return JSONResponse({"message": "El valor no puede estar vacío"}, 400)

        response_service = add_measure_unit_service(measure_unit_data)

        if response_service.data == None or not response_service.ok():
            return JSONResponse({"message": "No se agregó el valor"}, 409)

        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        print(ex)
        return JSONResponse({"message":"Error en el servidor"}, 500)
    
@measure_units_router.patch("/{measure_id}")
def update_measure_unit_controller(request: Request, measure_unit_data: MeasureUnitsDto, measure_id: int = Path(..., gt=0)):
    try:

        if (measure_id == None or measure_id == ""):
            return JSONResponse({"message":"El parámetro id no puede estar vacío"}, 400)

        if (measure_unit_data.unit == ""):
            return JSONResponse({"message":"El cuerpo no puede estar vacío"}, 400)

        response_service = update_measure_unit_service(measure_id, measure_unit_data)

        return JSONResponse({"message": response_service.message}, response_service.code)
    
    except Exception as ex:
        print(ex)
        return JSONResponse({"message":"Error en el servidor"}, 500)