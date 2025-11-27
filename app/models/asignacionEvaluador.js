import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Proyectos from './proyectos.js';
import MiembroComite from './miembroComite.js';
const AsignacionEvaluador = sequelize.define('AsignacionEvaluador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    convocatoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'convocatorias',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proyectos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    evaluadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MiembroComite,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    estado: {
        type: DataTypes.ENUM('Asignado', 'En_Progreso', 'Completada', 'Rechazada'),
        defaultValue: 'Asignado',
        allowNull: false
    },
    fechaAsignacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fechaInicioEvaluacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fechaCompletada: {
        type: DataTypes.DATE,
        allowNull: true
    },
    
    // 5 Criterios de evaluación específicos
    criterio1_viabilidad_tecnica: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Viabilidad técnica y metodología (0-100 puntos)'
    },
    criterio2_impacto_social: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Impacto social y beneficiarios (0-100 puntos)'
    },
    criterio3_sostenibilidad_financiera: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Sostenibilidad financiera y presupuesto (0-100 puntos)'
    },
    criterio4_innovacion: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Innovación y diferenciación (0-100 puntos)'
    },
    criterio5_capacidad_ejecucion: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Capacidad de ejecución del equipo (0-100 puntos)'
    },
    
    // Puntuación total calculada
    puntuacionTotal: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 500
        },
        comment: 'Suma total de los 5 criterios (0-500 puntos)'
    },
    
    // Puntuación promedio (normalizada a 100)
    puntuacionPromedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        },
        comment: 'Promedio de los 5 criterios (0-100 puntos)'
    },
    
    // Observaciones detalladas por criterio
    observaciones_criterio1: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones sobre viabilidad técnica'
    },
    observaciones_criterio2: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones sobre impacto social'
    },
    observaciones_criterio3: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones sobre sostenibilidad financiera'
    },
    observaciones_criterio4: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones sobre innovación'
    },
    observaciones_criterio5: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones sobre capacidad de ejecución'
    },
    
    // Observaciones generales
    observacionesGenerales: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Observaciones generales del evaluador'
    },
    
    // Recomendación final
    recomendacion: {
        type: DataTypes.ENUM('Aprobado', 'Aprobado_Con_Condiciones', 'Rechazado', 'Requiere_Revision'),
        allowNull: true,
        comment: 'Recomendación final del evaluador'
    },
    
    // Prioridad asignada por el evaluador
    prioridad: {
        type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
        allowNull: true,
        comment: 'Prioridad asignada al proyecto'
    },
    
    // Tiempo estimado de evaluación (en horas)
    tiempoEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Tiempo en horas que tomó la evaluación'
    },
    
    // Metadatos de la evaluación
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Versión de la evaluación para control de cambios'
    },
    
    // Archivos adjuntos de la evaluación
    archivosAdjuntos: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        comment: 'Array de rutas de archivos adjuntos de la evaluación'
    }
    
}, {
    tableName: 'asignacion_evaluadores',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['convocatoriaId', 'proyectoId', 'evaluadorId'],
            name: 'unique_asignacion_evaluador'
        },
        {
            fields: ['convocatoriaId']
        },
        {
            fields: ['proyectoId']
        },
        {
            fields: ['evaluadorId']
        },
        {
            fields: ['estado']
        },
        {
            fields: ['fechaAsignacion']
        },
        {
            fields: ['recomendacion']
        },
        {
            fields: ['prioridad']
        }
    ],
    hooks: {
        // Hook para calcular puntuación total y promedio antes de guardar
        beforeSave: (instance) => {
            const criterios = [
                instance.criterio1_viabilidad_tecnica,
                instance.criterio2_impacto_social,
                instance.criterio3_sostenibilidad_financiera,
                instance.criterio4_innovacion,
                instance.criterio5_capacidad_ejecucion
            ];
            
            // Filtrar valores válidos (no nulos)
            const criteriosValidos = criterios.filter(c => c !== null && c !== undefined);
            
            if (criteriosValidos.length > 0) {
                // Calcular puntuación total
                instance.puntuacionTotal = criteriosValidos.reduce((sum, c) => sum + parseFloat(c), 0);
                
                // Calcular puntuación promedio (normalizada a 100)
                instance.puntuacionPromedio = instance.puntuacionTotal / criteriosValidos.length;
            }
            
            // Actualizar fechas según el estado
            if (instance.estado === 'En_Progreso' && !instance.fechaInicioEvaluacion) {
                instance.fechaInicioEvaluacion = new Date();
            }
            
            if (instance.estado === 'Completada' && !instance.fechaCompletada) {
                instance.fechaCompletada = new Date();
            }
        }
    }
});

export default AsignacionEvaluador;