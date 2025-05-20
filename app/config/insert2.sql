

INSERT INTO `aplicarretos` VALUES (1,1,1,'d6a0789f-6d5e-4e91-8412-e8ca1496e8cc.pdf','72dc29d8-b398-4ffd-8682-76192add3cbe.pdf','fa0f2477-560e-45bf-9b2e-c646068bf276.pdf','a79de2cd-e4a7-4dc3-9041-75fd152e1247.pdf','8a93c8fb-b23d-4523-bc38-7e4fbc2734fc.pdf','0a722f7b-15cd-45af-b665-c1c0e860b2a0.pdf','eb27d9e7-63e5-4665-b30b-13b3b91532f0.pdf','2025-05-06 10:08:04','2025-05-06 10:08:04'),(2,1,2,'cca3de72-fbbf-43b8-9122-e44354aa55be.pdf','8bc04e26-e577-4292-ba31-fb5b5c762723.pdf','a5016feb-c2e0-45ee-86b0-c1be461c9117.pdf','faf5303b-af95-45c2-a098-dbe42b1bc6a2.pdf','f445c3b8-45a4-45fe-944d-3d8a5608a05d.pdf','c42b4e55-939d-4eda-b607-c4b59cd5ed46.pdf','5433041d-fd5f-4aaf-998f-f484f48ceabf.pdf','2025-05-06 11:35:05','2025-05-06 11:35:05');
/*!40000 ALTER TABLE `aplicarretos` ENABLE KEYS */;

--
-- Table structure for table `cargos`
--

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'ceo');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Leticia',1),(2,'Puerto Nariño',1),(3,'Medellín',2),(4,'Bello',2),(5,'Itagüí',2),(6,'Envigado',2),(7,'Arauca',3),(8,'Arauquita',3),(9,'Barranquilla',4),(10,'Soledad',4),(11,'Cartagena',5),(12,'Magangué',5),(13,'Tunja',6),(14,'Duitama',6),(15,'Sogamoso',6),(16,'Manizales',7),(17,'Villamaría',7),(18,'Florencia',8),(19,'Morelia',8),(20,'Yopal',9),(21,'Aguazul',9),(22,'Popayán',10),(23,'Santander de Quilichao',10),(24,'Valledupar',11),(25,'Aguachica',11),(26,'Quibdó',12),(27,'Istmina',12),(28,'Montería',13),(29,'Lorica',13),(30,'Bogotá',14),(31,'Inírida',15),(32,'San José del Guaviare',15),(33,'Neiva',16),(34,'Pitalito',16),(35,'Riohacha',17),(36,'Maicao',17),(37,'Santa Marta',18),(38,'Ciénaga',18),(39,'Villavicencio',19),(40,'Acacías',19),(41,'Pasto',20),(42,'Ipiales',20),(43,'Cúcuta',21),(44,'Ocaña',21),(45,'Mocoa',22),(46,'Puerto Asís',22),(47,'Armenia',23),(48,'Calarcá',23),(49,'Pereira',24),(50,'Dosquebradas',24),(51,'San Andrés',25),(52,'Bucaramanga',26),(53,'Floridablanca',26),(54,'Sincelejo',27),(55,'Corozal',27),(56,'Ibagué',28),(57,'Espinal',28),(58,'Cali',29),(59,'Palmira',29),(60,'Mitú',30),(61,'Puerto Carreño',31);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasificados`
--



