let miEmpresaID = "";
let miEmpresa = "";

// Variables globales para el mapa de edición
let editMap;
let editMarker;
let ubicacionActual = null;

// Verificar que API_BASE_URL esté definida
if (typeof API_BASE_URL === 'undefined') {
    console.error('❌ API_BASE_URL no está definida. Asegúrese de que config.js se carga antes.');
}

// Función principal para abrir el modal de edición
async function abrirModalEditarEntidad(entidadId) {
    try {
        // Verificar que existen los elementos necesarios
        const overlay = document.querySelector('.overlay') || document.getElementById('overlay');
        const modalEditar = document.getElementById('modalEditar');
        
        if (!overlay) {
            console.error('❌ Elemento overlay no encontrado');
            return;
        }
        
        if (!modalEditar) {
            console.error('❌ Modal de edición no encontrado');
            return;
        }

        // Mostrar overlay y modal
        overlay.style.display = 'block';
        modalEditar.style.display = 'flex';
        modalEditar.style.flexWrap = 'wrap';
        
        // Obtener datos de la entidad
        await cargarDatosEntidad(entidadId);
        
        // Generar el HTML del formulario
        generarFormularioEdicion();
        
        // Configurar los datos del formulario
        await configurarFormulario();
        
        // Inicializar el mapa después de cargar los datos
        setTimeout(() => {
            initEditMap();
            cargarUbicacionActual();
        }, 500);

        // Agregar manejador de eventos para el formulario de edición
        const formEdit = document.getElementById('entidad-form-editar');
        if (formEdit) {
            console.log('🔧 Formulario encontrado:', formEdit);
            
            // Remover manejadores previos para evitar duplicados
            formEdit.removeEventListener('submit', actualizarEntidadConUbicacion);
            
            // Agregar manejador con log detallado
            formEdit.addEventListener('submit', async function(e) {
                console.log('🎯 Submit interceptado por editarEntidad.js');
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Llamando a actualizarEntidadConUbicacion');
                await actualizarEntidadConUbicacion();
            });
            console.log('✅ Manejador de formulario agregado correctamente');
        } else {
            console.warn('⚠️ No se encontró el formulario de edición con ID: entidad-form-editar');
        }

    } catch (error) {
        console.error('❌ Error al abrir modal de edición:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo abrir el modal de edición'
        });
    }
}

// Función para cargar datos de la entidad
async function cargarDatosEntidad(entidadId) {
    try {
        // Verificar si existe la variable global todasLasEmpresas
        if (typeof todasLasEmpresas !== 'undefined') {
            miEmpresa = todasLasEmpresas.find(empresa => empresa.id === entidadId);
            if (!miEmpresa) {
                throw new Error('Entidad no encontrada en los datos locales');
            }
        } else {
            // Si no existe la variable global, obtener datos de la API
            const response = await fetch(`${API_BASE_URL}/api/entidad/${entidadId}`);
            const data = await response.json();
            if (data.success && data.entidad) {
                miEmpresa = data.entidad;
            } else {
                throw new Error('No se encontró la entidad');
            }
        }
        
        miEmpresaID = miEmpresa.id;
        console.log('✅ Datos de entidad cargados:', miEmpresa);
        
    } catch (error) {
        console.error('❌ Error al cargar datos de la entidad:', error);
        throw error;
    }
}

