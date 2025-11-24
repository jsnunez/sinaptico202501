async function cargarCargos() {
  try {
      const response = await fetch(`${API_BASE_URL}/api/cargos/`);
      
      if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
      }

      const cargos = await response.json();
      
      
      return cargos;  // Asegúrate de retornar los datos
  } catch (error) {
      console.error('Error:', error);
      return {};  // Retorna un objeto vacío si hay error (para evitar problemas posteriores)
  }
}

// Función para obtener los departamentos de Colombia desde la API
async function obtenerDepartamentosColombia() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/departamentos`);
    
    if (!response.ok) {
      console.error('Error al cargar los departamentos:', response.statusText);
      return [];  // Retornar un array vacío si ocurre un error
    }

    const data = await response.json();
    return data.departamentos;  // Retornar los datos de los departamentos obtenidos

  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    return [];  // Retorna un array vacío si hay error (para evitar problemas posteriores)
  }
}

async function obtenerMunicipiosPorDepartamento(departmentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ciudades/${departmentId}`);
    
    if (!response.ok) {
      console.error('Error al cargar los municipios:', response.statusText);
      return [];  // Retorna un array vacío en caso de error
    }

    const municipios = await response.json();
    // console.log(municipios.ciudades);  // Para verificar qué datos estás recibiendo

    return municipios.ciudades;  // Retorna los municipios obtenidos

  } catch (error) {
    console.error('Error al obtener municipios:', error);
    return [];  // Retorna un array vacío si ocurre un error
  }
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
});

// cargar datos usuario
async function cargarDatosUsuario(userId) {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();


  document.getElementById("previewFotoPerfil").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";
  document.getElementById("nombrePerfil").value = data.name || '';
  document.getElementById("telefonoPerfil").value = data.telefono || '';
  document.getElementById("perfilProfesional").value = data.perfilProfesional || '';
  
  document.getElementById("imagenPerfil").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";

  document.getElementById("imagenPerfilSecundaria").src = data.fotoPerfil ? "photo/" + data.fotoPerfil : "photo/sinfoto.jpg";
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

  if (data.error) {
    if (data.error) {
      // Limpiar cookies de sesión y redirigir a la raíz
      document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/';
      return;
    }
    return;
  }
  return data;
}