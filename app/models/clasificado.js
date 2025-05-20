import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Assuming you have a User model defined

const Clasificado = sequelize.define('Clasificado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 5.0, // Corrected typo here
        allowNull: false,
    },
    reviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    deliveryTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Foreign key reference to User model
            key: 'id',
        },
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'clasificados',
    timestamps: true,
});

// Define the association
Clasificado.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });

export default Clasificado;

