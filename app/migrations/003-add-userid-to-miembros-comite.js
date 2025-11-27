const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la tabla existe
    const tableExists = await queryInterface.tableExists('miembros_comite');
    
    if (!tableExists) {
      // Si la tabla no existe, crearla con el campo userId incluido
      await queryInterface.createTable('miembros_comite', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          comment: 'ID del usuario asociado (si el miembro proviene de un usuario registrado)'
        },
        nombre: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        cargo: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        institucion: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
        },
        telefono: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        especialidades: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: '[]',
        },
        estado: {
          type: DataTypes.ENUM('activo', 'inactivo'),
          allowNull: false,
          defaultValue: 'activo'
        },
        proyectosEvaluados: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        fechaIngreso: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        fechaSalida: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        experiencia: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        formacion: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
        }
      });

      // Crear índices
      await queryInterface.addIndex('miembros_comite', ['email'], { unique: true });
      await queryInterface.addIndex('miembros_comite', ['estado']);
      await queryInterface.addIndex('miembros_comite', ['activo']);
      await queryInterface.addIndex('miembros_comite', ['userId']);

    } else {
      // Si la tabla ya existe, solo agregar la columna userId si no existe
      const columns = await queryInterface.describeTable('miembros_comite');
      
      if (!columns.userId) {
        await queryInterface.addColumn('miembros_comite', 'userId', {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          comment: 'ID del usuario asociado (si el miembro proviene de un usuario registrado)'
        });

        // Agregar índice para userId
        await queryInterface.addIndex('miembros_comite', ['userId']);
      }

      // Verificar y agregar campo fechaSalida si no existe
      if (!columns.fechaSalida) {
        await queryInterface.addColumn('miembros_comite', 'fechaSalida', {
          type: DataTypes.DATE,
          allowNull: true,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remover la columna userId
    const tableExists = await queryInterface.tableExists('miembros_comite');
    
    if (tableExists) {
      const columns = await queryInterface.describeTable('miembros_comite');
      
      if (columns.userId) {
        await queryInterface.removeColumn('miembros_comite', 'userId');
      }
      
      if (columns.fechaSalida) {
        await queryInterface.removeColumn('miembros_comite', 'fechaSalida');
      }
    }
  }
};