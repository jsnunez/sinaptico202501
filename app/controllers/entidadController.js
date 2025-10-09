import Entidad from '../models/entidad.js';
import Contacto from '../models/contacto.js';
import Cargo from '../models/cargo.js';
import Ciudad from '../models/ciudad.js';
import Departamento from '../models/departamento.js';
import UsuarioEmpresaCargo from '../models/usuarioEmpresaCargo.js';
import UbicacionEntidad from '../models/ubicacionEntidad.js';
import User from '../models/user.js';

// Controlador para verificar si un usuario tiene una entidad
export const verificarEntidad = async (req, res) => {
  try {
    const userId = req.params.userId;  // Obtener el userId desde los parámetros de la URL

    // Consultar en la base de datos si el usuario tiene una entidad asociada
    const entidad = await Entidad.findOne({
      where: { UserAdminId: userId },  // Buscar la entichdad asociada al usuario
    });
    const usuario = await UsuarioEmpresaCargo.findOne({
      where: { UserId: userId, estado: 1 },  // Buscar el usuario asociado con estado 1
      include: [
        {
          model: Entidad,
          as: 'empresa', // ⚠️ alias usado en la asociación
          attributes: ['id', 'razonSocial', 'habilitado', 'correo'],
        }
      ],

    });


    if (entidad) {
      // Si la entidad existe, enviamos los detalles de la entidad
      return res.json({
      success: true,
      mensaje: 'Entidad encontrada',
      entidad: entidad,
      });
    } else if (usuario) {
      // Si no hay entidad pero sí usuario, enviar datos del usuario
      return res.json({
      success: true,
      mensaje: 'Usuario encontrado',
      entidad: usuario.empresa,
      });
    } else {
      // Si no se encuentra entidad asociada, enviamos una respuesta informativa
      return res.json({
        success: false,
        mensaje: 'El usuario no tiene entidad asociada',
      });
    }
  } catch (error) {
    console.error('Error al verificar la entidad:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al verificar la entidad',
    });
  }
};

// Controlador para obtener todas las empresas
export const obtenerEntidad = async (req, res) => {
  try {
    console.log('🔍 Obteniendo entidades con relaciones...');
    
    // Consultar todas las empresas en la base de datos con sus relaciones
    const empresas = await Entidad.findAll({
      include: [
        {
          model: Contacto,
          required: false, // LEFT JOIN para que no excluya entidades sin contacto
          attributes: ['id', 'nombre', 'telefono', 'email', 'cargoId']
        },
        {
          model: Ciudad,
          as: 'ciudad',
          required: false, // LEFT JOIN para que no excluya entidades sin ciudad
          attributes: ['id', 'nombre', 'departamentoId'],
          include: [
            {
              model: Departamento,
              as: 'departamento',
              required: false,
              attributes: ['id', 'nombre']
            }
          ]
        },
        {
          model: UbicacionEntidad,
          as: 'ubicaciones',
          required: false, // LEFT JOIN para que no excluya entidades sin ubicación
          attributes: ['id', 'latitud', 'longitud', 'direccionCompleta', 'activa', 'verificada', 'esUbicacionPrincipal']
        }
      ]
    });

    console.log(`📊 Se encontraron ${empresas.length} entidades`);
    if (empresas.length > 0) {
      console.log('📋 Primera entidad con datos completos:', JSON.stringify(empresas[0], null, 2));
    }

    if (empresas.length > 0) {
      return res.json({
        success: true,
        empresas: empresas,  // Devuelves las empresas con sus relaciones
      });
    } else {
      return res.json({
        success: false,
        mensaje: 'No se encontraron empresas.',
      });
    }
  } catch (error) {
    console.error('❌ Error al obtener las empresas:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener las empresas',
      error: error.message
    });
  }
};


import multer from 'multer';
import upload from '../config/multerConfig.js'; // Importa la configuración de multer


