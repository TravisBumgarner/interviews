from django.conf.urls import url, include
from django.contrib import admin
from django.views.static import serve

from symptoms_api import settings

urlpatterns = [
    url(r'^', include('api.urls')),
    url(r'^admin/', admin.site.urls),
]
