document.getElementById('entidad-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevenir el envío normal del formulario
    let usuario = getCookie("userId");
    console.log(usuario)
    
    // Validar coordenadas si se proporcionaron
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    
    if ((latitud && !longitud) || (!latitud && longitud)) {
        Swal.fire({
            icon: 'warning',
            title: 'Coordenadas incompletas',
            text: 'Si va a especificar una ubicación, debe proporcionar tanto la latitud como la longitud.',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    
    if (latitud && longitud) {
        const lat = parseFloat(latitud);
        const lng = parseFloat(longitud);
        
        if (isNaN(lat) || isNaN(lng)) {
            Swal.fire({
                icon: 'error',
                title: 'Coordenadas inválidas',
                text: 'Las coordenadas deben ser números válidos.',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            Swal.fire({
                icon: 'error',
                title: 'Coordenadas fuera de rango',
                text: 'La latitud debe estar entre -90 y 90, y la longitud entre -180 y 180.',
                confirmButtonText: 'Entendido'
            });
            return;
        }
    }
    
    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(this);
    formData.append("UserAdminId", usuario);
    
    // Mostrar mensaje de procesamiento
    Swal.fire({
        title: 'Creando entidad...',
        text: 'Por favor espere mientras procesamos la información.',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
            method: 'POST',
            body: formData,
        });

        // Si la respuesta es exitosa
        if (response.ok) {
            const result = await response.json();
            let successMessage = 'Entidad creada con éxito.';
            
            if (result.ubicacionCreada) {
                successMessage += ' La ubicación en el mapa también fue registrada.';
            }
            
            Swal.fire({
                title: '¡Éxito!',
                text: successMessage,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            
            // Limpiar el formulario y cerrar modal
            document.getElementById('entidad-form').reset();
            
            // Limpiar el mapa si existe
            if (typeof locationMarker !== 'undefined' && locationMarker) {
                locationMap.removeLayer(locationMarker);
                locationMarker = null;
            }
            
            // Resetear estilos de coordenadas
            const latInput = document.getElementById('latitud');
            const lngInput = document.getElementById('longitud');
            if (latInput && lngInput) {
                latInput.style.backgroundColor = '#f5f5f5';
                latInput.style.border = '1px solid #ddd';
                lngInput.style.backgroundColor = '#f5f5f5';
                lngInput.style.border = '1px solid #ddd';
            }
            
            location.reload();
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la entidad',
                text: errorData.message || 'Ocurrió un error inesperado',
                confirmButtonText: 'Entendido'
            });
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Hubo un problema al conectar con el servidor. Por favor, intente nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
});

/* 
// COMENTADO: Este manejador está duplicado y causa conflictos
// El manejador correcto está en editarEntidad.js
document.getElementById('entidad-form-editar').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario
    let usuario = getCookie("userId");
    console.log(usuario)
    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(this);
    formData.append("UserAdminId", usuario);
    console.log("FormData antes de enviar:", formData);  // Para asegurarte de que el logo está siendo enviado correctamente

    try {
        const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
            method: 'POST',
            body: formData,  // Enviar el FormData (con el archivo incluido)
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Entidad creada con éxito',
            }).then(() => {
                location.reload();
            });
        } else {
            console.log('Error en la respuesta:', response.error);  // Para depurar
            const errorData = await response.json();
            if (errorData.message && errorData.message.includes('duplicada')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'La entidad ya existe. Por favor, verifica los datos ingresados.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.message || 'Error al crear la entidad',
                });
            }
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el formulario',
        });
    }
});
*/

function getCookie(nombre) {
    const valor = `; ${document.cookie}`;
    const partes = valor.split(`; ${nombre}=`);
    if (partes.length === 2) {
        return partes.pop().split(';').shift();
    }
    return null;
}

/* 
// COMENTADO: Este manejador también está duplicado y causa conflictos
// El manejador correcto está en editarEntidad.js
document.getElementById('entidad-form-editar').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario
    let usuario = getCookie("userId");
    console.log(usuario)
    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(this);
  console.log(miEmpresaID);
    formData.append("UserAdminId", usuario);
    console.log("FormData antes de enviar:", formData);  // Para asegurarte de que el logo está siendo enviado correctamente

    try {
        const response = await fetch(`${API_BASE_URL}/api/entidad/editar/${miEmpresaID}`, {
            method: 'POST',
            body: formData,  // Enviar el FormData (con el archivo incluido)
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Entidad editada con éxito',
            }).then(() => {
                location.reload();
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorData.message || 'Error al editar la entidad',
            });
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el formulario',
        });
    }
});
*/