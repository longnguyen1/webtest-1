-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2025 at 08:22 AM
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
(8, 'HUỲNH HỮU THUẬN', 'fetel-08', '1970', 'khoa Điện tử – Viễn thông HCMUS', '0900000000', 'Tốt nghiệp Đại học, Thạc sỹ và Tiến sỹ vào các năm 1997, 2001 và 2009 tương ứng. Lĩnh vực chuyên môn là Máy tính – Hệ thống nhúng trên DSP, FPGA và thiết kế vi mạch.\r\nHướng nghiên cứu:\r\nDSP trong xử lý âm thanh, hình ảnh, Kiến trúc phần cứng, hệ thống nhú'),
(14, 'Long', 'fetel-09', '2000', NULL, NULL, 'aaaaaaaaaaaaaaaa'),
(15, 'long2', 'fetel-12', '2000', NULL, NULL, 'aaaaaaaaaaaaaaaaaa'),
(16, 'trung', 'fetel-14', '2000', NULL, NULL, 'âsasasasa'),
(17, 'trung2', 'fetel-15', '1999', NULL, NULL, 'aaaaaaaaaaaaaaaaaa'),
(18, 'trung3', 'fetel-16', '1999', NULL, NULL, 'sssssssssssssss');

-- --------------------------------------------------------

--
-- Table structure for table `expertscientificworks`
--

