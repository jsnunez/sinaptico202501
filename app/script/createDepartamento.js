
import sequelize from '../config/database.js';
import Departamento from '../models/departamento.js';

const departamentos = [
  { id: 3, nombre: "Arauca" },
  { id: 4, nombre: "Atlántico" },
  { id: 5, nombre: "Bogotá" },
  { id: 15, nombre: "Cundinamarca" },
  { id: 6, nombre: "Bolívar" },
  { id: 7, nombre: "Boyacá" },
  { id: 8, nombre: "Caldas" },
  { id: 9, nombre: "Caquetá" },
  { id: 10, nombre: "Casanare" },
  { id: 11, nombre: "Cauca" },
  { id: 12, nombre: "Cesar" },
  { id: 13, nombre: "Chocó" },
  { id: 14, nombre: "Córdoba" },
  { id: 16, nombre: "Guainía" },
  { id: 17, nombre: "Guaviare" },
  { id: 18, nombre: "Huila" },
  { id: 19, nombre: "La Guajira" },
  { id: 20, nombre: "Magdalena" },
  { id: 1, nombre: "Amazonas" },
  { id: 2, nombre: "Antioquia" },
  { id: 21, nombre: "Meta" },
  { id: 22, nombre: "Nariño" },
  { id: 25, nombre: "Quindío" },
  { id: 23, nombre: "Norte de Santander" },
  { id: 24, nombre: "Putumayo" },
  { id: 26, nombre: "Risaralda" },
  { id: 27, nombre: "San Andrés y Providencia" },
  { id: 28, nombre: "Santander" },
  { id: 29, nombre: "Sucre" },
  { id: 30, nombre: "Tolima" },
  { id: 31, nombre: "Valle del Cauca" },
  { id: 32, nombre: "Vaupés" },
  { id: 33, nombre: "Vichada" }
];

const insertDepartamentos = async () => {
    try {
        await sequelize.sync();
        await Departamento.bulkCreate(departamentos, { ignoreDuplicates: true });
        console.log("Departamentos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los departamentos:", error);
    }
};



export { insertDepartamentos };
export default insertDepartamentos;