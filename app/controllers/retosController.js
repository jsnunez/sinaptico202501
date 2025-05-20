import Reto from '../models/reto.js';
import upload from '../config/multerConfig.js'; // Importa la configuración de multer
import AplicarReto from '../models/aplicarReto.js'; // Importa el modelo AplicarReto

// Obtener todos los retos
export const getRetos = async (req, res) => {
    try {
        const retos = await Reto.findAll();
        res.status(200).json(retos);
    } catch (error) {
        console.error('Error al obtener los retos:', error);
        res.status(500).json({ message: 'Error al obtener los retos', error });
    }
};

// Obtener un reto por ID
export const getRetoById = async (req, res) => {
    try {
      console.log('ID del reto:', req.params.id); // Agrega este log para depuración
        const reto = await Reto.findByPk(req.params.id);
        if (!reto) {
            return res.status(404).json({ message: 'Reto no encontrado' });
        }
        res.status(200).json(reto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el reto', error });
        console.error('Error al obtener el reto:', error); // Agrega este log para depuración
    }
};

// Crear un nuevo reto
export const createReto = async (req, res) => {
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'ficha', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        console.error('Error de Multer:', err);
        return res.status(400).json({ message: err.message });
      }
  
      const { nombre, descripcion } = req.body;
  
      try {
        const newReto = await Reto.create({
          nombre,
          descripcion,
          ubicacionVideo: req.files.video ? req.files.video[0].filename : null,
          ubicacionFicha: req.files.ficha ? req.files.ficha[0].filename : null,
        });
  
        return res.status(201).json({
          message: 'Reto creado con éxito',
          reto: newReto,
        });
      } catch (error) {
        console.error('Error al crear el reto:', error);
        return res.status(500).json({ message: 'Error del servidor', error });
      }
    });
  };

// Actualizar un reto
export const updateReto = async (req, res) => {
    try {
        const updatedReto = await Reto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReto) {
            return res.status(404).json({ message: 'Reto no encontrado' });
        }
        res.status(200).json(updatedReto);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el reto', error });
    }
};

// Eliminar un reto
export const deleteReto = async (req, res) => {
    try {
        const deletedReto = await Reto.findByIdAndDelete(req.params.id);
        if (!deletedReto) {
            return res.status(404).json({ message: 'Reto no encontrado' });
        }
        res.status(200).json({ message: 'Reto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el reto', error });
    }
};


// Aplicar al reto con archivos
export const aplicarReto = async (req, res) => {
  upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 },
    { name: 'file5', maxCount: 1 },
    { name: 'file6', maxCount: 1 },
    { name: 'file7', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error de Multer:', err);
      return res.status(400).json({ message: err.message });
    }

    const { challengeId, entidadId ,userid} = req.body;
const retoId=challengeId; // ID del reto al que se aplica
    try {
      const applicationData = {
        retoId,
        entidadId,
        userid,
          file1: req.files.file1 ? req.files.file1[0].filename : null,
          file2: req.files.file2 ? req.files.file2[0].filename : null,
          file3: req.files.file3 ? req.files.file3[0].filename : null,
          file4: req.files.file4 ? req.files.file4[0].filename : null,
          file5: req.files.file5 ? req.files.file5[0].filename : null,
          file6: req.files.file6 ? req.files.file6[0].filename : null,
          file7: req.files.file7 ? req.files.file7[0].filename : null,
        
      };

      // Guardar la aplicación en la base de datos
      const nuevaAplicacion = await AplicarReto.create(applicationData);

      return res.status(201).json({
        message: 'Aplicación enviada con éxito',
        data: nuevaAplicacion
      });
    } catch (error) {
      console.error('Error al procesar la aplicación:', error);
      return res.status(500).json({ message: 'Error del servidor', error });
    }
  });
};

// Verificar si una entidad ya aplicó a un reto
export const verificarAplicacion = async (req, res) => {
  const { entidadId, retoId } = req.query;

  if (!entidadId || !retoId) {
      return res.status(400).json({ message: 'entidadId and retoId are required' });
  }

  try {
      const aplicacion = await AplicarReto.findOne({
          where: { entidadId, retoId }
      });

      res.status(200).json({ aplicado: !!aplicacion });
  } catch (error) {
      console.error('Error al verificar aplicación:', error);
      res.status(500).json({ message: 'Error al verificar la aplicación', error });
  }
};
export const updateRetoByFk = async (req, res) => {
  const { fk } = req.params; // el "id" del reto
  const datosActualizados = req.body; // los campos a actualizar

  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'ficha', maxCount: 1 }
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error de Multer:', err);
      return res.status(400).json({ message: err.message });
    }

    try {
      const datosActualizados = req.body; // los campos a actualizar

      const reto = await Reto.findByPk(fk);

      if (!reto) {
        return res.status(404).json({ message: 'Reto no encontrado' });
      }
      await reto.update({
        ...datosActualizados,
        ubicacionVideo: req.files.video ? req.files.video[0].filename : reto.ubicacionVideo,
        ubicacionFicha: req.files.ficha ? req.files.ficha[0].filename : reto.ubicacionFicha,
      });

      res.status(200).json({ message: 'Reto actualizado correctamente', reto });
    } catch (error) {
      console.error('Error al actualizar reto:', error);
      res.status(500).json({ message: 'Error al actualizar el reto' });
    }
  });
};

// Obtener la cantidad total de retos
export const getCantidadRetos = async (req, res) => {
  try {
    const count = await Reto.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error al obtener la cantidad de retos:', error);
    res.status(500).json({ message: 'Error al obtener la cantidad de retos', error });
  }
};



import Entidad from '../models/entidad.js';

export const obtenerAplicaciones = async (req, res) => {
  const { retoId } = req.query;
console.log('ID del reto:', req.query); // Agrega este log para depuración
  if (!retoId) {
    return res.status(400).json({ message: 'El parámetro retoId es obligatorio' });
  }

  try {
    const aplicaciones = await AplicarReto.findAll({
      where: { retoId }, // Filtrar por el reto especificado
      attributes: [
        'id',
        'retoId',
        'entidadId',
        'file1',
        'file2',
        'file3',
        'file4',
        'file5',
        'file6',
        'file7',
        'createdAt'
      ],
      include: [
        {
          model: Reto,
          as: 'reto',
          attributes: ['id', 'nombre']
        },
        {
          model: Entidad,
          as: 'entidad',
          attributes: ['id', 'razonSocial', 'correo', 'telefono'],
        }
      ]
    });
    if (aplicaciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron aplicaciones para este reto' });
    }
    res.status(200).json(aplicaciones);
  } catch (error) {
    console.error('Error al obtener aplicaciones:', error);
    res.status(500).json({ message: 'Error al obtener las aplicaciones', error });
  }
};
