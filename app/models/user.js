// models/user.js
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';  // Importa la instancia de Sequelize
import Invitacion from './invitaciones.js'; // Asegúrate de que la ruta sea correcta
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,  // Garantiza que el email sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Valor por defecto 1
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Valor por defecto 1
  },
    fotoPerfil: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "sinfoto.jpg", // Valor por defecto 1
  },
  
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // Establece el valor predeterminado a CURRENT_TIMESTAMP
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // Establece el valor predeterminado a CURRENT_TIMESTAMP
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  timestamps: true, // Esto habilita los campos `createdAt` y `updatedAt`
  
});
User.hasMany(Invitacion, { as: 'enviadas', foreignKey: 'desdeuserid' });
User.hasMany(Invitacion, { as: 'recibidas', foreignKey: 'parauserid' });


export default User;
