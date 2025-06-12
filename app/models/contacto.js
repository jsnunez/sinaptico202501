import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Importa la instancia de Sequelize
import Empresa from './entidad.js';  // Asegúrate de importar Empresa
import Cargo from './cargo.js';  // Asegúrate de importar Cargo
const Contacto = sequelize.define('Contacto', {
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cargoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: Cargo,
        key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'contactos',
  timestamps: true,
});
Contacto.belongsTo(Cargo, { foreignKey: 'cargoId' });

// Relación uno a uno con Empresa

export default Contacto;
