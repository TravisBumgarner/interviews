# Setup
1. Install python2.7 and pip
   1. (Optional) install virtualenv and virtualenvwrapper
   2. (Optional) create virtualenv `mkvirtualenv symptoms_api`
   3. (Optional) open virtualenv `workon symptoms_api`
2.  Install requirements `pip install -r requirements.txt`
3. Create user `./manage.py createsuperuser`
4. Run server (on port 8000) `./manage.py runserver`

# Would Be Nice...
- Command for populating DB

# Went Well
- Boilerplate for Django app was super easy to get up and going

# Could be better

- retrieve method for Symptom could be cleaner. 

# Was Difficult

- Dealing with QuerySets is sometimes confusing
