let empresaC = 0;
let startupC = 0;
let emprendimientoC = 0;
let universidadesC = 0;
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
  startupC = 0;
  emprendimientoC = 0;
  universidadesC = 0;
  empresas.forEach(empresa => {
    if (empresa.habilitado == 1) {

      const empresaCard = document.createElement('div');
      empresaCard.classList.add('cardinfo');
      let rutaCompleta = empresa.logo;
      empresaCard.innerHTML = `
            <img src="/logos/${rutaCompleta}" alt="Logo Empresa" class="card-icon" onerror="this.onerror=null;this.src='/img/sinfoto.jpg';">
            <h3 class="card-title">${empresa.razonSocial}</h3>
            <p class="card-text">${empresa.actividadEconomica}</p>
        <button class="botonEntidad" id="masinfo${empresa.numIdentificacion}" ">Mas informacion</button>

        `;

      listado.appendChild(empresaCard);

      switch (empresa.claseEntidad) {
        case "Empresa":
          empresaC++;
          break;
        case "Emprendimiento":
          emprendimientoC++;
          break;
        case "Startup":
          startupC++;
          break;
        case "Universidad":
          universidadesC++;
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

  document.getElementById("empresaC").innerText = empresaC;
  document.getElementById("emprendimientoC").innerText = emprendimientoC;
  document.getElementById("startupC").innerText = startupC;
  document.getElementById("universidadesC").innerText = universidadesC;

}


document.addEventListener('DOMContentLoaded', function () {
  // Abrir modal con info de la empresa
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('botonEntidad')) {
      console.log(todasLasEmpresas)

      const id = e.target.id.replace('masinfo', '');
      console.log(todasLasEmpresas)
      const empresa = todasLasEmpresas.find(emp => emp.numIdentificacion === id);
      console.log(empresa)


      if (empresa) {
        document.getElementById('modalRazonSocial').textContent = empresa.razonSocial;
        document.getElementById('tipoEntidad').textContent = empresa.claseEntidad;
        document.getElementById('descripcionEmpresa').textContent = empresa.actividadEconomica;
        document.getElementById('serviciosAsociados').textContent = empresa.razonSocial;
        document.getElementById('UbicacionEntidad').textContent = empresa.direccion + ", " + empresa.Ciudad.nombre + ", " + empresa.Ciudad.Departamento.nombre;
        document.getElementById('contactoEntidad').textContent = empresa.Contacto.nombre;
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
        desdeuserid: userId,
        parauserid: paraUserId,
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
          nombre: item.User?.name || 'Sin nombre',
          rol: item.Cargo?.nombre || 'Sin rol'
        }));

      let integrantesHTML = '<ul>';
      if (integrantes.length > 0) {
        integrantes.forEach(integrante => {
          integrantesHTML += `<li>${integrante.nombre} - ${integrante.rol}</li>`;
        });
      } else {
        integrantesHTML += '<li>Sin1 ningún integrante</li>';
      }
      integrantesHTML += '</ul>';
      document.getElementById('integrantesAsociados').innerHTML = integrantesHTML;
    } else {
      document.getElementById('integrantesAsociados').innerHTML = 'No se encontraron integrantes.';
    }
  } catch (error) {
    console.error('Error al obtener integrantes:', error);
    document.getElementById('integrantesAsociados').innerHTML = 'Error al cargar integrantes.';
  }
}
