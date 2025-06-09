// Módulos externos
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Configuración inicial
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base de datos y modelos
import sequelize from './config/database.js';
import './models/associations.js';

// Middleware y rutas
import { methods as authentication } from './controllers/authentication.controller.js';
import { methods as authorization } from './middlewares/authorization.js';
import routes from './routes/index.js';

// Configurar Express
const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'app/public/logos'),
    filename: (req, file, cb) => {
        const empresaNombre = req.body.numIdentificacion;
        const extension = path.extname(file.originalname);
        cb(null, empresaNombre + extension);
    }
});
const upload = multer({ storage });

// API: rutas agrupadas
app.use('/api', routes);

// Auth endpoints
app.post('/api/login', authentication.login);
app.post('/api/register', authentication.register);
app.post('/api/recuperarPass', authentication.recuperarPassword);

// Subida de archivos
app.post('/upload', upload.single('logo'), (req, res) => {
    console.log(`Empresa: ${req.body.nombre}, Archivo: ${req.file.filename}`);
    res.send('Logo subido con éxito.');
});

// Rutas HTML públicas
app.get('/', authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages/home.html')));
app.get('/register', authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages/register.html')));
app.get('/reestablecerpass', authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages/restablecer.html')));

// Rutas HTML para usuarios
app.get('/helice', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/User/helice.html')));
app.get('/innovacion', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/User/innovacion.html')));
app.get('/eventos', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/User/eventos.html')));
app.get('/convocatorias', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/User/convocatorias.html')));
app.get('/construccion', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/construccion.html')));
app.get('/conocimiento', authorization.soloUser, (req, res) => res.sendFile(path.join(__dirname, 'pages/User/conocimiento.html')));

// Rutas HTML para admins
app.get('/dashboard', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/dashboard.html')));
app.get('/entidades', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/entidades.html')));
app.get('/usuarios', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/usuarios.html')));
app.get('/creareto', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/crearReto.html')));
app.get('/retos', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/retos.html')));
app.get('/muro', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/muro.html')));
app.get('/conocimientoDashboard', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/conocimientoDashboard.html')));
app.get('/cursoDashboard', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/cursoDashboard.html')));
app.get('/eventosDashboard', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages/admin/eventosDashboard.html')));

// Inicializar servidor
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
