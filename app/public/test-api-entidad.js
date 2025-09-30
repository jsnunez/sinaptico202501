// Test directo de creación de entidad con coordenadas usando fetch
async function testCrearEntidadConUbicacion() {
    console.log('🧪 Probando creación de entidad con ubicación...');
    
    // Crear FormData simulando el formulario
    const formData = new FormData();
    
    // Datos básicos de la entidad
    formData.append('claseEntidad', 'Empresa');
    formData.append('razonSocial', 'Empresa Test API');
    formData.append('numIdentificacion', '900555666-7');
    formData.append('tipoEntidad', 'Sociedad Anónima');
    formData.append('naturalezaJuridica', 'Privada');
    formData.append('actividadEconomica', 'Desarrollo de software');
    formData.append('correo', 'test@empresa.com');
    formData.append('telefono', '3001112233');
    formData.append('fechaConstitucion', '2020-01-01');
    formData.append('departamento', '28');
    formData.append('ciudadId', '915');
    formData.append('direccion', 'Calle Test #123-45');
    formData.append('UserAdminId', '13');
    
    // Datos de contacto
    formData.append('nombreContacto', 'Contacto Test');
    formData.append('cargoId', '1');
    formData.append('correoContacto', 'contacto@empresa.com');
    formData.append('telefonoContacto', '3004455667');
    
    // Redes sociales (opcional)
    formData.append('facebook', '');
    formData.append('instagram', '');
    formData.append('paginaweb', '');
    
    // COORDENADAS - ESTO ES LO IMPORTANTE
    formData.append('latitud', '7.123456');
    formData.append('longitud', '-73.654321');
    
    // Crear un archivo blob para el logo
    const logoBlob = new Blob(['fake logo content'], { type: 'image/png' });
    formData.append('logo', logoBlob, 'test-logo.png');
    
    console.log('📤 Enviando datos al servidor...');
    console.log('Coordenadas enviadas:', {
        latitud: formData.get('latitud'),
        longitud: formData.get('longitud')
    });
    
    try {
        const response = await fetch('http://localhost:4000/api/entidad/crear', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Respuesta exitosa:', result);
            console.log('📍 Ubicación creada:', result.ubicacionCreada);
        } else {
            const error = await response.text();
            console.error('❌ Error en la respuesta:', error);
        }
    } catch (error) {
        console.error('❌ Error de red:', error);
    }
}

// Función para probar en la consola del navegador
if (typeof window !== 'undefined') {
    window.testCrearEntidadConUbicacion = testCrearEntidadConUbicacion;
    console.log('✅ Función testCrearEntidadConUbicacion disponible en window');
    console.log('💡 Ejecuta: testCrearEntidadConUbicacion() en la consola');
}

// Si se ejecuta desde Node.js, ejecutar directamente
if (typeof module !== 'undefined' && module.exports) {
    testCrearEntidadConUbicacion();
}
