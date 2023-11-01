from django.urls import path
from api.views import product_views as views


urlpatterns = [
    
    path('', views.getProducts, name="products"),
    path('<str:pk>/', views.getProduct, name="get-product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
]
