from django.shortcuts import render,redirect
from home.models import *
from django.contrib import auth
from django.contrib.auth import login,authenticate
from django.contrib import messages
from django.utils.safestring import mark_safe
import json

from parso import parse

def signup(request) :
    if request.method == 'GET' :
        username = list(User.objects.all().values_list('username', flat=True))
        phone = list(User.objects.all().values_list('phoneNumber',flat=True))
        nickname = list(User.objects.all().values_list('nickname',flat=True))
        return render(request,'users/signUp.html',{
            'exist_usernam' : mark_safe(json.dumps(username)),
            'exist_phon' : mark_safe(json.dumps(phone)),
            'exist_nicknam' : mark_safe(json.dumps(nickname)),
        })

    if request.method == 'POST' :
        if request.POST['password'] == request.POST['password2']:
            user = User.objects.create_user(
                username=request.POST['username'],
                password=request.POST['password'],
                email=request.POST['email'],
                nickname=request.POST['nickname'],
                phoneNumber=request.POST['phonenumber'],
                homeAddress=request.POST['homeadress'],
                userGrade=0
            )
            
            auth.login(request,user)
            return redirect('/')
        return render(request,'users/signUp.html')
    


def signin(request) :
    if request.method == "GET":
        return render(request, 'users/login.html')

    elif request.method == 'POST':
        username = request.POST.get('username_login')
        password = request.POST.get('password_login')
        user = authenticate(request, username=username, password=password)
        
        if not (username and password) :
            messages.warning(request, "모든 칸을 입력하시오.")
            return render(request, 'users/login.html')

        elif user is not None:
            login(request, user)
            return redirect('/')
        else:
            messages.warning(request, "아이디 또는 비밀번호를 잘못 입력하였습니다.")
            return render(request, 'users/login.html')


def logout(request) :
    if request.method == 'POST' :
        auth.logout(request)
        return redirect('/')

    return render(request,'users/login.html')


def mypage(request) :
    mine = request.user
    context = {'mine':mine}
    return render(request,'users/myPage.html',context)