from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed
from django.http import HttpResponseRedirect


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.

    # # Now add the HTTP status code to the response.
    # if response is not None:
    #     response.data['status_code'] = response.status_code

    # Runs when token is denied
    if isinstance(exc, AuthenticationFailed):
        # Check if refresh token is valid
        # print("DENIED ", dir(context['view'].request))
        print("DENIED ", context['request'].COOKIES)

    response = exception_handler(exc, context)

    return response
