from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='all-orders'),
    path('add/', views.addOrderItems, name='add-orders'),
    path('myorders/', views.getMyOrders, name='myorders'),
    
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-deliver'),
    path('<str:pk>/', views.getOrderById, name='get-user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),    
]
