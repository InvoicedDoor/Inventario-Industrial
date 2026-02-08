from fastapi import APIRouter
from src.Buys.controller.BuyController import entry_router
from .MeasuresUnits.controllers.MeasuresUnitsController import measure_units_router
from .Consumers.controllers.ConsumersController import consumers_router
from .Products.controllers.ProductsController import products_router
from .ConsumptionFrequency.controllers.ConsumptionFrequencyController import consumption_frequency_router
from .ConsumptionType.controllers.ConsumptionTypeController import consumption_type_router
from .Roles.controllers.RolesController import roles_router
from .Employees.controllers.EmployeesController import employees_router
from .Sells.controller.SellController import sell_route

main_router = APIRouter()

main_router.include_router(products_router)
main_router.include_router(measure_units_router)
main_router.include_router(consumption_frequency_router)
main_router.include_router(consumption_type_router)
main_router.include_router(consumers_router)
main_router.include_router(roles_router)
main_router.include_router(employees_router)
main_router.include_router(sell_route)