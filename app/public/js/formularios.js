// Función para cambiar el formulario según el tipo de entidad
function cargarFormulario() {
    const userDetailsContainer = document.getElementById('datos-entidad-crear');

    userDetailsContainer.innerHTML = `
        <!-- Datos del Actor -->
        <div class="form-section">
            <h3 class="section-title">Datos del Actor</h3>
            
            <div class="input-row">
                <div class="input-box">
                    <label for="claseEntidad">Clase de Entidad</label>
                    <select id="claseEntidad" name="claseEntidad" required>
                        <option value="Empresa">Empresa</option>
                        <option value="Estado">Estado</option>
                        <option value="Sociedad">Sociedad</option>
                        <option value="Academia">Academia</option>
                    </select>
                </div>

                <div class="input-box">
                    <label for="razonSocial">Razón Social</label>
                    <input type="text" id="razonSocial" name="razonSocial" placeholder="Ingrese la razón social" required>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="numIdentificacion">Número de Identificación</label>
                    <input type="text" id="numIdentificacion" name="numIdentificacion" placeholder="Ingrese el número de identificación" required>
                </div>

                <div class="input-box">
                    <label for="tipoEntidad">Tipo de Entidad</label>
                    <select id="tipoEntidad" name="tipoEntidad" required>
                        <option value="Sociedad Anónima">Sociedad Anónima</option>
                        <option value="Sociedad Limitada">Sociedad Limitada</option>
                        <option value="Persona Natural">Persona Natural</option>
                    </select>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="naturalezaJuridica">Naturaleza Jurídica</label>
                    <select id="naturalezaJuridica" name="naturalezaJuridica" required>
                        <option value="Privada">Privada</option>
                        <option value="Pública">Pública</option>
                        <option value="Mixta">Mixta</option>
                    </select>
                </div>

                <div class="input-box">
                    <label for="actividadEconomica">Actividad Económica</label>
                    <input type="text" id="actividadEconomica" name="actividadEconomica" placeholder="Ingrese la actividad económica" required>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="correo">Correo de Contacto</label>
                    <input type="email" id="correo" name="correo" placeholder="Ingrese el correo de la entidad" required>
                </div>

                <div class="input-box">
                    <label for="telefono">Teléfono de Contacto</label>
                    <input type="tel" id="telefono" name="telefono" placeholder="Ingrese el teléfono de contacto" required>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="fechaConstitucion">Fecha de Constitución</label>
                    <input type="date" id="fechaConstitucion" name="fechaConstitucion" required>
                </div>

                <div class="input-box">
                    <label for="logo">LOGO Selecciona un archivo (PNG, JPG, JPEG):</label>
                    <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/jpg" required>
                </div>
            </div>
        </div>

        <!-- Ubicación -->
        <div class="form-section">
            <h3 class="section-title">Ubicación</h3>
            
            <div class="input-row">
                <div class="input-box">
                    <label for="departamento">Departamento</label>
                    <select id="departamento" name="departamento" required>
                        <option value="">Seleccione un Departamento</option>
                        <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                    </select>
                </div>

                <div class="input-box">
                    <label for="ciudadId">Ciudad</label>
                    <select id="ciudadId" name="ciudadId" required>
                        <option value="">Seleccione una ciudad</option>
                        <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                    </select>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box full-width">
                    <label for="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" placeholder="Ingrese la dirección" required>
                </div>
            </div>

            <!-- Sección de ubicación en mapa -->
            <div class="input-row">
                <div class="input-box full-width">
                    <label>Ubicación en el Mapa</label>
                    <p style="color: #666; font-size: 0.9em; margin: 5px 0;">Haga clic en el mapa para seleccionar la ubicación exacta de su entidad</p>
                    <div id="map-container" style="height: 300px; border: 1px solid #ddd; border-radius: 5px; margin: 10px 0;">
                        <div id="location-map" style="width: 100%; height: 100%;"></div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <div style="flex: 1;">
                            <label for="latitud">Latitud:</label>
                            <input type="number" id="latitud" name="latitud" step="any" placeholder="Latitud" readonly style="background-color: #f5f5f5;">
                        </div>
                        <div style="flex: 1;">
                            <label for="longitud">Longitud:</label>
                            <input type="number" id="longitud" name="longitud" step="any" placeholder="Longitud" readonly style="background-color: #f5f5f5;">
                        </div>
                    </div>
                    <small style="color: #666;">Las coordenadas se establecerán automáticamente al hacer clic en el mapa</small>
                </div>
            </div>
        </div>

        <!-- Redes Sociales -->
        <div class="form-section">
            <h3 class="section-title">Redes Sociales</h3>
            
            <div class="input-row">
                <div class="input-box">
                    <label for="facebook">Facebook</label>
                    <input type="url" id="facebook" name="facebook" placeholder="Ingrese la URL de Facebook">
                </div>

                <div class="input-box">
                    <label for="instagram">Instagram</label>
                    <input type="url" id="instagram" name="instagram" placeholder="Ingrese la URL de Instagram">
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="paginaweb">Página Web</label>
                    <input type="url" id="paginaweb" name="paginaweb" placeholder="Ingrese la URL de la página web">
                </div>
            </div>
        </div>

        <!-- Datos del Contacto -->
        <div class="form-section">
            <h3 class="section-title">Datos de Contacto</h3>
            
            <div class="input-row">
                <div class="input-box">
                    <label for="nombreContacto">Nombre Completo del Contacto</label>
                    <input type="text" id="nombreContacto" name="nombreContacto" placeholder="Ingrese el nombre completo">
                </div>

                <div class="input-box">
                    <label for="correoContacto">Correo Electrónico del Contacto</label>
                    <input type="email" id="correoContacto" name="correoContacto" placeholder="Ingrese el correo del contacto">
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="telefonoContacto">Teléfono de Contacto</label>
                    <input type="tel" id="telefonoContacto" name="telefonoContacto" placeholder="Ingrese el número de teléfono">
                </div>

                <div class="input-box">
                    <label for="cargoPersona">Cargo</label>
                    <select id="cargoPersona" name="cargoId">
                        <option value="">Seleccione un cargo</option>
                        <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                    </select>
                </div>
            </div>

            <div class="input-row">
                <div class="input-box">
                    <label for="cargoPersonaNuevo">Nuevo Cargo</label>
                    <input type="text" id="cargoPersonaNuevo" name="cargoPersonaNuevo" placeholder="Ingrese el nuevo cargo">
                </div>
                <div class="input-box" style="display: flex; align-items: end;">
                    <button type="button" class="btn btn-secondary" id="crearCargoButton">Crear Cargo</button>
                </div>
            </div>
        </div>

         

        `;

    agregarCargos();
    agregarDepartamentosCrear();
    document.getElementById('departamento').addEventListener('change', (event) => {
        const departmentId = event.target.value;  // Obtenemos el ID del departamento seleccionado
        if (departmentId) {
            agregarMunicipios(departmentId);  // Llamamos a la función para cargar los municipios
        }
    });

    // Inicializar el mapa después de cargar el formulario
    initMapAfterFormLoad();

    crearCargoButton.addEventListener('click', async () => {
        const nuevoCargo = document.getElementById('cargoPersonaNuevo').value;
        if (!nuevoCargo) {
            Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor ingrese el nombre del cargo antes de crearlo.',
            });
            return;
        }
        const response = await crearCargo(nuevoCargo);
        console.log(response);
        console.log('Respuesta del servidor:', response);
        if (response.success) {
            alert('Cargo creado con éxito');
                agregarCargos();

        } else {
            alert(response.mensaje);
        }}
    );




}
    const crearCargoVincularButton = document.getElementById('crearCargoVincularButton');
    if (crearCargoVincularButton) {
        console.log('Botón de crear cargo vincular encontrado');
        crearCargoVincularButton.addEventListener('click', async () => {
      const nuevoCargo = document.getElementById('cargoPersonaNuevoVincular').value;
      console.log(nuevoCargo);
        if (!nuevoCargo) {
            Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor ingrese el nombre del cargo antes de crearlo.',
            });
            return;
        }
        const response = await crearCargo(nuevoCargo);
        console.log(response);
        if (response.success) {
            alert('Cargo creado con éxito');
agregarCargosUnir()
        } else {
            alert(response.mensaje);
        }
        });
    }