// Función para generar el HTML del formulario
function generarFormularioEdicion() {
    const userDetailsContainer = document.getElementById('datos-entidad');
    
    userDetailsContainer.innerHTML = `
    <!-- Datos básicos de la entidad -->
    <div class="form-section">
    
        <h4>Información Básica</h4>
        <input type="hidden" id="ID" name="ID">
        
        <div class="input-row">
            <div class="input-box">
                <span>Clase de Entidad</span>
                <select id="claseEntidad" name="claseEntidad" required>
                    <option value="Empresa">Empresa</option>
                    <option value="Estado">Estado</option>
                    <option value="Sociedad">Sociedad</option>
                    <option value="Academia">Academia</option>
                </select>
            </div>
            <div class="input-box">
                <span>Razón Social</span>
                <input type="text" id="razonSocial" name="razonSocial" placeholder="Ingrese la razón social" required>
            </div>
        </div>

        <div class="input-row">
            <div class="input-box">
                <span>Número de Identificación</span>
                <input type="text" id="numIdentificacion" name="numIdentificacion" placeholder="Ingrese el número de identificación" required>
            </div>
            <div class="input-box">
                <span>Tipo de Entidad</span>
                <select id="tipoEntidad" name="tipoEntidad" required>
                    <option value="Sociedad Anónima">Sociedad Anónima</option>
                    <option value="Sociedad Limitada">Sociedad Limitada</option>
                    <option value="Persona Natural">Persona Natural</option>
                    <option value="Corporativa">Corporativa</option>
                    <option value="Sin fines de lucro">Sin fines de lucro</option>
                    <option value="Educativa">Educativa</option>
                    <option value="Gubernamental">Gubernamental</option>
                </select>
            </div>
        </div>

        <div class="input-row">
            <div class="input-box">
                <span>Naturaleza Jurídica</span>
                <select id="naturalezaJuridica" name="naturalezaJuridica" required>
                    <option value="Privada">Privada</option>
                    <option value="Pública">Pública</option>
                    <option value="Mixta">Mixta</option>
                </select>
            </div>
            <div class="input-box">
                <span>Actividad Económica</span>
                <input type="text" id="actividadEconomica" name="actividadEconomica" placeholder="Ingrese la actividad económica" required>
            </div>
        </div>
    </div>

    <!-- Información de contacto -->
    <div class="form-section">
        <h4>Información de Contacto</h4>
        <div class="input-row">
            <div class="input-box">
                <span>Correo de la Entidad</span>
                <input type="email" id="correo" name="correo" placeholder="Ingrese el correo de la entidad" required>
            </div>
            <div class="input-box">
                <span>Teléfono de la Entidad</span>
                <input type="tel" id="telefono" name="telefono" placeholder="Ingrese el teléfono de contacto" required>
            </div>
        </div>
        
        <div class="input-row">
            <div class="input-box">
                <span>Fecha de Constitución</span>
                <input type="date" id="fechaConstitucion" name="fechaConstitucion" required>
            </div>
            <div class="input-box">
                <span>Dirección</span>
                <input type="text" id="direccion" name="direccion" placeholder="Ingrese la dirección" required>
            </div>
        </div>
        
        <div class="input-row">
            <div class="input-box">
                <span>Usuario Administrador</span>
                <select id="UserAdminId" name="UserAdminId" required>
                    <option value="">Seleccione un usuario administrador</option>
                    <!-- Las opciones se llenarán dinámicamente -->
                </select>
            </div>
            <div class="input-box">
                <span>Admin Actual</span>
                <input type="text" id="adminActual" readonly 
                       style="background-color: #f5f5f5; border: 1px solid #ddd; padding: 8px 12px; border-radius: 4px; color: #666;"
                       placeholder="Cargando...">
            </div>
        </div>
    </div>

    <!-- Ubicación -->
    <div class="form-section">
        <h4>Ubicación</h4>
        <div class="input-row">
            <div class="input-box">
                <span>Departamento</span>
                <select id="departamento" name="departamento" required>
                    <option value="">Seleccione un Departamento</option>
                </select>
            </div>
            <div class="input-box">
                <span>Ciudad</span>
                <select id="ciudadId" name="ciudadId" required>
                    <option value="">Seleccione una ciudad</option>
                </select>
            </div>
        </div>

        <!-- Sección de ubicación en mapa -->
        <div class="input-box full-width">
            <span>Ubicación en el Mapa</span>
            <p style="color: #666; font-size: 0.9em; margin: 5px 0;">Haga clic en el mapa para actualizar la ubicación exacta de su entidad</p>
            <div id="edit-map-container" style="height: 300px; margin: 10px 0;">
                <div id="edit-location-map" style="width: 100%; height: 100%;"></div>
            </div>
            
            <div class="coordinates-row">
                <div class="coordinate-input">
                    <label for="editLatitud">Latitud:</label>
                    <input type="number" id="editLatitud" name="latitud" step="any" placeholder="Latitud" readonly style="background-color: #f5f5f5;">
                </div>
                <div class="coordinate-input">
                    <label for="editLongitud">Longitud:</label>
                    <input type="number" id="editLongitud" name="longitud" step="any" placeholder="Longitud" readonly style="background-color: #f5f5f5;">
                </div>
            </div>
            
            <div class="map-buttons">
                <button type="button" class="map-btn primary" onclick="if(editMap) editMap.invalidateSize();">🔄 Reinicializar Mapa</button>
                <button type="button" class="map-btn danger" onclick="document.getElementById('editLatitud').value=''; document.getElementById('editLongitud').value=''; if(editMarker && editMap) { editMap.removeLayer(editMarker); editMarker = null; }">🗑️ Limpiar Ubicación</button>
            </div>
            
            <small style="color: #666;">Las coordenadas se actualizarán al hacer clic en el mapa</small>
        </div>
    </div>

    <!-- Archivo de logo -->
    <div class="form-section">
        <h4>Logo de la Entidad</h4>
        
        <!-- Logo actual -->
        <div class="input-row">
            <div class="input-box">
                <span>Logo Actual</span>
                <div class="logo-preview-container" style="text-align: center; padding: 15px; border: 2px dashed #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <img id="currentLogo" src="" alt="Logo actual" 
                         style="max-width: 150px; max-height: 100px; object-fit: contain; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div id="noLogoText" style="display: none; color: #666; font-style: italic;">Sin logo configurado</div>
                </div>
            </div>
            
            <div class="input-box">
                <span>Nuevo Logo (Opcional)</span>
                <div class="logo-upload-container">
                    <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/jpg" 
                           style="margin-bottom: 10px;">
                    <div id="logoPreview" style="display: none; text-align: center; padding: 10px; border: 2px solid #007bff; border-radius: 8px; background-color: #f8f9fa;">
                        <img id="previewImage" src="" alt="Vista previa" 
                             style="max-width: 120px; max-height: 80px; object-fit: contain; border-radius: 4px;">
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Vista previa del nuevo logo</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="input-row">
            <div class="input-box full-width">
                <small style="color: #666; font-size: 12px;">
                    • Formatos soportados: PNG, JPG, JPEG<br>
                    • Tamaño recomendado: máximo 2MB<br>
                    • Dimensiones recomendadas: 400x300 píxeles o proporcional
                </small>
            </div>
        </div>
    </div>

    <!-- Redes sociales -->
    <div class="form-section">
        <h4>Redes Sociales</h4>
        <div class="input-row">
            <div class="input-box">
                <span>Facebook</span>
                <input type="url" id="facebook" name="facebook" placeholder="Ingrese la URL de Facebook">
            </div>
            <div class="input-box">
                <span>Instagram</span>
                <input type="url" id="instagram" name="instagram" placeholder="Ingrese la URL de Instagram">
            </div>
        </div>
        <div class="input-box full-width">
            <span>Página Web</span>
            <input type="url" id="paginaweb" name="paginaweb" placeholder="Ingrese la URL de la página web">
        </div>
    </div>
    `;
}

