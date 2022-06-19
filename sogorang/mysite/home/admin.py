from django.contrib import admin
from .models import ChatChannel,ChatMessage,Product,Post,User,Data
# Register your models here.
admin.site.register(User)
admin.site.register(ChatChannel)
admin.site.register(ChatMessage)
admin.site.register(Product)
admin.site.register(Post)
admin.site.register(Data)