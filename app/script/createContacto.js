import sequelize from '../config/database.js';
import Contacto from '../models/contacto.js';

const now = new Date();

const contactos = [
    {
        id: 1,
        telefono: '3001112233',
        email: 'contacto@soluciones.com',
        nombre: 'Carlos Ramírez',
        cargoId: 1,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 2,
        telefono: '3102223344',
        email: 'info@agrofuturo.com',
        nombre: 'María Gómez',
        cargoId: 2,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 3,
        telefono: '3203334455',
        email: 'contacto@construyeya.com',
        nombre: 'Pedro Torres',
        cargoId: 3,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 4,
        telefono: '3014445566',
        email: 'info@educavanza.com',
        nombre: 'Ana Martínez',
        cargoId: 4,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 5,
        telefono: '3155556677',
        email: 'contacto@saludtotal.com',
        nombre: 'Luis Herrera',
        cargoId: 5,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 6,
        telefono: '3166667788',
        email: 'info@ecologistica.com',
        nombre: 'Elena Ruiz',
        cargoId: 6,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 7,
        telefono: '3177778899',
        email: 'contacto@finanzasplus.com',
        nombre: 'Jorge Díaz',
        cargoId: 7,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 8,
        telefono: '3188889900',
        email: 'info@turismoandes.com',
        nombre: 'Sofía Castro',
        cargoId: 8,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 9,
        telefono: '3199990011',
        email: 'contacto@enercol.com',
        nombre: 'Andrés López',
        cargoId: 9,
        createdAt: now,
        updatedAt: now
    },
    {
        id: 10,
        telefono: '3200001122',
        email: 'info@comercializadoraglobal.com',
        nombre: 'Laura Fernández',
        cargoId: 10,
        createdAt: now,
        updatedAt: now
    }
];

const insertContactos = async () => {
    try {
        await sequelize.sync();
        await Contacto.bulkCreate(contactos, { ignoreDuplicates: true });
        console.log("Contactos creados exitosamente");
    } catch (error) {
        console.error("Error al crear los contactos:", error);
    }
};


export { insertContactos };
export default insertContactos;