// Función para configurar el formulario con los datos
async function configurarFormulario() {
    // Agregar opciones dinámicas
    agregarCargos();
    agregarDepartamentos();
    
    // Event listener para cambio de departamento
    document.getElementById('departamento').addEventListener('change', (event) => {
        const departmentId = event.target.value;
        const selectedOption = event.target.options[event.target.selectedIndex];
        const latitud = selectedOption.dataset.latitud;
        const longitud = selectedOption.dataset.longitud;
        console.log('Coordenadas seleccionadas - Latitud:', latitud, 'Longitud:', longitud);
        if (editMap) {
            editMap.setView([latitud, longitud], 8);
        }
        if (departmentId) {
            agregarMunicipiosEditar(departmentId);
        }
    });

    // Rellenar campos con datos de la entidad
    document.getElementById('ID').value = miEmpresa.id;
    document.getElementById('razonSocial').value = miEmpresa.razonSocial;
    document.getElementById('numIdentificacion').value = miEmpresa.numIdentificacion;
    document.getElementById('tipoEntidad').value = miEmpresa.tipoEntidad;
    document.getElementById('claseEntidad').value = miEmpresa.claseEntidad;
    document.getElementById('naturalezaJuridica').value = miEmpresa.naturalezaJuridica;
    document.getElementById('actividadEconomica').value = miEmpresa.actividadEconomica;
    document.getElementById('correo').value = miEmpresa.correo;
    document.getElementById('telefono').value = miEmpresa.telefono;
    
    const fechaISO = new Date(miEmpresa.fechaConstitucion);
    const fechaFormateada = fechaISO.toISOString().split('T')[0];
    document.getElementById('fechaConstitucion').value = fechaFormateada;
    
    document.getElementById('direccion').value = miEmpresa.direccion;
    document.getElementById('UserAdminId').value = miEmpresa.UserAdminId || '';
    document.getElementById('facebook').value = miEmpresa.facebook;
    document.getElementById('instagram').value = miEmpresa.instagram;
    document.getElementById('paginaweb').value = miEmpresa.paginaweb;
    
    // Cargar logo actual
    if (miEmpresa.logo) {
        const currentLogoImg = document.getElementById('currentLogo');
        const noLogoText = document.getElementById('noLogoText');
        currentLogoImg.src = `/logos/${miEmpresa.logo}`;
        currentLogoImg.style.display = 'block';
        noLogoText.style.display = 'none';
    } else {
        document.getElementById('currentLogo').style.display = 'none';
        document.getElementById('noLogoText').style.display = 'block';
    }
    
    // Agregar preview para nuevo logo
    document.getElementById('logo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('logoPreview');
        const previewImage = document.getElementById('previewImage');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
    });
    
    // Cargar contacto y usuarios administradores
    cargarContacto();
      async function cargarContacto() {

        const contacto = await fetch(`/api/contactos/${miEmpresa.contactoId}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching contacto:', error));

        if (contacto) {
            document.getElementById('nombreContacto').value = contacto.nombre || '';
            // document.getElementById('cargoPersona').value = contacto.cargoId || '';
            document.getElementById('correoContacto').value = contacto.email || '';
            document.getElementById('telefonoContacto').value = contacto.telefono || '';
        }
    }
    cargarUsuariosAdmin();
    
    // Configurar ubicación
    const departamentoId = await asignarDepartamento();
    await agregarMunicipiosEditar(departamentoId);
    document.getElementById('ciudadId').value = miEmpresa.ciudadId;
}

// Event listener para el botón de editar (reemplaza el anterior)
document.addEventListener('DOMContentLoaded', function() {
    // Si existe un botón con ID "editarEntidad", agregar el event listener
    const btnEditar = document.getElementById("editarEntidad");
    if (btnEditar) {
        btnEditar.addEventListener("click", async () => {
            const usuario = obtenerCookie("userId");
            let cleanedStr = usuario.replace(/%20/g, " ");
            let idlimpia = decodeURIComponent(cleanedStr);
            
            if (typeof todasLasEmpresas !== 'undefined') {
                const empresa = buscarPorUserId(parseInt(idlimpia, 10));
                if (empresa) {
                    await abrirModalEditarEntidad(empresa.id);
                }
            } else {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/entidad/verificar-entidad/${idlimpia}`);
                    const data = await response.json();
                    if (data.success && data.entidad) {
                        await abrirModalEditarEntidad(data.entidad.id);
                    }
                } catch (error) {
                    console.error('Error al obtener datos de la entidad:', error);
                }
            }
        });
    }
});

