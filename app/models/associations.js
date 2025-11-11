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
import AliadosProyectosAplicados from './aliadosProyectosApliacdos.js';

// Definir todas las asociaciones aquí

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
    as: 'tipoConvocatoria'
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
export default () => {
  // Esto asegura que las asociaciones se definan solo una vez
  User.sync();
  Entidad.sync();
  Cargo.sync();
  Ciudad.sync();
  Departamento.sync();
  Contacto.sync();
  Reto.sync();
  AplicarReto.sync();
  Clasificado.sync();
  UsuarioEmpresaCargo.sync();
  Servicio.sync();
  TipoConvocatorias.sync(); 
  Convocatoria.sync();
  Recurso.sync();
  Curso.sync();
  AplicarCurso.sync();
  VideosCurso.sync();
  UsuarioVideos.sync();
  Invitacion.sync();
  UbicacionEntidad.sync(); 
  Proyectos.sync();
  AliadosProyectos.sync();
  AliadosProyectosAplicados.sync();
};
