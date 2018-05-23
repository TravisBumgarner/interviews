# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=300, unique=True)

    def __unicode__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.IntegerField(unique=False)
    is_correct = models.BooleanField()

    def __unicode__(self):
        return "{} - {}".format(self.text, self.is_correct)