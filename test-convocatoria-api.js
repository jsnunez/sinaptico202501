// Script de prueba para la API de convocatorias
const convocatoriaPrueba = {
  titulo: "Convocatoria de Prueba - Innovación Digital 2025",
  numero: "2025-01",
  descripcion: "Esta es una convocatoria de prueba para validar la funcionalidad de guardado en la base de datos. Se enfoca en proyectos de innovación digital y transformación tecnológica en Santander.",
  presupuestoTotal: 500000000,
  maxProyectos: 15,
  fechaApertura: "2025-01-15",
  fechaCierre: "2025-03-15",
  fechaResultados: "2025-04-15",
  fechaLimite: "2025-03-15",
  areasTematicas: "Inteligencia Artificial,Desarrollo de Software,Transformación Digital,E-commerce",
  tipoConvocatoriaId: 1,
  estado: "borrador"
};

async function probarAPI() {
  try {
    console.log("🧪 Iniciando prueba de API de convocatorias...");
    
    // Prueba POST - Crear convocatoria
    console.log("📤 Enviando convocatoria de prueba...");
    const response = await fetch('http://localhost:4000/api/convocatorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(convocatoriaPrueba)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const convocatoriaCreada = await response.json();
    console.log("✅ Convocatoria creada exitosamente:");
    console.log(`   ID: ${convocatoriaCreada.id}`);
    console.log(`   Título: ${convocatoriaCreada.titulo}`);
    console.log(`   Número: ${convocatoriaCreada.numero}`);
    console.log(`   Estado: ${convocatoriaCreada.estado}`);

    // Prueba GET - Obtener todas las convocatorias
    console.log("\n📥 Obteniendo lista de convocatorias...");
    const getResponse = await fetch('http://localhost:4000/api/convocatorias');
    const convocatorias = await getResponse.json();
    
    console.log(`✅ Se encontraron ${convocatorias.length} convocatoria(s):`);
    convocatorias.forEach(conv => {
      console.log(`   - ${conv.numero}: ${conv.titulo} [${conv.estado || 'sin estado'}]`);
    });

    console.log("\n🎉 ¡Prueba completada exitosamente! La API funciona correctamente.");
    return convocatoriaCreada.id;

  } catch (error) {
    console.error("❌ Error en la prueba:", error.message);
    console.error("Detalles:", error);
  }
}

// Ejecutar la prueba
probarAPI();