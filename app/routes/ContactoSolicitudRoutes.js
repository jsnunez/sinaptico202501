// /api/contactarSolicitud

import express from 'express';
import {

createContactoSolicitud,
getAllContactoSolicitudes,
getContactoSolicitudById,
updateContactoSolicitud,
deleteContactoSolicitud,
} from '../controllers/contactoSolicitudController.js';

const router = express.Router();

// Define routes for the ContactoSolicitud model
router.post('/', createContactoSolicitud); // Create a new ContactoSolicitud
router.get('/', getAllContactoSolicitudes); // Get all ContactoSolicitudes
router.get('/:id', getContactoSolicitudById); // Get ContactoSolicitud by ID
router.put('/:id', updateContactoSolicitud); // Update a ContactoSolicitud by ID
router.delete('/:id', deleteContactoSolicitud); // Delete a ContactoSolicitud by ID

export default router;