import sequelize from '../config/database.js';
import Convocatoria from '../models/convocatoria.js';
import { poblarDatosDemo } from './poblarDatosDemo.js';

async function poblarDatos() {
  try {
    console.log('🚀 Iniciando población de datos...');
    
    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión establecida');
    
    // Poblar datos
    await poblarDatosDemo();
    
    // Verificar convocatorias creadas
    const convocatorias = await Convocatoria.findAll();
    console.log(`📊 Total convocatorias en DB: ${convocatorias.length}`);
    
    if (convocatorias.length > 0) {
      console.log('✅ Últimas convocatorias:');
      convocatorias.slice(-2).forEach(conv => {
        console.log(`  - ${conv.titulo} (${conv.estado})`);
      });
    }
    
    console.log('🎉 Datos poblados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

poblarDatos();