from rest_framework.exceptions import APIException


class UserExists(APIException):
    status_code = 404
    default_detail = "A user with that email already exists"
    default_code = "bad_request"


class InvalidCreds(APIException):
    status_code = 401
    default_detail = "Invalid Credentials"
    default_code = "bad_credentials"
