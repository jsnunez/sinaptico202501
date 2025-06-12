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
// Definir todas las asociaciones aquí

User.hasMany(UsuarioEmpresaCargo, { foreignKey: 'userId' });
Entidad.hasMany(UsuarioEmpresaCargo, { foreignKey: 'empresaId', as: 'empresa' });
Cargo.hasMany(UsuarioEmpresaCargo, { foreignKey: 'cargoId' });

Ciudad.hasMany(Entidad, { foreignKey: 'ciudadId' });
Contacto.hasMany(Entidad, { foreignKey: 'contactoId' });
Entidad.belongsTo(Contacto, { foreignKey: 'contactoId' });

Departamento.hasMany(Ciudad, { foreignKey: 'departamentoId' });

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
};
