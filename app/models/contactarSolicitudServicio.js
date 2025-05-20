import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize instance
import User from './user.js'; // Adjust the path to your User model
import Clasificado from './clasificado.js'; // Adjust the path to your Clasificado model

const ContactarSolicitudServicio = sequelize.define('ContactarSolicitud', {
    clasificadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clasificado, // Replace with the actual name of your Clasificados model
            key: 'id', // The primary key in the Clasificados model
        },
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            isEmail: true,
        },
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
    tableName: 'ContactarSolicitud',
    timestamps: false, // Set to true if you want Sequelize to manage `createdAt` and `updatedAt`
});

// Define the association
ContactarSolicitudServicio.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ContactarSolicitudServicio.belongsTo(Clasificado, { foreignKey: 'clasificadoId', as: 'clasificado' });

export default ContactarSolicitudServicio;