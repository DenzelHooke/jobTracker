from django.contrib.auth import authenticate


class httpOnlyCookieAuth:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # print(request.COOKIES)
        print("MIDDLEEEWAREEE")

        response = self.get_response(request)
        return response
