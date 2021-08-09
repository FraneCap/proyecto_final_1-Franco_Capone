-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2021 at 09:19 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arqcapone`
--

-- --------------------------------------------------------

--
-- Table structure for table `under_construction`
--

CREATE TABLE `under_construction` (
  `id` int(255) NOT NULL,
  `name` tinytext NOT NULL,
  `address` text NOT NULL,
  `price` int(255) NOT NULL,
  `img_directory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `under_construction`
--

INSERT INTO `under_construction` (`id`, `name`, `address`, `price`, `img_directory`) VALUES
(1, 'juan_b_justo_5300', 'Juan B. Justo 5300', 20000, 'uploads/juan_b_justo_5300.jpg'),
(2, 'VITRAUX', 'Cabrebra 3931', 60000, 'uploads/VITRAUX.jpg'),
(3, 'casa_goyena', 'Av. Pedro Goyena 1515', 15000, 'uploads/casa_goyena.jpg'),
(4, 'guatemala_5915', 'Guatemala 5915', 35000, 'uploads/guatemala_5915.jpg'),
(5, 'guatemala_5511', 'Guatemala 5511', 80000, 'uploads/guatemala_5511.jpg'),
(6, 'torre_viva', 'Palpa 2500', 13000, 'uploads/torre_viva.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `first_name` tinytext NOT NULL,
  `last_name` tinytext NOT NULL,
  `email` varchar(255) NOT NULL,
  `encrypted_password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `encrypted_password`, `is_admin`) VALUES
('1', 'admin', 'admin', 'admin@example.com', 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `under_construction`
--
ALTER TABLE `under_construction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `under_construction`
--
ALTER TABLE `under_construction`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
