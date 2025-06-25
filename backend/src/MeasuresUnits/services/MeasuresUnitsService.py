from ..repos.MeasuresUnitsRepo import (add_measure_unit,
                                       get_measure_unit_by_id,
                                       get_measure_units,
                                       modify_measure_unit)
from src.Utilities.models.ServiceResponse import ServiceResponse
from ..models.MeasureUnitsModel import MeasureUnitsModel
from ..dtos.MeasureUnitsDto import MeasureUnitsDto

def get_measure_units_service(filters: MeasureUnitsModel):
    try:
        measure_units = get_measure_units(filters)

        if measure_units.data == None:
            return ServiceResponse(data=[], code=404, message="Datos no disponibles")

        return ServiceResponse(message="Correcto", data=measure_units.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error {ex}", [])
    
def get_measure_unit_by_id_service(id: int):
    try:
        measure_unit = get_measure_unit_by_id(id)

        if measure_unit.data == None:
            return ServiceResponse(404, "No se encnontró información", MeasureUnitsModel())
               
        return ServiceResponse(message="Correcto", data=measure_unit.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error {ex}")
    
def add_measure_unit_service(measure_unit: MeasureUnitsDto):
    try:
        add_response = add_measure_unit(measure_unit)

        if not add_response.is_success:
            return ServiceResponse(400, "No se puede agregar el elemento")
    
        return ServiceResponse(message="Agregado", data=add_response)
    except Exception as ex:
        return ServiceResponse(500, f"Error {ex}")
    
def update_measure_unit_service(measure_id: int, measure_unit: MeasureUnitsDto):
    try:
        response_measure_unit = get_measure_unit_by_id(measure_id)

        if not response_measure_unit.is_success:
            return ServiceResponse(404, "No se encontró el elemento")

        actual_measure_unit: MeasureUnitsModel = response_measure_unit.data
        
        actual_measure_unit.unit = measure_unit.unit

        updated_measure_unit = modify_measure_unit(actual_measure_unit)

        if not updated_measure_unit.is_success:
            return ServiceResponse(404, "No se pudo actualizar el elemento")
        
        return ServiceResponse(data=updated_measure_unit.data, message="Elemento actualizado correctamente")
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")