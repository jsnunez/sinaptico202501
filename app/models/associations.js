// models/associations.js
import User from './user.js';
import Entidad from './entidad.js';
import Cargo from './cargo.js';
import Ciudad from './ciudad.js';
import Contacto from './contacto.js';
import Departamento from './departamento.js';
import Reto from './reto.js';
import AplicarReto from './aplicarReto.js';
import UsuarioEmpresaCargo from './usuarioEmpresaCargo.js';
import Clasificado from './clasificado.js';
import ContactarSolicitud from './contactarSolicitudServicio.js';
import Servicio from './servicio.js';
import Convocatoria from './convocatoria.js';
import TipoConvocatorias from './tipoConvocatorias.js';
import Recurso from './recurso.js';
import Curso from './curso.js';
import AplicarCurso from './aplicarCurso.js'; // Asegúrate de que la ruta sea correcta
import VideosCurso from './videosCurso.js'; // Asegúrate de que la ruta sea correcta
import UsuarioVideos from './usuarioVideos.js'; // Asegúrate de que la ruta sea correcta
import Invitacion from './invitaciones.js';
import UbicacionEntidad from './ubicacionEntidad.js'; 
import Proyectos from './proyectos.js';
import AliadosProyectos from './aliadosProyectos.js';
import AliadosProyectosAplicados from './aliadosProyectosAplicados.js';
import AsignacionEvaluador from './asignacionEvaluador.js';
import ConvocatoriaProyectos from './convocatoriaProyectos.js';
import MiembroComite from './miembroComite.js';

// Definir todas las asociaciones aquí
AsignacionEvaluador.belongsTo(User, { as: "Evaluador", foreignKey: "evaluadorId" });
AsignacionEvaluador.belongsTo(Convocatoria, { foreignKey: "convocatoriaId" });
AsignacionEvaluador.belongsTo(Proyectos, { foreignKey: "proyectoId" });

// Asociaciones User - Entidad
User.hasOne(Entidad, { foreignKey: 'UserAdminId', as: 'entidadAdministrada' });
Entidad.belongsTo(User, { foreignKey: 'UserAdminId', as: 'adminUser' });

User.hasMany(UsuarioEmpresaCargo, { foreignKey: 'userId' });
Entidad.hasMany(UsuarioEmpresaCargo, { foreignKey: 'empresaId', as: 'empresa' });
Cargo.hasMany(UsuarioEmpresaCargo, { foreignKey: 'cargoId' });

Ciudad.hasMany(Entidad, { foreignKey: 'ciudadId' });
Entidad.belongsTo(Ciudad, { foreignKey: 'ciudadId', as: 'ciudad' });
Contacto.hasMany(Entidad, { foreignKey: 'contactoId' });
Entidad.belongsTo(Contacto, { foreignKey: 'contactoId' });

Departamento.hasMany(Ciudad, { foreignKey: 'departamentoId' });
Ciudad.belongsTo(Departamento, { foreignKey: 'departamentoId', as: 'departamento' });

Reto.hasMany(AplicarReto, { foreignKey: 'retoId' });
Entidad.hasMany(AplicarReto, { foreignKey: 'entidadId' });

User.hasMany(Clasificado, { foreignKey: 'providerId' });

Clasificado.hasMany(ContactarSolicitud, { foreignKey: 'clasificadoId' });
User.hasMany(ContactarSolicitud, { foreignKey: 'userId' });

Servicio.belongsTo(Entidad, { foreignKey: 'entidadId', as: 'entidad' });
TipoConvocatorias.hasMany(Convocatoria, {
    foreignKey: 'tipoConvocatoriaId',
    as: 'convocatorias'
});

Convocatoria.belongsTo(TipoConvocatorias, {
    foreignKey: 'tipoConvocatoriaId',
    as: 'tipoConvocatoria',
    onDelete: 'RESTRICT'  // Cambiar de SET NULL a RESTRICT
});

Invitacion.belongsTo(User, { as: 'desdeUser', foreignKey: 'desdeuserid' });
Invitacion.belongsTo(User, { as: 'paraUser', foreignKey: 'parauserid' });

// Asociaciones para UbicacionEntidad
Entidad.hasMany(UbicacionEntidad, { 
  foreignKey: 'entidadId', 
  as: 'ubicaciones',
  onDelete: 'CASCADE'
});

UbicacionEntidad.belongsTo(Entidad, { 
  foreignKey: 'entidadId', 
  as: 'entidad' 
});

// Relación para obtener la ubicación principal de una entidad
Entidad.hasOne(UbicacionEntidad, { 
  foreignKey: 'entidadId', 
  as: 'ubicacionPrincipal',
  scope: { esUbicacionPrincipal: true }
});
Entidad.hasMany(Proyectos, { foreignKey: 'entidadId', as: 'proyectos' });
Proyectos.belongsTo(Entidad, { foreignKey: 'entidadId', as: 'entidad' });

User.hasMany(Proyectos, { foreignKey: 'userId', as: 'proyectosDiligenciados' });
Proyectos.belongsTo(User, { foreignKey: 'userId', as: 'usuarioDiligencia' });

// Asociaciones MiembroComite - User
User.hasMany(MiembroComite, { foreignKey: 'userId', as: 'miembrosComite' });
MiembroComite.belongsTo(User, { foreignKey: 'userId', as: 'Usuario' });

// Asociaciones ConvocatoriaProyectos
Proyectos.hasMany(ConvocatoriaProyectos, { foreignKey: 'proyectoId', as: 'convocatoriasAplicadas' });
ConvocatoriaProyectos.belongsTo(Proyectos, { 
    foreignKey: 'proyectoId', 
    as: 'proyecto'
});

Convocatoria.hasMany(ConvocatoriaProyectos, { foreignKey: 'convocatoriaId', as: 'proyectosAplicados' });
ConvocatoriaProyectos.belongsTo(Convocatoria, { 
    foreignKey: 'convocatoriaId', 
    as: 'convocatoria'
});

// Asociaciones AsignacionEvaluador
Convocatoria.hasMany(AsignacionEvaluador, { foreignKey: 'convocatoriaId', as: 'asignacionesEvaluadores' });
AsignacionEvaluador.belongsTo(Convocatoria, { 
    foreignKey: 'convocatoriaId', 
    as: 'convocatoria'
});

Proyectos.hasMany(AsignacionEvaluador, { foreignKey: 'proyectoId', as: 'asignacionesEvaluadores' });
AsignacionEvaluador.belongsTo(Proyectos, { 
    foreignKey: 'proyectoId', 
    as: 'proyecto'
});

MiembroComite.hasMany(AsignacionEvaluador, { foreignKey: 'evaluadorId', as: 'asignaciones' });
AsignacionEvaluador.belongsTo(MiembroComite, { 
    foreignKey: 'evaluadorId', 
    as: 'evaluador'
});

// Al final del archivo - ejecutar las asociaciones automáticamente
// Las asociaciones se definen automáticamente al importar este archivo
console.log('✅ Asociaciones de modelos configuradas correctamente');
