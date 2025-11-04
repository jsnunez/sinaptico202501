document.getElementById('entidad-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // 1) Valida todos los required del HTML (dirección, selects, etc.)
  if (!this.reportValidity()) return;

  // 2) Valida coordenadas obligatorias
  const latInput = document.getElementById('latitud');
  const lngInput = document.getElementById('longitud');

  // limpia errores previos
  latInput.setCustomValidity('');
  lngInput.setCustomValidity('');

  const latStr = latInput.value.trim();
  const lngStr = lngInput.value.trim();

  // 👉 si quieres que sean obligatorias, corta si están vacías
  if (!latStr || !lngStr) {
    if (!latStr) latInput.setCustomValidity('Seleccione un punto en el mapa (latitud obligatoria).');
    if (!lngStr) lngInput.setCustomValidity('Seleccione un punto en el mapa (longitud obligatoria).');
    this.reportValidity(); // muestra mensajes nativos
    Swal.fire({
      icon: 'warning',
      title: 'Coordenadas requeridas',
      text: 'Haga clic en el mapa para establecer latitud y longitud.',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  // 3) Rango y formato
  const lat = Number(latStr);
  const lng = Number(lngStr);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    Swal.fire({ icon: 'error', title: 'Coordenadas inválidas', text: 'Use números válidos.' });
    return;
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    Swal.fire({
      icon: 'error',
      title: 'Coordenadas fuera de rango',
      text: 'Latitud entre -90 y 90; Longitud entre -180 y 180.'
    });
    return;
  }

  // 4) Si todo OK, continúa con tu envío
  let usuario = getCookie("userId");
  const formData = new FormData(this);
  formData.append("UserAdminId", usuario);

  Swal.fire({
    title: 'Creando entidad...',
    text: 'Por favor espere mientras procesamos la información.',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading()
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      let successMessage = 'Entidad creada con éxito.';
      if (result.ubicacionCreada) successMessage += ' La ubicación en el mapa también fue registrada.';

      await Swal.fire({ title: '¡Éxito!', text: successMessage, icon: 'success', confirmButtonText: 'Aceptar' });

      this.reset();

      if (typeof locationMarker !== 'undefined' && locationMarker) {
        locationMap.removeLayer(locationMarker);
        locationMarker = null;
      }

      const resetStyle = (el) => { el.style.backgroundColor = '#f5f5f5'; el.style.border = '1px solid #ddd'; };
      resetStyle(latInput); resetStyle(lngInput);

      location.reload();
    } else {
      const errorData = await response.json().catch(() => ({}));
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