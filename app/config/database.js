//--- configuracion de la base de datos con sequelize ---//
// Importar Sequelize desde el paquete sequelize
import { Sequelize } from 'sequelize';

// Cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Nombre de la base de datos
  process.env.DB_USER,   // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST || 'localhost', // Host de MySQL
    dialect: 'mysql',    // Tipo de base de datos (mysql)
    timezone: '-05:00', // Para Colombia, puedes usar esto
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Activar logging en dev
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    }
);

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

export default sequelize;
