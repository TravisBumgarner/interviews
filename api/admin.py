# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from api.models import *


class AnswerInline(admin.TabularInline):
    model = Question.answers.through
    extra = 0


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = (
        AnswerInline,
    )

    fields = (
        'text',
        'operation_type',
        'has_negative_values'
    )

    list_display = (
        'text',
        'has_negative_values',
        'operation_type',
    )
