//-- controlador de autenticación de usurios

import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/user.js';
import nodemailer from 'nodemailer';
dotenv.config();



//--- registrar usuarios con datos  nuevos ---//
async function register(req, res) {
  const { name, email, password, telefono } = req.body;
  console.log(req.body)
  if (!name || !password || !email || !telefono) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    // Verificar si el nombre de usuario o el email ya existen en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ status: "Error", message: "Este email ya está registrado" });
    }



    // Hashear la contraseña antes de guardarla en la base de datos
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await User.create({
      name,
      email,
      password: hashPassword,
      telefono
    });

    // Enviar una respuesta exitosa
    res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.name} registrado` });

  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: "Error al registrar el usuario", error: error.message });
  }
}

//--- iniciar sesion de usuarios ---//
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    // Buscar al usuario por el email en la base de datos
    const usuarioAResvisar = await User.findOne({ where: { email } });

    if (!usuarioAResvisar) {
      return res.status(400).send({ status: "Error", message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es correcta
    const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);

    if (!loginCorrecto) {
      return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jsonwebtoken.sign(
      { email: usuarioAResvisar.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Configurar las opciones de la cookie
    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: "/"
    };

    // Enviar las cookies al cliente
    res.cookie("jwt", token, cookieOption);
    res.cookie("user", usuarioAResvisar.name);
    res.cookie("userId", usuarioAResvisar.id);

    // Verificar el rol del usuario y redirigir según corresponda
    if (usuarioAResvisar.rol === 1) {
      res.send({ status: "ok", message: "Usuario logueado", redirect: "/helice" });
    } else if (usuarioAResvisar.rol === 3) {
      res.send({ status: "ok", message: "Usuario logueado", redirect: "/dashboard" });
    } else {
      res.status(403).send({ status: "Error", message: "Acceso denegado" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: "Error al iniciar sesión", error: error.message });
  }
}
//--- recuperar contraseña ---//

async function recuperarPassword(req, res) {
  const { email } = req.body;
  console.log(email.email)
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }


    const resetToken = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora
    await User.update({ resetToken, resetTokenExpires }, { where: { email } });
    console.log(resetToken)
    const resetLink = `${process.env.FRONTEND_URL}reestablecerpass?token=${resetToken}`;
//--- enviar correo de recuperacion de contraseña ---//

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
      to: ` ${user.email}`,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola ${user.name},</p>
        <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expira en 1 hora.</p>
      `
    });

    res.json({ message: 'Correo de recuperación enviado con éxito' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};
//--- verificar si el token es valido ---//

async function reestablecerPassword(req, res) {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    // Verificar el token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
console.log(decoded);
    // Buscar al usuario por el ID del token
    const user = await User.findOne({ where: { id: decoded.id, resetToken: token } });

    if (!user || user.resetTokenExpires < new Date()) {
      return res.status(400).send({ status: "Error", message: "Token inválido o expirado" });
    }

    // Hashear la nueva contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Actualizar la contraseña y eliminar el token de restablecimiento
    await User.update(
      { password: hashedPassword, resetToken: null, resetTokenExpires: null },
      { where: { id: user.id } }
    );

    res.send({ status: "ok", message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: "Error al restablecer la contraseña", error: error.message });
  }
}
export const methods = {
  login,
  register,
  recuperarPassword,
  reestablecerPassword
}