from cgitb import reset
from flask import Flask,render_template,request,Response

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/solve",methods=['POST'])
def solve():
   test= request.get_json("arr")
   return render_template("index.html",arr=test)

    
if __name__ == "__main__":
     app.run()
