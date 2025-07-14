from django.urls import path
from chatbot import views

urlpatterns = [
    path('test/', views.backend_test),
    path('gpt_call/', views.chatbot_call)
]