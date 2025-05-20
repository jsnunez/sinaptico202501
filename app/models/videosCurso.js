
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Curso from './curso.js'; // Asegúrate de que la ruta sea correcta
const VideoCurso = sequelize.define('VideoCurso', {
    cursoId: {
        type: DataTypes.INTEGER, // Use INTEGER para chaves estrangeiras
        allowNull: false,
        references: {
            model: 'cursos', // Nome da tabela referenciada
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracion: {
        type: DataTypes.INTEGER, // Duración en minutos
        allowNull: true
    },

}, {
    tableName: 'videos_curso', // Nome da tabela no banco de dados
    timestamps: true // Desabilita createdAt e updatedAt automáticos
});
VideoCurso.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso' });



export default VideoCurso;