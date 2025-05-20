function cargarRetos(){  fetch('/api/recurso')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        return response.json();
    })
    .then(data => {
const tablaRetos = document.querySelector("#tablaRetos tbody");
tablaRetos.innerHTML = "";

data.forEach(recurso => {
const fila = document.createElement("tr");

fila.innerHTML = `
<td>${recurso.id}</td>
<td>${recurso.nombre}</td>
<td>${recurso.descripcion}</td>
<td>
    ${recurso.ubicacion ? `<button class="action-button" data-ficha="${recurso.ubicacion}" onclick="mostrarFicha('recursos/${recurso.ubicacion}')">Ver ficha</button>` : 'N/A'}
</td>  
 
<td>${new Date(recurso.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
<td>
    <div class="action-icons">
        <span class="action-icon edit" data-id="${recurso.id}" title="Editar"><i class="bi bi-pencil-square"></i></span>
        <span class="action-icon delete" data-id="${recurso.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
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
fetch(`/api/recurso/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos del reto');
        }
        return response.json();
    })
    .then(recurso => {
        // Abrir el modal
        const modal = document.getElementById("modalEditarrecurso");
        modal.style.display = "flex";

        // Cargar los datos en el formulario
        document.getElementById("IdRecurso").innerText = "Editar Recurso # "+ recurso.id;
        document.getElementById("recursoId").value = recurso.id;
        document.getElementById("nombreRecurso").value = recurso.nombre;
        document.getElementById("descripcionRecurso").value = recurso.descripcion;
     
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del reto.', 'error');
    });
}

function toggleFichaInput(checkbox) {
const fichaInput = document.getElementById("recurso-edit");
fichaInput.disabled = !checkbox.checked;
}


document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('ediRecursoForm');

    editForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita el envío predeterminado del formulario
      console.log('Formulario de edición enviado'); // Log para verificar el envío del formulario
      const formData = new FormData(editForm);
      console.log('Datos del formulario:', Array.from(formData.entries())); // Log para verificar los datos del formulario
      try {
       const response = await fetch(`${API_BASE_URL}/api/recurso/${formData.get('recursoId')}`, {
  method: 'PUT',
  body: formData,
});
        modalEditarrecurso.style.display = 'none';

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
      modalEditarrecurso.style.display = 'none';

    });
  });

  window.addEventListener('click', (event) => {
    if (event.target === modalEditarrecurso) {
      modalEditarrecurso.style.display = 'none';

    }
  });