import Entidad from '../models/entidad.js';
import Contacto from '../models/contacto.js';
import Cargo from '../models/cargo.js';
import Ciudad from '../models/ciudad.js';
import Departamento from '../models/departamento.js';
import UsuarioEmpresaCargo from '../models/usuarioEmpresaCargo.js';

// Controlador para verificar si un usuario tiene una entidad
export const verificarEntidad = async (req, res) => {
  try {
    const userId = req.params.userId;  // Obtener el userId desde los parámetros de la URL

    // Consultar en la base de datos si el usuario tiene una entidad asociada
    const entidad = await Entidad.findOne({
      where: { UserAdminId: userId },  // Buscar la entidad asociada al usuario
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
    console.log(usuario)

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
    // Consultar todas las empresas en la base de datos
    const empresas = await Entidad.findAll();

    if (empresas.length > 0) {
      return res.json({
        success: true,
        empresas: empresas,  // Devuelves las empresas
      });
    } else {
      return res.json({
        success: false,
        mensaje: 'No se encontraron empresas.',
      });
    }
  } catch (error) {
    console.error('Error al obtener las empresas:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al obtener las empresas',
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

      return res.status(201).json({
        message: 'Entidad creada con éxito',
        entidad: nuevaEntidad,
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
        console.log(req.file)
      }

      // Actualizar la entidad
      await entidad.update(nuevosDatos);

      return res.status(200).json({
        message: 'Entidad actualizada con éxito',
        entidad,
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
    const count = await Entidad.count();

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