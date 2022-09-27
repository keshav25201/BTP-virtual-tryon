from crypt import methods
import jwt
from flask import Flask,request,jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from utils import parse_json
"""
routes
/api/products/ - get all products
/api/products/:id - particular id product

"""


# print(client.list_database_names())
app = Flask(__name__)
db = client["btp"]
Product = db["Product"]
User = db["User"]
#authentication routes
@app.route('/api/login',methods=['POST'])
def login():
    # data = request.get_json()
    return "successful"
@app.route('/api/register',methods=['POST'])
def register():
    return ""
#product routes
@app.route("/api/product",methods=['GET'])
def get_all_products():
    results = list(Product.find())
    results = [parse_json(x) for x in results]
    return jsonify(results)
@app.route("/api/product/<product_id>",methods=['GET','POST',"PUT",'DELETE'])
def product(product_id):
    ID = ObjectId(product_id)
    result = Product.find_one({"_id" : ID})
    return jsonify(result)
@app.route("/api/product/add",methods=["POST"])
def add_product():
    data = request.get_json()
    Product.insert_one(data)
    return ""
if __name__ == "__main__":
    app.run(debug=True)
