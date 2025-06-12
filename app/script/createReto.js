import sequelize from '../config/database.js';
const Reto = (await import('../models/reto.js')).default;

const retos = [
    {
        nombre: 'Reto de Innovación',
        ubicacionVideo: 'https://videos.com/innovacion.mp4',
        descripcion: 'Desarrollar una solución innovadora para el sector salud.',
        ubicacionFicha: 'https://docs.com/ficha_innovacion.pdf',
        habilitado: true,
        userId: 1,
    },
    {
        nombre: 'Reto de Sostenibilidad',
        ubicacionVideo: 'https://videos.com/sostenibilidad.mp4',
        descripcion: 'Proponer estrategias para reducir la huella de carbono en empresas.',
        ubicacionFicha: 'https://docs.com/ficha_sostenibilidad.pdf',
        habilitado: true,
        userId: 2,
    },
    {
        nombre: 'Reto de Educación Digital',
        ubicacionVideo: 'https://videos.com/educacion.mp4',
        descripcion: 'Crear una plataforma educativa interactiva.',
        ubicacionFicha: 'https://docs.com/ficha_educacion.pdf',
        habilitado: true,
        userId: 3,
    },
    {
        nombre: 'Reto de Logística',
        ubicacionVideo: null,
        descripcion: 'Optimizar la cadena de suministro en el sector agroindustrial.',
        ubicacionFicha: null,
        habilitado: false,
        userId: 4,
    },
    {
        nombre: 'Reto de Finanzas',
        ubicacionVideo: 'https://videos.com/finanzas.mp4',
        descripcion: 'Desarrollar una app para gestión financiera personal.',
        ubicacionFicha: 'https://docs.com/ficha_finanzas.pdf',
        habilitado: true,
        userId: 5,
    }
];

const insertRetos = async () => {
    try {
        await sequelize.sync();
        await Reto.bulkCreate(retos, { ignoreDuplicates: true });
        console.log("Retos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los retos:", error);
    }
};


export { insertRetos };
export default insertRetos;