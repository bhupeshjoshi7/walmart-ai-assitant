cd backend
python -m venv walmart
source walmart/bin/activate
pip install -r requirements.txt

create .env file and set 
GOOGLE_API_KEY= ""

uvicorn app.main:app --reload


for any api related doc 

http://127.0.0.1:8000/docs 