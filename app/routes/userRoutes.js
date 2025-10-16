// /api/user

import express from 'express';
import User from '../models/user.js'; // Asegúrate de tener un modelo de usuario definido
import { methods as authorization } from "../middlewares/authorization.js";

import {
  countUsers,
  getUserById,
  getAllUsers,
  getUserEmailById,
  createUser,
  updateUser,
  deleteUser,
  deleteUserWithEntidades,
  cambiarFoto,
  getUsersWithLocations,
  actualizarPerfil,cambiarCv
} from '../controllers/userController.js';

const router = express.Router();
router.put('/actualizarPerfil/:id', actualizarPerfil);
router.get('/count', countUsers);
router.get('/mapa/locations', getUsersWithLocations);
router.get('/', getAllUsers);
router.post('/', authorization.soloAdmin, createUser);
router.get('/:id', getUserById);
router.get('/email/:id', getUserEmailById);
router.put('/:id', authorization.soloAdmin, updateUser);
router.delete('/:id', authorization.soloAdmin, deleteUser);
router.delete('/:id/with-entidades', authorization.soloAdmin, deleteUserWithEntidades);
router.put('/cambiarFoto/:id', cambiarFoto);
router.put('/cambiarCv/:id', cambiarCv);

export default router;