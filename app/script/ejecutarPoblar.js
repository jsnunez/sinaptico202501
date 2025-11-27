import { poblarDatosDemo } from './poblarDatosDemo.js';
import sequelize from '../config/database.js';

async function ejecutarScript() {
  try {
    console.log('🚀 Iniciando script de población de datos demo...');
    
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');
    
    // Poblar datos demo
    await poblarDatosDemo();
    
    console.log('🎉 Script ejecutado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar el script:', error);
    process.exit(1);
  }
}

ejecutarScript();