let empresaC = 0;
let EstadoC = 0;
let SociedadC = 0;
let AcademiaesC = 0;
let todasLasEmpresas = [];


document.addEventListener("DOMContentLoaded", function () {
  // Realizar la petición para obtener las empresas
  fetch(`${API_BASE_URL}/api/entidad/entidadHabilitadas`)
    .then(response => response.json())
    .then(data => {
      if (data.success && data.empresas.length > 0) {
        // Llamamos a la función para cargar las empresas
        todasLasEmpresas = data.empresas; // Guardar todas

        // cargarEmpresas(data.empresas);
      } else {
        console.log(data.mensaje || 'No hay empresas habilitadas.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
});



document.addEventListener('DOMContentLoaded', function () {
  // Abrir modal con info de la empresa
  document.addEventListener('click', function (e) {
    if (e.target && (e.target.classList.contains('botonEntidad') || e.target.id === 'masInformacion')) {
      const id = e.target.dataset.id;
      window.location.href = `/perfilEntidad?id=${id}`;
    }

  });


  // // Cerrar modal al hacer click en la X
  // document.querySelector('.close').onclick = function () {
  //   document.getElementById('empresaModal').style.display = 'none';
  // };

  // // Cerrar modal si se hace click fuera del contenido
  // window.onclick = function (event) {
  //   if (event.target === document.getElementById('empresaModal')) {
  //     document.getElementById('empresaModal').style.display = 'none';
  //   }
  // };
});



// Variables globales
let map;
let markers = [];
let usersData = [];
let filteredUsers = [];
let currentFilter = 'all';


// Inicialización
document.addEventListener('DOMContentLoaded', function () {

  setupEventListeners();
  checkUserSession();
});


//Bienvenido
function checkUserSession() {
  const usuario = obtenerCookie("user");

  if (usuario) {
    let cleanedStr = decodeURIComponent(usuario.replace(/%20/g, " "));
    let nombreUsuario = cleanedStr.split(" ")[0];
    document.getElementById('bienvenido').textContent = `Hola, ${nombreUsuario}`;
  } else {
    document.getElementById('bienvenido').textContent = 'Bienvenido al Mapa';
  }
}


//Obtener Cookie
function obtenerCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function initializeMap() {
  // Inicializar mapa centrado en Colombia
  console.log('🗺️ Inicializando mapa...');
  map = L.map('mapid').setView([4.5709, -74.2973], 6);

  // Agregar capa de mapa
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Personalizar controles
  map.zoomControl.setPosition('topright');
}

async function addColombiaMask() {
  try {
    // GeoJSON mundial (Natural Earth simplificado)
    const url = `${API_BASE_URL}/api/mapa/coordenadas`;
    const world = await fetch(url);
    const worldGeoJSON = await world.json();
    console.log('GeoJSON mundial cargado:', worldGeoJSON.data.geometry, 'features');
    // Busca la feature de Colombia (ISO_A3 = COL o ADMIN = Colombia)
    const colFeature = worldGeoJSON.data.geometry;
    if (!colFeature) {
      console.warn('No se encontró la geometría de Colombia en el GeoJSON.');
      return;
    }

    // Crea un rectángulo grande (mundo) para restarle Colombia
    // Evitamos los polos extremos para mayor estabilidad geométrica
    const worldBBox = [-180, -85, 180, 85];
    const worldPoly = turf.bboxPolygon(worldBBox);

    // Asegura que la geometría de Colombia sea válida (por si viene como MultiPolygon)
    const colGeom = colFeature;
    const colPoly = turf.feature(colGeom);

    // Calcula: máscara = mundo - Colombia
    const maskGeom = turf.difference(worldPoly, colPoly);
    if (!maskGeom) {
      console.warn('No fue posible crear la máscara (difference retornó null).');
      return;
    }

    // Dibuja la máscara (exterior de Colombia en azul)
    const maskLayer = L.geoJSON(maskGeom, {
      pane: 'overlayPane',   // se dibuja sobre los tiles
      interactive: false
    });
    maskLayer.setStyle({
      fillColor: '#a8d5f7',
      fillOpacity: 1,
      stroke: false
    });
    maskLayer.addTo(map);

    // Dibuja la silueta de Colombia encima para resaltarla
    const colombiaOutline = L.geoJSON(colPoly, {
      style: {
        color: '#1f4e79',
        weight: 2,
        fill: false
      }
    }).addTo(map);

    // (Opcional) Enfoca el mapa a Colombia respetando tu lógica de markers
    // Solo si aún no hay markers colocados:
    if (!markers || markers.length === 0) {
      const b = colombiaOutline.getBounds();
      map.fitBounds(b.pad(0.05));
    }
  } catch (e) {
    console.error('Error creando la máscara de Colombia:', e);
  }
}


function loadUsers() {
  console.log('🔄 Cargando entidades desde la API...');
  // Cargar entidades desde la API
  fetch(`${API_BASE_URL}/api/ubicacion-entidad/mapa/entidades`)
    .then(response => {
      console.log('📡 Respuesta de la API:', response.status);
      if (!response.ok) {
        throw new Error('Error al cargar entidades');
      }
      return response.json();
    })
    .then(data => {
      console.log('✅ Entidades cargadas:', data);
      usersData = data;
      filteredUsers = [...usersData];
      updateStatistics();
      populateCityFilter();
      populateDptoFilter();
      populateClaseFilter();
      displayMarkersOnMap();
      displayUsersList();
    })
    .catch(error => {
      console.error('❌ Error:', error);
      console.log('Usando datos de ejemplo debido a un error en la carga de entidades.');
      // Usar datos de ejemplo en caso de error



    });
}

//Actualización de Estadisticas
function updateStatistics() {
  document.getElementById('total-users').textContent = usersData.length;
  document.getElementById('online-users').textContent = usersData.filter(u => u.verificada).length;
  document.getElementById('total-companies').textContent = [...new Set(usersData.map(u => u.claseEntidad))].length;
  document.getElementById('total-cities').textContent = [...new Set(usersData.map(u => u.city))].length;
}

function populateCityFilter() {
  const citySelect = document.getElementById('filter-city');
  const dptoFilter = document.getElementById('filter-dpto').value;

  // Limpiar opciones anteriores
  citySelect.innerHTML = '<option value="">Todas las ciudades</option>';

  // Obtener lista de ciudades según el departamento
  let cities;

  if (dptoFilter === '') {
    // Si no hay departamento seleccionado → mostrar todas las ciudades
    cities = [...new Set(usersData.map(u => u.city || u.Ciudad?.nombre))];
  } else {
    // Si hay departamento seleccionado → mostrar solo las ciudades que pertenecen a ese departamento
    cities = [
      ...new Set(
        usersData
          .filter(u => u.departamento === dptoFilter)
          .map(u => u.city || u.Ciudad?.nombre)
      )
    ];
  }

  // Agregar las opciones filtradas
  cities
    .filter(city => city && city.trim() !== '')
    .sort()
    .forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
}

function populateDptoFilter() {
  const dptos = [...new Set(usersData.map(u => u.departamento))].sort();
  const dptoSelect = document.getElementById('filter-dpto');

  // ✅ Limpiar opciones anteriores
  dptoSelect.innerHTML = '<option value="">Todos los Departamentos</option>';

  // ✅ Evitar añadir valores vacíos o repetidos
  dptos.forEach(dpto => {
    if (dpto && dpto.trim() !== '') {
      const option = document.createElement('option');
      option.value = dpto;
      option.textContent = dpto;
      dptoSelect.appendChild(option);
    }
  });
}


function populateClaseFilter() {
  const clases = [...new Set(usersData.map(u => u.claseEntidad))].sort();
  const claseSelect = document.getElementById('filter-claseEntidad');

  // ✅ Limpiar opciones anteriores
  claseSelect.innerHTML = '<option value="">Todas las Clases</option>';

  // ✅ Evitar añadir valores vacíos o repetidos
  clases.forEach(clases => {
    if (clases && clases.trim() !== '') {
      const option = document.createElement('option');
      option.value = clases;
      option.textContent = clases;
      claseSelect.appendChild(option);
    }
  });
}


function displayMarkersOnMap() {
  // Limpiar marcadores existentes
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  filteredUsers.forEach(user => {
    const marker = createUserMarker(user);
    markers.push(marker);
    marker.addTo(map);
  });

  // // Ajustar vista si hay marcadores
  // if (markers.length > 0) {
  //     const group = new L.featureGroup(markers);
  //     map.fitBounds(group.getBounds().pad(0.1));
  // }
}

function createUserMarker(user) {
  // Crear icono personalizado
  const iconHtml = `
                <div class="marker-entidad" style="
                    width: 40px; 
                    height: 40px; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white; 
                    font-weight: bold; 
                    font-size: 14px;
                    border: 3px solid white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    background: ${getEntityColor(user.claseEntidad)};
                ">
                    ${user.avatar}
                </div>
            `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  const marker = L.marker([user.lat, user.lng], { icon: customIcon });

  // Crear popup personalizado
  const popupContent = createPopupContent(user);
  marker.bindPopup(popupContent, {
    maxWidth: 300,
    className: 'custom-popup'
  });

  // Eventos del marcador
  marker.on('click', () => {
    highlightUser(user.id);
  });

  return marker;
}

function getEntityColor(claseEntidad) {
  const colors = {
    'Empresa': 'linear-gradient(135deg, #3498db, #2980b9)',
    'Academia': 'linear-gradient(135deg, #e74c3c, #c0392b)',
    'Estado': 'linear-gradient(135deg, #27ae60, #219a52)',
    'Sociedad': 'linear-gradient(135deg, #f39c12, #e67e22)'
  };
  return colors[claseEntidad] || 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
}

function createPopupContent(user) {
  const typeLabels = {
    'Empresa': '🏢 Empresa',
    'Academia': '🎓 Academia',
    'Estado': '🏛️ Estado',
    'Sociedad': '💡 Sociedad'
  };

  const statusColor = user.verificada ? '#27ae60' : '#e74c3c';

  return `
          <div class="popup-header">
            <div class="popup-name">${user.name}</div>
            <div class="popup-role">${typeLabels[user.claseEntidad] || '🏢 Entidad'}</div>
          </div>
          <div class="popup-body">
            <div class="popup-info">
              <span class="popup-label">Tipo:</span>
              <span class="popup-value">${user.claseEntidad}</span>
            </div>
            <div class="popup-info">
              <span class="popup-label">Ciudad:</span>
              <span class="popup-value">${user.city}</span>
            </div>
            <div class="popup-info">
              <span class="popup-label">Dirección:</span>
              <span class="popup-value" id="direccion-${user.id}">***</span>
            </div>
            <div class="popup-info">
              <span class="popup-label">Estado:</span>
              <span class="popup-value" style="color: ${statusColor}">
                ● ${user.verificada ? 'Verificada' : 'Sin verificar'}
              </span>
            </div>
            <div class="popup-info">
              <span class="popup-label">Teléfono:</span>
              <span class="popup-value" id="telefono-${user.id}">***</span>
            </div>
            <div class="popup-info">
              <span class="popup-label">Email:</span>
              <span class="popup-value" id="email-${user.id}">***</span>
            </div>
            <div class="popup-actions">
              <button class="popup-btn btn-primary" onclick="mostrarContacto(${user.id}, '${user.direccion || 'No especificada'}', '${user.telefono || 'No disponible'}', '${user.email}')">
                <i class="fas fa-envelope"></i> Contactar
              </button>
              <button class="popup-btn btn-secondary botonEntidad" style="margin-bottom: 0;" data-id="${user.id}">
                Más información
              </button>
            </div>
          </div>
        `;
}

function displayUsersList() {
  const listContent = document.getElementById('users-list-content');
  listContent.innerHTML = ''; // Limpiar contenido previo
  console.log('Mostrando lista de usuarios, total:', filteredUsers);

  if (filteredUsers.length === 0) {
    listContent.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                        <i class="fas fa-search" style="font-size: 2em; margin-bottom: 10px;"></i>
                        <p>No se encontraron entidades con los filtros seleccionados</p>
                    </div>
                `;
    return;
  }

  const usersHtml = filteredUsers.map(user => {
    const typeIcons = {
      'Empresa': '🏢',
      'Academia': '🎓',
      'Estado': '🏛️',
      'Sociedad': '💡'
    };
    console.log('Generando HTML para usuario:', user);
    fetch(`${API_BASE_URL}/api/departamentos/${user.departamentoId}`)

    return `
    <div class="user-item" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
        <div  onclick="focusOnUser(${user.id})" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
          
 <img src="/logos/${user.logo}" alt="Logo Empresa" class="card-icon" onerror="this.onerror=null;this.src='/img/sinlogo.jpg';" style="margin-right: 10px; width: 80px; height: 80px; border-radius: 5px;">
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-details">${typeIcons[user.claseEntidad] || '🏢'} ${user.claseEntidad} - ${user.departamento} • ${user.city}</div>
            <div class="user-details"></div>
            <button class="botonEntidad" data-id="${user.id}">
                Más información
                </button>
          </div>

        </div>
           
        
    </div>    
    


        `;
    // return `
    //     <div class="user-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
    //           <div  onclick="focusOnUser(${user.id})" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
    //                  <img src="/logos/${user.logo}" alt="Logo Empresa" class="card-icon" onerror="this.onerror=null;this.src='/img/sinfoto.jpg';" style="margin-right: 10px;  border-radius: 5px;">

    //                 <div class="user-info">
    //                     <div class="user-name">${typeIcons[user.claseEntidad] || '🏢'} ${user.name}</div>
    //                     <div class="user-details">${user.actividadEconomica} • ${user.claseEntidad}</div>
    //                     <div class="user-details">${user.departamento} • ${user.city}</div>
    //                 </div>

    //           </div>
    //                     <div class="">
    //                           <div class="user-status ${user.verificada ? 'status-online' : 'status-offline'}" style="margin-bottom: 10px;">
    //                               ${user.verificada ? 'Verificada' : 'Sin verificar'}
    //                           </div>
    //                           <button class="botonEntidad " data-id="${user.id}">
    //                             Más información
    //                           </button>
    //                     </div>

    //     </div>    



    //           `;
  }).join('');

  listContent.innerHTML = usersHtml;
  focusOnCity(filteredUsers[0].id);
  focusOnDpto(filteredUsers[0].id);
}

function setupEventListeners() {

  // Botón para reiniciar filtros
  document.getElementById('filter-btn').addEventListener('click', () => {
    console.log('🔄 Reiniciando todos los filtros...');
    document.getElementById('search-user').value = '';
    document.getElementById('filter-dpto').value = '';
    document.getElementById('filter-city').innerHTML = '<option value="">Todas las ciudades</option>';
    document.getElementById('filter-claseEntidad').value = '';

    filteredUsers = [...usersData];

    populateDptoFilter();
    populateCityFilter();
    populateClaseFilter();
    displayMarkersOnMap();
    displayUsersList();
    map.setView([4.5709, -74.2973], 5);
  });

  // Búsqueda por texto
  document.getElementById('search-user').addEventListener('input', applyFilters);

  // Cuando se cambie el departamento → actualizar ciudades y aplicar filtros
  document.getElementById('filter-dpto').addEventListener('change', () => {
    populateCityFilter();  // 🔄 actualizar lista de ciudades
    applyFilters();        // 🔍 aplicar los filtros
  });

  // Cuando se cambie la ciudad → aplicar filtros directamente
  document.getElementById('filter-city').addEventListener('change', applyFilters);


  // Filtro por clase de entidad
  document.getElementById('filter-claseEntidad').addEventListener('change', applyFilters);

  // Cerrar sesión
  document.getElementById('cerrarSesion').addEventListener('click', function () {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "¿Estás seguro que quieres cerrar tu sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCookies();
        window.location.href = '/';
      }
    });
  });
}



