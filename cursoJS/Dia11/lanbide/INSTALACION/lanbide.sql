-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-06-2022 a las 10:11:33
-- Versión del servidor: 8.0.27-0ubuntu0.20.04.1
-- Versión de PHP: 7.3.33-1+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lanbide`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lan_empleo`
--

CREATE TABLE `lan_empleo` (
  `codigo` varchar(40) NOT NULL,
  `desEmpleo` varchar(150) NOT NULL,
  `desPuesto` text,
  `tipo` int DEFAULT NULL,
  `pais` varchar(12) DEFAULT NULL,
  `provincia` varchar(15) DEFAULT NULL,
  `municipio` varchar(50) DEFAULT NULL,
  `modif` char(2) DEFAULT NULL,
  `fecMod` date DEFAULT NULL,
  `fecPub` date DEFAULT NULL,
  `disc` char(2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lan_formacion`
--

CREATE TABLE `lan_formacion` (
  `codigo` varchar(40) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `municipio` varchar(40) NOT NULL,
  `centro` varchar(60) NOT NULL,
  `f_inicio` date DEFAULT NULL,
  `f_fin` date DEFAULT NULL,
  `horas` varchar(4) DEFAULT NULL,
  `colectivo` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `codprov` char(2) DEFAULT NULL,
  `codmuni` char(5) DEFAULT NULL,
  `lunes` char(1) DEFAULT NULL,
  `martes` char(1) DEFAULT NULL,
  `miercoles` char(1) DEFAULT NULL,
  `jueves` char(1) DEFAULT NULL,
  `viernes` char(1) DEFAULT NULL,
  `sabado` char(1) DEFAULT NULL,
  `domingo` char(1) DEFAULT NULL,
  `hora_ini_m` varchar(10) DEFAULT NULL,
  `hora_fin_m` varchar(10) DEFAULT NULL,
  `hora_ini_t` varchar(10) DEFAULT NULL,
  `hora_fin_t` varchar(10) DEFAULT NULL,
  `modalidad` char(1) DEFAULT NULL,
  `f_alta` date DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lan_empleo`
--
ALTER TABLE `lan_empleo`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `lan_formacion`
--
ALTER TABLE `lan_formacion`
  ADD PRIMARY KEY (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
