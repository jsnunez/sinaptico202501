let cleanedStr = "";
let idEntidad = "";
document.getElementById("cerrarSesion").addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Querés cerrar sesión?',
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

document.getElementById("directorio").addEventListener("click", () => {


})
document.getElementById("Todos1").addEventListener("click", () => {
  var entidades = document.getElementById("entidades");
  entidades.style.display = "none";
  var listado = document.getElementById("listado");
  listado.style.display = "flex";
  cargarEmpresas(todasLasEmpresas);

})

document.getElementById("Empresas").addEventListener("click", () => {
  const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Empresa");
  cargarEmpresas(empresasFiltradas);
  var entidades = document.getElementById("entidades");
  entidades.style.display = "none";
  var listado = document.getElementById("listado");
  listado.style.display = "flex";
})
document.getElementById("Sociedads").addEventListener("click", () => {
  const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Sociedad");
  cargarEmpresas(empresasFiltradas);
  var entidades = document.getElementById("entidades");
  entidades.style.display = "none";
  var listado = document.getElementById("listado");
  listado.style.display = "flex";
})
document.getElementById("Estados").addEventListener("click", () => {
  const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Estado");
  cargarEmpresas(empresasFiltradas);
  var entidades = document.getElementById("entidades");
  entidades.style.display = "none";
  var listado = document.getElementById("listado");
  listado.style.display = "flex";
})

document.getElementById("Academia").addEventListener("click", () => {
  const empresasFiltradas = todasLasEmpresas.filter(emp => emp.claseEntidad === "Academia");
  cargarEmpresas(empresasFiltradas);
  var entidades = document.getElementById("entidades");
  entidades.style.display = "none";
  var listado = document.getElementById("listado");
  listado.style.display = "flex";
})



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
  const userData = cargarDatosUsuario(userId);
  console.log(userData.fotoPerfil);
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
    if (data.success && data.entidad && data.entidad.UserAdminId) {
      idEntidad = data.entidad.id;

      const estado = data.entidad.habilitado == 1 ? "Estado:✅" : "Estamos Confirmando Tu Información ⏳";

      document.getElementById("crearEntidad").style.display = "none";
      document.getElementById("editarEntidad").style.display = data.entidad.habilitado == 1 ? "block" : "none";
      document.getElementById("asignarServicio").style.display = data.entidad.habilitado == 1 ? "block" : "none";
      document.getElementById("vincularEntidad").style.display = "none";
      document.getElementById('bienvenido').innerText =
        `Hola ${nombreUsuario}.\nAdministrador de ${data.entidad.razonSocial}.\n ${estado}.`;
      document.getElementById("solicitudes").style.display = "block";
      await fetchSolicitudes(idEntidad);


    } else {
      // ✅ Verificar si pertenece a una entidad como usuarioempresa
      const usuarioData = await verificarUsuarioEntidad(userId);
      console.log(usuarioData)

      if (usuarioData.length > 0) {
        document.getElementById('bienvenido').innerText =
          `Hola ${nombreUsuario},  Tu eres ${usuarioData[0].Cargo.nombre} del actor ${usuarioData[0].empresa.razonSocial} tu estado es
           ${usuarioData[0].estado == 1 ? "Habilitado" : "Deshabilitado (contacta con el administrador de la entidad)"}`;
        document.getElementById("vincularEntidad").style.display = "none";
      } else {
        document.getElementById('bienvenido').innerText =
          `Hola ${nombreUsuario}, no estás unido a ninguna entidad.`;
        document.getElementById("crearEntidad").style.display = "block";
      }
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('bienvenido').innerText =
      "Ocurrió un error al verificar tu entidad. Por favor intenta más tarde.";
  }
});


// cargar datos usuario
async function cargarDatosUsuario(userId) {
  const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
  const data = await response.json();

  document.getElementById("imagenPerfil").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";

  document.getElementById("imagenPerfilSecundaria").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";

  document.getElementById("previewFotoPerfil").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";
  document.getElementById("nombrePerfil").value = data.name || '';
  document.getElementById("telefonoPerfil").value = data.telefono || '';
  document.getElementById("perfilProfesional").value = data.perfilProfesional || '';
  if (data.ciudadId) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/ciudades/ciudad/${data.ciudadId}`);
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
  

  console.log(data);
  return data;
}