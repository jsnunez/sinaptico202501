import AliadosProyectos from '../models/aliadosProyectos.js';

// Obtener todos los aliados
export const getAllAliados = async (req, res) => {
    try {
        const aliados = await AliadosProyectos.findAll();
        res.status(200).json(aliados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aliados', error: error.message });
    }
};

// Obtener un aliado por ID
export const getAliadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const aliado = await AliadosProyectos.findByPk(id);
        
        if (!aliado) {
            return res.status(404).json({ message: 'Aliado no encontrado' });
        }
        
        res.status(200).json(aliado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aliado', error: error.message });
    }
};

// Crear un nuevo aliado
export const createAliado = async (req, res) => {
    try {
        const nuevoAliado = await AliadosProyectos.create(req.body);
        res.status(201).json(nuevoAliado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear aliado', error: error.message });
    }
};

// Actualizar un aliado
export const updateAliado = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await AliadosProyectos.update(req.body, {
            where: { id }
        });
        
        if (!updated) {
            return res.status(404).json({ message: 'Aliado no encontrado' });
        }
        
        const aliadoActualizado = await AliadosProyectos.findByPk(id);
        res.status(200).json(aliadoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar aliado', error: error.message });
    }
};

// Eliminar un aliado
export const deleteAliado = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await AliadosProyectos.destroy({
            where: { id }
        });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Aliado no encontrado' });
        }
        
        res.status(200).json({ message: 'Aliado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar aliado', error: error.message });
    }
};