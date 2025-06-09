import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Convocatoria = sequelize.define('Convocatoria', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    financiamiento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    organizador: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    urlConvocatoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaLimite: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tipoConvocatoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tipoConvocatorias', // nombre de tabla
            key: 'id'
        }
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'convocatorias',
    timestamps: true,
});

export default Convocatoria;
