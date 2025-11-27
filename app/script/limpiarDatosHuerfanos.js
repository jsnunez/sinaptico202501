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

async function limpiarDatosHuerfanos() {
  try {
    console.log('🧹 Iniciando limpieza de datos huérfanos...');
    
    // 1. Limpiar registros huérfanos en Invitacions
    console.log('\n🔍 Limpiando registros huérfanos en Invitacions...');
    
    // Encontrar registros con desdeuserid que no existe en users
    const [huerfanosDesdeuserid] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM Invitacions 
      WHERE desdeuserid NOT IN (SELECT id FROM users)
    `);
    
    console.log(`📊 Registros huérfanos por desdeuserid: ${huerfanosDesdeuserid[0].count}`);
    
    if (huerfanosDesdeuserid[0].count > 0) {
      const [deletedDesdeuserid] = await sequelize.query(`
        DELETE FROM Invitacions 
        WHERE desdeuserid NOT IN (SELECT id FROM users)
      `);
      console.log(`✅ Eliminados ${deletedDesdeuserid.affectedRows} registros huérfanos por desdeuserid`);
    }

    // Encontrar registros con parauserid que no existe en users
    const [huerfanosParauserid] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM Invitacions 
      WHERE parauserid NOT IN (SELECT id FROM users)
    `);
    
    console.log(`📊 Registros huérfanos por parauserid: ${huerfanosParauserid[0].count}`);
    
    if (huerfanosParauserid[0].count > 0) {
      const [deletedParauserid] = await sequelize.query(`
        DELETE FROM Invitacions 
        WHERE parauserid NOT IN (SELECT id FROM users)
      `);
      console.log(`✅ Eliminados ${deletedParauserid.affectedRows} registros huérfanos por parauserid`);
    }

    // 2. Verificar si hay problemas con proyectos
    console.log('\n🔍 Verificando datos en proyectos...');
    
    // Verificar userId en proyectos
    const [proyectosHuerfanosUserId] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM proyectos 
      WHERE userId NOT IN (SELECT id FROM users)
    `);
    
    console.log(`📊 Proyectos huérfanos por userId: ${proyectosHuerfanosUserId[0].count}`);
    
    if (proyectosHuerfanosUserId[0].count > 0) {
      console.log('⚠️  Se encontraron proyectos con userId inexistente');
      // Mostrar cuáles son
      const [proyectosProblematicos] = await sequelize.query(`
        SELECT id, userId, nombrePPI 
        FROM proyectos 
        WHERE userId NOT IN (SELECT id FROM users)
        LIMIT 10
      `);
      
      console.log('Proyectos problemáticos:');
      proyectosProblematicos.forEach(p => {
        console.log(`  - ID: ${p.id}, userId: ${p.userId}, nombre: ${p.nombrePPI}`);
      });
      
      // Opcional: podríamos asignar un usuario por defecto o eliminarlos
      console.log('⚠️  Estos proyectos necesitan atención manual');
    }

    // Verificar userLiderId en proyectos
    const [proyectosHuerfanosUserLiderId] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM proyectos 
      WHERE userLiderId NOT IN (SELECT id FROM users)
    `);
    
    console.log(`📊 Proyectos huérfanos por userLiderId: ${proyectosHuerfanosUserLiderId[0].count}`);
    
    if (proyectosHuerfanosUserLiderId[0].count > 0) {
      console.log('⚠️  Se encontraron proyectos con userLiderId inexistente');
    }

    // 3. Ahora intentar crear las foreign keys
    console.log('\n🔧 Creando foreign keys después de la limpieza...');
    
    try {
      // FK para Invitacions.desdeuserid
      await sequelize.query(`
        ALTER TABLE Invitacions 
        ADD CONSTRAINT fk_invitacions_desdeuserid 
        FOREIGN KEY (desdeuserid) REFERENCES users(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
      `);
      console.log('✅ FK creada: Invitacions.desdeuserid -> users.id');
    } catch (error) {
      if (error.original && error.original.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  FK Invitacions.desdeuserid ya existe');
      } else {
        console.log(`❌ Error creando FK Invitacions.desdeuserid: ${error.message}`);
      }
    }

    try {
      // FK para Invitacions.parauserid
      await sequelize.query(`
        ALTER TABLE Invitacions 
        ADD CONSTRAINT fk_invitacions_parauserid 
        FOREIGN KEY (parauserid) REFERENCES users(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
      `);
      console.log('✅ FK creada: Invitacions.parauserid -> users.id');
    } catch (error) {
      if (error.original && error.original.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  FK Invitacions.parauserid ya existe');
      } else {
        console.log(`❌ Error creando FK Invitacions.parauserid: ${error.message}`);
      }
    }

    // 4. Verificar foreign keys finales
    console.log('\n🔍 Verificando foreign keys creadas...');
    const [foreignKeys] = await sequelize.query(`
      SELECT 
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME,
        CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE REFERENCED_TABLE_NAME IS NOT NULL 
      AND TABLE_SCHEMA = DATABASE()
      ORDER BY TABLE_NAME, COLUMN_NAME
    `);

    console.log('Foreign Keys existentes:');
    foreignKeys.forEach(fk => {
      console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`);
    });

    console.log('\n✅ Limpieza y reparación completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error.message);
    throw error;
  } finally {
    await sequelize.close();
  }
}

limpiarDatosHuerfanos();