-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sentiment_setter
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `up_users_frasi_da_classificares_links`
--
USE sentiment_setter;
DROP TABLE IF EXISTS `up_users_frasi_da_classificares_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `up_users_frasi_da_classificares_links` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `frasi_da_classificare_id` int unsigned DEFAULT NULL,
  `frasi_da_classificare_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `up_users_frasi_da_classificares_links_unique` (`user_id`,`frasi_da_classificare_id`),
  KEY `up_users_frasi_da_classificares_links_fk` (`user_id`),
  KEY `up_users_frasi_da_classificares_links_inv_fk` (`frasi_da_classificare_id`),
  KEY `up_users_frasi_da_classificares_links_order_fk` (`frasi_da_classificare_order`),
  CONSTRAINT `up_users_frasi_da_classificares_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_users_frasi_da_classificares_links_inv_fk` FOREIGN KEY (`frasi_da_classificare_id`) REFERENCES `frasi_da_classificares` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users_frasi_da_classificares_links`
--

LOCK TABLES `up_users_frasi_da_classificares_links` WRITE;
/*!40000 ALTER TABLE `up_users_frasi_da_classificares_links` DISABLE KEYS */;
INSERT INTO `up_users_frasi_da_classificares_links` VALUES (7,3,1,1),(8,3,2,3),(9,3,3,2),(53,2,3,1),(54,2,1,2),(62,2,5,3),(63,2,6,4),(64,2,8,5),(65,2,2,6),(68,6,1,1),(69,6,9,2),(70,6,4,3),(71,6,5,4),(72,6,7,5),(73,6,6,6),(74,6,8,7),(75,6,11,8),(76,6,10,9);
/*!40000 ALTER TABLE `up_users_frasi_da_classificares_links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-18 14:28:24
