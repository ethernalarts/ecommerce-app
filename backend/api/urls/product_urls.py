from django.urls import path
from api.views import product_views as views


urlpatterns = [
    
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="create-product"),
    path('<str:pk>/', views.getProduct, name="get-product"),
    path('update/<str:pk>/', views.updateProduct, name="update-product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
]
