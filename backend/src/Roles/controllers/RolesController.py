from fastapi import APIRouter, Request, Path
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.RolesService import (add_rol_service,
                                        get_rol_by_id_service,
                                        get_roles_service,
                                        update_rol_service)
from ..models.RolesModel import RolesModel
from ..dtos.RolesDto import RolesDto

roles_router = APIRouter(prefix="/roles")

@roles_router.get("")
def get_roles_controller(request: Request):
    try:
        filters: RolesModel = RolesModel(**request.query_params)

        roles = get_roles_service(filters)

        roles_data: list[RolesModel] = roles.data

        json_data = jsonable_encoder({"data": roles_data})

        return JSONResponse(json_data, roles.code)
    
    except Exception as ex:
        return JSONResponse({"message": "No hay datos"}, 500)
    

@roles_router.get("/{rol_id}")
def get_rol_by_id_controller(request: Request, rol_id: int=Path(..., gt=0)):
    try:
        product = get_rol_by_id_service(rol_id)

        if product.data == None:
            return JSONResponse({"message": "Producto no encontrado"}, 404)
        
        rol_data = product.data

        rol_data: RolesModel = RolesModel(**rol_data.model_dump())

        json_data = jsonable_encoder({"data": rol_data})

        return JSONResponse(json_data, product.code)
    
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    
@roles_router.post("")
def add_rol_controller(request: Request, rol: RolesDto):
    try: 
        response_service = add_rol_service(rol)

        if response_service.data == False or not response_service.ok():
            return JSONResponse({"message": response_service.message}, 409)

        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    

@roles_router.patch("/{rol_id}")
def update_rol_controller(request: Request, rol: RolesDto, rol_id: int = Path(..., gt=0)):
    try:
        existent_rol = get_rol_by_id_service(rol_id)

        if existent_rol.data == None:
            return JSONResponse(404, {"details": "No hay productos con ese id"})
        
        res_service = update_rol_service(rol_id, rol)

        return JSONResponse(status_code=res_service.code, content={
            "message": res_service.message
            })

    except:
        return JSONResponse(500, {"message": "Hubo un error en el servidor"})