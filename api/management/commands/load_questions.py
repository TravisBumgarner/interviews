import csv

from django.core.management.base import BaseCommand, CommandError

from api.models import Question, Answer

class Command(BaseCommand):
    help = 'Loads questions from the specified CSV file into the database.' \
           'Input should be of the format question|answer|distractor1,distractor2'

    def handle(self, *args, **options):
        print('running!l')

    def add_arguments(self, parser):
        parser.add_argument(
            '--filename', dest='filename', required=True,
            help='the file to process',
        )

    def handle(self, *args, **options):
        with open(options['filename'], 'rb') as f:
            reader = csv.reader(f, delimiter='|')
            for row in reader:
                question, answer, raw_detractors = row
                detractors = raw_detractors.split(',')

                q = Question(text=question)
                q.save()

                a = Answer(text=answer, is_correct=True, question=q)
                a.save()

                for d in detractors:
                    a = Answer(text=d, is_correct=False, question=q)
                    a.save()

                q.save()



# question|answer|distractors
# What is 1754 - 3936?|-2182|3176, 6529, 6903
# What is 3009 * 5075?|15270675|3572, 8772, 9415
# What is 9702 - 9102?|600|7360, 2043, 2982, 1235
# What is 6324 * 4040?|25548960|3952, 3906, 2694
# What is 7269 * 2771?|20142399|874