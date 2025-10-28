import express from 'express';
import {
    enviarContacto,
    compartirMiInformacion,solicitarDatos,aceptarCompartirDatos
} from '../controllers/contactar.Controller.js';

const router = express.Router()

// Ruta para enviar información de contacto
router.post('/enviar', enviarContacto);
router.post('/solicitar-datos', solicitarDatos);

// Ruta para compartir mi información con otro contacto
router.post('/compartir', compartirMiInformacion);
router.post('/accept', aceptarCompartirDatos);

export default router;