import sequelize from '../config/database.js';
import Clasificado from '../models/clasificado.js';

const ciudades = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
    "Bucaramanga", "Pereira", "Manizales", "Cúcuta", "Santa Marta",
    "Ibagué", "Villavicencio", "Pasto", "Neiva", "Montería",
    "Armenia", "Sincelejo", "Popayán", "Tunja", "Riohacha"
];

const categorias = [
    "Diseño Gráfico", "Desarrollo Web", "Redacción", "Marketing Digital",
    "Fotografía", "Traducción", "Programación", "Consultoría", "Animación", "Soporte Técnico"
];

const types = ["offer", "request"];

const clasificados = Array.from({ length: 50 }, (_, i) => {
    const randomType = types[Math.floor(Math.random() * types.length)];
    return {
        title: `Servicio profesional #${i + 1}`,
        description: `Ofrezco un excelente servicio de ${categorias[i % categorias.length].toLowerCase()} adaptado a tus necesidades.`,
        price: (Math.random() * 500 + 50).toFixed(2),
        category: categorias[i % categorias.length],
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // entre 3.5 y 5.0
        reviews: Math.floor(Math.random() * 100),
        deliveryTime: `${Math.floor(Math.random() * 7 + 1)} días`,
        location: ciudades[Math.floor(Math.random() * ciudades.length)],
        providerId: (i % 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        pinned: Math.random() < 0.2,
        isNew: Math.random() < 0.3,
        featured: Math.random() < 0.2,
        type: randomType
    };
});

const insertClasificados = async () => {
    try {
        await sequelize.sync();
        await Clasificado.bulkCreate(clasificados, { ignoreDuplicates: true });
        console.log("20 clasificados creados exitosamente");
    } catch (error) {
        console.error("Error al crear los clasificados:", error);
    }
};

insertClasificados();

export { insertClasificados };
export default insertClasificados;