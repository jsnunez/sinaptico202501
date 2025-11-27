import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Configuración de la base de datos usando las mismas variables que la app
const sequelize = new Sequelize(
  process.env.DB_NAME || 'crci_2024',
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || '123',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

async function verificarEstructuraTablas() {
  try {
    console.log('🔍 Verificando estructura de tablas...');
    
    // Verificar miembros_comite
    console.log('\n📋 Estructura de miembros_comite:');
    const [miembrosComite] = await sequelize.query("DESCRIBE miembros_comite");
    miembrosComite.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Verificar proyectos
    console.log('\n📋 Estructura de proyectos:');
    const [proyectos] = await sequelize.query("DESCRIBE proyectos");
    proyectos.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Verificar Invitacions
    console.log('\n📋 Estructura de Invitacions:');
    const [invitacions] = await sequelize.query("DESCRIBE Invitacions");
    invitacions.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key ? `(${col.Key})` : ''}`);
    });

    // Verificar datos en Invitacions que causan problemas
    console.log('\n🔍 Verificando datos problemáticos en Invitacions:');
    const [problematicos] = await sequelize.query(`
      SELECT desdeuserid, COUNT(*) as count 
      FROM Invitacions 
      WHERE desdeuserid IS NOT NULL 
      GROUP BY desdeuserid
    `);
    
    if (problematicos.length > 0) {
      console.log('Datos problemáticos encontrados:');
      problematicos.forEach(row => {
        console.log(`  - desdeuserid: ${row.desdeuserid} (${row.count} registros)`);
      });

      // Verificar si estos IDs existen en users
      console.log('\n🔍 Verificando si los IDs existen en la tabla users:');
      const [users] = await sequelize.query("SELECT id FROM users");
      const userIds = users.map(u => u.id);
      
      problematicos.forEach(row => {
        const exists = userIds.includes(row.desdeuserid);
        console.log(`  - ID ${row.desdeuserid}: ${exists ? '✅ Existe' : '❌ NO existe'} en users`);
      });
    } else {
      console.log('✅ No hay datos problemáticos en Invitacions');
    }

    console.log('\n✅ Verificación completada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

verificarEstructuraTablas();