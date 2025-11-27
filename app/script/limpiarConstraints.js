import sequelize from '../config/database.js';

export async function limpiarConstraints() {
  try {
    console.log('🧹 Eliminando TODAS las foreign key constraints...');
    
    // Obtener todas las foreign key constraints de la base de datos
    const getAllConstraintsQuery = `
      SELECT CONSTRAINT_NAME, TABLE_NAME 
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE TABLE_SCHEMA = '${process.env.DB_NAME}' 
        AND CONSTRAINT_NAME != 'PRIMARY'
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `;
    
    const [allConstraints] = await sequelize.query(getAllConstraintsQuery);
    
    console.log(`🔍 Encontradas ${allConstraints.length} foreign key constraints`);
    
    for (let constraint of allConstraints) {
      try {
        console.log(`🗑️ Eliminando constraint: ${constraint.CONSTRAINT_NAME} de tabla ${constraint.TABLE_NAME}`);
        await sequelize.query(`ALTER TABLE \`${constraint.TABLE_NAME}\` DROP FOREIGN KEY \`${constraint.CONSTRAINT_NAME}\``);
      } catch (dropError) {
        if (dropError.original?.code !== 'ER_CANT_DROP_FIELD_OR_KEY') {
          console.log(`ℹ️ No se pudo eliminar constraint ${constraint.CONSTRAINT_NAME}: ${dropError.message}`);
        }
      }
    }
    
    console.log('✅ Constraints eliminados correctamente');
    
  } catch (error) {
    console.error('❌ Error eliminando constraints:', error.message);
    // No hacer throw del error para que continue la ejecución
  }
}