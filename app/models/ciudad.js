import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your database configuration
import Departamento from './departamento.js'; // Adjust the path to your Departamento model

const Ciudad = sequelize.define('Ciudad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departamento,
            key: 'id',
        },
    },
}, {
    tableName: 'ciudades',
    timestamps: false,
});

Ciudad.belongsTo(Departamento, { foreignKey: 'departamentoId' });

export default Ciudad;