from django.conf.urls import url, include
from django.contrib import admin
from django.views.static import serve

from math_be import settings

urlpatterns = [
    url(r'^', include('api.urls')),
    url(r'^admin/', admin.site.urls),
]
