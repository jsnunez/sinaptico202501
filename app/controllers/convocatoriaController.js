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

// Obtener convocatorias con paginación y filtros extendidos
export const obtenerConvocatorias = async (req, res) => {
  try {
    const { estado, activo = true, page = 1, limit = 10 } = req.query;
    
    const filtros = { activo };
    
    if (estado) {
      filtros.estado = estado;
    }

    const offset = (page - 1) * limit;

    const { count, rows: convocatorias } = await Convocatoria.findAndCountAll({
      where: filtros,
      include: [
        {
          model: TipoConvocatorias,
          as: 'tipoConvocatoria',
          required: false
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      convocatorias,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener convocatorias:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

// Obtener convocatoria por ID con detalles completos
export const obtenerConvocatoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const convocatoria = await Convocatoria.findByPk(id, {
      include: [
        {
          model: TipoConvocatorias,
          as: 'tipoConvocatoria',
          required: false
        }
      ]
    });
    
    if (!convocatoria) {
      return res.status(404).json({ error: 'Convocatoria no encontrada' });
    }

    res.status(200).json(convocatoria);
  } catch (error) {
    console.error('Error al obtener convocatoria:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

// Crear una nueva convocatoria con validaciones extendidas
export const crearConvocatoriaCompleta = async (req, res) => {
  try {
    const {
      titulo,
      numero,
      descripcion,
      presupuestoTotal,
      maxProyectos,
      fechaApertura,
      fechaCierre,
      fechaResultados,
      areasTematicas,
      presupuestoMinimo,
      presupuestoMaximo,
      duracionMinima,
      duracionMaxima,
      requisitos,
      documentosRequeridos,
      palabrasClave,
      contacto,
      observaciones,
      estado = 'borrador',
      tipoConvocatoriaId,
      organizador = 'CRCI Santander'
    } = req.body;

    // Validar número único
    const numeroExistente = await Convocatoria.findOne({ where: { numero } });
    if (numeroExistente) {
      return res.status(400).json({ error: 'Ya existe una convocatoria con ese número' });
    }

    // Validar fechas
    if (new Date(fechaCierre) <= new Date(fechaApertura)) {
      return res.status(400).json({ error: 'La fecha de cierre debe ser posterior a la fecha de apertura' });
    }

    if (new Date(fechaResultados) <= new Date(fechaCierre)) {
      return res.status(400).json({ error: 'La fecha de resultados debe ser posterior a la fecha de cierre' });
    }

    const nuevaConvocatoria = await Convocatoria.create({
      titulo,
      numero,
      descripcion,
      presupuestoTotal,
      maxProyectos,
      fechaApertura,
      fechaCierre,
      fechaResultados,
      areasTematicas: areasTematicas || [],
      presupuestoMinimo,
      presupuestoMaximo,
      duracionMinima,
      duracionMaxima,
      requisitos,
      documentosRequeridos: documentosRequeridos || [],
      palabrasClave: palabrasClave || [],
      contacto,
      observaciones,
      estado,
      tipoConvocatoriaId,
      organizador,
      // Campos compatibilidad
      nombre: titulo,
      fechaLimite: fechaCierre
    });

    res.status(201).json({
      message: 'Convocatoria creada exitosamente',
      convocatoria: nuevaConvocatoria
    });
  } catch (error) {
    console.error('Error al crear convocatoria:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Datos de validación incorrectos',
        details: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
};

// Obtener convocatorias activas para el público
export const obtenerConvocatoriasActivas = async (req, res) => {
  try {
    const ahora = new Date();
    
    const convocatorias = await Convocatoria.findAll({
      where: {
        activo: true,
        estado: 'publicada',
        fechaApertura: { [Op.lte]: ahora },
        fechaCierre: { [Op.gte]: ahora }
      },
      include: [
        {
          model: TipoConvocatorias,
          as: 'tipoConvocatoria',
          required: false
        }
      ],
      order: [['fechaCierre', 'ASC']]
    });

    res.status(200).json(convocatorias);
  } catch (error) {
    console.error('Error al obtener convocatorias activas:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
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