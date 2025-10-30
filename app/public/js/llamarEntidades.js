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

        cargarEmpresas(data.empresas);
      } else {
        console.log(data.mensaje || 'No hay empresas habilitadas.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Función para cargar las empresas dinámicamente
function cargarEmpresas(empresas) {
  const listado = document.getElementById('listado');
  listado.innerHTML = '';  // Limpiar el contenido previo
  empresaC = 0;
  EstadoC = 0;
  SociedadC = 0;
  AcademiaesC = 0;
  empresas.forEach(empresa => {
    if (empresa.habilitado == 1) {

      const empresaCard = document.createElement('div');
      empresaCard.classList.add('cardinfo');
      let rutaCompleta = empresa.logo;
      empresaCard.innerHTML = `
            <img src="/logos/${rutaCompleta}" alt="Logo Empresa" class="card-icon" onerror="this.onerror=null;this.src='/img/sinfoto.jpg';">
            <h3 class="card-title">${empresa.razonSocial}</h3>
            <p class="card-text">${empresa.actividadEconomica}</p>
            <button class="botonEntidad btnMasInfo" data-id="${empresa.numIdentificacion}" id="intgranteBtn">
              Más información
            </button>



        `;

      listado.appendChild(empresaCard);

      switch (empresa.claseEntidad) {
        case "Empresa":
          empresaC++;
          break;
        case "Sociedad":
          SociedadC++;
          break;
        case "Estado":
          EstadoC++;
          break;
        case "Academia":
          AcademiaesC++;
          break;

        default:
          break;
      }

    }
  });

  if (empresas.length == 0) {
    const empresaCard = document.createElement('div');
    empresaCard.classList.add('cardinfo');

    empresaCard.innerHTML = `
                <img src="/logos/sindatos.jpg" alt="Logo Empresa" class="card-icon">
                <h3 class="card-title">0 entidades </h3>
            `;
    listado.appendChild(empresaCard);
  }

  // document.getElementById("empresaC").innerText = empresaC;
  // document.getElementById("SociedadC").innerText = SociedadC;
  // document.getElementById("EstadoC").innerText = EstadoC;
  // document.getElementById("AcademiaesC").innerText = AcademiaesC;

}


document.addEventListener('DOMContentLoaded', function () {
  // Abrir modal con info de la empresa
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('botonEntidad')) {
      console.log(todasLasEmpresas)

      const id = e.target.dataset.id;
      console.log(todasLasEmpresas)

      const empresa = todasLasEmpresas.find(emp => emp.numIdentificacion == id || emp.id == id);

      console.log(empresa)


      if (empresa) {
        document.getElementById('modalRazonSocial').textContent = empresa.razonSocial;
        document.getElementById('tipoEntidad').textContent = empresa.claseEntidad;
        document.getElementById('descripcionEmpresa').textContent = empresa.actividadEconomica;
        document.getElementById('serviciosAsociados').textContent = empresa.razonSocial;
        document.getElementById('UbicacionEntidad').textContent = empresa.direccion + ", " + empresa.Ciudad.nombre + ", " + empresa.Ciudad.Departamento.nombre;
        // document.getElementById('contactoEntidad').textContent = empresa.User.name;
        const telefono = empresa.telefono || '';
        const telefonoMasked = telefono.length > 4
          ? telefono.slice(0, 4) + '*'.repeat(telefono.length - 4)
          : telefono;
        document.getElementById('telefonoEntidad').textContent = telefonoMasked;
        llamarservicios(empresa.id);
        llamarIntegrantes(empresa.id);

        document.getElementById('empresaModal').style.display = 'block';
      }
    }



  });

  document.getElementById('contactarTelBtn').onclick = function () {
    const telefono = document.getElementById('telefonoEntidad');
    const empresa = todasLasEmpresas.find(emp => emp.razonSocial === document.getElementById('modalRazonSocial').textContent);
    if (empresa && empresa.telefono) {
      telefono.textContent = empresa.telefono;
    }
    let contador = telefono.getAttribute('data-contador') || 0;
    // Hacer PUT para aumentar el contador en el backend
    if (empresa && empresa.id) {
      fetch(`${API_BASE_URL}/api/entidad/aumentarContadorContacto/${empresa.id}`, {
        method: 'PUT'
      }).catch(err => console.error('Error al aumentar contador:', err));
    }
    // Enviar invitación al hacer clic en el botón de contacto
    const userId = obtenerCookie("userId");
    const paraUserId = empresa.UserAdminId; // Ajusta según la estructura de tu objeto empresa
    const mensaje = `Hola, me gustaría ponerme en contacto con ${empresa.razonSocial}`;
    const telefonoEmpresa = empresa.telefono;

    if (userId && paraUserId) {
      fetch(`${API_BASE_URL}/api/invitacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          desdeuserid: parseInt(userId),
          parauserid: parseInt(paraUserId),
          mensaje,
          telefono: telefonoEmpresa
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
          if (data && data.id) {
            alert('Invitación enviada correctamente.');
          } else {
            alert('No se pudo enviar la invitación: ' + (data.error || 'Error desconocido.'));
          }
        })
        .catch(err => {
          console.error('Error al enviar invitación:', err);
          alert('Error al enviar la invitación.');
        });
    }

    // telefono.setAttribute('data-contador', contador);
    // let contadorSpan = document.getElementById('contadorContactos');
    // if (!contadorSpan) {
    //   contadorSpan = document.createElement('span');
    //   contadorSpan.id = 'contadorContactos';
    //   telefono.parentNode.appendChild(contadorSpan);
    // }
    // contadorSpan.textContent = ` (Contactado ${contador} veces)`;
  };

  // Cerrar modal al hacer click en la X
  document.querySelector('.close').onclick = function () {
    document.getElementById('empresaModal').style.display = 'none';
  };

  // Cerrar modal si se hace click fuera del contenido
  window.onclick = function (event) {
    if (event.target === document.getElementById('empresaModal')) {
      document.getElementById('empresaModal').style.display = 'none';
    }
  };
});

async function llamarservicios(idEntidad) {

  let url = `${API_BASE_URL}/api/servicio/entidad/${idEntidad}`;
  let data = await fetch(url);
  let datos = await data.json();
  console.log(datos);
  if (datos.success) {
    let servicios = datos.servicios;
    let serviciosHTML = '<ul>';
    servicios.forEach(servicio => {
      serviciosHTML += `<li>${servicio.descripcion}</li>`;
    });
    serviciosHTML += '</ul>';
    document.getElementById('serviciosAsociados').innerHTML = serviciosHTML;
  } else {
    console.log(datos.mensaje || 'No se encontraron servicios.');
  }
}

async function llamarIntegrantes(idEntidad) {
  const url = `${API_BASE_URL}/api/usuarioempresa/empresa/${idEntidad}`;
  try {
    const response = await fetch(url);
    const datos = await response.json();
    console.log(datos);

    if (Array.isArray(datos) && datos.length > 0) {

      // Adaptar datos para estructura esperada por el resto del código
      const integrantes = datos
        .filter(item => item.estado) // Solo los activos
        .map(item => ({
          id: item.User?.id,
          nombre: item.User?.name || 'Sin nombre',
          rol: item.Cargo?.nombre || 'Sin rol',
          fotoPerfil: item.User?.fotoPerfil || 'sinfoto.jpg'
        }));

      let integrantesHTML = '<div style="display: block;">';

      // if (integrantes.length > 0) {
      //   integrantes.forEach(integrante => {
      //     console.log(integrante.fotoPerfil);
      //     integrantesHTML += `
      //         <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      //           <div style="position: relative; width: 50px; height: 50px; cursor: pointer;" id="verIntegrante${integrante.id}" onclick="abrirModalIntegrante(${integrante.id})">
      //             <img src="/photo/${integrante.fotoPerfil}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
      //             <span style="position: absolute; bottom: 0; right: 0; background: #fff; border-radius: 50%; padding: 2px;">
      //               <i class="bi bi-search" style="font-size: 1em; color: var(--primary-color);"></i>
      //             </span>
      //           </div>
      //           <p style="margin: 0;">${integrante.nombre} - ${integrante.rol}</p>
      //           <button class="btn btn-sm btn-primary" onclick="contactarIntegrante(${integrante.id}, '${integrante.nombre.replace(/'/g, "\\'")}')">
      //             <i class="bi bi-telephone"></i> Contactar
      //           </button>
      //         </div>
      //       `;
      //   });
      if (integrantes.length > 0) {
        integrantes.forEach(integrante => {
          console.log(integrante.fotoPerfil);
          integrantesHTML += `
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="position: relative; width: 50px; height: 50px; cursor: pointer;" id="verIntegrante${integrante.id}" >
                    <img src="/photo/${integrante.fotoPerfil}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                    <span style="position: absolute; bottom: 0; right: 0; background: #fff; border-radius: 50%; padding: 2px;">

                    </span>
                  </div>
                  <p style="margin: 0;">${integrante.nombre} - ${integrante.rol}</p>
                </div>
                <button class="btn btn-sm btn-primary" onclick="contactarIntegrante(${integrante.id}, '${integrante.nombre.replace(/'/g, "\\'")}')">
                  <i class="bi bi-telephone"></i> Contactar
                </button>
              </div>
            `;
        });
      } else {
        integrantesHTML += '<div>Sin ningún integrante</div>';
      }

      integrantesHTML += '</div>';

      document.getElementById('integrantesAsociados').innerHTML = integrantesHTML;

    } else {
      document.getElementById('integrantesAsociados').innerHTML = 'No se encontraron integrantes.';
    }
  } catch (error) {
    console.error('Error al obtener integrantes:', error);
    document.getElementById('integrantesAsociados').innerHTML = 'Error al cargar integrantes.';
  }
}

// Abrir modal al hacer clic en la foto de usuario

abrirModalIntegrante = async function (userId) {
  console.log("ID del integrante:", userId);
  document.getElementById('modalIntegrante').style.display = 'block';
  //Cerrar modal integrante
  document.getElementById('cerrarModalIntegrante').onclick = function () {
    document.getElementById('modalIntegrante').style.display = 'none';
  };

  const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
  const data = await response.json();
  console.log(data);

  try {
    if (!userId) return;

    const res = await fetch(`/api/user/${userId}`);
    if (!res.ok) throw new Error('No se pudo obtener el perfil');
    const data = await res.json();
    console.log(data);
    // Coloca los datos en los elementos correspondientes
    document.getElementById('MiNombreCompleto').textContent = data.name || '';
    document.getElementById('MiPerfilProfesional').textContent = data.perfilProfesional || '';
    document.getElementById('MiTelefono').textContent = data.telefono || '';
    document.getElementById('MiUbicacion').textContent = data.ciudad.nombre + ' - ' + data.ciudad.departamento.nombre || '';
    document.getElementById('MiCorreo').textContent = data.email || '';
    document.getElementById("imagenPerfilIntegrante").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";


    if (data.ciudadId) {
      try {
        const resp = await fetch(`/api/ciudades/ciudad/${data.ciudadId}`);
        const ciudadData = await resp.json();
        document.getElementById("departamentoPerfilValor").innerHTML = ciudadData.ciudad.departamentoId || '';
      } catch (err) {
        document.getElementById("departamentoPerfilValor").innerHTML = '';
        console.error('Error al consultar el departamento:', err);
      }
    } else {
      document.getElementById("departamentoPerfilValor").innerHTML = '';
    }

    document.getElementById("ciudadPerfilValor").innerHTML = data.ciudadId || '';

    // Si tienes la URL del CV PDF (usando data.enlaceHojaDeVida)
    if (data.enlaceHojaDeVida) {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.src = "CV/" + data.enlaceHojaDeVida;
        iframe.style.display = 'block';
      }
    }

  } catch (err) {
    console.error('Error cargando datos de usuario:', err);
  }

  // Verificar si hay una entidad asociada al usuario
  try {
    const entidadRes = await fetch(`/api/entidad/verificar-entidad/${userId}`);
    if (entidadRes.ok) {
      const entidadData = await entidadRes.json();
      console.log('Entidad asociada:', entidadData.success);
      // Si hay entidad asociada, muestra el nombre, si no, muestra "Sin entidad asociada"
      if (entidadData.success) {
        console.log('Entidad asociada:', entidadData.entidad.razonSocial);
        var entidadNombre = entidadData.entidad.razonSocial;
      } else {
        console.log('Entidad asociada: Sin entidad asociada');
        var entidadNombre = "Sin entidad asociada";
      }
      // Busca la celda correspondiente y actualiza el texto
      document.getElementById('MiVinculado').textContent = entidadNombre;
    }
  } catch (e) {
    console.error('Error verificando entidad asociada:', e);
  }
}


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
      displayMarkersOnMap();
      displayUsersList();
    })
    .catch(error => {
      console.error('❌ Error:', error);
      // Usar datos de ejemplo en caso de error
      usersData = [...mockUsers];
      filteredUsers = [...usersData];
      updateStatistics();
      populateCityFilter();
      displayMarkersOnMap();
      displayUsersList();

      Swal.fire({
        icon: 'warning',
        title: 'Datos de demostración',
        text: 'Se están mostrando datos de ejemplo. No se pudieron cargar las entidades reales.',
        timer: 3000,
        timerProgressBar: true
      });
    });
}

