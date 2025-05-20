import AplicarCurso from '../models/aplicarCurso.js';

// Obtener todas las aplicaciones de curso
export const getAplicarCursos = async (req, res) => {
    try {
        const aplicarCursos = await AplicarCurso.findAll();
        res.status(200).json(aplicarCursos);
    } catch (error) {
        console.error('Error al obtener las aplicaciones de curso:', error);
        res.status(500).json({ message: 'Error al obtener las aplicaciones de curso', error });
    }
};

// Obtener una aplicación de curso por ID
export const getAplicarCursoById = async (req, res) => {
    try {
        const aplicarCurso = await AplicarCurso.findById(req.params.id);
        if (!aplicarCurso) {
            return res.status(404).json({ message: 'Aplicación de curso no encontrada' });
        }
        res.status(200).json(aplicarCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la aplicación de curso', error });
    }
};

// Crear una nueva aplicación de curso
export const createAplicarCurso = async (req, res) => {
    try {
        const newAplicarCurso = new AplicarCurso(req.body);
        const savedAplicarCurso = await newAplicarCurso.save();
        res.status(201).json(savedAplicarCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la aplicación de curso', error });
    }
};

// Actualizar una aplicación de curso
export const updateAplicarCurso = async (req, res) => {
    try {
        const updatedAplicarCurso = await AplicarCurso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAplicarCurso) {
            return res.status(404).json({ message: 'Aplicación de curso no encontrada' });
        }
        res.status(200).json(updatedAplicarCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la aplicación de curso', error });
    }
};

// Eliminar una aplicación de curso
export const deleteAplicarCurso = async (req, res) => {
    try {
        const deletedAplicarCurso = await AplicarCurso.findByIdAndDelete(req.params.id);
        if (!deletedAplicarCurso) {
            return res.status(404).json({ message: 'Aplicación de curso no encontrada' });
        }
        res.status(200).json({ message: 'Aplicación de curso eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la aplicación de curso', error });
    }
};