// ============================================
// DASHBOARD - GESTIÓN DE MODAL CREAR ENTIDAD
// ============================================

let entidadMap;
let entidadMarker;

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Inicializando modal de entidades...');
    
    // Verificar que API_BASE_URL esté definida
    if (typeof API_BASE_URL === 'undefined') {
        console.error('❌ API_BASE_URL no está definida. Asegúrese de que config.js se carga antes.');
        return;
    }
    
    console.log('🔗 API_BASE_URL:', API_BASE_URL);
    
    initModalEntidad();
    cargarDepartamentos();
    cargarCargos();
});

// ============================================
// INICIALIZACIÓN DEL MODAL
// ============================================

function initModalEntidad() {
    const modal = document.getElementById('modalCrearEntidad');
    const btnCrear1 = document.getElementById('crearEntidadBtn');
    const btnCrear2 = document.getElementById('crearEntidadBtn2');
    const btnCerrar = document.getElementById('cerrarModalEntidad');
    const btnCancelar = document.getElementById('cancelarCrearEntidad');
    const form = document.getElementById('formCrearEntidad');

    // Event listeners para abrir el modal
    if (btnCrear1) {
        btnCrear1.addEventListener('click', function(e) {
            e.stopPropagation();
            abrirModalEntidad();
        });
    }

    if (btnCrear2) {
        btnCrear2.addEventListener('click', function(e) {
            e.stopPropagation();
            abrirModalEntidad();
        });
    }

    // Event listeners para cerrar el modal
    if (btnCerrar) {
        btnCerrar.addEventListener('click', cerrarModalEntidad);
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', cerrarModalEntidad);
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModalEntidad();
        }
    });

    // Event listener para el formulario
    if (form) {
        form.addEventListener('submit', manejarEnvioFormulario);
    }

    // Event listener para cambio de departamento
    const selectDepartamento = document.getElementById('departamento');
    if (selectDepartamento) {
        selectDepartamento.addEventListener('change', function() {
            cargarCiudades(this.value);
        });
    }
}

// ============================================
// GESTIÓN DEL MODAL
// ============================================

function abrirModalEntidad() {
    const modal = document.getElementById('modalCrearEntidad');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Inicializar el mapa después de que el modal sea visible
    setTimeout(() => {
        initEntidadMap();
    }, 300);
}

function cerrarModalEntidad() {
    const modal = document.getElementById('modalCrearEntidad');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpiar el formulario
    document.getElementById('formCrearEntidad').reset();
    
    // Limpiar coordenadas
    document.getElementById('latitud').value = '';
    document.getElementById('longitud').value = '';
    
    // Limpiar marcador del mapa
    if (entidadMarker && entidadMap) {
        entidadMap.removeLayer(entidadMarker);
        entidadMarker = null;
    }
}

// ============================================
// INICIALIZACIÓN DEL MAPA
// ============================================

function initEntidadMap() {
    const mapElement = document.getElementById('entityLocationMap');
    if (!mapElement) {
        console.error('Elemento del mapa no encontrado');
        return;
    }

    // Coordenadas de Bucaramanga por defecto
    const defaultLat = 7.1193;
    const defaultLng = -73.1227;

    // Inicializar el mapa
    entidadMap = L.map('entityLocationMap').setView([defaultLat, defaultLng], 13);

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(entidadMap);

    // Evento para capturar clics en el mapa
    entidadMap.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Actualizar los campos de coordenadas
        document.getElementById('latitud').value = lat.toFixed(6);
        document.getElementById('longitud').value = lng.toFixed(6);

        // Remover marcador anterior si existe
        if (entidadMarker) {
            entidadMap.removeLayer(entidadMarker);
        }

        // Agregar nuevo marcador
        entidadMarker = L.marker([lat, lng], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }).addTo(entidadMap);

        entidadMarker.bindPopup(`
            <div style="text-align: center;">
                <strong>📍 Ubicación Seleccionada</strong><br>
                <small>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</small>
            </div>
        `).openPopup();

        // Actualizar estilo de los inputs
        const latInput = document.getElementById('latitud');
        const lngInput = document.getElementById('longitud');
        if (latInput && lngInput) {
            latInput.style.backgroundColor = '#e8f5e8';
            latInput.style.border = '2px solid #28a745';
            lngInput.style.backgroundColor = '#e8f5e8';
            lngInput.style.border = '2px solid #28a745';
        }

        // Mostrar notificación
        Swal.fire({
            icon: 'success',
            title: 'Ubicación seleccionada',
            text: `Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    });

    // Redimensionar el mapa
    setTimeout(() => {
        entidadMap.invalidateSize();
    }, 100);
}

// ============================================
// CARGA DE DATOS
// ============================================

async function cargarDepartamentos() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/departamentos`);
        const data = await response.json();
        
        // La respuesta tiene estructura { success: true, departamentos: [...] }
        const departamentos = data.departamentos || data;
        
        const select = document.getElementById('departamento');
        if (!select) {
            console.error('Select de departamentos no encontrado');
            return;
        }
        
        select.innerHTML = '<option value="">Seleccione un departamento</option>';
        
        if (Array.isArray(departamentos)) {
            departamentos.forEach(dep => {
                const option = document.createElement('option');
                option.value = dep.id;
                option.textContent = dep.nombre;
                select.appendChild(option);
            });
            console.log(`✅ Cargados ${departamentos.length} departamentos`);
        } else {
            console.error('Los datos de departamentos no son un array:', departamentos);
            throw new Error('Formato de datos incorrecto');
        }
    } catch (error) {
        console.error('Error al cargar departamentos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los departamentos'
        });
    }
}

