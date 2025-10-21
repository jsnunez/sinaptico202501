// /api/entidad

import express from 'express';
import { verificarEntidad, obtenerEntidad,crearEntidad,editarEntidad,obtenerEntidadesHabilitadas,aumentarContadorEntidad,verificarUserAdminId,modificarUserAdminId,verificarUserAdminIdConusuario} from '../controllers/entidadController.js';  // Importar el controlador
import { obtenerCantidadEmpresas, obtenerCantidadSociedad,cambiarEstadoHabilitado ,obtenerCantidadEntidades,getUserAdminId} from '../controllers/entidadController.js';


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
router.get('/verificarUserAdminIdConusuario/:id', verificarUserAdminIdConusuario)
router.get('/verificar-entidad/:userId', verificarEntidad);
router.get('/verificar-admin/:userId', getUserAdminId);
router.get('/verificar-user-admin/:id', verificarUserAdminId);
router.put('/modificar-user-admin/:id', modificarUserAdminId);
router.get('/entidades', obtenerEntidad);
router.get('/entidadHabilitadas', obtenerEntidadesHabilitadas);
router.post('/crear', crearEntidad);
router.post('/editar/:id',editarEntidad);
router.get('/cantidadEntidades', obtenerCantidadEntidades);
router.get('/cantidadEmpresas', obtenerCantidadEmpresas);
router.get('/cantidadSociedads', obtenerCantidadSociedad);
router.post('/cambiarEstado/:id',cambiarEstadoHabilitado) 
router.put('/aumentarContadorContacto/:id',aumentarContadorEntidad); 

   
export default router;