CREATE TABLE `expertscientificworks` (
  `id` int(11) NOT NULL,
  `expert_id` int(11) NOT NULL,
  `work_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expertscientificworks`
--

INSERT INTO `expertscientificworks` (`id`, `expert_id`, `work_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 3, 11),
(12, 3, 12),
(13, 3, 13),
(14, 3, 14),
(15, 3, 15),
(16, 4, 16),
(17, 4, 17),
(18, 4, 18),
(19, 4, 19),
(20, 4, 20),
(21, 5, 21),
(22, 5, 22),
(23, 5, 23),
(24, 5, 24),
(25, 5, 25),
(26, 6, 26),
(27, 6, 27),
(28, 6, 28),
(29, 6, 29),
(30, 6, 30),
(31, 7, 31),
(32, 7, 32),
(34, 8, 34),
(35, 8, 35),
(36, 8, 36),
(37, 8, 37),
(38, 8, 38),
(44, 18, 39);

-- --------------------------------------------------------

--
-- Table structure for table `scientificworks`
--

CREATE TABLE `scientificworks` (
  `work_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `field` varchar(255) DEFAULT NULL,
  `place_of_application` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scientificworks`
--

INSERT INTO `scientificworks` (`work_id`, `name`, `field`, `place_of_application`) VALUES
(1, ' “Bit Error Rate Performance of Clipped OFDM Signals Over Fading Channel,” Dang Le Khoa, Huynh Quoc Anh, Nguyen Huu Phuong, and Hiroshi Ochi, ', 'Điện tử - Viễn thông', 'AETA 2015 Recent Advances in Electrical Engineering and Related Sciences, Lecture Notes in Electrical Engineer'),
(2, ' “Tỉ lệ lỗi bit của hệ thống DCO-OFDM qua kênh truyền phản xạ khuếch tán”\r\nĐặng Lê Khoa, Huỳnh Quốc Anh, Nguyễn Vũ Linh, Nguyễn Hữu Phương, Hiroshi Ochi,', 'Điện tử - Viễn Thông', 'Tạp chí Phát triển khoa học & công nghệ ĐHQG TPHCM tập 20, số T4-2017, tr. 163-171, 2017.'),
(3, '“Hiệu năng đường xuống trong hệ thống đa truy nhập phi trực giao sử dụng tỷ số Log-Likelihood”, \r\nNgô Thanh Hãi, Nguyễn Thái Công Nghĩa, Đặng Lê Khoa, ', 'Điện tử - Viễn thông', 'Tạp chí Phát triển khoa học & công nghệ ĐHQG TPHCM, vol. 4(3), pp. 621-632, 2020'),
(4, ' “An Approximate Evaluation of BER Performance for Downlink GSVD-NOMA with Joint Maximum-likelihood Detector” \r\nNgo Thanh Hai, Dang Le Khoa,', 'Điện tử - Viễn Thông', 'Journal of Telecommunications and Information Technology, vol. 3, pp. 25-37, 2022.'),
(5, ' “Optimal User Clustering and Power Allocation in NOMA Systems”,\r\nTạ Viết Tài, Nguyễn Thị Xuân Uyên, Đặng Lê Khoa, ', 'Điện tử - Viễn thông', 'in 2022 International Conference on Advanced Technologies for Communications (ATC 2022), pp. 350-355, 2022.'),
(6, ', “Effective Route Scheme of Multicast Probing to Locate High-loss Links in OpenFlow Networks” \r\nNguyen Minh Tri, Masahiro Shibata, Masato Tsuru', 'Software Defined Networking', 'Journal of Information Processing, 2021, Volume 29, Pages 115-123, February 15, 2021'),
(7, ', “On Reducing Measurement Load on Control-Plane in Locating High Packet-Delay Variance Links for OpenFlow Networks,”\r\nTri N.M., Ha N.V., Shibata M., Tsuru M., Kawaguchi A. ', 'Software Defined Networking', 'the 9th International Conference on Emerging Internet, Data & Web Technologies (EIDW Chiang Mai, Thailand, Lecture Notes on Data Engineering and Communications Technologies, vol 65, pp. 232-245, 2021.'),
(8, ', “Locating High-loss Links for OpenFlow Networks by Multiple Hosts to Probe Packets,” N. M. Tri, M. Shibata, M. Tsuru and A. Kawaguchi ', 'Software Defined Networking', '2021 23rd International Conference on Advanced Communication Technology (ICACT) PyeongChang, Korea (South), 2021'),
(9, ', “Locating Delay Fluctuation-Prone Links by Packet Arrival Intervals in OpenFlow Networks” N. M. Tri, S. Nagata and M. Tsuru', 'Software Defined Networking', '2019 20th Asia-Pacific Network Operations and Management Symposium (APNOMS), Matsue, Japan, 2019'),
(10, ', “Locating Deteriorated Links by Network-Assisted Multicast Proving on OpenFlow Networks” N. M. Tri and M. Tsuru', 'Software Defined Networking', '2019 IEEE Symposium on Computers and Communications (ISCC), Barcelona, Spain, 2019'),
(11, ' , “Delay and Reliability Evaluation of Industrial Wireless LAN System,”  T. T. T. Nguyen, H. Ochi', 'Mạng LAN không dây trong nhà và công nghiệp, đồng bộ thời gian và định vị, mạng đa người dùng, cảm biến đo sức khỏe.', '27th Asia Pacific Conference on Communications (APCC), Jeju Island, Korea, 19-21 October 2022.'),
(12, '“Development of Low-Latency Industrial WLAN System on Software Defined Radio,” T. T. T. Nguyen, N. V. Ha, H. Ochi, ', 'Mạng LAN không dây trong nhà và công nghiệp, đồng bộ thời gian và định vị, mạng đa người dùng, cảm biến đo sức khỏe.', '37th International Technical Conference on Circuits/Systems, Computers and Communications (ITC-CSCC), Phuket, Thailand, 05-08 July 2022.'),
(13, ', “Industrial WLAN System with Accurate Time Synchronization on Software Defined Radio,” T. T. T. Nguyen, M. Toyofuku, Y. Ito, C. Ishimitsu, Y. Nagao, M. Kurosaki, and H. Ochi', 'Mạng LAN không dây trong nhà và công nghiệp, đồng bộ thời gian và định vị, mạng đa người dùng, cảm biến đo sức khỏe.', 'in Proc. the 46th Annual Conference of the IEEE Industrial Electronics Society (ICC WS 2021), Singapore, June 2021.'),
(14, ', “Development of Factory Automation WLAN System Compatible with Asynchronous Industrial Ethernet,”  T. T. T. Nguyen, M. Tsurita, M. Toyofuku, Y. Ito, Y. Nagao, M. Kurosaki, and H. Ochi', 'Truyền thông không dây, truyền thông trong công nghiệp, thiết kế FPGA, cảm biến đo sức khỏe.', 'In Proc.IEEE International Conference on Emerging Technologies and Factory Automation (ETFA 2019), Zaragoza, Spain, Sep. 2019.'),
(15, ', “Low Latency IDMA With Interleaved Domain Architecture for 5G Communications,” T. T. T. Nguyen, L. Lanante, S. Yoshizawa, and H. Ochi', 'Mạng LAN không dây trong nhà và công nghiệp, đồng bộ thời gian và định vị, mạng đa người dùng, cảm biến đo sức khỏe.', 'IEEE Journal on Emerging and Selected Topics in Circuits and Systems, Vol.7, No.4, pp.582-593, Nov. 2017.'),
(16, '“Fairness Enhanced Dynamic Routing Protocol in Software-Defined Networking,” N. V. Ha, T. A. Tuan, T. T. T. Nguyen, ', 'Công nghệ mạng, Giao thức mạng, Mã hóa mạng, SDN, Quản lý và tối ưu mạng.', '9th NAFOSTED Conference on Information and Computer Science (NICS), Ho Chi Minh City, Vietnam, 31 October – 1 November 2022.'),
(17, ' “Fairness Enhanced Dynamic Routing Protocol in Software-Defined Networking,” N. V. Ha, T. A. Tuan, T. T. T. Nguyen,', 'Công nghệ mạng, Giao thức mạng, Mã hóa mạng, SDN, Quản lý và tối ưu mạng.', '9th NAFOSTED Conference on Information and Computer Science (NICS), Ho Chi Minh City, Vietnam, 31 October – 1 November 2022.'),
(18, ' “Dynamic ACK skipping in TCP with Network Coding for Power Line Communication Networks,”  N. V. Ha, L. V. Hau, and M. Tsuru,', 'Công nghệ mạng, Giao thức mạng, Mã hóa mạng, SDN, Quản lý và tối ưu mạng.', 'Proc. the 22nd IEEE International Conference on Advanced Communications Technology (ICACT), PyeongChang, Korea, pp. 29–34, Feb. 2020.'),
(19, '\"TCP with Network Coding Enhanced in Bi-directional Loss Tolerance\", N. V. Ha, T. T. T. Nguyen, and M. Tsuru, ', 'Công nghệ mạng, Giao thức mạng, Mã hóa mạng, SDN, Quản lý và tối ưu mạng.', 'IEEE Communications Letters, vol. 24, no. 3, pp. 520–524, Dec. 2019.'),
(20, ' “TCP with network coding performance under packet reordering,” N. V. Ha and M. Tsuru,', 'Công nghệ mạng, Giao thức mạng, Mã hóa mạng, SDN, Quản lý và tối ưu mạng.', 'Proc. the 7th International Conference on Emerging Internet, Data and Web Technologies (EIDWT), Lecture Notes in Data Engineering and Communication Technologies (LNDECT), Fujairah, UAE, vol. 29, pp. 552–563, Feb. 2019.'),
(21, '“Quick Boot of Trusted Execution Environment with Hardware Accelerators”, Trong-Thuc Hoang, Ckristian Duran, Duc-Thinh Nguyen-Hoang, Duc-Hung Le, Akira Tsukamoto, Kuniyasu Suzaki, Cong-Kha Pham,', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.', ' IEEE Access, Vol. 8, Iss. 1, pp. 74015-74023, 2020.'),
(22, ' “Low-power Floating-point Adaptive-CORDIC-based FFT Twiddle Factor on 65-nm Silicon-On-Thin-BOX (SOTB) with Back-gate Bias”,Trong-Thuc Hoang, Xuan-Thuan Nguyen, Duc-Hung Le, Cong-Kha Pham,', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.', ' IEEE Transactions on Circuits and Systems II: Express Briefs (TCAS-II), Vol. 66, Iss. 10, pp. 1723-1727, Oct. 2019.'),
(23, ', “A 1.05-V 62-MHz with 0.12-nW standby power SOTB-65nm chip of 32-point DCT based on adaptive CORDIC”, Duc-Hung Le, Trong-Thuc Hoang, Cong-Kha Pham ', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.', 'IEICE Electronics Express, Vol. 16, No. 10, pp. 1-6, 2019.'),
(24, '“A CAM-based Information Detection Hardware System for Fast Image Matching on FPGA”, Duc-Hung LE, Tran-Bao-Thuong CAO, Katsumi INOUE, Cong-Kha PHAM, ', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.', 'IEICE Transactions on Electronics, Vol. E97-C, No.1, pp. 65-76, Jan. 2014.'),
(25, '“Design a Fast CAM-based Exact Pattern Matching System on FPGA and 0.18um CMOS process”, Duc-Hung LE, Katsumi INOUE, Cong-Kha PHAM, ', 'Thiết kế vi mạch; Điện tử y sinh; Hệ thống SoC tiên tiến.', 'IEICE Transactions on Fundamentals of Electronics, Communications and Computer Sciences, Vol. E96-A, No. 9, pp. 1883-1888, Sep. 2013.'),
(26, 'NEMO-VN-2019, An useful simulation tool for emerging nanoelectronic devices, Dinh Sy Hien, Le Hoang Minh and Nguyen Thi Luong, ', 'Nanoelectronics', 'Journal of Technical Education, HCM University of Technology and Education, No 59, 2020.'),
(27, 'Graphene nanoribbon field effect transistor for digital IC applications, Dinh Sy Hien, Le Hoang Minh and Nguyen Thi Luong, ', 'Nanoelectronics', ' Journal of Technical Education, HCM University of Technology and Education, No 59, 2020.'),
(28, ' Some research results of basic physics of single electron transistor, Dinh Sy Hien, Le Hoang Minh, ', 'Nuclear Electronics, Nanoelectronics', 'Journal of Technical Education, HCM University of Technology and Education, No 41, 2017'),
(29, 'Modeling and simulation of metallic and semiconducting single electron transistor,.Dinh Sy Hien, Le Hoang Minh, ', 'Nuclear Electronics, Nanoelectronics', ' Journal of Technical Education, HCM University of Technology and Education, No 41, 2017'),
(30, ' Some new results in simulation of single electron transistor, Dinh Sy Hien, Le Hoang Minh,', 'Nuclear Electronics, Nanoelectronics', 'Journal of Technical Education, HCM University of Technology and Education, No 42, 2017.'),
(31, ' “A VLSI Implementation of Rank-Order Searching Circuit Employing aTime-Domain Technique”, T.T. Bui and T. Shibata,', 'Điện tử – Viễn thông', 'Journal of Engineering, Hindawi Publishing Corporation, Volume2013, ArticleID759761.'),
(32, '“Design of Co-Processor for Real-Time HMM-Based Text-to-Speech on Hardware System Applied to Vietnamese,” Trong-Thuc Hoang, Hong-Kiet Su, Hieu-Binh Nguyen, Duc-Hung Le, Huu-Thuan Huynh, Trong-Tu Bui, Cong-Kha Pham, ', 'Thiết kế vi mạch', 'IEICE Electronics Express, Vol. 12 , No. 14, pp. 1-11, 2015'),
(33, 'Trong-Thuc Hoang, Hong-Kiet Su, Hieu-Binh Nguyen, Duc-Hung Le, Huu-Thuan Huynh, Trong-Tu Bui, and Cong-Kha Pham, “Design of co-processor for real-time HMM-based text-to-speech on hardware system applied to Vietnamese”, ', 'Thiết kế SoPC', 'IEICE Electronics Express, Vol. 12 (2015) No. 14 pp. 20150448'),
(34, ' “Hardware Implementation of A Non-RLL Soft-decoding Beacon-based Visible Light Communication Receiver”; Duc-Phuc Nguyen, Dinh-Dung Le, Thi-Hong TRAN, Huu-Thuan Huynh, Yasuhiko Nakashima;', 'hệ thống nhúng (trên cơ sở FPGA)', 'IEEE International Conference on Advanced Technologies for Communications (ATC’18), pp.195-200, October 2018'),
(35, ' “Security Enhancement for IoT Systems Based on SoC FPGA Platforms,” Huu-Thuan Huynh, Tuan-Kiet Tran, Tan-Phat Dang, and Trong-Tu Bui,', 'hệ thống nhúng (trên cơ sở FPGA', '2020 4th International Conference on Recent Advances in Signal Processing, Telecommunications & Computing (SigTelCom), 2020, pp. 35-39'),
(36, '“LoRa Gateway Based on SoC FPGA Platforms,” Tan-Phat Dang, Tuan-Kiet Tran, Trong-Tu Bui, and Huu-Thuan Huynh, ', ' hệ thống nhúng (trên cơ sở FPGA)', '2021 International Symposium on Electrical and Electronics Engineering (ISEE), 2021, pp. 48-52'),
(37, ' “A Reliable Approach to Secure IoT Systems Using Cryptosystems Based on SoC FPGA Platforms,” Tuan-Kiet Tran, Tan-Phat Dang, Trong-Tu Bui, and Huu-Thuan Huynh,', 'hệ thống nhúng (trên cơ sở FPGA)', '2021 International Symposium on Electrical and Electronics Engineering (ISEE), 2021, pp. 53-58)'),
(38, ' “A Reliable Approach to Secure IoT Systems Using Cryptosystems Based on SoC FPGA Platforms,” Tuan-Kiet Tran, Tan-Phat Dang, Trong-Tu Bui, and Huu-Thuan Huynh,', 'hệ thống nhúng (trên cơ sở FPGA)', '2021 International Symposium on Electrical and Electronics Engineering (ISEE), 2021, pp. 53-58)'),
(39, 'gggggggggggggggggg', 'nnnnnnnnnnnnnnnn', 'ddddddddddđ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `last_login`) VALUES
(1, 'long4', 'nguyenthanhlong601@gmail.com', '123456', '2025-01-03 02:21:11'),
(2, 'long1', '123@gmail.com', '123456', '2025-01-02 04:04:56'),
(3, 'trung', 'nguyenthanhtrung@gmail.com', '123456', '2025-01-02 08:09:06'),
(8, 'phuong', 'phuong@gmail.com', '123456', '2025-01-02 18:02:14'),
(9, 'tuan', 'tuan@gmail.com', '123456', '2025-01-02 18:02:26'),
(10, 'chien', 'chien@gmail.com', '123456', '2025-01-02 18:02:35'),
(11, 'luan1', 'luan@gmail.com', '123456', '2025-01-03 02:30:38');

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
-- Indexes for table `expertscientificworks`
--
ALTER TABLE `expertscientificworks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expert_id` (`expert_id`),
  ADD KEY `work_id` (`work_id`);

--
-- Indexes for table `scientificworks`
--
ALTER TABLE `scientificworks`
  ADD PRIMARY KEY (`work_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `experts`
--
ALTER TABLE `experts`
  MODIFY `expert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `expertscientificworks`
--
ALTER TABLE `expertscientificworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `scientificworks`
--
ALTER TABLE `scientificworks`
  MODIFY `work_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expertscientificworks`
--
ALTER TABLE `expertscientificworks`
  ADD CONSTRAINT `expertscientificworks_ibfk_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `expertscientificworks_ibfk_2` FOREIGN KEY (`work_id`) REFERENCES `scientificworks` (`work_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
