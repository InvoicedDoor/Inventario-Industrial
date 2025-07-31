from ..dtos.ConsumptionFrequencyDto import ConsumptionFrequencyDto
from ..models.ConsumptionFrequencyModel import ConsumptionFrequencyModel
from ..repos.ConsumptionFrequencyRepo import (get_consumption_frequencies,
                                              add_consumption_frequency,
                                              get_consumption_frequency_by_id,
                                              modify_consumption_frequency)
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_consumptions_frequency_service(filters: ConsumptionFrequencyDto):
    try:
        filters_to_apply = ConsumptionFrequencyDto(**filters.model_dump())
        res_consumption_frequencies = get_consumption_frequencies(filters_to_apply)

        consumtion_list: list[ConsumptionFrequencyModel] = res_consumption_frequencies.data
        if len(consumtion_list) == 0:
            return ServiceResponse(data=[], code=404, message="Datos no disponibles")
        
        return ServiceResponse(message="Correcto", data=consumtion_list)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", data=[])


def get_consumption_frequency_by_id_service(frequency_id: int):
    try:
        frequency = get_consumption_frequency_by_id(frequency_id)

        if frequency.data == None:
            return ServiceResponse(404, "No se encontró registro")
        
        return ServiceResponse(message="Correcto", data=frequency.data)
    except Exception as ex:
        ServiceResponse(500, f"Error {ex}")


def add_consumption_frequency_service(consumption_frequency: ConsumptionFrequencyDto):
    try:
        data_consumption = get_consumption_frequencies(filters=consumption_frequency)

        exist_consumption: list[ConsumptionFrequencyModel] = data_consumption.data

        if len(exist_consumption) > 0:
            return ServiceResponse(409, "El elemento ya existe en la base de datos")
        
        add_frequency = add_consumption_frequency(consumption_frequency)

        if not add_frequency.is_success:
            return ServiceResponse(409, "El elemento no se pudo agregar a la base de datos")
        
        return ServiceResponse(message="Agregado", data=add_frequency.is_success)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def update_consumption_frequency_service(frequency_id: int,consumption_frequency: ConsumptionFrequencyDto):
    try:
        response_frequency = get_consumption_frequency_by_id(frequency_id)

        if not response_frequency.is_success:
            return ServiceResponse(404, "No se encontró el elemento")
        
        actual_frequency: ConsumptionFrequencyModel = response_frequency.data

        for field, value in consumption_frequency.model_dump(exclude_unset=True).items():
            setattr(actual_frequency, field, value)
        
        response_modify = modify_consumption_frequency(actual_frequency)

        if not response_modify.is_success:
            return ServiceResponse(400, "Error al actualizar la frecuencia")
        
        return ServiceResponse(message="Frecuencia actualizada correctamente", data=response_modify.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")