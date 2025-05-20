import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

import Entidad from './entidad.js'; // Asegúrate de que la ruta sea correcta
import Reto from './reto.js'; // Asegúrate de que la ruta sea correcta
import User from './user.js'; // Asegúrate de que la ruta sea correcta
const AplicarReto = sequelize.define('AplicarReto', {
    retoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reto, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    entidadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Entidad, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: {
            model: User, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    file1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file5: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file6: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file7: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'AplicarRetos' // Nombre de la tabla en la base de datos
});

// Definir las asociaciones
AplicarReto.belongsTo(Reto, { foreignKey: 'retoId', as: 'reto' });
AplicarReto.belongsTo(Entidad, { foreignKey: 'entidadId', as: 'entidad' });
AplicarReto.belongsTo(User, { foreignKey: 'userid', as: 'user' });

export default AplicarReto;