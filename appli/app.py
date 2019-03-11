from flask import Flask

app = Flask(__name__)

from flask_uikit import UIkit
UIkit(app)

from flask_sqlalchemy import *
import pymysql
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql+pymysql://pauthier:pauthier@servinfo-mariadb/DBpauthier')
db=SQLAlchemy(app)
app.config['SECRET_KEY'] = "3ec22ed8-06fd-455e-8132-94b9fc65ba51"
