import express from 'express';
import {

getCursos,
getCursoById,
createCurso,
updateCurso,
deleteCurso
} from '../controllers/cursoController.js';

const router = express.Router();

// Ruta para obtener todos los cursos
router.get('/', getCursos);

// Ruta para obtener un curso por ID
router.get('/:id', getCursoById);

// Ruta para crear un nuevo curso
router.post('/', createCurso);

// Ruta para actualizar un curso
router.put('/:id', updateCurso);

// Ruta para eliminar un curso
router.delete('/:id', deleteCurso);

export default router;