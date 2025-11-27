import sequelize from '../config/database.js';
import Convocatoria from '../models/convocatoria.js';

async function habilitarConvocatoria() {
  try {
    console.log('🔧 Habilitando convocatoria...');
    
    await sequelize.authenticate();
    
    await Convocatoria.update(
      { habilitado: true },
      { where: { numero: '2025-01' } }
    );
    
    const conv = await Convocatoria.findOne({ where: { numero: '2025-01' } });
    console.log(`✅ Convocatoria habilitada: ${conv.habilitado}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

habilitarConvocatoria();