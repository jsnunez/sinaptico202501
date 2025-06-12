import sequelize from '../config/database.js';

const TipoConvocatorias = (await import('../models/tipoConvocatorias.js')).default;

const tipoConvocatorias = [
    { nombre: 'convocatoria' },
    { nombre: 'evento' }
];

const insertTipoConvocatorias = async () => {
    try {
        await sequelize.sync();
        await TipoConvocatorias.bulkCreate(tipoConvocatorias, { ignoreDuplicates: true });
        console.log("Tipos de convocatoria creados exitosamente");
    } catch (error) {
        console.error("Error al crear los tipos de convocatoria:", error);
    }
};

const Convocatoria = (await import('../models/convocatoria.js')).default;

const convocatorias = [
    {
        nombre: 'Convocatoria Innovación 2024',
        descripcion: 'Convocatoria para proyectos innovadores en tecnología.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fechaInicio: new Date('2024-07-01'),
        fechaFin: new Date('2024-08-01'),
        tipoConvocatoriaId: 1,
        habilitado: true
    },
    {
        nombre: 'Convocatoria Sostenibilidad',
        descripcion: 'Convocatoria para iniciativas de sostenibilidad ambiental.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fechaInicio: new Date('2024-09-01'),
        fechaFin: new Date('2024-10-01'),
        tipoConvocatoriaId: 1,
        habilitado: true
    },
    {
        nombre: 'Evento Lanzamiento Innovación',
        descripcion: 'Lanzamiento oficial de la convocatoria de innovación.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fecha: new Date('2024-07-05'),
        lugar: 'Auditorio Principal',
        tipoConvocatoriaId: 2,
        habilitado: true
    },
    {
        nombre: 'Evento Cierre Sostenibilidad',
        descripcion: 'Cierre y premiación de la convocatoria de sostenibilidad.',
        financiamiento: null,
        organizador: null,
        urlConvocatoria: null,
        fechaLimite: null,
        fecha: new Date('2024-10-02'),
        lugar: 'Centro de Convenciones',
        tipoConvocatoriaId: 2,
        habilitado: true
    }
];


const insertConvocatorias = async () => {
    try {
        await sequelize.sync();
        await Convocatoria.bulkCreate(convocatorias, { ignoreDuplicates: true });
        console.log("Convocatorias creadas exitosamente");
    } catch (error) {
        console.error("Error al crear las convocatorias:", error);
    }
};
await insertTipoConvocatorias();

export { insertConvocatorias };
export default insertConvocatorias;