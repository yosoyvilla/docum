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
-- Table structure for table `logrents`
--

DROP TABLE IF EXISTS `logrents`;
CREATE TABLE `logrents` (
  `id` int(11) NOT NULL,
  `idCancha` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `rentedDate` varchar(256) NOT NULL,
  `ochoanueve` varchar(256),
  `ochoanueveRentId` varchar(256),
    `nueveadiez` varchar(256),
  `nueveadiezRentId` varchar(256),
    `diezaonce` varchar(256),
  `diezaonceRentId` varchar(256),
    `onceadoce` varchar(256),
  `onceadoceRentId` varchar(256),
    `doceatrece` varchar(256),
  `doceatreceRentId` varchar(256),
    `treceacatorce` varchar(256),
  `treceacatorceRentId` varchar(256),
    `catorceaquince` varchar(256),
  `catorceaquinceRentId` varchar(256),
    `quinceadiezseis` varchar(256),
  `quinceadiezseisRentId` varchar(256),
    `diezseisdiezsiete` varchar(256),
  `diezseisdiezsieteRentId` varchar(256),
    `diezsietediezocho` varchar(256),
  `diezsietediezochoRentId` varchar(256),
      `diezochodieznueve` varchar(256),
  `diezochodieznueveRentId` varchar(256),
      `dieznueveviente` varchar(256),
  `dieznuevevienteRentId` varchar(256),
      `veinteveinteuno` varchar(256),
  `veinteveinteunoRentId` varchar(256),
      `veinteunoveintedos` varchar(256),
  `veinteunoveintedosRentId` varchar(256),
      `veintedosveintetres` varchar(256),
  `veintedosveintetresRentId` varchar(256),
      `veintetresveintecuatro` varchar(256),
  `veintetresveintecuatroRentId` varchar(256)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logrents`
--
ALTER TABLE `logrents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logrents`
--
ALTER TABLE `logrents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
