"""
Flask App for Movie Rating

Authors: Naoman Tabassam, 
Date: April 2026
"""

# import all relevant modules 
from flask import Flask, render_template, request, send_file
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import os
from io import BytesIO
import base64
import plotly.express as px
import numpy as np
import requests
import json

# intitalise the flask app
app = Flask(__name__)

# below give link to database 
app.config['SQLALCHEMY_DATABASE_URI'] = f""
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# initialise flask app with SQL-alchemy ORM
db = SQLAlchemy(app)

# class of database table
class Review(db.Model):
    __tablename__ = 'reviews'
    review_table_id = db.Column("review_table_id", db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column("user_id", db.Integer, ForeignKey("users.user_id"), nullable=False)

    movie_name = db.Column("movie_name", db.String(255), nullable=False)
    year = db.Column("year", db.Integer)
    rating = db.Column("rating", db.Float)
    imdb = db.Column("rating", db.Float)
    rotten = db.Column("rotten", db.Float)
    image = db.Column("image", db.String(500))

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column("user_id", db.Integer, primary_key=True, autoincrement=True)
    email = db.Column("email", db.String(255), nullable=False, unique=True)
    password = db.Column("password", db.String(255), nullable=False)
    security_question = db.Column("security_question", db.String(255))
    security_answer = db.Column("security_answer", db.String(255))
    username = db.Column("username", db.String(100), unique=True)
    name = db.Column("name", db.String(255))


# signup page
@app.route('/signup')
def signup():
    return render_template("signup.html")


# login page
@app.route('/login')
def login():
    return render_template("login.html")

# home page
@app.route('/home')
def home():
    return render_template("home.html")


