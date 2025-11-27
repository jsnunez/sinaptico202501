import express from 'express';
import { methods } from '../controllers/miembroComiteController.js';

const router = express.Router();

// Rutas para miembros del comité
router.get('/', methods.obtenerMiembros);
router.get('/estadisticas', methods.obtenerEstadisticas);
router.get('/buscar', methods.buscarMiembros);
router.get('/usuarios-admin', methods.obtenerUsuariosAdministradores);
router.post('/desde-usuario', methods.agregarMiembroDesdeUsuario);
router.delete('/remover/:id', methods.removerMiembro);
router.get('/:id', methods.obtenerMiembroPorId);
router.post('/', methods.crearMiembro);
router.put('/:id', methods.actualizarMiembro);
router.patch('/:id/proyectos-evaluados', methods.actualizarProyectosEvaluados);
router.delete('/:id', methods.eliminarMiembro);

export default router;