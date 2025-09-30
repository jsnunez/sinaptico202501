import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TipoActor = sequelize.define('TipoActor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  claseActor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'TipoActores',
  timestamps: true,
});

// Datos iniciales para clase de actor
export const tiposActorIniciales = [
  {
    claseActor: 'Empresa',
    descripcion: 'Organización comercial constituida legalmente',
  },
  {
    claseActor: 'Estado',
    descripcion: 'Empresa emergente de base tecnológica con alto potencial de crecimiento',
  },
  {
    claseActor: 'Sociedad',
    descripcion: 'Iniciativa empresarial en fase de desarrollo',
  },
  {
    claseActor: 'Academia',
    descripcion: 'Institución de educación superior',
  }
];

// Función para inicializar datos
export const inicializarTiposActor = async () => {
  try {
    // Verificar si ya existen datos
    const count = await TipoActor.count();
    if (count === 0) {
      // Insertar datos iniciales
      await TipoActor.bulkCreate(tiposActorIniciales);
      console.log('Tipos de actor inicializados correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar tipos de actor:', error);
  }
};

// Función para definir asociaciones
export const definirAsociacionesTipoActor = (models) => {
  // Un TipoActor puede tener muchas Entidades
  TipoActor.hasMany(models.Entidad, {
    foreignKey: 'tipoActorId',
    as: 'entidades'
  });
};

export default TipoActor;
