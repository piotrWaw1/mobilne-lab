import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "secret_key"
CORS(app)

jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():  # put application's code here
    data = request.get_json()
    login = data.get('login')
    password = data.get('password')
    with sqlite3.connect("data.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_table WHERE login = ?", (login,))
        user = cursor.fetchone()
        if user and password == user[2]:
            access_token = create_access_token(identity=login)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"error": "User not found"}), 404


@app.route('/register', methods=['POST'])
def register():  # put application's code here
    data = request.get_json()
    login = data.get('login')
    password = data.get('password')
    try:
        with sqlite3.connect("data.db") as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO user_table (login, password) VALUES (?, ?)", (login, password))
            conn.commit()
            return jsonify({"message": "User added successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 400


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
