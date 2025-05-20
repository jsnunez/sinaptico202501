// /api/entidad

import express from 'express';
import { verificarEntidad, obtenerEntidad,crearEntidad,editarEntidad,obtenerEntidadesHabilitadas} from '../controllers/entidadController.js';  // Importar el controlador
import { obtenerCantidadEmpresas, obtenerCantidadEmprendimientos,cambiarEstadoHabilitado ,obtenerCantidadEntidades} from '../controllers/entidadController.js';


/**
 * @swagger
 * /api/ejemplo:
 *   get:
 *     summary: Obtener mensaje de prueba
 *     responses:
 *       200:
 *         description: Éxito
 */
const router = express.Router();

// rutas
router.get('/verificar-entidad/:userId', verificarEntidad);
router.get('/entidades', obtenerEntidad);
router.get('/entidadHabilitadas', obtenerEntidadesHabilitadas);
router.post('/crear', crearEntidad);
router.post('/editar/:id',editarEntidad);
router.get('/cantidadEntidades', obtenerCantidadEntidades);
router.get('/cantidadEmpresas', obtenerCantidadEmpresas);
router.get('/cantidadEmprendimientos', obtenerCantidadEmprendimientos);
router.post('/cambiarEstado/:id',cambiarEstadoHabilitado) 
export default router;
