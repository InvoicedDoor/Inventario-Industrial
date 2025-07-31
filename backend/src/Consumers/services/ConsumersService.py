from ..repos.ConsumersRepo import (add_consumer,
                                   get_consumer_by_id,
                                   get_consumers,
                                   modify_consumer)
from src.Utilities.models.ServiceResponse import ServiceResponse
from ..models.ConsumersModel import ConsumersModel
from ..dtos.ConsumersDtos import ConsumersDto

def get_consumers_service(filters: ConsumersModel):
    try:
        consumers = get_consumers(filters)

        if consumers.data == None:
            return ServiceResponse(data=[], code=404, message="Datos no disponibles")
        
        return ServiceResponse(message="Correcto", data=consumers.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", [])
    
def get_consumers_by_id_service(consumer_id: int):
    try:
        consumer = get_consumer_by_id(consumer_id)

        if consumer.data == None:
            return ServiceResponse(404, "No se encontró información")
        
        return ServiceResponse(message="Correcto", data=consumer.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    
def add_consumer_service(consumer: ConsumersDto):
    try:
        exist_consumer: list[ConsumersModel] = get_consumers(consumer)
        
        if exist_consumer.is_success and len(exist_consumer.data) > 0:        
            return ServiceResponse(409, "El consumidor ya existe en la base de datos")

        add_response = add_consumer(consumer)

        if not add_response.is_success:
            return ServiceResponse(400, "No se puede agregar el elemento")
        
        return ServiceResponse(message="Agregado", data=add_response.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")

def update_consumer_service(consumer_id: int, consumer: ConsumersDto):
    try:
        response_consumer = get_consumer_by_id(consumer_id)

        if not response_consumer.is_success:
            return ServiceResponse(404, "No se encontró el elemento")
        
        actual_consumer: ConsumersModel = response_consumer.data

        actual_consumer.name = consumer.name

        updated_consumer = modify_consumer(actual_consumer)

        if not updated_consumer.is_success:
            return ServiceResponse(404, "No se pudo actualizar el elemento")
        return ServiceResponse(data=updated_consumer.data, message="Elemento actualizado correctamente")

    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")