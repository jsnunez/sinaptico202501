function abrirModalAgregarServicio() {
    document.getElementById("myModalAsignarServicio").style.display = "flex";
    llamarMisServicios(idEntidad);
}
const inputServicio = document.getElementById('descripcionServicio');
const formulario = document.getElementById('servicio-form-crear');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const servicio = inputServicio.value.trim();
    if (servicio.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor escribe una descripción.'
        });
        return;
    }

    try {
        const respuesta = await fetch(`${API_BASE_URL}/api/servicio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: servicio,
                entidadId: idEntidad
            })
        });

        if (respuesta.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Servicio creado!',
                text: 'El servicio ha sido creado exitosamente.'
            });

            formulario.reset();
            // document.getElementById('myModalAsignarServicio').style.display = 'none';
            // overlay.style.display = 'none'; // Ocultar overlay
            llamarMisServicios(idEntidad);

        } else {
            const errorData = await respuesta.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorData.mensaje || 'No se pudo crear el servicio.'
            });
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al conectarse con el servidor.'
        });
    }
});


async function llamarMisServicios(idEntidad) {
    let url = `${API_BASE_URL}/api/servicio/entidad/${idEntidad}`;
    let data = await fetch(url);
    let datos = await data.json();
    console.log(datos);

    if (datos.success) {
        let servicios = datos.servicios;

        let serviciosHTML = `
        <table  class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
      `;

        servicios.forEach(servicio => {
            serviciosHTML += `
          <tr>
            <td>${servicio.descripcion}</td>
            <td>
             <div class="action-icons">
              <span class="action-icon edit" title="Editar" onclick="editarServicio(${servicio.id})">
                     <i class="bi bi-pencil"></i>
                </span>              
               <span class="action-icon delete" title="Eliminar" onclick="eliminarServicio(${servicio.id})">
                   <i class="bi bi-trash3"></i>
                </span>
               </div>
            </td>
          </tr>
        `;
        });

        serviciosHTML += `
          </tbody>
        </table>
      `;

        document.getElementById('misServiciosTabla').innerHTML = serviciosHTML;
    } else {
        console.log(datos.mensaje || 'No se encontraron servicios.');
    }
}
async function editarServicio(id) {
    const { value: nuevaDescripcion } = await Swal.fire({
      title: 'Editar Servicio',
      input: 'text',
      inputLabel: 'Nueva descripción del servicio',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'La descripción no puede estar vacía';
        }
      }
    });
  
    if (!nuevaDescripcion) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/servicio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion: nuevaDescripcion })
      });
  
      const resultado = await response.json();
  
      if (resultado.success) {
        await Swal.fire({
          title: '¡Actualizado!',
          text: 'El servicio fue editado correctamente.',
          icon: 'success'
        });
        llamarMisServicios(idEntidad); // Asegúrate que esta variable esté definida
      } else {
        await Swal.fire({
          title: 'Error',
          text: resultado.mensaje || 'No se pudo actualizar el servicio.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error al editar servicio:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar editar el servicio.',
        icon: 'error'
      });
    }
  }
  
async function eliminarServicio(id) {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el servicio permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/servicio/${id}`, {
        method: 'DELETE'
      });
  
      const resultado = await response.json();
  
      if (resultado.success) {
        await Swal.fire({
          title: 'Eliminado',
          text: 'El servicio ha sido eliminado correctamente.',
          icon: 'success'
        });
        llamarMisServicios(idEntidad); // Asegúrate de que `idEntidad` esté disponible
      } else {
        await Swal.fire({
          title: 'Error',
          text: resultado.mensaje || 'No se pudo eliminar el servicio.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar eliminar el servicio.',
        icon: 'error'
      });
    }
  }
  