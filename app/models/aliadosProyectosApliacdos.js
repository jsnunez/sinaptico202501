import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import AliadosProyectos from './aliadosProyectos.js';
import Proyectos from './proyectos.js';

const AliadosProyectosAplicados = sequelize.define('AliadosProyectosAplicados', {
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
    aliadoProyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'aliados_proyectos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
        defaultValue: 'Pendiente'
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'aliados_proyectos_aplicados',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['proyectoId', 'aliadoProyectoId']
        }
    ]
});

// Relaciones
AliadosProyectosAplicados.belongsTo(Proyectos, { 
    foreignKey: 'proyectoId', 
    as: 'proyecto' 
});

AliadosProyectosAplicados.belongsTo(AliadosProyectos, { 
    foreignKey: 'aliadoProyectoId', 
    as: 'aliadoProyecto' 
});

export default AliadosProyectosAplicados;