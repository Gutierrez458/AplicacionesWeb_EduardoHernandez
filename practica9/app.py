from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

cliente = MongoClient("mongodb://localhost:27017/")
db = cliente["escuelaDB"]
coleccion = db["alumnos"]

@app.route('/')
def inicio():
    return "API funcionando"

@app.route("/alumnos", methods=["GET"])
def obtener_alumnos():
    alumnos = list(coleccion.find({}, {"_id": 0}))
    return jsonify(alumnos)

@app.route("/alumnos", methods=["POST"])
def insertar_alumno():
    datos = request.json

    alumno = {
        "nombre": datos["nombre"],
        "edad": datos["edad"],
        "carrera": datos["carrera"]
    }

    coleccion.insert_one(alumno)

    return jsonify({"mensaje": "Alumno agregado correctamente"})

if __name__ == "__main__":
    app.run(debug=True)