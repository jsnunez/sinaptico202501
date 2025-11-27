import { DataTypes } from 'sequelize';

export const up = async ({ context: sequelize }) => {
    // Crear tabla asignacion_evaluadores
    await sequelize.getQueryInterface().createTable('asignacion_evaluadores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        convocatoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'convocatorias',
                key: 'id'
            },
            onDelete: 'CASCADE',
            field: 'convocatoriaId'
        },
        proyectoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'proyectos',
                key: 'id'
            },
            onDelete: 'CASCADE',
            field: 'proyectoId'
        },
        evaluadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'miembros_comite',
                key: 'id'
            },
            onDelete: 'CASCADE',
            field: 'evaluadorId'
        },
        estado: {
            type: DataTypes.ENUM('Asignado', 'En_Progreso', 'Completada', 'Rechazada'),
            allowNull: false,
            defaultValue: 'Asignado'
        },
        fechaAsignacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'fechaAsignacion'
        },
        fechaInicioEvaluacion: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'fechaInicioEvaluacion'
        },
        fechaCompletada: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'fechaCompletada'
        },
        
        // 5 Criterios de evaluación
        criterio1_viabilidad_tecnica: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'criterio1_viabilidad_tecnica'
        },
        criterio2_impacto_social: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'criterio2_impacto_social'
        },
        criterio3_sostenibilidad_financiera: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'criterio3_sostenibilidad_financiera'
        },
        criterio4_innovacion: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'criterio4_innovacion'
        },
        criterio5_capacidad_ejecucion: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'criterio5_capacidad_ejecucion'
        },
        
        // Puntuaciones calculadas
        puntuacionTotal: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: true,
            field: 'puntuacionTotal'
        },
        puntuacionPromedio: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: 'puntuacionPromedio'
        },
        
        // Observaciones por criterio
        observaciones_criterio1: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observaciones_criterio1'
        },
        observaciones_criterio2: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observaciones_criterio2'
        },
        observaciones_criterio3: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observaciones_criterio3'
        },
        observaciones_criterio4: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observaciones_criterio4'
        },
        observaciones_criterio5: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observaciones_criterio5'
        },
        
        // Campos adicionales
        observacionesGenerales: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'observacionesGenerales'
        },
        recomendacion: {
            type: DataTypes.ENUM('Aprobado', 'Aprobado_Con_Condiciones', 'Rechazado', 'Requiere_Revision'),
            allowNull: true
        },
        prioridad: {
            type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
            allowNull: true
        },
        tiempoEvaluacion: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'tiempoEvaluacion'
        },
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        archivosAdjuntos: {
            type: DataTypes.JSON,
            allowNull: true,
            field: 'archivosAdjuntos'
        },
        
        // Timestamps
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updatedAt'
        }
    });

    // Crear índices
    const queryInterface = sequelize.getQueryInterface();
    
    // Índice único para evitar asignaciones duplicadas
    await queryInterface.addIndex('asignacion_evaluadores', {
        fields: ['convocatoriaId', 'proyectoId', 'evaluadorId'],
        unique: true,
        name: 'unique_asignacion_evaluador'
    });

    // Índices para consultas frecuentes
    await queryInterface.addIndex('asignacion_evaluadores', ['convocatoriaId']);
    await queryInterface.addIndex('asignacion_evaluadores', ['proyectoId']);
    await queryInterface.addIndex('asignacion_evaluadores', ['evaluadorId']);
    await queryInterface.addIndex('asignacion_evaluadores', ['estado']);
    await queryInterface.addIndex('asignacion_evaluadores', ['fechaAsignacion']);
    await queryInterface.addIndex('asignacion_evaluadores', ['recomendacion']);
    await queryInterface.addIndex('asignacion_evaluadores', ['prioridad']);

    console.log('✅ Tabla asignacion_evaluadores creada exitosamente');
};

export const down = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('asignacion_evaluadores');
    console.log('❌ Tabla asignacion_evaluadores eliminada');
};