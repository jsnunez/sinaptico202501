import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize
import User from './user.js'; // Asegúrate de que la ruta sea correcta
import Curso from './curso.js'; // Asegúrate de que la ruta sea correcta
const AplicarCurso = sequelize.define('AplicarCurso', {
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Curso, // Nombre de la tabla asociada
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Nombre de la tabla asociada
            key: 'id'
        }
    },
}, {
    timestamps: true,
    tableName: 'AplicarCurso' // Nombre de la tabla en la base de datos
});

// Definir las asociaciones
AplicarCurso.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso' });
AplicarCurso.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default AplicarCurso;