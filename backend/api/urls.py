# backend/api/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('phonecheck/', PhoneCheckView.as_view(), name='phonecheck'),
    path('register/', RegisterView.as_view(), name='register'),
    path('course-progress/', CourseProgressView.as_view(), name='course-progress'),
    path('community-posts/', CommunityPostListView.as_view(), name='community-posts'),
    path('chats/', GroupChatListView.as_view(), name='group-chats'),
    path('chats/<int:chat_id>/messages/', ChatMessageListView.as_view(), name='chat-messages'),
]