// Función para cerrar el modal
document.getElementById("cerrarModalEditar").addEventListener("click", () => {
    cerrarModalEdicion();
});

// Event listener para el botón X del modal
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'cerrarModalEditarX') {
        cerrarModalEdicion();
    }
});

// Función centralizada para cerrar el modal
function cerrarModalEdicion() {
    const modalEditar = document.getElementById('modalEditar');
    const overlay = document.querySelector('.overlay') || document.getElementById('overlay');
    
    if (modalEditar) {
        modalEditar.style.display = 'none';
    }
    
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Limpiar mapa si existe
    if (editMap) {
        editMap.remove();
        editMap = null;
        editMarker = null;
    }
}

// Mantener el resto de las funciones existentes...
const buscarPorUserId = (id) => {
    if (typeof todasLasEmpresas !== 'undefined' && Array.isArray(todasLasEmpresas)) {
        return todasLasEmpresas.find(empresa => empresa.UserAdminId === id);
    } else {
        console.warn('Variable todasLasEmpresas no está definida');
        return null;
    }
};

async function asignarDepartamento() {
    console.log(miEmpresa.ciudadId);
    fetch(`/api/ciudades/ciudad/${miEmpresa.ciudadId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.ciudad.departamentoId);
            const departamentoId = data.ciudad.departamentoId;
            document.getElementById('departamento').value = departamentoId;
            agregarMunicipiosEditar(departamentoId);

        })
        .catch(error => console.error('Error fetching departamentoId:', error));


}

async function agregarMunicipiosEditar(departmentId) {
    const municipios = await obtenerMunicipiosPorDepartamento(departmentId);  // Obtener los municipios del departamento

    const municipioSelect = document.getElementById('ciudadId');  // Asumimos que tienes un select con id 'municipio'

    // Limpiar el select de municipios antes de agregar nuevas opciones
    municipioSelect.innerHTML = '';  // Elimina las opciones existentes

    if (municipioSelect && municipios && municipios.length > 0) {
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.id;  // Usamos el id del municipio como valor

            option.textContent = municipio.nombre;  // El nombre del municipio como texto
            municipioSelect.appendChild(option);
        });
        municipioSelect.value = miEmpresa.ciudadId; // Asignar el valor del municipio actual
    } else {
        console.warn('No se encontraron municipios para este departamento.');
    }
}

async function agregarDepartamentos() {
    const departamentos = await obtenerDepartamentosColombia();  // Ahora recibimos los datos correctamente
    // console.log(departamentos.departamentos);
    const depSelect = document.getElementById('departamento');  // Asumimos que tienes un select con id 'departamento'

    if (depSelect && departamentos && departamentos.length > 0) {
        departamentos.forEach(dep => {
            // console.log(dep);
            const option = document.createElement('option');
            option.value = dep.id;  // Aquí usamos 'id' como el valor del option
            option.textContent = dep.nombre;  // El nombre del departamento será el texto mostrado
            option.dataset.latitud = dep.latitud;
            option.dataset.longitud = dep.longitud;
            depSelect.appendChild(option);
        })
        asignarDepartamento();;
    } else {
        console.warn('No se encontraron Departamentos para cargar.');
    }

}

// ============================================
// FUNCIÓN PARA CARGAR USUARIOS ADMINISTRADORES
// ============================================

async function cargarUsuariosAdmin() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/usuarioempresa/empresa/${miEmpresa.id}`);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        
        const usuarios = await response.json();
        console.log('Usuarios administradores obtenidos:', usuarios);
        const userAdminSelect = document.getElementById('UserAdminId');
        
        if (userAdminSelect && usuarios && usuarios.length > 0) {
            // Limpiar opciones existentes (excepto la primera)
            userAdminSelect.innerHTML = '<option value="">Seleccione un usuario administrador</option>';
            
            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.userId;
                option.textContent = `${usuario.User.name} (${usuario.User.email})`;
                userAdminSelect.appendChild(option);
            });
            
            // Establecer el valor actual
            userAdminSelect.value = miEmpresa.UserAdminId || '';
            
            // Cargar información del admin actual
            if (miEmpresa.UserAdminId) {
                cargarInfoAdminActual(miEmpresa.UserAdminId);
            }
            
            // Agregar event listener para cambios en el select
            userAdminSelect.addEventListener('change', function() {
                const selectedUserId = this.value;
                if (selectedUserId) {
                    const selectedOption = this.options[this.selectedIndex];
                    document.getElementById('adminActual').value = selectedOption.textContent;
                } else {
                    document.getElementById('adminActual').value = 'Ningún admin seleccionado';
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'No se pudieron cargar los usuarios disponibles'
        });
    }
}

