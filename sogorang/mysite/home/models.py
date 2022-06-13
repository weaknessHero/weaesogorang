from email.policy import default
from django.db import models
from django.forms import IntegerField
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
import os


class Product(models.Model):
  category = models.IntegerField(max_length=8)
  marketPrice  = models.IntegerField(max_length=16)
  productName  = models.TextField()

class Post(models.Model):
  seller = models.CharField(max_length=150, default="")
  buyer = models.CharField(max_length=150, default="")
  category  = models.CharField(max_length=150, default="")
  productName  = models.CharField(max_length=150, default="")
  title = models.TextField()
  content = models.TextField()
  image = models.ImageField(null=True, upload_to="posts",blank=True)
  status = models.CharField(max_length=150, default="")
  createTime  = models.DateTimeField(auto_now_add = True)
  updateTime  = models.DateTimeField(auto_now = True)
  viewCount = models.IntegerField(max_length=8)
  price = models.IntegerField(max_length=31)
  dealStatus = models.IntegerField(max_length=3)
  latitude = models.FloatField(max_length=100)
  longitude = models.FloatField(max_length=100)
  dealAddress = models.TextField(default="")

  
class Crawling(models.Model):
  productPIN = models.IntegerField(max_length=8)
  price = models.IntegerField(max_length=16)
  productName= models.IntegerField(max_length = 8)


class ChatChannel(models.Model):
  seller =models.CharField(max_length=150,default="")
  buyer = models.CharField(max_length=150,default="")
  roomName = models.CharField(max_length=200)
  lastLog = models.IntegerField(max_length=8,default=0)
  lastMessage = models.TextField()
  status  = models.IntegerField(max_length = 8,default=0)
  postPIN  = models.IntegerField(max_length = 8,default=0)


class ChatMessage(models.Model):
  channel = models.ForeignKey(ChatChannel, on_delete=models.CASCADE)
  productPIN = models.IntegerField(max_length=8,default=0)
  price = models.IntegerField(max_length=16, default=0)
  productName= models.IntegerField(max_length = 8, default=0)
  createTime  = models.DateTimeField(auto_now_add = True)
  message = models.TextField()
  image = models.ImageField(null=True, upload_to="images",blank=True)
  sender = models.CharField(max_length=150,default="")


class User(AbstractUser):
  nickname  = models.CharField(max_length=16,default="")
  userGrade = models.IntegerField(max_length=8, null=True, default=0)
  phoneNumber = models.IntegerField(max_length=12, unique=True, default=0)
  dealAddress = models.TextField(default="")
  latitude = models.FloatField(max_length=100 ,default=0)
  longitude = models.FloatField(max_length=100 ,default=0)
  homeAddress = models.TextField(default="")
  cg_views= models.JSONField(null=True, default={"Clothing":0, "Electronics":0 ,"Stationery":0, "Food":0 ,"Household":0})
