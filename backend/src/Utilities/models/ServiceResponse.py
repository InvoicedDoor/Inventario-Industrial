class ServiceResponse:
    code: int
    message: str
    data: object

    def __init__(self, code=200, message="", data=None):
        self.code = code
        self.message = message
        self.data = data

    def ok(self):
        return self.code >= 200 and self.code <= 299