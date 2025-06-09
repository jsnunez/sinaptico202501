import Ciudad from '../models/ciudad.js';

// Controlador para obtener todas las ciudades
export const getCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudad.findAll();
        if (ciudades.length > 0) {
            return res.json({
                success: true,
                ciudades,
            });
        } else {
            return res.json({
                success: false,
                mensaje: 'No se encontraron ciudades.',
            });
        }
    } catch (error) {
        console.error('Error al obtener las ciudades:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al obtener las ciudades',
        });
    }
};

// Controlador para obtener ciudades por departamentoId
export const getCiudadesByDepartamentoId = async (req, res) => {
    const { departamentoId } = req.params;
    try {
        const ciudades = await Ciudad.findAll({ where: { departamentoId } });
        if (ciudades.length > 0) {
            return res.json({
                success: true,
                ciudades,
            });
        } else {
            return res.json({
                success: false,
                mensaje: 'No se encontraron ciudades para el departamento especificado.',
            });
        }
    } catch (error) {
        console.error('Error al obtener las ciudades por departamentoId:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al obtener las ciudades por departamentoId',
        });
    }
};

// Controlador para obtener una ciudad por su ID
export const getCiudadById = async (req, res) => {
    const { ciudadId } = req.params;
    // console.log('ID de ciudad recibido:', ciudadId); // Agregado para depuración
    try {
        const ciudad = await Ciudad.findByPk(ciudadId);
        if (ciudad) {
            return res.json({
                success: true,
                ciudad,
            });
        } else {
            return res.json({
                success: false,
                mensaje: 'No se encontró la ciudad con el ID especificado.',
            });
        }
    } catch (error) {
        console.error('Error al obtener la ciudad por ID:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Hubo un error al obtener la ciudad por ID',
        });
    }
};