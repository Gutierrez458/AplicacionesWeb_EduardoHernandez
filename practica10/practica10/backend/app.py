from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
# Permitimos todos los métodos explícitamente para evitar errores 405
CORS(app, resources={r"/*": {"origins": "*"}})

# CONEXIÓN A MONGODB ATLAS
uri = "mongodb+srv://hernandezeduardo:$HGeduardo06@cluster0.2hv2wpb.mongodb.net/videojuegos_db?retryWrites=true&w=majority"
cliente = MongoClient(uri)
db = cliente["videojuegos_db"]
coleccion = db["games"]

@app.route('/games', methods=['GET'])
def obtener_games():
    lista = []
    for juego in coleccion.find():
        juego["_id"] = str(juego["_id"])
        lista.append(juego)
    return jsonify(lista)

@app.route('/games', methods=['POST'])
def insertar_game():
    datos = request.json
    coleccion.insert_one(datos)
    return jsonify({"mensaje": "Juego insertado"})

@app.route('/games/<id>', methods=['PUT'])
def actualizar_game(id):
    datos = request.json
    coleccion.update_one({"_id": ObjectId(id)}, {"$set": datos})
    return jsonify({"mensaje": "Juego actualizado"})

@app.route('/games/<id>', methods=['DELETE'])
def eliminar_game(id):
    # Convertimos el ID de string a ObjectId de MongoDB
    resultado = coleccion.delete_one({"_id": ObjectId(id)})
    if resultado.deleted_count > 0:
        return jsonify({"mensaje": "Juego eliminado"}), 200
    return jsonify({"error": "No se encontró el juego"}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)