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