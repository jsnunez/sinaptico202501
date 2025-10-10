import express from 'express';

const router = express.Router();

// Obtener proyectos de un usuario
router.get('/misproyectos/:userId');

// Obtener todos los proyectos
router.get('/');

// Obtener un proyecto por ID
router.get('/:id');

// Crear un nuevo proyecto
router.post('/');

// Actualizar un proyecto
router.put('/:id');

// Eliminar un proyecto
router.delete('/:id');

export default router;