async function agregarMunicipios(departmentId) {
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
    } else {
        console.warn('No se encontraron municipios para este departamento.');
    }
}

async function agregarCargos() {
    const cargos = await cargarCargos(); // Ahora recibimos los datos correctamente


    const cargoSelect = document.getElementById('cargoPersona');

    if (cargoSelect && cargos && typeof cargos === 'object' && Object.keys(cargos).length > 0) {
        // Limpiar el select de cargos antes de agregar nuevas opciones
        console.log(cargos);
        cargoSelect.innerHTML = '';  // Elimina las opciones existentes
        Object.keys(cargos).forEach(cargoKey => {
            const option = document.createElement('option');
            option.value = cargos[cargoKey].id;
            option.textContent = cargos[cargoKey].nombre;
            cargoSelect.appendChild(option);
        });
    } else {
        console.warn('No se encontraron cargos para cargar.');
    }

}

// Función para agregar los departamentos al select
async function agregarDepartamentosCrear() {
    const departamentos = await obtenerDepartamentosColombia();  // Ahora recibimos los datos correctamente
// console.log(departamentos.departamentos);
    const depSelect = document.getElementById('departamento');  // Asumimos que tienes un select con id 'departamento'

    if (depSelect && departamentos && departamentos.length > 0) {
        departamentos.forEach(dep => {
            // console.log(dep);
            const option = document.createElement('option');
            option.value = dep.id;  // Aquí usamos 'id' como el valor del option
            option.textContent = dep.nombre;  // El nombre del departamento será el texto mostrado
            depSelect.appendChild(option);
        })
    } else {
        console.warn('No se encontraron Departamentos para cargar.');
    }

}




