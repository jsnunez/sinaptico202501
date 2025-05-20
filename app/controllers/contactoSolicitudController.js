import ContactarSolicitudServicio  from '../models/contactarSolicitudServicio.js';
import Clasificado from '../models/clasificado.js'; // Ajusta la ruta según tu proyecto
import User from '../models/user.js'; // Ajusta la ruta según tu proyecto
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();
// Create a new ContactoSolicitud
export const createContactoSolicitud = async (req, res) => {
    try {
        const { clasificadoId, nombre, email, telefono, mensaje, userId } = req.body;
        const clasificado = await Clasificado.findByPk(clasificadoId);
        if (!clasificado) {
            return res.status(404).json({ message: 'Clasificado no encontrado' });
        }
        const proveedor = await User.findByPk(clasificado.providerId);

        if (!clasificado) {
            return res.status(404).json({ message: 'Clasificado no encontrado' });
        }
    
        const newSolicitud = await ContactarSolicitudServicio.create({
            clasificadoId,
            nombre,
            email,
            telefono,
            mensaje,
            userId,
        });


   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // 👈 para evitar el error de certificado
      }
    });

    await transporter.sendMail({
      from: `"Sináptico" <${process.env.EMAIL_USER}>`,
      to: ` ${email}`,
      subject: 'contactando clasificado',

      html: `
        <p>Hola ${nombre},</p>
        <p> Estas interesado en un clasificado ya le enviamos tu mensaje al creador </p>
        `
    });
    await transporter.sendMail({
        from: `"Sináptico" <${process.env.EMAIL_USER}>`,
        to: ` ${proveedor.email}`,
        subject: 'contactando clasificado ',
  
        html: `
          <p>Hola ${proveedor.name},</p>
          <p> estando interesados en tu clasificado ${clasificado.title} </p>
          <p> Mensaje: ${mensaje} </p>
            <p> Nombre: ${nombre} </p>
            <p> Telefono: ${telefono} </p>
            <p> Email: ${email} </p>
          `
      });
        res.status(201).json(newSolicitud);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all ContactoSolicitudes
export const getAllContactoSolicitudes = async (req, res) => {
    try {
        const solicitudes = await ContactarSolicitudServicio.findAll();
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get ContactoSolicitud by ID
export const getContactoSolicitudById = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitud = await ContactarSolicitudServicio.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({ error: 'ContactoSolicitud not found' });
        }

        res.status(200).json(solicitud);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a ContactoSolicitud by ID
export const updateContactoSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { clasificadoId, nombre, email, telefono, mensaje, userId } = req.body;

        const solicitud = await ContactarSolicitudServicio.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({ error: 'ContactoSolicitud not found' });
        }

        await solicitud.update({
            clasificadoId,
            nombre,
            email,
            telefono,
            mensaje,
            userId,
        });

        res.status(200).json(solicitud);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a ContactoSolicitud by ID
export const deleteContactoSolicitud = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitud = await ContactarSolicitudServicio.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({ error: 'ContactoSolicitud not found' });
        }

        await solicitud.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};