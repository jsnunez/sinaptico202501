// models/usuarioEmpresaCargo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Entidad from './entidad.js';
import Cargo from './cargo.js';

const UsuarioEmpresaCargo = sequelize.define('UsuarioEmpresaCargo', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  empresaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entidad,
      key: 'id',
    },
  },
  cargoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cargo,
      key: 'id',
    },
  },
    estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
});

UsuarioEmpresaCargo.belongsTo(User, { foreignKey: 'userId' });
UsuarioEmpresaCargo.belongsTo(Entidad, {
  foreignKey: 'empresaId',
  as: 'empresa' // 👈 este alias debe coincidir EXACTAMENTE con el del include
});
UsuarioEmpresaCargo.belongsTo(Cargo, { foreignKey: 'cargoId' });

export default UsuarioEmpresaCargo;
