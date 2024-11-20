from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def hello_world():  # put application's code here
    data = request.get_json()
    print(data)
    return jsonify({"message": "Hello World!"})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
