import express from 'express';
import {

getUsuarioVideos,
getUsuarioVideoById,
createUsuarioVideo,
updateUsuarioVideo,
deleteUsuarioVideo,
getVideosByUsuarioId,
verificarUsuarioVideo
} from '../controllers/usuarioVideosController.js';

const router = express.Router();

// Obtener todos los usuarioVideos
router.get('/', getUsuarioVideos);

// Obtener un usuarioVideo por ID
router.get('/:id', getUsuarioVideoById);

// Crear un nuevo usuarioVideo
router.post('/', createUsuarioVideo);

// Actualizar un usuarioVideo
router.put('/:id', updateUsuarioVideo);

// Eliminar un usuarioVideo
router.delete('/:id', deleteUsuarioVideo);

// Obtener videos por ID de usuario
router.get('/usuario/:id', getVideosByUsuarioId);


router.get('/verificar/:usuarioId/:videoId', verificarUsuarioVideo);

export default router;