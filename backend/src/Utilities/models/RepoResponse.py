class RepoResponse:
    is_success: bool
    message: str
    data: object

    def __init__(self, is_success=True, message="", data=None):
        self.is_success = is_success
        self.message = message
        self.data = data
