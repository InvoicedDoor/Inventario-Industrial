from fastapi import APIRouter, Request, Path
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.EmployeesService import (add_employee_service,
                                        get_employee_by_id_service,
                                        get_employees_service,
                                        update_employee_service)
from ..models.EmployeesModel import EmployeesModel
from ..models.ResponseEmployeeModel import ResponseEmployeeDto
from ..dtos.EmployeesDto import EmployeesDto

employees_router = APIRouter(prefix="/employees")

@employees_router.get("")
def get_employees_controller(request: Request):
    try:
        filters: EmployeesModel = EmployeesModel(**request.query_params)

        employees = get_employees_service(filters)

        employees_data: list[ResponseEmployeeDto] = employees.data

        json_data = jsonable_encoder({"data": employees_data})

        return JSONResponse(json_data, employees.code)
    
    except Exception as ex:
        return JSONResponse({"message": "No hay datos"}, 500)
    

@employees_router.get("/{employee_id}")
def get_rol_by_id_controller(request: Request, employee_id: int=Path(..., gt=0)):
    try:
        product = get_employee_by_id_service(employee_id)

        if product.data == None:
            return JSONResponse({"message": "Producto no encontrado"}, 404)
        
        employee_data = product.data

        employee_data: EmployeesModel = EmployeesModel(**employee_data.model_dump())

        json_data = jsonable_encoder({"data": employee_data})

        return JSONResponse(json_data, product.code)
    
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    
@employees_router.post("")
def add_employee_controller(request: Request, employee: EmployeesDto):
    try: 
        response_service = add_employee_service(employee)

        if response_service.data == False or not response_service.ok():
            return JSONResponse({"message": response_service.message}, 409)

        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        return JSONResponse({"message": "Error en el servidor"}, 500)
    

@employees_router.patch("/{employee_id}")
def update_employee_controller(request: Request, employee: EmployeesDto, employee_id: int = Path(..., gt=0)):
    try:
        existent_employee = get_employee_by_id_service(employee_id)

        if existent_employee.data == None:
            return JSONResponse(404, {"details": "No hay productos con ese id"})
        
        res_service = update_employee_service(employee_id, employee)

        return JSONResponse(status_code=res_service.code, content={
            "message": res_service.message
            })

    except:
        return JSONResponse(500, {"message": "Hubo un error en el servidor"})