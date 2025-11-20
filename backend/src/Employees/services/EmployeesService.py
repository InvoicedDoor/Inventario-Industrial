from ..repos.EmployeesRepo import (get_employees,
                                  get_employee_by_id,
                                  add_employee,
                                  modify_employee)
from ..models.EmployeesModel import EmployeesModel
from ..models.ResponseEmployeeModel import ResponseEmployeeDto
from ..dtos.EmployeesDto import EmployeesDto
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_employees_service(filters: EmployeesDto):
    try:
        employees = get_employees(filters)

        if employees.data == None:
            return ServiceResponse(data=[], code=404, message="Empleados no encontrados")
        
        data: list[EmployeesModel] = employees.data

        data_employees = [
            ResponseEmployeeDto(
                id=employee.id,
                name=employee.name,
                rol=employee.rol_id,
            ) for employee in data
        ]

        return ServiceResponse(message="Correcto", data=data_employees)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", [])
    

def get_employee_by_id_service(employee_id: int):
    try:
        employee = get_employee_by_id(employee_id)

        if employee.data == None:
            return ServiceResponse(404, "No se encontraron empleados")
        
        return ServiceResponse(message="Correcto", data=employee.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def add_employee_service(employee: EmployeesDto):
    try:
        filters_to_apply = EmployeesDto(name=employee.name)
        
        exist_employee = get_employees(filters_to_apply)

        if exist_employee.is_success and len(exist_employee.data) > 0:
            return ServiceResponse(409, "El empleado ya existe en la base de datos")
        
        new_employee = EmployeesDto(**employee.model_dump())
        
        add_response = add_employee(new_employee)

        if not add_response.is_success:
            return ServiceResponse(400, "No se pudo agregar al empleado")
        
        return ServiceResponse(message="Agregado", data=add_response.is_success)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error en la petición")
    

def update_employee_service(employee_id: int, employee: EmployeesDto):
    try:
        response_employee = get_employee_by_id(employee_id)

        if not response_employee.is_success:
            return ServiceResponse(404, "No se encontró al empleado")
        
        actual_employee: EmployeesModel = response_employee.data

        actual_employee.dto_to_model(employee)
        
        repo_response = modify_employee(actual_employee)

        if not repo_response.is_success:
            return ServiceResponse(400, "Error al actualizar el empleado")
        
        return ServiceResponse(message="Empleado actualizado correctamente", data=repo_response.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")