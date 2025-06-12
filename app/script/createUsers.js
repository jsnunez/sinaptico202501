import User from '../models/user.js'; // Asegúrate de que la ruta sea correcta
import sequelize from '../config/database.js';
;

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

export { insertUsers };
export default insertUsers;


