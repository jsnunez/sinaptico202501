import User from '../models/user.js'; // Asegúrate de que la ruta sea correcta
import sequelize from '../config/database.js';
import Departamento from '../models/departamento.js';
import Ciudad from '../models/ciudad.js';
import Cargo from '../models/cargo.js';

const usuarios = [
  {
    name: "Juan Pérez",
    email: "1@g.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567890",
  },
  {
    name: "Ana López",
    email: "2@g.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567891",
  },
  {
    name: "Carlos Ruiz",
    email: "3@g.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567892",
  },
  {
    name: "Marta García",
    email: "marta@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567893",
  },
  {
    name: "Luis Fernández",
    email: "luis@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567894",
  },
  {
    name: "Elena Rodríguez",
    email: "elena@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567895",
  },
  {
    name: "Pedro Morales",
    email: "pedro@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567896",
  },
  {
    name: "Laura Torres",
    email: "laura@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567897",
  },
  {
    name: "Jorge Navarro",
    email: "jorge@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567898",
  },
  {
    name: "Sofía Ríos",
    email: "sofia@example.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567899",
  },
  {
    name: "Sofía s",
    email: "a@a.com",
    password: "$2a$10$AddWeiFday0rK0ssviY.OuFTzcmXvK31tYBdlFh7UNBGhAcESQ9sK",
    telefono: "1234567899",
  }
];

const insertUsers = async () => {
  try {
    await sequelize.sync(); // sincroniza los modelos con la base de datos
    await User.bulkCreate(usuarios);
    console.log("Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear los usuarios:", error);
  }
};




const departamentos = [
    { id: 3, name: "Arauca" },
    { id: 4, name: "Atlántico" },
    { id: 5, name: "Bogotá" },
    { id: 15, name: "Cundinamarca" },
    { id: 6, name: "Bolívar" },
    { id: 7, name: "Boyacá" },
    { id: 8, name: "Caldas" },
    { id: 9, name: "Caquetá" },
    { id: 10, name: "Casanare" },
    { id: 11, name: "Cauca" },
    { id: 12, name: "Cesar" },
    { id: 13, name: "Chocó" },
    { id: 14, name: "Córdoba" },
    { id: 16, name: "Guainía" },
    { id: 17, name: "Guaviare" },
    { id: 18, name: "Huila" },
    { id: 19, name: "La Guajira" },
    { id: 20, name: "Magdalena" },
    { id: 1, name: "Amazonas" },
    { id: 2, name: "Antioquia" },
    { id: 21, name: "Meta" },
    { id: 22, name: "Nariño" },
    { id: 25, name: "Quindío" },
    { id: 23, name: "Norte de Santander" },
    { id: 24, name: "Putumayo" },
    { id: 26, name: "Risaralda" },
    { id: 27, name: "San Andrés y Providencia" },
    { id: 28, name: "Santander" },
    { id: 29, name: "Sucre" },
    { id: 30, name: "Tolima" },
    { id: 31, name: "Valle del Cauca" },
    { id: 32, name: "Vaupés" },
    { id: 33, name: "Vichada" }
];

const insertDepartamentos = async () => {
    try {
        await sequelize.sync();
        await Departamento.bulkCreate(departamentos, { ignoreDuplicates: true });
        console.log("Departamentos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los departamentos:", error);
    }
};

