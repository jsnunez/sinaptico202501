import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AliadosProyectos = sequelize.define('AliadosProyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAliado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'aliados_proyectos',
    timestamps: true
});

export default AliadosProyectos;