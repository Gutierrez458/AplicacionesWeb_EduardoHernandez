from flask import Flask, request, jsonify
from flask_cors import CORS
from models.game_model import get_all_games, create_game, delete_game
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_FOLDER = os.path.join(os.path.dirname(BASE_DIR), 'public')

app = Flask(__name__, static_folder=PUBLIC_FOLDER, static_url_path='')
CORS(app) 

@app.route('/games', methods=['GET'])
def get_games():
    return jsonify(get_all_games()), 200

@app.route('/games', methods=['POST'])
def add_game():
    data = request.json
    game_id = create_game(data)
    if game_id:
        return jsonify({"message": "Juego creado", "id": game_id}), 201
    return jsonify({"message": "Error al crear"}), 400

@app.route('/games/<game_id>', methods=['DELETE'])
def remove_game(game_id):
    if delete_game(game_id):
        return jsonify({"message": "Juego eliminado"}), 200
    return jsonify({"message": "No se encontró el juego"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)

    