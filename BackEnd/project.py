"""
Flask App for Movie Rating

Authors: Sania Talha, Obi Ojji, Naoman Tabassam, Jake Davis, Mohab Khalifa
Date: April 2026
"""

# =========================
# Imports
# =========================
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import jwt
from functools import wraps
from jwt import ExpiredSignatureError, InvalidTokenError

# =========================
# App Config
# =========================
app = Flask(__name__)

#  DATABASE URI 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://neondb_owner:npg_XvailguPW43H@ep-little-bird-ab621z9n.eu-west-2.aws.neon.tech/neondb?sslmode=require" 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev_secret_key")


# =========================
# Database Models
# =========================

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    security_question = db.Column(db.String(255))
    security_answer = db.Column(db.String(255))
    username = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(255))


class Review(db.Model):
    __tablename__ = 'reviews'

    review_table_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    movie_name = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    rating = db.Column(db.Float)
    imdb = db.Column(db.Float)
    rotten = db.Column(db.Float)
    image = db.Column(db.String(500))


# ========
# JWT func
# ========

def get_user_id_from_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    try:
        token = auth_header.split(" ")[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded.get("user_id")

    except ExpiredSignatureError:
        print("Token expired")
        return None

    except InvalidTokenError:
        print("Invalid token")
        return None


def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_id = get_user_id_from_token()

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        return f(user_id, *args, **kwargs)

    return wrapper


# =========
# Routes
# =========

@app.route('/')
def index():
    return "Flask is running ✅"

# Pages (optional if using frontend framework)
@app.route('/signup')
def signup():
    return render_template("signup.html")


@app.route('/login')
def login():
    return render_template("login.html")


# =========================
# GET the account movie list
# =========================
@app.route('/home', methods=['GET'])
@require_auth
def home(user_id):
    user_reviews = Review.query.filter_by(user_id=user_id).all()

    movies = [
        {
            "movie_name": review.movie_name,
            "year": review.year,
            "rating": review.rating
        }
        for review in user_reviews
    ]

    return jsonify({"movies": movies})


# =========================
# POST to add review
# =========================

@app.route('/add-review', methods=['POST'])
@require_auth
def add_review(user_id):
    data = request.get_json()

    new_review = Review(
        user_id=user_id,
        movie_name=data.get("movie_name"),
        year=data.get("year"),
        rating=data.get("rating"),
        imdb=data.get("imdb"),
        rotten=data.get("rotten"),
        image=data.get("image")
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review added successfully"}), 201


# =========================
# Run App
# =========================
if __name__ == '__main__':
    app.run(debug=True)