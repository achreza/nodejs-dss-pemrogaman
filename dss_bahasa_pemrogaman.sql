-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for dss_bahasa_pemrogaman
CREATE DATABASE IF NOT EXISTS `dss_bahasa_pemrogaman` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dss_bahasa_pemrogaman`;

-- Dumping structure for table dss_bahasa_pemrogaman.alternatif
CREATE TABLE IF NOT EXISTS `alternatif` (
  `idalternatif` int(11) NOT NULL AUTO_INCREMENT,
  `nmalternatif` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idalternatif`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.alternatif: ~5 rows (approximately)
/*!40000 ALTER TABLE `alternatif` DISABLE KEYS */;
INSERT INTO `alternatif` (`idalternatif`, `nmalternatif`) VALUES
	(1, 'Javascript'),
	(2, 'Typescript'),
	(3, 'Java'),
	(4, 'Dart'),
	(5, 'Python');
/*!40000 ALTER TABLE `alternatif` ENABLE KEYS */;

-- Dumping structure for table dss_bahasa_pemrogaman.bobot
CREATE TABLE IF NOT EXISTS `bobot` (
  `id_bobot` int(11) NOT NULL AUTO_INCREMENT,
  `id_kriteria` int(11) NOT NULL DEFAULT '0',
  `value` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_bobot`),
  KEY `id_kriteria` (`id_kriteria`),
  CONSTRAINT `fk_bobot_kriteria` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id_kriteria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.bobot: ~5 rows (approximately)
/*!40000 ALTER TABLE `bobot` DISABLE KEYS */;
INSERT INTO `bobot` (`id_bobot`, `id_kriteria`, `value`) VALUES
	(1, 1, '0.456'),
	(2, 2, '0.256'),
	(3, 3, '0.156'),
	(4, 4, '0.09'),
	(5, 5, '0.04');
/*!40000 ALTER TABLE `bobot` ENABLE KEYS */;

-- Dumping structure for table dss_bahasa_pemrogaman.kriteria
CREATE TABLE IF NOT EXISTS `kriteria` (
  `id_kriteria` int(11) NOT NULL AUTO_INCREMENT,
  `nm_kriteria` varchar(50) DEFAULT '0',
  `jenis` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_kriteria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.kriteria: ~5 rows (approximately)
/*!40000 ALTER TABLE `kriteria` DISABLE KEYS */;
INSERT INTO `kriteria` (`id_kriteria`, `nm_kriteria`, `jenis`) VALUES
	(1, 'Kemudahan Pemahaman', 'Benefit'),
	(2, 'Kemudahan dalam Penulisan', 'Benefit'),
	(3, 'Fitur yang bervariasi', 'Benefit'),
	(4, 'Biaya yang terjangkau', 'Benefit'),
	(5, 'Variasi Framework', 'Benefit');
/*!40000 ALTER TABLE `kriteria` ENABLE KEYS */;

-- Dumping structure for table dss_bahasa_pemrogaman.matrixkeputusan
CREATE TABLE IF NOT EXISTS `matrixkeputusan` (
  `id_matrix` int(11) NOT NULL AUTO_INCREMENT,
  `id_alternatif` int(11) DEFAULT NULL,
  `id_bobot` int(11) DEFAULT NULL,
  `id_skala` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_matrix`),
  KEY `id_alternatif` (`id_alternatif`),
  KEY `id_bobot` (`id_bobot`),
  KEY `id_skala` (`id_skala`),
  CONSTRAINT `FK__alternatif` FOREIGN KEY (`id_alternatif`) REFERENCES `alternatif` (`idalternatif`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__bobot` FOREIGN KEY (`id_bobot`) REFERENCES `bobot` (`id_bobot`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__skala` FOREIGN KEY (`id_skala`) REFERENCES `skala` (`id_skala`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.matrixkeputusan: ~23 rows (approximately)
/*!40000 ALTER TABLE `matrixkeputusan` DISABLE KEYS */;
INSERT INTO `matrixkeputusan` (`id_matrix`, `id_alternatif`, `id_bobot`, `id_skala`) VALUES
	(1, 1, 1, 1),
	(2, 1, 2, 1),
	(3, 1, 3, 1),
	(4, 1, 4, 1),
	(5, 1, 5, 1),
	(6, 2, 1, 2),
	(7, 2, 2, 2),
	(8, 2, 3, 2),
	(9, 2, 4, 2),
	(10, 2, 5, 2),
	(11, 3, 1, 3),
	(12, 3, 2, 3),
	(13, 3, 3, 3),
	(14, 3, 4, 3),
	(15, 3, 5, 3),
	(16, 4, 1, 4),
	(17, 4, 2, 4),
	(18, 4, 3, 4),
	(19, 4, 4, 4),
	(20, 4, 5, 4),
	(21, 5, 1, 5),
	(22, 5, 2, 5),
	(23, 5, 3, 5),
	(24, 5, 4, 5),
	(25, 5, 5, 5);
/*!40000 ALTER TABLE `matrixkeputusan` ENABLE KEYS */;

-- Dumping structure for view dss_bahasa_pemrogaman.nilaimax
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `nilaimax` (
	`id_kriteria` INT(11) NOT NULL,
	`nm_kriteria` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`maksimum` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Dumping structure for table dss_bahasa_pemrogaman.penilaian
CREATE TABLE IF NOT EXISTS `penilaian` (
  `idpenilaian` int(11) NOT NULL AUTO_INCREMENT,
  `id_alternatif` int(11) NOT NULL DEFAULT '0',
  `id_bobot` int(11) NOT NULL DEFAULT '0',
  `nilai` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idpenilaian`),
  KEY `id_alternatif` (`id_alternatif`),
  KEY `id_bobot` (`id_bobot`),
  CONSTRAINT `alternatif` FOREIGN KEY (`id_alternatif`) REFERENCES `alternatif` (`idalternatif`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bobot` FOREIGN KEY (`id_bobot`) REFERENCES `bobot` (`id_bobot`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.penilaian: ~0 rows (approximately)
/*!40000 ALTER TABLE `penilaian` DISABLE KEYS */;
/*!40000 ALTER TABLE `penilaian` ENABLE KEYS */;

-- Dumping structure for table dss_bahasa_pemrogaman.skala
CREATE TABLE IF NOT EXISTS `skala` (
  `id_skala` int(11) NOT NULL AUTO_INCREMENT,
  `nm_skala` varchar(50) NOT NULL DEFAULT '0',
  `value` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_skala`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table dss_bahasa_pemrogaman.skala: ~5 rows (approximately)
/*!40000 ALTER TABLE `skala` DISABLE KEYS */;
INSERT INTO `skala` (`id_skala`, `nm_skala`, `value`) VALUES
	(1, 'Tidak Setuju', '1'),
	(2, 'Kurang Setuju', '2'),
	(3, 'Cukup', '3'),
	(4, 'Setuju', '4'),
	(5, 'Sangat Setuju', '5');
/*!40000 ALTER TABLE `skala` ENABLE KEYS */;

-- Dumping structure for view dss_bahasa_pemrogaman.vmatrixkeputusan
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vmatrixkeputusan` (
	`id_matrix` INT(11) NOT NULL,
	`idalternatif` INT(11) NOT NULL,
	`nmalternatif` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`id_kriteria` INT(11) NOT NULL,
	`nm_kriteria` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`jenis` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`id_bobot` INT(11) NOT NULL,
	`value` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nilai` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nm_skala` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Dumping structure for view dss_bahasa_pemrogaman.vnormalisasi
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vnormalisasi` (
	`id_matrix` INT(11) NOT NULL,
	`idalternatif` INT(11) NOT NULL,
	`nmalternatif` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`id_kriteria` INT(11) NOT NULL,
	`nm_kriteria` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`jenis` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`id_bobot` INT(11) NOT NULL,
	`value` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nilai` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nm_skala` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`normalisasi` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view dss_bahasa_pemrogaman.vprangking
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vprangking` (
	`id_matrix` INT(11) NOT NULL,
	`idalternatif` INT(11) NOT NULL,
	`nmalternatif` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`id_kriteria` INT(11) NOT NULL,
	`nm_kriteria` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`jenis` VARCHAR(100) NULL COLLATE 'latin1_swedish_ci',
	`id_bobot` INT(11) NOT NULL,
	`value` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nilai` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`nm_skala` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`normalisasi` DOUBLE NULL,
	`prangking` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view dss_bahasa_pemrogaman.vrangking
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vrangking` (
	`idalternatif` INT(11) NOT NULL,
	`nmalternatif` VARCHAR(50) NULL COLLATE 'latin1_swedish_ci',
	`rangking` DOUBLE NULL
) ENGINE=MyISAM;

-- Dumping structure for view dss_bahasa_pemrogaman.nilaimax
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `nilaimax`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `nilaimax` AS SELECT id_kriteria, nm_kriteria,MAX(nilai) AS maksimum FROM vmatrixkeputusan GROUP BY id_kriteria ;

-- Dumping structure for view dss_bahasa_pemrogaman.vmatrixkeputusan
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vmatrixkeputusan`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vmatrixkeputusan` AS SELECT matrixkeputusan.id_matrix, alternatif.*,kriteria.*,bobot.id_bobot,bobot.value,
skala.value AS nilai, skala.nm_skala FROM matrixkeputusan,skala,bobot,kriteria,
alternatif WHERE matrixkeputusan.id_alternatif=alternatif.idalternatif AND
matrixkeputusan.id_bobot = bobot.id_bobot AND matrixkeputusan.id_skala = skala.id_skala
AND kriteria.id_kriteria = bobot.id_kriteria ;

-- Dumping structure for view dss_bahasa_pemrogaman.vnormalisasi
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vnormalisasi`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vnormalisasi` AS SELECT vmatrixkeputusan.*,(vmatrixkeputusan.nilai/nilaimax.maksimum) AS normalisasi FROM vmatrixkeputusan,nilaimax WHERE nilaimax.id_kriteria = vmatrixkeputusan.id_kriteria GROUP BY vmatrixkeputusan.id_matrix ;

-- Dumping structure for view dss_bahasa_pemrogaman.vprangking
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vprangking`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vprangking` AS SELECT vnormalisasi.*,(vnormalisasi.value*vnormalisasi.normalisasi) AS prangking FROM vnormalisasi GROUP BY vnormalisasi.id_matrix ;

-- Dumping structure for view dss_bahasa_pemrogaman.vrangking
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vrangking`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vrangking` AS SELECT idalternatif,nmalternatif,SUM(prangking) AS rangking FROM vprangking GROUP BY idalternatif ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
