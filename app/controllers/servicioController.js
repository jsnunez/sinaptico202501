import Servicio from "../models/servicio.js"

// Crear un nuevo cargo
export const crearServicio = async (req, res) => {
    try {
        const newServicio = new Servicio(req.body);
        console.log(req.body)
        const savedServicio = await newServicio.save();
        res.status(201).json(savedServicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cargo', error });
    }
};

export const getServicioById = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el servicio', error });
    }
};


export const getServicioByIdEntidad = async (req, res) => {
    try {
      // Contar las entidades que tienen claseEntidad igual a 'empresa'
      const servicios = await Servicio.findAll({
        where: { entidadId: req.params.id },
      });
  
      return res.json({
        success: true,
        servicios,
      });
    } catch (error) {
      console.error('Error al obtener la cantidad de empresas:', error);
      return res.status(500).json({
        success: false,
        mensaje: 'Hubo un error al obtener la cantidad de empresas',
      });
    }
  };
  
  export const deleteServicioById = async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
  
      await servicio.destroy();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el servicio', error });
      console.error('Error al eliminar el servicio:', error);
    }
  };

  export const editarServicioById = async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
  
      const {descripcion } = req.body;

      servicio.descripcion = descripcion;

  
      await servicio.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el servicio', error });
      console.error('Error al actualizar el servicio:', error);
    }
  };