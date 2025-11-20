from ..repos.RolesRepo import (get_roles,
                                  get_rol_by_id,
                                  add_rol,
                                  modify_rol)
from ..models.RolesModel import RolesModel
from ..dtos.RolesDto import RolesDto
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_roles_service(filters: RolesDto):
    try:
        roles = get_roles(filters)

        if roles.data == None:
            return ServiceResponse(data=[], code=404, message="Roles no encontrados")
        
        return ServiceResponse(message="Correcto", data=roles.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", [])
    

def get_rol_by_id_service(rol_id: int):
    try:
        rol = get_rol_by_id(rol_id)

        if rol.data == None:
            return ServiceResponse(404, "No se encontraron rol")
        
        return ServiceResponse(message="Correcto", data=rol.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def add_rol_service(rol: RolesDto):
    try:
        filters_to_apply = RolesDto(rol=rol.rol)
        
        exist_rol = get_roles(filters_to_apply)

        if exist_rol.is_success and len(exist_rol.data) > 0:
            return ServiceResponse(409, "El rol ya existe en la base de datos")
        
        new_rol = RolesDto(**rol.model_dump())
        
        add_response = add_rol(new_rol)

        if not add_response.is_success:
            return ServiceResponse(400, "No se pudo agregar el rol")
        
        return ServiceResponse(message="Agregado", data=add_response.is_success)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error en la petición")
    

def update_rol_service(rol_id: int, rol: RolesModel):
    try:
        response_rol = get_rol_by_id(rol_id)

        if not response_rol.is_success:
            return ServiceResponse(404, "No se encontró el rol")
        
        actual_rol: RolesModel = response_rol.data

        for field, value in rol.model_dump(exclude_unset=True).items():
            setattr(actual_rol, field, value)

        repo_response = modify_rol(actual_rol)

        if not repo_response.is_success:
            return ServiceResponse(400, "Error al actualizar el rol")
        
        return ServiceResponse(message="Rol actualizado correctamente", data=repo_response.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")