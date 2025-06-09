function cargarRetos(){  fetch('/api/retos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        return response.json();
    })
    .then(data => {
const tablaRetos = document.querySelector("#tablaRetos tbody");
tablaRetos.innerHTML = "";

data.forEach(reto => {
const fila = document.createElement("tr");

fila.innerHTML = `
<td>${reto.id}</td>
<td>${reto.nombre}</td>
<td>${reto.descripcion}</td>
<td>
    ${reto.ubicacionVideo ? `<button class="action-button" data-video="${reto.ubicacionVideo}" onclick="mostrarVideo('videos/${reto.ubicacionVideo}')">Ver Video</button>` : 'N/A'}
</td>
<td>
    ${reto.ubicacionFicha ? `<button class="action-button" data-ficha="${reto.ubicacionFicha}" onclick="mostrarFicha('fichas/${reto.ubicacionFicha}')">Ver ficha</button>` : 'N/A'}
</td>  
<td>
    ${reto.id ? `<button class="action-button" data-aplicacion="${reto.id}" onclick="mostrarAplicaciones(${reto.id})">Ver aplicaciones</button>` : 'N/A'}
</td>   
<td>${new Date(reto.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
<td>
                    <div class="toggle-switch">
                        <input type="checkbox" id="toggle-${reto.id}" class="toggle-input" ${reto.habilitado ? "checked" : ""}>
                        <label for="toggle-${reto.id}" class="toggle-label"></label>
                        <span>${reto.habilitado ? "Habilitada" : "Deshabilitada"}</span>
                    </div>
                </td>
<td>
    <div class="action-icons">
        <span class="action-icon edit" data-id="${reto.id}" title="Editar"><i class="bi bi-pencil-square"></i></span>
        <span class="action-icon delete" data-id="${reto.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
    </div>
</td>
`;

tablaRetos.appendChild(fila);
});

// 🔁 Re-asignar listeners después de insertar el contenido
document.querySelectorAll(".action-icon.edit").forEach((btn) => {
btn.addEventListener("click", function () {
const id = Number.parseInt(this.getAttribute("data-id"));
editarReto(id);
});
});

document.querySelectorAll(".action-icon.delete").forEach((btn) => {
btn.addEventListener("click", function () {
const id = Number.parseInt(this.getAttribute("data-id"));
confirmarEliminarUsuario(id);
});
});

})                .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos de los retos.', 'error');
    });
}

function mostrarVideo(videoUrl) {
const modal = document.getElementById("videoModal");
const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");

source.src = videoUrl;
video.load();
modal.style.display = "flex";
}

function cerrarModalVideo(event = null) {
console.log("cerrarModalVideo llamado", event); // 👈 esto es para verificar
const modal = document.getElementById("videoModal");
const video = document.getElementById("videoPlayer");

if (!event || event.target === modal) {
video.pause();
video.currentTime = 0;
modal.style.display = "none";
}
}


function mostrarFicha(pdfUrl) {
const modal = document.getElementById("fichaModal");
const iframe = document.getElementById("fichaViewer");

iframe.src = pdfUrl;
modal.style.display = "flex";
}

function cerrarFichaModal(event) {
const modal = document.getElementById("fichaModal");
const iframe = document.getElementById("fichaViewer");

if (!event || event.target === modal) {
iframe.src = ""; // Limpiar para que no siga cargado
modal.style.display = "none";
}
}

function editarReto(id) {
console.log("editarReto llamado con ID:", id); // 👈 esto es para verificar
fetch(`/api/retos/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos del reto');
        }
        return response.json();
    })
    .then(reto => {
        // Abrir el modal
        const modal = document.getElementById("modalEditarReto");
        modal.style.display = "flex";

        // Cargar los datos en el formulario
        document.getElementById("IdReto").innerText = "Editar Reto # "+ reto.id;
        document.getElementById("retoId").value = reto.id;
        document.getElementById("nombreReto").value = reto.nombre;
        document.getElementById("descripcionReto").value = reto.descripcion;
     
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del reto.', 'error');
    });
}

function toggleFichaInput(checkbox) {
const fichaInput = document.getElementById("fichaReto");
fichaInput.disabled = !checkbox.checked;
}
function toggleVideoInput(checkbox) {
const videoInput = document.getElementById("videoReto");
videoInput.disabled = !checkbox.checked;
}

document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('ediRetoForm');

    editForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita el envío predeterminado del formulario
      console.log('Formulario de edición enviado'); // Log para verificar el envío del formulario
      const formData = new FormData(editForm);

      try {
        const response = await fetch(`${API_BASE_URL}/api/retos/${formData.get('retoId')}`, {
          method: 'PUT',
          body: formData,
        });
        modalEditarReto.style.display = 'none';

        if (response.ok) {
          const result = await response.json();
          Swal.fire({
            icon: 'success',
            title: '¡Reto editado exitosamente!',
            text: 'El reto se ha actualizado correctamente.',
            confirmButtonColor: '#3085d6'
          });
          console.log(result);
          editForm.reset();
          cargarRetos();
        } else {
          const error = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error al editar el reto',
            text: error.message || 'Ocurrió un problema en el servidor.',
            confirmButtonColor: '#d33'
          });
          console.error(error);
        }
      } catch (err) {
        console.error('Error en la solicitud:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'No se pudo enviar el formulario. Verifica tu conexión.',
          confirmButtonColor: '#d33'
        });
      }
    });
  });



  document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
      modalEditarReto.style.display = 'none';

    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === modalEditarReto) {
      modalEditarReto.style.display = 'none';

    }
  });

  document.addEventListener('change', async (event) => {
    if (event.target.classList.contains('toggle-input')) {
      const checkbox = event.target;
      const id = checkbox.id.replace('toggle-', '');
      const habilitado = checkbox.checked;

      try {
        const response = await fetch(`/api/retos/habilitar/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ habilitado })
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Estado actualizado',
            text: `El reto ha sido ${habilitado ? 'habilitado' : 'deshabilitado'}.`,
            timer: 1200,
            showConfirmButton: false
          });
          cargarRetos();
        } else {
          throw new Error('No se pudo actualizar el estado');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el estado del reto.', 'error');
        checkbox.checked = !habilitado; // revertir el cambio visual
      }
    }
  });