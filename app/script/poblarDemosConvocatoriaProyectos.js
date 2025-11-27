import sequelize from '../config/database.js';
import ConvocatoriaProyectos from '../models/convocatoriaProyectos.js';
import Proyectos from '../models/proyectos.js';
import Convocatoria from '../models/convocatoria.js';
import '../models/associations.js'; // Cargar asociaciones

// Función para poblar datos demo de aplicaciones de proyectos a convocatorias
async function poblarDemosConvocatoriaProyectos() {
    try {
        console.log('🚀 Iniciando poblamiento de datos demo de ConvocatoriaProyectos...');

        // Verificar conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida');

        console.log('🔍 Verificando datos existentes...');
        const existentes = await ConvocatoriaProyectos.findAll();
        console.log(`📊 Encontrados ${existentes.length} registros existentes`);
        
        if (existentes.length > 0) {
            console.log(`Ya existen ${existentes.length} registros de aplicaciones. Limpiando datos previos...`);
            await ConvocatoriaProyectos.destroy({ where: {}, force: true });
            console.log('🧹 Datos previos eliminados');
        }

        // Obtener proyectos y convocatorias existentes para crear relaciones
        console.log('📦 Obteniendo proyectos...');
        const proyectos = await Proyectos.findAll({ limit: 5 });
        console.log(`📦 Encontrados ${proyectos.length} proyectos`);
        
        console.log('📋 Obteniendo convocatorias...');
        const convocatorias = await Convocatoria.findAll({ limit: 3 });
        console.log(`📋 Encontradas ${convocatorias.length} convocatorias`);

        if (proyectos.length === 0) {
            console.log('⚠️  No se encontraron proyectos. Asegúrate de que existan proyectos en la base de datos.');
            return;
        }

        if (convocatorias.length === 0) {
            console.log('No se encontraron convocatorias. Asegúrate de que existan convocatorias en la base de datos.');
            return;
        }

        console.log(`Encontrados ${proyectos.length} proyectos y ${convocatorias.length} convocatorias`);

        // Crear aplicaciones de ejemplo
        const aplicacionesDemo = [];

        // Aplicaciones variadas con diferentes estados
        for (let i = 0; i < Math.min(proyectos.length, 10); i++) {
            const proyecto = proyectos[i % proyectos.length];
            const convocatoria = convocatorias[i % convocatorias.length];
            
            // Evitar duplicados
            const existeAplicacion = aplicacionesDemo.find(
                app => app.proyectoId === proyecto.id && app.convocatoriaId === convocatoria.id
            );
            
            if (existeAplicacion) continue;

            const estados = ['Postulado', 'En Evaluacion', 'Preseleccionado', 'Aprobado', 'Rechazado'];
            const estadoAleatorio = estados[i % estados.length];
            
            const fechaAplicacion = new Date();
            fechaAplicacion.setDate(fechaAplicacion.getDate() - Math.floor(Math.random() * 30)); // Últimos 30 días

            const aplicacion = {
                proyectoId: proyecto.id,
                convocatoriaId: convocatoria.id,
                estado: estadoAleatorio,
                fechaAplicacion: fechaAplicacion,
                documentosPresentados: JSON.stringify({
                    fichaTecnica: true,
                    planEjecucion: Math.random() > 0.3,
                    presupuestoDetallado: true,
                    certificacionesEquipo: Math.random() > 0.5,
                    cartasApoyo: Math.random() > 0.4
                }),
                observacionesAplicacion: `Aplicación demo ${i + 1}. Proyecto aplicado desde el portal web con documentación completa.`,
            };

            // Agregar datos de evaluación solo si no está en estado "Postulado"
            if (estadoAleatorio !== 'Postulado') {
                aplicacion.fechaEvaluacion = new Date(fechaAplicacion.getTime() + (Math.random() * 15 * 24 * 60 * 60 * 1000)); // 1-15 días después
                aplicacion.evaluadorAsignado = `evaluador${Math.floor(Math.random() * 5) + 1}@santander.com`;
                
                // Puntuaciones aleatorias realistas
                aplicacion.puntuacionTecnica = Math.round((Math.random() * 40 + 60) * 10) / 10; // 60-100
                aplicacion.puntuacionFinanciera = Math.round((Math.random() * 40 + 60) * 10) / 10; // 60-100  
                aplicacion.puntuacionImpacto = Math.round((Math.random() * 40 + 60) * 10) / 10; // 60-100
                
                aplicacion.puntuacionTotal = Math.round((
                    aplicacion.puntuacionTecnica + 
                    aplicacion.puntuacionFinanciera + 
                    aplicacion.puntuacionImpacto
                ) / 3 * 10) / 10;

                // Observaciones según el estado
                switch (estadoAleatorio) {
                    case 'En Evaluacion':
                        aplicacion.observacionesEvaluacion = 'Proyecto en proceso de evaluación técnica y financiera. Pendiente revisión final del comité evaluador.';
                        break;
                    case 'Preseleccionado':
                        aplicacion.observacionesEvaluacion = 'Proyecto preseleccionado. Cumple con los requisitos técnicos y está dentro del presupuesto. Pendiente evaluación final.';
                        break;
                    case 'Aprobado':
                        aplicacion.observacionesEvaluacion = 'Proyecto aprobado para financiación. Excelente propuesta técnica con alto impacto esperado. Proceder con firma de convenio.';
                        break;
                    case 'Rechazado':
                        aplicacion.observacionesEvaluacion = 'Proyecto no cumple con los criterios mínimos de evaluación. Presupuesto excede límites o falta documentación técnica.';
                        break;
                }
            }

            aplicacionesDemo.push(aplicacion);
        }

        // Insertar datos en la base de datos
        console.log(`Creando ${aplicacionesDemo.length} aplicaciones de ejemplo...`);
        
        for (const aplicacionData of aplicacionesDemo) {
            try {
                await ConvocatoriaProyectos.create(aplicacionData);
                console.log(`✓ Aplicación creada: Proyecto ${aplicacionData.proyectoId} -> Convocatoria ${aplicacionData.convocatoriaId} (${aplicacionData.estado})`);
            } catch (error) {
                console.error(`✗ Error al crear aplicación:`, error.message);
            }
        }

        // Verificar datos creados
        const aplicacionesCreadas = await ConvocatoriaProyectos.findAll({
            include: [
                {
                    model: Proyectos,
                    as: 'proyecto',
                    attributes: ['id', 'nombrePPI', 'objetivo']
                },
                {
                    model: Convocatoria,
                    as: 'convocatoria',
                    attributes: ['id', 'titulo']
                }
            ]
        });

        console.log('\n=== RESUMEN DE APLICACIONES CREADAS ===');
        
        // Estadísticas por estado
        const estadisticas = {};
        aplicacionesCreadas.forEach(app => {
            estadisticas[app.estado] = (estadisticas[app.estado] || 0) + 1;
        });

        console.log('\nEstadísticas por estado:');
        Object.entries(estadisticas).forEach(([estado, cantidad]) => {
            console.log(`  - ${estado}: ${cantidad} aplicaciones`);
        });

        console.log(`\nTotal de aplicaciones creadas: ${aplicacionesCreadas.length}`);
        
        // Mostrar algunas aplicaciones de ejemplo
        console.log('\n=== EJEMPLOS DE APLICACIONES ===');
        aplicacionesCreadas.slice(0, 5).forEach((app, index) => {
            const proyecto = app.proyecto?.nombrePPI || `Proyecto ${app.proyectoId}`;
            const convocatoria = app.convocatoria?.titulo || `Convocatoria ${app.convocatoriaId}`;
            console.log(`${index + 1}. ${proyecto} -> ${convocatoria}`);
            console.log(`   Estado: ${app.estado}`);
            if (app.puntuacionTotal) {
                console.log(`   Puntuación: ${app.puntuacionTotal}/100`);
            }
            console.log(`   Fecha aplicación: ${app.fechaAplicacion.toLocaleDateString()}`);
            console.log('');
        });

        console.log('✅ Poblamiento de datos demo completado exitosamente');

    } catch (error) {
        console.error('❌ Error durante el poblamiento de datos demo:', error);
        throw error;
    }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    poblarDemosConvocatoriaProyectos()
        .then(() => {
            console.log('\n🎉 Proceso completado');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Error durante el proceso:', error);
            process.exit(1);
        });
}

export { poblarDemosConvocatoriaProyectos };