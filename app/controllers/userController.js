import User from '../models/user.js';
import Entidad from '../models/entidad.js';

// Obtener cantidad de usuarios
export const countUsers = async (req, res) => {
  try {
    const userCount = await User.count();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error al contar usuarios:', error);
    res.status(500).json({ error: 'Error al obtener la cantidad de usuarios' });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener solo el correo por ID
export const getUserEmailById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['email']
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener correo del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el correo del usuario' });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { name, email, rol, estado } = req.body;
    await user.update({ name, email, rol, estado });

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar usuario (solo si no tiene entidades)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const entidadesAsociadas = await Entidad.findAll({ where: { UserAdminId: user.id } });

    if (entidadesAsociadas.length > 0) {
      return res.status(400).json({
        error: 'Este usuario tiene entidades asociadas. ¿Deseas eliminar también las entidades?',
        decision: 'Confirmar eliminación de usuario y entidades asociadas'
      });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Eliminar usuario + entidades asociadas
export const deleteUserWithEntidades = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await Entidad.destroy({ where: { UserAdminId: user.id } });
    await user.destroy();

    res.status(200).json({ message: 'Usuario y entidades eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario y entidades:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario y las entidades' });
  }
};
import multer from 'multer';

import upload from '../config/multerConfig.js'; // Importa la configuración de multer
import fs from 'fs/promises';
import path from 'path';

export const cambiarFoto = async (req, res) => {
  upload.single('fotoPerfil')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }

    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      // Eliminar la foto anterior si existe
      if (user.fotoPerfil) {
        const oldPath = path.join(process.cwd(), 'app/public/photo', user.fotoPerfil);
        try {
          await fs.unlink(oldPath);
          console.log(`Foto anterior eliminada: ${oldPath}`);
        } catch (unlinkErr) {
          console.warn(`No se pudo eliminar la foto anterior (puede que no exista): ${unlinkErr.message}`);
        }
      }

      const { filename } = req.file;
      await user.update({ fotoPerfil: filename });

      res.status(200).json({ message: 'Foto de perfil actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar foto de perfil:', error);
      res.status(500).json({ error: 'Error al actualizar la foto de perfil' });
    }
  });
};
