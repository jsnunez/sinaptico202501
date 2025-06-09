import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize
import User from './user.js';

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
     habilitado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the User model
            key: 'id', // The primary key in the User model
        },
    },
}, {
    tableName: 'retos',
    timestamps: true,
});

Reto.belongsTo(User,  { foreignKey: 'userId' });

export default Reto;