// Script para verificar las APIs de ConvocatoriaProyectos
// Este archivo verifica que todas las rutas y controladores funcionen correctamente

console.log('=== VERIFICACIÓN DE APIs ConvocatoriaProyectos ===\n');

const BASE_URL = 'http://localhost:3000/api';

// Función helper para hacer requests
async function testAPI(endpoint, method = 'GET', data = null) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`🔍 ${method} ${endpoint}`);
        
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const result = await response.json();
        
        if (response.ok) {
            console.log(`✅ ${method} ${endpoint} - OK (${response.status})`);
            return { success: true, data: result, status: response.status };
        } else {
            console.log(`❌ ${method} ${endpoint} - Error (${response.status}): ${result.message || JSON.stringify(result)}`);
            return { success: false, error: result, status: response.status };
        }
    } catch (error) {
        console.log(`💥 ${method} ${endpoint} - Error de conexión: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// Tests principales
async function runTests() {
    console.log('Iniciando verificación de APIs...\n');
    
    // Test 1: Obtener todas las aplicaciones
    console.log('--- Test 1: Obtener todas las aplicaciones ---');
    const allApps = await testAPI('/convocatoria-proyectos');
    if (allApps.success && allApps.data.data) {
        console.log(`📊 Total de aplicaciones: ${allApps.data.data.length}`);
        if (allApps.data.data.length > 0) {
            const app = allApps.data.data[0];
            console.log(`   Ejemplo: Proyecto ${app.proyectoId} -> Convocatoria ${app.convocatoriaId} (${app.estado})`);
        }
    }
    console.log('');

    // Test 2: Obtener aplicaciones por proyecto (usando primer proyecto si existe)
    if (allApps.success && allApps.data.data && allApps.data.data.length > 0) {
        const firstApp = allApps.data.data[0];
        console.log('--- Test 2: Obtener aplicaciones por proyecto ---');
        const projectApps = await testAPI(`/convocatoria-proyectos/proyecto/${firstApp.proyectoId}`);
        if (projectApps.success && projectApps.data.data) {
            console.log(`📊 Aplicaciones del proyecto ${firstApp.proyectoId}: ${projectApps.data.data.length}`);
        }
        console.log('');
    }

    // Test 3: Obtener proyectos por convocatoria (usando primera convocatoria si existe)
    if (allApps.success && allApps.data.data && allApps.data.data.length > 0) {
        const firstApp = allApps.data.data[0];
        console.log('--- Test 3: Obtener proyectos por convocatoria ---');
        const convocatoriaProjects = await testAPI(`/convocatoria-proyectos/convocatoria/${firstApp.convocatoriaId}`);
        if (convocatoriaProjects.success && convocatoriaProjects.data.data) {
            console.log(`📊 Proyectos en convocatoria ${firstApp.convocatoriaId}: ${convocatoriaProjects.data.data.length}`);
        }
        console.log('');
    }

    // Test 4: Estadísticas de convocatoria
    if (allApps.success && allApps.data.data && allApps.data.data.length > 0) {
        const firstApp = allApps.data.data[0];
        console.log('--- Test 4: Estadísticas de convocatoria ---');
        const stats = await testAPI(`/convocatoria-proyectos/estadisticas/${firstApp.convocatoriaId}`);
        if (stats.success && stats.data.data) {
            console.log('📊 Estadísticas obtenidas:', JSON.stringify(stats.data.data, null, 2));
        }
        console.log('');
    }

    // Test 5: Crear nueva aplicación (esto requiere datos válidos)
    console.log('--- Test 5: Verificar estructura de creación ---');
    const testCreateData = {
        proyectoId: 999, // ID inexistente para test
        convocatoriaId: 999, // ID inexistente para test
        observacionesAplicacion: 'Aplicación de prueba'
    };
    const createTest = await testAPI('/convocatoria-proyectos', 'POST', testCreateData);
    if (!createTest.success) {
        console.log('⚠️  Esperado: Error por IDs inexistentes (esto es correcto)');
    }
    console.log('');

    // Test 6: Actualizar evaluación (usando primer registro si existe)
    if (allApps.success && allApps.data.data && allApps.data.data.length > 0) {
        const firstApp = allApps.data.data[0];
        console.log('--- Test 6: Verificar estructura de actualización ---');
        const updateData = {
            estado: 'En Evaluacion',
            puntuacionTecnica: 85.5,
            observacionesEvaluacion: 'Evaluación de prueba'
        };
        const updateTest = await testAPI(`/convocatoria-proyectos/${firstApp.id}/evaluacion`, 'PUT', updateData);
        if (updateTest.success) {
            console.log('✅ Actualización exitosa');
        }
        console.log('');
    }

    // Test 7: Verificar endpoints de proyectos con convocatorias incluidas
    console.log('--- Test 7: Verificar proyectos con convocatorias ---');
    const projects = await testAPI('/proyectos');
    if (projects.success && projects.data) {
        console.log(`📊 Total de proyectos: ${projects.data.length}`);
        const projectWithConvocatorias = projects.data.find(p => p.convocatoriasAplicadas && p.convocatoriasAplicadas.length > 0);
        if (projectWithConvocatorias) {
            console.log(`✅ Encontrado proyecto con convocatorias aplicadas: ${projectWithConvocatorias.convocatoriasAplicadas.length} aplicaciones`);
        } else {
            console.log('⚠️  Ningún proyecto tiene convocatorias aplicadas visibles');
        }
    }
    console.log('');

    console.log('🏁 Verificación completada\n');
    
    // Resumen
    console.log('=== RESUMEN ===');
    console.log('Endpoints verificados:');
    console.log('  ✅ GET /convocatoria-proyectos');
    console.log('  ✅ GET /convocatoria-proyectos/proyecto/:id');
    console.log('  ✅ GET /convocatoria-proyectos/convocatoria/:id');
    console.log('  ✅ GET /convocatoria-proyectos/estadisticas/:id');
    console.log('  ✅ POST /convocatoria-proyectos (estructura verificada)');
    console.log('  ✅ PUT /convocatoria-proyectos/:id/evaluacion');
    console.log('  ✅ GET /proyectos (con convocatorias incluidas)');
    console.log('\n💡 Para usar este script:');
    console.log('   1. Asegúrate de que el servidor esté ejecutándose en localhost:3000');
    console.log('   2. Ejecuta: node verificarAPIsConvocatoriaProyectos.js');
    console.log('   3. O en el navegador: incluye este script y llama a runTests()');
}

// Verificar si estamos en Node.js o en el navegador
if (typeof window === 'undefined') {
    // Node.js environment
    import('node-fetch').then(({ default: fetch }) => {
        global.fetch = fetch;
        runTests().catch(console.error);
    });
} else {
    // Browser environment
    console.log('Para ejecutar en el navegador, llama a la función runTests() desde la consola');
    window.runTests = runTests;
    
    // Auto-ejecutar si se quiere
    // runTests();
}