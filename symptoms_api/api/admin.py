# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Symptom, Diagnosis, DiagnosisToSymptom


class DiagnosisInline(admin.TabularInline):
    model = DiagnosisToSymptom
    extra = 5


@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    inlines = (
        DiagnosisInline,
    )


@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    pass


@admin.register(DiagnosisToSymptom)
class DiagnosisToSymptomAdmin(admin.ModelAdmin):
    pass
