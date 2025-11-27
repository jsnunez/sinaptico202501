import sequelize from '../config/database.js';
import { up } from '../migrations/004-add-multiple-evaluators-convocatoria-proyectos.js';

async function ejecutarMigracion() {
    try {
        console.log('🚀 Iniciando migración para múltiples evaluadores...');
        
        // Ejecutar la migración
        await up(sequelize.getQueryInterface(), sequelize.constructor);
        
        console.log('✅ Migración completada exitosamente');
        console.log('📝 Se agregaron los siguientes campos a convocatoria_proyectos:');
        console.log('   - evaluadoresAsignados (JSON)');
        console.log('   - fechaAsignacionEvaluador (DATE)');
        console.log('   - evaluacionesIndividuales (JSON)');
        
    } catch (error) {
        console.error('❌ Error ejecutando migración:', error);
    } finally {
        await sequelize.close();
    }
}

ejecutarMigracion();