import Contacto from '../models/contacto.js';

// Controlador para obtener un contacto por ID
export const getContactoById = async (req, res) => {
    try {
        const { contactoId } = req.params;
        // console.log('ID de contacto recibido:', contactoId); // Agregado para depuración
        const contacto = await Contacto.findByPk(contactoId);

        if (!contacto) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json(contacto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el contacto' });
    }
};

// Controlador para agregar un nuevo contacto
export const createContacto = async (req, res) => {
    try {
        const { nombre, telefono, email,cargo } = req.body;

        if (!nombre || !telefono || !email) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const nuevoContacto = await Contacto.create({ nombre, telefono, email });

        res.status(201).json(nuevoContacto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el contacto' });
    }
};