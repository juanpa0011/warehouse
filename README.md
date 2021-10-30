# Cyber Warehouse
<br>

### Company Warehouse & Contact Management.
<br>

Programa enfocado en la creacion de contactos, companias y sus respectivas regiones. Estilo entonado a la tematica Cyber-Punk. Acceso restringido a un unico Admin al principio, se pueden crear nuevos usuarios que solo pueden acceder a dichas funciones empresariales sin alterar la lista de usuarios o agregar nuevos.

## Orientacion de instalacion - <br>

### Requerimientos

1. Node.JS
2. MariaDB

<br>

#### Instalacion

1. Clonar este repositorio

git clone https://github.com/juanpa0011/warehouse

<br>

2. Instalar las dependencias necesarias

npm i -save axios <br>
npm i -save bcrypt <br>
npm i -save cors <br>
npm i -save dotenv <br>
npm i -save express <br>
npm i -save jsonwebtoken <br>
npm i -save mysql <br>

<br>

3. Crear la base de datos, nombre a elegir.

5. Importar el archivo warehouse.sql ubicado en ./database/warehouse.sql, puede usar algun gestor como phpMyAdmin.

A

6. Editar el archivo .env con los parametros de conexion. 

DB_HOST=localhost <br>
DB_USER=root <br>
DB_PASSWORD= <br>
DB_NAME=warehouse <br>

#### Activar el Backend

Al terminar, correr la linea de codgio node center.js o nodemon center.js. La API correra en el puerto 3000 ( http://localhost:3000 )

<br>