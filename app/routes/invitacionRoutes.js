
import express from 'express';
import Invitacion from '../models/invitaciones.js';
import User from '../models/user.js';
import Entidad from '../models/entidad.js';
import { Op } from 'sequelize';
const router = express.Router();
// Enviar invitación o mensaje usando MySQL

// Crear una nueva invitación
// Crear una nueva invitación
router.post('/', async (req, res) => {
    try {
        const { desdeuserid, parauserid, mensaje, telefono } = req.body;

        // Verificar si ya existe una invitación entre estos usuarios
        const existente = await Invitacion.findOne({
            where: { desdeuserid, parauserid }
        });

        if (existente) {
            return res.status(400).json({ error: 'Ya existe una invitación entre estos usuarios' });
        }

        const invitacion = await Invitacion.create({
            desdeuserid,
            parauserid,
            mensaje,
            telefono,
        });
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
            where: { desdeuserid: id },
            attributes: [],
            include: [
                {
                    model: User,
                    as: 'paraUser',
                    attributes: ['id', 'name', 'email', 'telefono'],
                    include: [
                        {
                            model: Entidad,
                            as: 'entidad', // Asegúrate que el alias coincida con tu asociación
                            attributes: ['razonsocial'], // Elimina esta línea si 'nombre' no existe o da error
                            where: { UserAdminId: { [Op.col]: 'paraUser.id' } }, // Solo si necesitas filtrar por UserAdminId
                            required: false
                        }
                    ]
                }
            ]
        });

        // Usuarios que me han invitado a mí (soy parauserid) y están verificados
        const recibidos = await Invitacion.findAll({
            where: { parauserid: id, verificado: true },
            attributes: [],
            include: [
                {
                    model: User,
                    as: 'desdeUser',
                    attributes: ['id', 'name', 'email', 'telefono']
                }
            ]
        });

        // Extraer solo los datos de usuario
        const enviadosDatos = enviados.map(inv => inv.paraUser);
        const recibidosDatos = recibidos.map(inv => inv.desdeUser);

        res.json({
            enviados: enviadosDatos,
            recibidos: recibidosDatos
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos', details: error.message });
    }
});
export default router;
