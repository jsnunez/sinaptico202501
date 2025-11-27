import fetch from 'node-fetch';

async function probarAPIAsignacion() {
  try {
    console.log('🧪 Probando API de asignación de evaluadores...');

    // Simular datos de asignación
    const asignaciones = [
      {
        proyectoId: 1,  // Asumiendo que existe un proyecto con ID 1
        evaluadorId: 1  // Asumiendo que existe un evaluador con ID 1
      }
    ];

    console.log('📤 Enviando asignaciones:', JSON.stringify(asignaciones, null, 2));

    const response = await fetch('http://localhost:4000/api/convocatoria-proyectos/asignar-evaluadores-multiples', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        asignaciones: asignaciones
      })
    });

    const resultado = await response.json();

    console.log('📊 Response Status:', response.status);
    console.log('📄 Response Body:', JSON.stringify(resultado, null, 2));

    if (response.ok) {
      console.log('✅ API funcionando correctamente!');
      
      // Verificar que se guardó en la base de datos
      console.log('\n🔍 Verificando datos guardados...');
      
      const verificacionResponse = await fetch('http://localhost:4000/api/convocatoria-proyectos');
      const proyectos = await verificacionResponse.json();
      
      if (verificacionResponse.ok && proyectos.success) {
        const proyectoActualizado = proyectos.data.find(p => p.id === 1);
        if (proyectoActualizado) {
          console.log('📋 Proyecto actualizado:');
          console.log('   - Evaluador Principal:', proyectoActualizado.evaluadorAsignado);
          console.log('   - Evaluadores Asignados:', proyectoActualizado.evaluadoresAsignados);
          console.log('   - Estado:', proyectoActualizado.estado);
          console.log('   - Fecha Asignación:', proyectoActualizado.fechaAsignacionEvaluador);
          
          if (proyectoActualizado.evaluadoresAsignados && proyectoActualizado.evaluadoresAsignados.length > 0) {
            console.log('✅ JSON de evaluadores guardado correctamente!');
          } else {
            console.log('❌ JSON de evaluadores NO se guardó');
          }
        } else {
          console.log('⚠️  No se encontró el proyecto actualizado');
        }
      } else {
        console.log('❌ Error verificando datos:', verificacionResponse.status);
      }
      
    } else {
      console.log('❌ Error en la API:', response.status, resultado.message);
    }

  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
  }
}

// Esperar un momento para que el servidor se inicialice completamente
setTimeout(probarAPIAsignacion, 2000);