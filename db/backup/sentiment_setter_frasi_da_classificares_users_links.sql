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
-- Table structure for table `frasi_da_classificares_users_links`
--
USE sentiment_setter;
DROP TABLE IF EXISTS `frasi_da_classificares_users_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frasi_da_classificares_users_links` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `frasi_da_classificare_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `user_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `frasi_da_classificares_users_links_unique` (`frasi_da_classificare_id`,`user_id`),
  KEY `frasi_da_classificares_users_links_fk` (`frasi_da_classificare_id`),
  KEY `frasi_da_classificares_users_links_inv_fk` (`user_id`),
  KEY `frasi_da_classificares_users_links_order_fk` (`user_order`),
  CONSTRAINT `frasi_da_classificares_users_links_fk` FOREIGN KEY (`frasi_da_classificare_id`) REFERENCES `frasi_da_classificares` (`id`) ON DELETE CASCADE,
  CONSTRAINT `frasi_da_classificares_users_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frasi_da_classificares_users_links`
--

LOCK TABLES `frasi_da_classificares_users_links` WRITE;
/*!40000 ALTER TABLE `frasi_da_classificares_users_links` DISABLE KEYS */;
INSERT INTO `frasi_da_classificares_users_links` VALUES (29,4,2,1),(30,9,2,1),(31,7,2,1),(33,10,2,1),(35,11,2,1),(47,4,4,2),(49,10,4,2),(50,7,4,2),(51,9,4,2),(62,3,2,1),(64,3,4,2),(66,2,4,1),(67,5,4,1),(68,1,4,1),(69,11,4,2),(70,1,2,2),(71,5,2,2),(72,6,2,1),(73,8,2,1),(74,2,2,2),(75,2,8,3),(76,3,6,3),(80,5,6,3),(82,6,6,2),(83,8,6,2);
/*!40000 ALTER TABLE `frasi_da_classificares_users_links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-18 14:28:27
