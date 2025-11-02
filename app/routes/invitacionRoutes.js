
import express from 'express';
import Invitacion from '../models/invitaciones.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import { Op } from 'sequelize';
import { enviarNotificacion } from '../config/socketUtils.js';
import UsuarioEmpresaCargo from '../models/usuarioEmpresaCargo.js';
const router = express.Router();
// Enviar invitación o mensaje usando MySQL

// Crear una nueva invitación
// Crear una nueva invitación
router.post('/', async (req, res) => {
    try {
        const { desdeuserid, parauserid, mensaje } = req.body;
        // Verificar que no se invite a sí mismo
        if (desdeuserid === parauserid) {
            return res.status(400).json({ error: 'estas contactando a ti mismo' });
        }
        // Verificar si ya existe una invitación entre estos usuarios (en cualquier dirección)
        const existente = await Invitacion.findOne({
            where: {
                [Op.or]: [
                    { desdeuserid, parauserid },
                    { desdeuserid: parauserid, parauserid: desdeuserid }
                ]
            },
            order: [
                ['verificado', 'ASC'] // Prioridad: 0, 1, 2
            ]
        });

        if (existente) {
            console.log('Invitación existente:', existente.verificado);
            if (existente.verificado == 1) {
                return res.status(400).json({ error: 'Ya se encuentra en tus contactos' });
            }
            if (existente.verificado == 0) {
                return res.status(400).json({ error: 'Ya existe una invitación entre estos usuarios' });
            }
            // Si verificado == 2, se ignora y continúa creando la nueva invitación
        }


        const invitacion = await Invitacion.create({
            desdeuserid,
            parauserid,
            mensaje            
        });

        // Enviar notificación al usuario invitado
        const noti = {
            titulo: 'Nueva invitación',
            texto: 'Has recibido una nueva invitación.',
        };
        enviarNotificacion(String(parauserid), noti);

        res.status(201).json(invitacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la invitación', details: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const notificaciones = await Invitacion.findAll({
            attributes: ['desdeuserid', 'mensaje', 'telefono', 'verificado'],
            where: { parauserid: id },
            include: [
                {
                    model: User,
                    as: 'desdeUser', // ✅ debe coincidir con el alias en associations.js
                    attributes: ['id', 'name', 'email', 'telefono']
                }
            ]
        });
        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones', details: error.message });
    }
});

// Obtener todas las invitaciones
router.get('/', async (req, res) => {
    try {
        const invitaciones = await Invitacion.findAll();
        res.json(invitaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las invitaciones', details: error.message });
    }
});

router.post('/verificar', async (req, res) => {
    try {
        const { de, para } = req.body;

        // Buscar la última invitación entre los dos usuarios
        const invitacion = await Invitacion.findOne({
            where: { desdeuserid: de, parauserid: para, contactarIntegranteverificado: false },
            order: [['updatedAt', 'DESC']],
        });

        if (!invitacion) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }

        // Actualizar solo esa invitación
        await invitacion.update({ verificado: true });

        res.json({ ok: true, mensaje: 'Contacto verificado' });

    } catch (error) {
        console.error('Error al verificar invitación:', error);
        res.status(500).json({ error: 'Error en la base de datos', details: error.message });
    }
});
router.post('/:id/verificar', async (req, res) => {
    try {
        const invitacionId = parseInt(req.params.id);
        
        const invitacion = await Invitacion.findByPk(invitacionId);
        
        if (!invitacion) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        
        await invitacion.update({ verificado: 1 });
        
        res.json({ ok: true, mensaje: 'Invitación verificada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar la invitación', details: error.message });
    }
});

router.post('/rechazar', async (req, res) => {
    try {
        const { de, para } = req.body;
        const [updatedRows] = await Invitacion.update(
            { verificado: 2 },
            { where: { desdeuserid: de, parauserid: para } }
        );
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        res.json({ ok: true, mensaje: 'Contacto verificado' });
    } catch (error) {
        res.status(500).json({ error: 'Error en la base de datos', details: error.message });
    }
});
router.post('/:id/rechazar', async (req, res) => {
    
    try {
        const invitacionId = parseInt(req.params.id);
        
        const invitacion = await Invitacion.findByPk(invitacionId);
        
        if (!invitacion) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }
        
        await invitacion.update({ verificado: 2 });
        
        res.json({ ok: true, mensaje: 'Invitación rechazada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al rechazar la invitación', details: error.message });
    }
});

