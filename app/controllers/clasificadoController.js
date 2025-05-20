import Clasificado from '../models/clasificado.js';
import User from '../models/user.js';

// Create a new Clasificado
export const createClasificado = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            rating,
            reviews,
            deliveryTime,
            location,
            providerId,
            createdAt,
            pinned,
            isNew,
            featured,
            type,
        } = req.body;

        // Create new Clasificado
        const newClasificado = await Clasificado.create({
            title,
            description,
            price,
            category,
            rating,
            reviews,
            deliveryTime,
            location,
            providerId,
            createdAt,
            pinned,
            isNew,
            featured,
            type,
        });

        return res.status(201).json(newClasificado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating Clasificado', error: error.message });
    }
};

// Get all Clasificados
export const getAllClasificados = async (req, res) => {
    try {
        const clasificados = await Clasificado.findAll({
            include: {
                model: User,
                as: 'provider', // Includes the provider information in the result
                attributes: { exclude: ['password'] }, // Exclude the password field from the User model

            },
        });

        return res.status(200).json(clasificados);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Clasificados', error: error.message });
    }
};

// Get a single Clasificado by ID
export const getClasificadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const clasificado = await Clasificado.findByPk(id, {
            include: {
                model: User,
                as: 'provider',
            },
        });

        if (!clasificado) {
            return res.status(404).json({ message: 'Clasificado not found' });
        }

        return res.status(200).json(clasificado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Clasificado', error: error.message });
    }
};

// Update a Clasificado
export const updateClasificado = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            price,
            category,
            rating,
            reviews,
            deliveryTime,
            location,
            providerId,
            createdAt,
            pinned,
            isNew,
            featured,
            type,
        } = req.body;

        const clasificado = await Clasificado.findByPk(id);

        if (!clasificado) {
            return res.status(404).json({ message: 'Clasificado not found' });
        }

        await clasificado.update({
            title,
            description,
            price,
            category,
            rating,
            reviews,
            deliveryTime,
            location,
            providerId,
            createdAt,
            pinned,
            isNew,
            featured,
            type,
        });

        return res.status(200).json({ message: 'Clasificado updated successfully', clasificado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating Clasificado', error: error.message });
    }
};

// Delete a Clasificado
export const deleteClasificado = async (req, res) => {
    try {
        const { id } = req.params;
        const clasificado = await Clasificado.findByPk(id);

        if (!clasificado) {
            return res.status(404).json({ message: 'Clasificado not found' });
        }

        await clasificado.destroy();
        return res.status(200).json({ message: 'Clasificado deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting Clasificado', error: error.message });
    }
};

export const obtenerCantidad = async (req, res) => {
    try {
        const count = await Clasificado.count();
        res.status(200).json({ count });
      } catch (error) {
        console.error('Error al obtener la cantidad de retos:', error);
        res.status(500).json({ message: 'Error al obtener la cantidad de retos', error });
      }
  };