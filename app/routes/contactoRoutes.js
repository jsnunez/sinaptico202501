// /api/contactos

import express from 'express';
import {getContactoById} from '../controllers/contactoController.js';  // Importar el controlador
const router = express.Router();


router.get('/:contactoId', getContactoById);


export default router;