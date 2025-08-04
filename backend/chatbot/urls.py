from django.urls import path
from chatbot import views

urlpatterns = [
    path('test/', views.backend_test),
    path('gpt_call/', views.chatbot_call),
    path('create_chat_session/', views.create_chat_session),
    path('get_chat_session/', views.get_chat_session),
    path('gpt_call_with_files/', views.chatbot_call_with_files),
]