function updateStatistics() {
  document.getElementById('total-users').textContent = usersData.length;
  document.getElementById('online-users').textContent = usersData.filter(u => u.verificada).length;
  document.getElementById('total-companies').textContent = [...new Set(usersData.map(u => u.claseEntidad))].length;
  document.getElementById('total-cities').textContent = [...new Set(usersData.map(u => u.city))].length;
}

function populateCityFilter() {
  const cities = [...new Set(usersData.map(u => u.city))].sort();
  const citySelect = document.getElementById('filter-city');

  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
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
    'Estado': '� Estado',
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
                        <span class="popup-value">${user.direccion || 'No especificada'}</span>
                    </div>
                    <div class="popup-info">
                        <span class="popup-label">Estado:</span>
                        <span class="popup-value" style="color: ${statusColor}">
                            ● ${user.verificada ? 'Verificada' : 'Sin verificar'}
                        </span>
                    </div>
                    <div class="popup-info">
                        <span class="popup-label">Teléfono:</span>
                        <span class="popup-value">${user.telefono || 'No disponible'}</span>
                    </div>
                    <div class="popup-actions">
                        <button class="popup-btn btn-primary" onclick="contactUser('${user.email}')">
                            <i class="fas fa-envelope"></i> Contactar
                        </button>
                        ${user.website ? `<button class="popup-btn btn-secondary" onclick="window.open('${user.website}', '_blank')">
                            <i class="fas fa-globe"></i> Web
                        </button>` : ''}
                    </div>
                </div>
            `;
}

function displayUsersList() {
  const listContent = document.getElementById('users-list-content');

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
      'Estado': '�',
      'Sociedad': '💡'
    };

    return `
            <div class="user-item" onclick="focusOnUser(${user.id})">
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">${typeIcons[user.claseEntidad] || '🏢'} ${user.name}</div>
                    <div class="user-details">${user.claseEntidad} • ${user.city}</div>
                </div>
                <div class="user-status ${user.verificada ? 'status-online' : 'status-offline'}">
                    ${user.verificada ? 'Verificada' : 'Sin verificar'}
                </div>
            </div>

           <button class="botonEntidad btnMasInfo" data-id="${user.id}">
            Más información
          </button>

          `;

  }).join('');

  listContent.innerHTML = usersHtml;
}

function setupEventListeners() {
  // Filtros de tipo de usuario
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.type;
      applyFilters();
    });
  });

  // Búsqueda
  document.getElementById('search-user').addEventListener('input', applyFilters);

  // Filtro de ciudad
  document.getElementById('filter-city').addEventListener('change', applyFilters);

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

  filteredUsers = usersData.filter(user => {
    // Filtro de tipo
    const typeMatch = currentFilter === 'all' || user.claseEntidad === currentFilter;

    // Filtro de búsqueda
    const searchMatch = !searchTerm ||
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.company.toLowerCase().includes(searchTerm);

    // Filtro de ciudad
    const cityMatch = !cityFilter || user.city === cityFilter;

    return typeMatch && searchMatch && cityMatch;
  });

  displayMarkersOnMap();
  displayUsersList();
}

function focusOnUser(userId) {
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

function clearCookies() {
  const cookies = ['user', 'userEmail', 'userId', 'userRole'];
  cookies.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}
