import sequelize from '../config/database.js';
import Curso from '../models/curso.js';

const cursos = [
    {
        nombre: "Introducción a JavaScript",
        descripcion: "Aprende los fundamentos del lenguaje JavaScript moderno.",
        duracion: "180",
        video: "https://www.youtube.com/watch?v=upDLs1sn7g4",
        temario: "https://miweb.com/temarios/js-basico.pdf"
    },
    {
        nombre: "HTML y CSS desde cero",
        descripcion: "Crea sitios web estáticos utilizando HTML5 y CSS3.",
        duracion: "120",
        video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        temario: "https://miweb.com/temarios/html-css.pdf"
    },
    {
        nombre: "Python para principiantes",
        descripcion: "Aprende a programar con Python desde cero.",
        duracion: "200",
        video: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        temario: "https://miweb.com/temarios/python-basico.pdf"
    },
    {
        nombre: "Bases de Datos con MySQL",
        descripcion: "Diseño, consultas y administración de bases de datos MySQL.",
        duracion: "160",
        video: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        temario: "https://miweb.com/temarios/mysql.pdf"
    },
    {
        nombre: "Desarrollo Web con React",
        descripcion: "Crea aplicaciones web dinámicas utilizando React.js.",
        duracion: "240",
        video: "https://www.youtube.com/watch?v=DLX62G4lc44",
        temario: "https://miweb.com/temarios/react.pdf"
    },
    {
        nombre: "Node.js y Express para APIs REST",
        descripcion: "Construye APIs modernas con Node.js y Express.",
        duracion: "180",
        video: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        temario: "https://miweb.com/temarios/node-express.pdf"
    },
    {
        nombre: "Fundamentos de Git y GitHub",
        descripcion: "Control de versiones colaborativo con Git y GitHub.",
        duracion: "90",
        video: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        temario: "https://miweb.com/temarios/git.pdf"
    },
    {
        nombre: "Diseño UI/UX con Figma",
        descripcion: "Aprende a diseñar interfaces intuitivas y atractivas.",
        duracion: "150",
        video: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
        temario: "https://miweb.com/temarios/figma.pdf"
    }
];

const insertCursos = async () => {
    try {
        await sequelize.sync();
        await Curso.bulkCreate(cursos, { ignoreDuplicates: true });
        console.log("Cursos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los cursos:", error);
    }
};


export { insertCursos };
export default insertCursos;
