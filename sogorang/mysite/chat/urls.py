from django.urls import path
from . import views

urlpatterns = [
    path('<roomName>/<int:img_onmessage>/',views.room, name='room'),
    path('<roomName>/delete/',views.chat_delete, name='chat_delete'),
]