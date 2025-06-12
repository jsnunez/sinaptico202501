import sequelize from '../config/database.js';
import Recurso from '../models/recurso.js';

const libros = [
    {
        nombre: "Cien Años de Soledad",
        descripcion: "Novela icónica de Gabriel García Márquez sobre la familia Buendía en Macondo.",
        ubicacion: "https://ejemplo.com/libros/cien-anos-de-soledad.pdf"
    },
    {
        nombre: "El Principito",
        descripcion: "Fábula filosófica de Antoine de Saint-Exupéry con enseñanzas sobre la vida y el amor.",
        ubicacion: "https://ejemplo.com/libros/el-principito.pdf"
    },
    {
        nombre: "Don Quijote de la Mancha",
        descripcion: "Obra maestra de Miguel de Cervantes, sátira de las novelas de caballería.",
        ubicacion: "https://ejemplo.com/libros/don-quijote.pdf"
    },
    {
        nombre: "1984",
        descripcion: "Distopía política de George Orwell que explora el totalitarismo.",
        ubicacion: "https://ejemplo.com/libros/1984.pdf"
    },
    {
        nombre: "Sapiens: De animales a dioses",
        descripcion: "Ensayo de Yuval Noah Harari sobre la evolución de la humanidad.",
        ubicacion: "https://ejemplo.com/libros/sapiens.pdf"
    },
    {
        nombre: "La Odisea",
        descripcion: "Poema épico atribuido a Homero sobre el regreso de Ulises a Ítaca.",
        ubicacion: "https://ejemplo.com/libros/la-odisea.pdf"
    },
    {
        nombre: "Crónica de una muerte anunciada",
        descripcion: "Novela breve de García Márquez sobre un asesinato inevitable.",
        ubicacion: "https://ejemplo.com/libros/cronica-muerte-anunciada.pdf"
    },
    {
        nombre: "Rayuela",
        descripcion: "Novela experimental de Julio Cortázar con múltiples formas de lectura.",
        ubicacion: "https://ejemplo.com/libros/rayuela.pdf"
    },
    {
        nombre: "Orgullo y prejuicio",
        descripcion: "Romance de Jane Austen que critica la sociedad inglesa del siglo XIX.",
        ubicacion: "https://ejemplo.com/libros/orgullo-prejuicio.pdf"
    },
    {
        nombre: "Fahrenheit 451",
        descripcion: "Novela de Ray Bradbury sobre un mundo donde los libros están prohibidos.",
        ubicacion: "https://ejemplo.com/libros/fahrenheit-451.pdf"
    }
];

const insertRecurso = async () => {
    try {
        await sequelize.sync();
        await Recurso.bulkCreate(libros, { ignoreDuplicates: true });
        console.log("Libros insertados exitosamente en 'Recurso'");
    } catch (error) {
        console.error("Error al insertar libros:", error);
    }
};


export { insertRecurso };
export default insertRecurso;
