import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import VideoCurso from './videosCurso.js';

const UsuarioVideos = sequelize.define('UsuarioVideos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'usuario_videos',
    timestamps: false,
});

// Un usuario puede tener muchos videos
UsuarioVideos.belongsTo(User, { foreignKey: 'usuarioId', as: 'user' });
// Un video puede estar en muchos usuarios
UsuarioVideos.belongsTo(VideoCurso, { foreignKey: 'videoId', as: 'videoCurso' });

export default UsuarioVideos;