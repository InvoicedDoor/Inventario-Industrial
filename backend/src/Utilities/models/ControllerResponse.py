from fastapi.responses import JSONResponse

class ControllerResponse:
    data: any
    message: str
    code: int

    def __init__(self, data, code):
        self.data = data
        self.code = code

    def response(self):
        return JSONResponse(self.data, self.code)
    
    def success(self, data=None, message=None, code=200):
        if code < 200 or code > 299:
            raise Exception("El código de estado es inválido.")

        return JSONResponse(data, code)