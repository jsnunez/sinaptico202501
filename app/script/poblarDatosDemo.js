import MiembroComite from '../models/miembroComite.js';
import Convocatoria from '../models/convocatoria.js';

// Datos de miembros del comité para Santander
const miembrosData = [
  {
    nombre: "Dr. María Elena González",
    cargo: "Directora del Comité",
    institucion: "CRCI Santander",
    email: "maria.gonzalez@crci.santander.gov.co",
    telefono: "+57 7 634 8500",
    especialidades: ["Innovación Tecnológica", "Gestión de I+D+i", "Evaluación de Proyectos"],
    estado: "activo",
    proyectosEvaluados: 15,
    fechaIngreso: "2020-01-15",
    experiencia: "15 años en investigación e innovación",
    formacion: "PhD en Ingeniería Industrial"
  },
  {
    nombre: "Dr. Carlos Andrés Mendoza",
    cargo: "Coordinador Técnico",
    institucion: "Universidad Industrial de Santander",
    email: "carlos.mendoza@uis.edu.co",
    telefono: "+57 7 634 4000",
    especialidades: ["Desarrollo de Software", "Inteligencia Artificial", "Big Data"],
    estado: "activo",
    proyectosEvaluados: 12,
    fechaIngreso: "2020-03-10",
    experiencia: "12 años en desarrollo tecnológico",
    formacion: "PhD en Ciencias de la Computación"
  },
  {
    nombre: "Dra. Ana Sofía Rodríguez",
    cargo: "Especialista en Salud Digital",
    institucion: "Hospital Universitario de Santander",
    email: "ana.rodriguez@hus.gov.co",
    telefono: "+57 7 634 6000",
    especialidades: ["Telemedicina", "Sistemas de Salud", "Innovación Médica"],
    estado: "activo",
    proyectosEvaluados: 8,
    fechaIngreso: "2021-05-20",
    experiencia: "10 años en sistemas de salud",
    formacion: "Médica Especialista en Informática Médica"
  },
  {
    nombre: "Ing. Roberto Silva",
    cargo: "Evaluador Senior",
    institucion: "SENA Regional Santander",
    email: "roberto.silva@sena.edu.co",
    telefono: "+57 7 635 2400",
    especialidades: ["Automatización Industrial", "IoT", "Manufactura 4.0"],
    estado: "activo",
    proyectosEvaluados: 10,
    fechaIngreso: "2020-08-12",
    experiencia: "18 años en automatización",
    formacion: "Ingeniero Mecatrónico, MSc en Automatización"
  },
  {
    nombre: "Dra. Laura Patricia Pérez",
    cargo: "Especialista en Sostenibilidad",
    institucion: "CDMB - Corporación para la Defensa de la Meseta de Bucaramanga",
    email: "laura.perez@cdmb.gov.co",
    telefono: "+57 7 634 1000",
    especialidades: ["Tecnologías Verdes", "Sostenibilidad", "Energías Renovables"],
    estado: "activo",
    proyectosEvaluados: 7,
    fechaIngreso: "2021-02-28",
    experiencia: "8 años en sostenibilidad",
    formacion: "Ingeniera Ambiental, PhD en Sostenibilidad"
  },
  {
    nombre: "Ing. Ana Lucía Gómez",
    cargo: "Coordinadora de Proyectos",
    institucion: "Cámara de Comercio de Bucaramanga",
    email: "ana.gomez@camarabga.org.co",
    telefono: "+57 7 632 5555",
    especialidades: ["Gestión de Proyectos", "Emprendimiento", "Fintech"],
    estado: "activo",
    proyectosEvaluados: 11,
    fechaIngreso: "2020-11-05",
    experiencia: "12 años en gestión empresarial",
    formacion: "Ingeniera Industrial, MBA"
  },
  {
    nombre: "Dr. Miguel Ángel Torres",
    cargo: "Especialista en Agtech",
    institucion: "Agrosavia - Centro de Investigación Tibaitatá",
    email: "miguel.torres@agrosavia.co",
    telefono: "+57 7 636 2200",
    especialidades: ["Agricultura de Precisión", "Biotecnología", "Cadenas Productivas"],
    estado: "activo",
    proyectosEvaluados: 6,
    fechaIngreso: "2021-09-14",
    experiencia: "14 años en investigación agrícola",
    formacion: "Ingeniero Agrónomo, PhD en Biotecnología"
  },
  {
    nombre: "Dra. Claudia Esperanza Vargas",
    cargo: "Especialista en Educación Digital",
    institucion: "Secretaría de Educación de Santander",
    email: "claudia.vargas@sed.santander.gov.co",
    telefono: "+57 7 697 7777",
    especialidades: ["EdTech", "Plataformas Educativas", "Innovación Pedagógica"],
    estado: "inactivo",
    proyectosEvaluados: 4,
    fechaIngreso: "2021-12-01",
    experiencia: "9 años en tecnología educativa",
    formacion: "Licenciada en Educación, MSc en Tecnología Educativa"
  },
  {
    nombre: "Ing. Fernando Cuesta",
    cargo: "Especialista en Blockchain",
    institucion: "Universidad Pontificia Bolivariana - Sede Bucaramanga",
    email: "fernando.cuesta@upb.edu.co",
    telefono: "+57 7 679 7979",
    especialidades: ["Blockchain", "Criptomonedas", "Contratos Inteligentes"],
    estado: "activo",
    proyectosEvaluados: 5,
    fechaIngreso: "2022-01-18",
    experiencia: "6 años en tecnologías emergentes",
    formacion: "Ingeniero de Sistemas, MSc en Ciberseguridad"
  },
  {
    nombre: "Dra. Patricia Montoya",
    cargo: "Especialista en Turismo Digital",
    institucion: "Instituto de Cultura y Turismo de Santander",
    email: "patricia.montoya@culturasantander.gov.co",
    telefono: "+57 7 634 9000",
    especialidades: ["Turismo 4.0", "Realidad Virtual", "Marketing Digital"],
    estado: "activo",
    proyectosEvaluados: 3,
    fechaIngreso: "2022-03-25",
    experiencia: "7 años en turismo e innovación",
    formacion: "Administradora de Empresas Turísticas, MSc en Marketing Digital"
  },
  {
    nombre: "Dr. Jhon Alexander Díaz",
    cargo: "Especialista en Ciberseguridad",
    institucion: "Policía Metropolitana de Bucaramanga",
    email: "jhon.diaz@policia.gov.co",
    telefono: "+57 7 635 8800",
    especialidades: ["Ciberseguridad", "Análisis Forense Digital", "Seguridad de Redes"],
    estado: "inactivo",
    proyectosEvaluados: 2,
    fechaIngreso: "2022-06-10",
    experiencia: "11 años en seguridad digital",
    formacion: "Ingeniero de Sistemas, Especialista en Seguridad Informática"
  },
  {
    nombre: "Ing. Sandra Milena Castro",
    cargo: "Especialista en Logística 4.0",
    institucion: "TecnoParque SENA Bucaramanga",
    email: "sandra.castro@tecnoparque.sena.edu.co",
    telefono: "+57 7 634 1500",
    especialidades: ["Logística Inteligente", "Supply Chain 4.0", "Optimización de Rutas"],
    estado: "inactivo",
    proyectosEvaluados: 1,
    fechaIngreso: "2022-08-22",
    experiencia: "8 años en logística y optimización",
    formacion: "Ingeniera Industrial, MSc en Logística"
  }
];

