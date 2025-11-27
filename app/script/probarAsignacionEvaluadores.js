import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Configuración de la base de datos
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

async function probarAsignacionEvaluadores() {
  try {
    console.log('🧪 Probando asignación de evaluadores...');

    // 1. Verificar que hay proyectos y evaluadores disponibles
    const [proyectos] = await sequelize.query(`
      SELECT cp.id, cp.proyectoId, cp.convocatoriaId, cp.evaluadoresAsignados, p.nombrePPI
      FROM convocatoria_proyectos cp
      JOIN proyectos p ON cp.proyectoId = p.id
      LIMIT 3
    `);

    const [evaluadores] = await sequelize.query(`
      SELECT id, nombre, email, activo 
      FROM miembros_comite 
      WHERE activo = 1 
      LIMIT 3
    `);

    console.log(`📊 Proyectos disponibles: ${proyectos.length}`);
    console.log(`👥 Evaluadores disponibles: ${evaluadores.length}`);

    if (proyectos.length === 0 || evaluadores.length === 0) {
      console.log('⚠️  No hay suficientes datos para la prueba');
      return;
    }

    // 2. Simular asignación de evaluadores
    console.log('\n🎯 Simulando asignación de evaluadores...');
    
    const proyecto = proyectos[0];
    const evaluador1 = evaluadores[0];
    const evaluador2 = evaluadores[1] || evaluadores[0]; // En caso de que solo haya un evaluador

    console.log(`📝 Proyecto: ${proyecto.nombrePPI} (ID: ${proyecto.id})`);
    console.log(`👤 Evaluador 1: ${evaluador1.nombre} (${evaluador1.email})`);
    console.log(`👤 Evaluador 2: ${evaluador2.nombre} (${evaluador2.email})`);

    // 3. Preparar datos de asignación similar a lo que envía el frontend
    const asignaciones = [
      {
        proyectoId: proyecto.id,
        evaluadorId: evaluador1.id
      },
      {
        proyectoId: proyecto.id,
        evaluadorId: evaluador2.id
      }
    ];

    console.log('\n📤 Datos que se enviarían al endpoint:', JSON.stringify(asignaciones, null, 2));

    // 4. Simular la lógica del controlador
    console.log('\n🔄 Simulando lógica del controlador...');

    for (const asignacion of asignaciones) {
      console.log(`\n--- Procesando asignación para evaluador ID ${asignacion.evaluadorId} ---`);
      
      // Obtener datos actuales del proyecto
      const [proyectoActual] = await sequelize.query(`
        SELECT id, evaluadorAsignado, evaluadoresAsignados 
        FROM convocatoria_proyectos 
        WHERE id = ?
      `, { replacements: [asignacion.proyectoId] });

      if (proyectoActual.length === 0) continue;

      const proyecto = proyectoActual[0];
      const evaluador = evaluadores.find(e => e.id === asignacion.evaluadorId);

      console.log(`📋 Estado actual del proyecto:`, {
        evaluadorAsignado: proyecto.evaluadorAsignado,
        evaluadoresAsignados: proyecto.evaluadoresAsignados
      });

      // Obtener evaluadores asignados actual (similar al código del controlador)
      let evaluadoresAsignados = [];
      try {
        if (proyecto.evaluadoresAsignados) {
          evaluadoresAsignados = Array.isArray(proyecto.evaluadoresAsignados) 
            ? proyecto.evaluadoresAsignados 
            : JSON.parse(proyecto.evaluadoresAsignados);
        }
      } catch (error) {
        console.log('⚠️  Error parsing JSON, inicializando array vacío');
        evaluadoresAsignados = [];
      }

      console.log(`📝 Evaluadores actuales parseados:`, evaluadoresAsignados);

      // Verificar si ya está asignado
      if (evaluadoresAsignados.includes(evaluador.email)) {
        console.log(`ℹ️  Evaluador ${evaluador.email} ya está asignado`);
        continue;
      }

      // Agregar evaluador
      evaluadoresAsignados.push(evaluador.email);
      
      // Preparar datos para actualizar
      const updateData = {
        evaluadoresAsignados: JSON.stringify(evaluadoresAsignados), // Convertir a JSON string para MySQL
        fechaAsignacionEvaluador: new Date()
      };

      // Si no hay evaluador principal, asignar como principal
      if (!proyecto.evaluadorAsignado) {
        updateData.evaluadorAsignado = evaluador.email;
        updateData.estado = 'En Evaluacion';
      }

      console.log(`💾 Datos a actualizar:`, updateData);

      // Actualizar en base de datos
      await sequelize.query(`
        UPDATE convocatoria_proyectos 
        SET evaluadoresAsignados = ?, 
            fechaAsignacionEvaluador = ?,
            ${!proyecto.evaluadorAsignado ? 'evaluadorAsignado = ?, estado = ?' : ''}
        WHERE id = ?
      `, { 
        replacements: !proyecto.evaluadorAsignado 
          ? [JSON.stringify(evaluadoresAsignados), new Date(), evaluador.email, 'En Evaluacion', proyecto.id]
          : [JSON.stringify(evaluadoresAsignados), new Date(), proyecto.id]
      });

      console.log(`✅ Evaluador ${evaluador.email} asignado correctamente`);
    }

    // 5. Verificar resultado final
    console.log('\n🔍 Verificando resultado final...');
    
    const [proyectoFinal] = await sequelize.query(`
      SELECT id, evaluadorAsignado, evaluadoresAsignados, estado, fechaAsignacionEvaluador
      FROM convocatoria_proyectos 
      WHERE id = ?
    `, { replacements: [proyecto.id] });

    if (proyectoFinal.length > 0) {
      const pf = proyectoFinal[0];
      console.log(`📊 Estado final del proyecto ID ${pf.id}:`);
      console.log(`   - Evaluador Principal: ${pf.evaluadorAsignado}`);
      console.log(`   - Evaluadores Asignados: ${pf.evaluadoresAsignados}`);
      console.log(`   - Estado: ${pf.estado}`);
      console.log(`   - Fecha Asignación: ${pf.fechaAsignacionEvaluador}`);

      // Parsear y mostrar el array
      try {
        const evaluadoresArray = JSON.parse(pf.evaluadoresAsignados || '[]');
        console.log(`   - Evaluadores (array): [${evaluadoresArray.join(', ')}]`);
      } catch (e) {
        console.log(`   - Error parseando evaluadores: ${e.message}`);
      }
    }

    console.log('\n✅ Prueba de asignación completada exitosamente!');

  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await sequelize.close();
  }
}

probarAsignacionEvaluadores();