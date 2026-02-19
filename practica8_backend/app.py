from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta de prueba
@app.route('/eventos', methods=['GET'])
def obtener_eventos():
    eventos = [
        {"titulo": "Concierto Sinfónico", "fecha": "2026-03-15", "lugar": "Teatro Hidalgo", "precio": 250},
        {"titulo": "Exposición de Arte", "fecha": "2026-04-10", "lugar": "Museo Nacional", "precio": 0},
        {"titulo": "Obra de Teatro", "fecha": "2026-05-01", "lugar": "Teatro Principal", "precio": 150}
    ]
    return jsonify(eventos)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
