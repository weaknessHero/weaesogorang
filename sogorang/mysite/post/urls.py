from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>/deal_com/', views.deal_com,name='deal_com'),
    path('search/', views.get_search,name='search'),
    path('create/', views.post_create,name="create"),
    path('send/', views.post_send,name='post_send'),
    path('<int:post_id>/', views.post_detail,name='post_detail'),
    path('edit/<int:post_id>/', views.post_edit,name='post_edit'),
    path('delete/<int:post_id>/', views.post_delete,name='post_delete'),
    path('<int:post_id>/req_deal/', views.req_deal,name='req_deal'),
    path('data/<int:param>/', views.product_category, name='product_category'),
]
