import Cargo from '../models/cargo.js';

// Obtener todos los cargos
export const getCargos = async (req, res) => {
    try {
        const cargos = await Cargo.findAll();
        res.status(200).json(cargos);
    } catch (error) {
        console.error('Error al obtener los cargos:', error);
        res.status(500).json({ message: 'Error al obtener los cargos', error });
    }
};

// Obtener un cargo por ID
export const  getCargoById = async (req, res) => {
    try {
        const cargo = await Cargo.findById(req.params.id);
        if (!cargo) {
            return res.status(404).json({ message: 'Cargo no encontrado' });
        }
        res.status(200).json(cargo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cargo', error });
    }
};

// Crear un nuevo cargo
export const createCargo = async (req, res) => {
    try {
        const newCargo = new Cargo(req.body);
        const savedCargo = await newCargo.save();
        res.status(201).json(savedCargo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cargo', error });
    }
};

// Actualizar un cargo
export const updateCargo = async (req, res) => {
    try {
        const updatedCargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCargo) {
            return res.status(404).json({ message: 'Cargo no encontrado' });
        }
        res.status(200).json(updatedCargo);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cargo', error });
    }
};

// Eliminar un cargo
export const deleteCargo = async (req, res) => {
    try {
        const deletedCargo = await Cargo.findByIdAndDelete(req.params.id);
        if (!deletedCargo) {
            return res.status(404).json({ message: 'Cargo no encontrado' });
        }
        res.status(200).json({ message: 'Cargo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cargo', error });
    }
};