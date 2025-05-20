// authRoutes.js o donde manejes tus rutas
import express from 'express';
import { Op } from 'sequelize';
import User from '../models/user.js';
import { methods } from '../controllers/authentication.controller.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: {
          [Op.gt]: new Date() // verifica que no esté expirado
        }
      }
    });

    if (!user) {
      return res.status(400).json({ valid: false, message: 'Token inválido o expirado' });
    }

    res.json({ valid: true });

  } catch (error) {
    console.error('Error al validar el token:', error);
    res.status(500).json({ valid: false, message: 'Error del servidor' });
  }
});

router.post('/reestablecer-password', methods.reestablecerPassword);
  
  export default router;
