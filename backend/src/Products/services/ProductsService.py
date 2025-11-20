from ..repos.ProductsRepo import (get_products,
                                  get_product_by_id,
                                  add_product,
                                  modify_product)
from ..models.ProductsModel import ProductsModel
from ..dtos.ProductDto import ProductDto
from src.Utilities.models.ServiceResponse import ServiceResponse

def get_products_service(filters: ProductDto):
    try:
        products = get_products(filters)

        if products.data == None:
            return ServiceResponse(data=[], code=404, message="Productos no encontrados")
        
        return ServiceResponse(message="Correcto", data=products.data)
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}", [])
    

def get_product_by_id_service(product_id: int):
    try:
        product = get_product_by_id(product_id)

        if product.data == None:
            return ServiceResponse(404, "No se encontraron productos")
        
        return ServiceResponse(message="Correcto", data=product.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def add_product_service(product: ProductDto):
    try:
        filters_to_apply = ProductDto(name=product.name)
        
        exist_product = get_products(filters_to_apply)

        if exist_product.is_success and len(exist_product.data) > 0:
            return ServiceResponse(409, "El producto ya existe en la base de datos")
        
        new_product = ProductsModel(
            name=product.name,
            frequency_id=product.frequency,
            max_stock=product.max_stock,
            measureunit_id=product.unit,
            min_stock=product.min_stock,
            stock=product.stock,
            active=product.active)
        
        add_response = add_product(new_product)

        if not add_response.is_success:
            return ServiceResponse(400, "No se pudo agregar el producto")
        
        return ServiceResponse(message="Agregado", data=add_response.is_success)

        return ServiceResponse(message="Agregado")
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")
    

def update_product_service(product_id: int, product: ProductsModel):
    try:
        response_product = get_product_by_id(product_id)

        if not response_product.is_success:
            return ServiceResponse(404, "No se encontró el producto")
        
        actual_product: ProductsModel = response_product.data

        for field, value in product.model_dump(exclude_unset=True).items():
            setattr(actual_product, field, value)

        repo_response = modify_product(actual_product)

        if not repo_response.is_success:
            return ServiceResponse(400, "Error al actualizar el producto")
        
        return ServiceResponse(message="Producto actualizado correctamente", data=repo_response.data)
    
    except Exception as ex:
        return ServiceResponse(500, f"Error: {ex}")