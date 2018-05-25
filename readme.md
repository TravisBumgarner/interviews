# Setup

0. Clone directory
1. Install python2.7 (optionally pip, virtualenv, virtualenvwrapper)
2. Install project dependencies from `requirements.txt` (with pip: `pip install -r requirements.txt`)
3. Create db `python manage.py migrate`
3. Create superuser `python manage.py createsuperuser`
4. Load questions into project from question_dump.csv `python manage.py load_questions --filename ./question_dump.csv`
5. Launch server `python manage.py runserver`
6. API admin is viewable at `localhost:8000/admin` (use superuser credentials)
