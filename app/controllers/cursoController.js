import Curso from '../models/curso.js'; // Importa el modelo Curso
import upload from '../config/multerConfig.js'; // Importa la configuración de multer

// Obtener todos los cursos
export const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};

// Obtener un curso por ID
export const getCursoById = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.status(200).json(curso);
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ message: 'Error al obtener el curso', error });
    }
};



export const createCurso = async (req, res) => {
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'temario', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        console.error('Error de Multer:', err);
        return res.status(400).json({ message: err.message });
      }
  
      const { nombre, descripcion,duracion } = req.body;
  
      try {
        const newReto = await Curso.create({
          nombre,
          descripcion,
          duracion,
          video: req.files.video ? req.files.video[0].filename : null,
          temario: req.files.temario ? req.files.temario[0].filename : null,
        });
  
        return res.status(201).json({
          message: 'Curso creado con éxito',
          reto: newReto,
        });
      } catch (error) {
        console.error('Error al crear el Curso:', error);
        return res.status(500).json({ message: 'Error del servidor', error });
      }
    });
  };

// Actualizar un curso
export const updateCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        const { nombre, descripcion, duracion } = req.body;
        await curso.update({ nombre, descripcion, duracion });

        res.status(200).json({ message: 'Curso actualizado correctamente', curso });
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ message: 'Error al actualizar el curso', error });
    }
};

// Eliminar un curso
export const deleteCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        await curso.destroy();
        res.status(200).json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ message: 'Error al eliminar el curso', error });
    }
};