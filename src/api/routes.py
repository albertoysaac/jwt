"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    print(request_body)
    if User.query.filter_by(email=request_body["email"]).first():
        return jsonify({"msg": "User already exists"}), 400
    else:
        user = User(names=request_body["names"], last_name=request_body["last_name"], age = request_body["age"],
                email=request_body["email"], password=request_body["password"])
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(email=data["email"]).first()
    
    if not user or data["password"] != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)


@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

