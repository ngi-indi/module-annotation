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
-- Table structure for table `up_users`
--
USE sentiment_setter;
DROP TABLE IF EXISTS `up_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `up_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int unsigned DEFAULT NULL,
  `updated_by_id` int unsigned DEFAULT NULL,
  `lista_bias` json DEFAULT NULL,
  `rating` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_users_created_by_id_fk` (`created_by_id`),
  KEY `up_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users`
--

LOCK TABLES `up_users` WRITE;
/*!40000 ALTER TABLE `up_users` DISABLE KEYS */;
INSERT INTO `up_users` VALUES (2,'davide2','utente1@prova.com','local','$2a$10$cvS27RU7y.0mMcRvhFX7D.Gk3ewpnrIcBJETbmg2xseQ14nnVNqqy',NULL,NULL,1,0,'2024-05-15 15:55:32.415000','2024-06-17 00:37:33.700000',1,1,'[\"Casa\", \"cane\", \"guerra\", \"informatica\"]',12),(3,'Simone','s@d.vom','local','$2a$10$G5NqN8HSKBnQbzs5R5Ct/uxEnhGqhAmAg.D1DLNBbwpL0anY2UT.W',NULL,NULL,1,0,'2024-05-17 12:05:38.015000','2024-06-16 17:51:49.779000',1,1,'[\"CASA\", \"ARTE\"]',4.5),(4,'utente2','utente2@prova.com','local','$2a$10$c6IjX9JH.TvD5KH2gQCVOu5rANcu2ZsDhRqzXholqjMFDDMs5shUK',NULL,NULL,1,0,'2024-05-17 18:36:11.465000','2024-06-17 00:37:33.770000',NULL,1,NULL,8.77),(5,'utente3','aaa1@gmail.com','local','$2a$10$vJewihfoUv47Uey9lO6za.lp90YtuHLxo7YOP9748OC8U9g77emXq',NULL,NULL,1,0,'2024-05-17 18:37:53.310000','2024-06-17 00:37:33.789000',NULL,1,'[\"test\", \"2\"]',0.9),(6,'utente4','utente4@prova.com','local','$2a$10$ddWBtPYx.ZQ6X.cl3l2w3OllCEWOYZirVYBUwl6eZL1QwJGDfZta.',NULL,NULL,1,0,'2024-06-17 14:17:23.504000','2024-06-17 23:43:40.001000',NULL,NULL,'[]',NULL),(8,'utente5','utente5@prova.com','local','$2a$10$mKZ6kUTVBdO2yqtg6TxVEen35aB0OG4haxmm3ro5/bvDiXXUN.nHm',NULL,NULL,1,0,'2024-06-17 14:33:29.229000','2024-06-17 23:45:39.108000',NULL,NULL,'[]',NULL),(9,'s.rocca4','ss@ddd.com','local','$2a$10$hnPcahp7H3f.nlcIAIYILum4q4iLuONU4wyV6tTIcDFJTOiPd1dCK',NULL,NULL,1,0,'2024-06-18 00:19:03.741000','2024-06-18 00:20:10.314000',NULL,NULL,'[\"1\"]',NULL);
/*!40000 ALTER TABLE `up_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-18 14:28:26
