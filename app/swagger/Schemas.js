/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - nombre
 *         - email
 *         - password
 *         - createdAt
 *         - updatedAt
 *     Entidad:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         claseEntidad:
 *           type: string
 *           enum: [Empresa, Estado, Sociedad, Academia]
 *         razonSocial:
 *           type: string
 *         habilitado:
 *           type: boolean
 *         numIdentificacion:
 *           type: string
 *         tipoEntidad:
 *           type: string
 *           enum: [Sociedad Anónima, Sociedad Limitada, Persona Natural]
 *         naturalezaJuridica:
 *           type: string
 *           enum: [Privada, Pública, Mixta]
 *         actividadEconomica:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *         telefono:
 *           type: string
 *         fechaConstitucion:
 *           type: string
 *           format: date-time
 *         ciudadId:
 *           type: integer
 *         direccion:
 *           type: string
 *         facebook:
 *           type: string
 *         instagram:
 *           type: string
 *         paginaweb:
 *           type: string
 *         contadorContacto:
 *           type: integer
 *         logo:
 *           type: string
 *         contactoId:
 *           type: integer
 *         UserAdminId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - claseEntidad
 *         - razonSocial
 *         - habilitado
 *         - numIdentificacion
 *         - tipoEntidad
 *         - naturalezaJuridica
 *         - actividadEconomica
 *         - correo
 *         - telefono
 *         - fechaConstitucion
 *         - ciudadId
 *         - direccion
 *         - facebook
 *         - instagram
 *         - paginaweb
 *         - contadorContacto
 *         - logo
 *         - createdAt
 *         - updatedAt
 *     Cargo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *     Departamento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *     Ciudad:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         departamentoId:
 *           type: integer
 *       required:
 *         - id
 *         - nombre
 *         - departamentoId
 *     Contacto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *         - email
 *     UsuarioEmpresaCargo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         empresaId:
 *           type: integer
 *         cargoId:
 *           type: integer
 *       required:
 *         - id
 *         - usuarioId
 *         - empresaId
 *         - cargoId
 *     Auth:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *       required:
 *         - token
 *     Reto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *       required:
 *         - id
 *         - titulo
 *     Clasificado:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *       required:
 *         - id
 *         - titulo
 *     ContactarSolicitud:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         solicitudId:
 *           type: integer
 *       required:
 *         - id
 *         - usuarioId
 *         - solicitudId
 *     Servicio:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *     Convocatoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         fechaInicio:
 *           type: string
 *           format: date
 *         fechaFin:
 *           type: string
 *           format: date
 *       required:
 *         - id
 *         - titulo
 *         - fechaInicio
 *         - fechaFin
 *     TipoConvocatoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *     Recurso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         url:
 *           type: string
 *       required:
 *         - id
 *         - nombre
 *         - url
 *     Curso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *       required:
 *         - id
 *         - titulo
 *     AplicarCurso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         cursoId:
 *           type: integer
 *       required:
 *         - id
 *         - usuarioId
 *         - cursoId
 *     VideosCurso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cursoId:
 *           type: integer
 *         titulo:
 *           type: string
 *         url:
 *           type: string
 *       required:
 *         - id
 *         - cursoId
 *         - titulo
 *         - url
 *     UsuarioVideos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         videoId:
 *           type: integer
 *         visto:
 *           type: boolean
 *       required:
 *         - id
 *         - usuarioId
 *         - videoId
 *         - visto
 */


/**
 * @swagger
 * /api/cargos:
 *   get:
 *     summary: Obtener todos los cargos
 *     tags:
 *       - Cargo
 *     responses:
 *       200:
 *         description: Lista de cargos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cargo'
 *   post:
 *     summary: Crear un nuevo cargo
 *     tags:
 *       - Cargo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cargo'
 *     responses:
 *       201:
 *         description: Cargo creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cargo'
 */

/**
 * @swagger
 * /api/ciudades:
 *   get:
 *     summary: Obtener todas las ciudades
 *     tags:
 *       - Ciudad
 *     responses:
 *       200:
 *         description: Lista de ciudades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ciudad'
 * /api/ciudades/ciudad/{ciudadId}:
 *   get:
 *     summary: Obtener una ciudad por su ID
 *     tags:
 *       - Ciudad
 *     parameters:
 *       - in: path
 *         name: ciudadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Ciudad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ciudad'
 *       404:
 *         description: Ciudad no encontrada
 * /api/ciudades/{departamentoId}:
 *   get:
 *     summary: Obtener ciudades por ID de departamento
 *     tags:
 *       - Ciudad
 *     parameters:
 *       - in: path
 *         name: departamentoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Lista de ciudades del departamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ciudad'
 *       404:
 *         description: Departamento no encontrado
 */