LOCK TABLES `clasificados` WRITE;
/*!40000 ALTER TABLE `clasificados` DISABLE KEYS */;
INSERT INTO `clasificados` VALUES (1,'hola ','sdgfdsg','1.216.514','Diseño gráfico',5,0,'3 días','bucaramanga',1,'2025-04-29 14:25:30',0,0,0,'offer','2025-05-05 11:50:50'),(2,'hola 1','dsgfasdfg','16.541','Diseño gráfico',5,0,'14 días','cali',1,'2025-04-28 14:25:43',0,0,0,'offer','2025-05-05 11:50:51'),(3,'desarrollo de software a la medida','dsfgdfs','156.165','Desarrollo web',5,0,'14 días','cucuta',1,'2025-04-29 14:26:16',0,0,0,'request','2025-05-05 14:55:50'),(5,'gdsfghfsd','dsfgsfd','34.234','Desarrollo web',5,0,'7 días','dfgsdf',2,'2025-04-29 14:56:11',0,0,0,'offer','2025-05-05 14:55:52'),(7,'desarrollo softwae','123415','10.000.000','Desarrollo web',5,0,'7 días','bucaramanga',2,'2025-05-06 14:29:17',0,0,0,'offer','2025-05-06 14:29:17'),(8,'portafolio servicio','154189','1.619.851','Diseño gráfico',5,0,'3 días','cali',2,'2025-05-06 14:29:55',0,0,0,'offer','2025-05-06 14:29:55'),(9,'pagina web eccomerce','165156','123.458.641','Desarrollo web',5,0,'14 días','mogotes',2,'2025-05-06 14:37:52',0,0,0,'offer','2025-05-06 14:37:52'),(11,'construccion casa','54165341','12.314.564.165','Estilo de vida',5,0,'14 días','5461645',2,'2025-05-06 14:39:03',0,0,0,'request','2025-05-06 14:39:03'),(16,'diseño portafolio empresa','5164165','16.541.658','Diseño gráfico',5,0,'7 días','cucuta',2,'2025-05-06 14:46:33',0,0,0,'offer','2025-05-06 14:46:33'),(17,'fkjmuyh','ghjfh','567.445','Desarrollo web',5,0,'7 días','ghjmhgf',2,'2025-05-06 14:47:21',0,0,0,'offer','2025-05-06 14:47:21'),(18,'trye','fghd','53.452','Desarrollo web',5,0,'3 días','bnfgdn',2,'2025-05-06 14:48:31',0,0,0,'offer','2025-05-06 14:48:31'),(19,'hgfgf','ghrte','435','Desarrollo web',5,0,'24 horas','fghfdg',2,'2025-05-06 14:48:54',0,0,0,'offer','2025-05-06 14:48:54'),(20,'thyutre','hhrt','45.435','Desarrollo web',5,0,'24 horas','gfhgdf',2,'2025-05-06 14:49:47',0,0,0,'offer','2025-05-06 14:49:47'),(21,'hfgh','rety','4.325','Desarrollo web',5,0,'24 horas','gfhhdn',2,'2025-05-06 14:52:13',0,0,0,'offer','2025-05-06 14:52:13'),(25,'dfsfgh','hgfdhd','5.435','Marketing digital',5,0,'3 días','hgfdfgh',2,'2025-05-06 14:57:07',0,0,0,'offer','2025-05-06 14:57:07'),(26,'4563456','hgfjghdf','5.436','Diseño gráfico',5,0,'24 horas','ghfj',2,'2025-05-06 14:57:28',0,0,0,'offer','2025-05-06 14:57:28'),(27,'gfhd','hfdh','345.345','Desarrollo web',5,0,'24 horas','4543',2,'2025-05-06 14:57:59',0,0,0,'offer','2025-05-06 14:57:59'),(28,'dfgdfs','gfds','3.242','Desarrollo web',5,0,'24 horas','dfsg',2,'2025-05-06 14:58:31',0,0,0,'offer','2025-05-06 14:58:31'),(29,'123','56215','1.234','Diseño gráfico',5,0,'24 horas','123615',2,'2025-05-06 15:00:14',0,0,0,'offer','2025-05-06 15:00:14'),(30,'1','12','1','Diseño gráfico',5,0,'24 horas','1',2,'2025-05-06 15:00:49',0,0,0,'offer','2025-05-06 15:00:49'),(37,'123','123','123','Diseño gráfico',5,0,'24 horas','13',2,'2025-05-06 15:11:40',0,0,0,'offer','2025-05-06 15:11:40'),(38,'sebastian','123','12','Diseño gráfico',5,0,'3 días','136156',2,'2025-05-06 15:12:17',0,0,0,'offer','2025-05-06 15:12:17'),(39,'construccion robot seguidor de linea','Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de l','100.000','Programación',5,0,'24 horas','sdgdfgsdfg',2,'2025-05-06 15:14:03',0,0,0,'request','2025-05-06 15:14:03');
/*!40000 ALTER TABLE `clasificados` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `contactarsolicitud` WRITE;
/*!40000 ALTER TABLE `contactarsolicitud` DISABLE KEYS */;
INSERT INTO `contactarsolicitud` VALUES (1,1,'joan sebastian','jsnunez@gmail.com','3044469689','gfsadgsdfgsdfgh','2025-04-29 14:58:43',2),(2,1,'dfgsdf','dfgsd@gmail.com','gfdsg','dfgsdf','2025-04-29 15:00:07',2),(3,1,'dfhgfd','ewrgtre@gmail.com','156156','dfsgsdfg','2025-04-29 15:02:43',2),(4,5,'joan','jsnunez94@gmail.com','3044469689','sebsatian','2025-05-05 14:58:43',1),(5,5,'joan','jsnunez94@gmail.com','304469689','hola estoy interesado en tu servicio','2025-05-05 15:08:53',1),(6,5,'joan','jsnunez94@gmail.com','3044469689','estoy interesado','2025-05-05 15:09:20',1),(7,5,'joan','jsnunez94@gmail.com','3044469689','hola','2025-05-05 15:10:20',1),(8,5,'joan','jsnunez94@gmail.com','3044469689','hola','2025-05-05 15:10:25',1),(9,5,'joan','jsnunez94@gmail.com','3044469689','holadfsg','2025-05-05 15:10:26',1),(10,5,'joan','jsnunez94@gmail.com','3044469689','holadfsg','2025-05-05 15:10:26',1),(11,5,'joan','jsnunez94@gmail.com','304469689','123\n45','2025-05-05 15:11:07',1),(12,5,'joan','jsnunez94@gmail.com','304469689','123\n45','2025-05-05 15:12:11',1),(13,5,'gds','jsnunez94@gmail.com','304469689','dsfsdfg','2025-05-05 15:13:01',1),(14,5,'tre','jsnunez94@gmail.com','ef','31253','2025-05-05 15:14:25',1),(15,5,'gfds','jsnunez94@gmail.com','1231','1321566','2025-05-05 15:18:09',1),(16,5,'fdgs','jsnunez94@gmail.com','1651','156146958','2025-05-05 15:19:14',1),(17,5,'jhuguyhkj','jsnunez94@gamil.com','1234','12345','2025-05-05 15:22:52',1),(18,5,'bodremepso@gufum.com','bodremepso@gufum.com','43er','dgdfg','2025-05-05 15:30:53',1),(19,5,'feg','bodremepso@gufum.com','dfsghsfdh','sdfhgsgf','2025-05-05 15:34:39',1),(20,1,'dfgsg','bodremepso@gufum.com','342523','gdsdfgsfd','2025-05-05 15:37:28',2),(21,3,'fdsrytrs','bodremepso@gufum.com','32532','sdfghfdh','2025-05-05 16:00:22',2);
/*!40000 ALTER TABLE `contactarsolicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactos`
--



LOCK TABLES `contactos` WRITE;
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` VALUES (1,'3044469689','jsnunez94@gmail.com','joan sebastian nuñez',1,'2025-05-05 08:58:56','2025-05-06 09:13:14'),(2,'1','jsnunez@ferreteriasn.com','joan sebastian nuñez',1,'2025-05-06 10:53:35','2025-05-06 14:18:15');
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Amazonas'),(2,'Antioquia'),(3,'Arauca'),(4,'Atlántico'),(5,'Bolívar'),(6,'Boyacá'),(7,'Caldas'),(8,'Caquetá'),(9,'Casanare'),(10,'Cauca'),(11,'Cesar'),(12,'Chocó'),(13,'Córdoba'),(14,'Cundinamarca'),(15,'Guaviare'),(16,'Huila'),(17,'La Guajira'),(18,'Magdalena'),(19,'Meta'),(20,'Nariño'),(21,'Norte de Santander'),(22,'Putumayo'),(23,'Quindío'),(24,'Risaralda'),(25,'San Andrés y Providencia'),(26,'Santander'),(27,'Sucre'),(28,'Tolima'),(29,'Valle del Cauca'),(30,'Vaupés'),(31,'Vichada');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;



-- Dumping data for table `entidad`
--

LOCK TABLES `entidad` WRITE;
/*!40000 ALTER TABLE `entidad` DISABLE KEYS */;
INSERT INTO `entidad` VALUES (1,'Empresa','ferreteria Sn',1,'1098765289','Persona Natural','Privada','comercio al por menor','jsnunez94@gmail.com','3044469689','2020-12-31 19:00:00',52,'calle 21#22-37','https://www.facebook.com/FerreteriaSNbga/','https://www.facebook.com/FerreteriaSNbga/','https://www.facebook.com/FerreteriaSNbga/','b562da42-8697-47f8-b094-706015e5a8e7.jpg',1,1,'2025-05-05 08:58:56','2025-05-06 09:13:14'),(2,'Empresa','titanes elite',1,'12346','Sociedad Anónima','Privada','1','jsnunez@ferreteriasn.com','1','1995-11-10 19:00:00',35,'1','https://www.apple.com','https://www.instagram.com/titanes_elite_bucaramanga/?hl=es-la','https://www.apple.com/co/','a28f9ca6-1644-49b8-bf46-a9c49d2c20a9.jpeg',2,2,'2025-05-06 10:53:35','2025-05-06 14:18:15');
/*!40000 ALTER TABLE `entidad` ENABLE KEYS */;
UNLOCK TABLES;

