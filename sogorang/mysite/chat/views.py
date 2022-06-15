from xml.dom.expatbuilder import parseString
from django.shortcuts import redirect, render, get_object_or_404
from django.utils.safestring import mark_safe
import json
from parso import parse
from home.models import *


#나가기 버튼 누를 시 채팅방 접속
#todo : 나가기 버튼을 누르는 것이 아니라, 거래 종료시 또는 거래 취소시 채팅방 나가기
def chat_delete(request, roomName):
    room=get_object_or_404(ChatChannel, roomName=roomName)
    room.delete()
    return redirect('/')




#채팅방 생성 or 채팅방 접속
def room(request, roomName,img_onmessage):
    if request.method=="POST" :
        ch=ChatChannel.objects.get(roomName=roomName)
        chatmessage = ChatMessage()
        chatmessage.channel=ch
        chatmessage.message =""
        chatmessage.image = request.FILES['images']
        chatmessage.sender = request.user.nickname
        chatmessage.save()
        return redirect('/chat/'+roomName+"/"+str(img_onmessage))

    img_onmessage = img_onmessage
    k=ChatChannel.objects.filter(roomName=roomName).values('id')
    msg = []
    img= []
    sender = []
    if not(ChatChannel.objects.filter(roomName=roomName).exists()):
        ch = ChatChannel()
        ch.roomName=roomName
        post=Post.objects.get(postPIN=roomName)
        seller=post.seller
        buyer=request.user.username
        ch.seller=seller
        ch.buyer=buyer
        ch.save()
    elif(request.user.username != ChatChannel.objects.get(roomName=roomName).seller and request.user.username !=ChatChannel.objects.get(roomName=roomName).buyer) :
        return redirect('/')
    elif ChatMessage.objects.filter(channel__in=k).exists() :
        chatmessage = ChatMessage.objects.filter(channel__in=k).order_by('createTime').values()
        sender = list(ChatMessage.objects.filter(channel__in=k).order_by('createTime').values_list('sender',flat=True))
        for i in range(chatmessage.count()) :
            msg.append(chatmessage[i]['message'])
            if chatmessage[i]['message']=="" :
                img.append(chatmessage[i]['image'])
            else :
                img.append("")
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(int(roomName))),
        'sender' : mark_safe(json.dumps(sender)), #todo nickname으로 교체
        'chatmessage' :  mark_safe(json.dumps(msg)), 
        'img_position' : mark_safe(json.dumps(img)), 
        'img_onmessage' : mark_safe(json.dumps(img_onmessage)),
    })