import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

const Reto = sequelize.define('Reto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacionVideo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ubicacionFicha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'retos',
    timestamps: true,
});

export default Reto;