// /api/usuarioempresa
import express from 'express';
import { habilitarUsuario, assignUserToEntityAndCargo, getAllUserEntityCargos,getUserEntityCargoById ,getUserEntityCargoByUserId,getUserEntityCargoByEntityId} from '../controllers/usuarioEmpresaCargoController.js';

const router = express.Router();
router.post('/', assignUserToEntityAndCargo);
router.get('/', getAllUserEntityCargos); ;
router.get('/user/:userId', getUserEntityCargoByUserId);
router.get('/empresa/:empresaId', getUserEntityCargoByEntityId);
router.put('/habilitar/:id', habilitarUsuario);

router.get('/:id', getUserEntityCargoById); 


export default router;