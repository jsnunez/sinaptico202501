// Migration para crear tabla UbicacionEntidad
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('UbicacionEntidad', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    entidadId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Entidad',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    latitud: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    longitud: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    direccionCompleta: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    activa: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    verificada: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  // Agregar índices
  await queryInterface.addIndex('UbicacionEntidad', ['entidadId']);
  await queryInterface.addIndex('UbicacionEntidad', ['latitud', 'longitud']);
  await queryInterface.addIndex('UbicacionEntidad', ['activa']);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('UbicacionEntidad');
};