/**
 * @swagger
 * /api/clasificados:
 *   get:
 *     summary: Obtener todos los clasificados
 *     tags:
 *       - Clasificado
 *     responses:
 *       200:
 *         description: Lista de clasificados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clasificado'
 *   post:
 *     summary: Crear un nuevo clasificado
 *     tags:
 *       - Clasificado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clasificado'
 *     responses:
 *       201:
 *         description: Clasificado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clasificado'
 *
 * /api/clasificados/cantidad:
 *   get:
 *     summary: Obtener la cantidad de clasificados
 *     tags:
 *       - Clasificado
 *     responses:
 *       200:
 *         description: Cantidad de clasificados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *
 * /api/clasificados/{id}:
 *   get:
 *     summary: Obtener un clasificado por ID
 *     tags:
 *       - Clasificado
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del clasificado
 *     responses:
 *       200:
 *         description: Clasificado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clasificado'
 *       404:
 *         description: Clasificado no encontrado
 *   put:
 *     summary: Actualizar un clasificado por ID
 *     tags:
 *       - Clasificado
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del clasificado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clasificado'
 *     responses:
 *       200:
 *         description: Clasificado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clasificado'
 *       404:
 *         description: Clasificado no encontrado
 *   delete:
 *     summary: Eliminar un clasificado por ID
 *     tags:
 *       - Clasificado
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del clasificado
 *     responses:
 *       204:
 *         description: Clasificado eliminado
 *       404:
 *         description: Clasificado no encontrado
 */


/**
 * @swagger
 * /api/contactos/{contactoId}:
 *   get:
 *     summary: Obtener un contacto por su ID
 *     tags:
 *       - Contacto
 *     parameters:
 *       - in: path
 *         name: contactoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Contacto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       404:
 *         description: Contacto no encontrado
 */

/**
 * @swagger
 * /api/contactarSolicitud:
 *   post:
 *     summary: Crear una nueva solicitud de contacto
 *     tags:
 *       - ContactarSolicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactarSolicitud'
 *     responses:
 *       201:
 *         description: Solicitud de contacto creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactarSolicitud'
 *   get:
 *     summary: Obtener todas las solicitudes de contacto
 *     tags:
 *       - ContactarSolicitud
 *     responses:
 *       200:
 *         description: Lista de solicitudes de contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactarSolicitud'
 *
 * /api/contactarSolicitud/{id}:
 *   get:
 *     summary: Obtener una solicitud de contacto por ID
 *     tags:
 *       - ContactarSolicitud
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud de contacto
 *     responses:
 *       200:
 *         description: Solicitud de contacto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactarSolicitud'
 *       404:
 *         description: Solicitud de contacto no encontrada
 *   put:
 *     summary: Actualizar una solicitud de contacto por ID
 *     tags:
 *       - ContactarSolicitud
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactarSolicitud'
 *     responses:
 *       200:
 *         description: Solicitud de contacto actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactarSolicitud'
 *       404:
 *         description: Solicitud de contacto no encontrada
 *   delete:
 *     summary: Eliminar una solicitud de contacto por ID
 *     tags:
 *       - ContactarSolicitud
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud de contacto
 *     responses:
 *       204:
 *         description: Solicitud de contacto eliminada
 *       404:
 *         description: Solicitud de contacto no encontrada
 */

/**
 * @swagger
 * /api/convocatorias:
 *   get:
 *     summary: Obtener todas las convocatorias
 *     tags:
 *       - Convocatoria
 *     responses:
 *       200:
 *         description: Lista de convocatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Convocatoria'
 *   post:
 *     summary: Crear una nueva convocatoria
 *     tags:
 *       - Convocatoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Convocatoria'
 *     responses:
 *       201:
 *         description: Convocatoria creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Convocatoria'
 *
 * /api/convocatorias/{id}:
 *   delete:
 *     summary: Eliminar una convocatoria por ID
 *     tags:
 *       - Convocatoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la convocatoria
 *     responses:
 *       204:
 *         description: Convocatoria eliminada
 *       404:
 *         description: Convocatoria no encontrada
 *   put:
 *     summary: Actualizar una convocatoria por ID
 *     tags:
 *       - Convocatoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la convocatoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Convocatoria'
 *     responses:
 *       200:
 *         description: Convocatoria actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Convocatoria'
 *       404:
 *         description: Convocatoria no encontrada
 *
 * /api/convocatorias/cantidadConvocatorias:
 *   get:
 *     summary: Obtener la cantidad de convocatorias
 *     tags:
 *       - Convocatoria
 *     responses:
 *       200:
 *         description: Cantidad de convocatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *
 * /api/convocatorias/cantidadEventos:
 *   get:
 *     summary: Obtener la cantidad de eventos
 *     tags:
 *       - Convocatoria
 *     responses:
 *       200:
 *         description: Cantidad de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *
 * /api/convocatorias/habilitar/{id}:
 *   put:
 *     summary: Cambiar el estado habilitado de una convocatoria
 *     tags:
 *       - Convocatoria
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la convocatoria
 *     responses:
 *       200:
 *         description: Estado de convocatoria actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Convocatoria'
 *       404:
 *         description: Convocatoria no encontrada
 */


