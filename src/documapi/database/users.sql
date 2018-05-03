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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `rut` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `usertype` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `token` varchar(256) NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (`rut`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `rut`, `password`, `usertype`, `name`, `phone`, `token`, `created`, `modified`) VALUES
(1, 'admin@admin.com', '245920485343', 'docum2018', 'Administrador', 'David Villa', '3505941784', null, '2014-06-01 00:35:07', '2014-05-30 22:34:33');

INSERT INTO `users` (`id`, `email`, `rut`, `password`, `usertype`, `name`, `phone`, `token`, `created`, `modified`) VALUES
(2, 'cliente@admin.com', '2587612789', 'docum2018', 'Cliente', 'Brayan Reyes', '3505941784', null, '2014-06-01 00:35:07', '2014-05-30 22:34:33');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
