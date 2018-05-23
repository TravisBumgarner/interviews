# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from api.models import *


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = (
        AnswerInline,
    )

    list_display = (
        'text',
        'has_negative_values',
        'operation_type',
    )
