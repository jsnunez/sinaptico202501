import sequelize from '../config/database.js';
import Convocatoria from '../models/convocatoria.js';

async function actualizarFechas() {
  try {
    console.log('🔄 Actualizando fechas de convocatoria...');
    
    await sequelize.authenticate();
    console.log('✅ Conexión establecida');
    
    const convocatoria = await Convocatoria.findOne({
      where: { numero: '2025-01' }
    });
    
    if (convocatoria) {
      await convocatoria.update({
        fechaApertura: new Date('2025-11-01T08:00:00'),
        fechaCierre: new Date('2025-12-31T17:00:00'),
        fechaResultados: new Date('2026-01-15T12:00:00'),
        fechaLimite: new Date('2025-12-31T17:00:00')
      });
      
      console.log('✅ Convocatoria actualizada:');
      console.log(`  - Título: ${convocatoria.titulo}`);
      console.log(`  - Apertura: ${convocatoria.fechaApertura}`);
      console.log(`  - Cierre: ${convocatoria.fechaCierre}`);
      console.log(`  - Estado: ${convocatoria.estado}`);
    } else {
      console.log('❌ No se encontró la convocatoria 2025-01');
    }
    
    console.log('🎉 Actualización completada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

actualizarFechas();