// Ejemplo de convocatoria demo
const convocatoriaDemo = {
  titulo: "Convocatoria 2025-01 para Proyectos de Innovación Tecnológica en Santander",
  numero: "2025-01",
  descripcion: "La CRCI Santander invita a empresas, universidades, centros de investigación y emprendedores del departamento a presentar proyectos innovadores que contribuyan al desarrollo tecnológico y la competitividad regional. Esta convocatoria busca financiar iniciativas que generen impacto en sectores estratégicos como petroquímica, agroindustria, turismo, manufactura avanzada y tecnologías de la información, fortaleciendo el ecosistema de innovación santandereano.",
  presupuestoTotal: 2000000000,
  maxProyectos: 15,
  fechaApertura: new Date('2025-11-01T08:00:00'),
  fechaCierre: new Date('2025-12-31T17:00:00'),
  fechaResultados: new Date('2026-01-15T12:00:00'),
  areasTematicas: [
    "Inteligencia Artificial y Machine Learning",
    "Desarrollo de Software y Aplicaciones", 
    "Biotecnología y Salud Digital",
    "Turismo Digital y Ecoturismo",
    "Educación Virtual (EdTech)"
  ],
  presupuestoMinimo: 50000000,
  presupuestoMaximo: 200000000,
  duracionMinima: 6,
  duracionMaxima: 18,
  requisitos: "1. Ser empresa legalmente constituida en Colombia o persona natural mayor de edad\n2. Tener domicilio fiscal en el departamento de Santander\n3. No tener inhabilidades para contratar con el Estado\n4. Contar con equipo de trabajo calificado\n5. Presentar carta de compromiso de cofinanciación mínima del 20%\n6. No haber incurrido en incumplimiento en convocatorias anteriores",
  documentosRequeridos: [
    "Propuesta técnica detallada",
    "Presupuesto desglosado",
    "Cronograma de actividades",
    "Hoja de vida del equipo",
    "Certificados de existencia y representación legal",
    "Estados financieros (últimos 2 años)"
  ],
  palabrasClave: ["innovación", "tecnología", "digitalización", "santander", "competitividad", "energía", "petroquímica"],
  contacto: "CRCI Santander - Centro Regional de Competitividad e Innovación\nDirección: Carrera 19 # 33-85, Oficina 402, Bucaramanga, Santander\nTeléfono: +57 (7) 634-8500\nEmail: convocatorias@crci.santander.gov.co\nHorario de atención: Lunes a viernes de 8:00 AM a 5:00 PM",
  observaciones: "Los proyectos deben estar alineados con los Objetivos de Desarrollo Sostenible (ODS) y contribuir al Plan Regional de Competitividad de Santander 2024-2032. Se dará prioridad a proyectos que involucren alianzas público-privadas, que aprovechen las fortalezas del sector energético y petroquímico regional, y que generen empleo de calidad en Santander.",
  estado: "publicada",
  organizador: "CRCI Santander",
  habilitado: true,
  activo: true,
  tipoConvocatoriaId: 1,
  // Campos de compatibilidad
  nombre: "Convocatoria 2025-01 para Proyectos de Innovación Tecnológica en Santander",
  fechaLimite: new Date('2025-12-31T17:00:00')
};

