import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ConvocatoriaProyectos = sequelize.define('ConvocatoriaProyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'proyectos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    convocatoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'convocatorias',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    estado: {
        type: DataTypes.ENUM('Postulado', 'En Evaluacion', 'Preseleccionado', 'Aprobado', 'Rechazado', 'Retirado'),
        defaultValue: 'Postulado'
    },
    fechaAplicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fechaEvaluacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    puntuacionTecnica: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    puntuacionFinanciera: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    puntuacionImpacto: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    puntuacionTotal: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    evaluadorAsignado: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Email del evaluador principal asignado'
    },
    evaluadoresAsignados: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de emails de evaluadores asignados'
    },
    fechaAsignacionEvaluador: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Fecha de asignación del evaluador principal'
    },
    evaluacionesIndividuales: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de evaluaciones individuales de cada evaluador'
    },
    observacionesEvaluacion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    observacionesAplicacion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    documentosPresentados: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'convocatoria_proyectos',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['proyectoId', 'convocatoriaId'],
            name: 'unique_proyecto_convocatoria'
        },
        {
            fields: ['convocatoriaId']
        },
        {
            fields: ['estado']
        },
        {
            fields: ['fechaAplicacion']
        }
    ]
});

export default ConvocatoriaProyectos;