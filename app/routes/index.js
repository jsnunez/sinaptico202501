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
import Proyectos from "./proyectosRoutes.js"; // Importar las rutas de Proyectos
import Contactar from "./contactar.Routes.js"; // Importar las rutas de Contactar
import mapa from "./mapa.Routes.js"; // Importar las rutas de Mapa
import AliadosProyectos from "./aliadosProyectos.Routes.js";
import AliadosProyectosAplicados from "./aliadosProyectosApliacados.Routes.js";
import MiembroComiteRoutes from "./miembroComiteRoutes.js"; // Importar las rutas de MiembroComite
import ConvocatoriaProyectosRoutes from "./convocatoriaProyectosRoutes.js"; // Importar las rutas de ConvocatoriaProyectos
import AsignacionEvaluadorRoutes from "./asignacionEvaluadorRoutes.js"; // Importar las rutas de AsignacionEvaluador
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
router.use('/proyectos', Proyectos); // Rutas de proyectos
router.use('/contactar', Contactar); // Rutas de contactar
router.use('/mapa', mapa); // Rutas de mapa
router.use('/aliados-proyectos', AliadosProyectos); // Rutas de aliados y proyectos
router.use('/aliados-proyectos-aplicados', AliadosProyectosAplicados); // Rutas de aliados y proyectos aplicados
router.use('/miembros-comite', MiembroComiteRoutes); // Rutas de miembros del comité
router.use('/convocatoria-proyectos', ConvocatoriaProyectosRoutes); // Rutas de aplicaciones de proyectos a convocatorias
router.use('/asignacion-evaluadores', AsignacionEvaluadorRoutes); // Rutas de asignación de evaluadores con 5 criterios
export default router;