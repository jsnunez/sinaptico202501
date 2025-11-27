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

async function crearUsuarioDefaultYArreglarProyectos() {
  try {
    console.log('🔧 Reparando proyectos huérfanos...');
    
    // 1. Verificar si existe usuario con id = 0
    const [usuario0] = await sequelize.query(`SELECT id FROM users WHERE id = 0`);
    
    if (usuario0.length === 0) {
      // Crear usuario con id = 0
      console.log('📝 Creando usuario por defecto con ID = 0...');
      
      // Obtener primera ciudad disponible
      const [ciudades] = await sequelize.query(`SELECT id FROM ciudades LIMIT 1`);
      const ciudadId = ciudades.length > 0 ? ciudades[0].id : 1;
      
      await sequelize.query(`
        INSERT INTO users (id, email, password, name, telefono, rol, estado, fotoPerfil, ciudadId, createdAt, updatedAt)
        VALUES (0, 'admin@crci.default', 'default123', 'Usuario Por Defecto', '0000000000', 1, 1, 'sinfoto.jpg', ${ciudadId}, NOW(), NOW())
      `);
      console.log('✅ Usuario por defecto creado con ID = 0');
    } else {
      console.log('ℹ️  Usuario con ID = 0 ya existe');
    }

    // 2. Obtener un usuario válido para asignar como líder
    const [usuarioValido] = await sequelize.query(`SELECT id FROM users WHERE id > 0 LIMIT 1`);
    const liderValidoId = usuarioValido.length > 0 ? usuarioValido[0].id : 0;
    
    console.log(`📝 Usando usuario ID ${liderValidoId} como líder por defecto`);

    // 3. Actualizar proyectos huérfanos
    console.log('🔄 Actualizando proyectos con userId huérfano...');
    const [updateUserId] = await sequelize.query(`
      UPDATE proyectos 
      SET userId = 0 
      WHERE userId NOT IN (SELECT id FROM users)
    `);
    console.log(`✅ Actualizados ${updateUserId.affectedRows || 0} proyectos con userId`);

    console.log('🔄 Actualizando proyectos con userLiderId huérfano...');
    const [updateUserLiderId] = await sequelize.query(`
      UPDATE proyectos 
      SET userLiderId = ${liderValidoId}
      WHERE userLiderId NOT IN (SELECT id FROM users)
    `);
    console.log(`✅ Actualizados ${updateUserLiderId.affectedRows || 0} proyectos con userLiderId`);

    // 4. Ahora crear las foreign keys para proyectos
    console.log('\n🔧 Creando foreign keys para proyectos...');
    
    try {
      await sequelize.query(`
        ALTER TABLE proyectos 
        ADD CONSTRAINT fk_proyectos_userId 
        FOREIGN KEY (userId) REFERENCES users(id) 
        ON DELETE SET NULL ON UPDATE CASCADE
      `);
      console.log('✅ FK creada: proyectos.userId -> users.id');
    } catch (error) {
      if (error.original && error.original.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  FK proyectos.userId ya existe');
      } else {
        console.log(`❌ Error creando FK proyectos.userId: ${error.message}`);
      }
    }

    try {
      await sequelize.query(`
        ALTER TABLE proyectos 
        ADD CONSTRAINT fk_proyectos_userLiderId 
        FOREIGN KEY (userLiderId) REFERENCES users(id) 
        ON DELETE SET NULL ON UPDATE CASCADE
      `);
      console.log('✅ FK creada: proyectos.userLiderId -> users.id');
    } catch (error) {
      if (error.original && error.original.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  FK proyectos.userLiderId ya existe');
      } else {
        console.log(`❌ Error creando FK proyectos.userLiderId: ${error.message}`);
      }
    }

    // 5. Verificar estado final
    console.log('\n🔍 Verificación final...');
    
    const [proyectosHuerfanos] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM proyectos 
      WHERE userId NOT IN (SELECT id FROM users) 
         OR userLiderId NOT IN (SELECT id FROM users)
    `);
    
    console.log(`📊 Proyectos huérfanos restantes: ${proyectosHuerfanos[0].count}`);

    // Mostrar todas las foreign keys
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

    console.log('\nForeign Keys actuales:');
    foreignKeys.forEach(fk => {
      console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`);
    });

    console.log('\n✅ Reparación de proyectos completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error durante la reparación:', error.message);
    throw error;
  } finally {
    await sequelize.close();
  }
}

crearUsuarioDefaultYArreglarProyectos();