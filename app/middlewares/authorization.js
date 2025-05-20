import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/user.js'; // Asumiendo que estás usando Sequelize u ORM similar

// import {usuarios} from "./../controllers/authentication.controller.js";

dotenv.config();

async function soloUser(req, res, next) {
  const logueado = await revisarCookie(req);
  if (logueado) return next();
  console.log("incia sesion")
  return res.redirect("/")
}

async function soloPublico(req, res, next) {
  const logueado = await revisarCookie(req);
  if (!logueado) return next();
  console.log("no incia sesion")

  return res.redirect("/helice")
}

async function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);

    const email = decodificada.email;


    const usuarioAResvisar = await User.findOne({ where: { email } });
 
    if (!usuarioAResvisar) {
      return false
    }
    return true;
  }
  catch {
    return false;
  }
}

async function soloAdmin(req, res, next) {
  const logueado = await revisarCookie(req);
  if (!logueado) {
    console.log("Inicia sesión");
    return res.redirect("/");
  }

  const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
  const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);

  const usuarioAResvisar = await User.findOne({ where: { email: decodificada.email } });

  if (usuarioAResvisar && usuarioAResvisar.rol === 3) {
    return next();
  }

  console.log("Acceso denegado");
  return res.redirect("/");
}

export const methods = {
  soloUser,
  soloPublico,
  soloAdmin
}