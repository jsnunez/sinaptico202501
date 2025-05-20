import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

const Recurso = sequelize.define('Recurso', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ubicacion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

}, {
    tableName: 'recurso',
    timestamps: true,
});

export default Recurso;