from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import random

app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:3000')

conn = psycopg2.connect("dbname=netflix user=postgres password=2023 host=localhost")
cursor = conn.cursor()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({'message': 'El nombre de usuario ya está en uso'}), 400

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()

    return jsonify({'message': 'Registro exitoso'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        user_data = {
            "id": user[0],
            "name": user[1],       
            "email": user[2]
        }

    if user:
        return jsonify({'user': user_data, 'message': 'Inicio de sesión exitoso'}), 200
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401

@app.route('/api/movies')
def get_movies():
    try:
        cursor.execute('SELECT * FROM movies')
        movies = cursor.fetchall()

        random_movie = random.choice(movies)

        return jsonify({
            'all_movies': [{'id': movie[0], 'title': movie[1], 'description': movie[2], 'poster': movie[3], 'genre': movie[4], 'duration': movie[5], 'category': movie[6], 'year': movie[7]} for movie in movies],
            'random_movie': {'id': random_movie[0], 'title': random_movie[1], 'description': random_movie[2], 'poster': random_movie[3], 'genre': random_movie[4], 'duration': random_movie[5], 'category': random_movie[6], 'year': random_movie[7]}
        })
    except Exception as e:
        print(f"Error al obtener películas: {e}")
        return jsonify(error="Error al obtener películas"), 500

@app.route('/api/movies/<int:movie_id>')
def get_movie_by_id(movie_id):
    try:
        cursor.execute('SELECT * FROM movies WHERE id=%s', (movie_id,))
        movie = cursor.fetchone()

        if movie:
            return jsonify({
                'id': movie[0],
                'title': movie[1],
                'description': movie[2],
                'poster': movie[3],
                'genre': movie[4],
                'duration': movie[5],
                'category': movie[6],
                'year': movie[7]
            })
        else:
            return jsonify(error="Película no encontrada"), 404
    except Exception as e:
        print(f"Error al obtener la película: {e}")
        return jsonify(error="Error al obtener la película"), 500


if __name__ == '__main__':
    app.run(debug=True)
