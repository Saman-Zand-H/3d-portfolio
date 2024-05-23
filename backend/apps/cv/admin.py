from django.contrib import admin
from django.db.models import Model
from . import models


class SubModelAdmin(admin.ModelAdmin):
    pass

for name, obj in models.__dict__.items():
    if isinstance(obj, type) and issubclass(obj, Model):
        admin.site.register(obj, SubModelAdmin)
