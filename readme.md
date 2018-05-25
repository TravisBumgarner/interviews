# Setup

0. Clone directory
1. Install python2.7 (optionally pip, virtualenv, virtualenvwrapper)
2. Install project dependencies from `requirements.txt` (with pip: `pip install -r requirements.txt`)
3. `cd` into directory with `manage.py`
4. Create superuser `python manage.py createsuperuser`
5. Load questions into project from question_dump.csv `python manage.py load_questions --filename ./question_dump.csv`
6. Launch server `python manage.py runserver`