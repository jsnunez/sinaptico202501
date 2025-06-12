import sequelize from '../config/database.js';
import Cargo from '../models/cargo.js';

const cargos = [
    { nombre: "Administrador" },
    { nombre: "Gerente" },
    { nombre: "Supervisor" },
    { nombre: "Operario" },
    { nombre: "Asistente" },
    { nombre: "Analista" },
    { nombre: "Técnico" },
    { nombre: "Coordinador" },
    { nombre: "Director" },
    { nombre: "Auxiliar" }
];

const insertCargos = async () => {
    try {
        await sequelize.sync();
        await Cargo.bulkCreate(cargos, { ignoreDuplicates: true });
        console.log("Cargos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los cargos:", error);
    }
};
export { insertCargos };
export default insertCargos;