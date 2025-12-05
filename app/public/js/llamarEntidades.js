
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
