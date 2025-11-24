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
    });
});

// // Función para cargar las empresas dinámicamente
// function cargarEmpresas(empresas) {
//   const listado = document.getElementById('listado');
//   listado.innerHTML = '';  // Limpiar el contenido previo
//   empresaC = 0;
//   EstadoC = 0;
//   SociedadC = 0;
//   AcademiaesC = 0;
//   empresas.forEach(empresa => {
//     if (empresa.habilitado == 1) {

//       const empresaCard = document.createElement('div');
//       empresaCard.classList.add('cardinfo');
//       let rutaCompleta = empresa.logo;
//       empresaCard.innerHTML = `
//             <img src="/logos/${rutaCompleta}" alt="Logo Empresa" class="card-icon" onerror="this.onerror=null;this.src='/img/sinfoto.jpg';">
//             <h3 class="card-title">${empresa.razonSocial}</h3>
//             <p class="card-text">${empresa.actividadEconomica}</p>




//         `;

//       listado.appendChild(empresaCard);

//       switch (empresa.claseEntidad) {
//         case "Empresa":
//           empresaC++;
//           break;
//         case "Sociedad":
//           SociedadC++;
//           break;
//         case "Estado":
//           EstadoC++;
//           break;
//         case "Academia":
//           AcademiaesC++;
//           break;

//         default:
//           break;
//       }

//     }
//   });

//   if (empresas.length == 0) {
//     const empresaCard = document.createElement('div');
//     empresaCard.classList.add('cardinfo');

//     empresaCard.innerHTML = `
//                 <img src="/logos/sindatos.jpg" alt="Logo Empresa" class="card-icon">
//                 <h3 class="card-title">0 entidades </h3>
//             `;
//     listado.appendChild(empresaCard);
//   }

//   // document.getElementById("empresaC").innerText = empresaC;
//   // document.getElementById("SociedadC").innerText = SociedadC;
//   // document.getElementById("EstadoC").innerText = EstadoC;
//   // document.getElementById("AcademiaesC").innerText = AcademiaesC;

// }

