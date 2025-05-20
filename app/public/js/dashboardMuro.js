document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/clasificados')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            const tablaClasificados = document.querySelector("#tablaClasificados tbody");
            tablaClasificados.innerHTML = ""; // Limpiar la tabla antes de agregar los datos

            data.forEach(clasificado => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
            <td>${clasificado.id}</td>
<td>
<button class="action-button" 
  data-provider='${JSON.stringify(clasificado.provider)}'
  onclick="mostrarDatosDesdeBoton(this)">${clasificado.provider.email}</button>
</td>

            <td>${clasificado.title}</td>
            <td>${clasificado.description}</td>
            <td>${clasificado.type === 'offer' ? 'Oferta' : clasificado.type === 'request' ? 'Pedido' : clasificado.type}</td>
            <td>$${clasificado.price}</td>
     <td>
<button class="action-button" 
  data-provider='${JSON.stringify(clasificado)}'
  onclick="mostrarDatosClasificadoDesdeBoton(this)"> Mas informacion </button>
</td>
            <td>${new Date(clasificado.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
            <td>
                <div class="toggle-switch">
                    <input type="checkbox" id="destacado-${clasificado.id}" class="toggle-input" ${clasificado.featured ? 'checked' : ''} data-id="${clasificado.id}">
                    <label for="destacado-${clasificado.id}" class="toggle-label"></label>
                </div>
            </td>
            <td>
                     <span class="btnEditar" data-id="${clasificado.id}" title="Editar"> <i class="bi bi-pencil-square"></i></span>
                <span class="action-icon delete" data-id="${clasificado.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
            </td>
        `;

                tablaClasificados.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'No se pudieron cargar los Clasificados.', 'error');
        });
});

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

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnEditar")) {
        const retoId = event.target.getAttribute("data-id");

        fetch(`/api/Clasificados/${retoId}`)
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
                document.getElementById("IdReto").innerText = "Editar Reto # " + reto.id;
                document.getElementById("retoId").value = reto.id;
                document.getElementById("nombreReto").value = reto.nombre;
                document.getElementById("descripcionReto").value = reto.descripcion;

            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudieron cargar los datos del reto.', 'error');
            });
    }
});
function toggleFichaInput(checkbox) {
    const fichaInput = document.getElementById("fichaReto");
    fichaInput.disabled = !checkbox.checked;
}
function toggleVideoInput(checkbox) {
    const videoInput = document.getElementById("videoReto");
    videoInput.disabled = !checkbox.checked;
}

function mostrarDatosDesdeBoton(button) {
    const rawData = button.getAttribute('data-provider');

    let provider;
    try {
        provider = JSON.parse(rawData);
    } catch (e) {
        Swal.fire('Error', 'Error al leer los datos del proveedor', 'error');
        return;
    }

    let detalles = `
<strong>ID:</strong> ${provider.id || 'N/A'}<br>
<strong>Nombre:</strong> ${provider.name || 'N/A'}<br>
<strong>Email:</strong> ${provider.email || 'N/A'}<br>
<strong>Teléfono:</strong> ${provider.telefono || 'N/A'}
`;

    const detallesContainer = document.getElementById('detallesContainer');
    if (detallesContainer) {
        detallesContainer.innerHTML = detalles;
    } else {
        Swal.fire({
            title: 'Detalles del Proveedor',
            html: detalles,
            icon: 'info',
            confirmButtonText: 'Cerrar'
        });
    }
}

function mostrarDatosClasificadoDesdeBoton(button) {
    const rawData = button.getAttribute('data-provider');

    let clasificado;
    try {
        clasificado = JSON.parse(rawData);
    } catch (e) {
        Swal.fire('Error', 'Error al leer los datos del clasificado', 'error');
        return;
    }

    let detalles = `
<strong>ID:</strong> ${clasificado.id || 'N/A'}<br>
<strong>Título:</strong> ${clasificado.title || 'N/A'}<br>
<strong>Descripción:</strong> ${clasificado.description || 'N/A'}<br>
<strong>Precio:</strong> $${clasificado.price || 'N/A'}<br>
<strong>Categoria:</strong> ${clasificado.category || 'N/A'}<br>

        <strong>ubicacion:</strong> ${clasificado.location || 'N/A'}<br>

<strong>Fecha de Creación:</strong> ${new Date(clasificado.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}<br>
<strong>Destacado:</strong> ${clasificado.destacado ? 'Sí' : 'No'}
`;

    Swal.fire({
        title: 'Detalles del Clasificado',
        html: detalles,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
}

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("toggle-input")) {
    const checkbox = event.target;
    const clasificadoId = checkbox.getAttribute("data-id");
    const featured = checkbox.checked;
    fetch(`/api/clasificados/${clasificadoId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({"featured":featured })
    })
    .then(response => {
        if (!response.ok) {
        throw new Error("Error al actualizar el estado de featured");
        }
        return response.json();
    })
    .then(data => {
        Swal.fire("Éxito", "El estado de destacado se ha actualizado correctamente.", "success");

    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire("Error", "No se pudo actualizar el estado de destacado.", "error");
        checkbox.checked = !destacado; // Revertir el cambio en caso de error
    });
    }
});