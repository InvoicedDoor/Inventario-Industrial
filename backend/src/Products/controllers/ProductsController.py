from fastapi import APIRouter, Request, Path
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..services.ProductsService import (add_product_service,
                                        get_product_by_id_service,
                                        get_products_service,
                                        update_product_service)
from ..models.ProductsModel import ProductsModel
from ..dtos.ProductDto import ProductDto

products_router = APIRouter(prefix="/products")

@products_router.get("")
def get_products_controller(request: Request):
    try:
        filters: ProductsModel = ProductsModel(**request.query_params)

        products = get_products_service(filters)

        products_data: list[ProductsModel] = products.data

        json_data = jsonable_encoder({"data": products_data})

        return JSONResponse(json_data, products.code)
    
    except Exception as ex:
        return JSONResponse({"details": "No hay datos"}, 500)
    

@products_router.get("/{product_id}")
def get_product_by_id_controller(request: Request, product_id: int=Path(..., gt=0)):
    try:
        product = get_product_by_id_service(product_id)

        if product.data == None:
            empty_product = ProductsModel()
            return JSONResponse({"details": "Producto no encontrado"}, 404)
        
        product_data = product.data

        product_data: ProductsModel = ProductsModel(**product_data.model_dump())

        json_data = jsonable_encoder({"data": product_data})

        return JSONResponse(json_data, product.code)
    
    except Exception as ex:
        return JSONResponse({"details": "Error en el servidor"}, 500)
    
@products_router.post("")
def add_product_controller(request: Request, product: ProductDto):
    try: 
        response_service = add_product_service(product)

        if response_service.data == False:
            return JSONResponse(response_service.message, 409)

        return JSONResponse({"message": "Registrado"})
    except Exception as ex:
        return JSONResponse({"details": "Error en el servidor"}, 500)
    

@products_router.patch("{product_id}")
def update_product_controller(request: Request, product: ProductDto, product_id: int = Path(..., gt=0)):
    try:
        existent_product = get_product_by_id_service(product_id)

        if existent_product.data == None:
            return JSONResponse(404, {"details": "No hay productos con ese id"})
        
        res_service = update_product_service(product_id, product)

        return JSONResponse(res_service.code, {
            "message": res_service.message
            })

    except:
        return JSONResponse(500, {"details": "Hubo un error en el servidor"})