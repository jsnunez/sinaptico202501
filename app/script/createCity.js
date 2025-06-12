import sequelize from '../config/database.js';
import Ciudad from '../models/ciudad.js';

const ciudades = [
  
  {
    "id": 87,
    "nombre": "Puerto Nare",
   
    "departamentoId": 2
  
  },
  {
    "id": 88,
    "nombre": "Puerto Triunfo",
   
    "departamentoId": 2
  
  },
  {
    "id": 89,
    "nombre": "Remedios",
   
    "departamentoId": 2
  
  },
  {
    "id": 90,
    "nombre": "Retiro",
   
    "departamentoId": 2
  
  },
  {
    "id": 91,
    "nombre": "Rionegro",
    "description": "Rionegro es un municipio de Colombia, ubicado en el departamento de Antioquia. Está localizado en el valle de San Nicolás o también llamado Altiplano del Oriente, en la subregión Oriente, siendo la ciudad con mayor población y la que concentra el movimiento económico de la subregión. Está ubicada a tan solo 35 minutos de Medellín, capital del departamento, gracias al túnel de interconexión Aburrá-Oriente. Su nombre oficial es Ciudad Santiago de Arma de Rionegro.",
    "surface": 196,
    "population": 135465,
    "postalCode": "54040",
    "departamentoId": 2
  
  },
  {
    "id": 92,
    "nombre": "Sabanalarga",
   
    "departamentoId": 2
  
  },
  {
    "id": 93,
    "nombre": "Sabaneta",
   
    "departamentoId": 2
  
  },
  {
    "id": 94,
    "nombre": "Salgar",
   
    "departamentoId": 2
  
  },
  {
    "id": 95,
    "nombre": "San Francisco",
   
    "departamentoId": 2
  
  },
  {
    "id": 96,
    "nombre": "San Jerónimo",
   
    "departamentoId": 2
  
  },
  {
    "id": 97,
    "nombre": "San Luis",
   
    "departamentoId": 2
  
  },
  {
    "id": 98,
    "nombre": "San Pedro",
   
    "departamentoId": 2
  
  },
  {
    "id": 99,
    "nombre": "San Rafael",
   
    "departamentoId": 2
  
  },
  {
    "id": 100,
    "nombre": "San Roque",
   
    "departamentoId": 2
  
  },
  {
    "id": 101,
    "nombre": "San Vicente",
   
    "departamentoId": 2
  
  },
  {
    "id": 102,
    "nombre": "Santa Bárbara",
   
    "departamentoId": 2
  
  },
  {
    "id": 103,
    "nombre": "Santo Domingo",
   
    "departamentoId": 2
  
  },
  {
    "id": 104,
    "nombre": "El Santuario",
   
    "departamentoId": 2
  
  },
  {
    "id": 105,
    "nombre": "Segovia",
   
    "departamentoId": 2
  
  },
  {
    "id": 106,
    "nombre": "Sopetrán",
   
    "departamentoId": 2
  
  },
  {
    "id": 107,
    "nombre": "Támesis",
   
    "departamentoId": 2
  
  },
  {
    "id": 108,
    "nombre": "Tarazá",
   
    "departamentoId": 2
  
  },
  {
    "id": 109,
    "nombre": "Tarso",
   
    "departamentoId": 2
  
  },
  {
    "id": 110,
    "nombre": "Titiribí",
   
    "departamentoId": 2
  
  },
  {
    "id": 111,
    "nombre": "Toledo",
   
    "departamentoId": 2
  
  },
  {
    "id": 112,
    "nombre": "Turbo",
    "description": "Turbo es un distrito de Colombia localizado en la subregión de Urabá en el departamento de Antioquia. Fue declarado por ley de la república 1883 de 2018 distrito especial portuario, logístico, industrial, turístico y comercial.",
    "surface": 3055,
    "population": 124552,
    "postalCode": "57860",
    "departamentoId": 2
  
  },
  {
    "id": 113,
    "nombre": "Uramita",
   
    "departamentoId": 2
  
  },
  {
    "id": 114,
    "nombre": "Urrao",
   
    "departamentoId": 2
  
  },
  {
    "id": 115,
    "nombre": "Valdivia",
   
    "departamentoId": 2
  
  },
  {
    "id": 116,
    "nombre": "Valparaíso",
   
    "departamentoId": 2
  
  },
  {
    "id": 117,
    "nombre": "Vegachí",
   
    "departamentoId": 2
  
  },
  {
    "id": 118,
    "nombre": "Venecia",
   
    "departamentoId": 2
  
  },
  {
    "id": 119,
    "nombre": "Yalí",
   
    "departamentoId": 2
  
  },
  {
    "id": 120,
    "nombre": "Yarumal",
   
    "departamentoId": 2
  
  },
  {
    "id": 121,
    "nombre": "Yolombó",
   
    "departamentoId": 2
  
  },
  {
    "id": 122,
    "nombre": "Yondó",
   
    "departamentoId": 2
  
  },
  {
    "id": 123,
    "nombre": "Zaragoza",
   
    "departamentoId": 2
  
  },
  {
    "id": 124,
    "nombre": "San Pedro de Uraba",
   
    "departamentoId": 2
  
  },
  {
    "id": 125,
    "nombre": "Santafé de Antioquia",
   
    "departamentoId": 2
  
  },
  {
    "id": 126,
    "nombre": "Santa Rosa de Osos",
   
    "departamentoId": 2
  
  },
  {
    "id": 127,
    "nombre": "San Andrés de Cuerquía",
   
    "departamentoId": 2
  
  },
  {
    "id": 128,
    "nombre": "Vigía del Fuerte",
   
    "departamentoId": 2
  
  },
  {
    "id": 129,
    "nombre": "San José de La Montaña",
   
    "departamentoId": 2
  
  },
  {
    "id": 130,
    "nombre": "San Juan de Urabá",
   
    "departamentoId": 2
  
  },
  {
    "id": 131,
    "nombre": "El Carmen de Viboral",
   
    "departamentoId": 2
  
  },
  {
    "id": 132,
    "nombre": "San Carlos",
   
    "departamentoId": 2
  
  },
  {
    "id": 133,
    "nombre": "Frontino",
   
    "departamentoId": 2
  
  },
  {
    "id": 134,
    "nombre": "Granada",
   
    "departamentoId": 2
  
  },
  {
    "id": 135,
    "nombre": "Jardín",
   
    "departamentoId": 2
  
  },
  {
    "id": 136,
    "nombre": "Sonsón",
   
    "departamentoId": 2
  
  },
  {
    "id": 137,
    "nombre": "Arauquita",
   
    "departamentoId": 3
  
  },
  {
    "id": 138,
    "nombre": "Cravo Norte",
   
    "departamentoId": 3
  
  },
  {
    "id": 139,
    "nombre": "Fortul",
   
    "departamentoId": 3
  
  },
  {
    "id": 140,
    "nombre": "Puerto Rondón",
   
    "departamentoId": 3
  
  },
  {
    "id": 141,
    "nombre": "Saravena",
   
    "departamentoId": 3
  
  },
  {
    "id": 142,
    "nombre": "Tame",
   
    "departamentoId": 3
  
  },
  {
    "id": 143,
    "nombre": "Arauca",
    "description": "Arauca, cuyo nombre colonial es Villa de Santa Bárbara de Arauca, es un municipio colombiano, capital del departamento de Arauca. Está localizado sobre el margen sur del río Arauca. Limita con Venezuela al norte, con la cual está conectada mediante el Puente Internacional José Antonio Páez y se comunica por vía terrestre hacia el centro de Colombia mediante la Ruta de los Libertadores",
    "surface": 5841,
    "population": 96814,
    "postalCode": "810001",
    "departamentoId": 3
  
  },
  {
    "id": 144,
    "nombre": "Barranquilla",
    "description": "El Área metropolitana de Barranquilla es una conurbación colombiana ubicada en el norte del departamento de Atlántico. Su municipio principal es la capital departamental Barranquilla, y los otros municipios periféricos que la integran son Soledad, Galapa, Puerto Colombia y Malambo. Es la primera conurbación de la Región Caribe, la más densamente poblada y la cuarta del país.",
    "surface": 520,
    "population": 2326292,
    "postalCode": "80001",
    "departamentoId": 4
  
  },
  {
    "id": 145,
    "nombre": "Baranoa",
   
    "departamentoId": 4
  
  },
  {
    "id": 146,
    "nombre": "Candelaria",
   
    "departamentoId": 4
  
  },
  {
    "id": 147,
    "nombre": "Galapa",
   
    "departamentoId": 4
  
  },
  {
    "id": 148,
    "nombre": "Luruaco",
   
    "departamentoId": 4
  
  },
  {
    "id": 149,
    "nombre": "Malambo",
   
    "departamentoId": 4
  
  },
  {
    "id": 150,
    "nombre": "Manatí",
   
    "departamentoId": 4
  
  },
  {
    "id": 151,
    "nombre": "Piojó",
   
    "departamentoId": 4
  
  },
  {
    "id": 152,
    "nombre": "Polonuevo",
   
    "departamentoId": 4
  
  },
  {
    "id": 153,
    "nombre": "Sabanagrande",
   
    "departamentoId": 4
  
  },
  {
    "id": 154,
    "nombre": "Sabanalarga",
    "description": "Sabanalarga es un municipio colombiano ubicado en el departamento del Atlántico, y ubicado en la costa caribe de Colombia.",
    "surface": 399,
    "population": 100328,
    "postalCode": "57020",
    "departamentoId": 4
  
  },
  {
    "id": 155,
    "nombre": "Santa Lucía",
   
    "departamentoId": 4
  
  },
  {
    "id": 156,
    "nombre": "Santo Tomás",
   
    "departamentoId": 4
  
  },
  {
    "id": 157,
    "nombre": "Soledad",
   
    "departamentoId": 4
  
  },
  {
    "id": 158,
    "nombre": "Suan",
   
    "departamentoId": 4
  
  },
  {
    "id": 159,
    "nombre": "Tubará",
   
    "departamentoId": 4
  
  },
  {
    "id": 160,
    "nombre": "Usiacurí",
   
    "departamentoId": 4
  
  },
  {
    "id": 161,
    "nombre": "Juan de Acosta",
   
    "departamentoId": 4
  
  },
  {
    "id": 162,
    "nombre": "Palmar de Varela",
   
    "departamentoId": 4
  
  },
  {
    "id": 163,
    "nombre": "Campo de La Cruz",
   
    "departamentoId": 4
  
  },
  {
    "id": 164,
    "nombre": "Repelón",
   
    "departamentoId": 4
  
  },
  {
    "id": 165,
    "nombre": "Puerto Colombia",
   
    "departamentoId": 4
  
  },
  {
    "id": 166,
    "nombre": "Ponedera",
   
    "departamentoId": 4
  
  },
  {
    "id": 167,
    "nombre": "Bogotá D.C.",
    "description": "Bogotá, oficialmente Bogotá, Distrito Capital​ (antiguamente, Santafé de Bogotá y originalmente, Santafé),​ es la capital de la República de Colombia y del departamento de Cundinamarca. Está administrada como distrito capital, y goza de autonomía para la gestión de sus intereses dentro de los límites de la Constitución y la ley.12​18​ A diferencia de los demás distritos de Colombia, Bogotá es una entidad territorial de primer orden, con las atribuciones administrativas que la ley confiere a los departamentos",
    "surface": 1636,
    "population": 7901653,
    "postalCode": "110110",
    "departamentoId": 5
  
  },
  {
    "id": 168,
    "nombre": "Achí",
   
    "departamentoId": 6
  
  },
  {
    "id": 169,
    "nombre": "Arenal",
   
    "departamentoId": 6
  
  },
  {
    "id": 170,
    "nombre": "Arjona",
   
    "departamentoId": 6
  
  },
  {
    "id": 171,
    "nombre": "Arroyohondo",
   
    "departamentoId": 6
  
  },
  {
    "id": 172,
    "nombre": "Calamar",
   
    "departamentoId": 6
  
  },
  {
    "id": 173,
    "nombre": "Cantagallo",
   
    "departamentoId": 6
  
  },
  {
    "id": 174,
    "nombre": "Cicuco",
   
    "departamentoId": 6
  
  },
  {
    "id": 175,
    "nombre": "Córdoba",
   
    "departamentoId": 6
  
  },
  {
    "id": 176,
    "nombre": "Clemencia",
   
    "departamentoId": 6
  
  },
  {
    "id": 177,
    "nombre": "El Guamo",
   
    "departamentoId": 6
  
  },
  {
    "id": 178,
    "nombre": "Magangué",
    "description": "Magangué es un municipio colombiano localizado a orillas del río Magdalena, en el departamento de Bolívar. Este municipio bolivarense es conocido como \"La Ciudad de los Ríos\", ya que en este lugar del país desembocan los ríos Cauca y San Jorge en el Magdalena. Fue fundado en 1610 por Diego de Carvajal, y refundada un 28 de octubre de 1776 por el militar español Antonio de la Torre y Miranda.",
    "surface": 1568,
    "population": 128000,
    "postalCode": "132511",
    "departamentoId": 6
  
  },
  {
    "id": 179,
    "nombre": "Mahates",
   
    "departamentoId": 6
  
  },
  {
    "id": 180,
    "nombre": "Margarita",
   
    "departamentoId": 6
  
  },
  {
    "id": 181,
    "nombre": "Montecristo",
   
    "departamentoId": 6
  
  },
  {
    "id": 182,
    "nombre": "Mompós",
   
    "departamentoId": 6
  
  },
  {
    "id": 183,
    "nombre": "Morales",
   
    "departamentoId": 6
  
  },
  {
    "id": 184,
    "nombre": "Norosí",
   
    "departamentoId": 6
  
  },
  {
    "id": 185,
    "nombre": "Pinillos",
   
    "departamentoId": 6
  
  },
  {
    "id": 186,
    "nombre": "Regidor",
   
    "departamentoId": 6
  
  },
  {
    "id": 187,
    "nombre": "Río Viejo",
   
    "departamentoId": 6
  
  },
  {
    "id": 188,
    "nombre": "San Estanislao",
   
    "departamentoId": 6
  
  },
  {
    "id": 189,
    "nombre": "San Fernando",
   
    "departamentoId": 6
  
  },
  {
    "id": 190,
    "nombre": "San Juan Nepomuceno",
   
    "departamentoId": 6
  
  },
  {
    "id": 191,
    "nombre": "Santa Catalina",
   
    "departamentoId": 6
  
  },
  {
    "id": 192,
    "nombre": "Santa Rosa",
   
    "departamentoId": 6
  
  },
  {
    "id": 193,
    "nombre": "Simití",
   
    "departamentoId": 6
  
  },
  {
    "id": 194,
    "nombre": "Soplaviento",
   
    "departamentoId": 6
  
  },
  {
    "id": 195,
    "nombre": "Talaigua Nuevo",
   
    "departamentoId": 6
  
  },
  {
    "id": 196,
    "nombre": "Tiquisio",
   
    "departamentoId": 6
  
  },
  {
    "id": 197,
    "nombre": "Turbaco",
   
    "departamentoId": 6
  
  },
  {
    "id": 198,
    "nombre": "Turbaná",
   
    "departamentoId": 6
  
  },
  {
    "id": 199,
    "nombre": "Villanueva",
   
    "departamentoId": 6
  
  },
  {
    "id": 200,
    "nombre": "Barranco de Loba",
   
    "departamentoId": 6
  
  },
  {
    "id": 201,
    "nombre": "Santa Rosa del Sur",
   
    "departamentoId": 6
  
  },
  {
    "id": 202,
    "nombre": "Hatillo de Loba",
   
    "departamentoId": 6
  
  },
  {
    "id": 203,
    "nombre": "El Carmen de Bolívar",
    "description": "El Carmen de Bolívar es un municipio del departamento de Bolívar, Colombia, ubicado en el sistema orográfico de los Montes de María, siendo la población más grande, así como la que concentra el movimiento económico y comercial de la subregión. Está a 120 km al sudeste de Cartagena de Indias y a 69 km al norte de Sincelejo.",
    "surface": 954,
    "population": 70131,
    "postalCode": "132050",
    "departamentoId": 6
  
  },
  {
    "id": 204,
    "nombre": "San Martín de Loba",
   
    "departamentoId": 6
  
  },
  {
    "id": 205,
    "nombre": "Altos del Rosario",
   
    "departamentoId": 6
  
  },
  {
    "id": 206,
    "nombre": "San Jacinto del Cauca",
   
    "departamentoId": 6
  
  },
  {
    "id": 207,
    "nombre": "San Pablo de Borbur",
   
    "departamentoId": 6
  
  },
  {
    "id": 208,
    "nombre": "San Jacinto",
   
    "departamentoId": 6
  
  },
  {
    "id": 209,
    "nombre": "El Peñón",
   
    "departamentoId": 6
  
  },
  {
    "id": 210,
    "nombre": "Cartagena",
    "description": "Cartagena de Indias, oficialmente Distrito Turístico y Cultural de Cartagena de Indias (abreviado Cartagena de Indias, D. T. y C.), es la capital del departamento de Bolívar, al norte de Colombia.6​ Fue fundada el 1 de junio de 1533 por Pedro de Heredia.7​ Desde 1991 Cartagena es un Distrito Turístico y Cultural.8​ La ciudad está ubicada a orillas del mar Caribe",
    "surface": 609,
    "population": 1028736,
    "postalCode": "130000",
    "departamentoId": 6
  
  },
  {
    "id": 211,
    "nombre": "María la Baja",
   
    "departamentoId": 6
  
  },
  {
    "id": 212,
    "nombre": "San Cristóbal",
   
    "departamentoId": 6
  
  },
  {
    "id": 213,
    "nombre": "Zambrano",
   
    "departamentoId": 6
  
  },
  {
    "id": 214,
    "nombre": "Tununguá",
   
    "departamentoId": 7
  
  },
  {
    "id": 215,
    "nombre": "Motavita",
   
    "departamentoId": 7
  
  },
  {
    "id": 216,
    "nombre": "Ciénega",
   
    "departamentoId": 7
  
  },
  {
    "id": 217,
    "nombre": "Tunja",
    "description": "Tunja es un municipio colombiano, capital del departamento de Boyacá, situado sobre la cordillera oriental de los Andes a 115 km al noreste de Bogotá. Es la ciudad capital más alta del país. Tunja fue construida sobre Hunza, la capital de la confederación Muisca el 6 de agosto de 1539. Con su título de villa otorgado por la corona española",
    "surface": 121,
    "population": 180568,
    "postalCode": "150001",
    "departamentoId": 7
  
  },
  {
    "id": 218,
    "nombre": "Almeida",
   
    "departamentoId": 7
  
  },
  {
    "id": 219,
    "nombre": "Aquitania",
   
    "departamentoId": 7
  
  },
  {
    "id": 220,
    "nombre": "Arcabuco",
   
    "departamentoId": 7
  
  },
  {
    "id": 221,
    "nombre": "Berbeo",
   
    "departamentoId": 7
  
  },
  {
    "id": 222,
    "nombre": "Betéitiva",
   
    "departamentoId": 7
  
  },
  {
    "id": 223,
    "nombre": "Boavita",
   
    "departamentoId": 7
  
  },
  {
    "id": 224,
    "nombre": "Boyacá",
   
    "departamentoId": 7
  
  },
  {
    "id": 225,
    "nombre": "Briceño",
   
    "departamentoId": 7
  
  },
  {
    "id": 226,
    "nombre": "Buena Vista",
   
    "departamentoId": 7
  
  },
  {
    "id": 227,
    "nombre": "Busbanzá",
   
    "departamentoId": 7
  
  },
  {
    "id": 228,
    "nombre": "Caldas",
   
    "departamentoId": 7
  
  },
  {
    "id": 229,
    "nombre": "Campohermoso",
   
    "departamentoId": 7
  
  },
  {
    "id": 230,
    "nombre": "Cerinza",
   
    "departamentoId": 7
  
  },
  {
    "id": 231,
    "nombre": "Chinavita",
   
    "departamentoId": 7
  
  },
  {
    "id": 232,
    "nombre": "Chiquinquirá",
   
    "departamentoId": 7
  
  },
  {
    "id": 233,
    "nombre": "Chiscas",
   
    "departamentoId": 7
  
  },
  {
    "id": 234,
    "nombre": "Chita",
   
    "departamentoId": 7
  
  },
  {
    "id": 235,
    "nombre": "Chitaraque",
   
    "departamentoId": 7
  
  },
  {
    "id": 236,
    "nombre": "Chivatá",
   
    "departamentoId": 7
  
  },
  {
    "id": 237,
    "nombre": "Cómbita",
   
    "departamentoId": 7
  
  },
  {
    "id": 238,
    "nombre": "Coper",
   
    "departamentoId": 7
  
  },
  {
    "id": 239,
    "nombre": "Corrales",
   
    "departamentoId": 7
  
  },
  {
    "id": 240,
    "nombre": "Covarachía",
   
    "departamentoId": 7
  
  },
  {
    "id": 241,
    "nombre": "Cubará",
   
    "departamentoId": 7
  
  },
  {
    "id": 242,
    "nombre": "Cucaita",
   
    "departamentoId": 7
  
  },
  {
    "id": 243,
    "nombre": "Cuítiva",
   
    "departamentoId": 7
  
  },
  {
    "id": 244,
    "nombre": "Chíquiza",
   
    "departamentoId": 7
  
  },
  {
    "id": 245,
    "nombre": "Chivor",
   
    "departamentoId": 7
  
  },
  {
    "id": 246,
    "nombre": "Duitama",
    "description": "Duitama es un municipio colombiano, ubicado en el departamento de Boyacá, en el centro-oriente de Colombia, en la región del Alto Chicamocha. Es la capital y centro urbano de mayor tamaño en la provincia del Tundama. Se le conoce como \"La Capital Cívica de Boyacá\" y \"La Perla de Boyacá\". Es el puerto transportador terrestre más importante del oriente colombiano",
    "surface": 266,
    "population": 126670,
    "postalCode": "150461",
    "departamentoId": 7
  
  },
  {
    "id": 247,
    "nombre": "El Cocuy",
   
    "departamentoId": 7
  
  },
  {
    "id": 248,
    "nombre": "El Espino",
   
    "departamentoId": 7
  
  },
  {
    "id": 249,
    "nombre": "Firavitoba",
   
    "departamentoId": 7
  
  },
  {
    "id": 250,
    "nombre": "Floresta",
   
    "departamentoId": 7
  
  },
  {
    "id": 251,
    "nombre": "Gachantivá",
   
    "departamentoId": 7
  
  },
  {
    "id": 252,
    "nombre": "Gameza",
   
    "departamentoId": 7
  
  },
  {
    "id": 253,
    "nombre": "Garagoa",
   
    "departamentoId": 7
  
  },
  {
    "id": 254,
    "nombre": "Guacamayas",
   
    "departamentoId": 7
  
  },
  {
    "id": 255,
    "nombre": "Guateque",
   
    "departamentoId": 7
  
  },
  {
    "id": 256,
    "nombre": "Guayatá",
   
    "departamentoId": 7
  
  },
  {
    "id": 257,
    "nombre": "Güicán",
   
    "departamentoId": 7
  
  },
  {
    "id": 258,
    "nombre": "Iza",
   
    "departamentoId": 7
  
  },
  {
    "id": 259,
    "nombre": "Jenesano",
   
    "departamentoId": 7
  
  },
  {
    "id": 260,
    "nombre": "Jericó",
   
    "departamentoId": 7
  
  },
  {
    "id": 261,
    "nombre": "Labranzagrande",
   
    "departamentoId": 7
  
  },
  {
    "id": 262,
    "nombre": "La Capilla",
   
    "departamentoId": 7
  
  },
  {
    "id": 263,
    "nombre": "La Victoria",
   
    "departamentoId": 7
  
  },
  {
    "id": 264,
    "nombre": "Macanal",
   
    "departamentoId": 7
  
  },
  {
    "id": 265,
    "nombre": "Maripí",
   
    "departamentoId": 7
  
  },
  {
    "id": 266,
    "nombre": "Miraflores",
   
    "departamentoId": 7
  
  },
  {
    "id": 267,
    "nombre": "Mongua",
   
    "departamentoId": 7
  
  },
  {
    "id": 268,
    "nombre": "Monguí",
   
    "departamentoId": 7
  
  },
  {
    "id": 269,
    "nombre": "Moniquirá",
   
    "departamentoId": 7
  
  },
  {
    "id": 270,
    "nombre": "Muzo",
   
    "departamentoId": 7
  
  },
  {
    "id": 271,
    "nombre": "Nobsa",
   
    "departamentoId": 7
  
  },
  {
    "id": 272,
    "nombre": "Nuevo Colón",
   
    "departamentoId": 7
  
  },
  {
    "id": 273,
    "nombre": "Oicatá",
   
    "departamentoId": 7
  
  },
  {
    "id": 274,
    "nombre": "Otanche",
   
    "departamentoId": 7
  
  },
  {
    "id": 275,
    "nombre": "Pachavita",
   
    "departamentoId": 7
  
  },
  {
    "id": 276,
    "nombre": "Páez",
   
    "departamentoId": 7
  
  },
  {
    "id": 277,
    "nombre": "Paipa",
   
    "departamentoId": 7
  
  },
  {
    "id": 278,
    "nombre": "Pajarito",
   
    "departamentoId": 7
  
  },
  {
    "id": 279,
    "nombre": "Panqueba",
   
    "departamentoId": 7
  
  },
  {
    "id": 280,
    "nombre": "Pauna",
   
    "departamentoId": 7
  
  },
  {
    "id": 281,
    "nombre": "Paya",
   
    "departamentoId": 7
  
  },
  {
    "id": 282,
    "nombre": "Pesca",
   
    "departamentoId": 7
  
  },
  {
    "id": 283,
    "nombre": "Pisba",
   
    "departamentoId": 7
  
  },
  {
    "id": 284,
    "nombre": "Puerto Boyacá",
   
    "departamentoId": 7
  
  },
  {
    "id": 285,
    "nombre": "Quípama",
   
    "departamentoId": 7
  
  },
  {
    "id": 286,
    "nombre": "Ramiriquí",
   
    "departamentoId": 7
  
  },
  {
    "id": 287,
    "nombre": "Ráquira",
   
    "departamentoId": 7
  
  },
  {
    "id": 288,
    "nombre": "Rondón",
   
    "departamentoId": 7
  
  },
  {
    "id": 289,
    "nombre": "Saboyá",
   
    "departamentoId": 7
  
  },
  {
    "id": 290,
    "nombre": "Sáchica",
   
    "departamentoId": 7
  
  },
  {
    "id": 291,
    "nombre": "Samacá",
   
    "departamentoId": 7
  
  },
  {
    "id": 292,
    "nombre": "San Eduardo",
   
    "departamentoId": 7
  
  },
  {
    "id": 293,
    "nombre": "San Mateo",
   
    "departamentoId": 7
  
  },
  {
    "id": 294,
    "nombre": "Santana",
   
    "departamentoId": 7
  
  },
  {
    "id": 295,
    "nombre": "Santa María",
   
    "departamentoId": 7
  
  },
  {
    "id": 296,
    "nombre": "Santa Sofía",
   
    "departamentoId": 7
  
  },
  {
    "id": 297,
    "nombre": "Sativanorte",
   
    "departamentoId": 7
  
  },
  {
    "id": 298,
    "nombre": "Sativasur",
   
    "departamentoId": 7
  
  },
  {
    "id": 299,
    "nombre": "Siachoque",
   
    "departamentoId": 7
  
  },
  {
    "id": 300,
    "nombre": "Soatá",
   
    "departamentoId": 7
  
  },
  {
    "id": 301,
    "nombre": "Socotá",
   
    "departamentoId": 7
  
  },
  {
    "id": 302,
    "nombre": "Socha",
   
    "departamentoId": 7
  
  },
  {
    "id": 303,
    "nombre": "Sogamoso",
    "description": "Sogamoso es un municipio colombiano situado en el centro-oriente del departamento de Boyacá en la región del Alto Chicamocha. Es la capital de la Provincia de Sugamuxi, se encuentra a 228,5 km al noreste de Bogotá, la capital del país, y a 75,8 km de Tunja, la capital del departamento. Posee una altitud de 2.569 m, tiene temperaturas promedio de 17 °C",
    "surface": 208,
    "population": 132059,
    "postalCode": "152210",
    "departamentoId": 7
  
  },
  {
    "id": 304,
    "nombre": "Somondoco",
   
    "departamentoId": 7
  
  },
  {
    "id": 305,
    "nombre": "Sora",
   
    "departamentoId": 7
  
  },
  {
    "id": 306,
    "nombre": "Sotaquirá",
   
    "departamentoId": 7
  
  },
  {
    "id": 307,
    "nombre": "Soracá",
   
    "departamentoId": 7
  
  },
  {
    "id": 308,
    "nombre": "Susacón",
   
    "departamentoId": 7
  
  },
  {
    "id": 309,
    "nombre": "Sutamarchán",
   
    "departamentoId": 7
  
  },
  {
    "id": 310,
    "nombre": "Sutatenza",
   
    "departamentoId": 7
  
  },
  {
    "id": 311,
    "nombre": "Tasco",
   
    "departamentoId": 7
  
  },
  {
    "id": 312,
    "nombre": "Tenza",
   
    "departamentoId": 7
  
  },
  {
    "id": 313,
    "nombre": "Tibaná",
   
    "departamentoId": 7
  
  },
  {
    "id": 314,
    "nombre": "Tinjacá",
   
    "departamentoId": 7
  
  },
  {
    "id": 315,
    "nombre": "Tipacoque",
   
    "departamentoId": 7
  
  },
  {
    "id": 316,
    "nombre": "Toca",
   
    "departamentoId": 7
  
  },
  {
    "id": 317,
    "nombre": "Tópaga",
   
    "departamentoId": 7
  
  },
  {
    "id": 318,
    "nombre": "Tota",
   
    "departamentoId": 7
  
  },
  {
    "id": 319,
    "nombre": "Turmequé",
   
    "departamentoId": 7
  
  },
  {
    "id": 320,
    "nombre": "Tutazá",
   
    "departamentoId": 7
  
  },
  {
    "id": 321,
    "nombre": "Umbita",
   
    "departamentoId": 7
  
  },
  {
    "id": 322,
    "nombre": "Ventaquemada",
   
    "departamentoId": 7
  
  },
  {
    "id": 323,
    "nombre": "Viracachá",
   
    "departamentoId": 7
  
  },
  {
    "id": 324,
    "nombre": "Zetaquira",
   
    "departamentoId": 7
  
  },
  {
    "id": 325,
    "nombre": "Togüí",
   
    "departamentoId": 7
  
  },
  {
    "id": 326,
    "nombre": "Villa de Leyva",
   
    "departamentoId": 7
  
  },
  {
    "id": 327,
    "nombre": "Paz de Río",
   
    "departamentoId": 7
  
  },
  {
    "id": 328,
    "nombre": "Santa Rosa de Viterbo",
   
    "departamentoId": 7
  
  },
  {
    "id": 329,
    "nombre": "San Pablo de Borbur",
   
    "departamentoId": 7
  
  },
  {
    "id": 330,
    "nombre": "San Luis de Gaceno",
   
    "departamentoId": 7
  
  },
  {
    "id": 331,
    "nombre": "San José de Pare",
   
    "departamentoId": 7
  
  },
  {
    "id": 332,
    "nombre": "San Miguel de Sema",
   
    "departamentoId": 7
  
  },
  {
    "id": 333,
    "nombre": "Tuta",
   
    "departamentoId": 7
  
  },
  {
    "id": 334,
    "nombre": "Tibasosa",
   
    "departamentoId": 7
  
  },
  {
    "id": 335,
    "nombre": "La Uvita",
   
    "departamentoId": 7
  
  },
  {
    "id": 336,
    "nombre": "Belén",
   
    "departamentoId": 7
  
  },
  {
    "id": 337,
    "nombre": "Manizales",
    "description": "Manizales es un municipio colombiano, capital del departamento de Caldas. Está ubicado en el centro occidente de Colombia en la región paisa, así como en el eje cafetero, sobre la Cordillera Central de los Andes, cerca del Nevado del Ruiz. Tiene una población de 454,077 habitantes (2022). Es la región más poblada y competitiva del departamento con un aporte del 68% de su PIB total.",
    "surface": 571,
    "population": 454077,
    "postalCode": "170001",
    "departamentoId": 8
  
  },
  {
    "id": 338,
    "nombre": "Aguadas",
   
    "departamentoId": 8
  
  },
  {
    "id": 339,
    "nombre": "Anserma",
   
    "departamentoId": 8
  
  },
  {
    "id": 340,
    "nombre": "Aranzazu",
   
    "departamentoId": 8
  
  },
  {
    "id": 341,
    "nombre": "Belalcázar",
   
    "departamentoId": 8
  
  },
  {
    "id": 342,
    "nombre": "Chinchiná",
   
    "departamentoId": 8
  
  },
  {
    "id": 343,
    "nombre": "Filadelfia",
   
    "departamentoId": 8
  
  },
  {
    "id": 344,
    "nombre": "La Dorada",
   
    "departamentoId": 8
  
  },
  {
    "id": 345,
    "nombre": "La Merced",
   
    "departamentoId": 8
  
  },
  {
    "id": 346,
    "nombre": "Manzanares",
   
    "departamentoId": 8
  
  },
  {
    "id": 347,
    "nombre": "Marmato",
   
    "departamentoId": 8
  
  },
  {
    "id": 348,
    "nombre": "Marulanda",
   
    "departamentoId": 8
  
  },
  {
    "id": 349,
    "nombre": "Neira",
   
    "departamentoId": 8
  
  },
  {
    "id": 350,
    "nombre": "Norcasia",
   
    "departamentoId": 8
  
  },
  {
    "id": 351,
    "nombre": "Pácora",
   
    "departamentoId": 8
  
  },
  {
    "id": 352,
    "nombre": "Palestina",
   
    "departamentoId": 8
  
  },
  {
    "id": 353,
    "nombre": "Pensilvania",
   
    "departamentoId": 8
  
  },
  {
    "id": 354,
    "nombre": "Riosucio",
   
    "departamentoId": 8
  
  },
  {
    "id": 355,
    "nombre": "Risaralda",
   
    "departamentoId": 8
  
  },
  {
    "id": 356,
    "nombre": "Salamina",
   
    "departamentoId": 8
  
  },
  {
    "id": 357,
    "nombre": "Samaná",
   
    "departamentoId": 8
  
  },
  {
    "id": 358,
    "nombre": "San José",
   
    "departamentoId": 8
  
  },
  {
    "id": 359,
    "nombre": "Supía",
   
    "departamentoId": 8
  
  },
  {
    "id": 360,
    "nombre": "Victoria",
   
    "departamentoId": 8
  
  },
  {
    "id": 361,
    "nombre": "Villamaría",
   
    "departamentoId": 8
  
  },
  {
    "id": 362,
    "nombre": "Viterbo",
   
    "departamentoId": 8
  
  },
  {
    "id": 363,
    "nombre": "Marquetalia",
   
    "departamentoId": 8
  
  },
  {
    "id": 364,
    "nombre": "Florencia",
    "description": "Florencia es un municipio colombiano, capital del departamento de Caquetá. Es el municipio más poblado de la región amazónica por su número de habitantes.5​ Es conocido como «La Puerta de Oro de la Amazonía Colombiana»",
    "surface": 2292,
    "population": 173011,
    "postalCode": "180001",
    "departamentoId": 9
  
  },
  {
    "id": 365,
    "nombre": "Albania",
   
    "departamentoId": 9
  
  },
  {
    "id": 366,
    "nombre": "Curillo",
   
    "departamentoId": 9
  
  },
  {
    "id": 367,
    "nombre": "El Doncello",
   
    "departamentoId": 9
  
  },
  {
    "id": 368,
    "nombre": "El Paujil",
   
    "departamentoId": 9
  
  },
  {
    "id": 369,
    "nombre": "Morelia",
   
    "departamentoId": 9
  
  },
  {
    "id": 370,
    "nombre": "Puerto Rico",
   
    "departamentoId": 9
  
  },
  {
    "id": 371,
    "nombre": "Solano",
   
    "departamentoId": 9
  
  },
  {
    "id": 372,
    "nombre": "Solita",
   
    "departamentoId": 9
  
  },
  {
    "id": 373,
    "nombre": "Valparaíso",
   
    "departamentoId": 9
  
  },
  {
    "id": 374,
    "nombre": "San José del Fragua",
   
    "departamentoId": 9
  
  },
  {
    "id": 375,
    "nombre": "Belén de Los Andaquies",
   
    "departamentoId": 9
  
  },
  {
    "id": 376,
    "nombre": "Cartagena del Chairá",
   
    "departamentoId": 9
  
  },
  {
    "id": 377,
    "nombre": "Milán",
   
    "departamentoId": 9
  
  },
  {
    "id": 378,
    "nombre": "La Montañita",
   
    "departamentoId": 9
  
  },
  {
    "id": 379,
    "nombre": "San Vicente del Caguán",
   
    "departamentoId": 9
  
  },
  {
    "id": 380,
    "nombre": "Yopal",
    "description": "Yopal es un municipio colombiano, capital del departamento de Casanare. Su extensión territorial es de 2595 kilómetros cuadrados,4​ y se sitúa a 317 kilómetros del distrito capital de Bogotá. Fundada por colonos boyacenses en 1915, es una de las capitales departamentales más jóvenes de Colombia y una de las ciudades que registra más rápido crecimiento poblacional a nivel nacional, en especial después de la separación de Casanare del departamento de Boyacá",
    "surface": 2771,
    "population": 179355,
    "postalCode": "850001",
    "departamentoId": 10
  
  },
  {
    "id": 381,
    "nombre": "Aguazul",
   
    "departamentoId": 10
  
  },
  {
    "id": 382,
    "nombre": "Chámeza",
   
    "departamentoId": 10
  
  },
  {
    "id": 383,
    "nombre": "Hato Corozal",
   
    "departamentoId": 10
  
  },
  {
    "id": 384,
    "nombre": "La Salina",
   
    "departamentoId": 10
  
  },
  {
    "id": 385,
    "nombre": "Monterrey",
   
    "departamentoId": 10
  
  },
  {
    "id": 386,
    "nombre": "Pore",
   
    "departamentoId": 10
  
  },
  {
    "id": 387,
    "nombre": "Recetor",
   
    "departamentoId": 10
  
  },
  {
    "id": 388,
    "nombre": "Sabanalarga",
   
    "departamentoId": 10
  
  },
  {
    "id": 389,
    "nombre": "Sácama",
   
    "departamentoId": 10
  
  },
  {
    "id": 390,
    "nombre": "Tauramena",
   
    "departamentoId": 10
  
  },
  {
    "id": 391,
    "nombre": "Trinidad",
   
    "departamentoId": 10
  
  },
  {
    "id": 392,
    "nombre": "Villanueva",
   
    "departamentoId": 10
  
  },
  {
    "id": 393,
    "nombre": "San Luis de Gaceno",
   
    "departamentoId": 10
  
  },
  {
    "id": 394,
    "nombre": "Paz de Ariporo",
   
    "departamentoId": 10
  
  },
  {
    "id": 395,
    "nombre": "Nunchía",
   
    "departamentoId": 10
  
  },
  {
    "id": 396,
    "nombre": "Maní",
   
    "departamentoId": 10
  
  },
  {
    "id": 397,
    "nombre": "Támara",
   
    "departamentoId": 10
  
  },
  {
    "id": 398,
    "nombre": "Orocué",
   
    "departamentoId": 10
  
  },
  {
    "id": 399,
    "nombre": "Popayán",
    "description": "Popayán, oficialmente Asunción de Popayán es un municipio colombiano, capital del departamento del Cauca. Se encuentra localizado en el Valle de Pubenza, entre la Cordillera Occidental y Central al suroccidente del país. Su extensión territorial es de 512 km², su altitud media es de 1760 m sobre el nivel del mar, su precipitación media anual de 1941 mm, su temperatura promedio de 14/19 °C y distancia aproximada de 600 km a Bogotá, capital de Colombia.",
    "surface": 512,
    "population": 318059,
    "postalCode": "190001",
    "departamentoId": 11
  
  },
  {
    "id": 400,
    "nombre": "Almaguer",
   
    "departamentoId": 11
  
  },
  {
    "id": 401,
    "nombre": "Argelia",
   
    "departamentoId": 11
  
  },
  {
    "id": 402,
    "nombre": "Balboa",
   
    "departamentoId": 11
  
  },
  {
    "id": 403,
    "nombre": "Bolívar",
   
    "departamentoId": 11
  
  },
  {
    "id": 404,
    "nombre": "Buenos Aires",
   
    "departamentoId": 11
  
  },
  {
    "id": 405,
    "nombre": "Cajibío",
   
    "departamentoId": 11
  
  },
  {
    "id": 406,
    "nombre": "Caldono",
   
    "departamentoId": 11
  
  },
  {
    "id": 407,
    "nombre": "Caloto",
   
    "departamentoId": 11
  
  },
  {
    "id": 408,
    "nombre": "Corinto",
   
    "departamentoId": 11
  
  },
  {
    "id": 409,
    "nombre": "El Tambo",
   
    "departamentoId": 11
  
  },
  {
    "id": 410,
    "nombre": "Florencia",
   
    "departamentoId": 11
  
  },
  {
    "id": 411,
    "nombre": "Guachené",
   
    "departamentoId": 11
  
  },
  {
    "id": 412,
    "nombre": "Guapi",
   
    "departamentoId": 11
  
  },
  {
    "id": 413,
    "nombre": "Inzá",
   
    "departamentoId": 11
  
  },
  {
    "id": 414,
    "nombre": "Jambaló",
   
    "departamentoId": 11
  
  },
  {
    "id": 415,
    "nombre": "La Sierra",
   
    "departamentoId": 11
  
  },
  {
    "id": 416,
    "nombre": "La Vega",
   
    "departamentoId": 11
  
  },
  {
    "id": 417,
    "nombre": "López",
   
    "departamentoId": 11
  
  },
  {
    "id": 418,
    "nombre": "Mercaderes",
   
    "departamentoId": 11
  
  },
  {
    "id": 419,
    "nombre": "Miranda",
   
    "departamentoId": 11
  
  },
  {
    "id": 420,
    "nombre": "Morales",
   
    "departamentoId": 11
  
  },
  {
    "id": 421,
    "nombre": "Padilla",
   
    "departamentoId": 11
  
  },
  {
    "id": 422,
    "nombre": "Patía",
   
    "departamentoId": 11
  
  },
  {
    "id": 423,
    "nombre": "Piamonte",
   
    "departamentoId": 11
  
  },
  {
    "id": 424,
    "nombre": "Piendamó",
   
    "departamentoId": 11
  
  },
  {
    "id": 425,
    "nombre": "Puerto Tejada",
   
    "departamentoId": 11
  
  },
  {
    "id": 426,
    "nombre": "Puracé",
   
    "departamentoId": 11
  
  },
  {
    "id": 427,
    "nombre": "Rosas",
   
    "departamentoId": 11
  
  },
  {
    "id": 428,
    "nombre": "Santa Rosa",
   
    "departamentoId": 11
  
  },
  {
    "id": 429,
    "nombre": "Silvia",
   
    "departamentoId": 11
  
  },
  {
    "id": 430,
    "nombre": "Sotara",
   
    "departamentoId": 11
  
  },
  {
    "id": 431,
    "nombre": "Suárez",
   
    "departamentoId": 11
  
  },
  {
    "id": 432,
    "nombre": "Sucre",
   
    "departamentoId": 11
  
  },
  {
    "id": 433,
    "nombre": "Timbío",
   
    "departamentoId": 11
  
  },
  {
    "id": 434,
    "nombre": "Timbiquí",
   
    "departamentoId": 11
  
  },
  {
    "id": 435,
    "nombre": "Toribio",
   
    "departamentoId": 11
  
  },
  {
    "id": 436,
    "nombre": "Totoró",
   
    "departamentoId": 11
  
  },
  {
    "id": 437,
    "nombre": "Villa Rica",
   
    "departamentoId": 11
  
  },
  {
    "id": 756,
    "nombre": "Puerto López",
   
    "departamentoId": 21
  
  },
  {
    "id": 757,
    "nombre": "Puerto Lleras",
   
    "departamentoId": 21
  
  },
  {
    "id": 758,
    "nombre": "Puerto Rico",
   
    "departamentoId": 21
  
  },
  {
    "id": 438,
    "nombre": "Santander de Quilichao",
    "description": "Santander de Quilichao es un municipio colombiano ubicado en el sector norte del departamento del Cauca, a 97 km al norte de Popayán y a 45 km al sur de Cali. Límites: al norte con los Municipios de Villa Rica y Jamundí, al Occidente con el municipio de Buenos Aires, al oriente con los municipios de Caloto y Jambaló y al sur con el Municipio de Caldono",
    "surface": 518,
    "population": 95041,
    "postalCode": "191030",
    "departamentoId": 11
  
  },
  {
    "id": 439,
    "nombre": "San Sebastián",
   
    "departamentoId": 11
  
  },
  {
    "id": 440,
    "nombre": "Páez",
   
    "departamentoId": 11
  
  },
  {
    "id": 441,
    "nombre": "Valledupar",
    "description": "Valledupar, también llamada Ciudad de los Santos Reyes del Valle de Upar, es un municipio colombiano, capital del departamento del Cesar. Es la cabecera del municipio homónimo, el cual tiene una extensión de 149 km², 559.462 habitantes y junto a su área metropolitana reúne 691.266 habitantes;1​ está conformado por 25 corregimientos y 102 veredas.",
    "surface": 30000,
    "population": 559462,
    "postalCode": "200001",
    "departamentoId": 12
  
  },
  {
    "id": 442,
    "nombre": "Aguachica",
    "description": "Aguachica es un municipio del departamento de Cesar, Colombia, ubicado entre el valle interandino del Magdalena Medio y la Serranía de los Motilones. Es el segundo municipio más poblado del departamento e importante centro ganadero y comercial de la zona sur del caribe colombiano.",
    "surface": 5324,
    "population": 120000,
    "postalCode": "205010",
    "departamentoId": 12
  
  },
  {
    "id": 443,
    "nombre": "Agustín Codazzi",
   
    "departamentoId": 12
  
  },
  {
    "id": 444,
    "nombre": "Astrea",
   
    "departamentoId": 12
  
  },
  {
    "id": 445,
    "nombre": "Becerril",
   
    "departamentoId": 12
  
  },
  {
    "id": 446,
    "nombre": "Bosconia",
   
    "departamentoId": 12
  
  },
  {
    "id": 447,
    "nombre": "Chimichagua",
   
    "departamentoId": 12
  
  },
  {
    "id": 448,
    "nombre": "Chiriguaná",
   
    "departamentoId": 12
  
  },
  {
    "id": 449,
    "nombre": "Curumaní",
   
    "departamentoId": 12
  
  },
  {
    "id": 450,
    "nombre": "El Copey",
   
    "departamentoId": 12
  
  },
  {
    "id": 451,
    "nombre": "El Paso",
   
    "departamentoId": 12
  
  },
  {
    "id": 452,
    "nombre": "Gamarra",
   
    "departamentoId": 12
  
  },
  {
    "id": 453,
    "nombre": "González",
   
    "departamentoId": 12
  
  },
  {
    "id": 454,
    "nombre": "La Gloria",
   
    "departamentoId": 12
  
  },
  {
    "id": 455,
    "nombre": "Manaure",
   
    "departamentoId": 12
  
  },
  {
    "id": 456,
    "nombre": "Pailitas",
   
    "departamentoId": 12
  
  },
  {
    "id": 457,
    "nombre": "Pelaya",
   
    "departamentoId": 12
  
  },
  {
    "id": 458,
    "nombre": "Pueblo Bello",
   
    "departamentoId": 12
  
  },
  {
    "id": 459,
    "nombre": "La Paz",
   
    "departamentoId": 12
  
  },
  {
    "id": 460,
    "nombre": "San Alberto",
   
    "departamentoId": 12
  
  },
  {
    "id": 461,
    "nombre": "San Diego",
   
    "departamentoId": 12
  
  },
  {
    "id": 462,
    "nombre": "San Martín",
   
    "departamentoId": 12
  
  },
  {
    "id": 463,
    "nombre": "Tamalameque",
   
    "departamentoId": 12
  
  },
  {
    "id": 464,
    "nombre": "Río de Oro",
   
    "departamentoId": 12
  
  },
  {
    "id": 465,
    "nombre": "La Jagua de Ibirico",
   
    "departamentoId": 12
  
  },
  {
    "id": 466,
    "nombre": "Istmina",
   
    "departamentoId": 13
  
  },
  {
    "id": 467,
    "nombre": "Quibdó",
    "description": "Quibdó es un municipio colombiano, capital del departamento del Chocó y una de las poblaciones más importantes en la Región del Pacífico Colombiano. La ciudad está ubicada en una de las regiones más biodiversas de Colombia, cerca de grandes reservas ecológicas como el parque nacional natural Emberá. También es una de las regiones con mayor número de reservas indígenas. ",
    "surface": 3337,
    "population": 116087,
    "postalCode": "270001",
    "departamentoId": 13
  
  },
  {
    "id": 468,
    "nombre": "Acandí",
   
    "departamentoId": 13
  
  },
  {
    "id": 469,
    "nombre": "Alto Baudo",
   
    "departamentoId": 13
  
  },
  {
    "id": 470,
    "nombre": "Atrato",
   
    "departamentoId": 13
  
  },
  {
    "id": 471,
    "nombre": "Bagadó",
   
    "departamentoId": 13
  
  },
  {
    "id": 472,
    "nombre": "Bahía Solano",
   
    "departamentoId": 13
  
  },
  {
    "id": 473,
    "nombre": "Bajo Baudó",
   
    "departamentoId": 13
  
  },
  {
    "id": 474,
    "nombre": "Bojaya",
   
    "departamentoId": 13
  
  },
  {
    "id": 475,
    "nombre": "Cértegui",
   
    "departamentoId": 13
  
  },
  {
    "id": 476,
    "nombre": "Condoto",
   
    "departamentoId": 13
  
  },
  {
    "id": 477,
    "nombre": "Juradó",
   
    "departamentoId": 13
  
  },
  {
    "id": 478,
    "nombre": "Lloró",
   
    "departamentoId": 13
  
  },
  {
    "id": 479,
    "nombre": "Medio Atrato",
   
    "departamentoId": 13
  
  },
  {
    "id": 480,
    "nombre": "Medio Baudó",
   
    "departamentoId": 13
  
  },
  {
    "id": 481,
    "nombre": "Medio San Juan",
   
    "departamentoId": 13
  
  },
  {
    "id": 482,
    "nombre": "Nóvita",
   
    "departamentoId": 13
  
  },
  {
    "id": 483,
    "nombre": "Nuquí",
   
    "departamentoId": 13
  
  },
  {
    "id": 484,
    "nombre": "Río Iro",
   
    "departamentoId": 13
  
  },
  {
    "id": 485,
    "nombre": "Río Quito",
   
    "departamentoId": 13
  
  },
  {
    "id": 486,
    "nombre": "Riosucio",
   
    "departamentoId": 13
  
  },
  {
    "id": 487,
    "nombre": "Sipí",
   
    "departamentoId": 13
  
  },
  {
    "id": 488,
    "nombre": "Unguía",
   
    "departamentoId": 13
  
  },
  {
    "id": 489,
    "nombre": "El Litoral del San Juan",
   
    "departamentoId": 13
  
  },
  {
    "id": 490,
    "nombre": "El Cantón del San Pablo",
   
    "departamentoId": 13
  
  },
  {
    "id": 491,
    "nombre": "El Carmen de Atrato",
   
    "departamentoId": 13
  
  },
  {
    "id": 492,
    "nombre": "San José del Palmar",
   
    "departamentoId": 13
  
  },
  {
    "id": 493,
    "nombre": "Belén de Bajira",
   
    "departamentoId": 13
  
  },
  {
    "id": 494,
    "nombre": "Carmen del Darien",
   
    "departamentoId": 13
  
  },
  {
    "id": 495,
    "nombre": "Tadó",
   
    "departamentoId": 13
  
  },
  {
    "id": 496,
    "nombre": "Unión Panombrericana",
   
    "departamentoId": 13
  
  },
  {
    "id": 497,
    "nombre": "San Bernardo del Viento",
   
    "departamentoId": 14
  
  },
  {
    "id": 498,
    "nombre": "Montería",
    "description": "Montería es un municipio colombiano, capital del departamento de Córdoba. Está ubicado al noroccidente del país en la región Caribe Colombiana, se encuentra a orillas del río Sinú, por lo que es conocida como la \"Perla del Sinú\". Es considerada la capital ganadera de Colombia;5​ anualmente celebra la feria de la Ganadería durante el mes de junio. Es además, un importante centro comercial y universitario, reconocida como una de las ciudades colombianas con mayor crecimiento y desarrollo en los últimos años y por impulsar el desarrollo sostenible",
    "surface": 3141,
    "population": 512994,
    "postalCode": "230001",
    "departamentoId": 14
  
  },
  {
    "id": 499,
    "nombre": "Ayapel",
   
    "departamentoId": 14
  
  },
  {
    "id": 500,
    "nombre": "Buenavista",
   
    "departamentoId": 14
  
  },
  {
    "id": 501,
    "nombre": "Canalete",
   
    "departamentoId": 14
  
  },
  {
    "id": 502,
    "nombre": "Cereté",
   
    "departamentoId": 14
  
  },
  {
    "id": 503,
    "nombre": "Chimá",
   
    "departamentoId": 14
  
  },
  {
    "id": 504,
    "nombre": "Chinú",
   
    "departamentoId": 14
  
  },
  {
    "id": 505,
    "nombre": "Cotorra",
   
    "departamentoId": 14
  
  },
  {
    "id": 506,
    "nombre": "Lorica",
    "description": "Santa Cruz de Lorica o simplemente Lorica, es un municipio del departamento de Córdoba, Colombia. Es conocida como Ciudad Antigua y Señorial, La capital del Bajo Sinú y La capital de Bocachico. Está ubicada en la porción septentrional del departamento de Córdoba y en la zona más baja del río Sinú, muy próxima al mar Caribe.",
    "surface": 1033,
    "population": 115461,
    "postalCode": "231020",
    "departamentoId": 14
  
  },
  {
    "id": 507,
    "nombre": "Los Córdobas",
   
    "departamentoId": 14
  
  },
  {
    "id": 508,
    "nombre": "Momil",
   
    "departamentoId": 14
  
  },
  {
    "id": 509,
    "nombre": "Moñitos",
   
    "departamentoId": 14
  
  },
  {
    "id": 510,
    "nombre": "Planeta Rica",
   
    "departamentoId": 14
  
  },
  {
    "id": 511,
    "nombre": "Pueblo Nuevo",
   
    "departamentoId": 14
  
  },
  {
    "id": 512,
    "nombre": "Puerto Escondido",
   
    "departamentoId": 14
  
  },
  {
    "id": 513,
    "nombre": "Purísima",
   
    "departamentoId": 14
  
  },
  {
    "id": 514,
    "nombre": "Sahagún",
   
    "departamentoId": 14
  
  },
  {
    "id": 515,
    "nombre": "San Andrés Sotavento",
   
    "departamentoId": 14
  
  },
  {
    "id": 516,
    "nombre": "San Antero",
   
    "departamentoId": 14
  
  },
  {
    "id": 517,
    "nombre": "San Pelayo",
   
    "departamentoId": 14
  
  },
  {
    "id": 518,
    "nombre": "Tierralta",
   
    "departamentoId": 14
  
  },
  {
    "id": 519,
    "nombre": "Tuchín",
   
    "departamentoId": 14
  
  },
  {
    "id": 520,
    "nombre": "Valencia",
   
    "departamentoId": 14
  
  },
  {
    "id": 521,
    "nombre": "San José de Uré",
   
    "departamentoId": 14
  
  },
  {
    "id": 522,
    "nombre": "Ciénaga de Oro",
   
    "departamentoId": 14
  
  },
  {
    "id": 523,
    "nombre": "San Carlos",
   
    "departamentoId": 14
  
  },
  {
    "id": 524,
    "nombre": "Montelíbano",
    "description": "Montelíbano es un municipio del sur del departamento de Córdoba, Colombia. Situado sobre la margen derecha del río San Jorge y con una población de 90.4504​ habitantes aproximadamente, es en la actualidad uno de los centros de desarrollo económico, comercial y cultural más importantes de la región.",
    "surface": 1890,
    "population": 90450,
    "postalCode": "234001",
    "departamentoId": 14
  
  },
  {
    "id": 525,
    "nombre": "La Apartada",
   
    "departamentoId": 14
  
  },
  {
    "id": 526,
    "nombre": "Puerto Libertador",
   
    "departamentoId": 14
  
  },
  {
    "id": 527,
    "nombre": "Anapoima",
   
    "departamentoId": 15
  
  },
  {
    "id": 528,
    "nombre": "Arbeláez",
   
    "departamentoId": 15
  
  },
  {
    "id": 529,
    "nombre": "Beltrán",
   
    "departamentoId": 15
  
  },
  {
    "id": 530,
    "nombre": "Bituima",
   
    "departamentoId": 15
  
  },
  {
    "id": 531,
    "nombre": "Bojacá",
   
    "departamentoId": 15
  
  },
  {
    "id": 532,
    "nombre": "Cabrera",
   
    "departamentoId": 15
  
  },
  {
    "id": 533,
    "nombre": "Cachipay",
   
    "departamentoId": 15
  
  },
  {
    "id": 534,
    "nombre": "Cajicá",
   
    "departamentoId": 15
  
  },
  {
    "id": 535,
    "nombre": "Caparrapí",
   
    "departamentoId": 15
  
  },
  {
    "id": 536,
    "nombre": "Caqueza",
   
    "departamentoId": 15
  
  },
  {
    "id": 537,
    "nombre": "Chaguaní",
   
    "departamentoId": 15
  
  },
  {
    "id": 538,
    "nombre": "Chipaque",
   
    "departamentoId": 15
  
  },
  {
    "id": 539,
    "nombre": "Choachí",
   
    "departamentoId": 15
  
  },
  {
    "id": 540,
    "nombre": "Chocontá",
   
    "departamentoId": 15
  
  },
  {
    "id": 541,
    "nombre": "Cogua",
   
    "departamentoId": 15
  
  },
  {
    "id": 542,
    "nombre": "Cota",
   
    "departamentoId": 15
  
  },
  {
    "id": 543,
    "nombre": "Cucunubá",
   
    "departamentoId": 15
  
  },
  {
    "id": 544,
    "nombre": "El Colegio",
   
    "departamentoId": 15
  
  },
  {
    "id": 545,
    "nombre": "El Rosal",
   
    "departamentoId": 15
  
  },
  {
    "id": 546,
    "nombre": "Fomeque",
   
    "departamentoId": 15
  
  },
  {
    "id": 547,
    "nombre": "Fosca",
   
    "departamentoId": 15
  
  },
  {
    "id": 548,
    "nombre": "Funza",
   
    "departamentoId": 15
  
  },
  {
    "id": 549,
    "nombre": "Fúquene",
   
    "departamentoId": 15
  
  },
  {
    "id": 550,
    "nombre": "Gachala",
   
    "departamentoId": 15
  
  },
  {
    "id": 551,
    "nombre": "Gachancipá",
   
    "departamentoId": 15
  
  },
  {
    "id": 552,
    "nombre": "Gachetá",
   
    "departamentoId": 15
  
  },
  {
    "id": 553,
    "nombre": "Girardot",
    "description": "Girardot es un municipio colombiano del departamento de Cundinamarca ubicado en la Provincia del Alto Magdalena, de la cual es capital. Limita al norte con los municipios de Nariño y Tocaima, al sur con el municipio de Flandes y el río Magdalena, al oeste con el municipio de Nariño, el río Magdalena y el municipio de Coello y al este con el municipio de Ricaurte y el río Bogotá",
    "surface": 129,
    "population": 101108,
    "postalCode": "252430",
    "departamentoId": 15
  
  },
  {
    "id": 554,
    "nombre": "Granada",
   
    "departamentoId": 15
  
  },
  {
    "id": 555,
    "nombre": "Guachetá",
   
    "departamentoId": 15
  
  },
  {
    "id": 556,
    "nombre": "Guaduas",
   
    "departamentoId": 15
  
  },
  {
    "id": 557,
    "nombre": "Guasca",
   
    "departamentoId": 15
  
  },
  {
    "id": 558,
    "nombre": "Guataquí",
   
    "departamentoId": 15
  
  },
  {
    "id": 559,
    "nombre": "Guatavita",
   
    "departamentoId": 15
  
  },
  {
    "id": 560,
    "nombre": "Guayabetal",
   
    "departamentoId": 15
  
  },
  {
    "id": 561,
    "nombre": "Gutiérrez",
   
    "departamentoId": 15
  
  },
  {
    "id": 562,
    "nombre": "Jerusalén",
   
    "departamentoId": 15
  
  },
  {
    "id": 563,
    "nombre": "Junín",
   
    "departamentoId": 15
  
  },
  {
    "id": 564,
    "nombre": "La Calera",
   
    "departamentoId": 15
  
  },
  {
    "id": 565,
    "nombre": "La Mesa",
   
    "departamentoId": 15
  
  },
  {
    "id": 566,
    "nombre": "La Palma",
   
    "departamentoId": 15
  
  },
  {
    "id": 567,
    "nombre": "La Peña",
   
    "departamentoId": 15
  
  },
  {
    "id": 568,
    "nombre": "La Vega",
   
    "departamentoId": 15
  
  },
  {
    "id": 569,
    "nombre": "Lenguazaque",
   
    "departamentoId": 15
  
  },
  {
    "id": 570,
    "nombre": "Macheta",
   
    "departamentoId": 15
  
  },
  {
    "id": 571,
    "nombre": "Madrid",
   
    "departamentoId": 15
  
  },
  {
    "id": 572,
    "nombre": "Manta",
   
    "departamentoId": 15
  
  },
  {
    "id": 573,
    "nombre": "Medina",
   
    "departamentoId": 15
  
  },
  {
    "id": 574,
    "nombre": "Mosquera",
   
    "departamentoId": 15
  
  },
  {
    "id": 575,
    "nombre": "Nariño",
   
    "departamentoId": 15
  
  },
  {
    "id": 576,
    "nombre": "Nemocón",
   
    "departamentoId": 15
  
  },
  {
    "id": 577,
    "nombre": "Nilo",
   
    "departamentoId": 15
  
  },
  {
    "id": 578,
    "nombre": "Nimaima",
   
    "departamentoId": 15
  
  },
  {
    "id": 579,
    "nombre": "Nocaima",
   
    "departamentoId": 15
  
  },
  {
    "id": 580,
    "nombre": "Venecia",
   
    "departamentoId": 15
  
  },
  {
    "id": 581,
    "nombre": "Pacho",
   
    "departamentoId": 15
  
  },
  {
    "id": 582,
    "nombre": "Paime",
   
    "departamentoId": 15
  
  },
  {
    "id": 583,
    "nombre": "Pandi",
   
    "departamentoId": 15
  
  },
  {
    "id": 584,
    "nombre": "Paratebueno",
   
    "departamentoId": 15
  
  },
  {
    "id": 585,
    "nombre": "Pasca",
   
    "departamentoId": 15
  
  },
  {
    "id": 586,
    "nombre": "Puerto Salgar",
   
    "departamentoId": 15
  
  },
  {
    "id": 587,
    "nombre": "Pulí",
   
    "departamentoId": 15
  
  },
  {
    "id": 588,
    "nombre": "Quebradanegra",
   
    "departamentoId": 15
  
  },
  {
    "id": 589,
    "nombre": "Quetame",
   
    "departamentoId": 15
  
  },
  {
    "id": 590,
    "nombre": "Quipile",
   
    "departamentoId": 15
  
  },
  {
    "id": 591,
    "nombre": "Apulo",
   
    "departamentoId": 15
  
  },
  {
    "id": 592,
    "nombre": "Ricaurte",
   
    "departamentoId": 15
  
  },
  {
    "id": 593,
    "nombre": "San Bernardo",
   
    "departamentoId": 15
  
  },
  {
    "id": 594,
    "nombre": "San Cayetano",
   
    "departamentoId": 15
  
  },
  {
    "id": 595,
    "nombre": "San Francisco",
   
    "departamentoId": 15
  
  },
  {
    "id": 596,
    "nombre": "Sesquilé",
   
    "departamentoId": 15
  
  },
  {
    "id": 597,
    "nombre": "Sibaté",
   
    "departamentoId": 15
  
  },
  {
    "id": 598,
    "nombre": "Silvania",
   
    "departamentoId": 15
  
  },
  {
    "id": 599,
    "nombre": "Simijaca",
   
    "departamentoId": 15
  
  },
  {
    "id": 600,
    "nombre": "Soacha",
   
    "departamentoId": 15
  
  },
  {
    "id": 601,
    "nombre": "Subachoque",
   
    "departamentoId": 15
  
  },
  {
    "id": 602,
    "nombre": "Suesca",
   
    "departamentoId": 15
  
  },
  {
    "id": 603,
    "nombre": "Supatá",
   
    "departamentoId": 15
  
  },
  {
    "id": 604,
    "nombre": "Susa",
   
    "departamentoId": 15
  
  },
  {
    "id": 605,
    "nombre": "Sutatausa",
   
    "departamentoId": 15
  
  },
  {
    "id": 606,
    "nombre": "Tabio",
   
    "departamentoId": 15
  
  },
  {
    "id": 607,
    "nombre": "Tausa",
   
    "departamentoId": 15
  
  },
  {
    "id": 608,
    "nombre": "Tena",
   
    "departamentoId": 15
  
  },
  {
    "id": 609,
    "nombre": "Tenjo",
   
    "departamentoId": 15
  
  },
  {
    "id": 610,
    "nombre": "Tibacuy",
   
    "departamentoId": 15
  
  },
  {
    "id": 611,
    "nombre": "Tibirita",
   
    "departamentoId": 15
  
  },
  {
    "id": 612,
    "nombre": "Tocaima",
   
    "departamentoId": 15
  
  },
  {
    "id": 613,
    "nombre": "Tocancipá",
   
    "departamentoId": 15
  
  },
  {
    "id": 614,
    "nombre": "Topaipí",
   
    "departamentoId": 15
  
  },
  {
    "id": 615,
    "nombre": "Ubalá",
   
    "departamentoId": 15
  
  },
  {
    "id": 616,
    "nombre": "Ubaque",
   
    "departamentoId": 15
  
  },
  {
    "id": 617,
    "nombre": "Une",
   
    "departamentoId": 15
  
  },
  {
    "id": 618,
    "nombre": "Útica",
   
    "departamentoId": 15
  
  },
  {
    "id": 619,
    "nombre": "Vianí",
   
    "departamentoId": 15
  
  },
  {
    "id": 620,
    "nombre": "Villagómez",
   
    "departamentoId": 15
  
  },
  {
    "id": 621,
    "nombre": "Villapinzón",
   
    "departamentoId": 15
  
  },
  {
    "id": 622,
    "nombre": "Villeta",
   
    "departamentoId": 15
  
  },
  {
    "id": 623,
    "nombre": "Viotá",
   
    "departamentoId": 15
  
  },
  {
    "id": 624,
    "nombre": "Zipacón",
   
    "departamentoId": 15
  
  },
  {
    "id": 625,
    "nombre": "San Juan de Río Seco",
   
    "departamentoId": 15
  
  },
  {
    "id": 626,
    "nombre": "Villa de San Diego de Ubate",
   
    "departamentoId": 15
  
  },
  {
    "id": 627,
    "nombre": "Guayabal de Siquima",
   
    "departamentoId": 15
  
  },
  {
    "id": 628,
    "nombre": "San Antonio del Tequendama",
   
    "departamentoId": 15
  
  },
  {
    "id": 629,
    "nombre": "Agua de Dios",
   
    "departamentoId": 15
  
  },
  {
    "id": 630,
    "nombre": "Carmen de Carupa",
   
    "departamentoId": 15
  
  },
  {
    "id": 631,
    "nombre": "Vergara",
   
    "departamentoId": 15
  
  },
  {
    "id": 632,
    "nombre": "Albán",
   
    "departamentoId": 15
  
  },
  {
    "id": 633,
    "nombre": "Anolaima",
   
    "departamentoId": 15
  
  },
  {
    "id": 634,
    "nombre": "Chía",
   
    "departamentoId": 15
  
  },
  {
    "id": 635,
    "nombre": "El Peñón",
   
    "departamentoId": 15
  
  },
  {
    "id": 636,
    "nombre": "Sopó",
   
    "departamentoId": 15
  
  },
  {
    "id": 637,
    "nombre": "Gama",
   
    "departamentoId": 15
  
  },
  {
    "id": 638,
    "nombre": "Sasaima",
   
    "departamentoId": 15
  
  },
  {
    "id": 639,
    "nombre": "Yacopí",
   
    "departamentoId": 15
  
  },
  {
    "id": 640,
    "nombre": "Fusagasugá",
    "description": "Fusagasugá es un municipio colombiano, capital de la Provincia del Sumapaz, ubicado en el departamento de Cundinamarca. Con una población proyectada en el año 2020 de 147.631 habitantes, es el tercer municipio más poblado del departamento después de Soacha y Bogotá (Anexo), también es el cuadragésimo quinto del país.",
    "surface": 239,
    "population": 147631,
    "postalCode": "252211",
    "departamentoId": 15
  
  },
  {
    "id": 641,
    "nombre": "Zipaquirá",
    "description": "Zipaquirá es un municipio de Colombia ubicado en el departamento de Cundinamarca, en la provincia de Sabana Centro, de la que es capital y sede de su diócesis. Se encuentra a 29 kilómetros de Bogotá, hace parte de su área metropolitana; a 450 kilómetros de Medellín, y a 117 kilómetros de Tunja.",
    "surface": 197,
    "population": 132465,
    "postalCode": "250251",
    "departamentoId": 15
  
  },
  {
    "id": 642,
    "nombre": "Facatativá",
    "description": "Facatativá es un municipio colombiano del departamento de Cundinamarca. Es la capital de la Provincia de Sabana Occidente. Hace parte del Área Metropolitana de Bogotá, según el censo DANE de 2015. Se encuentra ubicado a 36 km de Bogotá, cerca de la carretera que de esta conduce a Medellín. Posee especies tanto de flora como de fauna ya extintas en otros lugares del Altiplano Cundiboyacense",
    "surface": 158,
    "population": 167309,
    "postalCode": "253051",
    "departamentoId": 15
  
  },
  {
    "id": 644,
    "nombre": "Inírida",
    "description": "Inírida (antes llamado Puerto Inírida) es un municipio de Colombia, capital del departamento del Guainía y su ciudad más poblada. La temperatura promedio es de 25 ",
    "surface": 17000,
    "population": 19816,
    "postalCode": "940001",
    "departamentoId": 16
  
  },
  {
    "id": 645,
    "nombre": "Barranco Minas",
   
    "departamentoId": 16
  
  },
  {
    "id": 646,
    "nombre": "Mapiripana",
   
    "departamentoId": 16
  
  },
  {
    "id": 647,
    "nombre": "San Felipe",
   
    "departamentoId": 16
  
  },
  {
    "id": 648,
    "nombre": "Puerto Colombia",
   
    "departamentoId": 16
  
  },
  {
    "id": 649,
    "nombre": "La Guadalupe",
   
    "departamentoId": 16
  
  },
  {
    "id": 650,
    "nombre": "Cacahual",
   
    "departamentoId": 16
  
  },
  {
    "id": 651,
    "nombre": "Pana Pana",
   
    "departamentoId": 16
  
  },
  {
    "id": 652,
    "nombre": "Morichal",
   
    "departamentoId": 16
  
  },
  {
    "id": 653,
    "nombre": "Calamar",
   
    "departamentoId": 17
  
  },
  {
    "id": 654,
    "nombre": "San José del Guaviare",
    "description": "San José del Guaviare es un municipio colombiano, capital del departamento de Guaviare. Comenzó a formarse en 1960, vinculado a las actividades colonizadoras de la región selvática y como núcleo de apoyo a las mismas. En 1976 recibió el estatus de municipio y su crecimiento demográfico, desde entonces, se ha proyectado rápidamente.",
    "surface": 16178,
    "population": 52815,
    "postalCode": "950001",
    "departamentoId": 17
  
  },
  {
    "id": 655,
    "nombre": "Miraflores",
   
    "departamentoId": 17
  
  },
  {
    "id": 656,
    "nombre": "El Retorno",
   
    "departamentoId": 17
  
  },
  {
    "id": 759,
    "nombre": "Restrepo",
   
    "departamentoId": 21
  
  },
  {
    "id": 760,
    "nombre": "San Juanito",
   
    "departamentoId": 21
  
  },
  {
    "id": 761,
    "nombre": "San Martín",
   
    "departamentoId": 21
  
  },
  {
    "id": 762,
    "nombre": "Vista Hermosa",
   
    "departamentoId": 21
  
  },
  {
    "id": 763,
    "nombre": "Barranca de Upía",
   
    "departamentoId": 21
  
  },
  {
    "id": 764,
    "nombre": "Fuente de Oro",
   
    "departamentoId": 21
  
  },
  {
    "id": 657,
    "nombre": "Neiva",
    "description": "Neiva es un municipio colombiano, capital del departamento de Huila. Yace entre la cordillera Central y Oriental, en una planicie sobre la margen oriental del río Magdalena, en el valle del mismo nombre, cruzada por el río Las Ceibas y el río del Oro. Su extensión territorial de 1533 km², su altura de 442 metros sobre el nivel del mar y su temperatura promedio de 27.7 ",
    "surface": 1553,
    "population": 367401,
    "postalCode": "410001",
    "departamentoId": 18
  
  },
  {
    "id": 658,
    "nombre": "Acevedo",
   
    "departamentoId": 18
  
  },
  {
    "id": 659,
    "nombre": "Agrado",
   
    "departamentoId": 18
  
  },
  {
    "id": 660,
    "nombre": "Aipe",
   
    "departamentoId": 18
  
  },
  {
    "id": 661,
    "nombre": "Algeciras",
   
    "departamentoId": 18
  
  },
  {
    "id": 662,
    "nombre": "Altamira",
   
    "departamentoId": 18
  
  },
  {
    "id": 663,
    "nombre": "Baraya",
   
    "departamentoId": 18
  
  },
  {
    "id": 664,
    "nombre": "Campoalegre",
   
    "departamentoId": 18
  
  },
  {
    "id": 665,
    "nombre": "Colombia",
   
    "departamentoId": 18
  
  },
  {
    "id": 666,
    "nombre": "Elías",
   
    "departamentoId": 18
  
  },
  {
    "id": 667,
    "nombre": "Garzón",
   
    "departamentoId": 18
  
  },
  {
    "id": 668,
    "nombre": "Gigante",
   
    "departamentoId": 18
  
  },
  {
    "id": 669,
    "nombre": "Guadalupe",
   
    "departamentoId": 18
  
  },
  {
    "id": 670,
    "nombre": "Hobo",
   
    "departamentoId": 18
  
  },
  {
    "id": 671,
    "nombre": "Iquira",
   
    "departamentoId": 18
  
  },
  {
    "id": 672,
    "nombre": "Isnos",
   
    "departamentoId": 18
  
  },
  {
    "id": 673,
    "nombre": "La Argentina",
   
    "departamentoId": 18
  
  },
  {
    "id": 674,
    "nombre": "La Plata",
   
    "departamentoId": 18
  
  },
  {
    "id": 675,
    "nombre": "Nátaga",
   
    "departamentoId": 18
  
  },
  {
    "id": 676,
    "nombre": "Oporapa",
   
    "departamentoId": 18
  
  },
  {
    "id": 677,
    "nombre": "Paicol",
   
    "departamentoId": 18
  
  },
  {
    "id": 678,
    "nombre": "Palermo",
   
    "departamentoId": 18
  
  },
  {
    "id": 679,
    "nombre": "Palestina",
   
    "departamentoId": 18
  
  },
  {
    "id": 680,
    "nombre": "Pital",
   
    "departamentoId": 18
  
  },
  {
    "id": 681,
    "nombre": "Pitalito",
    "description": "Pitalito es un municipio colombiano localizado en el suroriente del departamento del Huila. Yace sobre el valle del Magdalena y sobre el vértice que forman las Cordilleras central y oriental. Su extensión territorial de 653km², su altura de 1318 metros sobre el nivel del mar y su temperatura promedio de 18-21 ",
    "surface": 653,
    "population": 128600,
    "postalCode": "417030",
    "departamentoId": 18
  
  },
  {
    "id": 682,
    "nombre": "Rivera",
   
    "departamentoId": 18
  
  },
  {
    "id": 683,
    "nombre": "Saladoblanco",
   
    "departamentoId": 18
  
  },
  {
    "id": 684,
    "nombre": "Santa María",
   
    "departamentoId": 18
  
  },
  {
    "id": 685,
    "nombre": "Suaza",
   
    "departamentoId": 18
  
  },
  {
    "id": 686,
    "nombre": "Tarqui",
   
    "departamentoId": 18
  
  },
  {
    "id": 687,
    "nombre": "Tesalia",
   
    "departamentoId": 18
  
  },
  {
    "id": 688,
    "nombre": "Tello",
   
    "departamentoId": 18
  
  },
  {
    "id": 689,
    "nombre": "Teruel",
   
    "departamentoId": 18
  
  },
  {
    "id": 690,
    "nombre": "Timaná",
   
    "departamentoId": 18
  
  },
  {
    "id": 691,
    "nombre": "Villavieja",
   
    "departamentoId": 18
  
  },
  {
    "id": 692,
    "nombre": "Yaguará",
   
    "departamentoId": 18
  
  },
  {
    "id": 693,
    "nombre": "San Agustín",
   
    "departamentoId": 18
  
  },
  {
    "id": 694,
    "nombre": "Riohacha",
    "description": "Riohacha, oficialmente Distrito Especial, Turístico y Cultural de Riohacha,7​ (en wayuunaiki: Süchiimma que traduce a \"Tierra del Río\") es un distrito colombiano, capital del departamento de La Guajira. Se ubica en la costa del mar Caribe, en el delta del río Ranchería. Es el segundo municipio con mayor extensión territorial en su departamento y principal por constituir un vasto engranaje de entidades públicas, bancos y entidades financieras",
    "surface": 3084,
    "population": 287009,
    "postalCode": "440001",
    "departamentoId": 19
  
  },
  {
    "id": 695,
    "nombre": "Albania",
   
    "departamentoId": 19
  
  },
  {
    "id": 696,
    "nombre": "Barrancas",
   
    "departamentoId": 19
  
  },
  {
    "id": 697,
    "nombre": "Dibula",
   
    "departamentoId": 19
  
  },
  {
    "id": 698,
    "nombre": "Distracción",
   
    "departamentoId": 19
  
  },
  {
    "id": 699,
    "nombre": "El Molino",
   
    "departamentoId": 19
  
  },
  {
    "id": 700,
    "nombre": "Fonseca",
   
    "departamentoId": 19
  
  },
  {
    "id": 701,
    "nombre": "Hatonuevo",
   
    "departamentoId": 19
  
  },
  {
    "id": 702,
    "nombre": "Maicao",
    "description": "Maicao (en wayuunaiki: Maikou) es un municipio colombiano ubicado en el centro-este del departamento de La Guajira. El municipio es conocido con el apelativo «Vitrina Comercial de Colombia» debido a la prosperidad económica que experimentó en la década de 1980, al establecer un amplio mercado abastecido por productos importados de Venezuela.",
    "surface": 1825,
    "population": 162118,
    "postalCode": "442001",
    "departamentoId": 19
  
  },
  {
    "id": 703,
    "nombre": "Manaure",
   
    "departamentoId": 19
  
  },
  {
    "id": 704,
    "nombre": "Uribia",
   
    "departamentoId": 19
  
  },
  {
    "id": 705,
    "nombre": "Urumita",
   
    "departamentoId": 19
  
  },
  {
    "id": 706,
    "nombre": "Villanueva",
   
    "departamentoId": 19
  
  },
  {
    "id": 707,
    "nombre": "La Jagua del Pilar",
   
    "departamentoId": 19
  
  },
  {
    "id": 708,
    "nombre": "San Juan del Cesar",
   
    "departamentoId": 19
  
  },
  {
    "id": 709,
    "nombre": "Santa Marta",
    "description": "Santa Marta, oficialmente Distrito Turístico, Cultural e Histórico de Santa Marta,4​ es la capital del departamento de Magdalena, Colombia. Fue fundada el 29 de julio de 1525 por el español Rodrigo de Bastidas, lo que según los textos, la hace la ciudad en pie más antigua de Colombia. Se encuentra a orillas de la bahía del mismo nombre.",
    "surface": 2393,
    "population": 538612,
    "postalCode": "470001",
    "departamentoId": 20
  
  },
  {
    "id": 710,
    "nombre": "Algarrobo",
   
    "departamentoId": 20
  
  },
  {
    "id": 711,
    "nombre": "Aracataca",
   
    "departamentoId": 20
  
  },
  {
    "id": 712,
    "nombre": "Ariguaní",
   
    "departamentoId": 20
  
  },
  {
    "id": 1,
    "nombre": "Leticia",
    "description": "Leticia es un municipio fronterizo colombiano, es la capital del departamento del Amazonas. Se encuentra localizado en el extremo sur del país sobre las márgenes del río Amazonas, al sur del área no municipalizada de Tarapacá y al oriente del municipio de Puerto Nariño. Su extensión territorial es de 5968 km², su altura de 82 metros sobre el nivel del mar",
    "surface": 5968,
    "population": 42280,
    "postalCode": "910001",
    "departamentoId": 1
  
  },
  {
    "id": 2,
    "nombre": "El Encanto",
   
    "departamentoId": 1
  
  },
  {
    "id": 3,
    "nombre": "La Chorrera",
   
    "departamentoId": 1
  
  },
  {
    "id": 4,
    "nombre": "La Pedrera",
   
    "departamentoId": 1
  
  },
  {
    "id": 5,
    "nombre": "La Victoria",
   
    "departamentoId": 1
  
  },
  {
    "id": 6,
    "nombre": "Puerto Arica",
   
    "departamentoId": 1
  
  },
  {
    "id": 7,
    "nombre": "Puerto Nariño",
   
    "departamentoId": 1
  
  },
  {
    "id": 8,
    "nombre": "Puerto Santander",
   
    "departamentoId": 1
  
  },
  {
    "id": 9,
    "nombre": "Tarapacá",
   
    "departamentoId": 1
  
  },
  {
    "id": 10,
    "nombre": "Puerto Alegría",
   
    "departamentoId": 1
  
  },
  {
    "id": 11,
    "nombre": "Miriti Paraná",
   
    "departamentoId": 1
  
  },
  {
    "id": 12,
    "nombre": "Medellín",
    "description": "Medellín es un distrito colombiano, capital del departamento de Antioquia. Es la ciudad más poblada del departamento y la segunda más poblada del país después de Bogotá.8​ Está ubicada en la parte más ancha de la región natural conocida como Valle de Aburrá, en la cordillera central de los Andes. Está extendida por ambas orillas del río Medellín, que la atraviesa de sur a norte, y es el municipio principal del Área metropolitana del Valle de Aburrá.9​",
    "surface": 382,
    "population": 2533424,
    "postalCode": "50001",
    "departamentoId": 2
  
  },
  {
    "id": 13,
    "nombre": "Abejorral",
   
    "departamentoId": 2
  
  },
  {
    "id": 14,
    "nombre": "Abriaquí",
   
    "departamentoId": 2
  
  },
  {
    "id": 15,
    "nombre": "Alejandría",
   
    "departamentoId": 2
  
  },
  {
    "id": 16,
    "nombre": "Amagá",
   
    "departamentoId": 2
  
  },
  {
    "id": 17,
    "nombre": "Amalfi",
   
    "departamentoId": 2
  
  },
  {
    "id": 18,
    "nombre": "Andes",
   
    "departamentoId": 2
  
  },
  {
    "id": 19,
    "nombre": "Angelópolis",
   
    "departamentoId": 2
  
  },
  {
    "id": 20,
    "nombre": "Angostura",
   
    "departamentoId": 2
  
  },
  {
    "id": 21,
    "nombre": "Anorí",
   
    "departamentoId": 2
  
  },
  {
    "id": 22,
    "nombre": "Anza",
   
    "departamentoId": 2
  
  },
  {
    "id": 23,
    "nombre": "Apartadó",
    "description": "Apartadó es un municipio de Colombia, ubicado en la subregión de Urabá en el departamento de Antioquia, siendo el municipio más poblado de dicha región. Limita por el norte el puerto y distrito de Turbo, además su cabecera municipal está a 310 kilómetros de la capital departamental, Medellín.",
    "surface": 607,
    "population": 121003,
    "postalCode": "57840",
    "departamentoId": 2
  
  },
  {
    "id": 24,
    "nombre": "Arboletes",
   
    "departamentoId": 2
  
  },
  {
    "id": 25,
    "nombre": "Argelia",
   
    "departamentoId": 2
  
  },
  {
    "id": 26,
    "nombre": "Armenia",
   
    "departamentoId": 2
  
  },
  {
    "id": 27,
    "nombre": "Barbosa",
   
    "departamentoId": 2
  
  },
  {
    "id": 28,
    "nombre": "Bello",
   
    "departamentoId": 2
  
  },
  {
    "id": 29,
    "nombre": "Betania",
   
    "departamentoId": 2
  
  },
  {
    "id": 30,
    "nombre": "Betulia",
   
    "departamentoId": 2
  
  },
  {
    "id": 31,
    "nombre": "Ciudad Bolívar",
   
    "departamentoId": 2
  
  },
  {
    "id": 32,
    "nombre": "Briceño",
   
    "departamentoId": 2
  
  },
  {
    "id": 33,
    "nombre": "Buriticá",
   
    "departamentoId": 2
  
  },
  {
    "id": 34,
    "nombre": "Cáceres",
   
    "departamentoId": 2
  
  },
  {
    "id": 35,
    "nombre": "Caicedo",
   
    "departamentoId": 2
  
  },
  {
    "id": 36,
    "nombre": "Caldas",
   
    "departamentoId": 2
  
  },
  {
    "id": 37,
    "nombre": "Campamento",
   
    "departamentoId": 2
  
  },
  {
    "id": 38,
    "nombre": "Cañasgordas",
   
    "departamentoId": 2
  
  },
  {
    "id": 39,
    "nombre": "Caracolí",
   
    "departamentoId": 2
  
  },
  {
    "id": 40,
    "nombre": "Caramanta",
   
    "departamentoId": 2
  
  },
  {
    "id": 41,
    "nombre": "Carepa",
   
    "departamentoId": 2
  
  },
  {
    "id": 42,
    "nombre": "Carolina",
   
    "departamentoId": 2
  
  },
  {
    "id": 803,
    "nombre": "Nariño",
   
    "departamentoId": 22
  
  },
  {
    "id": 43,
    "nombre": "Caucasia",
    "description": "Caucasia es un municipio colombiano localizado en la subregión del Bajo Cauca del departamento de Antioquia. Es denominada la Capital del Bajo Cauca por ser el principal centro urbano y comercial de la subregión. Limita por el norte con el departamento de Córdoba, por el este con los municipios antioqueños de Nechí y El Bagre, por el sur con el municipio de Zaragoza, y por el oeste con el municipio de Cáceres",
    "surface": 1411,
    "population": 90213,
    "postalCode": "52410",
    "departamentoId": 2
  
  },
  {
    "id": 44,
    "nombre": "Chigorodó",
   
    "departamentoId": 2
  
  },
  {
    "id": 45,
    "nombre": "Cisneros",
   
    "departamentoId": 2
  
  },
  {
    "id": 46,
    "nombre": "Cocorná",
   
    "departamentoId": 2
  
  },
  {
    "id": 47,
    "nombre": "Concepción",
   
    "departamentoId": 2
  
  },
  {
    "id": 48,
    "nombre": "Concordia",
   
    "departamentoId": 2
  
  },
  {
    "id": 49,
    "nombre": "Copacabana",
   
    "departamentoId": 2
  
  },
  {
    "id": 50,
    "nombre": "Dabeiba",
   
    "departamentoId": 2
  
  },
  {
    "id": 51,
    "nombre": "Don Matías",
   
    "departamentoId": 2
  
  },
  {
    "id": 52,
    "nombre": "Ebéjico",
   
    "departamentoId": 2
  
  },
  {
    "id": 53,
    "nombre": "El Bagre",
   
    "departamentoId": 2
  
  },
  {
    "id": 54,
    "nombre": "Entrerrios",
   
    "departamentoId": 2
  
  },
  {
    "id": 55,
    "nombre": "Envigado",
   
    "departamentoId": 2
  
  },
  {
    "id": 56,
    "nombre": "Fredonia",
   
    "departamentoId": 2
  
  },
  {
    "id": 57,
    "nombre": "Giraldo",
   
    "departamentoId": 2
  
  },
  {
    "id": 58,
    "nombre": "Girardota",
   
    "departamentoId": 2
  
  },
  {
    "id": 59,
    "nombre": "Gómez Plata",
   
    "departamentoId": 2
  
  },
  {
    "id": 60,
    "nombre": "Guadalupe",
   
    "departamentoId": 2
  
  },
  {
    "id": 61,
    "nombre": "Guarne",
   
    "departamentoId": 2
  
  },
  {
    "id": 62,
    "nombre": "Guatapé",
   
    "departamentoId": 2
  
  },
  {
    "id": 63,
    "nombre": "Heliconia",
   
    "departamentoId": 2
  
  },
  {
    "id": 64,
    "nombre": "Hispania",
   
    "departamentoId": 2
  
  },
  {
    "id": 65,
    "nombre": "Itagui",
   
    "departamentoId": 2
  
  },
  {
    "id": 66,
    "nombre": "Ituango",
   
    "departamentoId": 2
  
  },
  {
    "id": 67,
    "nombre": "Belmira",
   
    "departamentoId": 2
  
  },
  {
    "id": 68,
    "nombre": "Jericó",
   
    "departamentoId": 2
  
  },
  {
    "id": 69,
    "nombre": "La Ceja",
   
    "departamentoId": 2
  
  },
  {
    "id": 70,
    "nombre": "La Estrella",
   
    "departamentoId": 2
  
  },
  {
    "id": 71,
    "nombre": "La Pintada",
   
    "departamentoId": 2
  
  },
  {
    "id": 72,
    "nombre": "La Unión",
   
    "departamentoId": 2
  
  },
  {
    "id": 73,
    "nombre": "Liborina",
   
    "departamentoId": 2
  
  },
  {
    "id": 74,
    "nombre": "Maceo",
   
    "departamentoId": 2
  
  },
  {
    "id": 75,
    "nombre": "Marinilla",
   
    "departamentoId": 2
  
  },
  {
    "id": 76,
    "nombre": "Montebello",
   
    "departamentoId": 2
  
  },
  {
    "id": 77,
    "nombre": "Murindó",
   
    "departamentoId": 2
  
  },
  {
    "id": 78,
    "nombre": "Mutatá",
   
    "departamentoId": 2
  
  },
  {
    "id": 79,
    "nombre": "Nariño",
   
    "departamentoId": 2
  
  },
  {
    "id": 80,
    "nombre": "Necoclí",
   
    "departamentoId": 2
  
  },
  {
    "id": 81,
    "nombre": "Nechí",
   
    "departamentoId": 2
  
  },
  {
    "id": 82,
    "nombre": "Olaya",
   
    "departamentoId": 2
  
  },
  {
    "id": 83,
    "nombre": "Peñol",
   
    "departamentoId": 2
  
  },
  {
    "id": 84,
    "nombre": "Peque",
   
    "departamentoId": 2
  
  },
  {
    "id": 85,
    "nombre": "Pueblorrico",
   
    "departamentoId": 2
  
  },
  {
    "id": 86,
    "nombre": "Puerto Berrío",
   
    "departamentoId": 2
  
  },
  {
    "id": 713,
    "nombre": "Cerro San Antonio",
   
    "departamentoId": 20
  
  },
  {
    "id": 714,
    "nombre": "Chivolo",
   
    "departamentoId": 20
  
  },
  {
    "id": 715,
    "nombre": "Concordia",
   
    "departamentoId": 20
  
  },
  {
    "id": 716,
    "nombre": "El Banco",
   
    "departamentoId": 20
  
  },
  {
    "id": 717,
    "nombre": "El Piñon",
   
    "departamentoId": 20
  
  },
  {
    "id": 718,
    "nombre": "El Retén",
   
    "departamentoId": 20
  
  },
  {
    "id": 719,
    "nombre": "Fundación",
   
    "departamentoId": 20
  
  },
  {
    "id": 720,
    "nombre": "Guamal",
   
    "departamentoId": 20
  
  },
  {
    "id": 721,
    "nombre": "Nueva Granada",
   
    "departamentoId": 20
  
  },
  {
    "id": 722,
    "nombre": "Pedraza",
   
    "departamentoId": 20
  
  },
  {
    "id": 723,
    "nombre": "Pivijay",
   
    "departamentoId": 20
  
  },
  {
    "id": 724,
    "nombre": "Plato",
   
    "departamentoId": 20
  
  },
  {
    "id": 725,
    "nombre": "Remolino",
   
    "departamentoId": 20
  
  },
  {
    "id": 726,
    "nombre": "Salamina",
   
    "departamentoId": 20
  
  },
  {
    "id": 727,
    "nombre": "San Zenón",
   
    "departamentoId": 20
  
  },
  {
    "id": 728,
    "nombre": "Santa Ana",
   
    "departamentoId": 20
  
  },
  {
    "id": 729,
    "nombre": "Sitionuevo",
   
    "departamentoId": 20
  
  },
  {
    "id": 730,
    "nombre": "Tenerife",
   
    "departamentoId": 20
  
  },
  {
    "id": 731,
    "nombre": "Zapayán",
   
    "departamentoId": 20
  
  },
  {
    "id": 732,
    "nombre": "Zona Bananera",
   
    "departamentoId": 20
  
  },
  {
    "id": 733,
    "nombre": "San Sebastián de Buenavista",
   
    "departamentoId": 20
  
  },
  {
    "id": 734,
    "nombre": "Sabanas de San Angel",
   
    "departamentoId": 20
  
  },
  {
    "id": 735,
    "nombre": "Pijiño del Carmen",
   
    "departamentoId": 20
  
  },
  {
    "id": 736,
    "nombre": "Santa Bárbara de Pinto",
   
    "departamentoId": 20
  
  },
  {
    "id": 737,
    "nombre": "Pueblo Viejo",
   
    "departamentoId": 20
  
  },
  {
    "id": 738,
    "nombre": "Ciénaga",
    "description": "Ciénaga es un municipio del departamento colombiano del Magdalena. Se encuentra a orillas del Mar Caribe, junto a la Sierra Nevada de Santa Marta, en el extremo nororiental de la Ciénaga Grande de Santa Marta. Está a 3 m s. n. m. y tiene una temperatura promedio de 30 °C. Dista 35 km de la ciudad de Santa Marta. Pertenece a la red de pueblos patrimonio de Colombia",
    "surface": 1242,
    "population": 129414,
    "postalCode": "478007",
    "departamentoId": 20
  
  },
  {
    "id": 739,
    "nombre": "Uribe",
   
    "departamentoId": 21
  
  },
  {
    "id": 740,
    "nombre": "Villavicencio",
    "description": "Villavicencio es un municipio colombiano, capital del departamento del Meta y el centro comercial más importante de los Llanos Orientales.4​ Está ubicada en el piedemonte de la Cordillera Oriental, al noroccidente del departamento del Meta, en la margen derecha del río Guatiquía.",
    "surface": 1338,
    "population": 558299,
    "postalCode": "500001",
    "departamentoId": 21
  
  },
  {
    "id": 741,
    "nombre": "Acacias",
   
    "departamentoId": 21
  
  },
  {
    "id": 742,
    "nombre": "Cabuyaro",
   
    "departamentoId": 21
  
  },
  {
    "id": 743,
    "nombre": "Cubarral",
   
    "departamentoId": 21
  
  },
  {
    "id": 744,
    "nombre": "Cumaral",
   
    "departamentoId": 21
  
  },
  {
    "id": 745,
    "nombre": "El Calvario",
   
    "departamentoId": 21
  
  },
  {
    "id": 746,
    "nombre": "El Castillo",
   
    "departamentoId": 21
  
  },
  {
    "id": 747,
    "nombre": "El Dorado",
   
    "departamentoId": 21
  
  },
  {
    "id": 748,
    "nombre": "Granada",
   
    "departamentoId": 21
  
  },
  {
    "id": 749,
    "nombre": "Guamal",
   
    "departamentoId": 21
  
  },
  {
    "id": 750,
    "nombre": "Mapiripán",
   
    "departamentoId": 21
  
  },
  {
    "id": 751,
    "nombre": "Mesetas",
   
    "departamentoId": 21
  
  },
  {
    "id": 752,
    "nombre": "La Macarena",
   
    "departamentoId": 21
  
  },
  {
    "id": 753,
    "nombre": "Lejanías",
   
    "departamentoId": 21
  
  },
  {
    "id": 754,
    "nombre": "Puerto Concordia",
   
    "departamentoId": 21
  
  },
  {
    "id": 755,
    "nombre": "Puerto Gaitán",
   
    "departamentoId": 21
  
  },
  {
    "id": 765,
    "nombre": "San Carlos de Guaroa",
   
    "departamentoId": 21
  
  },
  {
    "id": 766,
    "nombre": "San Juan de Arama",
   
    "departamentoId": 21
  
  },
  {
    "id": 767,
    "nombre": "Castilla la Nueva",
   
    "departamentoId": 21
  
  },
  {
    "id": 768,
    "nombre": "Santacruz",
   
    "departamentoId": 22
  
  },
  {
    "id": 769,
    "nombre": "Pasto",
    "description": "Pasto es un municipio colombiano, capital del departamento de Nariño, cuya cabecera municipal ostenta el nombre de San Juan de Pasto.9​ Se ubica en el suroccidente de la nación, en la región Andina.",
    "surface": 1181,
    "population": 460638,
    "postalCode": "520001",
    "departamentoId": 22
  
  },
  {
    "id": 770,
    "nombre": "Albán",
   
    "departamentoId": 22
  
  },
  {
    "id": 771,
    "nombre": "Aldana",
   
    "departamentoId": 22
  
  },
  {
    "id": 772,
    "nombre": "Ancuyá",
   
    "departamentoId": 22
  
  },
  {
    "id": 773,
    "nombre": "Barbacoas",
   
    "departamentoId": 22
  
  },
  {
    "id": 774,
    "nombre": "Colón",
   
    "departamentoId": 22
  
  },
  {
    "id": 775,
    "nombre": "Consaca",
   
    "departamentoId": 22
  
  },
  {
    "id": 776,
    "nombre": "Contadero",
   
    "departamentoId": 22
  
  },
  {
    "id": 777,
    "nombre": "Córdoba",
   
    "departamentoId": 22
  
  },
  {
    "id": 778,
    "nombre": "Cuaspud",
   
    "departamentoId": 22
  
  },
  {
    "id": 779,
    "nombre": "Cumbal",
   
    "departamentoId": 22
  
  },
  {
    "id": 780,
    "nombre": "Cumbitara",
   
    "departamentoId": 22
  
  },
  {
    "id": 781,
    "nombre": "El Charco",
   
    "departamentoId": 22
  
  },
  {
    "id": 782,
    "nombre": "El Peñol",
   
    "departamentoId": 22
  
  },
  {
    "id": 783,
    "nombre": "El Rosario",
   
    "departamentoId": 22
  
  },
  {
    "id": 784,
    "nombre": "El Tambo",
   
    "departamentoId": 22
  
  },
  {
    "id": 785,
    "nombre": "Funes",
   
    "departamentoId": 22
  
  },
  {
    "id": 786,
    "nombre": "Guachucal",
   
    "departamentoId": 22
  
  },
  {
    "id": 787,
    "nombre": "Guaitarilla",
   
    "departamentoId": 22
  
  },
  {
    "id": 788,
    "nombre": "Gualmatán",
   
    "departamentoId": 22
  
  },
  {
    "id": 789,
    "nombre": "Iles",
   
    "departamentoId": 22
  
  },
  {
    "id": 790,
    "nombre": "Imués",
   
    "departamentoId": 22
  
  },
  {
    "id": 791,
    "nombre": "Ipiales",
    "description": "Ipiales es un municipio colombiano ubicado en el departamento de Nariño. Situado en la frontera con Ecuador, en el nudo de los Pastos, en el altiplano andino, relativamente cerca de la costa del océano Pacífico (aproximadamente a cinco horas en bus), al pie de monte amazónico y a la línea equinoccial, siendo una región panamazónica.",
    "surface": 1707,
    "population": 148000,
    "postalCode": "524060",
    "departamentoId": 22
  
  },
  {
    "id": 792,
    "nombre": "La Cruz",
   
    "departamentoId": 22
  
  },
  {
    "id": 793,
    "nombre": "La Florida",
   
    "departamentoId": 22
  
  },
  {
    "id": 794,
    "nombre": "La Llanada",
   
    "departamentoId": 22
  
  },
  {
    "id": 795,
    "nombre": "La Tola",
   
    "departamentoId": 22
  
  },
  {
    "id": 796,
    "nombre": "La Unión",
   
    "departamentoId": 22
  
  },
  {
    "id": 797,
    "nombre": "Leiva",
   
    "departamentoId": 22
  
  },
  {
    "id": 798,
    "nombre": "Linares",
   
    "departamentoId": 22
  
  },
  {
    "id": 799,
    "nombre": "Los Andes",
   
    "departamentoId": 22
  
  },
  {
    "id": 800,
    "nombre": "Magüí",
   
    "departamentoId": 22
  
  },
  {
    "id": 801,
    "nombre": "Mallama",
   
    "departamentoId": 22
  
  },
  {
    "id": 802,
    "nombre": "Mosquera",
   
    "departamentoId": 22
  
  },
  {
    "id": 804,
    "nombre": "Olaya Herrera",
   
    "departamentoId": 22
  
  },
  {
    "id": 805,
    "nombre": "Ospina",
   
    "departamentoId": 22
  
  },
  {
    "id": 806,
    "nombre": "Francisco Pizarro",
   
    "departamentoId": 22
  
  },
  {
    "id": 807,
    "nombre": "Policarpa",
   
    "departamentoId": 22
  
  },
  {
    "id": 808,
    "nombre": "Potosí",
   
    "departamentoId": 22
  
  },
  {
    "id": 809,
    "nombre": "Providencia",
   
    "departamentoId": 22
  
  },
  {
    "id": 810,
    "nombre": "Puerres",
   
    "departamentoId": 22
  
  },
  {
    "id": 811,
    "nombre": "Pupiales",
   
    "departamentoId": 22
  
  },
  {
    "id": 812,
    "nombre": "Ricaurte",
   
    "departamentoId": 22
  
  },
  {
    "id": 813,
    "nombre": "Roberto Payán",
   
    "departamentoId": 22
  
  },
  {
    "id": 814,
    "nombre": "Samaniego",
   
    "departamentoId": 22
  
  },
  {
    "id": 815,
    "nombre": "Sandoná",
   
    "departamentoId": 22
  
  },
  {
    "id": 816,
    "nombre": "San Bernardo",
   
    "departamentoId": 22
  
  },
  {
    "id": 817,
    "nombre": "San Lorenzo",
   
    "departamentoId": 22
  
  },
  {
    "id": 818,
    "nombre": "San Pablo",
   
    "departamentoId": 22
  
  },
  {
    "id": 819,
    "nombre": "Santa Bárbara",
   
    "departamentoId": 22
  
  },
  {
    "id": 820,
    "nombre": "Sapuyes",
   
    "departamentoId": 22
  
  },
  {
    "id": 821,
    "nombre": "Taminango",
   
    "departamentoId": 22
  
  },
  {
    "id": 822,
    "nombre": "Tangua",
   
    "departamentoId": 22
  
  },
  {
    "id": 823,
    "nombre": "Túquerres",
   
    "departamentoId": 22
  
  },
  {
    "id": 824,
    "nombre": "Yacuanquer",
   
    "departamentoId": 22
  
  },
  {
    "id": 825,
    "nombre": "San Pedro de Cartago",
   
    "departamentoId": 22
  
  },
  {
    "id": 826,
    "nombre": "El Tablón de Gómez",
   
    "departamentoId": 22
  
  },
  {
    "id": 827,
    "nombre": "Buesaco",
   
    "departamentoId": 22
  
  },
  {
    "id": 828,
    "nombre": "San Andrés de Tumaco",
   
    "departamentoId": 22
  
  },
  {
    "id": 829,
    "nombre": "Belén",
   
    "departamentoId": 22
  
  },
  {
    "id": 830,
    "nombre": "Chachagüí",
   
    "departamentoId": 22
  
  },
  {
    "id": 831,
    "nombre": "Arboleda",
   
    "departamentoId": 22
  
  },
  {
    "id": 832,
    "nombre": "Silos",
   
    "departamentoId": 23
  
  },
  {
    "id": 833,
    "nombre": "Cácota",
   
    "departamentoId": 23
  
  },
  {
    "id": 834,
    "nombre": "Toledo",
   
    "departamentoId": 23
  
  },
  {
    "id": 835,
    "nombre": "Mutiscua",
   
    "departamentoId": 23
  
  },
  {
    "id": 836,
    "nombre": "El Zulia",
   
    "departamentoId": 23
  
  },
  {
    "id": 837,
    "nombre": "Salazar",
   
    "departamentoId": 23
  
  },
  {
    "id": 838,
    "nombre": "Cucutilla",
   
    "departamentoId": 23
  
  },
  {
    "id": 839,
    "nombre": "Puerto Santander",
   
    "departamentoId": 23
  
  },
  {
    "id": 840,
    "nombre": "Gramalote",
   
    "departamentoId": 23
  
  },
  {
    "id": 841,
    "nombre": "El Tarra",
   
    "departamentoId": 23
  
  },
  {
    "id": 842,
    "nombre": "Teorama",
   
    "departamentoId": 23
  
  },
  {
    "id": 843,
    "nombre": "Arboledas",
   
    "departamentoId": 23
  
  },
  {
    "id": 844,
    "nombre": "Lourdes",
   
    "departamentoId": 23
  
  },
  {
    "id": 845,
    "nombre": "Bochalema",
   
    "departamentoId": 23
  
  },
  {
    "id": 846,
    "nombre": "Convención",
   
    "departamentoId": 23
  
  },
  {
    "id": 847,
    "nombre": "Hacarí",
   
    "departamentoId": 23
  
  },
  {
    "id": 848,
    "nombre": "Herrán",
   
    "departamentoId": 23
  
  },
  {
    "id": 849,
    "nombre": "Tibú",
   
    "departamentoId": 23
  
  },
  {
    "id": 850,
    "nombre": "San Cayetano",
   
    "departamentoId": 23
  
  },
  {
    "id": 851,
    "nombre": "San Calixto",
   
    "departamentoId": 23
  
  },
  {
    "id": 852,
    "nombre": "La Playa",
   
    "departamentoId": 23
  
  },
  {
    "id": 853,
    "nombre": "Chinácota",
   
    "departamentoId": 23
  
  },
  {
    "id": 854,
    "nombre": "Ragonvalia",
   
    "departamentoId": 23
  
  },
  {
    "id": 855,
    "nombre": "La Esperanza",
   
    "departamentoId": 23
  
  },
  {
    "id": 856,
    "nombre": "Villa del Rosario",
   
    "departamentoId": 23
  
  },
  {
    "id": 857,
    "nombre": "Chitagá",
   
    "departamentoId": 23
  
  },
  {
    "id": 858,
    "nombre": "Sardinata",
   
    "departamentoId": 23
  
  },
  {
    "id": 859,
    "nombre": "Abrego",
   
    "departamentoId": 23
  
  },
  {
    "id": 860,
    "nombre": "Los Patios",
   
    "departamentoId": 23
  
  },
  {
    "id": 861,
    "nombre": "Ocaña",
    "description": "Ocaña es un municipio colombiano ubicado en el departamento de Norte de Santander, al nororiente del país. Se encuentra dentro de la Subregión de Occidente, conocida coloquialmente como la Provincia de Ocaña. El municipio cuenta con una extensión de 672,27 km² y una altitud media de 1202",
    "surface": 672,
    "population": 129308,
    "postalCode": "546551",
    "departamentoId": 23
  
  },
  {
    "id": 862,
    "nombre": "Bucarasica",
   
    "departamentoId": 23
  
  },
  {
    "id": 863,
    "nombre": "Santiago",
   
    "departamentoId": 23
  
  },
  {
    "id": 864,
    "nombre": "Labateca",
   
    "departamentoId": 23
  
  },
  {
    "id": 865,
    "nombre": "Cachirá",
   
    "departamentoId": 23
  
  },
  {
    "id": 866,
    "nombre": "Villa Caro",
   
    "departamentoId": 23
  
  },
  {
    "id": 867,
    "nombre": "Durania",
   
    "departamentoId": 23
  
  },
  {
    "id": 868,
    "nombre": "Pamplona",
    "description": "Pamplona es un municipio colombiano, ubicado en el departamento de Norte de Santander. Fue la capital de la Provincia de Pamplona y su economía está basada en la gastronomía, la agricultura, el turismo (especialmente el turismo religioso) y la educación. Se le conoce como la \"Ciudad Mitrada\", debido a que en ella se instauró la Arquidiócesis de Nueva Pamplona",
    "surface": 318,
    "population": 59422,
    "postalCode": "543050",
    "departamentoId": 23
  
  },
  {
    "id": 869,
    "nombre": "Pamplonita",
   
    "departamentoId": 23
  
  },
  {
    "id": 870,
    "nombre": "Cúcuta",
    "description": "Cúcuta, oficialmente San José de Cúcuta, es un municipio colombiano, capital del departamento de Norte de Santander y núcleo del Área Metropolitana de Cúcuta. La ciudad está situada en el valle homónimo, al pie de la Cordillera Oriental de los Andes Colombianos, próxima a la frontera con Venezuela. Comprende una superficie aproximada de 1117 km², con un área urbana de 64 km² (dividida en 10 comunas) y un área rural de 1053 km² (dividida en 10 corregimientos)",
    "surface": 1117,
    "population": 777106,
    "postalCode": "540001",
    "departamentoId": 23
  
  },
  {
    "id": 871,
    "nombre": "El Carmen",
   
    "departamentoId": 23
  
  },
  {
    "id": 872,
    "nombre": "Mocoa",
    "description": "Mocoa es un municipio colombiano y capital del departamento de Putumayo, cuya cabecera municipal ostenta el nombre de San Miguel de Agreda de Mocoa. Se sitúa en el suroccidente de Colombia, siendo el segundo municipio de mayor población en el departamento.",
    "surface": 1263,
    "population": 58938,
    "postalCode": "860001",
    "departamentoId": 24
  
  },
  {
    "id": 873,
    "nombre": "Colón",
   
    "departamentoId": 24
  
  },
  {
    "id": 874,
    "nombre": "Orito",
   
    "departamentoId": 24
  
  },
  {
    "id": 875,
    "nombre": "Puerto Caicedo",
   
    "departamentoId": 24
  
  },
  {
    "id": 876,
    "nombre": "Puerto Guzmán",
   
    "departamentoId": 24
  
  },
  {
    "id": 877,
    "nombre": "Leguízamo",
   
    "departamentoId": 24
  
  },
  {
    "id": 878,
    "nombre": "Sibundoy",
   
    "departamentoId": 24
  
  },
  {
    "id": 879,
    "nombre": "San Francisco",
   
    "departamentoId": 24
  
  },
  {
    "id": 880,
    "nombre": "San Miguel",
   
    "departamentoId": 24
  
  },
  {
    "id": 881,
    "nombre": "Santiago",
   
    "departamentoId": 24
  
  },
  {
    "id": 882,
    "nombre": "Valle de Guamez",
   
    "departamentoId": 24
  
  },
  {
    "id": 883,
    "nombre": "Puerto Asís",
    "description": "Puerto Asís es un municipio colombiano localizado en el departamento del Putumayo. Conocido como la capital comercial del Putumayo por su predominio de las actividades del sector terciario o servicios en su economía que lo convierten el municipio con mayor peso relativo municipal en el valor agregado departamental (25.4 %).2​ Es también el municipio con mayor población en el departamento",
    "surface": 2610,
    "population": 113893,
    "postalCode": "862060",
    "departamentoId": 24
  
  },
  {
    "id": 884,
    "nombre": "Villagarzón",
   
    "departamentoId": 24
  
  },
  {
    "id": 885,
    "nombre": "Armenia",
    "description": "Armenia es un municipio colombiano, capital del departamento del Quindío y núcleo económico de su área metropolitana. Es una de las principales ciudades del eje cafetero colombiano, la región paisa y el Paisaje Cultural Cafetero.4​ Fundada en 1889 durante la colonización antioqueña, basó su economía en la agricultura",
    "surface": 121,
    "population": 316926,
    "postalCode": "630001",
    "departamentoId": 25
  
  },
  {
    "id": 886,
    "nombre": "Buenavista",
   
    "departamentoId": 25
  
  },
  {
    "id": 887,
    "nombre": "Circasia",
   
    "departamentoId": 25
  
  },
  {
    "id": 888,
    "nombre": "Córdoba",
   
    "departamentoId": 25
  
  },
  {
    "id": 889,
    "nombre": "Filandia",
   
    "departamentoId": 25
  
  },
  {
    "id": 890,
    "nombre": "La Tebaida",
   
    "departamentoId": 25
  
  },
  {
    "id": 891,
    "nombre": "Montenegro",
   
    "departamentoId": 25
  
  },
  {
    "id": 892,
    "nombre": "Pijao",
   
    "departamentoId": 25
  
  },
  {
    "id": 893,
    "nombre": "Quimbaya",
   
    "departamentoId": 25
  
  },
  {
    "id": 894,
    "nombre": "Salento",
   
    "departamentoId": 25
  
  },
  {
    "id": 895,
    "nombre": "Calarcá",
   
    "departamentoId": 25
  
  },
  {
    "id": 896,
    "nombre": "Génova",
   
    "departamentoId": 25
  
  },
  {
    "id": 897,
    "nombre": "Pereira",
    "description": "Pereira es un municipio colombiano, capital del departamento de Risaralda. Es la ciudad más poblada de la región del eje cafetero; integra el Área Metropolitana de Centro Occidente junto con los municipios de Dosquebradas y La Virginia. Está ubicada en la región centro-occidente del país, en el valle del río Otún en la Cordillera Central de los Andes colombianos.",
    "surface": 702,
    "population": 477027,
    "postalCode": "660000",
    "departamentoId": 26
  
  },
  {
    "id": 898,
    "nombre": "Apía",
   
    "departamentoId": 26
  
  },
  {
    "id": 899,
    "nombre": "Balboa",
   
    "departamentoId": 26
  
  },
  {
    "id": 900,
    "nombre": "Dosquebradas",
   
    "departamentoId": 26
  
  },
  {
    "id": 901,
    "nombre": "Guática",
   
    "departamentoId": 26
  
  },
  {
    "id": 902,
    "nombre": "La Celia",
   
    "departamentoId": 26
  
  },
  {
    "id": 903,
    "nombre": "La Virginia",
   
    "departamentoId": 26
  
  },
  {
    "id": 904,
    "nombre": "Marsella",
   
    "departamentoId": 26
  
  },
  {
    "id": 905,
    "nombre": "Mistrató",
   
    "departamentoId": 26
  
  },
  {
    "id": 906,
    "nombre": "Pueblo Rico",
   
    "departamentoId": 26
  
  },
  {
    "id": 907,
    "nombre": "Quinchía",
   
    "departamentoId": 26
  
  },
  {
    "id": 908,
    "nombre": "Santuario",
   
    "departamentoId": 26
  
  },
  {
    "id": 909,
    "nombre": "Santa Rosa de Cabal",
   
    "departamentoId": 26
  
  },
  {
    "id": 910,
    "nombre": "Belén de Umbría",
   
    "departamentoId": 26
  
  },
  {
    "id": 911,
    "nombre": "Providencia",
   
    "departamentoId": 27
  
  },
  {
    "id": 912,
    "nombre": "San Andrés",
    "description": "San Andrés, conocido localmente como North End o Sector del Centro es el centro administrativo, turístico y comercial del departamento colombiano de San Andrés, Providencia y Santa Catalina.",
    "surface": 26,
    "population": 71305,
    "postalCode": "880001",
    "departamentoId": 27
  
  },
  {
    "id": 913,
    "nombre": "Puerto Wilches",
   
    "departamentoId": 28
  
  },
  {
    "id": 914,
    "nombre": "Puerto Parra",
   
    "departamentoId": 28
  
  },
  {
    "id": 915,
    "nombre": "Bucaramanga",
    "description": "Bucaramanga es un municipio colombiano, capital del departamento de Santander. En 2015 un informe del Banco Mundial la situó como una de las urbes más competitivas y con mejor calidad de vida en América Latina.12​ Está ubicada al nororiente del país sobre la Cordillera Oriental, rama de la cordillera de los Andes, a orillas del río de Oro.",
    "surface": 162,
    "population": 612274,
    "postalCode": "680001",
    "departamentoId": 28
  
  },
  {
    "id": 916,
    "nombre": "Aguada",
   
    "departamentoId": 28
  
  },
  {
    "id": 917,
    "nombre": "Albania",
   
    "departamentoId": 28
  
  },
  {
    "id": 918,
    "nombre": "Aratoca",
   
    "departamentoId": 28
  
  },
  {
    "id": 919,
    "nombre": "Barbosa",
   
    "departamentoId": 28
  
  },
  {
    "id": 920,
    "nombre": "Barichara",
   
    "departamentoId": 28
  
  },
  {
    "id": 921,
    "nombre": "Barrancabermeja",
    "description": "Barrancabermeja, oficialmente Distrito Especial, Portuario, Industrial, Turístico y Biodiverso de Barrancabermeja, es un distrito colombiano ubicado a orillas del río Magdalena, en la parte occidental del departamento de Santander. Es la ciudad industrial más importante del departamento de Santander, sede de la refinería de petróleo más grande del país y es la capital de la Provincia de Yariguíes",
    "surface": 1154,
    "population": 210729,
    "postalCode": "687031",
    "departamentoId": 28
  
  },
  {
    "id": 922,
    "nombre": "Betulia",
   
    "departamentoId": 28
  
  },
  {
    "id": 923,
    "nombre": "Bolívar",
   
    "departamentoId": 28
  
  },
  {
    "id": 924,
    "nombre": "Cabrera",
   
    "departamentoId": 28
  
  },
  {
    "id": 925,
    "nombre": "California",
   
    "departamentoId": 28
  
  },
  {
    "id": 926,
    "nombre": "Carcasí",
   
    "departamentoId": 28
  
  },
  {
    "id": 927,
    "nombre": "Cepitá",
   
    "departamentoId": 28
  
  },
  {
    "id": 928,
    "nombre": "Cerrito",
    "description": " ",
    "surface": null,
    "population": null,
    "postalCode": null,
    "departamentoId": 28
  
  },
  {
    "id": 929,
    "nombre": "Charalá",
   
    "departamentoId": 28
  
  },
  {
    "id": 930,
    "nombre": "Charta",
   
    "departamentoId": 28
  
  },
  {
    "id": 931,
    "nombre": "Chipatá",
   
    "departamentoId": 28
  
  },
  {
    "id": 932,
    "nombre": "Cimitarra",
   
    "departamentoId": 28
  
  },
  {
    "id": 933,
    "nombre": "Concepción",
   
    "departamentoId": 28
  
  },
  {
    "id": 934,
    "nombre": "Confines",
   
    "departamentoId": 28
  
  },
  {
    "id": 935,
    "nombre": "Contratación",
   
    "departamentoId": 28
  
  },
  {
    "id": 936,
    "nombre": "Coromoro",
   
    "departamentoId": 28
  
  },
  {
    "id": 937,
    "nombre": "Curití",
   
    "departamentoId": 28
  
  },
  {
    "id": 938,
    "nombre": "El Guacamayo",
   
    "departamentoId": 28
  
  },
  {
    "id": 939,
    "nombre": "El Playón",
   
    "departamentoId": 28
  
  },
  {
    "id": 940,
    "nombre": "Encino",
   
    "departamentoId": 28
  
  },
  {
    "id": 941,
    "nombre": "Enciso",
   
    "departamentoId": 28
  
  },
  {
    "id": 942,
    "nombre": "Florián",
   
    "departamentoId": 28
  
  },
  {
    "id": 943,
    "nombre": "Floridablanca",
   
    "departamentoId": 28
  
  },
  {
    "id": 944,
    "nombre": "Galán",
   
    "departamentoId": 28
  
  },
  {
    "id": 945,
    "nombre": "Gambita",
   
    "departamentoId": 28
  
  },
  {
    "id": 946,
    "nombre": "Girón",
   
    "departamentoId": 28
  
  },
  {
    "id": 947,
    "nombre": "Guaca",
   
    "departamentoId": 28
  
  },
  {
    "id": 948,
    "nombre": "Guadalupe",
   
    "departamentoId": 28
  
  },
  {
    "id": 949,
    "nombre": "Guapotá",
   
    "departamentoId": 28
  
  },
  {
    "id": 950,
    "nombre": "Guavatá",
   
    "departamentoId": 28
  
  },
  {
    "id": 951,
    "nombre": "Güepsa",
   
    "departamentoId": 28
  
  },
  {
    "id": 952,
    "nombre": "Jesús María",
   
    "departamentoId": 28
  
  },
  {
    "id": 953,
    "nombre": "Jordán",
   
    "departamentoId": 28
  
  },
  {
    "id": 954,
    "nombre": "La Belleza",
   
    "departamentoId": 28
  
  },
  {
    "id": 955,
    "nombre": "Landázuri",
   
    "departamentoId": 28
  
  },
  {
    "id": 956,
    "nombre": "La Paz",
   
    "departamentoId": 28
  
  },
  {
    "id": 957,
    "nombre": "Lebríja",
   
    "departamentoId": 28
  
  },
  {
    "id": 958,
    "nombre": "Los Santos",
   
    "departamentoId": 28
  
  },
  {
    "id": 959,
    "nombre": "Macaravita",
   
    "departamentoId": 28
  
  },
  {
    "id": 960,
    "nombre": "Málaga",
   
    "departamentoId": 28
  
  },
  {
    "id": 961,
    "nombre": "Matanza",
   
    "departamentoId": 28
  
  },
  {
    "id": 962,
    "nombre": "Mogotes",
   
    "departamentoId": 28
  
  },
  {
    "id": 963,
    "nombre": "Molagavita",
   
    "departamentoId": 28
  
  },
  {
    "id": 964,
    "nombre": "Ocamonte",
   
    "departamentoId": 28
  
  },
  {
    "id": 965,
    "nombre": "Oiba",
   
    "departamentoId": 28
  
  },
  {
    "id": 966,
    "nombre": "Onzaga",
   
    "departamentoId": 28
  
  },
  {
    "id": 967,
    "nombre": "Palmar",
   
    "departamentoId": 28
  
  },
  {
    "id": 968,
    "nombre": "Páramo",
   
    "departamentoId": 28
  
  },
  {
    "id": 969,
    "nombre": "Piedecuesta",
   
    "departamentoId": 28
  
  },
  {
    "id": 970,
    "nombre": "Pinchote",
   
    "departamentoId": 28
  
  },
  {
    "id": 971,
    "nombre": "Puente Nacional",
   
    "departamentoId": 28
  
  },
  {
    "id": 972,
    "nombre": "Rionegro",
   
    "departamentoId": 28
  
  },
  {
    "id": 973,
    "nombre": "San Andrés",
   
    "departamentoId": 28
  
  },
  {
    "id": 974,
    "nombre": "San Gil",
    "description": "San Gil es un municipio colombiano ubicado en el departamento de Santander. Se sitúa sobre el eje vial entre Bucaramanga y Bogotá, y constituye el núcleo urbano más importante del sur del departamento de Santander. En el 2004 fue designado como la Capital Turística del departamento.",
    "surface": 149,
    "population": 59670,
    "postalCode": "684031",
    "departamentoId": 28
  
  },
  {
    "id": 975,
    "nombre": "San Joaquín",
   
    "departamentoId": 28
  
  },
  {
    "id": 976,
    "nombre": "San Miguel",
   
    "departamentoId": 28
  
  },
  {
    "id": 977,
    "nombre": "Santa Bárbara",
   
    "departamentoId": 28
  
  },
  {
    "id": 978,
    "nombre": "Simacota",
   
    "departamentoId": 28
  
  },
  {
    "id": 979,
    "nombre": "Socorro",
   
    "departamentoId": 28
  
  },
  {
    "id": 980,
    "nombre": "Suaita",
   
    "departamentoId": 28
  
  },
  {
    "id": 981,
    "nombre": "Sucre",
   
    "departamentoId": 28
  
  },
  {
    "id": 982,
    "nombre": "Suratá",
   
    "departamentoId": 28
  
  },
  {
    "id": 983,
    "nombre": "Tona",
   
    "departamentoId": 28
  
  },
  {
    "id": 984,
    "nombre": "Vélez",
   
    "departamentoId": 28
  
  },
  {
    "id": 985,
    "nombre": "Vetas",
   
    "departamentoId": 28
  
  },
  {
    "id": 986,
    "nombre": "Villanueva",
   
    "departamentoId": 28
  
  },
  {
    "id": 987,
    "nombre": "Zapatoca",
   
    "departamentoId": 28
  
  },
  {
    "id": 988,
    "nombre": "Palmas del Socorro",
   
    "departamentoId": 28
  
  },
  {
    "id": 989,
    "nombre": "San Vicente de Chucurí",
   
    "departamentoId": 28
  
  },
  {
    "id": 990,
    "nombre": "San José de Miranda",
   
    "departamentoId": 28
  
  },
  {
    "id": 991,
    "nombre": "Santa Helena del Opón",
   
    "departamentoId": 28
  
  },
  {
    "id": 992,
    "nombre": "Sabana de Torres",
   
    "departamentoId": 28
  
  },
  {
    "id": 993,
    "nombre": "El Carmen de Chucurí",
   
    "departamentoId": 28
  
  },
  {
    "id": 994,
    "nombre": "Valle de San José",
   
    "departamentoId": 28
  
  },
  {
    "id": 995,
    "nombre": "San Benito",
   
    "departamentoId": 28
  
  },
  {
    "id": 996,
    "nombre": "Hato",
   
    "departamentoId": 28
  
  },
  {
    "id": 997,
    "nombre": "Chimá",
   
    "departamentoId": 28
  
  },
  {
    "id": 998,
    "nombre": "Capitanejo",
   
    "departamentoId": 28
  
  },
  {
    "id": 999,
    "nombre": "El Peñón",
   
    "departamentoId": 28
  
  },
  {
    "id": 1000,
    "nombre": "Sincelejo",
    "description": "Sincelejo es un municipio colombiano, capital del departamento de Sucre. Se encuentra ubicado al noroeste del país, en el Caribe Colombiano exactamente en la subregión Sabanas.",
    "surface": 284,
    "population": 301126,
    "postalCode": "700001",
    "departamentoId": 29
  
  },
  {
    "id": 1001,
    "nombre": "Buenavista",
   
    "departamentoId": 29
  
  },
  {
    "id": 1002,
    "nombre": "Caimito",
   
    "departamentoId": 29
  
  },
  {
    "id": 1003,
    "nombre": "Coloso",
   
    "departamentoId": 29
  
  },
  {
    "id": 1004,
    "nombre": "Coveñas",
   
    "departamentoId": 29
  
  },
  {
    "id": 1005,
    "nombre": "Chalán",
   
    "departamentoId": 29
  
  },
  {
    "id": 1006,
    "nombre": "El Roble",
   
    "departamentoId": 29
  
  },
  {
    "id": 1007,
    "nombre": "Galeras",
   
    "departamentoId": 29
  
  },
  {
    "id": 1008,
    "nombre": "Guaranda",
   
    "departamentoId": 29
  
  },
  {
    "id": 1009,
    "nombre": "La Unión",
   
    "departamentoId": 29
  
  },
  {
    "id": 1010,
    "nombre": "Los Palmitos",
   
    "departamentoId": 29
  
  },
  {
    "id": 1011,
    "nombre": "Majagual",
   
    "departamentoId": 29
  
  },
  {
    "id": 1012,
    "nombre": "Morroa",
   
    "departamentoId": 29
  
  },
  {
    "id": 1013,
    "nombre": "Ovejas",
   
    "departamentoId": 29
  
  },
  {
    "id": 1014,
    "nombre": "Palmito",
   
    "departamentoId": 29
  
  },
  {
    "id": 1015,
    "nombre": "San Benito Abad",
   
    "departamentoId": 29
  
  },
  {
    "id": 1016,
    "nombre": "San Marcos",
   
    "departamentoId": 29
  
  },
  {
    "id": 1017,
    "nombre": "San Onofre",
   
    "departamentoId": 29
  
  },
  {
    "id": 1018,
    "nombre": "San Pedro",
   
    "departamentoId": 29
  
  },
  {
    "id": 1019,
    "nombre": "Sucre",
   
    "departamentoId": 29
  
  },
  {
    "id": 1020,
    "nombre": "Tolú Viejo",
   
    "departamentoId": 29
  
  },
  {
    "id": 1021,
    "nombre": "San Luis de Sincé",
   
    "departamentoId": 29
  
  },
  {
    "id": 1022,
    "nombre": "San Juan de Betulia",
   
    "departamentoId": 29
  
  },
  {
    "id": 1023,
    "nombre": "Santiago de Tolú",
   
    "departamentoId": 29
  
  },
  {
    "id": 1024,
    "nombre": "Sampués",
   
    "departamentoId": 29
  
  },
  {
    "id": 1025,
    "nombre": "Corozal",
   
    "departamentoId": 29
  
  },
  {
    "id": 1026,
    "nombre": "Alpujarra",
   
    "departamentoId": 30
  
  },
  {
    "id": 1027,
    "nombre": "Alvarado",
   
    "departamentoId": 30
  
  },
  {
    "id": 1028,
    "nombre": "Ambalema",
   
    "departamentoId": 30
  
  },
  {
    "id": 1029,
    "nombre": "Armero",
   
    "departamentoId": 30
  
  },
  {
    "id": 1030,
    "nombre": "Ataco",
   
    "departamentoId": 30
  
  },
  {
    "id": 1031,
    "nombre": "Cajamarca",
   
    "departamentoId": 30
  
  },
  {
    "id": 1032,
    "nombre": "Chaparral",
   
    "departamentoId": 30
  
  },
  {
    "id": 1033,
    "nombre": "Coello",
   
    "departamentoId": 30
  
  },
  {
    "id": 1034,
    "nombre": "Coyaima",
   
    "departamentoId": 30
  
  },
  {
    "id": 1035,
    "nombre": "Cunday",
   
    "departamentoId": 30
  
  },
  {
    "id": 1036,
    "nombre": "Dolores",
   
    "departamentoId": 30
  
  },
  {
    "id": 1037,
    "nombre": "Espinal",
    "description": "El Espinal es un municipio colombiano ubicado en el departamento de Tolima, a 153 km de Bogotá con dirección suroccidente, y a 57,6 km de Ibagué, capital departamental; es el segundo municipio más poblado del departamento del Tolima y es conocido como la capital arrocera del centro del país.",
    "surface": 231,
    "population": 76056,
    "postalCode": "733520",
    "departamentoId": 30
  
  },
  {
    "id": 1038,
    "nombre": "Falan",
   
    "departamentoId": 30
  
  },
  {
    "id": 1039,
    "nombre": "Flandes",
   
    "departamentoId": 30
  
  },
  {
    "id": 1040,
    "nombre": "Fresno",
   
    "departamentoId": 30
  
  },
  {
    "id": 1041,
    "nombre": "Guamo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1042,
    "nombre": "Herveo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1043,
    "nombre": "Honda",
   
    "departamentoId": 30
  
  },
  {
    "id": 1044,
    "nombre": "Icononzo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1045,
    "nombre": "Mariquita",
   
    "departamentoId": 30
  
  },
  {
    "id": 1046,
    "nombre": "Melgar",
   
    "departamentoId": 30
  
  },
  {
    "id": 1047,
    "nombre": "Murillo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1048,
    "nombre": "Natagaima",
   
    "departamentoId": 30
  
  },
  {
    "id": 1049,
    "nombre": "Ortega",
   
    "departamentoId": 30
  
  },
  {
    "id": 1050,
    "nombre": "Palocabildo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1051,
    "nombre": "Piedras",
   
    "departamentoId": 30
  
  },
  {
    "id": 1052,
    "nombre": "Planadas",
   
    "departamentoId": 30
  
  },
  {
    "id": 1053,
    "nombre": "Prado",
   
    "departamentoId": 30
  
  },
  {
    "id": 1054,
    "nombre": "Purificación",
   
    "departamentoId": 30
  
  },
  {
    "id": 1055,
    "nombre": "Rio Blanco",
   
    "departamentoId": 30
  
  },
  {
    "id": 1056,
    "nombre": "Roncesvalles",
   
    "departamentoId": 30
  
  },
  {
    "id": 1057,
    "nombre": "Rovira",
   
    "departamentoId": 30
  
  },
  {
    "id": 1058,
    "nombre": "Saldaña",
   
    "departamentoId": 30
  
  },
  {
    "id": 1059,
    "nombre": "Santa Isabel",
   
    "departamentoId": 30
  
  },
  {
    "id": 1060,
    "nombre": "Venadillo",
   
    "departamentoId": 30
  
  },
  {
    "id": 1061,
    "nombre": "Villahermosa",
   
    "departamentoId": 30
  
  },
  {
    "id": 1062,
    "nombre": "Villarrica",
   
    "departamentoId": 30
  
  },
  {
    "id": 1063,
    "nombre": "Valle de San Juan",
   
    "departamentoId": 30
  
  },
  {
    "id": 1064,
    "nombre": "Carmen de Apicala",
   
    "departamentoId": 30
  
  },
  {
    "id": 1065,
    "nombre": "San Luis",
   
    "departamentoId": 30
  
  },
  {
    "id": 1066,
    "nombre": "San Antonio",
   
    "departamentoId": 30
  
  },
  {
    "id": 1067,
    "nombre": "Casabianca",
   
    "departamentoId": 30
  
  },
  {
    "id": 1068,
    "nombre": "Anzoátegui",
   
    "departamentoId": 30
  
  },
  {
    "id": 1069,
    "nombre": "Ibagué",
    "description": "Ibagué es un municipio colombiano ubicado en el centro-occidente de Colombia, sobre la Cordillera Central de los Andes entre el Cañón del Combeima y el Valle del Magdalena, en cercanías del Nevado del Tolima. Es la capital del departamento de Tolima. Se encuentra a una altitud promedio de 1285",
    "surface": 1439,
    "population": 541101,
    "postalCode": "730001",
    "departamentoId": 30
  
  },
  {
    "id": 1070,
    "nombre": "Líbano",
   
    "departamentoId": 30
  
  },
  {
    "id": 1071,
    "nombre": "Lérida",
   
    "departamentoId": 30
  
  },
  {
    "id": 1072,
    "nombre": "Suárez",
   
    "departamentoId": 30
  
  },
  {
    "id": 1073,
    "nombre": "El Dovio",
   
    "departamentoId": 31
  
  },
  {
    "id": 1074,
    "nombre": "Roldanillo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1075,
    "nombre": "Argelia",
   
    "departamentoId": 31
  
  },
  {
    "id": 1076,
    "nombre": "Sevilla",
   
    "departamentoId": 31
  
  },
  {
    "id": 1077,
    "nombre": "Zarzal",
   
    "departamentoId": 31
  
  },
  {
    "id": 1078,
    "nombre": "El Cerrito",
   
    "departamentoId": 31
  
  },
  {
    "id": 1079,
    "nombre": "Cartago",
    "description": "Cartago es un municipio colombiano ubicado al norte del departamento del Valle del Cauca, que está localizado a orillas del río La Vieja y por el costado occidental de su territorio transcurre el río Cauca. Es conocido como La Villa de Robledo y también como La ciudad del Sol más alegre de Colombia. Fue fundado inicialmente en 1540 en el lugar donde hoy se encuentra la ciudad de Pereira",
    "surface": 279,
    "population": 134963,
    "postalCode": "762021",
    "departamentoId": 31
  
  },
  {
    "id": 1080,
    "nombre": "Caicedonia",
   
    "departamentoId": 31
  
  },
  {
    "id": 1081,
    "nombre": "El Cairo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1082,
    "nombre": "La Unión",
   
    "departamentoId": 31
  
  },
  {
    "id": 1083,
    "nombre": "Restrepo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1084,
    "nombre": "Dagua",
   
    "departamentoId": 31
  
  },
  {
    "id": 1085,
    "nombre": "Guacarí",
   
    "departamentoId": 31
  
  },
  {
    "id": 1086,
    "nombre": "Ansermanuevo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1087,
    "nombre": "Bugalagrande",
   
    "departamentoId": 31
  
  },
  {
    "id": 1088,
    "nombre": "La Victoria",
   
    "departamentoId": 31
  
  },
  {
    "id": 1089,
    "nombre": "Ginebra",
   
    "departamentoId": 31
  
  },
  {
    "id": 1090,
    "nombre": "Yumbo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1091,
    "nombre": "Obando",
   
    "departamentoId": 31
  
  },
  {
    "id": 1092,
    "nombre": "Bolívar",
   
    "departamentoId": 31
  
  },
  {
    "id": 1093,
    "nombre": "Cali",
    "description": "Cali, oficialmente Distrito Especial, Deportivo, Cultural, Turístico, Empresarial y de Servicios de Santiago de Cali,8​9​10​ es un distrito colombiano, capital del departamento de Valle del Cauca,2​ la tercera ciudad más poblada y el tercer centro económico y cultural de Colombia. Está situada en la región Sur del Valle del Cauca.",
    "surface": 619,
    "population": 2545682,
    "postalCode": "760000",
    "departamentoId": 31
  
  },
  {
    "id": 1094,
    "nombre": "San Pedro",
   
    "departamentoId": 31
  
  },
  {
    "id": 1095,
    "nombre": "Guadalajara de Buga",
   
    "departamentoId": 31
  
  },
  {
    "id": 1096,
    "nombre": "Calima",
   
    "departamentoId": 31
  
  },
  {
    "id": 1097,
    "nombre": "Andalucía",
   
    "departamentoId": 31
  
  },
  {
    "id": 1098,
    "nombre": "Pradera",
   
    "departamentoId": 31
  
  },
  {
    "id": 1099,
    "nombre": "Yotoco",
   
    "departamentoId": 31
  
  },
  {
    "id": 1100,
    "nombre": "Palmira",
    "description": "Palmira es un municipio colombiano del departamento del Valle del Cauca en Colombia; localizado en la región sur del departamento. Es conocido como La Villa de las Palmas.",
    "surface": 1123,
    "population": 310608,
    "postalCode": "763531",
    "departamentoId": 31
  
  },
  {
    "id": 1101,
    "nombre": "Riofrío",
   
    "departamentoId": 31
  
  },
  {
    "id": 1102,
    "nombre": "Alcalá",
   
    "departamentoId": 31
  
  },
  {
    "id": 1103,
    "nombre": "Versalles",
   
    "departamentoId": 31
  
  },
  {
    "id": 1104,
    "nombre": "El Águila",
   
    "departamentoId": 31
  
  },
  {
    "id": 1105,
    "nombre": "Toro",
   
    "departamentoId": 31
  
  },
  {
    "id": 1106,
    "nombre": "Candelaria",
   
    "departamentoId": 31
  
  },
  {
    "id": 1107,
    "nombre": "La Cumbre",
   
    "departamentoId": 31
  
  },
  {
    "id": 1108,
    "nombre": "Ulloa",
   
    "departamentoId": 31
  
  },
  {
    "id": 1109,
    "nombre": "Trujillo",
   
    "departamentoId": 31
  
  },
  {
    "id": 1110,
    "nombre": "Vijes",
   
    "departamentoId": 31
  
  },
  {
    "id": 1111,
    "nombre": "Tuluá",
    "description": "Tuluá es un municipio colombiano ubicado en la región central del departamento del Valle del Cauca.3​ Es un motor comercial, demográfico, cultural, industrial, financiero y agropecuario del centro del departamento. Posee una cámara de comercio y es el cuarto municipio más poblado del Valle del Cauca",
    "surface": 910,
    "population": 218812,
    "postalCode": "764501",
    "departamentoId": 31
  
  },
  {
    "id": 1112,
    "nombre": "Florida",
   
    "departamentoId": 31
  
  },
  {
    "id": 1113,
    "nombre": "Jamundí",
   
    "departamentoId": 31
  
  },
  {
    "id": 1114,
    "nombre": "Buenaventura",
    "description": "Buenaventura, oficialmente Distrito Especial, Industrial, Portuario, Biodiverso y Ecoturístico de Buenaventura, es un distrito, una ciudad y el principal puerto marítimo de Colombia y uno de los diez puertos más importantes de América Latina; se estima que Buenaventura mueve más del 53 % del comercio internacional del país",
    "surface": 6078,
    "population": 308188,
    "postalCode": "764501",
    "departamentoId": 31
  
  },
  {
    "id": 1115,
    "nombre": "Mitú",
    "description": "Mitú es la capital del departamento del Vaupés, ubicado en la parte suroriental de Colombia y sobre la frontera con Brasil. El municipio se localiza predominantemente sobre la margen derecha del río Vaupés. Con cerca de 16.422 km², según el censo del DANE, y con una población aproximada de 16.580 habitantes, en donde predominan 27 etnias indígenas diferentes",
    "surface": 16422,
    "population": 31568,
    "postalCode": "970001",
    "departamentoId": 32
  
  },
  {
    "id": 1116,
    "nombre": "Carurú",
   
    "departamentoId": 32
  
  },
  {
    "id": 1117,
    "nombre": "Taraira",
   
    "departamentoId": 32
  
  },
  {
    "id": 1118,
    "nombre": "Papunahua",
   
    "departamentoId": 32
  
  },
  {
    "id": 1119,
    "nombre": "Yavaraté",
   
    "departamentoId": 32
  
  },
  {
    "id": 1120,
    "nombre": "Pacoa",
   
    "departamentoId": 32
  
  },
  {
    "id": 1121,
    "nombre": "Puerto Carreño",
    "description": "Puerto Carreño es un municipio colombiano, capital del departamento de Vichada. Su población es de 15.753 habitantes, su área de 12.409 km² y está sobre la frontera con Venezuela, colindando al norte del río Meta con Puerto Páez. Fue fundada en 1922, sobre la confluencia de los ríos Orinoco y Meta;",
    "surface": 12409,
    "population": 15753,
    "postalCode": "990001",
    "departamentoId": 33
  
  },
  {
    "id": 1122,
    "nombre": "La Primavera",
   
    "departamentoId": 33
  
  },
  {
    "id": 1123,
    "nombre": "Santa Rosalía",
   
    "departamentoId": 33
  
  },
  {
    "id": 1124,
    "nombre": "Cumaribo",
   
    "departamentoId": 33
  
  }
];

const insertCiudades = async () => {
    try {
        await sequelize.sync();
        await Ciudad.bulkCreate(ciudades, { ignoreDuplicates: true });
        console.log("Ciudades creadas exitosamente");
    } catch (error) {
        console.error("Error al crear las ciudades:", error);
    }
};


export { insertCiudades };
export default insertCiudades;