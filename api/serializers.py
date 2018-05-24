from .models import *
from rest_framework import serializers


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = (
            'id',
            'text',
            'is_correct_answer',

        )


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = (
            'id',
            'text',
            'has_negative_values',
            'operation_type',
            'answers'
        )