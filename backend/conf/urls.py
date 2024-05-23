from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from .schema import schema

urlpatterns = [
    path("admin/", admin.site.urls),
    
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path('auth/', include('dj_rest_auth.urls')),
]
