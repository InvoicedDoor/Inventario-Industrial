from ..repos.IntakeTypesRepo import (get_intake_types,
                                  get_intake_type_by_id,
                                  add_intake_type,
                                  modify_intake_type)
from ..models.IntakeTypesModel import IntakesTypeModel
from ..dtos.IntakeTypesDto import IntakeTypeDto
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_intake_types_service(filters: IntakeTypeDto):
    try:
        products = get_intake_types(filters)

        if products.data == None:
            return ServiceResponse(data=[], code=404, message="Productos no encontrados")
        
        return ServiceResponse(message="Correcto", data=products.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", [])
    

def get_intake_type_by_id_service(product_id: int):
    try:
        product = get_intake_type_by_id(product_id)

        if product.data == None:
            return ServiceResponse(404, "No se encontraron productos")
        
        return ServiceResponse(message="Correcto", data=product.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def add_intake_type_service(intake_type: IntakeTypeDto):
    try:
        filters_to_apply = IntakeTypeDto(intake_type=intake_type.intake_type)
        
        exist_type = get_intake_types(filters_to_apply)

        if exist_type.is_success and len(exist_type.data) > 0:
            return ServiceResponse(409, "El producto ya existe en la base de datos")
        
        new_product = IntakeTypeDto(**intake_type.model_dump())
        
        add_response = add_intake_type(new_product)

        if not add_response.is_success:
            return ServiceResponse(400, "No se pudo agregar el producto")
        
        return ServiceResponse(message="Agregado", data=add_response.is_success)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def update_intake_type_service(product_id: int, product: IntakesTypeModel):
    try:
        response_product = get_intake_type_by_id(product_id)

        if not response_product.is_success:
            return ServiceResponse(404, "No se encontró el producto")
        
        actual_product: IntakesTypeModel = response_product.data

        for field, value in product.model_dump(exclude_unset=True).items():
            setattr(actual_product, field, value)

        repo_response = modify_intake_type(actual_product)

        if not repo_response.is_success:
            return ServiceResponse(400, "Error al actualizar el producto")
        
        return ServiceResponse(message="Producto actualizado correctamente", data=repo_response.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")