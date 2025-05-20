import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

import Entidad from './entidad.js'; // Asegúrate de que la ruta sea correcta

const Servicio = sequelize.define('Servicio', {

    entidadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Entidad, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'servicio' // Nombre de la tabla en la base de datos
});

// Definir las asociaciones

export default Servicio;