document.addEventListener('DOMContentLoaded', function () {
  // Abrir modal con info de la empresa
  document.addEventListener('click', function (e) {
    if (e.target && (e.target.classList.contains('botonPersona') || e.target.id === 'masInformacion')) {
      const id = e.target.dataset.id;
      contactarIntegrante(id, 'Información de Contacto');
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
  fetch(`${API_BASE_URL}/api/user/directorio`)
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
    <div class="user-item" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; cursor: pointer; flex-direction: column; border: 1px solid rgb(236, 240, 241); border-radius: 12px; background-color: white; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px; transition: transform 0.3s, box-shadow 0.3s; transform: translateY(0px);">
        <div class="info-user" onclick="focusOnUser(${user.id})" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
          
 <img src="/photo/${user.fotoPerfil}" alt="foto perfil" class="card-icon" onerror="this.onerror=null;this.src='/photo/sinfoto.jpg';" style="margin-right: 20px; margin-bottom:0; width: 80px; height: 80px; border-radius: 50px; object-fit: cover;">
          <div class="user-info">
            <div class="user-name">${user.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</div>
            <div class="user-details"> ${user.ciudad?.departamento?.nombre || 'Desconocido'} • ${user.ciudad?.nombre || 'Desconocida'}</div>
            <div class="empresa-details"> ${user.UsuarioEmpresaCargos && user.UsuarioEmpresaCargos[0] ? user.UsuarioEmpresaCargos[0].Cargo.nombre : 'Sin cargo'} - ${user.UsuarioEmpresaCargos && user.UsuarioEmpresaCargos[0] ? user.UsuarioEmpresaCargos[0].empresa.razonSocial : 'Sin entidad'}</div>
            <div class="user-details"> Actividad: ${user.UsuarioEmpresaCargos && user.UsuarioEmpresaCargos[0] && user.UsuarioEmpresaCargos[0].empresa.actividadEconomica ? user.UsuarioEmpresaCargos[0].empresa.actividadEconomica : getRandomActivity()}
          </div>
        </div>
            </div>
            <button class="botonPersona" data-id="${user.id}">
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

  // Add hover effects to user items
  document.querySelectorAll('.user-item').forEach(item => {
    item.onmouseenter = function () {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    };

    item.onmouseleave = function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    };
  });
  
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

function viewProfile(userId) {
  const user = usersData.find(u => u.id === userId);
  if (user) {
    Swal.fire({
      title: `Perfil de ${user.name}`,
      html: `
                        <div style="text-align: left;">
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Empresa:</strong> ${user.company}</p>
                            <p><strong>Rol:</strong> ${user.role}</p>
                            <p><strong>Ciudad:</strong> ${user.city}</p>
                            <p><strong>Proyectos:</strong> ${user.projects}</p>
                            <p><strong>Estado:</strong> ${user.status === 'online' ? 'En línea' : 'Desconectado'}</p>
                        </div>
                    `,
      showCancelButton: true,
      confirmButtonText: 'Contactar',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        contactUser(user.email);
      }
    });
  }
}

function getRandomActivity() {
  const activities = [
    'Tecnología y Software',
    'Consultoría Empresarial',
    'Servicios Financieros',
    'Educación y Formación',
    'Salud y Bienestar',
    'Comercio y Retail',
    'Manufactura',
    'Construcción',
    'Transporte y Logística',
    'Turismo y Hospitalidad',
    'Agricultura',
    'Energía y Servicios Públicos',
    'Marketing y Publicidad',
    'Investigación y Desarrollo',
    'Servicios Profesionales'
  ];
  
  return activities[Math.floor(Math.random() * activities.length)];
}

function clearCookies() {
  const cookies = ['user', 'userEmail', 'userId', 'userRole'];
  cookies.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

function mostrarContacto(userId, direccion, telefono, email) {
  // Mostrar la información de contacto en el popup
  document.getElementById(`direccion-${userId}`).textContent = direccion;
  document.getElementById(`telefono-${userId}`).textContent = telefono;
  document.getElementById(`email-${userId}`).textContent = email;

  // Opcional: registrar el contacto o enviar notificación
  const userIdActual = obtenerCookie("userId");
  if (userIdActual) {
    fetch(`${API_BASE_URL}/api/entidad/aumentarContadorContacto/${userId}`, {
      method: 'PUT'
    }).catch(err => console.error('Error al aumentar contador:', err));
  }
}

function contactarIntegrante(userId, userName) {
  // Redirigir al perfil del usuario para contactarlo
  window.location.href = `/perfilUser?id=${userId}`;
}



function llenarFiltros(lista) {
  const filterEntidad = document.getElementById('filter-entidad');
  const filterCargo = document.getElementById('filter-cargo');

  const entidades = [...new Set(lista.map(c => c.empresa?.razonSocial).filter(Boolean))];
  const cargos = [...new Set(lista.map(c => c._cargoNombre).filter(n => n && n !== 'N/A'))];

  filterEntidad.innerHTML = '<option value="">Todas las entidades</option>';
  filterCargo.innerHTML = '<option value="">Todos los cargos</option>';

  entidades.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e;
    opt.textContent = e;
    filterEntidad.appendChild(opt);
  });

  cargos.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterCargo.appendChild(opt);
  });
}

function renderTabla(lista) {
  const tbody = document.getElementById('tablaContactosVerificados');
  tbody.innerHTML = '';

  if (!lista.length) {
    tbody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center;">
        <div style="text-align: center; padding: 40px; color: #7f8c8d;">
          <i class="fas fa-search" style="font-size: 2em; margin-bottom: 10px;"></i>
          <p>No se encontraron usuarios con los filtros seleccionados</p>
        </div>
      </td>
    </tr>
  `;
    return;
  }

  lista.forEach(contacto => {
    const user = contacto?.User ?? {};
    const empresaNombre = contacto?.empresa?.razonSocial ?? '';
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>
                  <div style="position:relative;width:60px;height:60px;">
                    <img src="photo/${user.fotoPerfil || 'img/sinfoto.jpg'}" 
                        alt="Foto" style="width:60px;height:60px;border-radius:50%;object-fit:cover;"
                        onerror="this.onerror=null;this.src='img/sinfoto.jpg';">
                    <i class="bi bi-search"
                      style="position:absolute;bottom:2px;right:2px;font-size:0.9em;color:#007bff;background:white;border-radius:50%;padding:3px;cursor:pointer;"
                      onclick="window.location.href = '/perfilUser?id=${user.id}'"></i>
                  </div>

            </td>
            <td>${user.name ?? ''}</td>
            <td>${contacto._cargoNombre !== 'N/A' ? contacto._cargoNombre : ''}</td>
            <td style="text-align:left;">${empresaNombre}</td>
        `;
    tbody.appendChild(tr);
  });
}

