from crypt import methods
import jwt
from flask import Flask,request,jsonify,make_response
from pymongo import MongoClient
from bson.objectid import ObjectId
from utils import parse_json
from functools import wraps
import bcrypt
import datetime
from flask_cors import CORS
"""
routes
/api/products/ - get all products
/api/products/:id - particular id product

"""


# print(client.list_database_names())
app = Flask(__name__)
CORS(app,support_credentials=True,origins=["http://localhost:3000"])
app.config['SECRET_KEY'] = "wt4cngf9wiu84c"
client = MongoClient("",tlsInsecure = True)
db = client["btp"]
Product = db["Product"]
User = db["User"]

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token = request.get_json()['token']
        if token:
            try:
                data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
                data["token"] = token
                print('-----user already authenticated-------')
                return make_response(data)
            except Exception as e:
                print(e)
        return f(*args,**kwargs)
    return decorated

#authentication routes
@app.route('/api/login',methods=['POST'])
@token_required
def login():
    data = request.get_json()
    mobile_no = data["mobile"]
    password = data["password"]
    user = User.find_one({"mobile_no" : int(mobile_no)})
    if not user:
        return "authentication failed",401
    hash = user["password"]
    userBytes = password.encode('utf-8')
    result = bcrypt.checkpw(userBytes, hash)
    if not result:
        return "authentication failed",401
    exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    token = jwt.encode({'mobile_no' : mobile_no,'exp' : exp},app.config['SECRET_KEY'],algorithm="HS256")
    print("---generating new login token----",token)

    response = make_response({"token" : token,"mobile" : mobile_no,'exp' : exp})
    # response.set_cookie('token',token)
    # response.headers.add('Access-Control-Allow-Credentials',True)
    # return token.decode('UTF-8')
    return response
@app.route('/api/register',methods=['POST'])
def register():
    data = request.get_json()
    # mobile_no = data["mobile_no"]
    # password = data["password"]
    # name = data["name"]
    # gender = data["gender"]
    password = data["password"]
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes,salt)
    data["password"] = hash
    new_user = data
    try:
        User.insert_one(new_user)
        return "successful"
    except Exception as e:
        raise
    return ""
#product routes
@app.route("/api/product",methods=['GET'])
def get_all_products():
    results = list(Product.find())
    results = [parse_json(x) for x in results]
    for x in results:
        x["_id"] = x["_id"]["$oid"]
    return jsonify(results)
@app.route("/api/product/<product_id>",methods=['GET','POST',"PUT",'DELETE'])
def product(product_id):
    ID = ObjectId(product_id)
    result = Product.find_one({"_id" : ID})
    return parse_json(result)
@app.route("/api/product/add",methods=["POST"])
def add_product():
    data = request.get_json()
    Product.insert_one(data)
    return ""
@app.route("/api/users/all")
def users():
    users = User.find()
    for user in users:
        print(user)
    return ""
if __name__ == "__main__":
    app.run(debug=True)
