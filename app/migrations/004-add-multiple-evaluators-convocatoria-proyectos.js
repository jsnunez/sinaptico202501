import { DataTypes } from 'sequelize';

export const up = async (queryInterface, Sequelize) => {
    try {
        console.log('Agregando campos para múltiples evaluadores...');
        
        // Agregar campo para múltiples evaluadores
        await queryInterface.addColumn('convocatoria_proyectos', 'evaluadoresAsignados', {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
            comment: 'Array de emails de evaluadores asignados'
        });

        // Agregar campo para fecha de asignación de evaluadores
        await queryInterface.addColumn('convocatoria_proyectos', 'fechaAsignacionEvaluador', {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Fecha de asignación del evaluador principal'
        });

        // Agregar campo para tracking de evaluaciones individuales
        await queryInterface.addColumn('convocatoria_proyectos', 'evaluacionesIndividuales', {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
            comment: 'Array de evaluaciones individuales de cada evaluador'
        });

        console.log('✅ Campos para múltiples evaluadores agregados exitosamente');
    } catch (error) {
        console.error('Error en migración:', error);
        throw error;
    }
};

export const down = async (queryInterface, Sequelize) => {
    try {
        console.log('Revirtiendo campos de múltiples evaluadores...');
        
        await queryInterface.removeColumn('convocatoria_proyectos', 'evaluadoresAsignados');
        await queryInterface.removeColumn('convocatoria_proyectos', 'fechaAsignacionEvaluador');
        await queryInterface.removeColumn('convocatoria_proyectos', 'evaluacionesIndividuales');

        console.log('✅ Campos de múltiples evaluadores revertidos exitosamente');
    } catch (error) {
        console.error('Error revirtiendo migración:', error);
        throw error;
    }
};