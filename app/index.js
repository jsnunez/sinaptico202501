
import express from 'express';
import dotenv from 'dotenv'; // Importar dotenv para cargar variables de entorno
import cookieParser from 'cookie-parser';
import multer from "multer";
import sequelize from './config/database.js';  // Importa la conexión de Sequelize
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js"
import { methods as authorization } from "./middlewares/authorization.js";
import routes from './routes/index.js'; // Carga centralizada de rutas

import './models/associations.js'; // Importar asociaciones

import cors from 'cors';




// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/public/logos'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const empresaNombre = req.body.numIdentificacion; // Obtener el nombre de la empresa
        const fileExtension = path.extname(file.originalname); // Obtener la extensión del archivo (e.g., .jpg, .png)


        cb(null, empresaNombre + fileExtension); // Asignar el nuevo nombre al archivo
    }
});

// Configurar multer
const upload = multer({ storage: storage });  // Configuración del middleware multer

//Server
const app = express();


app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser())


// Rutas agrupadas apis
app.use('/api', routes);

app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/home.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
// app.get("/crearentidad", authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/User/crearentidad.html"));
app.get("/reestablecerpass", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/restablecer.html"));
app.get("/helice", authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/User/helice.html"));
app.get("/innovacion", authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/User/innovacion.html"));
app.get("/crearReto", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/crearReto.html"));
app.get("/dashboard", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/dashboard.html"));
app.get("/entidades", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/entidades.html"));
app.get("/usuarios", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/usuarios.html"));
app.get("/creareto", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/crearReto.html"));
app.get("/retos", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/retos.html"));
app.get("/muro", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/muro.html"));
app.get("/eventos",authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/User/eventos.html"));
app.get("/construccion", authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/construccion.html"));
app.get("/conocimiento", authorization.soloUser, (req, res) => res.sendFile(__dirname + "/pages/user/conocimiento.html"));
app.get("/conocimientoDashboard", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/conocimientoDashboard.html"));
app.get("/cursoDashboard", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/cursoDashboard.html"));
app.get("/eventosDashboard", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/eventosDashboard.html"));



// Autenticación
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);
app.post('/api/recuperarPass', authentication.recuperarPassword);


// Ruta para manejar el formulario de subida
app.post('/upload', upload.single('logo'), (req, res) => {
    const nombre = req.body.nombre; // Nombre de la empresa
    const logo = req.file; // Archivo subido

    // Mostrar los detalles en consola
    console.log(`Nombre de la empresa: ${nombre}`);
    console.log(`Archivo subido: ${logo.filename}`);

    // Responder al cliente
    res.send('Logo subido con éxito.');
});




// Iniciar servidor
sequelize.sync() // Cambia 'force' a 'alter' para evitar la pérdida de datos
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
