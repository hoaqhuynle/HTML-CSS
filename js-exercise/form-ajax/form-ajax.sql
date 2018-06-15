-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2018 at 06:56 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `form-ajax`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthday` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `email`, `birthday`) VALUES
('101010000000000', '1111111111111111111', 'hoaqhuynle@gmail.com', '6-15-2018'),
('110000000000000000000000', '1111111111111111', 'hoaqhuynle@gmail.com', '6-15-2018'),
('12000000000', '11111111111111111111', 'hoaqhuynle@gmail.com', '6-15-2018'),
('15000000000000000000', '111111111111111', 'hoaqhuynle@gmail.com', '6/15/2018'),
('1600000000', '11111111111111', 'hoaqhuynle@gmail.com', '6/15/2018'),
('222222222222', '22222222222222222222222', 'hoaqhuynle@gmail.com', '-2027'),
('3333333333333333', '33333333333333333333333333', 'hoaqhuynle@gmail.com', '6-15-2018'),
('555555555555555555', '555555555555555555', 'hoaqhuynle@gmail.com', '6-15-2018'),
('6666666666', '6666666666666666666666', 'hoaqhuynle@gmail.com', '6-15-2018'),
('7777777777777', '77777777777777777777777', 'hoaqhuynle@gmail.com', '6-15-2018'),
('999999999999999999999', '99999999999999999999999999', 'hoaqhuynle@gmail.com', '6-15-2018'),
('lehuynh1', '12345678', 'huynh1@gmail.com', '2018-06-12'),
('lehuynh2', '12345678', 'huynh2@gmail.com', '2018-06-05'),
('lehuynh3', '1111111111111111111111111', 'hoaqhuynle@gmail.com', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
