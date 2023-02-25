from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addJob),
    path('register/', views.registerUser),
    path('info/', views.info),
]
