import db from './app/config/database.js';
import UbicacionEntidad from './app/models/ubicacionEntidad.js';

async function monitorUbicaciones() {
  try {
    await db.authenticate();
    console.log('✅ Conectado - Monitoreando ubicaciones...');
    
    // Mostrar ubicaciones existentes sin asociaciones
    const ubicaciones = await UbicacionEntidad.findAll({
      order: [['id', 'DESC']]
    });
    
    console.log(`📍 Total de ubicaciones: ${ubicaciones.length}`);
    ubicaciones.forEach(ub => {
      console.log(`  - ID: ${ub.id}, EntidadID: ${ub.entidadId}, Coords: ${ub.latitud}, ${ub.longitud}, Dirección: ${ub.direccionCompleta}`);
    });
    
    console.log('\n🔄 Ejecute este script de nuevo después de crear una entidad para ver los cambios...');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

monitorUbicaciones();
