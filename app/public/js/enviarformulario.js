document.getElementById('entidad-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevenir el envío normal del formulario
    let usuario = getCookie("userId");
    console.log(usuario)
    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData(this);
    formData.append("UserAdminId", usuario);
    try {
        const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
            method: 'POST',
            body: formData,
        });

        // Si la respuesta es exitosa
        if (response.ok) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Entidad creada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });            // Aquí puedes redirigir a otra página o limpiar el formulario
            document.getElementById('entidad-form').reset();
            
                location.reload();
        } else {
            alert('Error al crear la entidad');
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        alert('Hubo un problema al enviar el formulario');
    }
});
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

function getCookie(nombre) {
    const valor = `; ${document.cookie}`;
    const partes = valor.split(`; ${nombre}=`);
    if (partes.length === 2) {
        return partes.pop().split(';').shift();
    }
    return null;
}

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