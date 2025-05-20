import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Contacto from './contacto.js';
import Ciudad from './ciudad.js'; // <-- Asegúrate de importar Ciudad

const Entidad = sequelize.define('Entidad', {
  claseEntidad: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Empresa', 'Startup', 'Emprendimiento', 'Universidad']],
    },
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  numIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  tipoEntidad: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Sociedad Anónima', 'Sociedad Limitada', 'Persona Natural']],
    },
  },
  naturalezaJuridica: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Privada', 'Pública', 'Mixta']],
    },
  },
  actividadEconomica: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaConstitucion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ciudadId: {  // <-- Nuevo campo como FK
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ciudad,
      key: 'id',
    },
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paginaweb: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'contactos',
      key: 'id',
    },
  },
  UserAdminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  tableName: 'Entidad',
  timestamps: true,
});

// Relaciones
Entidad.belongsTo(Contacto, { foreignKey: 'contactoId' });
Entidad.belongsTo(Ciudad, { foreignKey: 'ciudadId' }); // <-- Relación con Ciudad

export default Entidad;
