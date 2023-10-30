from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name='add-orders'),
    path('myorders/', views.getMyOrders, name='myorders'),
    
    path('<str:pk>/', views.getOrderById, name='get-user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),    
]
