-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2023 a las 22:47:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `project`
--
CREATE DATABASE IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `id_procedimiento` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `fecha_creacion` date DEFAULT current_timestamp(),
  `estado` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellido` varchar(15) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefono` varchar(14) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `fech_nac` date NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `id_procedimiento` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`id`, `nombre`, `apellido`, `cedula`, `email`, `telefono`, `direccion`, `fech_nac`, `id_especialidad`, `id_procedimiento`) VALUES
(18, 'Hennie Haz', 'Haz', 'V-27606850', 'hhazan01@gmail.com', '04129110065', 'Ipsum ullam vitae commodo beatae voluptatem velit eaque deserunt et minus eum mollitia consequuntur minus', '2000-01-24', 1, '9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id`, `descripcion`) VALUES
(1, 'Especialidad clínica'),
(2, 'Especialidad quirúrgica'),
(3, 'Especialidad médico-quirúrgica'),
(4, 'Especialidad de laboratorio o diagnóstico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

CREATE TABLE `modulos` (
  `id` int(11) NOT NULL,
  `modulo` varchar(45) DEFAULT NULL,
  `padre_id` int(11) DEFAULT NULL,
  `vista` varchar(45) DEFAULT NULL,
  `icon_menu` varchar(45) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`id`, `modulo`, `padre_id`, `vista`, `icon_menu`, `orden`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'DashBoard', 0, 'dashboard.php', 'fas fa-tachometer-alt', 0, '0000-00-00 00:00:00', NULL),
(11, 'Configuración', 0, '', 'fas fa-cogs', 2, '0000-00-00 00:00:00', NULL),
(12, 'Usuarios', 11, 'usuario.php', 'fas fa-users', 3, '0000-00-00 00:00:00', NULL),
(13, 'Administrador', 11, 'roles.php', 'fas fa-tablet-alt', 4, '0000-00-00 00:00:00', NULL),
(21, 'Gestionar Citas', 0, 'citas.php', 'fa-solid fa-calendar-week', 1, '2023-11-23 08:15:18', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellido` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefono` varchar(14) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `fech_nac` date NOT NULL,
  `id_patologia` int(11) NOT NULL,
  `condicion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologia`
--

CREATE TABLE `patologia` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologia`
--

INSERT INTO `patologia` (`id`, `descripcion`) VALUES
(1, 'Ántrax'),
(2, 'Asma'),
(3, 'Autismo'),
(4, 'Artritis'),
(5, 'Cáncer'),
(6, 'Clamidia'),
(7, 'Culebrilla (herpes zóster)'),
(8, 'Déficit de atención e hiperactividad'),
(9, 'Diabetes'),
(10, 'Ébola'),
(11, 'Embarazo y ETS'),
(12, 'Enfermedades de transmisión sexual (ETS)'),
(13, 'Enfermedad inflamatoria pélvica (EIP)'),
(14, 'Enfermedad pulmonar obstructiva crónica'),
(15, 'Epilepsia'),
(16, 'Escarlatina'),
(17, 'Estreptococo del grupo B'),
(18, 'Gonorrhea'),
(19, 'Haemophilus influenzae tipo b (Hib)'),
(20, 'Hemofilia'),
(21, 'Herpes genital'),
(22, 'Infeccíon genital por VPH'),
(23, 'Influenza (gripe)'),
(24, 'Listeria (Listeriosis)'),
(25, 'Meningitis bacteriana'),
(26, 'Meningitis viral'),
(27, 'Meningitis micótica'),
(28, 'Paperas'),
(29, 'Poliomielitis'),
(30, 'Rabia'),
(31, 'Rotavirus'),
(32, 'Shigella – Shigellosis'),
(33, 'Sífilis'),
(34, 'Silicosis'),
(35, 'Síndrome alcohólico fetal'),
(36, 'Síndrome de fatiga crónica (SFC)'),
(37, 'Síndrome de Tourette'),
(38, 'Tabaquismo'),
(39, 'Tosferina'),
(40, 'Tricomoniasis'),
(41, 'Tuberculosis (TB)'),
(42, 'Vaginosis bacteriana'),
(43, 'VIH/Sida'),
(44, 'Zika');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id_perfil` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id_perfil`, `descripcion`, `estado`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Administrador', 1, '2023-07-28 18:56:55', NULL),
(2, 'paciente', 1, '2023-11-23 03:12:01', NULL),
(3, 'Doctor', 1, '2023-11-23 11:31:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_modulo`
--

CREATE TABLE `perfil_modulo` (
  `id_perfil_modulo` int(11) NOT NULL,
  `id_perfil` int(11) DEFAULT NULL,
  `id_modulo` int(11) DEFAULT NULL,
  `vista_inicio` tinyint(4) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_modulo`
--

INSERT INTO `perfil_modulo` (`id_perfil_modulo`, `id_perfil`, `id_modulo`, `vista_inicio`, `estado`) VALUES
(13, 1, 13, NULL, 1),
(170, 3, 1, 1, 1),
(171, 2, 21, 1, 1),
(178, 1, 1, 1, 1),
(179, 1, 21, 0, 1),
(180, 1, 11, 0, 1),
(181, 1, 12, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procedimiento`
--

CREATE TABLE `procedimiento` (
  `id_especialidad` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procedimiento`
--

INSERT INTO `procedimiento` (`id_especialidad`, `id`, `descripcion`) VALUES
(1, 1, 'Alergología'),
(1, 2, 'Anestesiología'),
(1, 3, 'Angiología'),
(1, 4, 'Cardiología'),
(1, 5, 'Endocrinología'),
(1, 6, 'Estomatología'),
(1, 7, 'Farmacología Clínica'),
(1, 8, 'Gastroenterología'),
(1, 9, 'Genética'),
(1, 10, 'Geriatría'),
(1, 11, 'Hematología'),
(1, 12, 'Hepatología'),
(1, 13, 'Infectología'),
(1, 14, 'Medicina aeroespacial'),
(1, 15, 'Medicina del deporte'),
(1, 16, 'Medicina familiar y comunitaria'),
(1, 17, 'Medicina física y rehabilitación'),
(1, 18, 'Medicina forense'),
(1, 19, 'Medicina intensiva'),
(1, 20, 'Medicina interna'),
(1, 21, 'Medicina preventiva y salud pública'),
(1, 22, 'Medicina del trabajo'),
(1, 23, 'Nefrología'),
(1, 24, 'Neumología'),
(1, 25, 'Neurología'),
(1, 26, 'Nutriología'),
(1, 27, 'Oncología médica'),
(1, 28, 'Oncología radioterápica'),
(1, 29, 'Pediatría'),
(1, 30, 'Psiquiatría'),
(1, 31, 'Reumatología'),
(1, 32, 'Toxicología'),
(2, 33, 'Cirugía cardíaca'),
(2, 34, 'Cirugía general'),
(2, 35, 'Cirugía oral y maxilofacial'),
(2, 36, 'Cirugía ortopédica'),
(2, 37, 'Cirugía pediátrica'),
(2, 38, 'Cirugía plástica'),
(2, 39, 'Cirugía torácica'),
(2, 40, 'Cirugía vascular'),
(2, 41, 'Neurocirugía'),
(3, 42, 'Dermatología'),
(3, 43, 'Ginecología y obstetricia o tocología'),
(3, 44, 'Medicina de emergencia'),
(3, 45, 'Odontología'),
(3, 46, 'Oftalmología'),
(3, 47, 'Otorrinolaringología'),
(3, 48, 'Traumatología'),
(3, 49, 'Urología'),
(4, 50, 'Análisis clínico'),
(4, 51, 'Anatomía patológica'),
(4, 52, 'Bioquímica clínica'),
(4, 53, 'Farmacología'),
(4, 54, 'Genética médica'),
(4, 55, 'Inmunología'),
(4, 56, 'Medicina nuclear'),
(4, 57, 'Microbiología y parasitología'),
(4, 58, 'Neurofisiología clínica'),
(4, 59, 'Radiología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) DEFAULT NULL,
  `apellido_usuario` varchar(100) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `clave` text DEFAULT NULL,
  `image` text DEFAULT 'no_image.png',
  `id_perfil_usuario` int(11) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `fech_act` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `usuario`, `clave`, `image`, `id_perfil_usuario`, `estado`, `tipo`, `fech_act`) VALUES
(1, 'Admin', NULL, 'admin@gmail.com', '$2y$10$YR4VaeSu1ffp0TJLAJbDiejhbKZfSNqXqj1Xj3kSxDgSqPK7qEiI6', 'no_image.png', 1, 1, 0, '2023-11-23'),
(18, 'Hennie', 'Haz', 'hhazan01@gmail.com', '$2y$10$7pIKZ0RGzJfsep9qFqji0OKqnHO2Fx9EtgVk7x/sLtIFV9k7ZIfzS', 'no_image.png', 3, 1, 1, '2023-11-23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `patologia`
--
ALTER TABLE `patologia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indices de la tabla `perfil_modulo`
--
ALTER TABLE `perfil_modulo`
  ADD PRIMARY KEY (`id_perfil_modulo`);

--
-- Indices de la tabla `procedimiento`
--
ALTER TABLE `procedimiento`
  ADD PRIMARY KEY (`id`,`id_especialidad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `patologia`
--
ALTER TABLE `patologia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `perfil_modulo`
--
ALTER TABLE `perfil_modulo`
  MODIFY `id_perfil_modulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT de la tabla `procedimiento`
--
ALTER TABLE `procedimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