const ciudades = [
  
  {
    "id": 87,
    "name": "Puerto Nare",
   
    "departmentId": 2
  
  },
  {
    "id": 88,
    "name": "Puerto Triunfo",
   
    "departmentId": 2
  
  },
  {
    "id": 89,
    "name": "Remedios",
   
    "departmentId": 2
  
  },
  {
    "id": 90,
    "name": "Retiro",
   
    "departmentId": 2
  
  },
  {
    "id": 91,
    "name": "Rionegro",
    "description": "Rionegro es un municipio de Colombia, ubicado en el departamento de Antioquia. Está localizado en el valle de San Nicolás o también llamado Altiplano del Oriente, en la subregión Oriente, siendo la ciudad con mayor población y la que concentra el movimiento económico de la subregión. Está ubicada a tan solo 35 minutos de Medellín, capital del departamento, gracias al túnel de interconexión Aburrá-Oriente. Su nombre oficial es Ciudad Santiago de Arma de Rionegro.",
    "surface": 196,
    "population": 135465,
    "postalCode": "54040",
    "departmentId": 2
  
  },
  {
    "id": 92,
    "name": "Sabanalarga",
   
    "departmentId": 2
  
  },
  {
    "id": 93,
    "name": "Sabaneta",
   
    "departmentId": 2
  
  },
  {
    "id": 94,
    "name": "Salgar",
   
    "departmentId": 2
  
  },
  {
    "id": 95,
    "name": "San Francisco",
   
    "departmentId": 2
  
  },
  {
    "id": 96,
    "name": "San Jerónimo",
   
    "departmentId": 2
  
  },
  {
    "id": 97,
    "name": "San Luis",
   
    "departmentId": 2
  
  },
  {
    "id": 98,
    "name": "San Pedro",
   
    "departmentId": 2
  
  },
  {
    "id": 99,
    "name": "San Rafael",
   
    "departmentId": 2
  
  },
  {
    "id": 100,
    "name": "San Roque",
   
    "departmentId": 2
  
  },
  {
    "id": 101,
    "name": "San Vicente",
   
    "departmentId": 2
  
  },
  {
    "id": 102,
    "name": "Santa Bárbara",
   
    "departmentId": 2
  
  },
  {
    "id": 103,
    "name": "Santo Domingo",
   
    "departmentId": 2
  
  },
  {
    "id": 104,
    "name": "El Santuario",
   
    "departmentId": 2
  
  },
  {
    "id": 105,
    "name": "Segovia",
   
    "departmentId": 2
  
  },
  {
    "id": 106,
    "name": "Sopetrán",
   
    "departmentId": 2
  
  },
  {
    "id": 107,
    "name": "Támesis",
   
    "departmentId": 2
  
  },
  {
    "id": 108,
    "name": "Tarazá",
   
    "departmentId": 2
  
  },
  {
    "id": 109,
    "name": "Tarso",
   
    "departmentId": 2
  
  },
  {
    "id": 110,
    "name": "Titiribí",
   
    "departmentId": 2
  
  },
  {
    "id": 111,
    "name": "Toledo",
   
    "departmentId": 2
  
  },
  {
    "id": 112,
    "name": "Turbo",
    "description": "Turbo es un distrito de Colombia localizado en la subregión de Urabá en el departamento de Antioquia. Fue declarado por ley de la república 1883 de 2018 distrito especial portuario, logístico, industrial, turístico y comercial.",
    "surface": 3055,
    "population": 124552,
    "postalCode": "57860",
    "departmentId": 2
  
  },
  {
    "id": 113,
    "name": "Uramita",
   
    "departmentId": 2
  
  },
  {
    "id": 114,
    "name": "Urrao",
   
    "departmentId": 2
  
  },
  {
    "id": 115,
    "name": "Valdivia",
   
    "departmentId": 2
  
  },
  {
    "id": 116,
    "name": "Valparaíso",
   
    "departmentId": 2
  
  },
  {
    "id": 117,
    "name": "Vegachí",
   
    "departmentId": 2
  
  },
  {
    "id": 118,
    "name": "Venecia",
   
    "departmentId": 2
  
  },
  {
    "id": 119,
    "name": "Yalí",
   
    "departmentId": 2
  
  },
  {
    "id": 120,
    "name": "Yarumal",
   
    "departmentId": 2
  
  },
  {
    "id": 121,
    "name": "Yolombó",
   
    "departmentId": 2
  
  },
  {
    "id": 122,
    "name": "Yondó",
   
    "departmentId": 2
  
  },
  {
    "id": 123,
    "name": "Zaragoza",
   
    "departmentId": 2
  
  },
  {
    "id": 124,
    "name": "San Pedro de Uraba",
   
    "departmentId": 2
  
  },
  {
    "id": 125,
    "name": "Santafé de Antioquia",
   
    "departmentId": 2
  
  },
  {
    "id": 126,
    "name": "Santa Rosa de Osos",
   
    "departmentId": 2
  
  },
  {
    "id": 127,
    "name": "San Andrés de Cuerquía",
   
    "departmentId": 2
  
  },
  {
    "id": 128,
    "name": "Vigía del Fuerte",
   
    "departmentId": 2
  
  },
  {
    "id": 129,
    "name": "San José de La Montaña",
   
    "departmentId": 2
  
  },
  {
    "id": 130,
    "name": "San Juan de Urabá",
   
    "departmentId": 2
  
  },
  {
    "id": 131,
    "name": "El Carmen de Viboral",
   
    "departmentId": 2
  
  },
  {
    "id": 132,
    "name": "San Carlos",
   
    "departmentId": 2
  
  },
  {
    "id": 133,
    "name": "Frontino",
   
    "departmentId": 2
  
  },
  {
    "id": 134,
    "name": "Granada",
   
    "departmentId": 2
  
  },
  {
    "id": 135,
    "name": "Jardín",
   
    "departmentId": 2
  
  },
  {
    "id": 136,
    "name": "Sonsón",
   
    "departmentId": 2
  
  },
  {
    "id": 137,
    "name": "Arauquita",
   
    "departmentId": 3
  
  },
  {
    "id": 138,
    "name": "Cravo Norte",
   
    "departmentId": 3
  
  },
  {
    "id": 139,
    "name": "Fortul",
   
    "departmentId": 3
  
  },
  {
    "id": 140,
    "name": "Puerto Rondón",
   
    "departmentId": 3
  
  },
  {
    "id": 141,
    "name": "Saravena",
   
    "departmentId": 3
  
  },
  {
    "id": 142,
    "name": "Tame",
   
    "departmentId": 3
  
  },
  {
    "id": 143,
    "name": "Arauca",
    "description": "Arauca, cuyo nombre colonial es Villa de Santa Bárbara de Arauca, es un municipio colombiano, capital del departamento de Arauca. Está localizado sobre el margen sur del río Arauca. Limita con Venezuela al norte, con la cual está conectada mediante el Puente Internacional José Antonio Páez y se comunica por vía terrestre hacia el centro de Colombia mediante la Ruta de los Libertadores",
    "surface": 5841,
    "population": 96814,
    "postalCode": "810001",
    "departmentId": 3
  
  },
  {
    "id": 144,
    "name": "Barranquilla",
    "description": "El Área metropolitana de Barranquilla es una conurbación colombiana ubicada en el norte del departamento de Atlántico. Su municipio principal es la capital departamental Barranquilla, y los otros municipios periféricos que la integran son Soledad, Galapa, Puerto Colombia y Malambo. Es la primera conurbación de la Región Caribe, la más densamente poblada y la cuarta del país.",
    "surface": 520,
    "population": 2326292,
    "postalCode": "80001",
    "departmentId": 4
  
  },
  {
    "id": 145,
    "name": "Baranoa",
   
    "departmentId": 4
  
  },
  {
    "id": 146,
    "name": "Candelaria",
   
    "departmentId": 4
  
  },
  {
    "id": 147,
    "name": "Galapa",
   
    "departmentId": 4
  
  },
  {
    "id": 148,
    "name": "Luruaco",
   
    "departmentId": 4
  
  },
  {
    "id": 149,
    "name": "Malambo",
   
    "departmentId": 4
  
  },
  {
    "id": 150,
    "name": "Manatí",
   
    "departmentId": 4
  
  },
  {
    "id": 151,
    "name": "Piojó",
   
    "departmentId": 4
  
  },
  {
    "id": 152,
    "name": "Polonuevo",
   
    "departmentId": 4
  
  },
  {
    "id": 153,
    "name": "Sabanagrande",
   
    "departmentId": 4
  
  },
  {
    "id": 154,
    "name": "Sabanalarga",
    "description": "Sabanalarga es un municipio colombiano ubicado en el departamento del Atlántico, y ubicado en la costa caribe de Colombia.",
    "surface": 399,
    "population": 100328,
    "postalCode": "57020",
    "departmentId": 4
  
  },
  {
    "id": 155,
    "name": "Santa Lucía",
   
    "departmentId": 4
  
  },
  {
    "id": 156,
    "name": "Santo Tomás",
   
    "departmentId": 4
  
  },
  {
    "id": 157,
    "name": "Soledad",
   
    "departmentId": 4
  
  },
  {
    "id": 158,
    "name": "Suan",
   
    "departmentId": 4
  
  },
  {
    "id": 159,
    "name": "Tubará",
   
    "departmentId": 4
  
  },
  {
    "id": 160,
    "name": "Usiacurí",
   
    "departmentId": 4
  
  },
  {
    "id": 161,
    "name": "Juan de Acosta",
   
    "departmentId": 4
  
  },
  {
    "id": 162,
    "name": "Palmar de Varela",
   
    "departmentId": 4
  
  },
  {
    "id": 163,
    "name": "Campo de La Cruz",
   
    "departmentId": 4
  
  },
  {
    "id": 164,
    "name": "Repelón",
   
    "departmentId": 4
  
  },
  {
    "id": 165,
    "name": "Puerto Colombia",
   
    "departmentId": 4
  
  },
  {
    "id": 166,
    "name": "Ponedera",
   
    "departmentId": 4
  
  },
  {
    "id": 167,
    "name": "Bogotá D.C.",
    "description": "Bogotá, oficialmente Bogotá, Distrito Capital​ (antiguamente, Santafé de Bogotá y originalmente, Santafé),​ es la capital de la República de Colombia y del departamento de Cundinamarca. Está administrada como distrito capital, y goza de autonomía para la gestión de sus intereses dentro de los límites de la Constitución y la ley.12​18​ A diferencia de los demás distritos de Colombia, Bogotá es una entidad territorial de primer orden, con las atribuciones administrativas que la ley confiere a los departamentos",
    "surface": 1636,
    "population": 7901653,
    "postalCode": "110110",
    "departmentId": 5
  
  },
  {
    "id": 168,
    "name": "Achí",
   
    "departmentId": 6
  
  },
  {
    "id": 169,
    "name": "Arenal",
   
    "departmentId": 6
  
  },
  {
    "id": 170,
    "name": "Arjona",
   
    "departmentId": 6
  
  },
  {
    "id": 171,
    "name": "Arroyohondo",
   
    "departmentId": 6
  
  },
  {
    "id": 172,
    "name": "Calamar",
   
    "departmentId": 6
  
  },
  {
    "id": 173,
    "name": "Cantagallo",
   
    "departmentId": 6
  
  },
  {
    "id": 174,
    "name": "Cicuco",
   
    "departmentId": 6
  
  },
  {
    "id": 175,
    "name": "Córdoba",
   
    "departmentId": 6
  
  },
  {
    "id": 176,
    "name": "Clemencia",
   
    "departmentId": 6
  
  },
  {
    "id": 177,
    "name": "El Guamo",
   
    "departmentId": 6
  
  },
  {
    "id": 178,
    "name": "Magangué",
    "description": "Magangué es un municipio colombiano localizado a orillas del río Magdalena, en el departamento de Bolívar. Este municipio bolivarense es conocido como \"La Ciudad de los Ríos\", ya que en este lugar del país desembocan los ríos Cauca y San Jorge en el Magdalena. Fue fundado en 1610 por Diego de Carvajal, y refundada un 28 de octubre de 1776 por el militar español Antonio de la Torre y Miranda.",
    "surface": 1568,
    "population": 128000,
    "postalCode": "132511",
    "departmentId": 6
  
  },
  {
    "id": 179,
    "name": "Mahates",
   
    "departmentId": 6
  
  },
  {
    "id": 180,
    "name": "Margarita",
   
    "departmentId": 6
  
  },
  {
    "id": 181,
    "name": "Montecristo",
   
    "departmentId": 6
  
  },
  {
    "id": 182,
    "name": "Mompós",
   
    "departmentId": 6
  
  },
  {
    "id": 183,
    "name": "Morales",
   
    "departmentId": 6
  
  },
  {
    "id": 184,
    "name": "Norosí",
   
    "departmentId": 6
  
  },
  {
    "id": 185,
    "name": "Pinillos",
   
    "departmentId": 6
  
  },
  {
    "id": 186,
    "name": "Regidor",
   
    "departmentId": 6
  
  },
  {
    "id": 187,
    "name": "Río Viejo",
   
    "departmentId": 6
  
  },
  {
    "id": 188,
    "name": "San Estanislao",
   
    "departmentId": 6
  
  },
  {
    "id": 189,
    "name": "San Fernando",
   
    "departmentId": 6
  
  },
  {
    "id": 190,
    "name": "San Juan Nepomuceno",
   
    "departmentId": 6
  
  },
  {
    "id": 191,
    "name": "Santa Catalina",
   
    "departmentId": 6
  
  },
  {
    "id": 192,
    "name": "Santa Rosa",
   
    "departmentId": 6
  
  },
  {
    "id": 193,
    "name": "Simití",
   
    "departmentId": 6
  
  },
  {
    "id": 194,
    "name": "Soplaviento",
   
    "departmentId": 6
  
  },
  {
    "id": 195,
    "name": "Talaigua Nuevo",
   
    "departmentId": 6
  
  },
  {
    "id": 196,
    "name": "Tiquisio",
   
    "departmentId": 6
  
  },
  {
    "id": 197,
    "name": "Turbaco",
   
    "departmentId": 6
  
  },
  {
    "id": 198,
    "name": "Turbaná",
   
    "departmentId": 6
  
  },
  {
    "id": 199,
    "name": "Villanueva",
   
    "departmentId": 6
  
  },
  {
    "id": 200,
    "name": "Barranco de Loba",
   
    "departmentId": 6
  
  },
  {
    "id": 201,
    "name": "Santa Rosa del Sur",
   
    "departmentId": 6
  
  },
  {
    "id": 202,
    "name": "Hatillo de Loba",
   
    "departmentId": 6
  
  },
  {
    "id": 203,
    "name": "El Carmen de Bolívar",
    "description": "El Carmen de Bolívar es un municipio del departamento de Bolívar, Colombia, ubicado en el sistema orográfico de los Montes de María, siendo la población más grande, así como la que concentra el movimiento económico y comercial de la subregión. Está a 120 km al sudeste de Cartagena de Indias y a 69 km al norte de Sincelejo.",
    "surface": 954,
    "population": 70131,
    "postalCode": "132050",
    "departmentId": 6
  
  },
  {
    "id": 204,
    "name": "San Martín de Loba",
   
    "departmentId": 6
  
  },
  {
    "id": 205,
    "name": "Altos del Rosario",
   
    "departmentId": 6
  
  },
  {
    "id": 206,
    "name": "San Jacinto del Cauca",
   
    "departmentId": 6
  
  },
  {
    "id": 207,
    "name": "San Pablo de Borbur",
   
    "departmentId": 6
  
  },
  {
    "id": 208,
    "name": "San Jacinto",
   
    "departmentId": 6
  
  },
  {
    "id": 209,
    "name": "El Peñón",
   
    "departmentId": 6
  
  },
  {
    "id": 210,
    "name": "Cartagena",
    "description": "Cartagena de Indias, oficialmente Distrito Turístico y Cultural de Cartagena de Indias (abreviado Cartagena de Indias, D. T. y C.), es la capital del departamento de Bolívar, al norte de Colombia.6​ Fue fundada el 1 de junio de 1533 por Pedro de Heredia.7​ Desde 1991 Cartagena es un Distrito Turístico y Cultural.8​ La ciudad está ubicada a orillas del mar Caribe",
    "surface": 609,
    "population": 1028736,
    "postalCode": "130000",
    "departmentId": 6
  
  },
  {
    "id": 211,
    "name": "María la Baja",
   
    "departmentId": 6
  
  },
  {
    "id": 212,
    "name": "San Cristóbal",
   
    "departmentId": 6
  
  },
  {
    "id": 213,
    "name": "Zambrano",
   
    "departmentId": 6
  
  },
  {
    "id": 214,
    "name": "Tununguá",
   
    "departmentId": 7
  
  },
  {
    "id": 215,
    "name": "Motavita",
   
    "departmentId": 7
  
  },
  {
    "id": 216,
    "name": "Ciénega",
   
    "departmentId": 7
  
  },
  {
    "id": 217,
    "name": "Tunja",
    "description": "Tunja es un municipio colombiano, capital del departamento de Boyacá, situado sobre la cordillera oriental de los Andes a 115 km al noreste de Bogotá. Es la ciudad capital más alta del país. Tunja fue construida sobre Hunza, la capital de la confederación Muisca el 6 de agosto de 1539. Con su título de villa otorgado por la corona española",
    "surface": 121,
    "population": 180568,
    "postalCode": "150001",
    "departmentId": 7
  
  },
  {
    "id": 218,
    "name": "Almeida",
   
    "departmentId": 7
  
  },
  {
    "id": 219,
    "name": "Aquitania",
   
    "departmentId": 7
  
  },
  {
    "id": 220,
    "name": "Arcabuco",
   
    "departmentId": 7
  
  },
  {
    "id": 221,
    "name": "Berbeo",
   
    "departmentId": 7
  
  },
  {
    "id": 222,
    "name": "Betéitiva",
   
    "departmentId": 7
  
  },
  {
    "id": 223,
    "name": "Boavita",
   
    "departmentId": 7
  
  },
  {
    "id": 224,
    "name": "Boyacá",
   
    "departmentId": 7
  
  },
  {
    "id": 225,
    "name": "Briceño",
   
    "departmentId": 7
  
  },
  {
    "id": 226,
    "name": "Buena Vista",
   
    "departmentId": 7
  
  },
  {
    "id": 227,
    "name": "Busbanzá",
   
    "departmentId": 7
  
  },
  {
    "id": 228,
    "name": "Caldas",
   
    "departmentId": 7
  
  },
  {
    "id": 229,
    "name": "Campohermoso",
   
    "departmentId": 7
  
  },
  {
    "id": 230,
    "name": "Cerinza",
   
    "departmentId": 7
  
  },
  {
    "id": 231,
    "name": "Chinavita",
   
    "departmentId": 7
  
  },
  {
    "id": 232,
    "name": "Chiquinquirá",
   
    "departmentId": 7
  
  },
  {
    "id": 233,
    "name": "Chiscas",
   
    "departmentId": 7
  
  },
  {
    "id": 234,
    "name": "Chita",
   
    "departmentId": 7
  
  },
  {
    "id": 235,
    "name": "Chitaraque",
   
    "departmentId": 7
  
  },
  {
    "id": 236,
    "name": "Chivatá",
   
    "departmentId": 7
  
  },
  {
    "id": 237,
    "name": "Cómbita",
   
    "departmentId": 7
  
  },
  {
    "id": 238,
    "name": "Coper",
   
    "departmentId": 7
  
  },
  {
    "id": 239,
    "name": "Corrales",
   
    "departmentId": 7
  
  },
  {
    "id": 240,
    "name": "Covarachía",
   
    "departmentId": 7
  
  },
  {
    "id": 241,
    "name": "Cubará",
   
    "departmentId": 7
  
  },
  {
    "id": 242,
    "name": "Cucaita",
   
    "departmentId": 7
  
  },
  {
    "id": 243,
    "name": "Cuítiva",
   
    "departmentId": 7
  
  },
  {
    "id": 244,
    "name": "Chíquiza",
   
    "departmentId": 7
  
  },
  {
    "id": 245,
    "name": "Chivor",
   
    "departmentId": 7
  
  },
  {
    "id": 246,
    "name": "Duitama",
    "description": "Duitama es un municipio colombiano, ubicado en el departamento de Boyacá, en el centro-oriente de Colombia, en la región del Alto Chicamocha. Es la capital y centro urbano de mayor tamaño en la provincia del Tundama. Se le conoce como \"La Capital Cívica de Boyacá\" y \"La Perla de Boyacá\". Es el puerto transportador terrestre más importante del oriente colombiano",
    "surface": 266,
    "population": 126670,
    "postalCode": "150461",
    "departmentId": 7
  
  },
  {
    "id": 247,
    "name": "El Cocuy",
   
    "departmentId": 7
  
  },
  {
    "id": 248,
    "name": "El Espino",
   
    "departmentId": 7
  
  },
  {
    "id": 249,
    "name": "Firavitoba",
   
    "departmentId": 7
  
  },
  {
    "id": 250,
    "name": "Floresta",
   
    "departmentId": 7
  
  },
  {
    "id": 251,
    "name": "Gachantivá",
   
    "departmentId": 7
  
  },
  {
    "id": 252,
    "name": "Gameza",
   
    "departmentId": 7
  
  },
  {
    "id": 253,
    "name": "Garagoa",
   
    "departmentId": 7
  
  },
  {
    "id": 254,
    "name": "Guacamayas",
   
    "departmentId": 7
  
  },
  {
    "id": 255,
    "name": "Guateque",
   
    "departmentId": 7
  
  },
  {
    "id": 256,
    "name": "Guayatá",
   
    "departmentId": 7
  
  },
  {
    "id": 257,
    "name": "Güicán",
   
    "departmentId": 7
  
  },
  {
    "id": 258,
    "name": "Iza",
   
    "departmentId": 7
  
  },
  {
    "id": 259,
    "name": "Jenesano",
   
    "departmentId": 7
  
  },
  {
    "id": 260,
    "name": "Jericó",
   
    "departmentId": 7
  
  },
  {
    "id": 261,
    "name": "Labranzagrande",
   
    "departmentId": 7
  
  },
  {
    "id": 262,
    "name": "La Capilla",
   
    "departmentId": 7
  
  },
  {
    "id": 263,
    "name": "La Victoria",
   
    "departmentId": 7
  
  },
  {
    "id": 264,
    "name": "Macanal",
   
    "departmentId": 7
  
  },
  {
    "id": 265,
    "name": "Maripí",
   
    "departmentId": 7
  
  },
  {
    "id": 266,
    "name": "Miraflores",
   
    "departmentId": 7
  
  },
  {
    "id": 267,
    "name": "Mongua",
   
    "departmentId": 7
  
  },
  {
    "id": 268,
    "name": "Monguí",
   
    "departmentId": 7
  
  },
  {
    "id": 269,
    "name": "Moniquirá",
   
    "departmentId": 7
  
  },
  {
    "id": 270,
    "name": "Muzo",
   
    "departmentId": 7
  
  },
  {
    "id": 271,
    "name": "Nobsa",
   
    "departmentId": 7
  
  },
  {
    "id": 272,
    "name": "Nuevo Colón",
   
    "departmentId": 7
  
  },
  {
    "id": 273,
    "name": "Oicatá",
   
    "departmentId": 7
  
  },
  {
    "id": 274,
    "name": "Otanche",
   
    "departmentId": 7
  
  },
  {
    "id": 275,
    "name": "Pachavita",
   
    "departmentId": 7
  
  },
  {
    "id": 276,
    "name": "Páez",
   
    "departmentId": 7
  
  },
  {
    "id": 277,
    "name": "Paipa",
   
    "departmentId": 7
  
  },
  {
    "id": 278,
    "name": "Pajarito",
   
    "departmentId": 7
  
  },
  {
    "id": 279,
    "name": "Panqueba",
   
    "departmentId": 7
  
  },
  {
    "id": 280,
    "name": "Pauna",
   
    "departmentId": 7
  
  },
  {
    "id": 281,
    "name": "Paya",
   
    "departmentId": 7
  
  },
  {
    "id": 282,
    "name": "Pesca",
   
    "departmentId": 7
  
  },
  {
    "id": 283,
    "name": "Pisba",
   
    "departmentId": 7
  
  },
  {
    "id": 284,
    "name": "Puerto Boyacá",
   
    "departmentId": 7
  
  },
  {
    "id": 285,
    "name": "Quípama",
   
    "departmentId": 7
  
  },
  {
    "id": 286,
    "name": "Ramiriquí",
   
    "departmentId": 7
  
  },
  {
    "id": 287,
    "name": "Ráquira",
   
    "departmentId": 7
  
  },
  {
    "id": 288,
    "name": "Rondón",
   
    "departmentId": 7
  
  },
  {
    "id": 289,
    "name": "Saboyá",
   
    "departmentId": 7
  
  },
  {
    "id": 290,
    "name": "Sáchica",
   
    "departmentId": 7
  
  },
  {
    "id": 291,
    "name": "Samacá",
   
    "departmentId": 7
  
  },
  {
    "id": 292,
    "name": "San Eduardo",
   
    "departmentId": 7
  
  },
  {
    "id": 293,
    "name": "San Mateo",
   
    "departmentId": 7
  
  },
  {
    "id": 294,
    "name": "Santana",
   
    "departmentId": 7
  
  },
  {
    "id": 295,
    "name": "Santa María",
   
    "departmentId": 7
  
  },
  {
    "id": 296,
    "name": "Santa Sofía",
   
    "departmentId": 7
  
  },
  {
    "id": 297,
    "name": "Sativanorte",
   
    "departmentId": 7
  
  },
  {
    "id": 298,
    "name": "Sativasur",
   
    "departmentId": 7
  
  },
  {
    "id": 299,
    "name": "Siachoque",
   
    "departmentId": 7
  
  },
  {
    "id": 300,
    "name": "Soatá",
   
    "departmentId": 7
  
  },
  {
    "id": 301,
    "name": "Socotá",
   
    "departmentId": 7
  
  },
  {
    "id": 302,
    "name": "Socha",
   
    "departmentId": 7
  
  },
  {
    "id": 303,
    "name": "Sogamoso",
    "description": "Sogamoso es un municipio colombiano situado en el centro-oriente del departamento de Boyacá en la región del Alto Chicamocha. Es la capital de la Provincia de Sugamuxi, se encuentra a 228,5 km al noreste de Bogotá, la capital del país, y a 75,8 km de Tunja, la capital del departamento. Posee una altitud de 2.569 m, tiene temperaturas promedio de 17 °C",
    "surface": 208,
    "population": 132059,
    "postalCode": "152210",
    "departmentId": 7
  
  },
  {
    "id": 304,
    "name": "Somondoco",
   
    "departmentId": 7
  
  },
  {
    "id": 305,
    "name": "Sora",
   
    "departmentId": 7
  
  },
  {
    "id": 306,
    "name": "Sotaquirá",
   
    "departmentId": 7
  
  },
  {
    "id": 307,
    "name": "Soracá",
   
    "departmentId": 7
  
  },
  {
    "id": 308,
    "name": "Susacón",
   
    "departmentId": 7
  
  },
  {
    "id": 309,
    "name": "Sutamarchán",
   
    "departmentId": 7
  
  },
  {
    "id": 310,
    "name": "Sutatenza",
   
    "departmentId": 7
  
  },
  {
    "id": 311,
    "name": "Tasco",
   
    "departmentId": 7
  
  },
  {
    "id": 312,
    "name": "Tenza",
   
    "departmentId": 7
  
  },
  {
    "id": 313,
    "name": "Tibaná",
   
    "departmentId": 7
  
  },
  {
    "id": 314,
    "name": "Tinjacá",
   
    "departmentId": 7
  
  },
  {
    "id": 315,
    "name": "Tipacoque",
   
    "departmentId": 7
  
  },
  {
    "id": 316,
    "name": "Toca",
   
    "departmentId": 7
  
  },
  {
    "id": 317,
    "name": "Tópaga",
   
    "departmentId": 7
  
  },
  {
    "id": 318,
    "name": "Tota",
   
    "departmentId": 7
  
  },
  {
    "id": 319,
    "name": "Turmequé",
   
    "departmentId": 7
  
  },
  {
    "id": 320,
    "name": "Tutazá",
   
    "departmentId": 7
  
  },
  {
    "id": 321,
    "name": "Umbita",
   
    "departmentId": 7
  
  },
  {
    "id": 322,
    "name": "Ventaquemada",
   
    "departmentId": 7
  
  },
  {
    "id": 323,
    "name": "Viracachá",
   
    "departmentId": 7
  
  },
  {
    "id": 324,
    "name": "Zetaquira",
   
    "departmentId": 7
  
  },
  {
    "id": 325,
    "name": "Togüí",
   
    "departmentId": 7
  
  },
  {
    "id": 326,
    "name": "Villa de Leyva",
   
    "departmentId": 7
  
  },
  {
    "id": 327,
    "name": "Paz de Río",
   
    "departmentId": 7
  
  },
  {
    "id": 328,
    "name": "Santa Rosa de Viterbo",
   
    "departmentId": 7
  
  },
  {
    "id": 329,
    "name": "San Pablo de Borbur",
   
    "departmentId": 7
  
  },
  {
    "id": 330,
    "name": "San Luis de Gaceno",
   
    "departmentId": 7
  
  },
  {
    "id": 331,
    "name": "San José de Pare",
   
    "departmentId": 7
  
  },
  {
    "id": 332,
    "name": "San Miguel de Sema",
   
    "departmentId": 7
  
  },
  {
    "id": 333,
    "name": "Tuta",
   
    "departmentId": 7
  
  },
  {
    "id": 334,
    "name": "Tibasosa",
   
    "departmentId": 7
  
  },
  {
    "id": 335,
    "name": "La Uvita",
   
    "departmentId": 7
  
  },
  {
    "id": 336,
    "name": "Belén",
   
    "departmentId": 7
  
  },
  {
    "id": 337,
    "name": "Manizales",
    "description": "Manizales es un municipio colombiano, capital del departamento de Caldas. Está ubicado en el centro occidente de Colombia en la región paisa, así como en el eje cafetero, sobre la Cordillera Central de los Andes, cerca del Nevado del Ruiz. Tiene una población de 454,077 habitantes (2022). Es la región más poblada y competitiva del departamento con un aporte del 68% de su PIB total.",
    "surface": 571,
    "population": 454077,
    "postalCode": "170001",
    "departmentId": 8
  
  },
  {
    "id": 338,
    "name": "Aguadas",
   
    "departmentId": 8
  
  },
  {
    "id": 339,
    "name": "Anserma",
   
    "departmentId": 8
  
  },
  {
    "id": 340,
    "name": "Aranzazu",
   
    "departmentId": 8
  
  },
  {
    "id": 341,
    "name": "Belalcázar",
   
    "departmentId": 8
  
  },
  {
    "id": 342,
    "name": "Chinchiná",
   
    "departmentId": 8
  
  },
  {
    "id": 343,
    "name": "Filadelfia",
   
    "departmentId": 8
  
  },
  {
    "id": 344,
    "name": "La Dorada",
   
    "departmentId": 8
  
  },
  {
    "id": 345,
    "name": "La Merced",
   
    "departmentId": 8
  
  },
  {
    "id": 346,
    "name": "Manzanares",
   
    "departmentId": 8
  
  },
  {
    "id": 347,
    "name": "Marmato",
   
    "departmentId": 8
  
  },
  {
    "id": 348,
    "name": "Marulanda",
   
    "departmentId": 8
  
  },
  {
    "id": 349,
    "name": "Neira",
   
    "departmentId": 8
  
  },
  {
    "id": 350,
    "name": "Norcasia",
   
    "departmentId": 8
  
  },
  {
    "id": 351,
    "name": "Pácora",
   
    "departmentId": 8
  
  },
  {
    "id": 352,
    "name": "Palestina",
   
    "departmentId": 8
  
  },
  {
    "id": 353,
    "name": "Pensilvania",
   
    "departmentId": 8
  
  },
  {
    "id": 354,
    "name": "Riosucio",
   
    "departmentId": 8
  
  },
  {
    "id": 355,
    "name": "Risaralda",
   
    "departmentId": 8
  
  },
  {
    "id": 356,
    "name": "Salamina",
   
    "departmentId": 8
  
  },
  {
    "id": 357,
    "name": "Samaná",
   
    "departmentId": 8
  
  },
  {
    "id": 358,
    "name": "San José",
   
    "departmentId": 8
  
  },
  {
    "id": 359,
    "name": "Supía",
   
    "departmentId": 8
  
  },
  {
    "id": 360,
    "name": "Victoria",
   
    "departmentId": 8
  
  },
  {
    "id": 361,
    "name": "Villamaría",
   
    "departmentId": 8
  
  },
  {
    "id": 362,
    "name": "Viterbo",
   
    "departmentId": 8
  
  },
  {
    "id": 363,
    "name": "Marquetalia",
   
    "departmentId": 8
  
  },
  {
    "id": 364,
    "name": "Florencia",
    "description": "Florencia es un municipio colombiano, capital del departamento de Caquetá. Es el municipio más poblado de la región amazónica por su número de habitantes.5​ Es conocido como «La Puerta de Oro de la Amazonía Colombiana»",
    "surface": 2292,
    "population": 173011,
    "postalCode": "180001",
    "departmentId": 9
  
  },
  {
    "id": 365,
    "name": "Albania",
   
    "departmentId": 9
  
  },
  {
    "id": 366,
    "name": "Curillo",
   
    "departmentId": 9
  
  },
  {
    "id": 367,
    "name": "El Doncello",
   
    "departmentId": 9
  
  },
  {
    "id": 368,
    "name": "El Paujil",
   
    "departmentId": 9
  
  },
  {
    "id": 369,
    "name": "Morelia",
   
    "departmentId": 9
  
  },
  {
    "id": 370,
    "name": "Puerto Rico",
   
    "departmentId": 9
  
  },
  {
    "id": 371,
    "name": "Solano",
   
    "departmentId": 9
  
  },
  {
    "id": 372,
    "name": "Solita",
   
    "departmentId": 9
  
  },
  {
    "id": 373,
    "name": "Valparaíso",
   
    "departmentId": 9
  
  },
  {
    "id": 374,
    "name": "San José del Fragua",
   
    "departmentId": 9
  
  },
  {
    "id": 375,
    "name": "Belén de Los Andaquies",
   
    "departmentId": 9
  
  },
  {
    "id": 376,
    "name": "Cartagena del Chairá",
   
    "departmentId": 9
  
  },
  {
    "id": 377,
    "name": "Milán",
   
    "departmentId": 9
  
  },
  {
    "id": 378,
    "name": "La Montañita",
   
    "departmentId": 9
  
  },
  {
    "id": 379,
    "name": "San Vicente del Caguán",
   
    "departmentId": 9
  
  },
  {
    "id": 380,
    "name": "Yopal",
    "description": "Yopal es un municipio colombiano, capital del departamento de Casanare. Su extensión territorial es de 2595 kilómetros cuadrados,4​ y se sitúa a 317 kilómetros del distrito capital de Bogotá. Fundada por colonos boyacenses en 1915, es una de las capitales departamentales más jóvenes de Colombia y una de las ciudades que registra más rápido crecimiento poblacional a nivel nacional, en especial después de la separación de Casanare del departamento de Boyacá",
    "surface": 2771,
    "population": 179355,
    "postalCode": "850001",
    "departmentId": 10
  
  },
  {
    "id": 381,
    "name": "Aguazul",
   
    "departmentId": 10
  
  },
  {
    "id": 382,
    "name": "Chámeza",
   
    "departmentId": 10
  
  },
  {
    "id": 383,
    "name": "Hato Corozal",
   
    "departmentId": 10
  
  },
  {
    "id": 384,
    "name": "La Salina",
   
    "departmentId": 10
  
  },
  {
    "id": 385,
    "name": "Monterrey",
   
    "departmentId": 10
  
  },
  {
    "id": 386,
    "name": "Pore",
   
    "departmentId": 10
  
  },
  {
    "id": 387,
    "name": "Recetor",
   
    "departmentId": 10
  
  },
  {
    "id": 388,
    "name": "Sabanalarga",
   
    "departmentId": 10
  
  },
  {
    "id": 389,
    "name": "Sácama",
   
    "departmentId": 10
  
  },
  {
    "id": 390,
    "name": "Tauramena",
   
    "departmentId": 10
  
  },
  {
    "id": 391,
    "name": "Trinidad",
   
    "departmentId": 10
  
  },
  {
    "id": 392,
    "name": "Villanueva",
   
    "departmentId": 10
  
  },
  {
    "id": 393,
    "name": "San Luis de Gaceno",
   
    "departmentId": 10
  
  },
  {
    "id": 394,
    "name": "Paz de Ariporo",
   
    "departmentId": 10
  
  },
  {
    "id": 395,
    "name": "Nunchía",
   
    "departmentId": 10
  
  },
  {
    "id": 396,
    "name": "Maní",
   
    "departmentId": 10
  
  },
  {
    "id": 397,
    "name": "Támara",
   
    "departmentId": 10
  
  },
  {
    "id": 398,
    "name": "Orocué",
   
    "departmentId": 10
  
  },
  {
    "id": 399,
    "name": "Popayán",
    "description": "Popayán, oficialmente Asunción de Popayán es un municipio colombiano, capital del departamento del Cauca. Se encuentra localizado en el Valle de Pubenza, entre la Cordillera Occidental y Central al suroccidente del país. Su extensión territorial es de 512 km², su altitud media es de 1760 m sobre el nivel del mar, su precipitación media anual de 1941 mm, su temperatura promedio de 14/19 °C y distancia aproximada de 600 km a Bogotá, capital de Colombia.",
    "surface": 512,
    "population": 318059,
    "postalCode": "190001",
    "departmentId": 11
  
  },
  {
    "id": 400,
    "name": "Almaguer",
   
    "departmentId": 11
  
  },
  {
    "id": 401,
    "name": "Argelia",
   
    "departmentId": 11
  
  },
  {
    "id": 402,
    "name": "Balboa",
   
    "departmentId": 11
  
  },
  {
    "id": 403,
    "name": "Bolívar",
   
    "departmentId": 11
  
  },
  {
    "id": 404,
    "name": "Buenos Aires",
   
    "departmentId": 11
  
  },
  {
    "id": 405,
    "name": "Cajibío",
   
    "departmentId": 11
  
  },
  {
    "id": 406,
    "name": "Caldono",
   
    "departmentId": 11
  
  },
  {
    "id": 407,
    "name": "Caloto",
   
    "departmentId": 11
  
  },
  {
    "id": 408,
    "name": "Corinto",
   
    "departmentId": 11
  
  },
  {
    "id": 409,
    "name": "El Tambo",
   
    "departmentId": 11
  
  },
  {
    "id": 410,
    "name": "Florencia",
   
    "departmentId": 11
  
  },
  {
    "id": 411,
    "name": "Guachené",
   
    "departmentId": 11
  
  },
  {
    "id": 412,
    "name": "Guapi",
   
    "departmentId": 11
  
  },
  {
    "id": 413,
    "name": "Inzá",
   
    "departmentId": 11
  
  },
  {
    "id": 414,
    "name": "Jambaló",
   
    "departmentId": 11
  
  },
  {
    "id": 415,
    "name": "La Sierra",
   
    "departmentId": 11
  
  },
  {
    "id": 416,
    "name": "La Vega",
   
    "departmentId": 11
  
  },
  {
    "id": 417,
    "name": "López",
   
    "departmentId": 11
  
  },
  {
    "id": 418,
    "name": "Mercaderes",
   
    "departmentId": 11
  
  },
  {
    "id": 419,
    "name": "Miranda",
   
    "departmentId": 11
  
  },
  {
    "id": 420,
    "name": "Morales",
   
    "departmentId": 11
  
  },
  {
    "id": 421,
    "name": "Padilla",
   
    "departmentId": 11
  
  },
  {
    "id": 422,
    "name": "Patía",
   
    "departmentId": 11
  
  },
  {
    "id": 423,
    "name": "Piamonte",
   
    "departmentId": 11
  
  },
  {
    "id": 424,
    "name": "Piendamó",
   
    "departmentId": 11
  
  },
  {
    "id": 425,
    "name": "Puerto Tejada",
   
    "departmentId": 11
  
  },
  {
    "id": 426,
    "name": "Puracé",
   
    "departmentId": 11
  
  },
  {
    "id": 427,
    "name": "Rosas",
   
    "departmentId": 11
  
  },
  {
    "id": 428,
    "name": "Santa Rosa",
   
    "departmentId": 11
  
  },
  {
    "id": 429,
    "name": "Silvia",
   
    "departmentId": 11
  
  },
  {
    "id": 430,
    "name": "Sotara",
   
    "departmentId": 11
  
  },
  {
    "id": 431,
    "name": "Suárez",
   
    "departmentId": 11
  
  },
  {
    "id": 432,
    "name": "Sucre",
   
    "departmentId": 11
  
  },
  {
    "id": 433,
    "name": "Timbío",
   
    "departmentId": 11
  
  },
  {
    "id": 434,
    "name": "Timbiquí",
   
    "departmentId": 11
  
  },
  {
    "id": 435,
    "name": "Toribio",
   
    "departmentId": 11
  
  },
  {
    "id": 436,
    "name": "Totoró",
   
    "departmentId": 11
  
  },
  {
    "id": 437,
    "name": "Villa Rica",
   
    "departmentId": 11
  
  },
  {
    "id": 756,
    "name": "Puerto López",
   
    "departmentId": 21
  
  },
  {
    "id": 757,
    "name": "Puerto Lleras",
   
    "departmentId": 21
  
  },
  {
    "id": 758,
    "name": "Puerto Rico",
   
    "departmentId": 21
  
  },
  {
    "id": 438,
    "name": "Santander de Quilichao",
    "description": "Santander de Quilichao es un municipio colombiano ubicado en el sector norte del departamento del Cauca, a 97 km al norte de Popayán y a 45 km al sur de Cali. Límites: al norte con los Municipios de Villa Rica y Jamundí, al Occidente con el municipio de Buenos Aires, al oriente con los municipios de Caloto y Jambaló y al sur con el Municipio de Caldono",
    "surface": 518,
    "population": 95041,
    "postalCode": "191030",
    "departmentId": 11
  
  },
  {
    "id": 439,
    "name": "San Sebastián",
   
    "departmentId": 11
  
  },
  {
    "id": 440,
    "name": "Páez",
   
    "departmentId": 11
  
  },
  {
    "id": 441,
    "name": "Valledupar",
    "description": "Valledupar, también llamada Ciudad de los Santos Reyes del Valle de Upar, es un municipio colombiano, capital del departamento del Cesar. Es la cabecera del municipio homónimo, el cual tiene una extensión de 149 km², 559.462 habitantes y junto a su área metropolitana reúne 691.266 habitantes;1​ está conformado por 25 corregimientos y 102 veredas.",
    "surface": 30000,
    "population": 559462,
    "postalCode": "200001",
    "departmentId": 12
  
  },
  {
    "id": 442,
    "name": "Aguachica",
    "description": "Aguachica es un municipio del departamento de Cesar, Colombia, ubicado entre el valle interandino del Magdalena Medio y la Serranía de los Motilones. Es el segundo municipio más poblado del departamento e importante centro ganadero y comercial de la zona sur del caribe colombiano.",
    "surface": 5324,
    "population": 120000,
    "postalCode": "205010",
    "departmentId": 12
  
  },
  {
    "id": 443,
    "name": "Agustín Codazzi",
   
    "departmentId": 12
  
  },
  {
    "id": 444,
    "name": "Astrea",
   
    "departmentId": 12
  
  },
  {
    "id": 445,
    "name": "Becerril",
   
    "departmentId": 12
  
  },
  {
    "id": 446,
    "name": "Bosconia",
   
    "departmentId": 12
  
  },
  {
    "id": 447,
    "name": "Chimichagua",
   
    "departmentId": 12
  
  },
  {
    "id": 448,
    "name": "Chiriguaná",
   
    "departmentId": 12
  
  },
  {
    "id": 449,
    "name": "Curumaní",
   
    "departmentId": 12
  
  },
  {
    "id": 450,
    "name": "El Copey",
   
    "departmentId": 12
  
  },
  {
    "id": 451,
    "name": "El Paso",
   
    "departmentId": 12
  
  },
  {
    "id": 452,
    "name": "Gamarra",
   
    "departmentId": 12
  
  },
  {
    "id": 453,
    "name": "González",
   
    "departmentId": 12
  
  },
  {
    "id": 454,
    "name": "La Gloria",
   
    "departmentId": 12
  
  },
  {
    "id": 455,
    "name": "Manaure",
   
    "departmentId": 12
  
  },
  {
    "id": 456,
    "name": "Pailitas",
   
    "departmentId": 12
  
  },
  {
    "id": 457,
    "name": "Pelaya",
   
    "departmentId": 12
  
  },
  {
    "id": 458,
    "name": "Pueblo Bello",
   
    "departmentId": 12
  
  },
  {
    "id": 459,
    "name": "La Paz",
   
    "departmentId": 12
  
  },
  {
    "id": 460,
    "name": "San Alberto",
   
    "departmentId": 12
  
  },
  {
    "id": 461,
    "name": "San Diego",
   
    "departmentId": 12
  
  },
  {
    "id": 462,
    "name": "San Martín",
   
    "departmentId": 12
  
  },
  {
    "id": 463,
    "name": "Tamalameque",
   
    "departmentId": 12
  
  },
  {
    "id": 464,
    "name": "Río de Oro",
   
    "departmentId": 12
  
  },
  {
    "id": 465,
    "name": "La Jagua de Ibirico",
   
    "departmentId": 12
  
  },
  {
    "id": 466,
    "name": "Istmina",
   
    "departmentId": 13
  
  },
  {
    "id": 467,
    "name": "Quibdó",
    "description": "Quibdó es un municipio colombiano, capital del departamento del Chocó y una de las poblaciones más importantes en la Región del Pacífico Colombiano. La ciudad está ubicada en una de las regiones más biodiversas de Colombia, cerca de grandes reservas ecológicas como el parque nacional natural Emberá. También es una de las regiones con mayor número de reservas indígenas. ",
    "surface": 3337,
    "population": 116087,
    "postalCode": "270001",
    "departmentId": 13
  
  },
  {
    "id": 468,
    "name": "Acandí",
   
    "departmentId": 13
  
  },
  {
    "id": 469,
    "name": "Alto Baudo",
   
    "departmentId": 13
  
  },
  {
    "id": 470,
    "name": "Atrato",
   
    "departmentId": 13
  
  },
  {
    "id": 471,
    "name": "Bagadó",
   
    "departmentId": 13
  
  },
  {
    "id": 472,
    "name": "Bahía Solano",
   
    "departmentId": 13
  
  },
  {
    "id": 473,
    "name": "Bajo Baudó",
   
    "departmentId": 13
  
  },
  {
    "id": 474,
    "name": "Bojaya",
   
    "departmentId": 13
  
  },
  {
    "id": 475,
    "name": "Cértegui",
   
    "departmentId": 13
  
  },
  {
    "id": 476,
    "name": "Condoto",
   
    "departmentId": 13
  
  },
  {
    "id": 477,
    "name": "Juradó",
   
    "departmentId": 13
  
  },
  {
    "id": 478,
    "name": "Lloró",
   
    "departmentId": 13
  
  },
  {
    "id": 479,
    "name": "Medio Atrato",
   
    "departmentId": 13
  
  },
  {
    "id": 480,
    "name": "Medio Baudó",
   
    "departmentId": 13
  
  },
  {
    "id": 481,
    "name": "Medio San Juan",
   
    "departmentId": 13
  
  },
  {
    "id": 482,
    "name": "Nóvita",
   
    "departmentId": 13
  
  },
  {
    "id": 483,
    "name": "Nuquí",
   
    "departmentId": 13
  
  },
  {
    "id": 484,
    "name": "Río Iro",
   
    "departmentId": 13
  
  },
  {
    "id": 485,
    "name": "Río Quito",
   
    "departmentId": 13
  
  },
  {
    "id": 486,
    "name": "Riosucio",
   
    "departmentId": 13
  
  },
  {
    "id": 487,
    "name": "Sipí",
   
    "departmentId": 13
  
  },
  {
    "id": 488,
    "name": "Unguía",
   
    "departmentId": 13
  
  },
  {
    "id": 489,
    "name": "El Litoral del San Juan",
   
    "departmentId": 13
  
  },
  {
    "id": 490,
    "name": "El Cantón del San Pablo",
   
    "departmentId": 13
  
  },
  {
    "id": 491,
    "name": "El Carmen de Atrato",
   
    "departmentId": 13
  
  },
  {
    "id": 492,
    "name": "San José del Palmar",
   
    "departmentId": 13
  
  },
  {
    "id": 493,
    "name": "Belén de Bajira",
   
    "departmentId": 13
  
  },
  {
    "id": 494,
    "name": "Carmen del Darien",
   
    "departmentId": 13
  
  },
  {
    "id": 495,
    "name": "Tadó",
   
    "departmentId": 13
  
  },
  {
    "id": 496,
    "name": "Unión Panamericana",
   
    "departmentId": 13
  
  },
  {
    "id": 497,
    "name": "San Bernardo del Viento",
   
    "departmentId": 14
  
  },
  {
    "id": 498,
    "name": "Montería",
    "description": "Montería es un municipio colombiano, capital del departamento de Córdoba. Está ubicado al noroccidente del país en la región Caribe Colombiana, se encuentra a orillas del río Sinú, por lo que es conocida como la \"Perla del Sinú\". Es considerada la capital ganadera de Colombia;5​ anualmente celebra la feria de la Ganadería durante el mes de junio. Es además, un importante centro comercial y universitario, reconocida como una de las ciudades colombianas con mayor crecimiento y desarrollo en los últimos años y por impulsar el desarrollo sostenible",
    "surface": 3141,
    "population": 512994,
    "postalCode": "230001",
    "departmentId": 14
  
  },
  {
    "id": 499,
    "name": "Ayapel",
   
    "departmentId": 14
  
  },
  {
    "id": 500,
    "name": "Buenavista",
   
    "departmentId": 14
  
  },
  {
    "id": 501,
    "name": "Canalete",
   
    "departmentId": 14
  
  },
  {
    "id": 502,
    "name": "Cereté",
   
    "departmentId": 14
  
  },
  {
    "id": 503,
    "name": "Chimá",
   
    "departmentId": 14
  
  },
  {
    "id": 504,
    "name": "Chinú",
   
    "departmentId": 14
  
  },
  {
    "id": 505,
    "name": "Cotorra",
   
    "departmentId": 14
  
  },
  {
    "id": 506,
    "name": "Lorica",
    "description": "Santa Cruz de Lorica o simplemente Lorica, es un municipio del departamento de Córdoba, Colombia. Es conocida como Ciudad Antigua y Señorial, La capital del Bajo Sinú y La capital de Bocachico. Está ubicada en la porción septentrional del departamento de Córdoba y en la zona más baja del río Sinú, muy próxima al mar Caribe.",
    "surface": 1033,
    "population": 115461,
    "postalCode": "231020",
    "departmentId": 14
  
  },
  {
    "id": 507,
    "name": "Los Córdobas",
   
    "departmentId": 14
  
  },
  {
    "id": 508,
    "name": "Momil",
   
    "departmentId": 14
  
  },
  {
    "id": 509,
    "name": "Moñitos",
   
    "departmentId": 14
  
  },
  {
    "id": 510,
    "name": "Planeta Rica",
   
    "departmentId": 14
  
  },
  {
    "id": 511,
    "name": "Pueblo Nuevo",
   
    "departmentId": 14
  
  },
  {
    "id": 512,
    "name": "Puerto Escondido",
   
    "departmentId": 14
  
  },
  {
    "id": 513,
    "name": "Purísima",
   
    "departmentId": 14
  
  },
  {
    "id": 514,
    "name": "Sahagún",
   
    "departmentId": 14
  
  },
  {
    "id": 515,
    "name": "San Andrés Sotavento",
   
    "departmentId": 14
  
  },
  {
    "id": 516,
    "name": "San Antero",
   
    "departmentId": 14
  
  },
  {
    "id": 517,
    "name": "San Pelayo",
   
    "departmentId": 14
  
  },
  {
    "id": 518,
    "name": "Tierralta",
   
    "departmentId": 14
  
  },
  {
    "id": 519,
    "name": "Tuchín",
   
    "departmentId": 14
  
  },
  {
    "id": 520,
    "name": "Valencia",
   
    "departmentId": 14
  
  },
  {
    "id": 521,
    "name": "San José de Uré",
   
    "departmentId": 14
  
  },
  {
    "id": 522,
    "name": "Ciénaga de Oro",
   
    "departmentId": 14
  
  },
  {
    "id": 523,
    "name": "San Carlos",
   
    "departmentId": 14
  
  },
  {
    "id": 524,
    "name": "Montelíbano",
    "description": "Montelíbano es un municipio del sur del departamento de Córdoba, Colombia. Situado sobre la margen derecha del río San Jorge y con una población de 90.4504​ habitantes aproximadamente, es en la actualidad uno de los centros de desarrollo económico, comercial y cultural más importantes de la región.",
    "surface": 1890,
    "population": 90450,
    "postalCode": "234001",
    "departmentId": 14
  
  },
  {
    "id": 525,
    "name": "La Apartada",
   
    "departmentId": 14
  
  },
  {
    "id": 526,
    "name": "Puerto Libertador",
   
    "departmentId": 14
  
  },
  {
    "id": 527,
    "name": "Anapoima",
   
    "departmentId": 15
  
  },
  {
    "id": 528,
    "name": "Arbeláez",
   
    "departmentId": 15
  
  },
  {
    "id": 529,
    "name": "Beltrán",
   
    "departmentId": 15
  
  },
  {
    "id": 530,
    "name": "Bituima",
   
    "departmentId": 15
  
  },
  {
    "id": 531,
    "name": "Bojacá",
   
    "departmentId": 15
  
  },
  {
    "id": 532,
    "name": "Cabrera",
   
    "departmentId": 15
  
  },
  {
    "id": 533,
    "name": "Cachipay",
   
    "departmentId": 15
  
  },
  {
    "id": 534,
    "name": "Cajicá",
   
    "departmentId": 15
  
  },
  {
    "id": 535,
    "name": "Caparrapí",
   
    "departmentId": 15
  
  },
  {
    "id": 536,
    "name": "Caqueza",
   
    "departmentId": 15
  
  },
  {
    "id": 537,
    "name": "Chaguaní",
   
    "departmentId": 15
  
  },
  {
    "id": 538,
    "name": "Chipaque",
   
    "departmentId": 15
  
  },
  {
    "id": 539,
    "name": "Choachí",
   
    "departmentId": 15
  
  },
  {
    "id": 540,
    "name": "Chocontá",
   
    "departmentId": 15
  
  },
  {
    "id": 541,
    "name": "Cogua",
   
    "departmentId": 15
  
  },
  {
    "id": 542,
    "name": "Cota",
   
    "departmentId": 15
  
  },
  {
    "id": 543,
    "name": "Cucunubá",
   
    "departmentId": 15
  
  },
  {
    "id": 544,
    "name": "El Colegio",
   
    "departmentId": 15
  
  },
  {
    "id": 545,
    "name": "El Rosal",
   
    "departmentId": 15
  
  },
  {
    "id": 546,
    "name": "Fomeque",
   
    "departmentId": 15
  
  },
  {
    "id": 547,
    "name": "Fosca",
   
    "departmentId": 15
  
  },
  {
    "id": 548,
    "name": "Funza",
   
    "departmentId": 15
  
  },
  {
    "id": 549,
    "name": "Fúquene",
   
    "departmentId": 15
  
  },
  {
    "id": 550,
    "name": "Gachala",
   
    "departmentId": 15
  
  },
  {
    "id": 551,
    "name": "Gachancipá",
   
    "departmentId": 15
  
  },
  {
    "id": 552,
    "name": "Gachetá",
   
    "departmentId": 15
  
  },
  {
    "id": 553,
    "name": "Girardot",
    "description": "Girardot es un municipio colombiano del departamento de Cundinamarca ubicado en la Provincia del Alto Magdalena, de la cual es capital. Limita al norte con los municipios de Nariño y Tocaima, al sur con el municipio de Flandes y el río Magdalena, al oeste con el municipio de Nariño, el río Magdalena y el municipio de Coello y al este con el municipio de Ricaurte y el río Bogotá",
    "surface": 129,
    "population": 101108,
    "postalCode": "252430",
    "departmentId": 15
  
  },
  {
    "id": 554,
    "name": "Granada",
   
    "departmentId": 15
  
  },
  {
    "id": 555,
    "name": "Guachetá",
   
    "departmentId": 15
  
  },
  {
    "id": 556,
    "name": "Guaduas",
   
    "departmentId": 15
  
  },
  {
    "id": 557,
    "name": "Guasca",
   
    "departmentId": 15
  
  },
  {
    "id": 558,
    "name": "Guataquí",
   
    "departmentId": 15
  
  },
  {
    "id": 559,
    "name": "Guatavita",
   
    "departmentId": 15
  
  },
  {
    "id": 560,
    "name": "Guayabetal",
   
    "departmentId": 15
  
  },
  {
    "id": 561,
    "name": "Gutiérrez",
   
    "departmentId": 15
  
  },
  {
    "id": 562,
    "name": "Jerusalén",
   
    "departmentId": 15
  
  },
  {
    "id": 563,
    "name": "Junín",
   
    "departmentId": 15
  
  },
  {
    "id": 564,
    "name": "La Calera",
   
    "departmentId": 15
  
  },
  {
    "id": 565,
    "name": "La Mesa",
   
    "departmentId": 15
  
  },
  {
    "id": 566,
    "name": "La Palma",
   
    "departmentId": 15
  
  },
  {
    "id": 567,
    "name": "La Peña",
   
    "departmentId": 15
  
  },
  {
    "id": 568,
    "name": "La Vega",
   
    "departmentId": 15
  
  },
  {
    "id": 569,
    "name": "Lenguazaque",
   
    "departmentId": 15
  
  },
  {
    "id": 570,
    "name": "Macheta",
   
    "departmentId": 15
  
  },
  {
    "id": 571,
    "name": "Madrid",
   
    "departmentId": 15
  
  },
  {
    "id": 572,
    "name": "Manta",
   
    "departmentId": 15
  
  },
  {
    "id": 573,
    "name": "Medina",
   
    "departmentId": 15
  
  },
  {
    "id": 574,
    "name": "Mosquera",
   
    "departmentId": 15
  
  },
  {
    "id": 575,
    "name": "Nariño",
   
    "departmentId": 15
  
  },
  {
    "id": 576,
    "name": "Nemocón",
   
    "departmentId": 15
  
  },
  {
    "id": 577,
    "name": "Nilo",
   
    "departmentId": 15
  
  },
  {
    "id": 578,
    "name": "Nimaima",
   
    "departmentId": 15
  
  },
  {
    "id": 579,
    "name": "Nocaima",
   
    "departmentId": 15
  
  },
  {
    "id": 580,
    "name": "Venecia",
   
    "departmentId": 15
  
  },
  {
    "id": 581,
    "name": "Pacho",
   
    "departmentId": 15
  
  },
  {
    "id": 582,
    "name": "Paime",
   
    "departmentId": 15
  
  },
  {
    "id": 583,
    "name": "Pandi",
   
    "departmentId": 15
  
  },
  {
    "id": 584,
    "name": "Paratebueno",
   
    "departmentId": 15
  
  },
  {
    "id": 585,
    "name": "Pasca",
   
    "departmentId": 15
  
  },
  {
    "id": 586,
    "name": "Puerto Salgar",
   
    "departmentId": 15
  
  },
  {
    "id": 587,
    "name": "Pulí",
   
    "departmentId": 15
  
  },
  {
    "id": 588,
    "name": "Quebradanegra",
   
    "departmentId": 15
  
  },
  {
    "id": 589,
    "name": "Quetame",
   
    "departmentId": 15
  
  },
  {
    "id": 590,
    "name": "Quipile",
   
    "departmentId": 15
  
  },
  {
    "id": 591,
    "name": "Apulo",
   
    "departmentId": 15
  
  },
  {
    "id": 592,
    "name": "Ricaurte",
   
    "departmentId": 15
  
  },
  {
    "id": 593,
    "name": "San Bernardo",
   
    "departmentId": 15
  
  },
  {
    "id": 594,
    "name": "San Cayetano",
   
    "departmentId": 15
  
  },
  {
    "id": 595,
    "name": "San Francisco",
   
    "departmentId": 15
  
  },
  {
    "id": 596,
    "name": "Sesquilé",
   
    "departmentId": 15
  
  },
  {
    "id": 597,
    "name": "Sibaté",
   
    "departmentId": 15
  
  },
  {
    "id": 598,
    "name": "Silvania",
   
    "departmentId": 15
  
  },
  {
    "id": 599,
    "name": "Simijaca",
   
    "departmentId": 15
  
  },
  {
    "id": 600,
    "name": "Soacha",
   
    "departmentId": 15
  
  },
  {
    "id": 601,
    "name": "Subachoque",
   
    "departmentId": 15
  
  },
  {
    "id": 602,
    "name": "Suesca",
   
    "departmentId": 15
  
  },
  {
    "id": 603,
    "name": "Supatá",
   
    "departmentId": 15
  
  },
  {
    "id": 604,
    "name": "Susa",
   
    "departmentId": 15
  
  },
  {
    "id": 605,
    "name": "Sutatausa",
   
    "departmentId": 15
  
  },
  {
    "id": 606,
    "name": "Tabio",
   
    "departmentId": 15
  
  },
  {
    "id": 607,
    "name": "Tausa",
   
    "departmentId": 15
  
  },
  {
    "id": 608,
    "name": "Tena",
   
    "departmentId": 15
  
  },
  {
    "id": 609,
    "name": "Tenjo",
   
    "departmentId": 15
  
  },
  {
    "id": 610,
    "name": "Tibacuy",
   
    "departmentId": 15
  
  },
  {
    "id": 611,
    "name": "Tibirita",
   
    "departmentId": 15
  
  },
  {
    "id": 612,
    "name": "Tocaima",
   
    "departmentId": 15
  
  },
  {
    "id": 613,
    "name": "Tocancipá",
   
    "departmentId": 15
  
  },
  {
    "id": 614,
    "name": "Topaipí",
   
    "departmentId": 15
  
  },
  {
    "id": 615,
    "name": "Ubalá",
   
    "departmentId": 15
  
  },
  {
    "id": 616,
    "name": "Ubaque",
   
    "departmentId": 15
  
  },
  {
    "id": 617,
    "name": "Une",
   
    "departmentId": 15
  
  },
  {
    "id": 618,
    "name": "Útica",
   
    "departmentId": 15
  
  },
  {
    "id": 619,
    "name": "Vianí",
   
    "departmentId": 15
  
  },
  {
    "id": 620,
    "name": "Villagómez",
   
    "departmentId": 15
  
  },
  {
    "id": 621,
    "name": "Villapinzón",
   
    "departmentId": 15
  
  },
  {
    "id": 622,
    "name": "Villeta",
   
    "departmentId": 15
  
  },
  {
    "id": 623,
    "name": "Viotá",
   
    "departmentId": 15
  
  },
  {
    "id": 624,
    "name": "Zipacón",
   
    "departmentId": 15
  
  },
  {
    "id": 625,
    "name": "San Juan de Río Seco",
   
    "departmentId": 15
  
  },
  {
    "id": 626,
    "name": "Villa de San Diego de Ubate",
   
    "departmentId": 15
  
  },
  {
    "id": 627,
    "name": "Guayabal de Siquima",
   
    "departmentId": 15
  
  },
  {
    "id": 628,
    "name": "San Antonio del Tequendama",
   
    "departmentId": 15
  
  },
  {
    "id": 629,
    "name": "Agua de Dios",
   
    "departmentId": 15
  
  },
  {
    "id": 630,
    "name": "Carmen de Carupa",
   
    "departmentId": 15
  
  },
  {
    "id": 631,
    "name": "Vergara",
   
    "departmentId": 15
  
  },
  {
    "id": 632,
    "name": "Albán",
   
    "departmentId": 15
  
  },
  {
    "id": 633,
    "name": "Anolaima",
   
    "departmentId": 15
  
  },
  {
    "id": 634,
    "name": "Chía",
   
    "departmentId": 15
  
  },
  {
    "id": 635,
    "name": "El Peñón",
   
    "departmentId": 15
  
  },
  {
    "id": 636,
    "name": "Sopó",
   
    "departmentId": 15
  
  },
  {
    "id": 637,
    "name": "Gama",
   
    "departmentId": 15
  
  },
  {
    "id": 638,
    "name": "Sasaima",
   
    "departmentId": 15
  
  },
  {
    "id": 639,
    "name": "Yacopí",
   
    "departmentId": 15
  
  },
  {
    "id": 640,
    "name": "Fusagasugá",
    "description": "Fusagasugá es un municipio colombiano, capital de la Provincia del Sumapaz, ubicado en el departamento de Cundinamarca. Con una población proyectada en el año 2020 de 147.631 habitantes, es el tercer municipio más poblado del departamento después de Soacha y Bogotá (Anexo), también es el cuadragésimo quinto del país.",
    "surface": 239,
    "population": 147631,
    "postalCode": "252211",
    "departmentId": 15
  
  },
  {
    "id": 641,
    "name": "Zipaquirá",
    "description": "Zipaquirá es un municipio de Colombia ubicado en el departamento de Cundinamarca, en la provincia de Sabana Centro, de la que es capital y sede de su diócesis. Se encuentra a 29 kilómetros de Bogotá, hace parte de su área metropolitana; a 450 kilómetros de Medellín, y a 117 kilómetros de Tunja.",
    "surface": 197,
    "population": 132465,
    "postalCode": "250251",
    "departmentId": 15
  
  },
  {
    "id": 642,
    "name": "Facatativá",
    "description": "Facatativá es un municipio colombiano del departamento de Cundinamarca. Es la capital de la Provincia de Sabana Occidente. Hace parte del Área Metropolitana de Bogotá, según el censo DANE de 2015. Se encuentra ubicado a 36 km de Bogotá, cerca de la carretera que de esta conduce a Medellín. Posee especies tanto de flora como de fauna ya extintas en otros lugares del Altiplano Cundiboyacense",
    "surface": 158,
    "population": 167309,
    "postalCode": "253051",
    "departmentId": 15
  
  },
  {
    "id": 644,
    "name": "Inírida",
    "description": "Inírida (antes llamado Puerto Inírida) es un municipio de Colombia, capital del departamento del Guainía y su ciudad más poblada. La temperatura promedio es de 25 ",
    "surface": 17000,
    "population": 19816,
    "postalCode": "940001",
    "departmentId": 16
  
  },
  {
    "id": 645,
    "name": "Barranco Minas",
   
    "departmentId": 16
  
  },
  {
    "id": 646,
    "name": "Mapiripana",
   
    "departmentId": 16
  
  },
  {
    "id": 647,
    "name": "San Felipe",
   
    "departmentId": 16
  
  },
  {
    "id": 648,
    "name": "Puerto Colombia",
   
    "departmentId": 16
  
  },
  {
    "id": 649,
    "name": "La Guadalupe",
   
    "departmentId": 16
  
  },
  {
    "id": 650,
    "name": "Cacahual",
   
    "departmentId": 16
  
  },
  {
    "id": 651,
    "name": "Pana Pana",
   
    "departmentId": 16
  
  },
  {
    "id": 652,
    "name": "Morichal",
   
    "departmentId": 16
  
  },
  {
    "id": 653,
    "name": "Calamar",
   
    "departmentId": 17
  
  },
  {
    "id": 654,
    "name": "San José del Guaviare",
    "description": "San José del Guaviare es un municipio colombiano, capital del departamento de Guaviare. Comenzó a formarse en 1960, vinculado a las actividades colonizadoras de la región selvática y como núcleo de apoyo a las mismas. En 1976 recibió el estatus de municipio y su crecimiento demográfico, desde entonces, se ha proyectado rápidamente.",
    "surface": 16178,
    "population": 52815,
    "postalCode": "950001",
    "departmentId": 17
  
  },
  {
    "id": 655,
    "name": "Miraflores",
   
    "departmentId": 17
  
  },
  {
    "id": 656,
    "name": "El Retorno",
   
    "departmentId": 17
  
  },
  {
    "id": 759,
    "name": "Restrepo",
   
    "departmentId": 21
  
  },
  {
    "id": 760,
    "name": "San Juanito",
   
    "departmentId": 21
  
  },
  {
    "id": 761,
    "name": "San Martín",
   
    "departmentId": 21
  
  },
  {
    "id": 762,
    "name": "Vista Hermosa",
   
    "departmentId": 21
  
  },
  {
    "id": 763,
    "name": "Barranca de Upía",
   
    "departmentId": 21
  
  },
  {
    "id": 764,
    "name": "Fuente de Oro",
   
    "departmentId": 21
  
  },
  {
    "id": 657,
    "name": "Neiva",
    "description": "Neiva es un municipio colombiano, capital del departamento de Huila. Yace entre la cordillera Central y Oriental, en una planicie sobre la margen oriental del río Magdalena, en el valle del mismo nombre, cruzada por el río Las Ceibas y el río del Oro. Su extensión territorial de 1533 km², su altura de 442 metros sobre el nivel del mar y su temperatura promedio de 27.7 ",
    "surface": 1553,
    "population": 367401,
    "postalCode": "410001",
    "departmentId": 18
  
  },
  {
    "id": 658,
    "name": "Acevedo",
   
    "departmentId": 18
  
  },
  {
    "id": 659,
    "name": "Agrado",
   
    "departmentId": 18
  
  },
  {
    "id": 660,
    "name": "Aipe",
   
    "departmentId": 18
  
  },
  {
    "id": 661,
    "name": "Algeciras",
   
    "departmentId": 18
  
  },
  {
    "id": 662,
    "name": "Altamira",
   
    "departmentId": 18
  
  },
  {
    "id": 663,
    "name": "Baraya",
   
    "departmentId": 18
  
  },
  {
    "id": 664,
    "name": "Campoalegre",
   
    "departmentId": 18
  
  },
  {
    "id": 665,
    "name": "Colombia",
   
    "departmentId": 18
  
  },
  {
    "id": 666,
    "name": "Elías",
   
    "departmentId": 18
  
  },
  {
    "id": 667,
    "name": "Garzón",
   
    "departmentId": 18
  
  },
  {
    "id": 668,
    "name": "Gigante",
   
    "departmentId": 18
  
  },
  {
    "id": 669,
    "name": "Guadalupe",
   
    "departmentId": 18
  
  },
  {
    "id": 670,
    "name": "Hobo",
   
    "departmentId": 18
  
  },
  {
    "id": 671,
    "name": "Iquira",
   
    "departmentId": 18
  
  },
  {
    "id": 672,
    "name": "Isnos",
   
    "departmentId": 18
  
  },
  {
    "id": 673,
    "name": "La Argentina",
   
    "departmentId": 18
  
  },
  {
    "id": 674,
    "name": "La Plata",
   
    "departmentId": 18
  
  },
  {
    "id": 675,
    "name": "Nátaga",
   
    "departmentId": 18
  
  },
  {
    "id": 676,
    "name": "Oporapa",
   
    "departmentId": 18
  
  },
  {
    "id": 677,
    "name": "Paicol",
   
    "departmentId": 18
  
  },
  {
    "id": 678,
    "name": "Palermo",
   
    "departmentId": 18
  
  },
  {
    "id": 679,
    "name": "Palestina",
   
    "departmentId": 18
  
  },
  {
    "id": 680,
    "name": "Pital",
   
    "departmentId": 18
  
  },
  {
    "id": 681,
    "name": "Pitalito",
    "description": "Pitalito es un municipio colombiano localizado en el suroriente del departamento del Huila. Yace sobre el valle del Magdalena y sobre el vértice que forman las Cordilleras central y oriental. Su extensión territorial de 653km², su altura de 1318 metros sobre el nivel del mar y su temperatura promedio de 18-21 ",
    "surface": 653,
    "population": 128600,
    "postalCode": "417030",
    "departmentId": 18
  
  },
  {
    "id": 682,
    "name": "Rivera",
   
    "departmentId": 18
  
  },
  {
    "id": 683,
    "name": "Saladoblanco",
   
    "departmentId": 18
  
  },
  {
    "id": 684,
    "name": "Santa María",
   
    "departmentId": 18
  
  },
  {
    "id": 685,
    "name": "Suaza",
   
    "departmentId": 18
  
  },
  {
    "id": 686,
    "name": "Tarqui",
   
    "departmentId": 18
  
  },
  {
    "id": 687,
    "name": "Tesalia",
   
    "departmentId": 18
  
  },
  {
    "id": 688,
    "name": "Tello",
   
    "departmentId": 18
  
  },
  {
    "id": 689,
    "name": "Teruel",
   
    "departmentId": 18
  
  },
  {
    "id": 690,
    "name": "Timaná",
   
    "departmentId": 18
  
  },
  {
    "id": 691,
    "name": "Villavieja",
   
    "departmentId": 18
  
  },
  {
    "id": 692,
    "name": "Yaguará",
   
    "departmentId": 18
  
  },
  {
    "id": 693,
    "name": "San Agustín",
   
    "departmentId": 18
  
  },
  {
    "id": 694,
    "name": "Riohacha",
    "description": "Riohacha, oficialmente Distrito Especial, Turístico y Cultural de Riohacha,7​ (en wayuunaiki: Süchiimma que traduce a \"Tierra del Río\") es un distrito colombiano, capital del departamento de La Guajira. Se ubica en la costa del mar Caribe, en el delta del río Ranchería. Es el segundo municipio con mayor extensión territorial en su departamento y principal por constituir un vasto engranaje de entidades públicas, bancos y entidades financieras",
    "surface": 3084,
    "population": 287009,
    "postalCode": "440001",
    "departmentId": 19
  
  },
  {
    "id": 695,
    "name": "Albania",
   
    "departmentId": 19
  
  },
  {
    "id": 696,
    "name": "Barrancas",
   
    "departmentId": 19
  
  },
  {
    "id": 697,
    "name": "Dibula",
   
    "departmentId": 19
  
  },
  {
    "id": 698,
    "name": "Distracción",
   
    "departmentId": 19
  
  },
  {
    "id": 699,
    "name": "El Molino",
   
    "departmentId": 19
  
  },
  {
    "id": 700,
    "name": "Fonseca",
   
    "departmentId": 19
  
  },
  {
    "id": 701,
    "name": "Hatonuevo",
   
    "departmentId": 19
  
  },
  {
    "id": 702,
    "name": "Maicao",
    "description": "Maicao (en wayuunaiki: Maikou) es un municipio colombiano ubicado en el centro-este del departamento de La Guajira. El municipio es conocido con el apelativo «Vitrina Comercial de Colombia» debido a la prosperidad económica que experimentó en la década de 1980, al establecer un amplio mercado abastecido por productos importados de Venezuela.",
    "surface": 1825,
    "population": 162118,
    "postalCode": "442001",
    "departmentId": 19
  
  },
  {
    "id": 703,
    "name": "Manaure",
   
    "departmentId": 19
  
  },
  {
    "id": 704,
    "name": "Uribia",
   
    "departmentId": 19
  
  },
  {
    "id": 705,
    "name": "Urumita",
   
    "departmentId": 19
  
  },
  {
    "id": 706,
    "name": "Villanueva",
   
    "departmentId": 19
  
  },
  {
    "id": 707,
    "name": "La Jagua del Pilar",
   
    "departmentId": 19
  
  },
  {
    "id": 708,
    "name": "San Juan del Cesar",
   
    "departmentId": 19
  
  },
  {
    "id": 709,
    "name": "Santa Marta",
    "description": "Santa Marta, oficialmente Distrito Turístico, Cultural e Histórico de Santa Marta,4​ es la capital del departamento de Magdalena, Colombia. Fue fundada el 29 de julio de 1525 por el español Rodrigo de Bastidas, lo que según los textos, la hace la ciudad en pie más antigua de Colombia. Se encuentra a orillas de la bahía del mismo nombre.",
    "surface": 2393,
    "population": 538612,
    "postalCode": "470001",
    "departmentId": 20
  
  },
  {
    "id": 710,
    "name": "Algarrobo",
   
    "departmentId": 20
  
  },
  {
    "id": 711,
    "name": "Aracataca",
   
    "departmentId": 20
  
  },
  {
    "id": 712,
    "name": "Ariguaní",
   
    "departmentId": 20
  
  },
  {
    "id": 1,
    "name": "Leticia",
    "description": "Leticia es un municipio fronterizo colombiano, es la capital del departamento del Amazonas. Se encuentra localizado en el extremo sur del país sobre las márgenes del río Amazonas, al sur del área no municipalizada de Tarapacá y al oriente del municipio de Puerto Nariño. Su extensión territorial es de 5968 km², su altura de 82 metros sobre el nivel del mar",
    "surface": 5968,
    "population": 42280,
    "postalCode": "910001",
    "departmentId": 1
  
  },
  {
    "id": 2,
    "name": "El Encanto",
   
    "departmentId": 1
  
  },
  {
    "id": 3,
    "name": "La Chorrera",
   
    "departmentId": 1
  
  },
  {
    "id": 4,
    "name": "La Pedrera",
   
    "departmentId": 1
  
  },
  {
    "id": 5,
    "name": "La Victoria",
   
    "departmentId": 1
  
  },
  {
    "id": 6,
    "name": "Puerto Arica",
   
    "departmentId": 1
  
  },
  {
    "id": 7,
    "name": "Puerto Nariño",
   
    "departmentId": 1
  
  },
  {
    "id": 8,
    "name": "Puerto Santander",
   
    "departmentId": 1
  
  },
  {
    "id": 9,
    "name": "Tarapacá",
   
    "departmentId": 1
  
  },
  {
    "id": 10,
    "name": "Puerto Alegría",
   
    "departmentId": 1
  
  },
  {
    "id": 11,
    "name": "Miriti Paraná",
   
    "departmentId": 1
  
  },
  {
    "id": 12,
    "name": "Medellín",
    "description": "Medellín es un distrito colombiano, capital del departamento de Antioquia. Es la ciudad más poblada del departamento y la segunda más poblada del país después de Bogotá.8​ Está ubicada en la parte más ancha de la región natural conocida como Valle de Aburrá, en la cordillera central de los Andes. Está extendida por ambas orillas del río Medellín, que la atraviesa de sur a norte, y es el municipio principal del Área metropolitana del Valle de Aburrá.9​",
    "surface": 382,
    "population": 2533424,
    "postalCode": "50001",
    "departmentId": 2
  
  },
  {
    "id": 13,
    "name": "Abejorral",
   
    "departmentId": 2
  
  },
  {
    "id": 14,
    "name": "Abriaquí",
   
    "departmentId": 2
  
  },
  {
    "id": 15,
    "name": "Alejandría",
   
    "departmentId": 2
  
  },
  {
    "id": 16,
    "name": "Amagá",
   
    "departmentId": 2
  
  },
  {
    "id": 17,
    "name": "Amalfi",
   
    "departmentId": 2
  
  },
  {
    "id": 18,
    "name": "Andes",
   
    "departmentId": 2
  
  },
  {
    "id": 19,
    "name": "Angelópolis",
   
    "departmentId": 2
  
  },
  {
    "id": 20,
    "name": "Angostura",
   
    "departmentId": 2
  
  },
  {
    "id": 21,
    "name": "Anorí",
   
    "departmentId": 2
  
  },
  {
    "id": 22,
    "name": "Anza",
   
    "departmentId": 2
  
  },
  {
    "id": 23,
    "name": "Apartadó",
    "description": "Apartadó es un municipio de Colombia, ubicado en la subregión de Urabá en el departamento de Antioquia, siendo el municipio más poblado de dicha región. Limita por el norte el puerto y distrito de Turbo, además su cabecera municipal está a 310 kilómetros de la capital departamental, Medellín.",
    "surface": 607,
    "population": 121003,
    "postalCode": "57840",
    "departmentId": 2
  
  },
  {
    "id": 24,
    "name": "Arboletes",
   
    "departmentId": 2
  
  },
  {
    "id": 25,
    "name": "Argelia",
   
    "departmentId": 2
  
  },
  {
    "id": 26,
    "name": "Armenia",
   
    "departmentId": 2
  
  },
  {
    "id": 27,
    "name": "Barbosa",
   
    "departmentId": 2
  
  },
  {
    "id": 28,
    "name": "Bello",
   
    "departmentId": 2
  
  },
  {
    "id": 29,
    "name": "Betania",
   
    "departmentId": 2
  
  },
  {
    "id": 30,
    "name": "Betulia",
   
    "departmentId": 2
  
  },
  {
    "id": 31,
    "name": "Ciudad Bolívar",
   
    "departmentId": 2
  
  },
  {
    "id": 32,
    "name": "Briceño",
   
    "departmentId": 2
  
  },
  {
    "id": 33,
    "name": "Buriticá",
   
    "departmentId": 2
  
  },
  {
    "id": 34,
    "name": "Cáceres",
   
    "departmentId": 2
  
  },
  {
    "id": 35,
    "name": "Caicedo",
   
    "departmentId": 2
  
  },
  {
    "id": 36,
    "name": "Caldas",
   
    "departmentId": 2
  
  },
  {
    "id": 37,
    "name": "Campamento",
   
    "departmentId": 2
  
  },
  {
    "id": 38,
    "name": "Cañasgordas",
   
    "departmentId": 2
  
  },
  {
    "id": 39,
    "name": "Caracolí",
   
    "departmentId": 2
  
  },
  {
    "id": 40,
    "name": "Caramanta",
   
    "departmentId": 2
  
  },
  {
    "id": 41,
    "name": "Carepa",
   
    "departmentId": 2
  
  },
  {
    "id": 42,
    "name": "Carolina",
   
    "departmentId": 2
  
  },
  {
    "id": 803,
    "name": "Nariño",
   
    "departmentId": 22
  
  },
  {
    "id": 43,
    "name": "Caucasia",
    "description": "Caucasia es un municipio colombiano localizado en la subregión del Bajo Cauca del departamento de Antioquia. Es denominada la Capital del Bajo Cauca por ser el principal centro urbano y comercial de la subregión. Limita por el norte con el departamento de Córdoba, por el este con los municipios antioqueños de Nechí y El Bagre, por el sur con el municipio de Zaragoza, y por el oeste con el municipio de Cáceres",
    "surface": 1411,
    "population": 90213,
    "postalCode": "52410",
    "departmentId": 2
  
  },
  {
    "id": 44,
    "name": "Chigorodó",
   
    "departmentId": 2
  
  },
  {
    "id": 45,
    "name": "Cisneros",
   
    "departmentId": 2
  
  },
  {
    "id": 46,
    "name": "Cocorná",
   
    "departmentId": 2
  
  },
  {
    "id": 47,
    "name": "Concepción",
   
    "departmentId": 2
  
  },
  {
    "id": 48,
    "name": "Concordia",
   
    "departmentId": 2
  
  },
  {
    "id": 49,
    "name": "Copacabana",
   
    "departmentId": 2
  
  },
  {
    "id": 50,
    "name": "Dabeiba",
   
    "departmentId": 2
  
  },
  {
    "id": 51,
    "name": "Don Matías",
   
    "departmentId": 2
  
  },
  {
    "id": 52,
    "name": "Ebéjico",
   
    "departmentId": 2
  
  },
  {
    "id": 53,
    "name": "El Bagre",
   
    "departmentId": 2
  
  },
  {
    "id": 54,
    "name": "Entrerrios",
   
    "departmentId": 2
  
  },
  {
    "id": 55,
    "name": "Envigado",
   
    "departmentId": 2
  
  },
  {
    "id": 56,
    "name": "Fredonia",
   
    "departmentId": 2
  
  },
  {
    "id": 57,
    "name": "Giraldo",
   
    "departmentId": 2
  
  },
  {
    "id": 58,
    "name": "Girardota",
   
    "departmentId": 2
  
  },
  {
    "id": 59,
    "name": "Gómez Plata",
   
    "departmentId": 2
  
  },
  {
    "id": 60,
    "name": "Guadalupe",
   
    "departmentId": 2
  
  },
  {
    "id": 61,
    "name": "Guarne",
   
    "departmentId": 2
  
  },
  {
    "id": 62,
    "name": "Guatapé",
   
    "departmentId": 2
  
  },
  {
    "id": 63,
    "name": "Heliconia",
   
    "departmentId": 2
  
  },
  {
    "id": 64,
    "name": "Hispania",
   
    "departmentId": 2
  
  },
  {
    "id": 65,
    "name": "Itagui",
   
    "departmentId": 2
  
  },
  {
    "id": 66,
    "name": "Ituango",
   
    "departmentId": 2
  
  },
  {
    "id": 67,
    "name": "Belmira",
   
    "departmentId": 2
  
  },
  {
    "id": 68,
    "name": "Jericó",
   
    "departmentId": 2
  
  },
  {
    "id": 69,
    "name": "La Ceja",
   
    "departmentId": 2
  
  },
  {
    "id": 70,
    "name": "La Estrella",
   
    "departmentId": 2
  
  },
  {
    "id": 71,
    "name": "La Pintada",
   
    "departmentId": 2
  
  },
  {
    "id": 72,
    "name": "La Unión",
   
    "departmentId": 2
  
  },
  {
    "id": 73,
    "name": "Liborina",
   
    "departmentId": 2
  
  },
  {
    "id": 74,
    "name": "Maceo",
   
    "departmentId": 2
  
  },
  {
    "id": 75,
    "name": "Marinilla",
   
    "departmentId": 2
  
  },
  {
    "id": 76,
    "name": "Montebello",
   
    "departmentId": 2
  
  },
  {
    "id": 77,
    "name": "Murindó",
   
    "departmentId": 2
  
  },
  {
    "id": 78,
    "name": "Mutatá",
   
    "departmentId": 2
  
  },
  {
    "id": 79,
    "name": "Nariño",
   
    "departmentId": 2
  
  },
  {
    "id": 80,
    "name": "Necoclí",
   
    "departmentId": 2
  
  },
  {
    "id": 81,
    "name": "Nechí",
   
    "departmentId": 2
  
  },
  {
    "id": 82,
    "name": "Olaya",
   
    "departmentId": 2
  
  },
  {
    "id": 83,
    "name": "Peñol",
   
    "departmentId": 2
  
  },
  {
    "id": 84,
    "name": "Peque",
   
    "departmentId": 2
  
  },
  {
    "id": 85,
    "name": "Pueblorrico",
   
    "departmentId": 2
  
  },
  {
    "id": 86,
    "name": "Puerto Berrío",
   
    "departmentId": 2
  
  },
  {
    "id": 713,
    "name": "Cerro San Antonio",
   
    "departmentId": 20
  
  },
  {
    "id": 714,
    "name": "Chivolo",
   
    "departmentId": 20
  
  },
  {
    "id": 715,
    "name": "Concordia",
   
    "departmentId": 20
  
  },
  {
    "id": 716,
    "name": "El Banco",
   
    "departmentId": 20
  
  },
  {
    "id": 717,
    "name": "El Piñon",
   
    "departmentId": 20
  
  },
  {
    "id": 718,
    "name": "El Retén",
   
    "departmentId": 20
  
  },
  {
    "id": 719,
    "name": "Fundación",
   
    "departmentId": 20
  
  },
  {
    "id": 720,
    "name": "Guamal",
   
    "departmentId": 20
  
  },
  {
    "id": 721,
    "name": "Nueva Granada",
   
    "departmentId": 20
  
  },
  {
    "id": 722,
    "name": "Pedraza",
   
    "departmentId": 20
  
  },
  {
    "id": 723,
    "name": "Pivijay",
   
    "departmentId": 20
  
  },
  {
    "id": 724,
    "name": "Plato",
   
    "departmentId": 20
  
  },
  {
    "id": 725,
    "name": "Remolino",
   
    "departmentId": 20
  
  },
  {
    "id": 726,
    "name": "Salamina",
   
    "departmentId": 20
  
  },
  {
    "id": 727,
    "name": "San Zenón",
   
    "departmentId": 20
  
  },
  {
    "id": 728,
    "name": "Santa Ana",
   
    "departmentId": 20
  
  },
  {
    "id": 729,
    "name": "Sitionuevo",
   
    "departmentId": 20
  
  },
  {
    "id": 730,
    "name": "Tenerife",
   
    "departmentId": 20
  
  },
  {
    "id": 731,
    "name": "Zapayán",
   
    "departmentId": 20
  
  },
  {
    "id": 732,
    "name": "Zona Bananera",
   
    "departmentId": 20
  
  },
  {
    "id": 733,
    "name": "San Sebastián de Buenavista",
   
    "departmentId": 20
  
  },
  {
    "id": 734,
    "name": "Sabanas de San Angel",
   
    "departmentId": 20
  
  },
  {
    "id": 735,
    "name": "Pijiño del Carmen",
   
    "departmentId": 20
  
  },
  {
    "id": 736,
    "name": "Santa Bárbara de Pinto",
   
    "departmentId": 20
  
  },
  {
    "id": 737,
    "name": "Pueblo Viejo",
   
    "departmentId": 20
  
  },
  {
    "id": 738,
    "name": "Ciénaga",
    "description": "Ciénaga es un municipio del departamento colombiano del Magdalena. Se encuentra a orillas del Mar Caribe, junto a la Sierra Nevada de Santa Marta, en el extremo nororiental de la Ciénaga Grande de Santa Marta. Está a 3 m s. n. m. y tiene una temperatura promedio de 30 °C. Dista 35 km de la ciudad de Santa Marta. Pertenece a la red de pueblos patrimonio de Colombia",
    "surface": 1242,
    "population": 129414,
    "postalCode": "478007",
    "departmentId": 20
  
  },
  {
    "id": 739,
    "name": "Uribe",
   
    "departmentId": 21
  
  },
  {
    "id": 740,
    "name": "Villavicencio",
    "description": "Villavicencio es un municipio colombiano, capital del departamento del Meta y el centro comercial más importante de los Llanos Orientales.4​ Está ubicada en el piedemonte de la Cordillera Oriental, al noroccidente del departamento del Meta, en la margen derecha del río Guatiquía.",
    "surface": 1338,
    "population": 558299,
    "postalCode": "500001",
    "departmentId": 21
  
  },
  {
    "id": 741,
    "name": "Acacias",
   
    "departmentId": 21
  
  },
  {
    "id": 742,
    "name": "Cabuyaro",
   
    "departmentId": 21
  
  },
  {
    "id": 743,
    "name": "Cubarral",
   
    "departmentId": 21
  
  },
  {
    "id": 744,
    "name": "Cumaral",
   
    "departmentId": 21
  
  },
  {
    "id": 745,
    "name": "El Calvario",
   
    "departmentId": 21
  
  },
  {
    "id": 746,
    "name": "El Castillo",
   
    "departmentId": 21
  
  },
  {
    "id": 747,
    "name": "El Dorado",
   
    "departmentId": 21
  
  },
  {
    "id": 748,
    "name": "Granada",
   
    "departmentId": 21
  
  },
  {
    "id": 749,
    "name": "Guamal",
   
    "departmentId": 21
  
  },
  {
    "id": 750,
    "name": "Mapiripán",
   
    "departmentId": 21
  
  },
  {
    "id": 751,
    "name": "Mesetas",
   
    "departmentId": 21
  
  },
  {
    "id": 752,
    "name": "La Macarena",
   
    "departmentId": 21
  
  },
  {
    "id": 753,
    "name": "Lejanías",
   
    "departmentId": 21
  
  },
  {
    "id": 754,
    "name": "Puerto Concordia",
   
    "departmentId": 21
  
  },
  {
    "id": 755,
    "name": "Puerto Gaitán",
   
    "departmentId": 21
  
  },
  {
    "id": 765,
    "name": "San Carlos de Guaroa",
   
    "departmentId": 21
  
  },
  {
    "id": 766,
    "name": "San Juan de Arama",
   
    "departmentId": 21
  
  },
  {
    "id": 767,
    "name": "Castilla la Nueva",
   
    "departmentId": 21
  
  },
  {
    "id": 768,
    "name": "Santacruz",
   
    "departmentId": 22
  
  },
  {
    "id": 769,
    "name": "Pasto",
    "description": "Pasto es un municipio colombiano, capital del departamento de Nariño, cuya cabecera municipal ostenta el nombre de San Juan de Pasto.9​ Se ubica en el suroccidente de la nación, en la región Andina.",
    "surface": 1181,
    "population": 460638,
    "postalCode": "520001",
    "departmentId": 22
  
  },
  {
    "id": 770,
    "name": "Albán",
   
    "departmentId": 22
  
  },
  {
    "id": 771,
    "name": "Aldana",
   
    "departmentId": 22
  
  },
  {
    "id": 772,
    "name": "Ancuyá",
   
    "departmentId": 22
  
  },
  {
    "id": 773,
    "name": "Barbacoas",
   
    "departmentId": 22
  
  },
  {
    "id": 774,
    "name": "Colón",
   
    "departmentId": 22
  
  },
  {
    "id": 775,
    "name": "Consaca",
   
    "departmentId": 22
  
  },
  {
    "id": 776,
    "name": "Contadero",
   
    "departmentId": 22
  
  },
  {
    "id": 777,
    "name": "Córdoba",
   
    "departmentId": 22
  
  },
  {
    "id": 778,
    "name": "Cuaspud",
   
    "departmentId": 22
  
  },
  {
    "id": 779,
    "name": "Cumbal",
   
    "departmentId": 22
  
  },
  {
    "id": 780,
    "name": "Cumbitara",
   
    "departmentId": 22
  
  },
  {
    "id": 781,
    "name": "El Charco",
   
    "departmentId": 22
  
  },
  {
    "id": 782,
    "name": "El Peñol",
   
    "departmentId": 22
  
  },
  {
    "id": 783,
    "name": "El Rosario",
   
    "departmentId": 22
  
  },
  {
    "id": 784,
    "name": "El Tambo",
   
    "departmentId": 22
  
  },
  {
    "id": 785,
    "name": "Funes",
   
    "departmentId": 22
  
  },
  {
    "id": 786,
    "name": "Guachucal",
   
    "departmentId": 22
  
  },
  {
    "id": 787,
    "name": "Guaitarilla",
   
    "departmentId": 22
  
  },
  {
    "id": 788,
    "name": "Gualmatán",
   
    "departmentId": 22
  
  },
  {
    "id": 789,
    "name": "Iles",
   
    "departmentId": 22
  
  },
  {
    "id": 790,
    "name": "Imués",
   
    "departmentId": 22
  
  },
  {
    "id": 791,
    "name": "Ipiales",
    "description": "Ipiales es un municipio colombiano ubicado en el departamento de Nariño. Situado en la frontera con Ecuador, en el nudo de los Pastos, en el altiplano andino, relativamente cerca de la costa del océano Pacífico (aproximadamente a cinco horas en bus), al pie de monte amazónico y a la línea equinoccial, siendo una región panamazónica.",
    "surface": 1707,
    "population": 148000,
    "postalCode": "524060",
    "departmentId": 22
  
  },
  {
    "id": 792,
    "name": "La Cruz",
   
    "departmentId": 22
  
  },
  {
    "id": 793,
    "name": "La Florida",
   
    "departmentId": 22
  
  },
  {
    "id": 794,
    "name": "La Llanada",
   
    "departmentId": 22
  
  },
  {
    "id": 795,
    "name": "La Tola",
   
    "departmentId": 22
  
  },
  {
    "id": 796,
    "name": "La Unión",
   
    "departmentId": 22
  
  },
  {
    "id": 797,
    "name": "Leiva",
   
    "departmentId": 22
  
  },
  {
    "id": 798,
    "name": "Linares",
   
    "departmentId": 22
  
  },
  {
    "id": 799,
    "name": "Los Andes",
   
    "departmentId": 22
  
  },
  {
    "id": 800,
    "name": "Magüí",
   
    "departmentId": 22
  
  },
  {
    "id": 801,
    "name": "Mallama",
   
    "departmentId": 22
  
  },
  {
    "id": 802,
    "name": "Mosquera",
   
    "departmentId": 22
  
  },
  {
    "id": 804,
    "name": "Olaya Herrera",
   
    "departmentId": 22
  
  },
  {
    "id": 805,
    "name": "Ospina",
   
    "departmentId": 22
  
  },
  {
    "id": 806,
    "name": "Francisco Pizarro",
   
    "departmentId": 22
  
  },
  {
    "id": 807,
    "name": "Policarpa",
   
    "departmentId": 22
  
  },
  {
    "id": 808,
    "name": "Potosí",
   
    "departmentId": 22
  
  },
  {
    "id": 809,
    "name": "Providencia",
   
    "departmentId": 22
  
  },
  {
    "id": 810,
    "name": "Puerres",
   
    "departmentId": 22
  
  },
  {
    "id": 811,
    "name": "Pupiales",
   
    "departmentId": 22
  
  },
  {
    "id": 812,
    "name": "Ricaurte",
   
    "departmentId": 22
  
  },
  {
    "id": 813,
    "name": "Roberto Payán",
   
    "departmentId": 22
  
  },
  {
    "id": 814,
    "name": "Samaniego",
   
    "departmentId": 22
  
  },
  {
    "id": 815,
    "name": "Sandoná",
   
    "departmentId": 22
  
  },
  {
    "id": 816,
    "name": "San Bernardo",
   
    "departmentId": 22
  
  },
  {
    "id": 817,
    "name": "San Lorenzo",
   
    "departmentId": 22
  
  },
  {
    "id": 818,
    "name": "San Pablo",
   
    "departmentId": 22
  
  },
  {
    "id": 819,
    "name": "Santa Bárbara",
   
    "departmentId": 22
  
  },
  {
    "id": 820,
    "name": "Sapuyes",
   
    "departmentId": 22
  
  },
  {
    "id": 821,
    "name": "Taminango",
   
    "departmentId": 22
  
  },
  {
    "id": 822,
    "name": "Tangua",
   
    "departmentId": 22
  
  },
  {
    "id": 823,
    "name": "Túquerres",
   
    "departmentId": 22
  
  },
  {
    "id": 824,
    "name": "Yacuanquer",
   
    "departmentId": 22
  
  },
  {
    "id": 825,
    "name": "San Pedro de Cartago",
   
    "departmentId": 22
  
  },
  {
    "id": 826,
    "name": "El Tablón de Gómez",
   
    "departmentId": 22
  
  },
  {
    "id": 827,
    "name": "Buesaco",
   
    "departmentId": 22
  
  },
  {
    "id": 828,
    "name": "San Andrés de Tumaco",
   
    "departmentId": 22
  
  },
  {
    "id": 829,
    "name": "Belén",
   
    "departmentId": 22
  
  },
  {
    "id": 830,
    "name": "Chachagüí",
   
    "departmentId": 22
  
  },
  {
    "id": 831,
    "name": "Arboleda",
   
    "departmentId": 22
  
  },
  {
    "id": 832,
    "name": "Silos",
   
    "departmentId": 23
  
  },
  {
    "id": 833,
    "name": "Cácota",
   
    "departmentId": 23
  
  },
  {
    "id": 834,
    "name": "Toledo",
   
    "departmentId": 23
  
  },
  {
    "id": 835,
    "name": "Mutiscua",
   
    "departmentId": 23
  
  },
  {
    "id": 836,
    "name": "El Zulia",
   
    "departmentId": 23
  
  },
  {
    "id": 837,
    "name": "Salazar",
   
    "departmentId": 23
  
  },
  {
    "id": 838,
    "name": "Cucutilla",
   
    "departmentId": 23
  
  },
  {
    "id": 839,
    "name": "Puerto Santander",
   
    "departmentId": 23
  
  },
  {
    "id": 840,
    "name": "Gramalote",
   
    "departmentId": 23
  
  },
  {
    "id": 841,
    "name": "El Tarra",
   
    "departmentId": 23
  
  },
  {
    "id": 842,
    "name": "Teorama",
   
    "departmentId": 23
  
  },
  {
    "id": 843,
    "name": "Arboledas",
   
    "departmentId": 23
  
  },
  {
    "id": 844,
    "name": "Lourdes",
   
    "departmentId": 23
  
  },
  {
    "id": 845,
    "name": "Bochalema",
   
    "departmentId": 23
  
  },
  {
    "id": 846,
    "name": "Convención",
   
    "departmentId": 23
  
  },
  {
    "id": 847,
    "name": "Hacarí",
   
    "departmentId": 23
  
  },
  {
    "id": 848,
    "name": "Herrán",
   
    "departmentId": 23
  
  },
  {
    "id": 849,
    "name": "Tibú",
   
    "departmentId": 23
  
  },
  {
    "id": 850,
    "name": "San Cayetano",
   
    "departmentId": 23
  
  },
  {
    "id": 851,
    "name": "San Calixto",
   
    "departmentId": 23
  
  },
  {
    "id": 852,
    "name": "La Playa",
   
    "departmentId": 23
  
  },
  {
    "id": 853,
    "name": "Chinácota",
   
    "departmentId": 23
  
  },
  {
    "id": 854,
    "name": "Ragonvalia",
   
    "departmentId": 23
  
  },
  {
    "id": 855,
    "name": "La Esperanza",
   
    "departmentId": 23
  
  },
  {
    "id": 856,
    "name": "Villa del Rosario",
   
    "departmentId": 23
  
  },
  {
    "id": 857,
    "name": "Chitagá",
   
    "departmentId": 23
  
  },
  {
    "id": 858,
    "name": "Sardinata",
   
    "departmentId": 23
  
  },
  {
    "id": 859,
    "name": "Abrego",
   
    "departmentId": 23
  
  },
  {
    "id": 860,
    "name": "Los Patios",
   
    "departmentId": 23
  
  },
  {
    "id": 861,
    "name": "Ocaña",
    "description": "Ocaña es un municipio colombiano ubicado en el departamento de Norte de Santander, al nororiente del país. Se encuentra dentro de la Subregión de Occidente, conocida coloquialmente como la Provincia de Ocaña. El municipio cuenta con una extensión de 672,27 km² y una altitud media de 1202",
    "surface": 672,
    "population": 129308,
    "postalCode": "546551",
    "departmentId": 23
  
  },
  {
    "id": 862,
    "name": "Bucarasica",
   
    "departmentId": 23
  
  },
  {
    "id": 863,
    "name": "Santiago",
   
    "departmentId": 23
  
  },
  {
    "id": 864,
    "name": "Labateca",
   
    "departmentId": 23
  
  },
  {
    "id": 865,
    "name": "Cachirá",
   
    "departmentId": 23
  
  },
  {
    "id": 866,
    "name": "Villa Caro",
   
    "departmentId": 23
  
  },
  {
    "id": 867,
    "name": "Durania",
   
    "departmentId": 23
  
  },
  {
    "id": 868,
    "name": "Pamplona",
    "description": "Pamplona es un municipio colombiano, ubicado en el departamento de Norte de Santander. Fue la capital de la Provincia de Pamplona y su economía está basada en la gastronomía, la agricultura, el turismo (especialmente el turismo religioso) y la educación. Se le conoce como la \"Ciudad Mitrada\", debido a que en ella se instauró la Arquidiócesis de Nueva Pamplona",
    "surface": 318,
    "population": 59422,
    "postalCode": "543050",
    "departmentId": 23
  
  },
  {
    "id": 869,
    "name": "Pamplonita",
   
    "departmentId": 23
  
  },
  {
    "id": 870,
    "name": "Cúcuta",
    "description": "Cúcuta, oficialmente San José de Cúcuta, es un municipio colombiano, capital del departamento de Norte de Santander y núcleo del Área Metropolitana de Cúcuta. La ciudad está situada en el valle homónimo, al pie de la Cordillera Oriental de los Andes Colombianos, próxima a la frontera con Venezuela. Comprende una superficie aproximada de 1117 km², con un área urbana de 64 km² (dividida en 10 comunas) y un área rural de 1053 km² (dividida en 10 corregimientos)",
    "surface": 1117,
    "population": 777106,
    "postalCode": "540001",
    "departmentId": 23
  
  },
  {
    "id": 871,
    "name": "El Carmen",
   
    "departmentId": 23
  
  },
  {
    "id": 872,
    "name": "Mocoa",
    "description": "Mocoa es un municipio colombiano y capital del departamento de Putumayo, cuya cabecera municipal ostenta el nombre de San Miguel de Agreda de Mocoa. Se sitúa en el suroccidente de Colombia, siendo el segundo municipio de mayor población en el departamento.",
    "surface": 1263,
    "population": 58938,
    "postalCode": "860001",
    "departmentId": 24
  
  },
  {
    "id": 873,
    "name": "Colón",
   
    "departmentId": 24
  
  },
  {
    "id": 874,
    "name": "Orito",
   
    "departmentId": 24
  
  },
  {
    "id": 875,
    "name": "Puerto Caicedo",
   
    "departmentId": 24
  
  },
  {
    "id": 876,
    "name": "Puerto Guzmán",
   
    "departmentId": 24
  
  },
  {
    "id": 877,
    "name": "Leguízamo",
   
    "departmentId": 24
  
  },
  {
    "id": 878,
    "name": "Sibundoy",
   
    "departmentId": 24
  
  },
  {
    "id": 879,
    "name": "San Francisco",
   
    "departmentId": 24
  
  },
  {
    "id": 880,
    "name": "San Miguel",
   
    "departmentId": 24
  
  },
  {
    "id": 881,
    "name": "Santiago",
   
    "departmentId": 24
  
  },
  {
    "id": 882,
    "name": "Valle de Guamez",
   
    "departmentId": 24
  
  },
  {
    "id": 883,
    "name": "Puerto Asís",
    "description": "Puerto Asís es un municipio colombiano localizado en el departamento del Putumayo. Conocido como la capital comercial del Putumayo por su predominio de las actividades del sector terciario o servicios en su economía que lo convierten el municipio con mayor peso relativo municipal en el valor agregado departamental (25.4 %).2​ Es también el municipio con mayor población en el departamento",
    "surface": 2610,
    "population": 113893,
    "postalCode": "862060",
    "departmentId": 24
  
  },
  {
    "id": 884,
    "name": "Villagarzón",
   
    "departmentId": 24
  
  },
  {
    "id": 885,
    "name": "Armenia",
    "description": "Armenia es un municipio colombiano, capital del departamento del Quindío y núcleo económico de su área metropolitana. Es una de las principales ciudades del eje cafetero colombiano, la región paisa y el Paisaje Cultural Cafetero.4​ Fundada en 1889 durante la colonización antioqueña, basó su economía en la agricultura",
    "surface": 121,
    "population": 316926,
    "postalCode": "630001",
    "departmentId": 25
  
  },
  {
    "id": 886,
    "name": "Buenavista",
   
    "departmentId": 25
  
  },
  {
    "id": 887,
    "name": "Circasia",
   
    "departmentId": 25
  
  },
  {
    "id": 888,
    "name": "Córdoba",
   
    "departmentId": 25
  
  },
  {
    "id": 889,
    "name": "Filandia",
   
    "departmentId": 25
  
  },
  {
    "id": 890,
    "name": "La Tebaida",
   
    "departmentId": 25
  
  },
  {
    "id": 891,
    "name": "Montenegro",
   
    "departmentId": 25
  
  },
  {
    "id": 892,
    "name": "Pijao",
   
    "departmentId": 25
  
  },
  {
    "id": 893,
    "name": "Quimbaya",
   
    "departmentId": 25
  
  },
  {
    "id": 894,
    "name": "Salento",
   
    "departmentId": 25
  
  },
  {
    "id": 895,
    "name": "Calarcá",
   
    "departmentId": 25
  
  },
  {
    "id": 896,
    "name": "Génova",
   
    "departmentId": 25
  
  },
  {
    "id": 897,
    "name": "Pereira",
    "description": "Pereira es un municipio colombiano, capital del departamento de Risaralda. Es la ciudad más poblada de la región del eje cafetero; integra el Área Metropolitana de Centro Occidente junto con los municipios de Dosquebradas y La Virginia. Está ubicada en la región centro-occidente del país, en el valle del río Otún en la Cordillera Central de los Andes colombianos.",
    "surface": 702,
    "population": 477027,
    "postalCode": "660000",
    "departmentId": 26
  
  },
  {
    "id": 898,
    "name": "Apía",
   
    "departmentId": 26
  
  },
  {
    "id": 899,
    "name": "Balboa",
   
    "departmentId": 26
  
  },
  {
    "id": 900,
    "name": "Dosquebradas",
   
    "departmentId": 26
  
  },
  {
    "id": 901,
    "name": "Guática",
   
    "departmentId": 26
  
  },
  {
    "id": 902,
    "name": "La Celia",
   
    "departmentId": 26
  
  },
  {
    "id": 903,
    "name": "La Virginia",
   
    "departmentId": 26
  
  },
  {
    "id": 904,
    "name": "Marsella",
   
    "departmentId": 26
  
  },
  {
    "id": 905,
    "name": "Mistrató",
   
    "departmentId": 26
  
  },
  {
    "id": 906,
    "name": "Pueblo Rico",
   
    "departmentId": 26
  
  },
  {
    "id": 907,
    "name": "Quinchía",
   
    "departmentId": 26
  
  },
  {
    "id": 908,
    "name": "Santuario",
   
    "departmentId": 26
  
  },
  {
    "id": 909,
    "name": "Santa Rosa de Cabal",
   
    "departmentId": 26
  
  },
  {
    "id": 910,
    "name": "Belén de Umbría",
   
    "departmentId": 26
  
  },
  {
    "id": 911,
    "name": "Providencia",
   
    "departmentId": 27
  
  },
  {
    "id": 912,
    "name": "San Andrés",
    "description": "San Andrés, conocido localmente como North End o Sector del Centro es el centro administrativo, turístico y comercial del departamento colombiano de San Andrés, Providencia y Santa Catalina.",
    "surface": 26,
    "population": 71305,
    "postalCode": "880001",
    "departmentId": 27
  
  },
  {
    "id": 913,
    "name": "Puerto Wilches",
   
    "departmentId": 28
  
  },
  {
    "id": 914,
    "name": "Puerto Parra",
   
    "departmentId": 28
  
  },
  {
    "id": 915,
    "name": "Bucaramanga",
    "description": "Bucaramanga es un municipio colombiano, capital del departamento de Santander. En 2015 un informe del Banco Mundial la situó como una de las urbes más competitivas y con mejor calidad de vida en América Latina.12​ Está ubicada al nororiente del país sobre la Cordillera Oriental, rama de la cordillera de los Andes, a orillas del río de Oro.",
    "surface": 162,
    "population": 612274,
    "postalCode": "680001",
    "departmentId": 28
  
  },
  {
    "id": 916,
    "name": "Aguada",
   
    "departmentId": 28
  
  },
  {
    "id": 917,
    "name": "Albania",
   
    "departmentId": 28
  
  },
  {
    "id": 918,
    "name": "Aratoca",
   
    "departmentId": 28
  
  },
  {
    "id": 919,
    "name": "Barbosa",
   
    "departmentId": 28
  
  },
  {
    "id": 920,
    "name": "Barichara",
   
    "departmentId": 28
  
  },
  {
    "id": 921,
    "name": "Barrancabermeja",
    "description": "Barrancabermeja, oficialmente Distrito Especial, Portuario, Industrial, Turístico y Biodiverso de Barrancabermeja, es un distrito colombiano ubicado a orillas del río Magdalena, en la parte occidental del departamento de Santander. Es la ciudad industrial más importante del departamento de Santander, sede de la refinería de petróleo más grande del país y es la capital de la Provincia de Yariguíes",
    "surface": 1154,
    "population": 210729,
    "postalCode": "687031",
    "departmentId": 28
  
  },
  {
    "id": 922,
    "name": "Betulia",
   
    "departmentId": 28
  
  },
  {
    "id": 923,
    "name": "Bolívar",
   
    "departmentId": 28
  
  },
  {
    "id": 924,
    "name": "Cabrera",
   
    "departmentId": 28
  
  },
  {
    "id": 925,
    "name": "California",
   
    "departmentId": 28
  
  },
  {
    "id": 926,
    "name": "Carcasí",
   
    "departmentId": 28
  
  },
  {
    "id": 927,
    "name": "Cepitá",
   
    "departmentId": 28
  
  },
  {
    "id": 928,
    "name": "Cerrito",
    "description": " ",
    "surface": null,
    "population": null,
    "postalCode": null,
    "departmentId": 28
  
  },
  {
    "id": 929,
    "name": "Charalá",
   
    "departmentId": 28
  
  },
  {
    "id": 930,
    "name": "Charta",
   
    "departmentId": 28
  
  },
  {
    "id": 931,
    "name": "Chipatá",
   
    "departmentId": 28
  
  },
  {
    "id": 932,
    "name": "Cimitarra",
   
    "departmentId": 28
  
  },
  {
    "id": 933,
    "name": "Concepción",
   
    "departmentId": 28
  
  },
  {
    "id": 934,
    "name": "Confines",
   
    "departmentId": 28
  
  },
  {
    "id": 935,
    "name": "Contratación",
   
    "departmentId": 28
  
  },
  {
    "id": 936,
    "name": "Coromoro",
   
    "departmentId": 28
  
  },
  {
    "id": 937,
    "name": "Curití",
   
    "departmentId": 28
  
  },
  {
    "id": 938,
    "name": "El Guacamayo",
   
    "departmentId": 28
  
  },
  {
    "id": 939,
    "name": "El Playón",
   
    "departmentId": 28
  
  },
  {
    "id": 940,
    "name": "Encino",
   
    "departmentId": 28
  
  },
  {
    "id": 941,
    "name": "Enciso",
   
    "departmentId": 28
  
  },
  {
    "id": 942,
    "name": "Florián",
   
    "departmentId": 28
  
  },
  {
    "id": 943,
    "name": "Floridablanca",
   
    "departmentId": 28
  
  },
  {
    "id": 944,
    "name": "Galán",
   
    "departmentId": 28
  
  },
  {
    "id": 945,
    "name": "Gambita",
   
    "departmentId": 28
  
  },
  {
    "id": 946,
    "name": "Girón",
   
    "departmentId": 28
  
  },
  {
    "id": 947,
    "name": "Guaca",
   
    "departmentId": 28
  
  },
  {
    "id": 948,
    "name": "Guadalupe",
   
    "departmentId": 28
  
  },
  {
    "id": 949,
    "name": "Guapotá",
   
    "departmentId": 28
  
  },
  {
    "id": 950,
    "name": "Guavatá",
   
    "departmentId": 28
  
  },
  {
    "id": 951,
    "name": "Güepsa",
   
    "departmentId": 28
  
  },
  {
    "id": 952,
    "name": "Jesús María",
   
    "departmentId": 28
  
  },
  {
    "id": 953,
    "name": "Jordán",
   
    "departmentId": 28
  
  },
  {
    "id": 954,
    "name": "La Belleza",
   
    "departmentId": 28
  
  },
  {
    "id": 955,
    "name": "Landázuri",
   
    "departmentId": 28
  
  },
  {
    "id": 956,
    "name": "La Paz",
   
    "departmentId": 28
  
  },
  {
    "id": 957,
    "name": "Lebríja",
   
    "departmentId": 28
  
  },
  {
    "id": 958,
    "name": "Los Santos",
   
    "departmentId": 28
  
  },
  {
    "id": 959,
    "name": "Macaravita",
   
    "departmentId": 28
  
  },
  {
    "id": 960,
    "name": "Málaga",
   
    "departmentId": 28
  
  },
  {
    "id": 961,
    "name": "Matanza",
   
    "departmentId": 28
  
  },
  {
    "id": 962,
    "name": "Mogotes",
   
    "departmentId": 28
  
  },
  {
    "id": 963,
    "name": "Molagavita",
   
    "departmentId": 28
  
  },
  {
    "id": 964,
    "name": "Ocamonte",
   
    "departmentId": 28
  
  },
  {
    "id": 965,
    "name": "Oiba",
   
    "departmentId": 28
  
  },
  {
    "id": 966,
    "name": "Onzaga",
   
    "departmentId": 28
  
  },
  {
    "id": 967,
    "name": "Palmar",
   
    "departmentId": 28
  
  },
  {
    "id": 968,
    "name": "Páramo",
   
    "departmentId": 28
  
  },
  {
    "id": 969,
    "name": "Piedecuesta",
   
    "departmentId": 28
  
  },
  {
    "id": 970,
    "name": "Pinchote",
   
    "departmentId": 28
  
  },
  {
    "id": 971,
    "name": "Puente Nacional",
   
    "departmentId": 28
  
  },
  {
    "id": 972,
    "name": "Rionegro",
   
    "departmentId": 28
  
  },
  {
    "id": 973,
    "name": "San Andrés",
   
    "departmentId": 28
  
  },
  {
    "id": 974,
    "name": "San Gil",
    "description": "San Gil es un municipio colombiano ubicado en el departamento de Santander. Se sitúa sobre el eje vial entre Bucaramanga y Bogotá, y constituye el núcleo urbano más importante del sur del departamento de Santander. En el 2004 fue designado como la Capital Turística del departamento.",
    "surface": 149,
    "population": 59670,
    "postalCode": "684031",
    "departmentId": 28
  
  },
  {
    "id": 975,
    "name": "San Joaquín",
   
    "departmentId": 28
  
  },
  {
    "id": 976,
    "name": "San Miguel",
   
    "departmentId": 28
  
  },
  {
    "id": 977,
    "name": "Santa Bárbara",
   
    "departmentId": 28
  
  },
  {
    "id": 978,
    "name": "Simacota",
   
    "departmentId": 28
  
  },
  {
    "id": 979,
    "name": "Socorro",
   
    "departmentId": 28
  
  },
  {
    "id": 980,
    "name": "Suaita",
   
    "departmentId": 28
  
  },
  {
    "id": 981,
    "name": "Sucre",
   
    "departmentId": 28
  
  },
  {
    "id": 982,
    "name": "Suratá",
   
    "departmentId": 28
  
  },
  {
    "id": 983,
    "name": "Tona",
   
    "departmentId": 28
  
  },
  {
    "id": 984,
    "name": "Vélez",
   
    "departmentId": 28
  
  },
  {
    "id": 985,
    "name": "Vetas",
   
    "departmentId": 28
  
  },
  {
    "id": 986,
    "name": "Villanueva",
   
    "departmentId": 28
  
  },
  {
    "id": 987,
    "name": "Zapatoca",
   
    "departmentId": 28
  
  },
  {
    "id": 988,
    "name": "Palmas del Socorro",
   
    "departmentId": 28
  
  },
  {
    "id": 989,
    "name": "San Vicente de Chucurí",
   
    "departmentId": 28
  
  },
  {
    "id": 990,
    "name": "San José de Miranda",
   
    "departmentId": 28
  
  },
  {
    "id": 991,
    "name": "Santa Helena del Opón",
   
    "departmentId": 28
  
  },
  {
    "id": 992,
    "name": "Sabana de Torres",
   
    "departmentId": 28
  
  },
  {
    "id": 993,
    "name": "El Carmen de Chucurí",
   
    "departmentId": 28
  
  },
  {
    "id": 994,
    "name": "Valle de San José",
   
    "departmentId": 28
  
  },
  {
    "id": 995,
    "name": "San Benito",
   
    "departmentId": 28
  
  },
  {
    "id": 996,
    "name": "Hato",
   
    "departmentId": 28
  
  },
  {
    "id": 997,
    "name": "Chimá",
   
    "departmentId": 28
  
  },
  {
    "id": 998,
    "name": "Capitanejo",
   
    "departmentId": 28
  
  },
  {
    "id": 999,
    "name": "El Peñón",
   
    "departmentId": 28
  
  },
  {
    "id": 1000,
    "name": "Sincelejo",
    "description": "Sincelejo es un municipio colombiano, capital del departamento de Sucre. Se encuentra ubicado al noroeste del país, en el Caribe Colombiano exactamente en la subregión Sabanas.",
    "surface": 284,
    "population": 301126,
    "postalCode": "700001",
    "departmentId": 29
  
  },
  {
    "id": 1001,
    "name": "Buenavista",
   
    "departmentId": 29
  
  },
  {
    "id": 1002,
    "name": "Caimito",
   
    "departmentId": 29
  
  },
  {
    "id": 1003,
    "name": "Coloso",
   
    "departmentId": 29
  
  },
  {
    "id": 1004,
    "name": "Coveñas",
   
    "departmentId": 29
  
  },
  {
    "id": 1005,
    "name": "Chalán",
   
    "departmentId": 29
  
  },
  {
    "id": 1006,
    "name": "El Roble",
   
    "departmentId": 29
  
  },
  {
    "id": 1007,
    "name": "Galeras",
   
    "departmentId": 29
  
  },
  {
    "id": 1008,
    "name": "Guaranda",
   
    "departmentId": 29
  
  },
  {
    "id": 1009,
    "name": "La Unión",
   
    "departmentId": 29
  
  },
  {
    "id": 1010,
    "name": "Los Palmitos",
   
    "departmentId": 29
  
  },
  {
    "id": 1011,
    "name": "Majagual",
   
    "departmentId": 29
  
  },
  {
    "id": 1012,
    "name": "Morroa",
   
    "departmentId": 29
  
  },
  {
    "id": 1013,
    "name": "Ovejas",
   
    "departmentId": 29
  
  },
  {
    "id": 1014,
    "name": "Palmito",
   
    "departmentId": 29
  
  },
  {
    "id": 1015,
    "name": "San Benito Abad",
   
    "departmentId": 29
  
  },
  {
    "id": 1016,
    "name": "San Marcos",
   
    "departmentId": 29
  
  },
  {
    "id": 1017,
    "name": "San Onofre",
   
    "departmentId": 29
  
  },
  {
    "id": 1018,
    "name": "San Pedro",
   
    "departmentId": 29
  
  },
  {
    "id": 1019,
    "name": "Sucre",
   
    "departmentId": 29
  
  },
  {
    "id": 1020,
    "name": "Tolú Viejo",
   
    "departmentId": 29
  
  },
  {
    "id": 1021,
    "name": "San Luis de Sincé",
   
    "departmentId": 29
  
  },
  {
    "id": 1022,
    "name": "San Juan de Betulia",
   
    "departmentId": 29
  
  },
  {
    "id": 1023,
    "name": "Santiago de Tolú",
   
    "departmentId": 29
  
  },
  {
    "id": 1024,
    "name": "Sampués",
   
    "departmentId": 29
  
  },
  {
    "id": 1025,
    "name": "Corozal",
   
    "departmentId": 29
  
  },
  {
    "id": 1026,
    "name": "Alpujarra",
   
    "departmentId": 30
  
  },
  {
    "id": 1027,
    "name": "Alvarado",
   
    "departmentId": 30
  
  },
  {
    "id": 1028,
    "name": "Ambalema",
   
    "departmentId": 30
  
  },
  {
    "id": 1029,
    "name": "Armero",
   
    "departmentId": 30
  
  },
  {
    "id": 1030,
    "name": "Ataco",
   
    "departmentId": 30
  
  },
  {
    "id": 1031,
    "name": "Cajamarca",
   
    "departmentId": 30
  
  },
  {
    "id": 1032,
    "name": "Chaparral",
   
    "departmentId": 30
  
  },
  {
    "id": 1033,
    "name": "Coello",
   
    "departmentId": 30
  
  },
  {
    "id": 1034,
    "name": "Coyaima",
   
    "departmentId": 30
  
  },
  {
    "id": 1035,
    "name": "Cunday",
   
    "departmentId": 30
  
  },
  {
    "id": 1036,
    "name": "Dolores",
   
    "departmentId": 30
  
  },
  {
    "id": 1037,
    "name": "Espinal",
    "description": "El Espinal es un municipio colombiano ubicado en el departamento de Tolima, a 153 km de Bogotá con dirección suroccidente, y a 57,6 km de Ibagué, capital departamental; es el segundo municipio más poblado del departamento del Tolima y es conocido como la capital arrocera del centro del país.",
    "surface": 231,
    "population": 76056,
    "postalCode": "733520",
    "departmentId": 30
  
  },
  {
    "id": 1038,
    "name": "Falan",
   
    "departmentId": 30
  
  },
  {
    "id": 1039,
    "name": "Flandes",
   
    "departmentId": 30
  
  },
  {
    "id": 1040,
    "name": "Fresno",
   
    "departmentId": 30
  
  },
  {
    "id": 1041,
    "name": "Guamo",
   
    "departmentId": 30
  
  },
  {
    "id": 1042,
    "name": "Herveo",
   
    "departmentId": 30
  
  },
  {
    "id": 1043,
    "name": "Honda",
   
    "departmentId": 30
  
  },
  {
    "id": 1044,
    "name": "Icononzo",
   
    "departmentId": 30
  
  },
  {
    "id": 1045,
    "name": "Mariquita",
   
    "departmentId": 30
  
  },
  {
    "id": 1046,
    "name": "Melgar",
   
    "departmentId": 30
  
  },
  {
    "id": 1047,
    "name": "Murillo",
   
    "departmentId": 30
  
  },
  {
    "id": 1048,
    "name": "Natagaima",
   
    "departmentId": 30
  
  },
  {
    "id": 1049,
    "name": "Ortega",
   
    "departmentId": 30
  
  },
  {
    "id": 1050,
    "name": "Palocabildo",
   
    "departmentId": 30
  
  },
  {
    "id": 1051,
    "name": "Piedras",
   
    "departmentId": 30
  
  },
  {
    "id": 1052,
    "name": "Planadas",
   
    "departmentId": 30
  
  },
  {
    "id": 1053,
    "name": "Prado",
   
    "departmentId": 30
  
  },
  {
    "id": 1054,
    "name": "Purificación",
   
    "departmentId": 30
  
  },
  {
    "id": 1055,
    "name": "Rio Blanco",
   
    "departmentId": 30
  
  },
  {
    "id": 1056,
    "name": "Roncesvalles",
   
    "departmentId": 30
  
  },
  {
    "id": 1057,
    "name": "Rovira",
   
    "departmentId": 30
  
  },
  {
    "id": 1058,
    "name": "Saldaña",
   
    "departmentId": 30
  
  },
  {
    "id": 1059,
    "name": "Santa Isabel",
   
    "departmentId": 30
  
  },
  {
    "id": 1060,
    "name": "Venadillo",
   
    "departmentId": 30
  
  },
  {
    "id": 1061,
    "name": "Villahermosa",
   
    "departmentId": 30
  
  },
  {
    "id": 1062,
    "name": "Villarrica",
   
    "departmentId": 30
  
  },
  {
    "id": 1063,
    "name": "Valle de San Juan",
   
    "departmentId": 30
  
  },
  {
    "id": 1064,
    "name": "Carmen de Apicala",
   
    "departmentId": 30
  
  },
  {
    "id": 1065,
    "name": "San Luis",
   
    "departmentId": 30
  
  },
  {
    "id": 1066,
    "name": "San Antonio",
   
    "departmentId": 30
  
  },
  {
    "id": 1067,
    "name": "Casabianca",
   
    "departmentId": 30
  
  },
  {
    "id": 1068,
    "name": "Anzoátegui",
   
    "departmentId": 30
  
  },
  {
    "id": 1069,
    "name": "Ibagué",
    "description": "Ibagué es un municipio colombiano ubicado en el centro-occidente de Colombia, sobre la Cordillera Central de los Andes entre el Cañón del Combeima y el Valle del Magdalena, en cercanías del Nevado del Tolima. Es la capital del departamento de Tolima. Se encuentra a una altitud promedio de 1285",
    "surface": 1439,
    "population": 541101,
    "postalCode": "730001",
    "departmentId": 30
  
  },
  {
    "id": 1070,
    "name": "Líbano",
   
    "departmentId": 30
  
  },
  {
    "id": 1071,
    "name": "Lérida",
   
    "departmentId": 30
  
  },
  {
    "id": 1072,
    "name": "Suárez",
   
    "departmentId": 30
  
  },
  {
    "id": 1073,
    "name": "El Dovio",
   
    "departmentId": 31
  
  },
  {
    "id": 1074,
    "name": "Roldanillo",
   
    "departmentId": 31
  
  },
  {
    "id": 1075,
    "name": "Argelia",
   
    "departmentId": 31
  
  },
  {
    "id": 1076,
    "name": "Sevilla",
   
    "departmentId": 31
  
  },
  {
    "id": 1077,
    "name": "Zarzal",
   
    "departmentId": 31
  
  },
  {
    "id": 1078,
    "name": "El Cerrito",
   
    "departmentId": 31
  
  },
  {
    "id": 1079,
    "name": "Cartago",
    "description": "Cartago es un municipio colombiano ubicado al norte del departamento del Valle del Cauca, que está localizado a orillas del río La Vieja y por el costado occidental de su territorio transcurre el río Cauca. Es conocido como La Villa de Robledo y también como La ciudad del Sol más alegre de Colombia. Fue fundado inicialmente en 1540 en el lugar donde hoy se encuentra la ciudad de Pereira",
    "surface": 279,
    "population": 134963,
    "postalCode": "762021",
    "departmentId": 31
  
  },
  {
    "id": 1080,
    "name": "Caicedonia",
   
    "departmentId": 31
  
  },
  {
    "id": 1081,
    "name": "El Cairo",
   
    "departmentId": 31
  
  },
  {
    "id": 1082,
    "name": "La Unión",
   
    "departmentId": 31
  
  },
  {
    "id": 1083,
    "name": "Restrepo",
   
    "departmentId": 31
  
  },
  {
    "id": 1084,
    "name": "Dagua",
   
    "departmentId": 31
  
  },
  {
    "id": 1085,
    "name": "Guacarí",
   
    "departmentId": 31
  
  },
  {
    "id": 1086,
    "name": "Ansermanuevo",
   
    "departmentId": 31
  
  },
  {
    "id": 1087,
    "name": "Bugalagrande",
   
    "departmentId": 31
  
  },
  {
    "id": 1088,
    "name": "La Victoria",
   
    "departmentId": 31
  
  },
  {
    "id": 1089,
    "name": "Ginebra",
   
    "departmentId": 31
  
  },
  {
    "id": 1090,
    "name": "Yumbo",
   
    "departmentId": 31
  
  },
  {
    "id": 1091,
    "name": "Obando",
   
    "departmentId": 31
  
  },
  {
    "id": 1092,
    "name": "Bolívar",
   
    "departmentId": 31
  
  },
  {
    "id": 1093,
    "name": "Cali",
    "description": "Cali, oficialmente Distrito Especial, Deportivo, Cultural, Turístico, Empresarial y de Servicios de Santiago de Cali,8​9​10​ es un distrito colombiano, capital del departamento de Valle del Cauca,2​ la tercera ciudad más poblada y el tercer centro económico y cultural de Colombia. Está situada en la región Sur del Valle del Cauca.",
    "surface": 619,
    "population": 2545682,
    "postalCode": "760000",
    "departmentId": 31
  
  },
  {
    "id": 1094,
    "name": "San Pedro",
   
    "departmentId": 31
  
  },
  {
    "id": 1095,
    "name": "Guadalajara de Buga",
   
    "departmentId": 31
  
  },
  {
    "id": 1096,
    "name": "Calima",
   
    "departmentId": 31
  
  },
  {
    "id": 1097,
    "name": "Andalucía",
   
    "departmentId": 31
  
  },
  {
    "id": 1098,
    "name": "Pradera",
   
    "departmentId": 31
  
  },
  {
    "id": 1099,
    "name": "Yotoco",
   
    "departmentId": 31
  
  },
  {
    "id": 1100,
    "name": "Palmira",
    "description": "Palmira es un municipio colombiano del departamento del Valle del Cauca en Colombia; localizado en la región sur del departamento. Es conocido como La Villa de las Palmas.",
    "surface": 1123,
    "population": 310608,
    "postalCode": "763531",
    "departmentId": 31
  
  },
  {
    "id": 1101,
    "name": "Riofrío",
   
    "departmentId": 31
  
  },
  {
    "id": 1102,
    "name": "Alcalá",
   
    "departmentId": 31
  
  },
  {
    "id": 1103,
    "name": "Versalles",
   
    "departmentId": 31
  
  },
  {
    "id": 1104,
    "name": "El Águila",
   
    "departmentId": 31
  
  },
  {
    "id": 1105,
    "name": "Toro",
   
    "departmentId": 31
  
  },
  {
    "id": 1106,
    "name": "Candelaria",
   
    "departmentId": 31
  
  },
  {
    "id": 1107,
    "name": "La Cumbre",
   
    "departmentId": 31
  
  },
  {
    "id": 1108,
    "name": "Ulloa",
   
    "departmentId": 31
  
  },
  {
    "id": 1109,
    "name": "Trujillo",
   
    "departmentId": 31
  
  },
  {
    "id": 1110,
    "name": "Vijes",
   
    "departmentId": 31
  
  },
  {
    "id": 1111,
    "name": "Tuluá",
    "description": "Tuluá es un municipio colombiano ubicado en la región central del departamento del Valle del Cauca.3​ Es un motor comercial, demográfico, cultural, industrial, financiero y agropecuario del centro del departamento. Posee una cámara de comercio y es el cuarto municipio más poblado del Valle del Cauca",
    "surface": 910,
    "population": 218812,
    "postalCode": "764501",
    "departmentId": 31
  
  },
  {
    "id": 1112,
    "name": "Florida",
   
    "departmentId": 31
  
  },
  {
    "id": 1113,
    "name": "Jamundí",
   
    "departmentId": 31
  
  },
  {
    "id": 1114,
    "name": "Buenaventura",
    "description": "Buenaventura, oficialmente Distrito Especial, Industrial, Portuario, Biodiverso y Ecoturístico de Buenaventura, es un distrito, una ciudad y el principal puerto marítimo de Colombia y uno de los diez puertos más importantes de América Latina; se estima que Buenaventura mueve más del 53 % del comercio internacional del país",
    "surface": 6078,
    "population": 308188,
    "postalCode": "764501",
    "departmentId": 31
  
  },
  {
    "id": 1115,
    "name": "Mitú",
    "description": "Mitú es la capital del departamento del Vaupés, ubicado en la parte suroriental de Colombia y sobre la frontera con Brasil. El municipio se localiza predominantemente sobre la margen derecha del río Vaupés. Con cerca de 16.422 km², según el censo del DANE, y con una población aproximada de 16.580 habitantes, en donde predominan 27 etnias indígenas diferentes",
    "surface": 16422,
    "population": 31568,
    "postalCode": "970001",
    "departmentId": 32
  
  },
  {
    "id": 1116,
    "name": "Carurú",
   
    "departmentId": 32
  
  },
  {
    "id": 1117,
    "name": "Taraira",
   
    "departmentId": 32
  
  },
  {
    "id": 1118,
    "name": "Papunahua",
   
    "departmentId": 32
  
  },
  {
    "id": 1119,
    "name": "Yavaraté",
   
    "departmentId": 32
  
  },
  {
    "id": 1120,
    "name": "Pacoa",
   
    "departmentId": 32
  
  },
  {
    "id": 1121,
    "name": "Puerto Carreño",
    "description": "Puerto Carreño es un municipio colombiano, capital del departamento de Vichada. Su población es de 15.753 habitantes, su área de 12.409 km² y está sobre la frontera con Venezuela, colindando al norte del río Meta con Puerto Páez. Fue fundada en 1922, sobre la confluencia de los ríos Orinoco y Meta;",
    "surface": 12409,
    "population": 15753,
    "postalCode": "990001",
    "departmentId": 33
  
  },
  {
    "id": 1122,
    "name": "La Primavera",
   
    "departmentId": 33
  
  },
  {
    "id": 1123,
    "name": "Santa Rosalía",
   
    "departmentId": 33
  
  },
  {
    "id": 1124,
    "name": "Cumaribo",
   
    "departmentId": 33
  
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




const cargos = [
    { nombre: "Administrador" },
    { nombre: "Gerente" },
    { nombre: "Supervisor" },
    { nombre: "Operario" },
    { nombre: "Asistente" },
    { nombre: "Analista" },
    { nombre: "Técnico" },
    { nombre: "Coordinador" },
    { nombre: "Director" },
    { nombre: "Auxiliar" }
];

const insertCargos = async () => {
    try {
        await sequelize.sync();
        await Cargo.bulkCreate(cargos, { ignoreDuplicates: true });
        console.log("Cargos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los cargos:", error);
    }
};



const Entidad = (await import('../models/entidad.js')).default;

const empresas = [
    {
        claseEntidad: 'Empresa',
        razonSocial: 'Soluciones Innovadoras S.A.',
        habilitado: true,
        numIdentificacion: '900123456',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Tecnología',
        correo: 'contacto@soluciones.com',
        telefono: '3001234567',
        fechaConstitucion: new Date('2010-05-10'),
        ciudadId: 12, // Medellín
        direccion: 'Calle 10 #20-30',
        facebook: 'https://facebook.com/soluciones',
        instagram: 'https://instagram.com/soluciones',
        paginaweb: 'https://soluciones.com',
        contadorContacto: 0,
        logo: 'soluciones_logo.png',
        contactoId: 1,
        UserAdminId: 1,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'AgroFuturo Ltda.',
        habilitado: true,
        numIdentificacion: '900654321',
        tipoEntidad: 'Sociedad Limitada',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Agroindustria',
        correo: 'info@agrofuturo.com',
        telefono: '3109876543',
        fechaConstitucion: new Date('2015-08-20'),
        ciudadId: 167, // Bogotá
        direccion: 'Carrera 45 #100-50',
        facebook: 'https://facebook.com/agrofuturo',
        instagram: 'https://instagram.com/agrofuturo',
        paginaweb: 'https://agrofuturo.com',
        contadorContacto: 0,
        logo: 'agrofuturo_logo.png',
        contactoId: 2,
        UserAdminId: 2,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'ConstruyeYa S.A.S.',
        habilitado: true,
        numIdentificacion: '901234567',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Construcción',
        correo: 'contacto@construyeya.com',
        telefono: '3201234567',
        fechaConstitucion: new Date('2012-03-15'),
        ciudadId: 210, // Cartagena
        direccion: 'Avenida 5 #15-60',
        facebook: 'https://facebook.com/construyeya',
        instagram: 'https://instagram.com/construyeya',
        paginaweb: 'https://construyeya.com',
        contadorContacto: 0,
        logo: 'construyeya_logo.png',
        contactoId: 3,
        UserAdminId: 3,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'Educavanza S.A.',
        habilitado: true,
        numIdentificacion: '900876543',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Educación',
        correo: 'info@educavanza.com',
        telefono: '3012345678',
        fechaConstitucion: new Date('2018-09-01'),
        ciudadId: 337, // Manizales
        direccion: 'Calle 50 #30-20',
        facebook: 'https://facebook.com/educavanza',
        instagram: 'https://instagram.com/educavanza',
        paginaweb: 'https://educavanza.com',
        contadorContacto: 0,
        logo: 'educavanza_logo.png',
        contactoId: 4,
        UserAdminId: 4,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'SaludTotal S.A.',
        habilitado: true,
        numIdentificacion: '900345678',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Salud',
        correo: 'contacto@saludtotal.com',
        telefono: '3151234567',
        fechaConstitucion: new Date('2011-11-11'),
        ciudadId: 498, // Montería
        direccion: 'Carrera 7 #40-80',
        facebook: 'https://facebook.com/saludtotal',
        instagram: 'https://instagram.com/saludtotal',
        paginaweb: 'https://saludtotal.com',
        contadorContacto: 0,
        logo: 'saludtotal_logo.png',
        contactoId: 5,
        UserAdminId: 5,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'EcoLogística Ltda.',
        habilitado: true,
        numIdentificacion: '900567890',
        tipoEntidad: 'Sociedad Limitada',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Logística',
        correo: 'info@ecologistica.com',
        telefono: '3169876543',
        fechaConstitucion: new Date('2016-06-06'),
        ciudadId: 915, // Bucaramanga
        direccion: 'Avenida 80 #60-10',
        facebook: 'https://facebook.com/ecologistica',
        instagram: 'https://instagram.com/ecologistica',
        paginaweb: 'https://ecologistica.com',
        contadorContacto: 0,
        logo: 'ecologistica_logo.png',
        contactoId: 6,
        UserAdminId: 6,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'FinanzasPlus S.A.S.',
        habilitado: true,
        numIdentificacion: '901098765',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Finanzas',
        correo: 'contacto@finanzasplus.com',
        telefono: '3171234567',
        fechaConstitucion: new Date('2013-02-22'),
        ciudadId: 1100, // Palmira
        direccion: 'Calle 100 #25-15',
        facebook: 'https://facebook.com/finanzasplus',
        instagram: 'https://instagram.com/finanzasplus',
        paginaweb: 'https://finanzasplus.com',
        contadorContacto: 0,
        logo: 'finanzasplus_logo.png',
        contactoId: 7,
        UserAdminId: 7,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'TurismoAndes S.A.',
        habilitado: true,
        numIdentificacion: '900234567',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Turismo',
        correo: 'info@turismoandes.com',
        telefono: '3181234567',
        fechaConstitucion: new Date('2017-07-17'),
        ciudadId: 709, // Santa Marta
        direccion: 'Carrera 12 #45-90',
        facebook: 'https://facebook.com/turismoandes',
        instagram: 'https://instagram.com/turismoandes',
        paginaweb: 'https://turismoandes.com',
        contadorContacto: 0,
        logo: 'turismoandes_logo.png',
        contactoId: 8,
        UserAdminId: 8,
    }
];

const insertEmpresas = async () => {
    try {
        // Asegúrate de que los contactos y usuarios admin existen antes de insertar empresas
        const contactosCount = await (await import('../models/contacto.js')).default.count();
        const usersCount = await User.count();
        console.log(`Contactos disponibles: ${contactosCount}, Usuarios administradores disponibles: ${usersCount}`);
        if (contactosCount < empresas.length || usersCount < empresas.length) {
            throw new Error("No existen suficientes contactos o usuarios administradores para asociar a las empresas.");
        }
        await sequelize.sync();
        await Entidad.bulkCreate(empresas, { ignoreDuplicates: true });
        console.log("Empresas creadas exitosamente");
    } catch (error) {
        console.error("Error al crear las empresas:", error);
    }
};

const Reto = (await import('../models/reto.js')).default;

const retos = [
    {
        nombre: 'Reto de Innovación',
        ubicacionVideo: 'https://videos.com/innovacion.mp4',
        descripcion: 'Desarrollar una solución innovadora para el sector salud.',
        ubicacionFicha: 'https://docs.com/ficha_innovacion.pdf',
        habilitado: true,
        userId: 1,
    },
    {
        nombre: 'Reto de Sostenibilidad',
        ubicacionVideo: 'https://videos.com/sostenibilidad.mp4',
        descripcion: 'Proponer estrategias para reducir la huella de carbono en empresas.',
        ubicacionFicha: 'https://docs.com/ficha_sostenibilidad.pdf',
        habilitado: true,
        userId: 2,
    },
    {
        nombre: 'Reto de Educación Digital',
        ubicacionVideo: 'https://videos.com/educacion.mp4',
        descripcion: 'Crear una plataforma educativa interactiva.',
        ubicacionFicha: 'https://docs.com/ficha_educacion.pdf',
        habilitado: true,
        userId: 3,
    },
    {
        nombre: 'Reto de Logística',
        ubicacionVideo: null,
        descripcion: 'Optimizar la cadena de suministro en el sector agroindustrial.',
        ubicacionFicha: null,
        habilitado: false,
        userId: 4,
    },
    {
        nombre: 'Reto de Finanzas',
        ubicacionVideo: 'https://videos.com/finanzas.mp4',
        descripcion: 'Desarrollar una app para gestión financiera personal.',
        ubicacionFicha: 'https://docs.com/ficha_finanzas.pdf',
        habilitado: true,
        userId: 5,
    }
];

const insertRetos = async () => {
    try {
        await sequelize.sync();
        await Reto.bulkCreate(retos, { ignoreDuplicates: true });
        console.log("Retos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los retos:", error);
    }
};
const TipoConvocatorias = (await import('../models/tipoConvocatorias.js')).default;

const tipoConvocatorias = [
    { nombre: 'convocatoria' },
    { nombre: 'evento' }
];

const insertTipoConvocatorias = async () => {
    try {
        await sequelize.sync();
        await TipoConvocatorias.bulkCreate(tipoConvocatorias, { ignoreDuplicates: true });
        console.log("Tipos de convocatoria creados exitosamente");
    } catch (error) {
        console.error("Error al crear los tipos de convocatoria:", error);
    }
};

const Convocatoria = (await import('../models/convocatoria.js')).default;

const convocatorias = [
    {
        nombre: 'Convocatoria Innovación 2024',
        descripcion: 'Convocatoria para proyectos innovadores en tecnología.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fechaInicio: new Date('2024-07-01'),
        fechaFin: new Date('2024-08-01'),
        tipoConvocatoriaId: 1,
        habilitado: true
    },
    {
        nombre: 'Convocatoria Sostenibilidad',
        descripcion: 'Convocatoria para iniciativas de sostenibilidad ambiental.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fechaInicio: new Date('2024-09-01'),
        fechaFin: new Date('2024-10-01'),
        tipoConvocatoriaId: 1,
        habilitado: true
    },
    {
        nombre: 'Evento Lanzamiento Innovación',
        descripcion: 'Lanzamiento oficial de la convocatoria de innovación.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fecha: new Date('2024-07-05'),
        lugar: 'Auditorio Principal',
        tipoConvocatoriaId: 2,
        habilitado: true
    },
    {
        nombre: 'Evento Cierre Sostenibilidad',
        descripcion: 'Cierre y premiación de la convocatoria de sostenibilidad.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fecha: new Date('2024-10-02'),
        lugar: 'Centro de Convenciones',
        tipoConvocatoriaId: 2,
        habilitado: true
    }
];


const insertConvocatorias = async () => {
    try {
        await sequelize.sync();
        await Convocatoria.bulkCreate(convocatorias, { ignoreDuplicates: true });
        console.log("Convocatorias creadas exitosamente");
    } catch (error) {
        console.error("Error al crear las convocatorias:", error);
    }
};

const Contacto = (await import('../models/contacto.js')).default;

const contactos = [
    {
        telefono: '3001112233',
        email: 'contacto@soluciones.com',
        nombre: 'Carlos Ramírez',
        cargoId: 1
    },
    {
        telefono: '3102223344',
        email: 'info@agrofuturo.com',
        nombre: 'María Gómez',
        cargoId: 2
    },
    {
        telefono: '3203334455',
        email: 'contacto@construyeya.com',
        nombre: 'Pedro Torres',
        cargoId: 3
    },
    {
        telefono: '3014445566',
        email: 'info@educavanza.com',
        nombre: 'Ana Martínez',
        cargoId: 4
    },
    {
        telefono: '3155556677',
        email: 'contacto@saludtotal.com',
        nombre: 'Luis Herrera',
        cargoId: 5
    },
    {
        telefono: '3166667788',
        email: 'info@ecologistica.com',
        nombre: 'Elena Ruiz',
        cargoId: 6
    },
    {
        telefono: '3177778899',
        email: 'contacto@finanzasplus.com',
        nombre: 'Jorge Díaz',
        cargoId: 7
    },
    {
        telefono: '3188889900',
        email: 'info@turismoandes.com',
        nombre: 'Sofía Castro',
        cargoId: 8
    },
    {
        telefono: '3199990011',
        email: 'contacto@enercol.com',
        nombre: 'Andrés López',
        cargoId: 9
    },
    {
        telefono: '3200001122',
        email: 'info@comercializadoraglobal.com',
        nombre: 'Laura Fernández',
        cargoId: 10
    }
];

const insertContactos = async () => {
    try {
        await sequelize.sync();
        await Contacto.bulkCreate(contactos, { ignoreDuplicates: true });
        console.log("Contactos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los contactos:", error);
    }
};



// Verifica si ya se hicieron las inserciones antes de ejecutarlas
const checkIfAlreadyInserted = async () => {
    const userCount = await User.count();
    const deptCount = await Departamento.count();
    const cityCount = await Ciudad.count();
    const cargoCount = await Cargo.count();
    const empresaCount = await Entidad.count();
    const retoCount = await Reto.count();
    const tipoConvCount = await TipoConvocatorias.count();
    const convocatoriaCount = await Convocatoria.count();
    const contactoCount = await Contacto.count();

    return (
        userCount > 0 ||
        deptCount > 0 ||
        cityCount > 0 ||
        cargoCount > 0 ||
        empresaCount > 0 ||
        retoCount > 0 ||
        tipoConvCount > 0 ||
        convocatoriaCount > 0 ||
        contactoCount > 0
    );
};

const runAll = async () => {
    try {
        const alreadyInserted = await checkIfAlreadyInserted();
        if (alreadyInserted) {
            console.log("Los datos ya fueron insertados previamente. No se realizará la inserción.");
         
            return;
        }
        await insertUsers();
        await insertDepartamentos();
        await insertCiudades();
        await insertCargos();
                await insertContactos();

        await insertEmpresas();
        await insertRetos();
        await insertTipoConvocatorias();
        await insertConvocatorias();
        console.log("Todos los datos insertados correctamente.");
    } catch (error) {
        console.error("Error en la inserción de datos:", error);
    } finally {
        await sequelize.close();
    }
};

runAll();

