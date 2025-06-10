INSERT INTO `users` VALUES (1,'joan nuñez','jsnunez94@gmail.com','$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK','1',3,1,'2025-04-28 19:56:09','2025-04-28 19:56:09',NULL,NULL);

INSERT INTO `users` VALUES (2,'joan nuñez','j@gmail.com','$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK','1',3,1,'2025-04-28 19:56:09','2025-04-28 19:56:09',NULL,NULL);


INSERT INTO departamentos  (nombre)
VALUES
('Amazonas'),          -- id 1
('Antioquia'),         -- id 2
('Arauca'),            -- id 3
('Atlántico'),         -- id 4
('Bolívar'),           -- id 5
('Boyacá'),            -- id 6
('Caldas'),            -- id 7
('Caquetá'),           -- id 8
('Casanare'),          -- id 9
('Cauca'),             -- id 10
('Cesar'),             -- id 11
('Chocó'),             -- id 12
('Córdoba'),           -- id 13
('Cundinamarca'),      -- id 14
('Guaviare'),          -- id 15
('Huila'),             -- id 16
('La Guajira'),        -- id 17
('Magdalena'),         -- id 18
('Meta'),              -- id 19
('Nariño'),            -- id 20
('Norte de Santander'),-- id 21
('Putumayo'),          -- id 22
('Quindío'),           -- id 23
('Risaralda'),         -- id 24
('San Andrés y Providencia'), -- id 25
('Santander'),         -- id 26
('Sucre'),             -- id 27
('Tolima'),            -- id 28
('Valle del Cauca'),   -- id 29
('Vaupés'),            -- id 30
('Vichada');           -- id 31

INSERT INTO ciudades  (nombre , departamentoId)
VALUES 
('Leticia', 1),        -- Amazonas
('Puerto Nariño', 1),  -- Amazonas
('Medellín', 2),       -- Antioquia
('Bello', 2),          -- Antioquia
('Itagüí', 2),         -- Antioquia
('Envigado', 2),       -- Antioquia
('Arauca', 3),         -- Arauca
('Arauquita', 3),      -- Arauca
('Barranquilla', 4),   -- Atlántico
('Soledad', 4),        -- Atlántico
('Cartagena', 5),      -- Bolívar
('Magangué', 5),       -- Bolívar
('Tunja', 6),          -- Boyacá
('Duitama', 6),        -- Boyacá
('Sogamoso', 6),       -- Boyacá
('Manizales', 7),      -- Caldas
('Villamaría', 7),     -- Caldas
('Florencia', 8),      -- Caquetá
('Morelia', 8),        -- Caquetá
('Yopal', 9),          -- Casanare
('Aguazul', 9),        -- Casanare
('Popayán', 10),       -- Cauca
('Santander de Quilichao', 10), -- Cauca
('Valledupar', 11),    -- Cesar
('Aguachica', 11),     -- Cesar
('Quibdó', 12),        -- Chocó
('Istmina', 12),       -- Chocó
('Montería', 13),      -- Córdoba
('Lorica', 13),        -- Córdoba
('Bogotá', 14),        -- Cundinamarca
('Inírida', 15),       -- Guaviare
('San José del Guaviare', 15), -- Guaviare
('Neiva', 16),         -- Huila
('Pitalito', 16),      -- Huila
('Riohacha', 17),      -- La Guajira
('Maicao', 17),        -- La Guajira
('Santa Marta', 18),   -- Magdalena
('Ciénaga', 18),       -- Magdalena
('Villavicencio', 19), -- Meta
('Acacías', 19),       -- Meta
('Pasto', 20),         -- Nariño
('Ipiales', 20),       -- Nariño
('Cúcuta', 21),        -- Norte de Santander
('Ocaña', 21),         -- Norte de Santander
('Mocoa', 22),         -- Putumayo
('Puerto Asís', 22),   -- Putumayo
('Armenia', 23),       -- Quindío
('Calarcá', 23),       -- Quindío
('Pereira', 24),       -- Risaralda
('Dosquebradas', 24),  -- Risaralda
('San Andrés', 25),    -- San Andrés y Providencia
('Bucaramanga', 26),   -- Santander
('Floridablanca', 26), -- Santander
('Sincelejo', 27),     -- Sucre
('Corozal', 27),       -- Sucre
('Ibagué', 28),        -- Tolima
('Espinal', 28),       -- Tolima
('Cali', 29),          -- Valle del Cauca
('Palmira', 29),       -- Valle del Cauca
('Mitú', 30),          -- Vaupés
('Puerto Carreño', 31); -- Vichada

INSERT INTO `retos` VALUES (,'innovacion continua','22a00348-7d61-4594-a21a-5547ba25bed8.mp4','crea una propuesta de innovacion con enfoque en el cafe o cacao','7a7031b4-71bf-4246-827d-6fa90ccf8d64.pdf','2025-04-28 21:56:47','2025-04-28 21:56:47');

INSERT INTO Entidad (
    claseEntidad, razonSocial, habilitado, numIdentificacion, tipoEntidad, naturalezaJuridica,
    actividadEconomica, correo, telefono, fechaConstitucion, ciudadId, direccion,
    facebook, instagram, paginaweb, contadorContacto, logo, contactoId, UserAdminId,
    createdAt, updatedAt
) VALUES
('Empresa', 'Café Innovador S.A.', 1, '900123456', 'Sociedad Anónima', 'Privada',
 'Producción de café', 'info@cafeinnovador.com', '3101234567', '2015-06-12', 3, 'Calle 10 #20-30',
 'facebook.com/cafeinnovador', 'instagram.com/cafeinnovador', 'www.cafeinnovador.com', 0, 'logo1.png', NULL, 1,
 NOW(), NOW()),
('Startup', 'Cacao Futuro Ltda.', 1, '901234567', 'Sociedad Limitada', 'Privada',
 'Transformación de cacao', 'contacto@cacaofuturo.com', '3209876543', '2019-09-01', 5, 'Carrera 15 #45-67',
 'facebook.com/cacaofuturo', 'instagram.com/cacaofuturo', 'www.cacaofuturo.com', 0, 'logo2.png', NULL, 2,
 NOW(), NOW()),
('Universidad', 'Universidad del Café', 1, '800765432', 'Persona Natural', 'Pública',
 'Educación superior', 'info@unidelcafe.edu.co', '6012345678', '2000-02-20', 14, 'Av. Universitaria #100-200',
 'facebook.com/unidelcafe', 'instagram.com/unidelcafe', 'www.unidelcafe.edu.co', 0, 'logo3.png', NULL, 1,
 NOW(), NOW());