from cgitb import reset
import json
from flask import Flask, render_template, request, Response
from AStar import startGame

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/solve", methods=['POST'])
def solve():
    game = request.form['game']
    gamePlay = json.loads(game)
    sol = startGame(gamePlay)
    return Response(json.dumps(sol), mimetype='application/json')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
