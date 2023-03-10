from django.urls import path
from . import views

# /job/
urlpatterns = [
    path('', views.jobDetail),

]
