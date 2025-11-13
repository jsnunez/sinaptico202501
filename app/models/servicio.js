import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize
import User from './user.js';
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
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    liderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
             model: User, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    icono: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'servicio'
});

// Definir las asociaciones

export default Servicio;