async function cargarInfoAdminActual(adminId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user/${adminId}`);
        if (response.ok) {
            const admin = await response.json();
            document.getElementById('adminActual').value = `${admin.name} (${admin.email})`;
        } else {
            document.getElementById('adminActual').value = 'Admin no encontrado';
        }
    } catch (error) {
        console.error('Error al cargar info del admin:', error);
        document.getElementById('adminActual').value = 'Error al cargar admin';
    }
}

// ============================================
// FUNCIONES DEL MAPA PARA EDICIÓN
// ============================================

function initEditMap() {
    const mapElement = document.getElementById('edit-location-map');
    if (!mapElement) {
        console.error('Elemento del mapa de edición no encontrado');
        return;
    }

    // Coordenadas de Bucaramanga por defecto
    const defaultLat = 7.1193;
    const defaultLng = -73.1227;

    // Inicializar el mapa
    editMap = L.map('edit-location-map').setView([defaultLat, defaultLng], 13);

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(editMap);

    // Evento para capturar clics en el mapa
    editMap.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Actualizar los campos de coordenadas
        document.getElementById('editLatitud').value = lat.toFixed(6);
        document.getElementById('editLongitud').value = lng.toFixed(6);

        // Remover marcador anterior si existe
        if (editMarker) {
            editMap.removeLayer(editMarker);
        }

        // Agregar nuevo marcador
        editMarker = L.marker([lat, lng], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }).addTo(editMap);

        editMarker.bindPopup(`
            <div style="text-align: center;">
                <strong>📍 Nueva Ubicación</strong><br>
                <small>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</small>
            </div>
        `).openPopup();

        // Actualizar estilo de los inputs
        const latInput = document.getElementById('editLatitud');
        const lngInput = document.getElementById('editLongitud');
        if (latInput && lngInput) {
            latInput.style.backgroundColor = '#fff3cd';
            latInput.style.border = '2px solid #ffc107';
            lngInput.style.backgroundColor = '#fff3cd';
            lngInput.style.border = '2px solid #ffc107';
        }

        // Mostrar notificación
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'info',
                title: 'Ubicación actualizada',
                text: `Nuevas coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    });

    // Redimensionar el mapa
    setTimeout(() => {
        editMap.invalidateSize();
    }, 100);
}

