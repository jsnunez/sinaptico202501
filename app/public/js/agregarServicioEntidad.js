function abrirModalAgregarServicio(idEntidadModificar) {
  document.getElementById("myModalAsignarServicio").style.display = "flex";
  llamarMisServicios(idEntidadModificar);
  console.log("Llamando a líderes para la entidad:", idEntidadModificar);
  llamarLideres(idEntidadModificar);
}

async function llamarLideres(empresaId) {
  const nombreLiderInput = document.getElementById('nombreLiderServicio');
  const correoLiderInput = document.getElementById('correoLider');
  const telefonoLiderInput = document.getElementById('telefonoLider');

  const selectLider = document.createElement('select');
  selectLider.id = 'nombreLiderServicio';
  selectLider.name = 'nombreLiderServicio';
  selectLider.required = true;

  try {
    const res = await fetch(`/api/usuarioempresa/empresa/${empresaId}`);
    const data = await res.json();

    (data || []).forEach(item => {
      const option = document.createElement('option');
      option.value = item.User.id;
      option.text = `${item.User.name} (${item.Cargo?.nombre || 'Sin cargo'})`;
      option.dataset.email = item.User.email || '';
      option.dataset.telefono = item.User.telefono || '';
      selectLider.appendChild(option);
    });
  } catch (err) {
    console.error('Error cargando líderes de empresa:', err);
  }

  // Seleccionar el primero y actualizar campos
  if (selectLider.options.length > 0) {
    const selectedOption = selectLider.options[0];
    if (correoLiderInput) correoLiderInput.value = selectedOption.dataset.email || '';
    if (telefonoLiderInput) telefonoLiderInput.value = selectedOption.dataset.telefono || '';
  } else {
    if (correoLiderInput) correoLiderInput.value = '';
    if (telefonoLiderInput) telefonoLiderInput.value = '';
  }

  // Cambiar correo y teléfono al cambiar líder
  selectLider.onchange = function () {
    const selectedOption = selectLider.options[selectLider.selectedIndex];
    if (correoLiderInput) correoLiderInput.value = selectedOption.dataset.email || '';
    if (telefonoLiderInput) telefonoLiderInput.value = selectedOption.dataset.telefono || '';
  };

  if (nombreLiderInput && nombreLiderInput.parentNode) {
    nombreLiderInput.parentNode.replaceChild(selectLider, nombreLiderInput);
  } else {
    const cont = document.getElementById('contenedorLider') || document.body;
    cont.appendChild(selectLider);
  }
}

const inputServicio = document.getElementById('descripcionServicio');
const formulario = document.getElementById('servicio-form-crear');
const nombreServicio = document.getElementById('nombreServicio');

