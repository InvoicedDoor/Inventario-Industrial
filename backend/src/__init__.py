from fastapi import APIRouter
from src.Buys.controller.BuyController import entry_router
from .MeasuresUnits.controllers.MeasuresUnitsController import measure_units_router
from .Consumers.controllers.ConsumersController import consumers_router

main_router = APIRouter()

# main_router.include_router(entry_router)
main_router.include_router(measure_units_router)
main_router.include_router(consumers_router)