async function cargarUbicacionActual() {
    if (!miEmpresa || !miEmpresa.id) {
        console.warn('⚠️ No hay empresa seleccionada para cargar ubicación');
        return;
    }

    try {
        console.log('🔍 Buscando ubicación para entidad ID:', miEmpresa.id);
        
        // Verificar que API_BASE_URL esté definida
        if (typeof API_BASE_URL === 'undefined') {
            console.error('❌ API_BASE_URL no está definida');
            return;
        }
        
        const response = await fetch(`${API_BASE_URL}/api/ubicacion-entidad/entidad/${miEmpresa.id}`);
        
        if (response.ok) {
            const ubicaciones = await response.json();
            console.log('📍 Ubicaciones encontradas:', ubicaciones);
            
            if (ubicaciones && ubicaciones.length > 0) {
                // Tomar la primera ubicación activa
                ubicacionActual = ubicaciones.find(ub => ub.activa) || ubicaciones[0];
                
                if (ubicacionActual) {
                    const lat = parseFloat(ubicacionActual.latitud);
                    const lng = parseFloat(ubicacionActual.longitud);
                    
                    // Actualizar campos
                    document.getElementById('editLatitud').value = lat.toFixed(6);
                    document.getElementById('editLongitud').value = lng.toFixed(6);
                    
                    // Centrar el mapa en la ubicación actual
                    if (editMap) {
                        editMap.setView([lat, lng], 15);
                        
                        // Agregar marcador para la ubicación actual
                        editMarker = L.marker([lat, lng], {
                            icon: L.icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            })
                        }).addTo(editMap);

                        editMarker.bindPopup(`
                            <div style="text-align: center;">
                                <strong>📍 Ubicación Actual</strong><br>
                                <small>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</small><br>
                                <em>Haga clic en el mapa para cambiar</em>
                            </div>
                        `);
                        
                        // Estilo para indicar ubicación actual
                        const latInput = document.getElementById('editLatitud');
                        const lngInput = document.getElementById('editLongitud');
                        if (latInput && lngInput) {
                            latInput.style.backgroundColor = '#d4edda';
                            latInput.style.border = '2px solid #28a745';
                            lngInput.style.backgroundColor = '#d4edda';
                            lngInput.style.border = '2px solid #28a745';
                        }
                    }
                    
                    console.log('✅ Ubicación actual cargada:', lat, lng);
                } else {
                    console.log('📍 No hay ubicaciones activas');
                }
            } else {
                console.log('📍 No se encontraron ubicaciones para esta entidad');
            }
        } else {
            console.log('📍 No se pudo obtener ubicación:', response.status);
        }
    } catch (error) {
        console.error('❌ Error al cargar ubicación actual:', error);
    }
}

// ============================================
// MANEJO DE ACTUALIZACIÓN DE ENTIDAD
// ============================================

