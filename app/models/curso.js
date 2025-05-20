import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la instancia de Sequelize

const Curso = sequelize.define('Curso', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    duracion: {
        type: DataTypes.STRING, // Duración en minutos
        allowNull: true,
    },

    video: {
        type: DataTypes.STRING, // URL de la imagen
        allowNull: true,
    },
    
    temario: {
        type: DataTypes.STRING, // URL de la imagen
        allowNull: true,
    },
}, {
    tableName: 'cursos',
    timestamps: true,
});

export default Curso;