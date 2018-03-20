# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Symptom, Diagnosis, DiagnosisToSymptom


@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    pass


@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    pass


@admin.register(DiagnosisToSymptom)
class DiagnosisToSymptomAdmin(admin.ModelAdmin):
    pass
