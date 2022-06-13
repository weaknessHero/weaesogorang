from django.urls import re_path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^users/', include('users.urls')),
    re_path(r'^', include('home.urls')),
    re_path(r'^chat/', include('chat.urls')),
    re_path(r'^post/', include('post.urls')),
    re_path(r'^admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)