--

-- Dumping data for table `retos`
--

LOCK TABLES `retos` WRITE;
/*!40000 ALTER TABLE `retos` DISABLE KEYS */;
INSERT INTO `retos` VALUES (1,'innovacion 1234','82b4eeaf-29f6-4248-8489-177a999e5d7a.mp4','sebastian 1234567','65f3169c-7cb4-4c31-ba1c-5951e0510b92.pdf','2025-04-29 14:18:10','2025-05-06 10:55:45'),(2,'sebas','922e7ed6-17bf-429e-bd90-7ad4b2a0cb4a.mp4','fdshgbfdsh','b116a5a2-81d9-45fb-b242-02e764bdf80b.pdf','2025-04-28 14:24:14','2025-04-29 14:24:14'),(3,'fdsgf','de454ec8-a968-453d-814c-25adf0ecc926.mp4','dfgsdfgsfdg','290ece59-d37f-4ee7-b85a-a1341a3f5a9d.pdf','2025-04-29 14:25:01','2025-04-29 14:25:01');
/*!40000 ALTER TABLE `retos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--



LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joan nuñez ','jsnunez94@gmail.com','$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK','1',3,1,'2025-04-28 19:56:09','2025-05-06 10:38:06',NULL,NULL),(2,'juan camilo','j@gmail.com','$2a$10$OBypDFG5LtKaruyIMT2zZeynMnNi0eEEyHgr245Jlxwt6SQblZsia','1',1,1,'2025-04-29 14:32:43','2025-05-06 09:19:49',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


