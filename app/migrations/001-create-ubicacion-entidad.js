import { DataTypes } from 'sequelize';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('UbicacionEntidad', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    entidadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Entidad',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
      comment: 'Dirección completa geocodificada',
    },
    barrio: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    localidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    codigoPostal: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tipoUbicacion: {
      type: DataTypes.ENUM('sede_principal', 'sucursal', 'oficina', 'planta', 'bodega', 'laboratorio', 'otros'),
      allowNull: false,
      defaultValue: 'sede_principal',
      comment: 'Tipo de ubicación de la entidad',
    },
    nombreUbicacion: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: 'Nombre descriptivo de la ubicación (ej: Sede Norte, Oficina Principal)',
    },
    esUbicacionPrincipal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Indica si es la ubicación principal de la entidad',
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
    fechaVerificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Fecha de verificación de la ubicación',
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Observaciones adicionales sobre la ubicación',
    },
    horarioAtencion: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Horarios de atención en formato JSON',
    },
    telefonoUbicacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Teléfono específico de esta ubicación',
    },
    emailUbicacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Email específico de esta ubicación',
    },
    capacidadPersonas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Capacidad máxima de personas en la ubicación',
    },
    areaMetrosCuadrados: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Área de la ubicación en metros cuadrados',
    },
    serviciosDisponibles: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Lista de servicios disponibles en esta ubicación',
    },
    accesibilidad: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Información sobre accesibilidad',
    },
    coordenadasVerificadas: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Indica si las coordenadas han sido verificadas manualmente',
    },
    fuenteCoordenadas: {
      type: DataTypes.ENUM('manual', 'google_maps', 'gps', 'geocoding_api', 'otros'),
      allowNull: false,
      defaultValue: 'manual',
      comment: 'Fuente de las coordenadas',
    },
    precision: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Precisión de las coordenadas en metros',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  });

  // Crear índices
  await queryInterface.addIndex('UbicacionEntidad', ['entidadId']);
  await queryInterface.addIndex('UbicacionEntidad', ['latitud', 'longitud']);
  await queryInterface.addIndex('UbicacionEntidad', ['esUbicacionPrincipal']);
  await queryInterface.addIndex('UbicacionEntidad', ['activa']);
  await queryInterface.addIndex('UbicacionEntidad', ['tipoUbicacion']);
  await queryInterface.addIndex('UbicacionEntidad', ['verificada']);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('UbicacionEntidad');
};

export { up, down };
