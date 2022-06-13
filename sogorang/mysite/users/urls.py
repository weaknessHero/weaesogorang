from django.urls import re_path
from . import views

urlpatterns = [
    re_path('signup/',views.signup,name='signup'),
    re_path('signin/',views.signin,name='signin'),
    re_path('logout/',views.logout,name='logout'),
    re_path('mypage/',views.mypage,name='mypage'),
]