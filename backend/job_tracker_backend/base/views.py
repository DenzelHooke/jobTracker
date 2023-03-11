from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import CustomTokenObtainPairSerializer


# Create your views here.

class CustomTokenObtainView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
