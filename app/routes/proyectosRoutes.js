import express from 'express';
import Proyectos from '../models/proyectos.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';

const router = express.Router();
// Obtener un proyecto por ID
router.get('/misproyectos/:userId', async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll({
            where: { userId: req.params.userId },
            include: [
                { model: User, as: 'usuario' },
                { model: Entidad, as: 'entidad' }
            ]
        });
        if (!proyectos) return res.status(404).json({ error: 'Proyectos no encontrados' });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 
// Obtener todos los proyectos
router.get('/', async (_, res) => {
    try {
        const proyectos = await Proyectos.findAll({
            include: [
                { model: User, as: 'usuario'},
                { model: Entidad, as: 'entidad' }
            ]
        });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
    try {
        const proyecto = await Proyectos.findByPk(req.params.id, {
            include: [
                { model: User, as: 'usuario' },
                { model: Entidad, as: 'entidad' }
            ]
        });
        if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json(proyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Crear un nuevo proyecto
router.post('/', async (req, res) => {
    try {
        const nuevoProyecto = await Proyectos.create(req.body);
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Proyectos.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) return res.status(404).json({ error: 'Proyecto no encontrado' });
        const proyectoActualizado = await Proyectos.findByPk(req.params.id);
        res.json(proyectoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Proyectos.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;