function aplicarFiltros() {
  const nombreFiltro = document.getElementById('filter-nombre').value.toLowerCase();
  const entidadFiltro = document.getElementById('filter-entidad').value;
  const cargoFiltro = document.getElementById('filter-cargo').value;

  const filtrados = listaContactos.filter(c => {
    const user = c.User ?? {};
    const empresa = c.empresa?.razonSocial ?? '';
    const cargo = c._cargoNombre ?? '';

    const matchesNombre =
      !nombreFiltro ||
      user.name?.toLowerCase().includes(nombreFiltro) ||
      empresa.toLowerCase().includes(nombreFiltro);
    const matchesEntidad = !entidadFiltro || empresa === entidadFiltro;
    const matchesCargo = !cargoFiltro || cargo === cargoFiltro;

    return matchesNombre && matchesEntidad && matchesCargo;
  });

  renderTabla(filtrados);
}
// Filtros automáticos
document.getElementById('filter-nombre').addEventListener('input', aplicarFiltros);
document.getElementById('filter-entidad').addEventListener('change', aplicarFiltros);
document.getElementById('filter-cargo').addEventListener('change', aplicarFiltros);

// Botón reset
document.getElementById('filter-contact').addEventListener('click', () => {
  document.getElementById('filter-nombre').value = '';
  document.getElementById('filter-entidad').value = '';
  document.getElementById('filter-cargo').value = '';
  aplicarFiltros();
});
document.getElementById('misContactos').addEventListener('click', () => {
  const modal = document.getElementById('modalMisContactos');
  modal.style.display = 'block';
  cargarContactos(userIdNotify);
});

// Cerrar modal
['cerrarModalMisContactos', 'cerrarModalMisContactosBtn'].forEach(id => {
  document.getElementById(id).onclick = () => {
    document.getElementById('modalMisContactos').style.display = 'none';
  };
});

// Variable global
let listaContactosEspera = [];

// Función para llenar los filtros de la sección "En Espera"
function llenarFiltrosEspera(lista) {
  const filterEntidad = document.getElementById('filterE-entidad');
  const filterCargo = document.getElementById('filterE-cargo');

  // Extraemos entidades y cargos (si existen)
  const entidades = [...new Set(lista.map(c => c.empresa?.razonSocial).filter(Boolean))];
  const cargos = [...new Set(lista.map(c => c._cargoNombre ?? '').filter(c => c && c !== 'N/A'))];

  // Rellenar selects
  filterEntidad.innerHTML = '<option value="">Todas las entidades</option>';
  filterCargo.innerHTML = '<option value="">Todos los cargos</option>';

  entidades.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e;
    opt.textContent = e;
    filterEntidad.appendChild(opt);
  });

  cargos.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterCargo.appendChild(opt);
  });
}

