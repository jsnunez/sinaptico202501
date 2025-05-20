


document.addEventListener("DOMContentLoaded", () => {


    // Navegación entre páginas
    setupNavigation()

    // Inicializar la página actual
    initCurrentPage()
})
let datosUsuario = [];


// Función para configurar la navegación entre páginas
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-button, .action-button, .card")

    navButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const page = this.getAttribute("data-page")
            if (page) {
                if (page === "dashboard") {
                    window.location.href = "dashboard"
                } else {
                    window.location.href = `${page}`
                }
            }
        })
    })
}

let paginaActual = 1;
const filasPorPagina = 10;
// Función para inicializar la página actual
function initCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0]

    if (currentPage === "index" || currentPage === "") {
        // Página de dashboard
    } else if (currentPage === "usuarios") {
        initUsuariosPage()
    } else if (currentPage === "entidades") {
        initEntidadesPage()
    } else if (currentPage === "retos") {
        initRetosPage()
    }
}


// Función para inicializar la página de entidades
function initEntidadesPage() {
    // Datos de ejemplo

    let entidades = [];
    let filtradas = [];
    // Obtener datos desde la API
    fetch(`${API_BASE_URL}/api/entidad/entidades`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener las entidades");
            }
            return response.json();
        })
        .then((data) => {
            entidades = data;

            // Obtener datos de contacto para cada entidad
            if (entidades.empresas && entidades.empresas.length > 0) {
                const contactPromises = entidades.empresas.map((entidad) => {
                    return fetch(`${API_BASE_URL}/api/contactos/${entidad.contactoId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener los datos de contacto");
                            }
                            return response.json();
                        })
                        .then((contacto) => {
                            entidad.contacto = contacto; // Agregar datos de contacto a la entidad
                        })
                        .catch((error) => console.error("Error:", error));
                });
              // Obtener el email del administrador para cada entidad
            entidades.empresas.forEach((entidad) => {
                contactPromises.push(
                    fetch(`${API_BASE_URL}/api/user/email/${entidad.UserAdminId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener el email del administrador");
                            }
                            return response.json();
                        })
                        .then((email) => {
                            entidad.emailAdmin = email; // Agregar email del administrador a la entidad
                        })
                        .catch((error) => console.error("Error:", error))
                );
            });
            // Esperar a que se resuelvan todas las promesas de contacto
            Promise.all(contactPromises).then(() => {
                renderEntidades(entidades.empresas); // Renderizar la tabla
                document.getElementById("tablaEntidades").style.display = "table"; // Mostrar tabla
                document.getElementById("paginacionEntidades").style.display = "block"; // Mostrar paginación
                document.getElementById("loaderEntidades").style.display = "none";

            });
        }
        else {
            document.getElementById("loaderEntidades").innerText = "No existen entidades en este momento.";
      
        }
        
        
        })
        .catch((error) => console.error("Error:", error));


    const tablaEntidades = document.getElementById("tablaEntidades")
    if (!tablaEntidades) return

    const tbody = tablaEntidades.querySelector("tbody")

    function renderEntidades(entidadesList, pagina = 1) {
        tbody.innerHTML = "";

        const inicio = (pagina - 1) * filasPorPagina;
        const fin = inicio + filasPorPagina;
        const entidadesPagina = entidadesList.slice(inicio, fin);

        if (entidadesPagina.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="8" style="text-align: center;">No se encontraron entidades</td>`;
            tbody.appendChild(tr);
        } else {

            entidadesPagina.forEach((entidad) => {
                // console.log("Entidad:", entidad)
                // Obtener datos del usuario administrador
                // console.log("ID del usuario administrador:", entidad.UserAdminId)
                fetch(`${API_BASE_URL}/api/user/email/${entidad.UserAdminId}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al obtener el ID del usuario administrador");
                        }
                        return response.json();
                    })
                    .then((email) => {
                        emailAdmin = email; // Almacenar el email del admin
                        entidad.emailAdmin = email; // Guardar el email en la entidad
                    })
                    .catch((error) => console.error("Error:", error));      // Cargar tabla de entidades
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${entidad.id}</td>
                <td>${entidad.razonSocial}</td>
                <td>${entidad.numIdentificacion}</td>
                <td>${entidad.contacto?.nombre ?? ''}</td>
                <td>${entidad.contacto?.telefono ?? ''}</td>
                <td>${ entidad.emailAdmin.email}</td>
                <td>
                    <div class="toggle-switch">
                        <input type="checkbox" id="toggle-${entidad.id}" class="toggle-input" ${entidad.habilitado ? "checked" : ""}>
                        <label for="toggle-${entidad.id}" class="toggle-label"></label>
                        <span>${entidad.habilitado ? "Habilitada" : "Deshabilitada"}</span>
                    </div>
                </td>
                <td>
                    <div class="action-icons">
                        <span class="action-icon edit" data-id="${entidad.id}" title="Editar"> <i class="bi bi-pencil-square"></i></span>
                        <span class="action-icon delete" data-id="${entidad.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
                    </div>
                </td>
            `;
                tbody.appendChild(tr);
            });
        }

        renderPaginacion(entidadesList.length, pagina);

        function renderPaginacion(totalItems, paginaActual) {
            const inicio = (paginaActual - 1) * filasPorPagina;
            const fin = inicio + filasPorPagina;
            const filtradas = entidadesList.slice(inicio, fin);
            const totalPaginas = Math.ceil(totalItems / filasPorPagina);

            const paginacionContainer = document.getElementById("paginacionEntidades");
            paginacionContainer.innerHTML = "";

            for (let i = 1; i <= totalPaginas; i++) {
                const btn = document.createElement("button");
                btn.className = "pagination-button";
                btn.textContent = i;
                if (i === paginaActual) {
                    btn.classList.add("active");
                }
                btn.addEventListener("click", () => {
                    console.log("Pagina: ", i)
                    paginaActual = i;

                    renderEntidades(entidades.empresas, i);
                });
                paginacionContainer.appendChild(btn);
            }
        }



        // Enviar cambio de estado a la base de datos
        document.querySelectorAll(".toggle-input").forEach((toggle) => {
            toggle.addEventListener("change", function () {
                const id = Number.parseInt(this.id.split("-")[1]);
                const estado = this.checked;

                fetch(`${API_BASE_URL}/api/entidad/cambiarEstado/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, habilitado: estado }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error al cambiar el estado de la entidad',
                            });
                            throw new Error("Error al cambiar el estado de la entidad");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: `El estado de la entidad se ${estado ? 'habilitó' : 'deshabilitó'} correctamente`,
                        });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        // Revertir el cambio en caso de error
                        this.checked = !estado;
                    });
            });
        });
        // Agregar eventos a los botones de acción
        document.querySelectorAll(".action-icon.edit").forEach((btn) => {
            btn.addEventListener("click", function () {
                const id = Number.parseInt(this.getAttribute("data-id"))
                editarEntidad(id)
            })
        })

        document.querySelectorAll(".action-icon.delete").forEach((btn) => {
            btn.addEventListener("click", function () {
                const id = Number.parseInt(this.getAttribute("data-id"))
                confirmarEliminarEntidad(id)
            })
        })

        // Agregar eventos a los toggles
        document.querySelectorAll(".toggle-input").forEach((toggle) => {
            toggle.addEventListener("change", function () {
                const id = Number.parseInt(this.id.split("-")[1])

            })
        })
    }

    // Renderizar entidades iniciales
    renderEntidades(entidades)

    // Búsqueda de entidades
    buscarEntidad.addEventListener("input", function () {
        const busqueda = this.value.toLowerCase();
        filtradas = entidades.empresas.filter(
            (entidad) => entidad.razonSocial.toLowerCase().includes(busqueda)
        );
        renderEntidades(filtradas, 1);
    });

    // Modal de entidad
    const modalEntidad = document.getElementById("modalEntidad")
    const btnNuevaEntidad = document.getElementById("btnNuevaEntidad")
    const formEntidad = document.getElementById("formEntidad")
    const closeButtons = document.querySelectorAll(".close")

    // Abrir modal para nueva entidad
    if (btnNuevaEntidad) {
        btnNuevaEntidad.addEventListener("click", () => {
            document.getElementById("tituloModalEntidad").textContent = "Nueva Entidad"
            document.getElementById("entidadId").value = ""
            document.getElementById("nombreEntidad").value = ""
            document.getElementById("tipoEntidad").value = "Corporativa"

            // Configurar toggle para nueva entidad
            document.getElementById("estadoEntidad").checked = true
            document.getElementById("estadoEntidadText").textContent = "Habilitada"

            modalEntidad.style.display = "block"
        })
    }

    // Cerrar modales
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none"
            })
        })
    })

    // Cambiar texto del toggle
    const estadoEntidadToggle = document.getElementById("estadoEntidad")
    if (estadoEntidadToggle) {
        estadoEntidadToggle.addEventListener("change", function () {
            document.getElementById("estadoEntidadText").textContent = this.checked ? "Habilitada" : "Deshabilitada"
        })
    }

    // Guardar entidad
    if (formEntidad) {
        formEntidad.addEventListener("submit", (e) => {
            e.preventDefault()

            const id = document.getElementById("entidadId").value
            const nombre = document.getElementById("nombreEntidad").value
            const tipo = document.getElementById("tipoEntidad").value
            const habilitada = document.getElementById("estadoEntidad").checked

            if (id) {
                // Editar entidad existente
                const index = entidades.findIndex((e) => e.id === Number.parseInt(id))

                if (index !== -1) {
                    entidades[index] = {
                        ...entidades[index],
                        nombre,
                        tipo,
                        habilitada,
                    }
                }
            } else {
                // Crear nueva entidad
                const nuevoId = entidades.length > 0 ? Math.max(...entidades.map((e) => e.id)) + 1 : 1

                entidades.push({
                    id: nuevoId,
                    nombre,
                    tipo,
                    habilitada,
                })
            }

            renderEntidades(entidades)
            modalEntidad.style.display = "none"
        })
    }

    // Función para editar entidad
    function editarEntidad(id) {
        const entidad = entidades.find((e) => e.id === id)

        if (entidad) {
            document.getElementById("tituloModalEntidad").textContent = "Editar Entidad"
            document.getElementById("entidadId").value = entidad.id
            document.getElementById("nombreEntidad").value = entidad.nombre
            document.getElementById("tipoEntidad").value = entidad.tipo
            document.getElementById("estadoEntidad").checked = entidad.habilitada
            document.getElementById("estadoEntidadText").textContent = entidad.habilitada ? "Habilitada" : "Deshabilitada"

            modalEntidad.style.display = "block"
        }
    }



    // Modal de confirmación para eliminar
    const modalConfirmacion = document.getElementById("modalConfirmacion")
    const btnCancelarEliminar = document.getElementById("btnCancelarEliminar")
    const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar")
    let entidadIdEliminar = null

    // Función para mostrar confirmación de eliminación
    function confirmarEliminarEntidad(id) {
        entidadIdEliminar = id
        modalConfirmacion.style.display = "block"
    }

    // Cancelar eliminación
    if (btnCancelarEliminar) {
        btnCancelarEliminar.addEventListener("click", () => {
            modalConfirmacion.style.display = "none"
            entidadIdEliminar = null
        })
    }

    // Confirmar eliminación
    if (btnConfirmarEliminar) {
        btnConfirmarEliminar.addEventListener("click", () => {
            if (entidadIdEliminar !== null) {
                const index = entidades.findIndex((e) => e.id === entidadIdEliminar)

                if (index !== -1) {
                    entidades.splice(index, 1)
                    renderEntidades(entidades)
                }

                modalConfirmacion.style.display = "none"
                entidadIdEliminar = null
            }
        })
    }
}