/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags:
 *       - Curso
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *   post:
 *     summary: Crear un nuevo curso
 *     tags:
 *       - Curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso no encontrado
 *   put:
 *     summary: Actualizar un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       200:
 *         description: Curso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso no encontrado
 *   delete:
 *     summary: Eliminar un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       204:
 *         description: Curso eliminado
 *       404:
 *         description: Curso no encontrado
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags:
 *       - Departamento
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags:
 *       - Departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Departamento'
 *     responses:
 *       201:
 *         description: Departamento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *
 * /api/departamentos/{depId}:
 *   get:
 *     summary: Obtener un departamento por ID
 *     tags:
 *       - Departamento
 *     parameters:
 *       - in: path
 *         name: depId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 */

/**
 * @swagger
 * /api/recursos:
 *   get:
 *     summary: Obtener todos los recursos
 *     tags:
 *       - Recurso
 *     responses:
 *       200:
 *         description: Lista de recursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recurso'
 *   post:
 *     summary: Crear un nuevo recurso
 *     tags:
 *       - Recurso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       201:
 *         description: Recurso creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurso'
 *
 * /api/recursos/{id}:
 *   get:
 *     summary: Obtener un recurso por ID
 *     tags:
 *       - Recurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurso'
 *       404:
 *         description: Recurso no encontrado
 *   put:
 *     summary: Actualizar un recurso por ID
 *     tags:
 *       - Recurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recurso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurso'
 *     responses:
 *       200:
 *         description: Recurso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurso'
 *       404:
 *         description: Recurso no encontrado
 *   delete:
 *     summary: Eliminar un recurso por ID
 *     tags:
 *       - Recurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recurso
 *     responses:
 *       204:
 *         description: Recurso eliminado
 *       404:
 *         description: Recurso no encontrado
 */

/**
 * @swagger
 * /api/retos:
 *   get:
 *     summary: Obtener todos los retos
 *     tags:
 *       - Reto
 *     responses:
 *       200:
 *         description: Lista de retos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reto'
 *   post:
 *     summary: Crear un nuevo reto
 *     tags:
 *       - Reto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reto'
 *     responses:
 *       201:
 *         description: Reto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reto'
 *
 * /api/retos/cantidad:
 *   get:
 *     summary: Obtener la cantidad de retos
 *     tags:
 *       - Reto
 *     responses:
 *       200:
 *         description: Cantidad de retos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *
 * /api/retos/obtenerAplicaciones:
 *   get:
 *     summary: Obtener aplicaciones de retos
 *     tags:
 *       - Reto
 *     responses:
 *       200:
 *         description: Lista de aplicaciones de retos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *
 * /api/retos/verificar-aplicacion:
 *   get:
 *     summary: Verificar aplicación a un reto
 *     tags:
 *       - Reto
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 * /api/retos/{id}:
 *   get:
 *     summary: Obtener un reto por ID
 *     tags:
 *       - Reto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del reto
 *     responses:
 *       200:
 *         description: Reto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reto'
 *       404:
 *         description: Reto no encontrado
 *
 * /api/retos/aplicar:
 *   post:
 *     summary: Aplicar a un reto
 *     tags:
 *       - Reto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Aplicación creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 * /api/retos/{fk}:
 *   put:
 *     summary: Actualizar un reto por FK
 *     tags:
 *       - Reto
 *     parameters:
 *       - in: path
 *         name: fk
 *         schema:
 *           type: integer
 *         required: true
 *         description: FK del reto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reto'
 *     responses:
 *       200:
 *         description: Reto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reto'
 *       404:
 *         description: Reto no encontrado
 *
 * /api/retos/habilitar/{id}:
 *   put:
 *     summary: Cambiar el estado habilitado de un reto
 *     tags:
 *       - Reto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del reto
 *     responses:
 *       200:
 *         description: Estado de reto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reto'
 *       404:
 *         description: Reto no encontrado
 */

/**
 * @swagger
 * /api/servicios:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags:
 *       - Servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       201:
 *         description: Servicio creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *
 * /api/servicios/entidad/{id}:
 *   get:
 *     summary: Obtener servicios por ID de entidad
 *     tags:
 *       - Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entidad
 *     responses:
 *       200:
 *         description: Lista de servicios de la entidad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Entidad no encontrada
 *
 * /api/servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio por ID
 *     tags:
 *       - Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     responses:
 *       204:
 *         description: Servicio eliminado
 *       404:
 *         description: Servicio no encontrado
 *   put:
 *     summary: Editar un servicio por ID
 *     tags:
 *       - Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       200:
 *         description: Servicio actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 */