function applyFilters() {

  const searchTerm = document.getElementById('search-user').value.toLowerCase();
  const cityFilter = document.getElementById('filter-city').value;
  const dptoFilter = document.getElementById('filter-dpto').value;
  const claseEntidadFilter = document.getElementById('filter-claseEntidad').value;
  console.log('Aplicando filtros:', { currentFilter, searchTerm, cityFilter });


  filteredUsers = usersData.filter(user => {
    // Filtro de tipo
    const typeMatch = currentFilter === 'all';

    // Filtro de búsqueda
    const searchMatch = !searchTerm ||
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.company.toLowerCase().includes(searchTerm);

    // Filtro de ciudad
    const cityMatch = !cityFilter || user.city === cityFilter;

    //filtro de departamento
    const dptoMatch = !dptoFilter || user.departamento === dptoFilter;

    //filtro de departamento
    const claseEntidadMatch = !claseEntidadFilter || user.claseEntidad === claseEntidadFilter;

    return typeMatch && searchMatch && cityMatch && dptoMatch && claseEntidadMatch;
  });

  displayMarkersOnMap();
  displayUsersList();
}

function focusOnUser(userId) {
  console.log('Centrando en usuario ID:', userId);
  const user = usersData.find(u => u.id === userId);
  if (user) {
    map.setView([user.lat, user.lng], 12);

    // Encontrar y abrir el popup del marcador
    const marker = markers.find(m =>
      Math.abs(m.getLatLng().lat - user.lat) < 0.001 &&
      Math.abs(m.getLatLng().lng - user.lng) < 0.001
    );
    if (marker) {
      marker.openPopup();
    }
  }
}

