from pymongo import MongoClient
from bson.objectid import ObjectId

# Conexión a MongoDB
MONGO_URI = 'mongodb://localhost:27017/'
DB_NAME = 'videojuegos_db'
COLLECTION_NAME = 'games'

def get_client():
    """Obtiene cliente de MongoDB"""
    return MongoClient(MONGO_URI)

def get_games_collection():
    """Obtiene la colección de juegos"""
    client = get_client()
    db = client[DB_NAME]
    return db[COLLECTION_NAME]

def get_all_games():
    """Obtiene todos los juegos de la base de datos"""
    try:
        collection = get_games_collection()
        games = list(collection.find())

        # Convertir ObjectId a string para JSON
        for game in games:
            game['_id'] = str(game.get('_id', ''))

        return games
    except Exception as e:
        print(f"Error obteniendo juegos: {e}")
        return []

def create_game(game_data):
    """Crea un nuevo juego en la base de datos"""
    try:
        collection = get_games_collection()

        nombre = game_data.get('nombre')
        genero = game_data.get('genero')
        precio = game_data.get('precio')
        imagenUrl = game_data.get('imagenUrl')

        result = collection.insert_one({
            'nombre': nombre,
            'genero': genero,
            'precio': precio,
            'imagenUrl': imagenUrl
        })

        return str(result.inserted_id)
    except Exception as e:
        print(f"Error creando juego: {e}")
        return None

def update_game(game_id, game_data):
    """Actualiza un juego en la base de datos"""
    try:
        collection = get_games_collection()
        update_fields = {
            'nombre': game_data.get('nombre'),
            'genero': game_data.get('genero'),
            'precio': game_data.get('precio'),
            'imagenUrl': game_data.get('imagenUrl')
        }
        result = collection.update_one(
            {'_id': ObjectId(game_id)},
            {'$set': update_fields}
        )
        return result.matched_count > 0
    except Exception as e:
        print(f"Error actualizando juego: {e}")
        return False

def delete_game(game_id):
    """Elimina un juego de la base de datos"""
    try:
        collection = get_games_collection()
        result = collection.delete_one({'_id': ObjectId(game_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error eliminando juego: {e}")
        return False