// Función para poblar la base de datos
export const poblarDatosDemo = async () => {
  try {
    console.log('Iniciando población de datos demo...');

    // Poblar miembros del comité
    console.log('Creando miembros del comité...');
    for (const miembroData of miembrosData) {
      const miembroExistente = await MiembroComite.findOne({
        where: { email: miembroData.email }
      });

      if (!miembroExistente) {
        await MiembroComite.create(miembroData);
        console.log(`✓ Miembro creado: ${miembroData.nombre}`);
      } else {
        console.log(`⚠ Miembro ya existe: ${miembroData.nombre}`);
      }
    }

    // Poblar convocatoria demo
    console.log('Creando convocatoria demo...');
    const convocatoriaExistente = await Convocatoria.findOne({
      where: { numero: convocatoriaDemo.numero }
    });

    if (!convocatoriaExistente) {
      await Convocatoria.create(convocatoriaDemo);
      console.log(`✓ Convocatoria creada: ${convocatoriaDemo.titulo}`);
    } else {
      console.log(`⚠ Convocatoria ya existe: ${convocatoriaDemo.titulo}`);
    }

    console.log('✅ Datos demo poblados exitosamente');
  } catch (error) {
    console.error('❌ Error al poblar datos demo:', error);
    throw error;
  }
};

// Función para limpiar datos demo (útil para desarrollo)
export const limpiarDatosDemo = async () => {
  try {
    console.log('Limpiando datos demo...');

    // Limpiar miembros del comité
    const emailsDemo = miembrosData.map(m => m.email);
    await MiembroComite.destroy({
      where: { email: emailsDemo }
    });

    // Limpiar convocatoria demo
    await Convocatoria.destroy({
      where: { numero: convocatoriaDemo.numero }
    });

    console.log('✅ Datos demo limpiados exitosamente');
  } catch (error) {
    console.error('❌ Error al limpiar datos demo:', error);
    throw error;
  }
};

export default { poblarDatosDemo, limpiarDatosDemo };