/**
 * @swagger
 * /api/tipoConvocatorias:
 *   get:
 *     summary: Obtener todos los tipos de convocatoria
 *     tags:
 *       - TipoConvocatoria
 *     responses:
 *       200:
 *         description: Lista de tipos de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoConvocatoria'
 */

/**
 * @swagger
 * /api/usuarioempresa:
 *   post:
 *     summary: Asignar usuario a entidad y cargo
 *     tags:
 *       - UsuarioEmpresaCargo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *     responses:
 *       201:
 *         description: Usuario asignado a entidad y cargo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *   get:
 *     summary: Obtener todas las asignaciones usuario-empresa-cargo
 *     tags:
 *       - UsuarioEmpresaCargo
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *
 * /api/usuarioempresa/user/{userId}:
 *   get:
 *     summary: Obtener asignaciones por ID de usuario
 *     tags:
 *       - UsuarioEmpresaCargo
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Asignaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *       404:
 *         description: Usuario no encontrado
 *
 * /api/usuarioempresa/empresa/{empresaId}:
 *   get:
 *     summary: Obtener asignaciones por ID de empresa
 *     tags:
 *       - UsuarioEmpresaCargo
 *     parameters:
 *       - in: path
 *         name: empresaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Asignaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *       404:
 *         description: Empresa no encontrada
 *
 * /api/usuarioempresa/habilitar/{id}:
 *   put:
 *     summary: Habilitar o deshabilitar usuario en empresa
 *     tags:
 *       - UsuarioEmpresaCargo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asignación
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *       404:
 *         description: Asignación no encontrada
 *
 * /api/usuarioempresa/{id}:
 *   get:
 *     summary: Obtener asignación por ID
 *     tags:
 *       - UsuarioEmpresaCargo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asignación
 *     responses:
 *       200:
 *         description: Asignación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEmpresaCargo'
 *       404:
 *         description: Asignación no encontrada
 */

/**
 * @swagger
 * /api/usuarioVideos:
 *   get:
 *     summary: Obtener todos los usuarioVideos
 *     tags:
 *       - UsuarioVideos
 *     responses:
 *       200:
 *         description: Lista de usuarioVideos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioVideos'
 *   post:
 *     summary: Crear un nuevo usuarioVideo
 *     tags:
 *       - UsuarioVideos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioVideos'
 *     responses:
 *       201:
 *         description: UsuarioVideo creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVideos'
 *
 * /api/usuarioVideos/{id}:
 *   get:
 *     summary: Obtener un usuarioVideo por ID
 *     tags:
 *       - UsuarioVideos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuarioVideo
 *     responses:
 *       200:
 *         description: UsuarioVideo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVideos'
 *       404:
 *         description: UsuarioVideo no encontrado
 *   put:
 *     summary: Actualizar un usuarioVideo
 *     tags:
 *       - UsuarioVideos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuarioVideo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioVideos'
 *     responses:
 *       200:
 *         description: UsuarioVideo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioVideos'
 *       404:
 *         description: UsuarioVideo no encontrado
 *   delete:
 *     summary: Eliminar un usuarioVideo
 *     tags:
 *       - UsuarioVideos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuarioVideo
 *     responses:
 *       204:
 *         description: UsuarioVideo eliminado
 *       404:
 *         description: UsuarioVideo no encontrado
 *
 * /api/usuarioVideos/usuario/{id}:
 *   get:
 *     summary: Obtener videos por ID de usuario
 *     tags:
 *       - UsuarioVideos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Videos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioVideos'
 *       404:
 *         description: Usuario no encontrado
 *
 * /api/usuarioVideos/verificar/{usuarioId}/{videoId}:
 *   get:
 *     summary: Verificar si un usuario ha visto un video
 *     tags:
 *       - UsuarioVideos
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del video
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/videosCurso/{id}:
 *   get:
 *     summary: Obtener videos por ID de curso
 *     tags:
 *       - VideosCurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de videos del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VideosCurso'
 *       404:
 *         description: Curso no encontrado
 *
 * /api/videosCurso/cantidad/{id}:
 *   get:
 *     summary: Obtener la cantidad de videos por ID de curso
 *     tags:
 *       - VideosCurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Cantidad de videos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *       404:
 *         description: Curso no encontrado
 *
 * /api/videosCurso/ids/{id}:
 *   get:
 *     summary: Obtener los IDs de videos por ID de curso
 *     tags:
 *       - VideosCurso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de IDs de videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *       404:
 *         description: Curso no encontrado
 */