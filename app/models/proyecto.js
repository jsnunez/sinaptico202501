import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Entidad from './entidad.js';

const Proyecto = sequelize.define('Proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    objetivos: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    metodologia: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    resultadosEsperados: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    presupuesto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    duracionMeses: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    equipoTrabajo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recursos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    documentoTecnico: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    presentacion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    anexos: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('presentado', 'en_evaluacion', 'en_comite', 'aprobado', 'rechazado'),
        allowNull: false,
        defaultValue: 'presentado',
    },
    puntuacion: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 5
        }
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    evaluadorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    comiteAprobacion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fechaEvaluacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaComite: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaAprobacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motivoRechazo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    entidadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Entidad,
            key: 'id',
        },
    },
}, {
    tableName: 'proyectos',
    timestamps: true,
});

// Definir las asociaciones
Proyecto.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });
Proyecto.belongsTo(User, { foreignKey: 'evaluadorId', as: 'evaluador' });
Proyecto.belongsTo(Entidad, { foreignKey: 'entidadId', as: 'entidad' });

export default Proyecto;
