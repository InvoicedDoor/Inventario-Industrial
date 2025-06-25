from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from src.Buys.dtos.BuyDto import BuyDto
from pydantic import ValidationError
from src.Buys.service.BuyService import register_buy_existent_product_service, register_buy_new_product_service, get_buys_service

entry_router = APIRouter()

entry_router.prefix = "/entries"

@entry_router.get('')
def get_buys_controller(request: Request):
    try:
        exist_buys = get_buys_service()

        if len(exist_buys) == 0:
            return JSONResponse(content=[], status_code=404)

        return JSONResponse(content=exist_buys, status_code=200)
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    
@entry_router.post('')
async def register_buy_controller(request: Request, buy_data: BuyDto):
    try:
        if buy_data.type_of_product_id == 1:
            register_buy_existent_product_service(buy_data)
        else:
            register_buy_new_product_service(buy_data)

        return {"message": "Entry created successfully", "data": buy_data}
    except ValidationError as ve:
        raise HTTPException(status_code=422, detail=ve.errors())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))