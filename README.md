#Setup instructions 

#Prerequisites
-> Python 3.10+

#Step 1. Clone repository
-> cd meditask

#Step 2. Setup virtual environment
-> python -m venv venv
#Windows
-> venv/Scripts/activate
#Linux
-> source venv/bin/activate

#Step 3. Install dependencies and run migration
-> pip install -r requirements.txt
-> python manage.py migrate

#Step 4. Run server
-> python manage.py runserver

#Step 5. Run frontend
-> cd frontend
-> npm install
-> npm start

This will run the app on http://localhost:3000