async function crearCargo(cargo) {
    try {
        const response = await fetch('/api/cargos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: cargo }),
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        if (response.ok) {
            return { success: true, data };
        } else {
                       

            return { success: false, mensaje: data.message || 'Error al crear eee el cargo' };
        }
    } catch (error) {
        console.error('Error al creardddd el cargo:', error);
        return { success: false, mensaje: 'Error al crear dddd el cargo' };
    }
}

// Variables globales para el mapa
let locationMap;
let locationMarker;

// Función para inicializar el mapa de ubicación
function initLocationMap() {
    // Verificar si el elemento del mapa existe
    const mapElement = document.getElementById('location-map');
    if (!mapElement) {
        console.log('Elemento del mapa no encontrado');
        return;
    }

    // Coordenadas de Bucaramanga por defecto
    const defaultLat = 7.1193;
    const defaultLng = -73.1227;

    // Inicializar el mapa
    locationMap = L.map('location-map').setView([defaultLat, defaultLng], 13);

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(locationMap);

    // Evento para capturar clics en el mapa
    locationMap.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Actualizar los campos de coordenadas
        document.getElementById('latitud').value = lat.toFixed(6);
        document.getElementById('longitud').value = lng.toFixed(6);

        // Remover marcador anterior si existe
        if (locationMarker) {
            locationMap.removeLayer(locationMarker);
        }

        // Agregar nuevo marcador
        locationMarker = L.marker([lat, lng], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }).addTo(locationMap);

        locationMarker.bindPopup(`
            <div style="text-align: center;">
                <strong>Ubicación Seleccionada</strong><br>
                <small>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</small>
            </div>
        `).openPopup();

        // Actualizar el estilo de los inputs de coordenadas para mostrar que tienen valor
        const latInput = document.getElementById('latitud');
        const lngInput = document.getElementById('longitud');
        if (latInput && lngInput) {
            latInput.style.backgroundColor = '#e8f5e8';
            latInput.style.border = '2px solid #28a745';
            lngInput.style.backgroundColor = '#e8f5e8';
            lngInput.style.border = '2px solid #28a745';
        }

        // Mostrar notificación de éxito
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Ubicación seleccionada',
                text: `Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    });

    // Invalidar el tamaño del mapa cuando se muestre
    setTimeout(() => {
        locationMap.invalidateSize();
    }, 100);
}

// Función para ser llamada cuando se carga el formulario
function initMapAfterFormLoad() {
    // Esperar un poco para asegurar que el DOM esté listo
    setTimeout(() => {
        initLocationMap();
    }, 200);
}

// Función para redimensionar el mapa cuando el modal se abre
function resizeMapOnModalShow() {
    if (locationMap) {
        setTimeout(() => {
            locationMap.invalidateSize();
        }, 300);
    }
}

// Agregar listener para cuando se abre el modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const crearEntidadBtn = document.getElementById('crearEntidad');
    
    if (crearEntidadBtn) {
        crearEntidadBtn.addEventListener('click', function() {
            // Cargar el formulario y luego inicializar el mapa
            cargarFormulario();
            setTimeout(() => {
                resizeMapOnModalShow();
            }, 500);
        });
    }
    
    // Observer para detectar cuando el modal se muestra
    if (modal) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const isVisible = modal.style.display !== 'none' && modal.style.display !== '';
                    if (isVisible && locationMap) {
                        setTimeout(() => {
                            locationMap.invalidateSize();
                        }, 100);
                    }
                }
            });
        });
        
        observer.observe(modal, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});