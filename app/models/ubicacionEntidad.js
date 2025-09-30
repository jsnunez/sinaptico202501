import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UbicacionEntidad = sequelize.define('UbicacionEntidad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  entidadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Entidad',
      key: 'id',
    },
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
    comment: 'Latitud de la ubicación de la entidad',
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
    comment: 'Longitud de la ubicación de la entidad',
  },
  direccionCompleta: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Dirección completa de la entidad',
  },
  activa: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Indica si la ubicación está activa',
  },
  verificada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Indica si la ubicación ha sido verificada',
  },
}, {
  tableName: 'UbicacionEntidad',
  timestamps: true,
  indexes: [
    {
      fields: ['entidadId']
    },
    {
      fields: ['latitud', 'longitud']
    },
    {
      fields: ['activa']
    }
  ]
});

export default UbicacionEntidad;
