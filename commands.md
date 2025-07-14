## Backend

python3 -m venv env
env\Scripts\activate

pip install -r requirements.txt

django-admin startproject tutorial
python manage.py startapp chatbot
python manage.py makemigrations
python manage.py migrate

python manage.py runserver

## Frontend

npx create-react-app frontend
npm install axios