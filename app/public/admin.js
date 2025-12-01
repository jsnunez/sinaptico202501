let cleanedStr = "";
let idEntidad = "";
document.getElementById("cerrarSesion").addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Borrar cookies y redirigir
      document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.location.href = "/";

    }
    // Si el usuario cancela, no pasa nada
  });
});




// document.getElementById("Todos1").addEventListener("click", () => {
//   var entidades = document.getElementById("entidades");
//   entidades.style.display = "none";
//   var listado = document.getElementById("listado");
//   listado.style.display = "flex";

//   cargarEmpresas(todasLasEmpresas);

// })

// document.getElementById("Empresas").addEventListener("click", () => {
//   const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Empresa");
//   cargarEmpresas(empresasFiltradas);
//   var entidades = document.getElementById("entidades");
//   entidades.style.display = "none";
//   var listado = document.getElementById("listado");
//   listado.style.display = "flex";
// })
// document.getElementById("Sociedads").addEventListener("click", () => {
//   const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Sociedad");
//   cargarEmpresas(empresasFiltradas);
//   var entidades = document.getElementById("entidades");
//   entidades.style.display = "none";
//   var listado = document.getElementById("listado");
//   listado.style.display = "flex";
// })
// document.getElementById("Estados").addEventListener("click", () => {
//   const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Estado");
//   cargarEmpresas(empresasFiltradas);
//   var entidades = document.getElementById("entidades");
//   entidades.style.display = "none";
//   var listado = document.getElementById("listado");
//   listado.style.display = "flex";
// })

// document.getElementById("Academia").addEventListener("click", () => {
//   const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Academia");
//   cargarEmpresas(empresasFiltradas);
//   var entidades = document.getElementById("entidades");
//   entidades.style.display = "none";
//   var listado = document.getElementById("listado");
//   listado.style.display = "flex";
// })




// Función para obtener el valor de una cookie por su nombre
function obtenerCookie(nombre) {
  const nombreCookie = `${nombre}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.indexOf(nombreCookie) === 0) {
      return cookie.substring(nombreCookie.length, cookie.length);
    }
  }

  return null; // Retorna null si no se encuentra la cookie
}
// ✅ Función para obtener el valor de una cookie
function obtenerCookie(nombre) {
  const nombreCookie = `${nombre}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie) === 0) {
      return cookie.substring(nombreCookie.length);
    }
  }

  return null;
}

// ✅ Función para mostrar el modal
function showModal() {
  document.getElementById("modalCrerEntidad").style.display = "block";
}

// ✅ Función para ocultar el modal
function closeModal() {
  document.getElementById("modalCrerEntidad").style.display = "none";
}

// ✅ Función para verificar si el usuario pertenece a una entidad
async function verificarUsuarioEntidad(userId) {
  const response = await fetch(`${API_BASE_URL}/api/usuarioempresa/user/${userId}`);
  const data = await response.json();
  return data; // { exists: true, entidad: {...} }
}

