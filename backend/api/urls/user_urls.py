from django.urls import path
from api.views import user_views as views


urlpatterns = [
    
    path('', views.getUsers, name="users"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    
    path('<str:pk>/', views.getUserById, name="admin-get-user"),
    path('update/<str:pk>/', views.updateUser, name="admin-update-user"),
    path('delete/<str:pk>/', views.deleteUser, name="admin-delete-user"),
    
    #path('api/token/refresh/', views.MyTokenObtainPairSerializer.as_view(), name='token_refresh'),
    
]
