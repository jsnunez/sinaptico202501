import Departamento from '../models/departamento.js';

// Controlador para obtener todos los departamentos
export const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        if (departamentos.length > 0) {
            return res.json({
                success: true,
                departamentos,
            });
        } else {
            return res.json({
                success: false,
                mensaje: 'No se encontraron departamentos.',
            });
        }
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al obtener los departamentos',
        });
    }
};

// Controlador para obtener un departamento por ID
export const getDepartamento = async (req, res) => {
    const { depId } = req.params;
    try {
        const departamento = await Departamento.findByPk(depId);
        if (departamento) {
            return res.json({
                success: true,
                departamento,
            });
        } else {
            return res.status(404).json({
                success: false,
                mensaje: 'Departamento no encontrado.',
            });
        }
    } catch (error) {
        console.error('Error al obtener el departamento:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al obtener el departamento',
        });
    }
};

// Controlador para crear un nuevo departamento
export const createDepartamento = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const nuevoDepartamento = await Departamento.create({ nombre, descripcion });
        return res.status(201).json({
            success: true,
            mensaje: 'Departamento creado exitosamente.',
            departamento: nuevoDepartamento,
        });
    } catch (error) {
        console.error('Error al crear el departamento:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al crear el departamento',
        });
    }
};