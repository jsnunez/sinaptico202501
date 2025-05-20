import express from 'express';
import {

getAplicarCursos,
getAplicarCursoById,
createAplicarCurso,
updateAplicarCurso,
deleteAplicarCurso
} from '../controllers/aplicarCursoController.js';

import AplicarCurso from '../models/aplicarCurso.js'; // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Ruta para obtener todas las aplicaciones de curso
router.get('/', getAplicarCursos);

// Ruta para obtener una aplicación de curso por ID
router.get('/:id', getAplicarCursoById);

// Ruta para crear una nueva aplicación de curso
router.post('/', createAplicarCurso);

// Ruta para actualizar una aplicación de curso
router.put('/:id', updateAplicarCurso);

// Ruta para eliminar una aplicación de curso
router.delete('/:id', deleteAplicarCurso);

router.get('/verificar-aplicacion/:id/:userid', async (req, res) => {
    const { id, userid } = req.params;

    try {
        const aplicarCurso = await AplicarCurso.findOne({
            where: {
                cursoId: id,
                userId: userid
            }
        });

        const aplicado = !!aplicarCurso;
        return res.status(200).json({ aplicado });

    } catch (error) {
        console.error('Error al verificar la inscripción:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
});


export default router;