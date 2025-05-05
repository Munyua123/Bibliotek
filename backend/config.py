import os

from dotenv import load_dotenv

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

load_dotenv()

app = Flask(__name__,
            static_folder='../frontend/build',
            static_url_path="/",
            template_folder='../frontend/build')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)

