import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

const Departamento = sequelize.define('Departamento', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false
    }
}, {
    tableName: 'departamentos', // Nombre de la tabla en la base de datos
    timestamps: false // Desactiva createdAt y updatedAt si no los necesitas
});

export default Departamento;