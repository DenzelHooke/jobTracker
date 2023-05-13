from django.urls import path
from . import views

# /job/
urlpatterns = [
    path('', views.jobDetail),
    path('<int:pk>/', views.jobDetail),
    path('remove/<int:pk>', views.deleteJob),
    path('category/', views.getCategory),
    path('access-image/<int:pk>', views.access_image)

]
