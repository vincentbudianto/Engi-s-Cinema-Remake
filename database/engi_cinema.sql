-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2019 at 05:23 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `engi_cinema`
--

-- --------------------------------------------------------

--
-- Table structure for table `cookies`
--

CREATE TABLE `cookies` (
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cookies`
--

INSERT INTO `cookies` (`token`) VALUES
('$2y$10$9jqX8m48Rti5kbCoOqvFg.UsUTbHo2qoVRLBD6XhmniERHXx5pUYy');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profilePicture` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `accountNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `phone`, `password`, `profilePicture`, `accountNumber`, `token`) VALUES
(1, 'Engi Cinema', 'engi_cinema@gmail.com', '081123456789', '$2y$10$BGoBkEuiMk48rRUrNg/mO.blpLRjPx5KYVR.US5QZVDCnG43a7Xdm', 'assets/profilePicture/test.png', '1234567890', '$2y$10$PaD6D4My3XZQ6MP2ge0w/..2HHka1om6WPXCvCxyHlENhF1U61rBK'),
(2, 'vincentbudianto', '13517137@std.stei.itb.ac.id', '081321554136', '$2y$10$ogyxir5H0awV3kznBgPzUOt/HtbwiJzFXwn576gjOzyAsRyAr3sBu', 'assets/profilePicture/Rimuru Tempest.jpeg', '1403991812', '$2y$10$qaBLh/6tzzw12Xa4hxjmkOgkrulHNMD0nScJZVaQSf1hxhLSxusuu'),
(3, 'xio84', '13517020@std.stei.itb.ac.id', '08115128170', '$2y$10$DuESwipO1trUk8kNOM4LPeGNIlahc.tTISUE0Fz/ed3rS0Qf.rFUG', 'assets/profilePicture/13517020.JPG', '4985231501', '$2y$10$WcdCOxayx0vMpsVw4OTun.PdDm6rHg2o50UQ2C1oKDV7B/Wx8b0Du'),
(4, 'anakduaribu', '13517065@std.stei.itb.ac.id', '081573586855', '$2y$10$sLFfbi9dlb0hPgs2IQT.Tu/01N.3TCU1sH06.UY1ENkQuZ4CQw3qW', 'assets/profilePicture/13517065.JPG', '3965210656', '$2y$10$uu4wge27H5QLrrZlIx1l9OEa/KW3npqvqFjxFfCrya1Q019QBRafS'),
(5, 'willysantoso05', '13517066@std.stei.itb.ac.id', '087787612992', '$2y$10$DlDJmSTbQYoj2VMBgVuQauv4zUemW.PknDteFrYYDeOocTzf0cUT2', 'assets/profilePicture/13517066.JPG', '6502994853', '$2y$10$czONFuI/6gOxm0lDphLYZ./IDuGLQZ1OXmC92Ff0SiKCCV6hrZMFO'),
(6, 'Meyjan', '13517131@std.stei.itb.ac.id', '081223617228', '$2y$10$rS5VtbBMjbOfQ7/b.kS1Z.jDUnHBJZRlA5JlzpqTyjX7xQu2gfx/W', 'assets/profilePicture/13517131.JPG', '9845820521', '$2y$10$9jqX8m48Rti5kbCoOqvFg.UsUTbHo2qoVRLBD6XhmniERHXx5pUYy'),
(7, 'yoelsusanto', '13517014@std.stei.itb.ac.id', '085922835336', '$2y$10$qBKH7nGRgBoPzIA5hulvHu3C9BFwoe9NlGzBbCX.znFyRWg6V7/VG', 'assets/profilePicture/13517014.JPG', '7763120038', '$2y$10$Ig5HdPc4ZUTunnRHaaMIKe65PncY3YrD7p9TVN7TUkyrKs7QiAZYm'),
(8, 'lukaskurnia', '13517006@std.stei.itb.ac.id', '087816045752', '$2y$10$exCgQ1KKQ94kfZjO/2Qo9.sNYvMvDEk8yyN1YOdGMggEqljJj8p3i', 'assets/profilePicture/13517006.JPG', '4126860031', '$2y$10$Yf.csdRJXFGwTKvD4hzIbexbRCpp/tvydqyFYvuYyrNt6XSE649QG'),
(9, 'YangHansen', '13517146@std.stei.itb.ac.id', '087822135407', '$2y$10$mTGU8jVlgPb43Sdnr3ZvHOBY3TsHirlXPGh3vyxdHf2qSVgRrknYq', 'assets/profilePicture/13517146.JPG', '9748400389', '$2y$10$y7Ft./pvvCf94uLtNmy0H.0.IsOat6tAnNVS..gmeybinxy1BOjam'),
(10, 'KevinS27', '13517023@std.stei.itb.ac.id', '089611023888', '$2y$10$l5oNXXoaAxsR4sTwXvy2fOOj/oqOtib0ufdu2N8fN19RBINDX09YS', 'assets/profilePicture/13517023.JPG', '6541440398', '$2y$10$IKwmIbnlkjXrLxCmndSkFeN4bNo6NIofcmYtkpve63A55.b9ykHS6'),
(11, 'kumaken', '13517068@std.stei.itb.ac.id', '08971848770', '$2y$10$iRslvYHu4/pc6QeqvmQBH.E1FbKHXLAoW4k2oUnTjC8r3LcNPtKtG', 'assets/profilePicture/13517068.JPG', '3160564196', '$2y$10$LEvw/aSGghcBYC8WZqRAU.jFai8ilmg67SXLIDjz4pntURARywNne'),
(12, 'hidx1', '13517059@std.stei.itb.ac.id', '089634338403', '$2y$10$hLpV.OrjMp5te68f5H1.mu93An13453PmSCQrFWQzXIeJ2qYeXEK6', 'assets/profilePicture/13517059.JPG', '1568430026', '$2y$10$LKMBgdEaicAnUyO1VsTOsOYfsvrV76DrFnFoOJWbk9AhjYchc0age'),
(13, 'ChrisBill', '13517050@std.stei.itb.ac.id', '08111599974', '$2y$10$AeEPCGGnwPShdYHLCjMc3uYHyycnaGDHOVdPrm25b9HlUkPZO/0Iu', 'assets/profilePicture/13517050.JPG', '2311569874', '$2y$10$8oFwaXHhP/qDUd/ZlDzq9e9f66dj/Z0pTAsJqj.FKCLUD4RVeK9R2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cookies`
--
ALTER TABLE `cookies`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `email` (`email`,`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cookies`
--
ALTER TABLE `cookies`
  ADD CONSTRAINT `cookies_ibfk_1` FOREIGN KEY (`token`) REFERENCES `users` (`token`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
