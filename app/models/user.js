// models/user.js
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';  // Importa la instancia de Sequelize

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
    photo: {
    type: DataTypes.STRING,
    allowNull: true,
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

export default User;
