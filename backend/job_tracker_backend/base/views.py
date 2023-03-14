from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import CustomTokenObtainPairSerializer
from job_tracker_backend.settings import COOKIE_REFRESH_EXPIRE

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data['refresh']
        del response.data['refresh']
        response.set_cookie("refresh", token,
                            expires=COOKIE_REFRESH_EXPIRE, domain="http://localhost:3000")

        return response
