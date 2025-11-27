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
    logging: true // Habilitar logging para ver las consultas
  }
);

async function verificarYCorregirCampoJSON() {
  try {
    console.log('🔍 Verificando estructura del campo evaluadoresAsignados...');
    
    // Verificar estructura actual de la tabla
    const [describe] = await sequelize.query("DESCRIBE convocatoria_proyectos");
    console.log('\n📋 Estructura de convocatoria_proyectos:');
    describe.forEach(col => {
      if (col.Field === 'evaluadoresAsignados' || col.Field === 'evaluacionesIndividuales') {
        console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
      }
    });

    // Verificar si los campos JSON existen
    const evaluadoresField = describe.find(col => col.Field === 'evaluadoresAsignados');
    const evaluacionesField = describe.find(col => col.Field === 'evaluacionesIndividuales');

    if (!evaluadoresField) {
      console.log('\n➕ Agregando campo evaluadoresAsignados...');
      await sequelize.query(`
        ALTER TABLE convocatoria_proyectos 
        ADD COLUMN evaluadoresAsignados JSON NULL DEFAULT JSON_ARRAY()
        COMMENT 'Array de emails de evaluadores asignados'
      `);
      console.log('✅ Campo evaluadoresAsignados agregado');
    } else if (evaluadoresField.Type !== 'json') {
      console.log('\n🔄 Convirtiendo campo evaluadoresAsignados a JSON...');
      await sequelize.query(`
        ALTER TABLE convocatoria_proyectos 
        MODIFY COLUMN evaluadoresAsignados JSON NULL DEFAULT JSON_ARRAY()
        COMMENT 'Array de emails de evaluadores asignados'
      `);
      console.log('✅ Campo evaluadoresAsignados convertido a JSON');
    }

    if (!evaluacionesField) {
      console.log('\n➕ Agregando campo evaluacionesIndividuales...');
      await sequelize.query(`
        ALTER TABLE convocatoria_proyectos 
        ADD COLUMN evaluacionesIndividuales JSON NULL DEFAULT JSON_ARRAY()
        COMMENT 'Array de evaluaciones individuales de cada evaluador'
      `);
      console.log('✅ Campo evaluacionesIndividuales agregado');
    } else if (evaluacionesField.Type !== 'json') {
      console.log('\n🔄 Convirtiendo campo evaluacionesIndividuales a JSON...');
      await sequelize.query(`
        ALTER TABLE convocatoria_proyectos 
        MODIFY COLUMN evaluacionesIndividuales JSON NULL DEFAULT JSON_ARRAY()
        COMMENT 'Array de evaluaciones individuales de cada evaluador'
      `);
      console.log('✅ Campo evaluacionesIndividuales convertido a JSON');
    }

    // Verificar y corregir registros con valores nulos
    console.log('\n🔍 Verificando registros con valores NULL en campos JSON...');
    
    const [nullEvaluadores] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM convocatoria_proyectos 
      WHERE evaluadoresAsignados IS NULL
    `);
    
    if (nullEvaluadores[0].count > 0) {
      console.log(`📊 Encontrados ${nullEvaluadores[0].count} registros con evaluadoresAsignados NULL`);
      console.log('🔄 Corrigiendo valores NULL en evaluadoresAsignados...');
      await sequelize.query(`
        UPDATE convocatoria_proyectos 
        SET evaluadoresAsignados = JSON_ARRAY() 
        WHERE evaluadoresAsignados IS NULL
      `);
      console.log('✅ Valores NULL corregidos en evaluadoresAsignados');
    } else {
      console.log('✅ No hay valores NULL en evaluadoresAsignados');
    }

    const [nullEvaluaciones] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM convocatoria_proyectos 
      WHERE evaluacionesIndividuales IS NULL
    `);
    
    if (nullEvaluaciones[0].count > 0) {
      console.log(`📊 Encontrados ${nullEvaluaciones[0].count} registros con evaluacionesIndividuales NULL`);
      console.log('🔄 Corrigiendo valores NULL en evaluacionesIndividuales...');
      await sequelize.query(`
        UPDATE convocatoria_proyectos 
        SET evaluacionesIndividuales = JSON_ARRAY() 
        WHERE evaluacionesIndividuales IS NULL
      `);
      console.log('✅ Valores NULL corregidos en evaluacionesIndividuales');
    } else {
      console.log('✅ No hay valores NULL en evaluacionesIndividuales');
    }

    // Probar inserción de datos JSON
    console.log('\n🧪 Probando inserción de datos JSON...');
    
    // Buscar un registro de prueba
    const [proyectos] = await sequelize.query(`
      SELECT id, evaluadoresAsignados 
      FROM convocatoria_proyectos 
      LIMIT 1
    `);

    if (proyectos.length > 0) {
      const proyecto = proyectos[0];
      const testEmail = 'test.evaluador@prueba.com';
      
      console.log(`📝 Actualizando proyecto ID ${proyecto.id} con datos de prueba...`);
      
      // Obtener array actual y agregar email de prueba
      let evaluadoresActuales = [];
      if (proyecto.evaluadoresAsignados) {
        try {
          evaluadoresActuales = JSON.parse(proyecto.evaluadoresAsignados);
        } catch (e) {
          console.log('⚠️  Error parseando JSON existente, inicializando array vacío');
          evaluadoresActuales = [];
        }
      }
      
      // Agregar email de prueba si no existe
      if (!evaluadoresActuales.includes(testEmail)) {
        evaluadoresActuales.push(testEmail);
      }

      await sequelize.query(`
        UPDATE convocatoria_proyectos 
        SET evaluadoresAsignados = JSON_ARRAY_APPEND(
          COALESCE(evaluadoresAsignados, JSON_ARRAY()), 
          '$', 
          ?
        )
        WHERE id = ?
      `, {
        replacements: [testEmail, proyecto.id]
      });

      console.log('✅ Datos de prueba insertados correctamente');

      // Verificar inserción
      const [verificacion] = await sequelize.query(`
        SELECT evaluadoresAsignados 
        FROM convocatoria_proyectos 
        WHERE id = ?
      `, {
        replacements: [proyecto.id]
      });

      console.log('📊 Verificación de datos insertados:', verificacion[0]);

      // Limpiar datos de prueba
      await sequelize.query(`
        UPDATE convocatoria_proyectos 
        SET evaluadoresAsignados = JSON_REMOVE(
          evaluadoresAsignados, 
          JSON_UNQUOTE(JSON_SEARCH(evaluadoresAsignados, 'one', ?))
        )
        WHERE id = ?
      `, {
        replacements: [testEmail, proyecto.id]
      });

      console.log('🧹 Datos de prueba eliminados');
    } else {
      console.log('ℹ️  No hay proyectos en la tabla para probar');
    }

    console.log('\n✅ Verificación y corrección completada exitosamente!');

    // Mostrar estructura final
    console.log('\n📋 Estructura final de campos JSON:');
    const [finalDescribe] = await sequelize.query("DESCRIBE convocatoria_proyectos");
    finalDescribe.filter(col => 
      col.Field === 'evaluadoresAsignados' || col.Field === 'evaluacionesIndividuales'
    ).forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
    });

  } catch (error) {
    console.error('❌ Error durante la verificación:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

verificarYCorregirCampoJSON();