-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: database-1.ci2hp2jo8ok0.ap-northeast-2.rds.amazonaws.com    Database: webgyver
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `seller_roles`
--

DROP TABLE IF EXISTS `seller_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_roles` (
  `seller_idx` bigint NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKdjs29ewttoqes37f0krs3mhdq` (`seller_idx`),
  CONSTRAINT `FKdjs29ewttoqes37f0krs3mhdq` FOREIGN KEY (`seller_idx`) REFERENCES `seller` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_roles`
--

LOCK TABLES `seller_roles` WRITE;
/*!40000 ALTER TABLE `seller_roles` DISABLE KEYS */;
INSERT INTO `seller_roles` VALUES (1,'PARTNER'),(2,'PARTNER'),(3,'PARTNER'),(4,'PARTNER'),(5,'PARTNER'),(6,'PARTNER'),(7,'PARTNER'),(8,'PARTNER'),(9,'PARTNER'),(10,'PARTNER'),(11,'PARTNER'),(12,'PARTNER'),(13,'PARTNER'),(14,'PARTNER'),(15,'PARTNER'),(16,'PARTNER');
/*!40000 ALTER TABLE `seller_roles` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  1:25:15