const iconoServicio = document.getElementById('iconoServicio');

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
  const liderIdServicio = document.getElementById('nombreLiderServicio').value;
  console.log("Líder seleccionado inicialmente:", liderIdServicio);

  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/servicio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descripcion: servicio,
        entidadId: idEntidad,
        nombre: nombreServicio.value,
        liderId: liderIdServicio,
        icono: iconoServicio.value // Puedes ajustar esto según tus necesidades

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
            <th>icono</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Lider</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
      `;

    servicios.forEach(servicio => {
      serviciosHTML += `
          <tr>
            <td><i class="${servicio.icono}"></i></td>
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>${servicio.lider}</td>
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
  try {
    // Obtener los datos actuales del servicio
    const responseServicio = await fetch(`${API_BASE_URL}/api/servicio/${id}`);

    // Verificar si la respuesta es HTML (error de servidor)
    const contentType = responseServicio.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`El servidor no devolvió JSON. Verifica la ruta de la API.`);
    }

    if (!responseServicio.ok) {
      throw new Error(`Error ${responseServicio.status}: No se pudo obtener el servicio`);
    }
    const servicioActual = await responseServicio.json();
    console.log('Datos actuales del servicio:', servicioActual);
    const { value: formValues } = await Swal.fire({
      title: 'Editar Servicio',
      html: `
   
          <div class="input-box full-width">
              <label for="swal-nombre" style"text-aling:left;">Nombre del servicio:</label>
              <input id="swal-nombre"  placeholder="Nombre" value="${servicioActual.nombre || ''}">
          </div>
          <div class="input-box full-width">
              <label for="swal-descripcion" >Descripción:</label>
              <input id="swal-descripcion" placeholder="Descripción" value="${servicioActual.descripcion || ''}">
          </div>
          <div class="input-box full-width">
              <label for="swal-icono" >Icono:</label>
              <select id="swal-icono" >
              <option value="">Seleccione un icono</option>
              <option value="bi-briefcase">💼 Negocios</option>
              <option value="bi-lightbulb">💡 Innovación</option>
              <option value="bi-graph-up">📈 Crecimiento</option>
              <option value="bi-people">👥 Equipo</option>
              <option value="bi-gear">⚙️ Configuración</option>
              <option value="bi-shield-check">🛡️ Seguridad</option>
              <option value="bi-chat-dots">💬 Comunicación</option>
              <option value="bi-laptop">💻 Tecnología</option>
              <option value="bi-book">📚 Educación</option>
              <option value="bi-trophy">🏆 Logros</option>
              <option value="bi-heart">❤️ Salud</option>
              <option value="bi-cart">🛒 Ventas</option>
              <option value="bi-globe">🌍 Global</option>
              <option value="bi-star">⭐ Premium</option>
              <option value="bi-camera">📷 Multimedia</option>
              </select>
          </div>
          <div class="input-box full-width">
              <label for="swal-lider" >Líder:</label>
              <select id="swal-lider" >
              <option value="">Cargando líderes...</option>
              </select>
          </div>
       
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      width: '600px',
      didOpen: async () => {
        const selectLider = document.getElementById('swal-lider');
        const selectIcono = document.getElementById('swal-icono');
        const liderIdActual = servicioActual.servicio?.liderId;
        const iconoActual = servicioActual.icono;

        console.log('Líder actual del servicio:', liderIdActual);
        console.log('Icono actual del servicio:', iconoActual);

        // Establecer el icono seleccionado
        if (iconoActual) {
          selectIcono.value = iconoActual;
        }

        try {
          const res = await fetch(`/api/usuarioempresa/empresa/${idEntidad}`);
          const data = await res.json();
          console.log('Líderes disponibles:', data);

          selectLider.innerHTML = '';
          (data || []).forEach(item => {
            const option = document.createElement('option');
            option.value = item.User.id;
            option.text = `${item.User.name} (${item.Cargo?.nombre || 'Sin cargo'})`;
            selectLider.appendChild(option);
          });

          // Establecer el valor seleccionado después de poblar las opciones
          if (liderIdActual) {
            selectLider.value = liderIdActual;
          }
        } catch (err) {
          console.error('Error cargando líderes:', err);
          selectLider.innerHTML = '<option value="">Error al cargar líderes</option>';
        }
      },
      preConfirm: () => {
        const nombre = document.getElementById('swal-nombre').value;
        const descripcion = document.getElementById('swal-descripcion').value;
        const icono = document.getElementById('swal-icono').value;
        const liderId = document.getElementById('swal-lider').value;

        if (!nombre || !descripcion) {
          Swal.showValidationMessage('El nombre y la descripción son obligatorios');
          return false;
        }

        return { nombre, descripcion, icono, liderId };
      }
    });

    if (!formValues) return;

    const response = await fetch(`${API_BASE_URL}/api/servicio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    });

    const resultado = await response.json();

    if (resultado.success) {
      await Swal.fire({
        title: '¡Actualizado!',
        text: 'El servicio fue editado correctamente.',
        icon: 'success'
      });
      llamarMisServicios(idEntidad);
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