export const crearEntidad = async (req, res) => {
  // Primero, se recibe el archivo (logo) y los datos del formulario
  upload.single('logo')(req, res, async (err) => {

    if (err) {
      console.log(err)

      return res.status(400).json({ message: err.message });

    }
    console.log(req.body)
    const {
      claseEntidad,
      razonSocial,
      numIdentificacion,
      tipoEntidad,
      naturalezaJuridica,
      actividadEconomica,
      correo,
      telefono,
      fechaConstitucion,
      departamento,
      ciudadId,
      direccion,
      nombreContacto,
      cargoId,
      correoContacto,
      telefonoContacto,
      facebook,
      instagram,
      paginaweb,
      UserAdminId,
      latitud,
      longitud,
    } = req.body;

    try {
      // Crear un nuevo contacto
      const contacto = await Contacto.create({
        nombre: nombreContacto,
        cargoId: cargoId,
        email: correoContacto,
        telefono: telefonoContacto,

      });

      // Crear una nueva entidad, incluyendo el logo
      const nuevaEntidad = await Entidad.create({
        claseEntidad,
        razonSocial,
        numIdentificacion,
        tipoEntidad,
        naturalezaJuridica,
        actividadEconomica,
        correo,
        telefono,
        fechaConstitucion,
        departamento,
        ciudadId,
        direccion,
        logo: req.file.filename,  // Guarda el path del archivo logo
        contactoId: contacto.id,
        facebook: facebook,
        instagram: instagram,
        paginaweb: paginaweb,
        UserAdminId,
      });

      // Crear la ubicación si se proporcionaron coordenadas
      console.log('Verificando coordenadas:', { latitud, longitud });
      console.log('Tipo de latitud:', typeof latitud, 'Valor:', `"${latitud}"`);
      console.log('Tipo de longitud:', typeof longitud, 'Valor:', `"${longitud}"`);
      
      // Validar que las coordenadas no sean strings vacíos
      const latitudValida = latitud && latitud.toString().trim() !== '';
      const longitudValida = longitud && longitud.toString().trim() !== '';
      
      let ubicacionCreada = false;
      
      if (latitudValida && longitudValida) {
        console.log('Intentando crear ubicación para entidad:', nuevaEntidad.id);
        try {
          const ubicacion = await UbicacionEntidad.create({
            entidadId: nuevaEntidad.id,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            direccionCompleta: direccion,
            activa: true,
            verificada: false // Se puede verificar posteriormente
          });
          console.log('✅ Ubicación creada exitosamente:', ubicacion.id);
          ubicacionCreada = true;
        } catch (ubicacionError) {
          console.error('❌ Error al crear la ubicación:', ubicacionError);
          ubicacionCreada = false;
        }
      } else {
        console.log('No se proporcionaron coordenadas válidas. Latitud válida:', latitudValida, 'Longitud válida:', longitudValida);
      }

      return res.status(201).json({
        message: 'Entidad creada con éxito',
        entidad: nuevaEntidad,
        ubicacionCreada: ubicacionCreada
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'La entidad ya existe. Verifique los datos ingresados.' });
      }
      console.error('Error al crear la entidad:', error);
      return res.status(500).json({ message: 'Error al crear la entidad', error });
    }
  });
};


export const editarEntidad = async (req, res) => {
  upload.single('logo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const entidadId = req.params.id;

    const {
      claseEntidad,
      razonSocial,
      numIdentificacion,
      tipoEntidad,
      naturalezaJuridica,
      actividadEconomica,
      correo,
      telefono,
      fechaConstitucion,
      departamento,
      ciudadId,
      direccion,
      nombreContacto,
      cargoPersona,
      correoContacto,
      telefonoContacto,
      facebook,
      instagram,
      paginaweb,
      UserAdminId,
      latitud,
      longitud,
    } = req.body;

    try {
      // Buscar la entidad actual
      const entidad = await Entidad.findByPk(entidadId);
      if (!entidad) {
        return res.status(404).json({ message: 'Entidad no encontrada' });
      }

      // Actualizar el contacto relacionado
      if (entidad.contactoId) {
        await Contacto.update({
          nombre: nombreContacto,
          cargoId: cargoPersona,
          email: correoContacto,
          telefono: telefonoContacto,
        }, {
          where: { id: entidad.contactoId }
        });
      }

      // Construir objeto con campos actualizados
      const nuevosDatos = {
        claseEntidad,
        razonSocial,
        numIdentificacion,
        tipoEntidad,
        naturalezaJuridica,
        actividadEconomica,
        correo,
        telefono,
        fechaConstitucion,
        departamento,
        ciudadId,
        direccion,
        facebook,
        instagram,
        paginaweb,
        UserAdminId,
      };

      if (req.file) {
        nuevosDatos.logo = req.file.filename;
        // console.log(req.file)
      }

      // Actualizar la entidad
      await entidad.update(nuevosDatos);

      // Manejar ubicación si se proporcionaron coordenadas
      if (latitud && longitud) {
        console.log(`📍 Actualizando ubicación: ${latitud}, ${longitud}`);
        
        // Buscar ubicación existente para esta entidad
        const ubicacionExistente = await UbicacionEntidad.findOne({
          where: { entidadId: entidadId }
        });

        if (ubicacionExistente) {
          // Actualizar ubicación existente
          await ubicacionExistente.update({
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            direccionCompleta: direccion || ubicacionExistente.direccionCompleta,
            activa: true,
            verificada: true
          });
          console.log('📍 Ubicación actualizada exitosamente');
        } else {
          // Crear nueva ubicación
          await UbicacionEntidad.create({
            entidadId: entidadId,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            direccionCompleta: direccion,
            activa: true,
            verificada: true,
            esUbicacionPrincipal: true
          });
          console.log('📍 Nueva ubicación creada exitosamente');
        }
      }

      return res.status(200).json({
        message: 'Entidad actualizada con éxito',
        entidad,
        ubicacionActualizada: !!(latitud && longitud)
      });

    } catch (error) {
      console.error('Error al actualizar la entidad:', error);
      return res.status(500).json({ message: 'Error al actualizar la entidad', error });
    }
  });
}

