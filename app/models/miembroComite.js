import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MiembroComite = sequelize.define('MiembroComite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'ID del usuario asociado (si el miembro proviene de un usuario registrado)'
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 150]
        }
    },
    cargo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    institucion: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 200]
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: /^[\+]?[0-9\s\-\(\)]+$/
        }
    },
    especialidades: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de especialidades técnicas del miembro'
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
        validate: {
            min: 0
        }
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    experiencia: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Descripción de la experiencia profesional'
    },
    formacion: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Formación académica del miembro'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'miembros_comite',
    timestamps: true,
    indexes: [
        {
            fields: ['email']
        },
        {
            fields: ['estado']
        },
        {
            fields: ['activo']
        }
    ]
});

export default MiembroComite;