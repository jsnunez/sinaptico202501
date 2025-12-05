
// Función para obtener departamentos desde la API
async function obtenerDepartamentosColombia() {
    try {
        const res = await fetch('/api/departamentos');
        const data = await res.json();
        return data.departamentos || [];
    } catch (err) {
        console.error('Error obteniendo departamentos:', err);
        return [];
    }
}


// Función para agregar departamentos al select
async function agregarDepartamentosPerfil() {
    const departamentos = await obtenerDepartamentosColombia();
    const depSelect = document.getElementById('departamentoPerfil');
    depSelect.innerHTML = '<option value="">Seleccione departamento</option>';
    if (depSelect && departamentos && departamentos.length > 0) {
        departamentos.forEach(dep => {
            const option = document.createElement('option');
            option.value = dep.id;
            option.textContent = dep.nombre;
            depSelect.appendChild(option);
        });
    } else {
        console.warn('No se encontraron Departamentos para cargar.');
    }

    // Si ya tienes el departamento y ciudad del usuario, puedes preseleccionarlos aquí
    const departamentoId = document.getElementById('departamentoPerfilValor').textContent;
    // Si departamentoId es un número diferente de 0, selecciona ese departamento en el select
    if (departamentoId && !isNaN(departamentoId) && Number(departamentoId) !== 0) {
        depSelect.value = departamentoId;
        await cargarCiudadesPerfil(departamentoId);
    }
}

// Función para cargar ciudades según departamento seleccionado
async function cargarCiudadesPerfil(departamentoId) {
    const ciudadSelect = document.getElementById('ciudadPerfil');
    ciudadSelect.innerHTML = '<option value="">Seleccione ciudad</option>';
    if (!departamentoId) return;
    try {
        const res = await fetch(`/api/ciudades/${departamentoId}`);
        const data = await res.json();
        if (data.ciudades && data.ciudades.length > 0) {
            data.ciudades.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.id;
                option.textContent = ciudad.nombre;
                ciudadSelect.appendChild(option);
            });
        }
    } catch (err) {
        console.error('Error obteniendo ciudades:', err);
    }
    // Si ya tienes la ciudad del usuario, puedes preseleccionarla aquí
    const ciudadId = document.getElementById('ciudadPerfilValor').textContent;
    if (ciudadId && !isNaN(ciudadId) && Number(ciudadId) !== 0) {
        ciudadSelect.value = ciudadId;
    }

}

// Inicializar departamentos al mostrar el modal
document.getElementById('userPhoto').onclick = function () {
    document.getElementById('modalFotoPerfil').style.display = 'block';
    agregarDepartamentosPerfil();

};

// Cambiar ciudades al seleccionar departamento
document.getElementById('departamentoPerfil').onchange = function () {
    cargarCiudadesPerfil(this.value);
};
