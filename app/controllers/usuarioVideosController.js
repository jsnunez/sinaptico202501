import UsuarioVideo from '../models/usuarioVideos.js';
import VideoCurso from '../models/videosCurso.js';

// Obtener todos los usuarioVideos
export const getUsuarioVideos = async (req, res) => {
    try {
        const usuarioVideos = await UsuarioVideo.findAll();
        res.status(200).json(usuarioVideos);
    } catch (error) {
        console.error('Error al obtener los usuarioVideos:', error);
        res.status(500).json({ message: 'Error al obtener los usuarioVideos', error });
    }
};

// Obtener un usuarioVideo por ID
export const getUsuarioVideoById = async (req, res) => {
    try {
        const usuarioVideo = await UsuarioVideo.findById(req.params.id);
        if (!usuarioVideo) {
            return res.status(404).json({ message: 'UsuarioVideo no encontrado' });
        }
        res.status(200).json(usuarioVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuarioVideo', error });
    }
};

// Crear un nuevo usuarioVideo
export const createUsuarioVideo = async (req, res) => {
    try {
        // Ajusta los campos según tu modelo
        const { usuarioId, videoId } = req.body;

        // Verifica si ya existe una relación con esos datos
        const existe = await UsuarioVideo.findOne({ where: { usuarioId, videoId } });
        if (existe) {
            return res.status(409).json({ message: 'El usuario ya tiene este video registrado' });
        }

        const newUsuarioVideo = await UsuarioVideo.create(req.body);
        res.status(201).json(newUsuarioVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuarioVideo', error });
    }
};

// Actualizar un usuarioVideo
export const updateUsuarioVideo = async (req, res) => {
    try {
        const updatedUsuarioVideo = await UsuarioVideo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUsuarioVideo) {
            return res.status(404).json({ message: 'UsuarioVideo no encontrado' });
        }
        res.status(200).json(updatedUsuarioVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuarioVideo', error });
    }
};

// Eliminar un usuarioVideo
export const deleteUsuarioVideo = async (req, res) => {
    try {
        const deletedUsuarioVideo = await UsuarioVideo.findByIdAndDelete(req.params.id);
        if (!deletedUsuarioVideo) {
            return res.status(404).json({ message: 'UsuarioVideo no encontrado' });
        }
        res.status(200).json({ message: 'UsuarioVideo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuarioVideo', error });
    }
};

// Obtener videos por ID de usuario 
export const getVideosByUsuarioId = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        console.log('ID de usuario:', usuarioId);
        const usuarioVideos = await UsuarioVideo.findAll({
            where: { usuarioId },
            attributes: ['videoId'],
        });
        res.status(200).json(usuarioVideos);
    } catch (error) {
        console.error('Error al obtener los videos por ID de usuario:', error);
        res.status(500).json({ message: 'Error al obtener los videos por ID de usuario', error });
    }
};

export const verificarUsuarioVideo = async (req, res) => {
    try {
        const { usuarioId, videoId } = req.params;
        const usuarioVideo = await UsuarioVideo.findOne({
            where: { usuarioId, videoId }
        });
        if (usuarioVideo) {
            res.status(200).json({ visto: true });
        } else {
            res.status(200).json({ visto: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar si el video fue visto', error });
    }
};