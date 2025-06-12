import sequelize from '../config/database.js';


const Entidad = (await import('../models/entidad.js')).default;

const empresas = [
{
        claseEntidad: 'Empresa',
        razonSocial: 'Soluciones Innovadoras S.A.',
        habilitado: true,
        numIdentificacion: '900123456',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Tecnología',
        correo: 'contacto@soluciones.com',
        telefono: '3001234567',
        fechaConstitucion: new Date('2010-05-10'),
        ciudadId: 12, // Medellín
        direccion: 'Calle 10 #20-30',
        facebook: 'https://facebook.com/soluciones',
        instagram: 'https://instagram.com/soluciones',
        paginaweb: 'https://soluciones.com',
        contadorContacto: 0,
        logo: 'soluciones_logo.png',
        contactoId: 1,
        UserAdminId: 1,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'AgroFuturo Ltda.',
        habilitado: true,
        numIdentificacion: '900654321',
        tipoEntidad: 'Sociedad Limitada',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Agroindustria',
        correo: 'info@agrofuturo.com',
        telefono: '3109876543',
        fechaConstitucion: new Date('2015-08-20'),
        ciudadId: 167, // Bogotá
        direccion: 'Carrera 45 #100-50',
        facebook: 'https://facebook.com/agrofuturo',
        instagram: 'https://instagram.com/agrofuturo',
        paginaweb: 'https://agrofuturo.com',
        contadorContacto: 0,
        logo: 'agrofuturo_logo.png',
        contactoId: 2,
        UserAdminId: 2,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'ConstruyeYa S.A.S.',
        habilitado: true,
        numIdentificacion: '901234567',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Construcción',
        correo: 'contacto@construyeya.com',
        telefono: '3201234567',
        fechaConstitucion: new Date('2012-03-15'),
        ciudadId: 210, // Cartagena
        direccion: 'Avenida 5 #15-60',
        facebook: 'https://facebook.com/construyeya',
        instagram: 'https://instagram.com/construyeya',
        paginaweb: 'https://construyeya.com',
        contadorContacto: 0,
        logo: 'construyeya_logo.png',
        contactoId: 3,
        UserAdminId: 3,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'Educavanza S.A.',
        habilitado: true,
        numIdentificacion: '900876543',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Educación',
        correo: 'info@educavanza.com',
        telefono: '3012345678',
        fechaConstitucion: new Date('2018-09-01'),
        ciudadId: 337, // Manizales
        direccion: 'Calle 50 #30-20',
        facebook: 'https://facebook.com/educavanza',
        instagram: 'https://instagram.com/educavanza',
        paginaweb: 'https://educavanza.com',
        contadorContacto: 0,
        logo: 'educavanza_logo.png',
        contactoId: 4,
        UserAdminId: 4,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'SaludTotal S.A.',
        habilitado: true,
        numIdentificacion: '900345678',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Salud',
        correo: 'contacto@saludtotal.com',
        telefono: '3151234567',
        fechaConstitucion: new Date('2011-11-11'),
        ciudadId: 498, // Montería
        direccion: 'Carrera 7 #40-80',
        facebook: 'https://facebook.com/saludtotal',
        instagram: 'https://instagram.com/saludtotal',
        paginaweb: 'https://saludtotal.com',
        contadorContacto: 0,
        logo: 'saludtotal_logo.png',
        contactoId: 5,
        UserAdminId: 5,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'EcoLogística Ltda.',
        habilitado: true,
        numIdentificacion: '900567890',
        tipoEntidad: 'Sociedad Limitada',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Logística',
        correo: 'info@ecologistica.com',
        telefono: '3169876543',
        fechaConstitucion: new Date('2016-06-06'),
        ciudadId: 915, // Bucaramanga
        direccion: 'Avenida 80 #60-10',
        facebook: 'https://facebook.com/ecologistica',
        instagram: 'https://instagram.com/ecologistica',
        paginaweb: 'https://ecologistica.com',
        contadorContacto: 0,
        logo: 'ecologistica_logo.png',
        contactoId: 6,
        UserAdminId: 6,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'FinanzasPlus S.A.S.',
        habilitado: true,
        numIdentificacion: '901098765',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Finanzas',
        correo: 'contacto@finanzasplus.com',
        telefono: '3171234567',
        fechaConstitucion: new Date('2013-02-22'),
        ciudadId: 1100, // Palmira
        direccion: 'Calle 100 #25-15',
        facebook: 'https://facebook.com/finanzasplus',
        instagram: 'https://instagram.com/finanzasplus',
        paginaweb: 'https://finanzasplus.com',
        contadorContacto: 0,
        logo: 'finanzasplus_logo.png',
        contactoId: 7,
        UserAdminId: 7,
    },
    {
        claseEntidad: 'Empresa',
        razonSocial: 'TurismoAndes S.A.',
        habilitado: true,
        numIdentificacion: '900234567',
        tipoEntidad: 'Sociedad Anónima',
        naturalezaJuridica: 'Privada',
        actividadEconomica: 'Turismo',
        correo: 'info@turismoandes.com',
        telefono: '3181234567',
        fechaConstitucion: new Date('2017-07-17'),
        ciudadId: 709, // Santa Marta
        direccion: 'Carrera 12 #45-90',
        facebook: 'https://facebook.com/turismoandes',
        instagram: 'https://instagram.com/turismoandes',
        paginaweb: 'https://turismoandes.com',
        contadorContacto: 0,
        logo: 'turismoandes_logo.png',
        contactoId: 8,
        UserAdminId: 8,
    }
];

const insertEmpresas = async () => {
    try {
        // Asegúrate de que los contactos y usuarios admin existen antes de insertar empresas
  
        await sequelize.sync();
        await Entidad.bulkCreate(empresas, { ignoreDuplicates: true });
        console.log("Empresas creadas exitosamente");
    } catch (error) {
        console.error("Error al crear las empresas:", error);
    }
};


export { insertEmpresas };
export default insertEmpresas;