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

npm install

<br>

3. Crear la base de datos, nombre a elegir.

Naturalmente la base de datos original es 'warehouse' pero este dato puede ser modificador más adelante.

4. Importar el archivo warehouse.sql ubicado en ./database/warehouse.sql, puede usar algun gestor como phpMyAdmin.

Este archivo tiene todos los parametros, tablas y valores ingresados con el objetivo de iniciar las primeras pruebas.

5. Editar el archivo .env con los parametros de conexion. 

DB_HOST=localhost <br>
DB_USER=root <br>
DB_PASSWORD= <br>
DB_NAME=warehouse <br>

#### Activar el Backend

Al terminar, correr la linea de codgio node center.js o nodemon center.js. La API correra en el puerto 3000 ( http://localhost:3000 )

<br>

Para ingresar como admin, ingresar tanto 'admin' en usuario como en contraseña.

<br>
