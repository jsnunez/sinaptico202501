import Recurso from '../models/recurso.js';
import upload from '../config/multerConfig.js'; // Importa la configuración de multer

// Obtener todos los recursos
export const getRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.findAll();
        res.json(recursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un recurso por su ID
export const getRecursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.findByPk(id);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        res.json(recurso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo recurso
export const createRecurso = async (req, res) => {
   upload.fields([
      { name: 'recurso', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        console.error('Error de Multer:', err);
        return res.status(400).json({ message: err.message });
      }
          if (err) {
            console.error('Error de Multer:', err);
            return res.status(400).json({ message: err.message });
        }
console.log('Archivo subido:', req.files); // Verifica si el archivo se subió correctamente
        const { nombre, descripcion } = req.body;

        try {
            const newRecurso = await Recurso.create({
                nombre,
                descripcion,
                ubicacion: req.files.recurso ? req.files.recurso[0].filename : null,
            });

            return res.status(201).json({
                message: 'Recurso creado con éxito',
                recurso: newRecurso,
            });
        } catch (error) {
            console.error('Error al crear el recurso:', error);
            return res.status(500).json({ message: 'Error del servidor', error });
        }
    });
};

// Actualizar un recurso existente
export const updateRecurso = async (req, res) => {
  const { id } = req.params; // el "id" del reto
  console.log('ID del recurso a actualizar:', id); // Agrega este log para depuración
  const datosActualizados = req.body; // los campos a actualizar

  upload.fields([
    { name: 'recurso', maxCount: 1 }
  ])(req, res, async (err) => {
    if (err) {
      console.error('Error de Multer:', err);
      return res.status(400).json({ message: err.message });
    }

    try {
      const datosActualizados = req.body; // los campos a actualizar

      const reto = await Recurso.findByPk(id);

      if (!reto) {
        return res.status(404).json({ message: 'Reto no encontrado' });
      }
      await reto.update({
        ...datosActualizados,
        ubicacion: req.files.recurso ? req.files.recurso[0].filename : reto.ubicacionVideo,
      });

      res.status(200).json({ message: 'Reto actualizado correctamente', reto });
    } catch (error) {
      console.error('Error al actualizar reto:', error);
      res.status(500).json({ message: 'Error al actualizar el reto' });
    }
  });
};

// Eliminar un recurso
export const deleteRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.findByPk(id);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        await recurso.destroy();
        res.json({ message: 'Recurso eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};