export const cambiarHabilitado = async (req, res) => {
  const entidadId = req.params.id;

  try {
    // Buscar la entidad por su ID
    const entidad = await Entidad.findByPk(entidadId);

    if (!entidad) {
      return res.status(404).json({ message: 'Entidad no encontrada' });
    }

    // Cambiar el estado de habilitado a true
    entidad.habilitado = true;

    // Guardar los cambios en la base de datos
    await entidad.save();

    return res.status(200).json({
      message: 'Estado de habilitado cambiado a true con éxito',
      entidad,
    });
  } catch (error) {
    console.error('Error al cambiar el estado de habilitado:', error);
    return res.status(500).json({ message: 'Error al cambiar el estado de habilitado', error });
  }
}

export const obtenerEntidadesHabilitadas = async (req, res) => {
  try {
    const entidadesHabilitadas = await Entidad.findAll({
      where: { habilitado: true },
      include: [
        {
          model: Contacto,
          include: [
            {
              model: Cargo
            }
          ]
        },
        {
          model: Ciudad,
          include: [
            {
              model: Departamento
            }
          ]
        }
      ]
    });

    if (entidadesHabilitadas.length > 0) {
      return res.json({
        success: true,
        empresas: entidadesHabilitadas,
      });
    } else {
      return res.json({
        success: false,
        mensaje: 'No se encontraron entidades habilitadas.',
      });
    }
  } catch (error) {
    console.error('Error al obtener las entidades habilitadas:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener las entidades habilitadas',
    });
  }
};

export const obtenerCantidadEmpresas = async (req, res) => {
  try {
    // Contar las entidades que tienen claseEntidad igual a 'empresa'
    const cantidad = await Entidad.count({
      where: { claseEntidad: 'empresa' },
    });

    return res.json({
      success: true,
      cantidad,
    });
  } catch (error) {
    console.error('Error al obtener la cantidad de empresas:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener la cantidad de empresas',
    });
  }
};

export const obtenerCantidadEntidades = async (req, res) => {
  try {
    // Contar las entidades que tienen claseEntidad igual a 'empresa'
    const count = await Entidad.count({
      where: { habilitado: true },
    });

    return res.json({

      count,
    });
  } catch (error) {
    console.error('Error al obtener la cantidad de empresas:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener la cantidad de empresas',
    });
  }
};
export const obtenerCantidadEmprendimientos = async (req, res) => {
  try {
    // Contar las entidades que tienen claseEntidad igual a 'emprendimiento'
    const cantidad = await Entidad.count({
      where: { claseEntidad: 'emprendimiento' },
    });

    return res.json({
      success: true,
      cantidad,
    });
  } catch (error) {
    console.error('Error al obtener la cantidad de emprendimientos:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener la cantidad de emprendimientos',
    });
  }
};