router.get('/mis-contactos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Usuarios a los que yo (id) he invitado (soy desdeuserid)
            const enviados = await Invitacion.findAll({
                where: { desdeuserid: id, verificado: 1 },
                attributes: [],
                include: [
                    {
                        model: User,
                        as: 'paraUser',
                        attributes: ['id']
                    }
                ]
            });

            // Obtener información de empresa y cargo para los usuarios enviados
            const idsEnviados = enviados.map(inv => inv.paraUser.id);
            // console.log('IDs enviados:', idsEnviados);
            const enviadoCompleto = [];
            for (const userId of idsEnviados) {
                // console.log('Buscando usuarioEmpresaCargo para userId:', userId);
                const usuarioData = await UsuarioEmpresaCargo.findOne({
                    where: { userId: userId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email', 'telefono']
                        },
                        {
                            model: Entidad,
                            as: 'empresa',
                            attributes: ['id', 'razonSocial'],
                            required: false
                        }
                    ]
                });

                // Si no tiene empresa asociada, crear objeto con valores por defecto
                if (usuarioData && !usuarioData.empresa) {
                    usuarioData.empresa = {
                        id: null,
                        razonSocial: 'Ninguno'
                    };
                }
                if (usuarioData) {
                    enviadoCompleto.push(usuarioData);
                }
            }
        // Usuarios que me han invitado a mí (soy parauserid) y están verificados
        const recibidos = await Invitacion.findAll({
            where: { parauserid: id, verificado: true },
            attributes: [],
            include: [
                {
                    model: User,
                    as: 'desdeUser',
                    attributes: ['id']
                }
            ]
        });

        // Obtener información de empresa y cargo para los usuarios recibidos
        const idsRecibidos = recibidos.map(inv => inv.desdeUser.id);
        // console.log('IDs recibidos:', idsRecibidos);
        const recibidosDatos = [];
        for (const userId of idsRecibidos) {
            // console.log('Buscando usuarioEmpresaCargo para userId:', userId);
            const usuarioData = await UsuarioEmpresaCargo.findOne({
                where: { userId: userId, },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'email', 'telefono']
                    },
                    {
                        model: Entidad,
                        as: 'empresa',
                        attributes: ['id', 'razonSocial'],
                        required: false
                    }
                ]
            });

            // Si no tiene empresa asociada, crear objeto con valores por defecto
               if (!usuarioData) {
                const user = await User.findByPk(userId, {
                                    attributes: ['id', 'name', 'email', 'telefono']
                                });
                                
                                const usuarioDataFallback = {
                                    userId: userId,
                                    empresaId: null,
                                    cargoId: null,
                                    User: user || { id: userId, name: 'Usuario no encontrado', email: '', telefono: '' },
                                    empresa: {
                                        id: null,
                                        razonSocial: 'ninguna'
                                    },
                                    
                                    
                                };
                                recibidosDatos.push(usuarioDataFallback);
                                continue;
            }
            if (usuarioData) {
                recibidosDatos.push(usuarioData);
            }
        }

        res.json({
            enviados: enviadoCompleto,
            recibidos: recibidosDatos
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos', details: error.message });
    }
});

router.get('/mis-contactos-pendientes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Usuarios a los que yo (id) he invitado (soy desdeuserid)
        const enviados = await Invitacion.findAll({
                where: { desdeuserid: id, verificado: false },
                attributes: ['id'],
                include: [
                {
                    model: User,
                    as: 'paraUser',
                    attributes: ['id']
                }
                ]
            });

        // Obtener información de empresa y cargo para los usuarios enviados
        const idsEnviados = enviados.map(inv => inv.paraUser.id);
        const invitacionesIds = enviados.map(inv => inv.id);
        const enviadoCompleto = [];
        for (let i = 0; i < idsEnviados.length; i++) {
            const userId = idsEnviados[i];
            const invitacionId = invitacionesIds[i];
            const usuarioData = await UsuarioEmpresaCargo.findOne({
            where: { userId: userId },
             
            include: [
                {
                model: User,
                attributes: ['id', 'name']
                },
                {
                model: Entidad,
                as: 'empresa',
                attributes: ['id', 'razonSocial'],
                required: false
                }
            ]
            });

            // Si no tiene empresa asociada, crear objeto con valores por defecto
            if (usuarioData && !usuarioData.empresa) {
            usuarioData.empresa = {
                id: null,
                razonSocial: 'Ninguno'
            };
            }
            if (usuarioData) {
            usuarioData.dataValues.invitacionId = invitacionId;
            enviadoCompleto.push(usuarioData);
            }
        }

            // Usuarios que me han invitado a mí (soy parauserid) y no están verificados
            const recibidos = await Invitacion.findAll({
                where: { parauserid: id, verificado: false },
                attributes: ['id'],
                include: [
                {
                    model: User,
                    as: 'desdeUser',
                    attributes: ['id']
                }
                ]
            });
            // Obtener información de empresa y cargo para los usuarios recibidos
            const idsRecibidos = recibidos.map(inv => inv.desdeUser.id);
            const invitacionesIdsRecibidos = recibidos.map(inv => inv.id);
            console.log('Recibidos pendientes:', invitacionesIdsRecibidos);    

            const recibidosDatos = [];
            for (let i = 0; i < idsRecibidos.length; i++) {
                const userId = idsRecibidos[i];
                const invitacionId = invitacionesIdsRecibidos[i];
                console.log('Invitación ID para recibido:', userId);

                const usuarioData = await UsuarioEmpresaCargo.findOne({
                where: { userId: userId },
                include: [
                    {
                    model: User,
                    attributes: ['id', 'name', 'email', 'telefono']
                    },
                    {
                    model: Entidad,
                    as: 'empresa',
                    attributes: ['id', 'razonSocial'],
                    required: false
                    }
                ]
                });

                // Si no tiene empresa asociada, crear objeto con valores por defecto
                if (!usuarioData) {
                const user = await User.findByPk(userId, {
                                    attributes: ['id', 'name', 'email', 'telefono']
                                });
                                
                                const usuarioDataFallback = {
                                    id: invitacionId,
                                    userId: userId,
                                    empresaId: null,
                                    cargoId: null,
                                    User: user || { id: userId, name: 'Usuario no encontrado', email: '', telefono: '' },
                                    empresa: {
                                        id: null,
                                        razonSocial: 'ninguna'
                                    },
                                    
                                        invitacionId: invitacionId
                                    
                                };
                                recibidosDatos.push(usuarioDataFallback);
                                continue;
            }
            if (usuarioData) {
                usuarioData.dataValues.invitacionId = invitacionId;
                recibidosDatos.push(usuarioData);
            }
            }


        res.json({
            enviados: enviadoCompleto,
            recibidos: recibidosDatos
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos pendientes', details: error.message });
    }
});
export default router;
