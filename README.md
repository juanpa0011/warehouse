# Cyber Warehouse
<br>

### Company Warehouse & Contact Management.
<br>

Programa enfocado en la creacion de contactos, companias y sus respectivas regiones. Estilo entonado a la tematica Cyber-Punk. Acceso restringido a un unico Admin al principio, se pueden crear nuevos usuarios que solo pueden acceder a dichas funciones empresariales sin alterar la lista de usuarios o agregar nuevos.

### Orientacion de instalacion - <br>

Base de datos "warehouse" 
<br>
database utf8mb4_unicode_ci 
<br>
Servidor: MariaDB 
<br>
Usuario: root@localhost 
<br> 
Conjunto de caracteres del servidor: UTF-8 Unicode (utf8mb4) 
<br>
Apache/2.4.48 (Win64) OpenSSL/1.1.1k PHP/8.0.8 
<br>

<br>

CREATE TABLE `canales` (id_canal int(22) AUTO_INCREMENT PRIMARY KEY, `name` varchar(120) NOT NULL);

<br>

CREATE TABLE `ciudades` (`id_ciudad` int(22) AUTO_INCREMENT PRIMARY KEY, `name` varchar(120) NOT NULL, `id_pais` int(22) NOT NULL);

<br>

CREATE TABLE `companies` (`id_company` int(22) AUTO_INCREMENT PRIMARY KEY, `name` varchar(120) NOT NULL, `id_ciudad` int(22) NOT NULL, `rank` varchar(60) NOT NULL);

enum('NUEVO','PREPARANDO','ENVIANDO','CANCELADO','ENTREGADO')
<br>

CREATE TABLE `contactos` (`id_contact` int(22) AUTO_INCREMENT PRIMARY KEY, `id_ciudad` int(22) NOT NULL, `id_company` int(22) NOT NULL, `rank` varchar(120) NOT NULL, `first_name` varchar(120) NOT NULL, `last_name` varchar(120) NOT NULL, `email` varchar(120) NOT NULL, `noise` enum('0','25','50','75','100') DEFAULT '0' )

<br>

CREATE TABLE `lista` (`id_list` int(22) AUTO_INCREMENT PRIMARY KEY, `id_canal` int(22) NOT NULL, `id_contact` int(22) NOT NULL)

<br>

CREATE TABLE `paises` (`id_pais` int(22) AUTO_INCREMENT PRIMARY KEY, `name` varchar(120) NOT NULL, `id_region` int(22) NOT NULL)

<br>

CREATE TABLE `regiones` (`id_region` int(22) AUTO_INCREMENT PRIMARY KEY, `name` varchar(120) NOT NULL)

<br>

CREATE TABLE `usuarios` (`id_user` int(22) AUTO_INCREMENT PRIMARY KEY, `first_name` varchar(120) NOT NULL, `last_name` varchar(120) NOT NULL, `perfil` varchar(120) NOT NULL, `password` varchar(220) NOT NULL, `role` enum('ADM','USER') DEFAULT 'USER', `noise` varchar(120) NOT NULL )

<br>

ALTER TABLE `ciudades` ADD CONSTRAINT `relacion-ciudad-pais` FOREIGN KEY (`id_pais`) REFERENCES `paises`(`id_pais`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `paises` ADD CONSTRAINT `relacion-pais-region` FOREIGN KEY (`id_region`) REFERENCES `regiones`(`id_region`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `lista` ADD CONSTRAINT `relacion-lista-canal` FOREIGN KEY (`id_canal`) REFERENCES `canales`(`id_canal`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `lista` ADD CONSTRAINT `relacion-lista-contact` FOREIGN KEY (`id_contact`) REFERENCES `contactos`(`id_contact`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `lista` ADD CONSTRAINT `relacion-lista-contact` FOREIGN KEY (`id_contact`) REFERENCES `contactos`(`id_contact`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `companies` ADD CONSTRAINT `relacion-compania-ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades`(`id_ciudad`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `contactos` ADD CONSTRAINT `relacion-contactos-ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades`(`id_ciudad`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

ALTER TABLE `contactos` ADD CONSTRAINT `relacion-contactos-compania` FOREIGN KEY (`id_company`) REFERENCES `companies`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

<br>

### Insertar Admin en usuarios - <br>


INSERT INTO `usuarios` (`first_name`, `last_name`, `perfil`, `password`, `role`, `email`) VALUES ("admin", "admin", "admin", "$2b$10$7TwQ4KtLpgUxA1zTJ4UKD.KRL7xRwI4Yufk8i8A94msNKoqyCAtcy", "ADM", "admin");

<br>

Como ultimo, usar nodemon para activar center.js y levantar dicho servidor.