export const cambiarEstadoHabilitado = async (req, res) => {
  const entidadId = req.params.id;

  try {
    // Buscar la entidad por su ID
    const entidad = await Entidad.findByPk(entidadId);

    if (!entidad) {
      return res.status(404).json({ message: 'Entidad no encontrada' });
    }

    // Cambiar el estado de habilitado entre 0 y 1
    entidad.habilitado = !entidad.habilitado;

    // Guardar los cambios en la base de datos
    await entidad.save();

    return res.status(200).json({
      message: 'Estado de habilitado cambiado con éxito',
      entidad,
    });
  } catch (error) {
    console.error('Error al cambiar el estado de habilitado:', error);
    return res.status(500).json({ message: 'Error al cambiar el estado de habilitado', error });
  }
};

export const aumentarContadorEntidad = async (req, res) => {
  const entidadId = req.params.id;

  try {
    // Buscar la entidad por su ID
    const entidad = await Entidad.findByPk(entidadId);

    if (!entidad) {
      return res.status(404).json({ message: 'Entidad no encontrada' });
    }

    // Si el campo contador no existe, inicialízalo en 0
    if (typeof entidad.contadorContacto !== 'number') {
      entidad.contadorContacto = 0;
    }

    // Aumentar el contador en 1
    entidad.contadorContacto += 1;

    // Guardar los cambios en la base de datos
    await entidad.save();

    return res.status(200).json({
      message: 'Contador aumentado con éxito',
      contador: entidad.contadorContacto,
      entidad,
    });
  } catch (error) {
    console.error('Error al aumentar el contador:', error);
    return res.status(500).json({ message: 'Error al aumentar el contador', error });
  }
};

export const verificarUserAdminId = async (req, res) => {
  const entidadId = req.params.id;

  try {
    const entidad = await Entidad.findByPk(entidadId);

    if (!entidad) {
      return res.status(404).json({ success: false, mensaje: 'Entidad no encontrada' });
    }

    if (entidad.UserAdminId) {
      return res.json({
        success: true,
        mensaje: 'La entidad tiene UserAdminId asignado',
        UserAdminId: entidad.UserAdminId
      });
    } else {
      return res.json({
        success: false,
        mensaje: 'La entidad no tiene UserAdminId asignado'
      });
    }
  } catch (error) {
    console.error('Error al verificar UserAdminId:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al verificar UserAdminId'
    });
  }
};
export const modificarUserAdminId = async (req, res) => {
  const entidadId = req.params.id;
  let UserAdminId = req.body.UserAdminId || req.body.userAdminId;
  // Validar que UserAdminId esté presente y no sea undefined o vacío
  if (UserAdminId === undefined || UserAdminId === null || UserAdminId === '' || UserAdminId === 'undefined') {
    return res.status(400).json({
      success: false,
      mensaje: 'UserAdminId no proporcionado o inválido',
    });
  }

  try {
    const entidad = await Entidad.findByPk(entidadId);

    if (!entidad) {
      return res.status(404).json({ success: false, mensaje: 'Entidad no encontrada' });
    }

    entidad.UserAdminId = UserAdminId;
    console.log('Modificando UserAdminId en entidad:', entidad.UserAdminId);
    await entidad.save();

    return res.json({
      success: true,
      mensaje: 'UserAdminId modificado con éxito',
      entidad,
    });
  } catch (error) {
    console.error('Error al modificar UserAdminId:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al modificar UserAdminId',
    });
  }
};

export const obtenerCantidadSociedad = async (req, res) => {
  try {
    // Contar las entidades que tienen naturalezaJuridica igual a 'sociedad'
    const cantidad = await Entidad.count({
      where: { naturalezaJuridica: 'sociedad' },
    });

    return res.json({
      success: true,
      cantidad,
    });
  } catch (error) {
    console.error('Error al obtener la cantidad de sociedades:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener la cantidad de sociedades',
    });
  }
};

export const verificarUserAdminIdConusuario = async (req, res) => {
  const UserAdminId = req.params.id;
console.log('Verificando entidades con UserAdminId:', UserAdminId);
  try {
    const entidad = await Entidad.findAll({
      where: { UserAdminId }  ,
        include: [
                { model: User, as: 'usuario' },
                { model: Entidad, as: 'entidad' }
            ]   
    });
    if (!entidad) return res.status(404).json({ error: 'Entidad no encontrada' });
    res.json(entidad);
  } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