async function actualizarEntidadConUbicacion() {
    try {
        console.log('🔄 Iniciando actualización de entidad...');
        console.log('📊 ID de empresa:', miEmpresaID);
        
        // Verificar que API_BASE_URL esté definida
        if (typeof API_BASE_URL === 'undefined') {
            throw new Error('API_BASE_URL no está definida. Verifique la configuración.');
        }
        
        console.log('📊 URL que se usará:', `${API_BASE_URL}/api/entidad/editar/${miEmpresaID}`);
        
        // Recopilar datos del formulario
        const formData = new FormData();
        
        // Datos básicos de la entidad
        formData.append('id', document.getElementById('ID').value);
        formData.append('claseEntidad', document.getElementById('claseEntidad').value);
        formData.append('razonSocial', document.getElementById('razonSocial').value);
        formData.append('numIdentificacion', document.getElementById('numIdentificacion').value);
        formData.append('tipoEntidad', document.getElementById('tipoEntidad').value);
        formData.append('naturalezaJuridica', document.getElementById('naturalezaJuridica').value);
        formData.append('actividadEconomica', document.getElementById('actividadEconomica').value);
        formData.append('correo', document.getElementById('correo').value);
        formData.append('telefono', document.getElementById('telefono').value);
        formData.append('fechaConstitucion', document.getElementById('fechaConstitucion').value);
        formData.append('ciudadId', document.getElementById('ciudadId').value);
        formData.append('direccion', document.getElementById('direccion').value);
        formData.append('facebook', document.getElementById('facebook').value || '');
        formData.append('instagram', document.getElementById('instagram').value || '');
        formData.append('paginaweb', document.getElementById('paginaweb').value || '');
        formData.append('UserAdminId', document.getElementById('UserAdminId').value);
        
        // // Datos de contacto
        // formData.append('nombreContacto', document.getElementById('nombreContacto').value);
        // formData.append('cargoPersona', document.getElementById('cargoPersona').value);
        // formData.append('correoContacto', document.getElementById('correoContacto').value);
        // formData.append('telefonoContacto', document.getElementById('telefonoContacto').value);
        
        // Manejo del logo
        const logoFile = document.getElementById('logo').files[0];
        if (logoFile) {
            formData.append('logo', logoFile);
        }
        
        // Mostrar mensaje de carga
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Actualizando entidad...',
                text: 'Por favor espere mientras se actualiza la información',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });
        }
        
        // Actualizar entidad principal
        const response = await fetch(`${API_BASE_URL}/api/entidad/editar/${miEmpresaID}`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar entidad: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log('✅ Entidad actualizada:', result);
        
        // Actualizar ubicación si hay coordenadas
        const latitud = document.getElementById('editLatitud').value;
        const longitud = document.getElementById('editLongitud').value;
        
        if (latitud && longitud && latitud !== '' && longitud !== '') {
            await actualizarUbicacionEntidad(latitud, longitud);
        }
        
        // Mostrar mensaje de éxito
        if (typeof Swal !== 'undefined') {
            await Swal.fire({
                icon: 'success',
                title: '¡Entidad actualizada!',
                text: 'La información de la entidad se ha actualizado correctamente',
                timer: 3000,
                showConfirmButton: false
            });
        }
        
        // Cerrar modal y recargar datos
        document.getElementById('modalEditar').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
        
        // Recargar la página o actualizar datos
        if (typeof cargarEntidades === 'function') {
            await cargarEntidades();
        } else {
            location.reload();
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar entidad:', error);
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'Hubo un problema al actualizar la entidad. Por favor intente de nuevo.',
                confirmButtonText: 'OK'
            });
        } else {
            alert('Error al actualizar la entidad. Por favor intente de nuevo.');
        }
    }
}

async function actualizarUbicacionEntidad(latitud, longitud) {
    try {
        console.log('🗺️ Actualizando ubicación...', latitud, longitud);
        
        const ubicacionData = {
            entidadId: miEmpresaID,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            activa: true
        };
        
        // Si ya existe una ubicación, la actualizamos; si no, la creamos
        if (ubicacionActual && ubicacionActual.id) {
            // Actualizar ubicación existente
            const response = await fetch(`${API_BASE_URL}/api/ubicacion-entidad/${ubicacionActual.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ubicacionData)
            });
            
            if (response.ok) {
                console.log('✅ Ubicación actualizada correctamente');
            } else {
                console.warn('⚠️ Error al actualizar ubicación:', response.status);
            }
        } else {
            // Crear nueva ubicación
            const response = await fetch(`${API_BASE_URL}/api/ubicacion-entidad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ubicacionData)
            });
            
            if (response.ok) {
                const nuevaUbicacion = await response.json();
                ubicacionActual = nuevaUbicacion;
                console.log('✅ Nueva ubicación creada correctamente');
            } else {
                console.warn('⚠️ Error al crear ubicación:', response.status);
            }
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar ubicación:', error);
        // No bloqueamos la actualización de la entidad por un error de ubicación
    }
}