function focusOnCity(userId) {
  console.log('Centrando en usuario ID:', userId);
  const user = usersData.find(u => u.id === userId);
  const cityFilter = document.getElementById('filter-city').value;
  console.log('Ciudad seleccionada:', cityFilter);
  if (cityFilter == '') {
    map.setView([4.5709, -74.2973], 5);
    return;
  }
  if (user) {
    map.setView([user.lat, user.lng], 10);


  }
}

function focusOnDpto(userId) {
  console.log('Centrando en usuario ID:', userId);
  const user = usersData.find(u => u.id === userId);
  const dptoFilter = document.getElementById('filter-dpto').value;
  console.log('Departamento seleccionado:', dptoFilter);
  if (dptoFilter == '') {
    map.setView([4.5709, -74.2973], 5);
    return;
  }
  if (user) {
    map.setView([user.lat, user.lng], 10);


  }
}

function focusOnClaseEntidad(userId) {
  console.log('Centrando en usuario ID:', userId);
  const user = usersData.find(u => u.id === userId);
  const claseEntidadFilter = document.getElementById('filter-claseEntidad').value;
  console.log('Clase Entidad seleccionada:', claseEntidadFilter);
  if (claseEntidadFilter == '') {
    map.setView([4.5709, -74.2973], 5);
    return;
  }
  if (user) {
    map.setView([user.lat, user.lng], 10);


  }
}


function highlightUser(userId) {
  // Resaltar usuario en la lista
  document.querySelectorAll('.user-item').forEach(item => {
    item.style.background = '';
  });

  const userElement = document.querySelector(`[onclick="focusOnUser(${userId})"]`);
  if (userElement) {
    userElement.style.background = '#e3f2fd';
    userElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function contactUser(email) {
  window.location.href = `mailto:${email}?subject=Contacto desde SinAptico&body=Hola, me gustaría ponerme en contacto contigo a través de la plataforma SinAptico.`;
}
