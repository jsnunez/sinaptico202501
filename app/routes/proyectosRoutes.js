import express from 'express';
import {
    getMisProyectos,
    getProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto,getProyectosDeMiEntidadOCreadosPorMi
} from '../controllers/proyectos.Controller.js'; // Ajusta el path si es necesario

const router = express.Router();

// Obtener proyectos de un usuario
router.get('/misproyectos/:userId', getMisProyectos);

router.get('/entidadomis/:userId/:entidadId', getProyectosDeMiEntidadOCreadosPorMi);
// Obtener todos los proyectos
router.get('/', getProyectos);

// Obtener un proyecto por ID
router.get('/:id', getProyectoById);

// Crear un nuevo proyecto
router.post('/', createProyecto);

// Actualizar un proyecto
router.put('/:id', updateProyecto);

// Eliminar un proyecto
router.delete('/:id', deleteProyecto);


export default router;
