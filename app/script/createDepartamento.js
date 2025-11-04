
import sequelize from '../config/database.js';
import Departamento from '../models/departamento.js';

const departamentos = [
   { "id": 1,  "nombre": "Amazonas", "latitud": -1.4429, "longitud": -71.5724 },
    { "id": 2,  "nombre": "Antioquia", "latitud": 6.2442, "longitud": -75.5812 },
    { "id": 3,  "nombre": "Arauca", "latitud": 6.5525, "longitud": -71.0022 },
    { "id": 4,  "nombre": "Atlántico", "latitud": 10.6966, "longitud": -74.8741 },
    { "id": 5,  "nombre": "Bogotá", "latitud": 4.7110, "longitud": -74.0721 },
    { "id": 6,  "nombre": "Bolívar", "latitud": 9.2419, "longitud": -74.7547 },
    { "id": 7,  "nombre": "Boyacá", "latitud": 5.4545, "longitud": -73.3620 },
    { "id": 8,  "nombre": "Caldas", "latitud": 5.2983, "longitud": -75.2479 },
    { "id": 9,  "nombre": "Caquetá", "latitud": 1.6136, "longitud": -75.6062 },
    { "id": 10, "nombre": "Casanare", "latitud": 5.7589, "longitud": -71.5724 },
    { "id": 11, "nombre": "Cauca", "latitud": 2.5701, "longitud": -76.5983 },
    { "id": 12, "nombre": "Cesar", "latitud": 9.3373, "longitud": -73.6536 },
    { "id": 13, "nombre": "Chocó", "latitud": 5.6947, "longitud": -76.6583 },
    { "id": 14, "nombre": "Córdoba", "latitud": 8.7500, "longitud": -75.8830 },
    { "id": 15, "nombre": "Cundinamarca", "latitud": 4.8110, "longitud": -74.3540 },
    { "id": 16, "nombre": "Guainía", "latitud": 2.6170, "longitud": -68.0000 },
    { "id": 17, "nombre": "Guaviare", "latitud": 2.5729, "longitud": -72.6450 },
    { "id": 18, "nombre": "Huila", "latitud": 2.9273, "longitud": -75.2819 },
    { "id": 19, "nombre": "La Guajira", "latitud": 11.3548, "longitud": -72.5205 },
    { "id": 20, "nombre": "Magdalena", "latitud": 10.4113, "longitud": -74.4057 },
    { "id": 21, "nombre": "Meta", "latitud": 4.0925, "longitud": -73.6302 },
    { "id": 22, "nombre": "Nariño", "latitud": 1.2892, "longitud": -77.3570 },
    { "id": 23, "nombre": "Norte de Santander", "latitud": 7.9463, "longitud": -72.8988 },
    { "id": 24, "nombre": "Putumayo", "latitud": 0.4416, "longitud": -76.6094 },
    { "id": 25, "nombre": "Quindío", "latitud": 4.5339, "longitud": -75.6811 },
    { "id": 26, "nombre": "Risaralda", "latitud": 4.8342, "longitud": -75.6720 },
    { "id": 27, "nombre": "San Andrés y Providencia", "latitud": 12.5847, "longitud": -81.7006 },
    { "id": 28, "nombre": "Santander", "latitud": 6.6437, "longitud": -73.6536 },
    { "id": 29, "nombre": "Sucre", "latitud": 9.3047, "longitud": -75.3976 },
    { "id": 30, "nombre": "Tolima", "latitud": 4.4389, "longitud": -75.2322 },
    { "id": 31, "nombre": "Valle del Cauca", "latitud": 3.5179, "longitud": -76.3168 },
    { "id": 32, "nombre": "Vaupés", "latitud": 0.6667, "longitud": -70.7500 },
    { "id": 33, "nombre": "Vichada", "latitud": 5.6667, "longitud": -69.3333 }
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