from pymongo import MongoClient
from bson.objectid import ObjectId

# Configuración de MongoDB
MONGO_URI = 'mongodb://localhost:27017/'
DB_NAME = 'videojuegos_db'
COLLECTION_NAME = 'games'

def get_games_collection():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    return db[COLLECTION_NAME]

def get_all_games():
    try:
        collection = get_games_collection()
        games = list(collection.find())
        for game in games:
            game['_id'] = str(game['_id'])  # Convertir ID a string para Angular
        return games
    except Exception as e:
        print(f"Error al obtener juegos: {e}")
        return []

def create_game(game_data):
    try:
        collection = get_games_collection()
        # Insertamos el objeto tal cual viene de Angular
        result = collection.insert_one(game_data)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error al crear juego: {e}")
        return None

def delete_game(game_id):
    try:
        collection = get_games_collection()
        result = collection.delete_one({'_id': ObjectId(game_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error al eliminar juego: {e}")
        return False