from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.getData),
    path('job/', include('api.jobUrls')),
    path('register/', views.registerUser),
    path('login/', views.loginUser),
    path('info/', views.info),
]
