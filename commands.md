## Backend

python3 -m venv env
env\Scripts\activate
pip install -r requirements.txt

cd backend
django-admin startproject tutorial
python manage.py startapp chatbot
python manage.py makemigrations
python manage.py migrate

python manage.py runserver

## Frontend

cd frontend

npx create-react-app frontend
npm install axios

npm start