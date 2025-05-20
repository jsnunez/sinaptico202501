import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

const TipoConvocatorias = sequelize.define('tipoConvocatorias', {
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
    }
}, {
    tableName: 'tipoConvocatorias', // Nombre de la tabla en la base de datos
    timestamps: false // Desactiva createdAt y updatedAt si no los necesitas
});

export default TipoConvocatorias;