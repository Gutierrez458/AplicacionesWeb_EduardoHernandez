from flask import Flask, request, jsonify
from flask_cors import CORS
from models.game_model import get_all_games, create_game, delete_game
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_FOLDER = os.path.join(os.path.dirname(BASE_DIR), 'public')

app = Flask(__name__, static_folder=PUBLIC_FOLDER, static_url_path='')

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:4200", "http://localhost:3000"],
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/games', methods=['GET'])
def get_games():
    games = get_all_games()
    return jsonify(games), 200

@app.route('/games', methods=['POST'])
def add_game():
    data = request.json
    game_id = create_game(data)
    
    return jsonify({
        "message": "Videojuego agregado",
        "id": game_id
    }), 201

@app.route('/games/<game_id>', methods=['DELETE'])
def remove_game(game_id):
    success = delete_game(game_id)
    if success:
        return jsonify({"message": "Videojuego eliminado"}), 200
    else:
        return jsonify({"message": "Error al eliminar"}), 400

if __name__ == '__main__':
    app.run(debug=True)