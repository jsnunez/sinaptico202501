let cleanedStr = "";
let idEntidad = "";
let dataUsuario = {};



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





// ✅ Función para verificar si el usuario pertenece a una entidad
async function verificarUsuarioEntidad(userId) {
  const response = await fetch(`/api/usuarioempresa/user/${userId}`);
  const data = await response.json();
  return data; // { exists: true, entidad: {...} }
}

// ✅ Función para obtener datos del usuario
async function obtenerDatosUsuario(userId) {
    try {
        const response = await fetch(`/api/user/${userId}`);
        data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        return null;
    }
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
    const response = await fetch(`/api/entidad/verificar-entidad/${userId}`);
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
            logoDiv.innerHTML = entidad.habilitado 
              ? '<i class="bi bi-plus" style="display: none;"></i><i class="bi bi-gear-fill" style="position: absolute; bottom: -5px; right: -5px; font-size: 20px; color: #000; background: white; border-radius: 50%; border: 2px solid #ccc;"></i>'
              : '<i class="bi bi-plus" style="display: none;"></i><i class="bi bi-hourglass-split" style="position: absolute; bottom: -5px; right: -5px; font-size: 20px; color: #000; background: white; border-radius: 50%; border: 2px solid #ccc;"></i>';

            if (entidad.habilitado) {
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
                cerrarTodosLosMenus();
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
            } else {
               quickActionsDiv.appendChild(logoDiv);
            logoDiv.addEventListener('click', () => {
            Swal.fire({
              title: 'Solicitud Pendiente',
              text: 'Esperando que el administrador del sistema habilite tu empresa',
              icon: 'info',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6'
            });
            });
            }

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
      // Crear dropleft para habilitarMiEmpresa
 const habilitarBtn = document.getElementById("habilitarMiEmpresa");
habilitarBtn.style.display = "block";
habilitarBtn.style.position = "relative";

// Crear menú dropleft
const dropleftMenu = document.createElement("div");
dropleftMenu.id = "dropleftHabilitar";
dropleftMenu.className = "dropleft-menu";
dropleftMenu.style.display = "none";
   console.log(data);
// Opciones
const opciones = data.entidad
  .filter(entidad => entidad.habilitado === true)
  .map(entidad => ({
    texto: entidad.razonSocial,
    icono: 'bi-building',
    accion: () => {
      window.location.href = `/perfilEntidad?id=${entidad.id}`;
    }
  }));

// Crear botones dentro del menú
opciones.forEach(opcion => {
  const btn = document.createElement("div");
  btn.className = "dropleft-option";
  btn.innerHTML = `<i class="bi ${opcion.icono}"></i> ${opcion.texto}`;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    opcion.accion();
    dropleftMenu.style.display = "none";
  });

  dropleftMenu.appendChild(btn);
});

// Insertar menú
habilitarBtn.appendChild(dropleftMenu);

// Abrir/cerrar menú
habilitarBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const visible = dropleftMenu.style.display === "block";
  dropleftMenu.style.display = visible ? "none" : "block";
});

// Cerrar menú cuando se clickea fuera
document.addEventListener("click", () => {
  dropleftMenu.style.display = "none";
});

    
 const dataUsuario = await obtenerDatosUsuario(userId);
console.log(dataUsuario);
    document.getElementById('nombreUsuarioHeader').innerHTML = `${dataUsuario.name.split(' ')[0]} <i class="bi bi-chevron-down"></i>`;
      document.getElementById("imagenPerfilSecundaria").src="/photo/"+dataUsuario.fotoPerfil;

    }
    //  idEntidad = data.entidad.id;
    // ✅ Verificar si pertenece a una entidad como usuarioempresa
    const dataVinculados = await verificarUsuarioEntidad(userId);
    console.log(dataVinculados)


    dataVinculados.forEach((entidad, index) => {
      console.log('Entidad:', entidad.estado);
      // Insertar logo en partnersContainer
      if (!entidades.includes(entidad.empresa.id)) {
        entidades.push(entidad.empresa.id);
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
    logoDiv.innerHTML = entidad.estado 
              ? '<i class="bi bi-plus" style="display: none;"></i><i class="bi bi-person-fill" style="position: absolute; bottom: -5px; right: -5px; font-size: 20px; color: #000; background: white; border-radius: 50%; border: 2px solid #ccc;"></i>'
              : '<i class="bi bi-plus" style="display: none;"></i><i class="bi bi-hourglass-split" style="position: absolute; bottom: -5px; right: -5px; font-size: 20px; color: #000; background: white; border-radius: 50%; border: 2px solid #ccc;"></i>';
        // Crear menú desplegable con clase quick-menu

        if (entidad.estado) {
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
              cerrarTodosLosMenus();
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
          console.log(`Integrantes entidad ${entidad.empresa.id}`);
    document.getElementById('modalAsociadosUser').style.display = 'block';
             
              fetchMisAsociados(entidad.empresa.id)
        })} else {
                   

          quickActionsDiv.appendChild(logoDiv);
            logoDiv.addEventListener('click', () => {
            Swal.fire({
              title: 'Solicitud Pendiente',
              text: 'Esperando que el administrador de tu empresa te habilite',
              icon: 'info',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6'
            });
            });
          
        }

        partnersContainer.appendChild(quickActionsDiv);
      }}
    });
    // Cerrar menús al hacer click fuera
    document.addEventListener('click', () => {
      cerrarTodosLosMenus();
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
function cerrarTodosLosMenus() {
  document.querySelectorAll('.quick-menu').forEach(menu => {
    menu.classList.remove('show');
  });

  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.classList.remove('active');
    const icon = btn.querySelector('i');
    if (icon) icon.style.display = 'none';
  });
}


