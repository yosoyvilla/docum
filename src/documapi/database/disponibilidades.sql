-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 08, 2018 at 02:09 PM
-- Server version: 5.6.38
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `conectan_docum`
--

-- --------------------------------------------------------

--
-- Table structure for table `disponibilidad`
--

DROP TABLE IF EXISTS `disponibilidad`;
CREATE TABLE `disponibilidad` (
  `id` int(11) NOT NULL,
  `idCancha` int(11) NOT NULL,
  `horario` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


INSERT INTO `disponibilidad` (`id`, `idCancha`, `horario`, `estado`) VALUES
(1, 1, '10 a 11', "Libre");

INSERT INTO `disponibilidad` (`id`, `idCancha`, `horario`, `estado`) VALUES
(2, 1, '11 a 12', "Libre");

INSERT INTO `disponibilidad` (`id`, `idCancha`, `horario`, `estado`) VALUES
(3, 1, '12 a 13', "Libre");

INSERT INTO `disponibilidad` (`id`, `idCancha`, `horario`, `estado`) VALUES
(4, 1, '13 a 14', "Libre");

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disponibilidad`
--
ALTER TABLE `disponibilidad`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disponibilidad`
--
ALTER TABLE `disponibilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
