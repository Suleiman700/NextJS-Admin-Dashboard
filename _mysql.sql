-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 185.234.69.156:3306
-- Generation Time: Jul 06, 2025 at 02:28 PM
-- Server version: 8.0.42-0ubuntu0.24.04.1
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextjs_crm`
--
CREATE DATABASE IF NOT EXISTS `nextjs_crm` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `nextjs_crm`;

-- --------------------------------------------------------

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
CREATE TABLE `app_settings` (
  `id` smallint UNSIGNED NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `app_settings`
--

INSERT INTO `app_settings` (`id`, `setting_key`, `value`) VALUES
(1, 'app_default_language', 'en'),
(2, 'app_languages', '[\"en\",\"he\",\"ar\"]');

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `id` mediumint UNSIGNED NOT NULL,
  `sentence_key` varchar(50) NOT NULL,
  `en` varchar(100) NOT NULL,
  `he` varchar(100) NOT NULL,
  `ar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `translations`
--

INSERT INTO `translations` (`id`, `sentence_key`, `en`, `he`, `ar`) VALUES
(1, 'welcome', 'Welcome', 'welcome_he', 'مرحبا'),
(4, 'en', 'English', 'English', 'English'),
(5, 'he', 'עברית', 'עברית', 'עברית'),
(6, 'ar', 'العربيه', 'العربيه', 'العربيه'),
(7, 'sign_in', 'Sign in', 'התחברות', 'تسجيل الدخول'),
(8, 'sign_in_to_your_account', 'Sign in to your account', 'היכנס לחשבונך', 'تسجيل الدخول إلى حسابك'),
(9, 'email', 'Email', 'כתובת דוא\"ל', 'البريد الإلكتروني'),
(10, 'password', 'Password', 'סיסמה', 'كلمة المرور'),
(11, 'wrong_email_or_password', 'Wrong email or password', 'כתובת דוא\"ל או סיסמה שגויים', 'البريد الإلكتروني أو كلمة المرور خاطئة'),
(13, 'dir', 'ltr', 'rtl', 'rtl'),
(14, 'field_is_required', 'Field is required', 'שדה חובה', 'الحقل مطلوب'),
(15, 'field_is_invalid', 'Field is invalid', 'الحقل غير صالح', 'השדה אינו חוקי'),
(16, 'language', 'Language', 'שפה', 'لغة'),
(17, 'dashboard', 'Dashboard', 'לוח בקרה', 'لوحه التحكم');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` tinyint NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin', 'admin@admin.com', '$2a$10$wfmY6LK3voh9CtJVx.bYu.f//qo4dnrL3tLMpfPTZem2Unhn514KK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
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
-- AUTO_INCREMENT for table `app_settings`
--
ALTER TABLE `app_settings`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
