import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// filepath: d:\sebastian\sinaptico2025\app\controllers\contactar.Controller.js


// Configurar el transportador de correo
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

// Enviar información de contacto
export const enviarContacto = async (req, res) => {
    try {
        const { nombre, email, telefono, mensaje, destinatario } = req.body;

        // Validar datos
        if (!nombre || !email || !destinatario) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: `Nuevo contacto de ${nombre}`,
            html: `
                <h2>Información de Contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje || 'Sin mensaje'}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Correo enviado exitosamente'
        });

    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el correo',
            error: error.message
        });
    }
};

// Solicitar información de contacto
export const solicitarDatos = async (req, res) => {
    try {
        const { miNombre, destinatario } = req.body;

        if (!miNombre || !destinatario) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        // Generar token único para el link de aceptación
        const token = Buffer.from(`${destinatario}-${Date.now()}`).toString('base64');
        const acceptLink = `${process.env.FRONTEND_URL || 'http://localhost:4000/'}compartir/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: `Sinaptico: ${miNombre} solicita tu información de contacto`,
            html: `
            <h2>Solicitud de Información</h2>
            <p>${miNombre} te está solicitando compartir tu información de contacto.</p>
            <p>Si deseas compartir tus datos, ingresa a Sinaptico y acepta compartir tu información:</p>
            <p style="margin: 20px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:4000'}" 
                   style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Ir a Sinaptico
                </a>
            </p>
            <hr>
            <p style="color: #666; font-size: 12px;">
                Este enlace te redirige a Sinaptico donde podrás autorizar el envío de tu información de contacto a ${miNombre}.
            </p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Solicitud enviada exitosamente',
            token // Guardar este token en BD para validar cuando acepten
        });

    } catch (error) {
        console.error('Error al solicitar datos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar la solicitud',
            error: error.message
        });
    }
};

// Compartir mi información con otro contacto
export const compartirMiInformacion = async (req, res) => {
    try {
        const { miNombre, miEmail, miTelefono, destinatario, mensaje } = req.body;

        if (!miNombre || !miEmail || !destinatario) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: `${miNombre} quiere compartir su información contigo`,
            html: `
                <h2>${miNombre} desea ponerse en contacto</h2>
                <p><strong>Nombre:</strong> ${miNombre}</p>
                <p><strong>Email:</strong> ${miEmail}</p>
                <p><strong>Teléfono:</strong> ${miTelefono || 'No proporcionado'}</p>
                ${mensaje ? `<p><strong>Mensaje:</strong></p><p>${mensaje}</p>` : ''}
                <hr>
                <p style="color: #666; font-size: 12px;">Este mensaje fue enviado porque autorizaste compartir tu información.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Tu información fue compartida exitosamente'
        });

    } catch (error) {
        console.error('Error al compartir información:', error);
        res.status(500).json({
            success: false,
            message: 'Error al compartir la información',
            error: error.message
        });
    }
};

// Aceptar compartir datos (validar token y enviar información)
export const aceptarCompartirDatos = async (req, res) => {
    try {
        const {  nombre, email, telefono, mensaje } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        // Decodificar token para obtener el destinatario original
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [emailSolicitante, timestamp] = decoded.split('-');

      

        const infoLink = `${process.env.FRONTEND_URL || 'http://localhost:4000'}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailSolicitante,
            subject: `${nombre} ha compartido su información contigo`,
            html: `
            <h2>${nombre} aceptó compartir su información</h2>
            <p>Ingresa a Sinaptico para ver la información de contacto:</p>
            <p style="margin: 20px 0;">
                <a href="${infoLink}" 
                   style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Ver Información en Sinaptico
                </a>
            </p>
            <hr>
            <p style="color: #666; font-size: 12px;">
                ${nombre} autorizó compartir su información de contacto contigo a través de Sinaptico.
            </p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Tu información fue compartida exitosamente'
        });

    } catch (error) {
        console.error('Error al aceptar compartir datos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
};