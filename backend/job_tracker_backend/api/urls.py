from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addJob),
    path('register/', views.registerUser),
    path('login/', views.loginUser),
    path('info/', views.info),
]
