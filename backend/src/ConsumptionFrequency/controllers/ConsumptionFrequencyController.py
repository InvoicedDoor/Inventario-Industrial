from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse

consumption_frequency_router = APIRouter()

consumption_frequency_router.prefix = "/consumption-frequency"

@consumption_frequency_router.get('')
def get_consumption_frequencies_controller(request: Request):
    try:
        
        return JSONResponse([], 200)
    except Exception:
        return JSONResponse([], 500)