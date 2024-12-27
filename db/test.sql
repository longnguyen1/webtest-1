-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 12:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `experts`
--

CREATE TABLE `experts` (
  `expert_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `year_of_birth` year(4) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experts`
--

INSERT INTO `experts` (`expert_id`, `name`, `code`, `year_of_birth`, `address`, `phone_number`, `expertise`) VALUES
(1, 'Đặng Lê Khoa', 'fetel-01', '1985', 'khoa Điện tử – Viễn thông HCMUS', '0900000000', 'Tốt nghiệp Đại học, Thạc sĩ và Tiến sĩ tại Trường Đại học Khoa học tự nhiên, ĐHQG TPHCM. Ông là Trưởng Bộ môn Viễn thông – Mạng từ năm 2012.'),
(2, 'NGUYỄN MINH TRÍ', 'fetel-02', '1990', 'khoa Điện tử – Viễn thông HCMUS', '0900000000', 'Hiện là giảng viên bộ môn Viễn thông và Mạng. Ông tốt nghiệp Tiến sĩ ngành Khoa học máy tính và Kỹ thuật hệ thống tại Viện công nghệ Kyushu (Nhật Bản) năm 2021.\r\nHướng nghiên cứu:\r\n– Software Defined Networking'),
(3, 'TRẦN THỊ THẢO NGUYÊN', 'fetel-03', '1987', 'Khoa Điện Tử – Viễn Thông, trường Đại học Khoa học Tự Nhiên, Đại học Quốc gia TP. HCM (HCMUS)', '0900000000', 'Truyền thông không dây, truyền thông trong công nghiệp, thiết kế FPGA, cảm biến đo sức khỏe.'),
(4, 'NGUYỄN VIỆT HÀ', 'fetel-04', '1987', 'Khoa Điện Tử – Viễn Thông, trường Đại học Khoa học Tự Nhiên, Đại học Quốc gia TP. HCM', '0900000000', 'TS. Hà làm nghiên cứu chuyên sâu về kỹ thuật Mã hóa mạng để cải thiện khả năng truyền nhận dữ liệu trong mạng tổn hao tại KIT. Hiện nay, TS. Hà đang làm việc tại HCMUS với hướng giảng dạy và nghiên cứu về công nghệ mạng và các giao thức mạng.'),
(5, 'LÊ ĐỨC HÙNG', 'fetel-05', '1990', 'Hiện đang công tác tại Khoa Điện tử – Viễn thông, Trưởng Bộ môn Điện tử, Trưởng Phòng thí nghiệm DESLAB.', '0900000000', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.'),
(6, 'GS.TS. ĐINH SỸ HIỀN', 'fetel-06', '1950', 'Khoa Điện tử – Viễn thông', '0900000000', 'Tốt nghiệp đại học năm 1974 tại trường Đại học Hà Nội và tốt nghiệp tiến sĩ năm 1992 tại National Institute for Atomic Energy.\r\nHướng nghiên cứu:\r\n– Nuclear Electronics, Nanoelectronics'),
(7, 'BÙI TRỌNG TÚ', 'fetel-07', '1980', 'trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh.', '0900000000', '– Tốt nghiệp Đại học và Cao học tại trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh.\r\n– Tốt nghiệp tiến sĩ tại Đại học Tokyo, Nhật Bản\r\nLĩnh vực chuyên môn:\r\n– Lĩnh vực: Điện tử – Viễn thông\r\n– Chuyên ngành: Vi điện tử\r\n– Chuyên m'),
(8, 'HUỲNH HỮU THUẬN', 'fetel-08', '1970', 'khoa Điện tử – Viễn thông HCMUS', '0900000000', 'Tốt nghiệp Đại học, Thạc sỹ và Tiến sỹ vào các năm 1997, 2001 và 2009 tương ứng. Lĩnh vực chuyên môn là Máy tính – Hệ thống nhúng trên DSP, FPGA và thiết kế vi mạch.\r\nHướng nghiên cứu:\r\nDSP trong xử lý âm thanh, hình ảnh, Kiến trúc phần cứng, hệ thống nhú');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `experts`
--
ALTER TABLE `experts`
  ADD PRIMARY KEY (`expert_id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `experts`
--
ALTER TABLE `experts`
  MODIFY `expert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
