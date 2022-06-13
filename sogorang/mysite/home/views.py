from unicodedata import category
from django.shortcuts import render,redirect
from home.models import *
import csv
import pandas as pd
import os

def main(request):
    context={'searchList' : "",
    'recommend' : 0}
    if(Post.objects.exists() and request.user.is_authenticated) :
        postList = Post.objects.all()
        cur_user = User.objects.get(username=request.user.username)
        searchList = postList.order_by('createTime').reverse()
        if cur_user.cg_views['Clothing']==0 and cur_user.cg_views['Electronics']==0 and cur_user.cg_views['Stationery']==0 and cur_user.cg_views['Food']==0 and cur_user.cg_views['Household']==0 :
            maxpost = 0
        else :
            max_key = max(request.user.cg_views, key=request.user.cg_views.get)
            temp = Post.objects.filter(category=max_key).order_by('createTime').reverse()
            maxpost = temp[0]
        context = {'searchList':searchList,'recommend' : maxpost}
    return render(request, 'home/main.html', context)

def map(request):
    if request.method=='POST':
        request.user.latitude=request.POST['sel_latitude']
        request.user.longitude=request.POST['sel_longitude']
        request.user.dealAddress=request.POST['sel_address']
        request.user.save()
    return render(request, 'home/usermaps.html')

def productUpdate(request):
    data_path = os.path.realpath('home/data.csv')
    print(data_path)
    with open(data_path,'r',encoding='utf-8') as f:
        dr = csv.DictReader(f)
        s = pd.DataFrame(dr)
        print(s)
        ss = []
    for i in range(len(s)):
        st = ( s['brand'][i], s['name'][i], s['price'][i])
        ss.append(st)
    for i in range(len(s)):
        Data.objects.create(brand=ss[i][0], name=ss[i][1], price=ss[i][2])
    return redirect('/')