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
-- Table structure for table `frasi_da_classificares`
--
USE sentiment_setter;
DROP TABLE IF EXISTS `frasi_da_classificares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frasi_da_classificares` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `testo_frase` longtext,
  `flag_classificazione` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int unsigned DEFAULT NULL,
  `updated_by_id` int unsigned DEFAULT NULL,
  `flag_test` tinyint(1) DEFAULT NULL,
  `flag_bias` tinyint(1) DEFAULT NULL,
  `user_result` json DEFAULT NULL,
  `lista_bias` varchar(255) DEFAULT NULL,
  `version` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `frasi_da_classificares_created_by_id_fk` (`created_by_id`),
  KEY `frasi_da_classificares_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `frasi_da_classificares_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `frasi_da_classificares_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frasi_da_classificares`
--

LOCK TABLES `frasi_da_classificares` WRITE;
/*!40000 ALTER TABLE `frasi_da_classificares` DISABLE KEYS */;
INSERT INTO `frasi_da_classificares` VALUES (1,'frase esempio prova 1',0,'2024-05-15 15:53:30.584000','2024-06-18 14:08:18.102000','2024-05-22 11:58:56.463000',1,1,0,NULL,'[{\"value\": \"yes\", \"userId\": \"4\"}, {\"value\": \"yes\", \"userId\": \"2\"}]','Text-level Context Bias',1),(2,'frase esempio prova 2',1,'2024-05-15 15:53:30.584000','2024-06-18 14:08:28.127000','2024-06-04 00:39:28.161000',1,1,0,NULL,'[{\"value\": \"yes\", \"userId\": \"4\"}, {\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"8\"}]','Hate Speech',NULL),(3,'frase test 1',1,'2024-06-04 18:50:18.335000','2024-06-18 14:08:46.321000','2024-06-04 18:50:21.164000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"4\"}, {\"value\": \"yes\", \"userId\": \"6\"}]','Reporting-Level Context Bias',NULL),(4,'frase test 2',0,'2024-06-04 18:50:33.099000','2024-06-18 14:08:56.099000','2024-06-04 18:50:34.315000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"4\"}]','Linguistic bias',NULL),(5,'frase test 3',1,'2024-06-04 18:50:47.817000','2024-06-18 14:09:09.881000','2024-06-04 18:50:49.246000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"4\"}, {\"value\": \"no\", \"userId\": \"2\"}, {\"value\": \"no\", \"userId\": \"6\"}]','Political bias',NULL),(6,'frase esempio prova 3',0,'2024-06-04 18:51:10.271000','2024-06-18 14:09:20.258000','2024-06-04 18:51:11.072000',1,1,0,0,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"6\"}]','Cognitive Bias',NULL),(7,'frase esempio prova 4',0,'2024-06-04 18:52:34.693000','2024-06-18 14:09:30.465000','2024-06-04 18:52:35.368000',1,1,0,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"no\", \"userId\": \"4\"}]','Text-level Context Bias',NULL),(8,'frase esempio prova 5',0,'2024-06-04 18:52:47.488000','2024-06-18 14:09:38.773000','2024-06-04 18:52:49.769000',1,1,0,0,'[{\"value\": \"no\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"6\"}]','Gender Bias',NULL),(9,'frase test 4',0,'2024-06-04 18:53:08.698000','2024-06-18 14:09:46.203000','2024-06-04 18:53:09.322000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"4\"}]','Political bias',NULL),(10,'frase test 5',0,'2024-06-04 18:53:29.639000','2024-06-18 14:09:57.541000','2024-06-04 18:53:32.608000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"4\"}]','Cognitive Bias',NULL),(11,'frase test 6',1,'2024-06-04 18:53:46.157000','2024-06-18 14:10:25.059000','2024-06-04 18:53:47.778000',1,1,1,NULL,'[{\"value\": \"yes\", \"userId\": \"2\"}, {\"value\": \"yes\", \"userId\": \"4\"}]','Cognitive Bias',NULL);
/*!40000 ALTER TABLE `frasi_da_classificares` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-18 14:28:23