function renderTablaEspera(lista) {
  const tbody = document.getElementById('tablaContactosEspera');
  tbody.innerHTML = '';

  if (!lista.length) {
    tbody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center;">
        <div style="text-align: center; padding: 40px; color: #7f8c8d;">
          <i class="fas fa-search" style="font-size: 2em; margin-bottom: 10px;"></i>
          <p>No se encontraron usuarios con los filtros seleccionados</p>
        </div>
      </td>
    </tr>
  `;
    return;
  }

  lista.forEach(contacto => {
    // Normalización de campos
    const user =
      contacto.User ||
      contacto.receptor ||
      contacto.destinatario ||
      contacto.usuarioDestino ||
      {};
    const empresa =
      contacto.empresa?.razonSocial ||
      contacto.empresaDestino?.razonSocial ||
      contacto.Empresa?.razonSocial ||
      '';

    const nombre = user.name || user.nombre || 'Desconocido';
    const cargo =
      contacto._cargoNombre && contacto._cargoNombre !== 'N/A'
        ? contacto._cargoNombre
        : 'Sin asignar';

    const acciones =
      contacto.estado === 'recibido'
        ? `
          <button class="filter-btn" style="background-color:#00833d;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.9em;" onclick="aceptarInvitacion(${contacto.invitacionId})">
            <i class="bi bi-check-circle"></i> Aceptar
          </button>
          <button class="filter-btn" style="background-color:#d12b3b;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.9em;" onclick="rechazarInvitacion(${contacto.invitacionId})">
            <i class="bi bi-x-circle"></i> Rechazar
          </button>`
        : `
          <button class="filter-btn" style="background-color:#d12b3b;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.9em;" onclick="rechazarInvitacion(${contacto.invitacionId})">
            <i class="bi bi-x-circle"></i> Cancelar
          </button>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
                  <td>
                <div style="position:relative;width:60px;height:60px; margin-top:10px;text-align: left; margin-left:10px;">
                    <img src="photo/${user.fotoPerfil || 'img/sinfoto.jpg'}"  class="imagenPerfil"
                        alt="Foto" style="width:60px;height:60px;border-radius:50%;object-fit:cover;"
                        onerror="this.onerror=null;this.src='img/sinfoto.jpg';">
                    
                </div>
            </td>
            <td>${user.name ?? ''}</td>
      <td style=" text-align: left;">${cargo}</td>
      <td style=" text-align: left;">${empresa}</td>
      <td style="display:flex;gap:8px;justify-content:center;">${acciones}</td>
    `;
    tbody.appendChild(tr);
  });
}


// Aplicar filtros a contactos en espera
function aplicarFiltrosEspera() {
  const nombreFiltro = document.getElementById('filterE-nombre').value.toLowerCase();
  const entidadFiltro = document.getElementById('filterE-entidad').value;
  const cargoFiltro = document.getElementById('filterE-cargo').value;

  const filtrados = listaContactosEspera.filter(c => {
    const user = c.User ?? {};
    const empresa = c.empresa?.razonSocial ?? '';
    const cargo = c._cargoNombre ?? '';
    console.log('Filtrando contacto:', user.name, empresa, cargo);

    const matchesNombre =
      !nombreFiltro ||
      user.name?.toLowerCase().includes(nombreFiltro) ||
      empresa.toLowerCase().includes(nombreFiltro);
    const matchesEntidad = !entidadFiltro || empresa === entidadFiltro;
    const matchesCargo = !cargoFiltro || cargo === cargoFiltro;

    return matchesNombre && matchesEntidad && matchesCargo;
  });

  renderTablaEspera(filtrados);
}

// Eventos para filtros
document.getElementById('filterE-nombre').addEventListener('input', aplicarFiltrosEspera);
document.getElementById('filterE-entidad').addEventListener('change', aplicarFiltrosEspera);
document.getElementById('filterE-cargo').addEventListener('change', aplicarFiltrosEspera);

// Botón reset
document.getElementById('filterE-contact').addEventListener('click', () => {
  document.getElementById('filterE-nombre').value = '';
  document.getElementById('filterE-entidad').value = '';
  document.getElementById('filterE-cargo').value = '';
  aplicarFiltrosEspera();
});
