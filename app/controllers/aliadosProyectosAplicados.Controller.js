import AliadosProyectosAplicados from '../models/aliadosProyectosAplicados.js';
import Entidad from '../models/entidad.js';
import Proyectos from '../models/proyectos.js';
import User from '../models/user.js';

// Obtener todos los aliados
export const getAllAliados = async (req, res) => {
    try {
        const aliados = await AliadosProyectosAplicados.findAll();
        res.status(200).json(aliados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aliados', error: error.message });
    }
};

// Obtener un aliado por ID
export const getAliadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const aliado = await AliadosProyectosAplicados.findByPk(id);

        if (!aliado) {
            return res.status(404).json({ message: 'Aliado no encontrado' });
        }

        res.status(200).json(aliado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aliado', error: error.message });
    }
};


// Obtener todos los aliados por aliadoProyectoId
export const getAliadoByAliadoProyectoId = async (req, res) => {
    try {
        const { id } = req.params;
   const aliados = await AliadosProyectosAplicados.findAll({
  where: { aliadoProyectoId: id }, // verifica que este campo exista en tu tabla
  include: [{
    model: Proyectos,
    as: 'proyecto',                  // ← Debe coincidir con la belongsTo de AliadosProyectosAplicados
    include: [
      { model: User, as: 'usuarioLider', attributes: ['name'] }, // ← alias EXACTO del modelo Proyectos
      { model: User, as: 'usuario', attributes: ['name'] },       // (opcional) quien diligencia la ficha
    {model:Entidad, as:'entidad', attributes:['razonSocial']}
    ]
  }]
});

        if (aliados.length === 0) {
            return res.status(404).json({ message: 'No se encontraron aliados' });
        }

     res.json({
            success: true,
            data: aliados
        });    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aliados', error: error.message });
    }
};