async function cargarCiudades(departamentoId) {
    if (!departamentoId) {
        const select = document.getElementById('ciudadId');
        if (select) {
            select.innerHTML = '<option value="">Seleccione una ciudad</option>';
        }
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/ciudades/${departamentoId}`);
        const data = await response.json();
        
        // La respuesta puede tener diferentes estructuras
        const ciudades = data.ciudades || data;
        
        const select = document.getElementById('ciudadId');
        if (!select) {
            console.error('Select de ciudades no encontrado');
            return;
        }
        
        select.innerHTML = '<option value="">Seleccione una ciudad</option>';
        
        if (Array.isArray(ciudades)) {
            ciudades.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.id;
                option.textContent = ciudad.nombre;
                select.appendChild(option);
            });
            console.log(`✅ Cargadas ${ciudades.length} ciudades para departamento ${departamentoId}`);
        } else {
            console.error('Los datos de ciudades no son un array:', ciudades);
            throw new Error('Formato de datos incorrecto');
        }
    } catch (error) {
        console.error('Error al cargar ciudades:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las ciudades'
        });
    }
}

async function cargarCargos() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cargos`);
        const data = await response.json();
        
        // La respuesta puede ser un array directo o tener estructura anidada
        const cargos = data.cargos || data;
        
        const select = document.getElementById('cargoId');
        if (!select) {
            console.error('Select de cargos no encontrado');
            return;
        }
        
        select.innerHTML = '<option value="">Seleccione un cargo</option>';
        
        if (Array.isArray(cargos)) {
            cargos.forEach(cargo => {
                const option = document.createElement('option');
                option.value = cargo.id;
                option.textContent = cargo.nombre;
                select.appendChild(option);
            });
            console.log(`✅ Cargados ${cargos.length} cargos`);
        } else {
            console.warn('Los datos de cargos no son un array:', cargos);
            // No lanzar error para cargos ya que es opcional
        }
    } catch (error) {
        console.error('Error al cargar cargos:', error);
        // No mostrar error para cargos ya que es opcional
    }
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

async function manejarEnvioFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Validar coordenadas
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    
    if ((latitud && !longitud) || (!latitud && longitud)) {
        Swal.fire({
            icon: 'warning',
            title: 'Coordenadas incompletas',
            text: 'Si va a especificar una ubicación, debe proporcionar tanto la latitud como la longitud.',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    
    if (latitud && longitud) {
        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);
        
        if (isNaN(lat) || isNaN(lng)) {
            Swal.fire({
                icon: 'error',
                title: 'Coordenadas inválidas',
                text: 'Las coordenadas deben ser números válidos.',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            Swal.fire({
                icon: 'error',
                title: 'Coordenadas fuera de rango',
                text: 'La latitud debe estar entre -90 y 90, y la longitud entre -180 y 180.',
                confirmButtonText: 'Entendido'
            });
            return;
        }
    }

    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando...';

    // Mostrar mensaje de procesamiento
    Swal.fire({
        title: 'Creando entidad...',
        text: 'Por favor espere mientras procesamos la información.',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        // Obtener ID del usuario administrador (puedes ajustar esto según tu lógica)
        const userId = getCookie('userId') || '1'; // Valor por defecto si no hay cookie
        
        // Crear FormData
        const formData = new FormData(form);
       

        // Enviar datos
        const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            let successMessage = 'Entidad creada con éxito.';
            
            if (result.ubicacionCreada) {
                successMessage += ' La ubicación en el mapa también fue registrada.';
            }

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: successMessage,
                confirmButtonText: 'Aceptar'
            }).then(() => {
                cerrarModalEntidad();
                // Actualizar contadores si existen
                if (typeof fetchEntidadesCount === 'function') {
                    fetchEntidadesCount();
                }
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error al crear entidad:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al crear la entidad',
            text: error.message || 'Ocurrió un error inesperado',
            confirmButtonText: 'Entendido'
        });
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// ============================================
// UTILIDADES
// ============================================

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
