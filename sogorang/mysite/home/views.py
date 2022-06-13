from unicodedata import category
from django.shortcuts import render
from home.models import *


def main(request):
    context={}
    if(Post.objects.exists()) :
        postList = Post.objects.all()
        searchList = postList.order_by('createTime').reverse()
        max_key = max(request.user.cg_views, key=request.user.cg_views.get)
        print(max_key)
        temp = Post.objects.filter(category=max_key).order_by('createTime').reverse()
        maxpost = temp[0]
        context = {'searchList':searchList,
        'recommend' : maxpost}
    return render(request, 'home/main.html', context)

def map(request):
    if request.method=='POST':
        request.user.latitude=request.POST['sel_latitude']
        request.user.longitude=request.POST['sel_longitude']
        request.user.dealAddress=request.POST['sel_address']
        request.user.save()
    return render(request, 'home/usermaps.html')
