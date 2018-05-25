from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from api.serializers import *
from api.models import *
from api.utils import save_question


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = None

    def create(self, request, *args, **kwargs):
        d = request.data

        answer = int(d['correctAnswer'])
        detractors = [int(i) for i in d['incorrectAnswers'].split(',') if len(i) > 0]
        question = d['question']

        save_question(question, answer, detractors)
        return Response('Question created!')

    def list(self, request, *args, **kwargs):
        requested_operation_types = request.query_params['requestedOperationTypes'].split(',')
        use_negative_values = int(request.query_params['useNegativeValues'])

        queryset = self.queryset.filter(operation_type__in=requested_operation_types)

        if not use_negative_values:
            queryset = queryset.exclude(has_negative_values=True)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pagination_class = None
