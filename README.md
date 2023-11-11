"Este proyecto esta hecho con fines academicos en donde se usan en donde se usan tecnologias como React, Tailwind, Python, Entre otras.

Este proyecto tiene como finalidad realizar un Clone FullStack de netflix donde se puedan realizar acciones como registrar, iniciar sesion, entre otras acciones usando la parte del BackEnd con Python y PostgreSQL para la base de datos.

Para iniciar este proyecto deberas modificar el archivo server.py ubicado en la carpeta backend en donde realizaras la conexion a tu base de datos ya creada modificando la conexion:

conn = psycopg2.connect("dbname=tu_base_de_datos user=tu_usuario password=tu_contraseña host=localhost")

antes de esto deberas instalar las siguientes librerias de python:

flask
flask_cors
psycopg2

debes verificar que tus columnas de la base de datos tengas los mismos nombres que en el archivo server de no ser asi deberas modificar de acuerdo a tu necesidad al igual que en la carpeta components deberas modificar algunos componentes.

para inicar el proyecto:

npm install

npm run dev

"