import express from "express";
import entidadRoutes from './entidadRoutes.js'; 
import cargoRoutes from './cargoRoutes.js';  
import departamentoRoutes from './departamentoRoutes.js';
import ciudadRoutes from './ciudadRoutes.js';  
import ContactoRoutes from './contactoRoutes.js';  
import UserRoutes from "./userRoutes.js";
import UsuarioEmpresaCargoRoutes from "./usuarioEmpresaCargoRoutes.js";  
import authRoutes from './authRoutes.js';  
import RetoRoutes from './retosRoutes.js';  
import ClasificadoRoutes from './clasificadoRoutes.js';  
import ContactarSolicitudRoutes from './ContactoSolicitudRoutes.js'; 
import ServicioRoutes from './servicioRoutes.js'; 
import ConvocatoriaRoutes from './convocatoriaRoutes.js'; // Importar las rutas de Convocatoria
import TipoConvocatoriaRoutes from './tipoConvocatoriaRoutes.js'; // Importar las rutas de TipoConvocatoria
import RecursosRoute from './recursoRoute.js'; // Importar las rutas de Recursos
import Curso from "./cursoRoutes.js";
import AplicarCurso from "./aplicarCursoRoute.js"; // Importar las rutas de AplicarCurso
import VideosCurso from "./videosCursoRoute.js"; // Importar las rutas de VideosCurso
import UsuarioVideos from "./usuarioVideosRoutes.js"; // Importar las rutas de UsuarioVideos
import InvitacionRoutes from "./invitacionRoutes.js"; // Importar las rutas de Invitacion
import UbicacionEntidadRoutes from "./ubicacionEntidadRoutes.js"; // Importar las rutas de UbicacionEntidad
const router = express.Router();

router.use('/entidad', entidadRoutes);
router.use('/cargos', cargoRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/ciudades', ciudadRoutes);
router.use('/contactos', ContactoRoutes);
router.use('/usuarioempresa', UsuarioEmpresaCargoRoutes);
router.use('/validarToken', authRoutes);
router.use('/user', UserRoutes);
router.use('/retos', RetoRoutes); 
router.use('/clasificados', ClasificadoRoutes); 
router.use('/contactarSolicitud', ContactarSolicitudRoutes); 
router.use('/servicio',ServicioRoutes)
router.use('/convocatorias', ConvocatoriaRoutes); // Descomentar si se necesita la ruta de convocatorias
router.use('/tipoConvocatorias', TipoConvocatoriaRoutes); // Descomentar si se necesita la ruta de tipoConvocatorias
router.use('/recurso', RecursosRoute); // Descomentar si se necesita la ruta de aplicarReto
router.use('/curso', Curso); // Descomentar si se necesita la ruta de aplicarReto
router.use('/aplicarCurso', AplicarCurso); // Descomentar si se necesita la ruta de aplicarReto
router.use('/videosCurso', VideosCurso); // Descomentar si se necesita la ruta de videosCurso
router.use('/usuarioVideos', UsuarioVideos); // Descomentar si se necesita la ruta de usuarioVideos
router.use('/invitacion', InvitacionRoutes); // Descomentar si se necesita la ruta de invitacion
router.use('/ubicacion-entidad', UbicacionEntidadRoutes); // Rutas de ubicación de entidades
export default router;