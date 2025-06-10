import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Asegúrate de que la ruta sea correcta

const Invitacion = sequelize.define('Invitacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    desdeuserid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parauserid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: true,
});

// Asociaciones


export default Invitacion;