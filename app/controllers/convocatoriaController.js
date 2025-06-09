import Convocatoria from '../models/convocatoria.js';
import TipoConvocatorias from '../models/tipoConvocatorias.js'; // Asegúrate de importar el modelo correcto
import { Op } from 'sequelize';

// Obtener todas las convocatorias
// controlador
export const getConvocatorias = async (req, res) => {
  try {
    const { nombre, tipo, estado } = req.query;

    const where = {};

    if (nombre) {
      where.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (tipo) {
      where.tipoConvocatoriaId = tipo;
    }

    if (estado === 'Abierto') {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      where.fechaLimite = { [Op.gte]: hoy };
    } else if (estado === 'Cerrado') {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      where.fechaLimite = { [Op.lt]: hoy };
    }

    const convocatorias = await Convocatoria.findAll({
      where,
      include: [{
        model: TipoConvocatorias,
        as: 'tipoConvocatoria',
        attributes: ['nombre']
      }]
    });

    res.status(200).json(convocatorias);
  } catch (error) {
    console.error('Error al filtrar convocatorias:', error);
    res.status(500).json({ message: 'Error al obtener convocatorias', error });
  }
};


// Crear una nueva convocatoria
export const createConvocatoria = async (req, res) => {
    try {
        const newConvocatoria = await Convocatoria.create(req.body); // Usar .create directamente
        res.status(201).json(newConvocatoria);
    } catch (error) {
        console.error('Error al crear la convocatoria:', error);
        res.status(500).json({ message: 'Error al crear la convocatoria', error });
    }
};


export const deleteConvocatoria =  async (req, res) => { 
    const { id } = req.params;
    // console.log('ID de la convocatoria a eliminar:', id);
    try {
        const deletedConvocatoria = await Convocatoria.destroy({ where: { id } });
        if (deletedConvocatoria) {
            res.status(200).json({ message: 'Convocatoria eliminada' });
        } else {
            res.status(404).json({ message: 'Convocatoria no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la convocatoria:', error);
        res.status(500).json({ message: 'Error al eliminar la convocatoria', error });
    }
};

export const updateConvocatoria = async (req, res) => {
    const { id } = req.params;
    // console.log('ID de la convocatoria a actualizar:', id);
    try {
        const [updated] = await Convocatoria.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedConvocatoria = await Convocatoria.findOne({ where: { id } });
            res.status(200).json(updatedConvocatoria);
        } else {
            res.status(404).json({ message: 'Convocatoria no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la convocatoria:', error);
        res.status(500).json({ message: 'Error al actualizar la convocatoria', error });
    }
};

export const getTipoConvocatorias = async (req, res) => {
    try {
        const tipoConvocatorias = await TipoConvocatorias.findAll();
        res.status(200).json(tipoConvocatorias);
    } catch (error) {
        console.error('Error al obtener tipos de convocatorias:', error);
        res.status(500).json({ message: 'Error al obtener tipos de convocatorias', error });
    }
}

export const getCantidadConvocatorias = async (req, res) => {
  try {
    const count = await Convocatoria.count({ where: { tipoConvocatoriaId: 1 }}
      
    );
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error al obtener la cantidad de convocatorias:', error);
    res.status(500).json({ message: 'Error al obtener la cantidad de convocatorias', error });
  }
};

export const getCantidadEventos = async (req, res) => {
  try {
    const count = await Convocatoria.count({ where: { tipoConvocatoriaId: 2 }}
      
    );
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error al obtener la cantidad de convocatorias:', error);
    res.status(500).json({ message: 'Error al obtener la cantidad de convocatorias', error });
  }
};


export const cambiarEstadoHabilitadoConvocatoria = async (req, res) => {
  const { id } = req.params;
  const { habilitado } = req.body;

  if (typeof habilitado !== 'boolean') {
    return res.status(400).json({ message: 'El campo habilitado debe ser booleano' });
  }

  try {
    const convocatoria = await Convocatoria.findByPk(id);
    if (!convocatoria) {
      return res.status(404).json({ message: 'Convocatoria no encontrada' });
    }
    convocatoria.habilitado = habilitado;
    await convocatoria.save();
    res.status(200).json({ message: 'Estado actualizado correctamente', convocatoria });
  } catch (error) {
    console.error('Error al cambiar estado habilitado:', error);
    res.status(500).json({ message: 'Error al cambiar el estado', error });
  }
};