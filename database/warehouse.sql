-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-11-2021 a las 14:31:16
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `warehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canales`
--

CREATE TABLE `canales` (
  `id_canal` int(22) NOT NULL,
  `name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canales`
--

INSERT INTO `canales` (`id_canal`, `name`) VALUES
(1, 'Instagram'),
(2, 'Twitter'),
(3, 'WhatsApp'),
(4, 'Telegram'),
(5, 'Facebook');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(22) NOT NULL,
  `name` varchar(120) NOT NULL,
  `id_pais` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `name`, `id_pais`) VALUES
(11, 'Washington', 10),
(12, 'BSAS', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `id_company` int(22) NOT NULL,
  `name` varchar(120) NOT NULL,
  `id_ciudad` int(22) NOT NULL,
  `dir` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`id_company`, `name`, `id_ciudad`, `dir`) VALUES
(10, 'Test1', 12, 'Test1'),
(11, 'Test2', 11, 'Test2'),
(12, 'Test3', 11, 'Test3 '),
(13, 'Test4', 11, 'Test4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contact` int(22) NOT NULL,
  `id_ciudad` int(22) DEFAULT NULL,
  `id_company` int(22) DEFAULT NULL,
  `rank` varchar(60) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `last_name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `noise` enum('0','25','50','75','100') NOT NULL DEFAULT '0',
  `imgurl` varchar(220) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contact`, `id_ciudad`, `id_company`, `rank`, `first_name`, `last_name`, `email`, `noise`, `imgurl`) VALUES
(13, 12, 11, 'Marketing', 'Miguel', 'Angel', 'miguelangel@gmail.com', '75', ''),
(14, 11, 10, 'CEO', 'Marco', 'Murro', 'marcom@gmail.com', '100', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `id_list` int(22) NOT NULL,
  `id_canal` int(22) NOT NULL,
  `id_contact` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id_list`, `id_canal`, `id_contact`) VALUES
(33, 1, 13),
(34, 4, 13),
(35, 4, 14),
(36, 5, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(22) NOT NULL,
  `name` varchar(120) NOT NULL,
  `id_region` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `name`, `id_region`) VALUES
(10, 'EEUU', 13),
(11, 'Argentina', 14),
(12, 'Chile', 14),
(13, 'Canada', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `id_region` int(22) NOT NULL,
  `name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id_region`, `name`) VALUES
(13, 'Norte America'),
(14, 'Sudamerica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(22) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `last_name` varchar(120) NOT NULL,
  `perfil` varchar(120) NOT NULL,
  `password` varchar(220) NOT NULL,
  `role` enum('ADM','USER') NOT NULL DEFAULT 'USER',
  `email` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `first_name`, `last_name`, `perfil`, `password`, `role`, `email`) VALUES
(2, 'Ben', 'Pela', 'benpela', '$2b$10$9jvY8xSf83JAXsiXkYvGjO.g5Zl0w214K6k58.QduqAwpAIfg7g/a', 'USER', 'benjapela@gmail.com'),
(3, 'admin', 'admin', 'admin', '$2b$10$7TwQ4KtLpgUxA1zTJ4UKD.KRL7xRwI4Yufk8i8A94msNKoqyCAtcy', 'ADM', 'admin'),
(4, 'user', 'user', 'user', '$2b$10$rQR3wvI9pgfRJ7v/6qZv2.Ra1C4HtNqqOqK14.2kfJ.X//l0Qdz2u', 'USER', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canales`
--
ALTER TABLE `canales`
  ADD PRIMARY KEY (`id_canal`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `ciudad-pais` (`id_pais`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id_company`),
  ADD KEY `company-ciudad` (`id_ciudad`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contact`),
  ADD KEY `contact-city` (`id_ciudad`),
  ADD KEY `contact-company` (`id_company`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id_list`),
  ADD KEY `contact-list` (`id_contact`),
  ADD KEY `canal-list` (`id_canal`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`),
  ADD KEY `pais-regiones` (`id_region`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id_region`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `perfil` (`perfil`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canales`
--
ALTER TABLE `canales`
  MODIFY `id_canal` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `id_company` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contact` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id_list` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id_region` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudad-pais` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `company-ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contact-city` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contact-company` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id_company`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `canal-list` FOREIGN KEY (`id_canal`) REFERENCES `canales` (`id_canal`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contact-list` FOREIGN KEY (`id_contact`) REFERENCES `contactos` (`id_contact`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paises`
--
ALTER TABLE `paises`
  ADD CONSTRAINT `pais-regiones` FOREIGN KEY (`id_region`) REFERENCES `regiones` (`id_region`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
