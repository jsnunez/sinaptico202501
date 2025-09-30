import db from './app/config/database.js';
import UbicacionEntidad from './app/models/ubicacionEntidad.js';

async function checkTable() {
  try {
    await db.authenticate();
    console.log('✅ Conexión establecida');
    
    // Verificar si la tabla existe
    const tableExists = await db.getQueryInterface().showAllTables();
    console.log('📋 Tablas existentes:', tableExists.filter(table => table.toLowerCase().includes('ubicacion')));
    
    // Intentar sincronizar el modelo
    await UbicacionEntidad.sync();
    console.log('✅ Modelo UbicacionEntidad sincronizado');
    
    // Verificar la estructura de la tabla
    const tableDesc = await db.getQueryInterface().describeTable('UbicacionEntidad');
    console.log('🏗️ Estructura de la tabla UbicacionEntidad:', Object.keys(tableDesc));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkTable();
