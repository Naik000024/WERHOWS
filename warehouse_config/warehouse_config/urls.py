from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Warehouse API Terminal: [ ONLINE ]")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('order.urls')), # This connects your order app to the API
    path('user/', include('user.urls')),
]