document.addEventListener("DOMContentLoaded", async function () {

  const usuario = obtenerCookie("user");
  const userId = obtenerCookie("userId");

  // ✅ Verificación de cookies
  if (!usuario || !userId) {
    document.getElementById('bienvenido').innerText = "Error: No se encontró la información del usuario.";
    return;
  }

  // ✅ Limpieza del nombre del usuario
  let cleanedStr = decodeURIComponent(usuario.replace(/%20/g, " "));
  let nombreUsuario = cleanedStr.split(" ")[0];

  try {
    const response = await fetch(`${API_BASE_URL}/api/entidad/verificar-entidad/${userId}`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // Recorrer todas las entidades del usuario administrador

      if (data.entidad) {
        let i = 0;
        var entidades = [];
        data.entidad.forEach((entidad, index) => {
          entidades[i] = entidad.id;
          i++;
          console.log('Entidad:', entidad);
          // Insertar logo en partnersContainer
          const partnersContainer = document.getElementById('partnersContainer');
          if (partnersContainer && entidad.logo) {
            // Crear contenedor principal con clase quick-actions
            const quickActionsDiv = document.createElement('div');
            quickActionsDiv.className = 'quick-actions';
            quickActionsDiv.style.margin = '5px';

            // Crear botón principal con estilos
            const logoDiv = document.createElement('button');
            logoDiv.className = 'quick-action-btn';
            logoDiv.style.backgroundImage = `url('logos/${entidad.logo}')`;
            logoDiv.style.backgroundSize = 'cover';
            logoDiv.style.backgroundPosition = 'center';
            logoDiv.style.position = 'relative';
            logoDiv.id = `entidad-${entidad.id}`;
            logoDiv.innerHTML = '<i class="bi bi-plus" style="display: none;"></i><i class="bi bi-gear-fill" style="position: absolute; bottom: -5px; right: -5px; font-size: 20px; color: #000; background: white; border-radius: 50%; border: 2px solid #ccc;"></i>';

            // Crear menú desplegable con clase quick-menu
            const menuDiv = document.createElement('div');
            menuDiv.className = 'quick-menu';
            menuDiv.id = `menu-${entidad.id}`;

            // Crear botones del menú con clase quick-option
            const editarBtn = document.createElement('div');
            editarBtn.className = 'quick-option';
            editarBtn.id = `editar-${entidad.id}`;
            editarBtn.innerHTML = '<i class="bi bi-pencil"></i> Editar Entidad';
            editarBtn.addEventListener('click', () => {
              abrirModalEditarEntidad(entidad.id);
            });
            const serviciosBtn = document.createElement('div');
            serviciosBtn.className = 'quick-option';
            serviciosBtn.id = `servicios-${entidad.id}`;
            serviciosBtn.innerHTML = '<i class="bi bi-gear"></i> Servicios';
            serviciosBtn.addEventListener('click', () => {
              abrirModalAgregarServicio(entidad.id);
            });

            const integrantesBtn = document.createElement('div');
            integrantesBtn.className = 'quick-option';
            integrantesBtn.id = `integrantes-${entidad.id}`;
            integrantesBtn.innerHTML = '<i class="bi bi-people"></i> Integrantes';

            menuDiv.appendChild(editarBtn);
            menuDiv.appendChild(serviciosBtn);
            menuDiv.appendChild(integrantesBtn);

            quickActionsDiv.appendChild(logoDiv);
            quickActionsDiv.appendChild(menuDiv);

            // Event listeners
            logoDiv.addEventListener('click', (e) => {
              e.stopPropagation();
              const menu = document.getElementById(`menu-${entidad.id}`);
              const icon = logoDiv.querySelector('i');

              if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                logoDiv.classList.remove('active');
                icon.style.display = 'none';
              } else {
                menu.classList.add('show');
                logoDiv.classList.add('active');
                icon.style.display = 'flex';
              }
            });

            editarBtn.addEventListener('click', () => {
              console.log(`Editar entidad ${entidad.id}`);
              // Aquí iría la lógica para editar entidad
            });

            serviciosBtn.addEventListener('click', () => {
              console.log(`Servicios entidad ${entidad.id}`);
              // Aquí iría la lógica para servicios
            });

            integrantesBtn.addEventListener('click', () => {
              console.log(`Integrantes entidad ${entidad.id}`);
              document.getElementById('modalVerIntegrantesEntidad').style.display = 'block';
              fetchSolicitudes(entidad.id);
            });

            partnersContainer.appendChild(quickActionsDiv);
          }
        });

        // Cerrar menús al hacer click fuera
        document.addEventListener('click', () => {
          data.entidad.forEach(entidad => {
            const menu = document.getElementById(`menu-${entidad.id}`);
            const btn = document.getElementById(`entidad-${entidad.id}`);
            const icon = btn?.querySelector('i');

            if (menu) {
              menu.classList.remove('show');
              btn?.classList.remove('active');
              if (icon) icon.style.display = 'none';
            }
          });
        });
      }
      idEntidad = data.entidad.id;
      document.getElementById("habilitarMiEmpresa").style.display = "block";

      const estado = data.entidad.habilitado == 1 ? "Estado: Activo" : "Estamos Confirmando Tu Información.";
      document.getElementById("crearEntidad").style.display = "none";
      document.getElementById("editarEntidad").style.display = data.entidad.habilitado == 1 ? "block" : "none";
      document.getElementById("asignarServicio").style.display = data.entidad.habilitado == 1 ? "block" : "none";
      document.getElementById("vincularEntidad").style.display = "none";
      document.getElementById("verIntegrantesEntidad").style.display = data.entidad.habilitado == 1 ? "block" : "none";
      // document.getElementById('bienvenido').innerText =
      //   `${nombreUsuario} - Administrador de ${data.entidad.razonSocial}.\n`;
      document.getElementById('bienvenido').innerText =
        `${nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1)}.\n`;
      // document.getElementById('bienvenido').innerHTML +=
      //   `<button style="background: white; border-radius: 20px; border: 1px solid var(--primary-color); padding: 5px 12px;">${estado}</button>`;
      document.getElementById("solicitudes").style.display = "block";

      document.getElementById('nombreUsuarioHeader').innerHTML = `${nombreUsuario} <i class="bi bi-chevron-down"></i>`;
      document.getElementById("btn-empresa").style.display = "block";
      await fetchSolicitudes(idEntidad);

    }
    //  idEntidad = data.entidad.id;
    // ✅ Verificar si pertenece a una entidad como usuarioempresa
    const dataVinculados = await verificarUsuarioEntidad(userId);
    console.log(dataVinculados)


    dataVinculados.forEach((entidad, index) => {
      console.log('Entidad:', entidad.empresa.razonSocial);
      // Insertar logo en partnersContainer
      if (!entidades.includes(entidad.id)) {
        entidades[index] = entidad.id;
      const partnersContainer = document.getElementById('partnersContainer');
      if (partnersContainer && entidad.empresa.logo) {
        // Crear contenedor principal con clase quick-actions
        const quickActionsDiv = document.createElement('div');
        quickActionsDiv.className = 'quick-actions';
        quickActionsDiv.style.margin = '5px';

        // Crear botón principal con estilos
        const logoDiv = document.createElement('button');
        logoDiv.className = 'quick-action-btn';
        logoDiv.style.backgroundImage = `url('logos/${entidad.empresa.logo}')`;
        logoDiv.style.backgroundSize = 'cover';
        logoDiv.style.backgroundPosition = 'center';
        logoDiv.id = `entidad-${entidad.id}`;
        logoDiv.innerHTML = '<i class="bi bi-plus" style="display: none;"></i>';

        // Crear menú desplegable con clase quick-menu
        const menuDiv = document.createElement('div');
        menuDiv.className = 'quick-menu';
        menuDiv.id = `menu-${entidad.id}`;

        // // Crear botones del menú con clase quick-option
        // const editarBtn = document.createElement('div');
        // editarBtn.className = 'quick-option';
        // editarBtn.id = `editar-${entidad.id}`;
        // editarBtn.innerHTML = '<i class="bi bi-pencil"></i> Editar Entidad';
        // editarBtn.addEventListener('click', () => {
        //   abrirModalEditarEntidad(entidad.id);
        // });
        // const serviciosBtn = document.createElement('div');
        // serviciosBtn.className = 'quick-option';
        // serviciosBtn.id = `servicios-${entidad.id}`;
        // serviciosBtn.innerHTML = '<i class="bi bi-gear"></i> Servicios';
        // serviciosBtn.addEventListener('click', () => {
        //   abrirModalAgregarServicio(entidad.id);
        // });

        const integrantesBtn = document.createElement('div');
        integrantesBtn.className = 'quick-option';
        integrantesBtn.id = `integrantes-${entidad.id}`;
        integrantesBtn.innerHTML = '<i class="bi bi-people"></i> Integrantes';

        // menuDiv.appendChild(editarBtn);
        // menuDiv.appendChild(serviciosBtn);
        menuDiv.appendChild(integrantesBtn);

        quickActionsDiv.appendChild(logoDiv);
        quickActionsDiv.appendChild(menuDiv);

        // Event listeners
        logoDiv.addEventListener('click', (e) => {
          e.stopPropagation();
          const menu = document.getElementById(`menu-${entidad.id}`);
          const icon = logoDiv.querySelector('i');

          if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            logoDiv.classList.remove('active');
            icon.style.display = 'none';
          } else {
            menu.classList.add('show');
            logoDiv.classList.add('active');
            icon.style.display = 'flex';
          }
        });

        // editarBtn.addEventListener('click', () => {
        //   console.log(`Editar entidad ${entidad.id}`);
        //   // Aquí iría la lógica para editar entidad
        // });

        // serviciosBtn.addEventListener('click', () => {
        //   console.log(`Servicios entidad ${entidad.id}`);
        //   // Aquí iría la lógica para servicios
        // });

        integrantesBtn.addEventListener('click', () => {
          console.log(`Integrantes entidad ${entidad.id}`);
    document.getElementById('modalAsociadosUser').style.display = 'block';
             
              fetchMisAsociados(entidad.id)
        });

        partnersContainer.appendChild(quickActionsDiv);
      }}
    });

    // Cerrar menús al hacer click fuera
    document.addEventListener('click', () => {
      data.entidad.forEach(entidad => {
        const menu = document.getElementById(`menu-${entidad.id}`);
        const btn = document.getElementById(`entidad-${entidad.id}`);
        const icon = btn?.querySelector('i');

        if (menu) {
          menu.classList.remove('show');
          btn?.classList.remove('active');
          if (icon) icon.style.display = 'none';
        }
      });
    });



  } catch (error) {
    console.error('Error:', error);
    document.getElementById('bienvenido').innerText =
      "Ocurrió un error al verificar tu entidad. Por favor intenta más tarde.";
  }
});


const overlay = document.querySelector('.overlay');
document.getElementById("crearEntidad").addEventListener("click", () => {

  overlay.style.display = 'block'; // Mostrar overlay
  cargarFormulario();
  console.log("cargarFormulario")

  document.getElementById('myModal').style.display = 'flex';
  document.getElementById('myModal').style.flexWrap = 'wrap';


})
overlay.addEventListener("click", () => {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('modalEditar').style.display = 'none';
  overlay.style.display = 'none'; // Ocultar overlay
});

// Función para cerrar el modal
document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById('myModal').style.display = 'none';
  overlay.style.display = 'none'; // Ocultar overlay

})
document.getElementById("cerrarModalBtn").addEventListener("click", () => {
  console.log("cerrarModalBtn")
  document.getElementById('myModal').style.display = 'none';
  overlay.style.display = 'none'; // Ocultar overlay

})