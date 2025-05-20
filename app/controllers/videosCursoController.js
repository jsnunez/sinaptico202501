import Video from '../models/videosCurso.js';
import Curso from '../models/curso.js';

// Obtener los videos asociados a un curso por ID
export const getVideosByCursoId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID del curso:', id);

        // Verificar si el curso existe
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Obtener los videos asociados al curso
        const videos = await Video.findAll({ where: { cursoId: id } });
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error al obtener los videos del curso:', error);
        res.status(500).json({ message: 'Error al obtener los videos del curso', error });
    }
};

// Obtener la cantidad de videos asociados a un curso por ID
export const getCantidadVideosByCursoId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID del curso:', id);

        // Verificar si el curso existe
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Contar los videos asociados al curso
        const cantidadVideos = await Video.count({ where: { cursoId: id } });
        res.status(200).json({ cantidad: cantidadVideos });
    } catch (error) {
        console.error('Error al obtener la cantidad de videos del curso:', error);
        res.status(500).json({ message: 'Error al obtener la cantidad de videos del curso', error });
    }
};

export const getVideoIdsByCursoId = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar si el curso existe
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Obtener solo los IDs de los videos asociados al curso
        const videos = await Video.findAll({
            where: { cursoId: id },
            attributes: ['id']
        });

        const videoIds = videos.map(video => video.id);
        res.status(200).json({ videoIds });
    } catch (error) {
        console.error('Error al obtener los IDs de los videos del curso:', error);
        res.status(500).json({ message: 'Error al obtener los IDs de los videos del curso', error });
    }
};