from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

# CONEXIÓN A MONGODB ATLAS
uri = "mongodb+srv://hernandezeduardo:$HGeduardo06@cluster0.2hv2wpb.mongodb.net/videojuegos_db?retryWrites=true&w=majority"

cliente = MongoClient(uri)

db = cliente["videojuegos_db"]
coleccion = db["games"]

# OBTENER TODOS
@app.route('/games', methods=['GET'])
def obtener_games():
    lista = []
    for juego in coleccion.find():
        juego["_id"] = str(juego["_id"])
        lista.append(juego)
    return jsonify(lista)

# INSERTAR
@app.route('/games', methods=['POST'])
def insertar_game():
    datos = request.json
    coleccion.insert_one(datos)
    return jsonify({"mensaje": "Juego insertado"})

# ACTUALIZAR
@app.route('/games/<id>', methods=['PUT'])
def actualizar_game(id):
    datos = request.json
    coleccion.update_one(
        {"_id": ObjectId(id)},
        {"$set": datos}
    )
    return jsonify({"mensaje": "Juego actualizado"})

# ELIMINAR
@app.route('/games/<id>', methods=['DELETE'])
def eliminar_game(id):
    coleccion.delete_one({"_id": ObjectId(id)})
    return jsonify({"mensaje": "Juego eliminado"})


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)