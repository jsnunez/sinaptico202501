
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
            }
        });

        if (existente) {
            return res.status(400).json({ error: 'Ya existe una invitación entre estos usuarios' });
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
        const [updatedRows] = await Invitacion.update(
            { verificado: true },
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
router.get('/mis-contactos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Usuarios a los que yo (id) he invitado (soy desdeuserid)
            const enviados = await Invitacion.findAll({
                where: { desdeuserid: id, verificado: true },
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
            if (usuarioData && !usuarioData.empresa) {
                usuarioData.empresa = {
                    id: null,
                    razonSocial: 'Ninguno'
                };
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
        const enviadoCompleto = [];
        for (const userId of idsEnviados) {
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
                enviadoCompleto.push(usuarioData);
            }
        }

        // Usuarios que me han invitado a mí (soy parauserid) y no están verificados
        const recibidos = await Invitacion.findAll({
            where: { parauserid: id, verificado: false },
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
        const recibidosDatos = [];
        for (const userId of idsRecibidos) {
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
