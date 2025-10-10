import UserEntityCargo from '../models/usuarioEmpresaCargo.js';
import Entidad from '../models/entidad.js';
import Cargo from '../models/cargo.js';
import User from '../models/user.js';


export const assignUserToEntityAndCargo = async (req, res) => {
    try {
        const { userId, empresaId, cargoId } = req.body;

        if (!userId || !empresaId || !cargoId) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const assignment = new UserEntityCargo({
            userId,
            empresaId,
            cargoId
        });

        const savedAssignment = await assignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar usuario, entidad y cargo', error });
    }
};

export const getAllUserEntityCargos = async (req, res) => {
    try {
        const assignments = await UserEntityCargo.findAll();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaciones', error });
    }
};

export const getUserEntityCargoById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await UserEntityCargo.findByPk(id);
        if (!assignment) {
            return res.status(404).json({ message: 'Asignación no encontrada' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la asignación', error });
    }
};

export const getUserEntityCargoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const assignments = await UserEntityCargo.findAll({
      where: { userId },
      attributes: ['id', 'userId', 'empresaId', 'cargoId', 'estado'],
      include: [
        {
          model: Entidad,
          as: 'empresa', // <-- este debe coincidir con el alias definido arriba
          attributes: ['id', 'razonSocial']
        },

        {
            model: Cargo,
            attributes: ['id', 'nombre']
        }
      ]
    });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error al obtener asignaciones:', error);
    res.status(500).json({
      message: 'Error al obtener asignaciones por userId',
      error
    });
  }
};

export const getUserEntityCargoByEntityId = async (req, res) => {
  try {
    const { empresaId } = req.params;

    const assignments = await UserEntityCargo.findAll({
      where: { empresaId },
      attributes: ['id', 'userId', 'cargoId', 'estado'],
      include: [
        {
          model: User,
        
          attributes: ['id', 'name', 'email', 'telefono']
        },

        {
            model: Cargo,
            attributes: ['id', 'nombre']
        }
      ]
    });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error al obtener asignaciones:', error);
    res.status(500).json({
      message: 'Error al obtener asignaciones por userId',
      error
    });
  }
};


export const habilitarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await UserEntityCargo.findByPk(id);

    if (!assignment) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }
    assignment.estado = !assignment.estado;
    await assignment.save();
    res.status(200).json({ message: 'Estado de usuario actualizado correctamente', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error al cambiar el estado del usuario', error });
  }
};


