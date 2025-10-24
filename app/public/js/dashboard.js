let usuariosFiltrados = []; // Se usará para mostrar los usuarios después del filtro


document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el fondo neuronal
  initNeuralBackground()

  // // Navegación entre páginas
  // setupNavigation()

  // Inicializar la página actual
  initCurrentPage();
  fetchChallengeCount();
  fetchEntidadesCount();
  fetchUserCount();
  fetchClasificadosCount();
})
let datosUsuario = [];

// Función para inicializar el fondo neuronal
function initNeuralBackground() {
  const canvas = document.getElementById("neuralCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Ajustar el tamaño del canvas al tamaño de la ventana
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Crear nodos para la red neuronal
  const nodes = []
  const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 30)

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })
  }

  // Función para dibujar la red neuronal
  const drawNeuralNetwork = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Actualizar posiciones de los nodos
    nodes.forEach((node) => {
      node.x += node.vx
      node.y += node.vy

      // Rebotar en los bordes
      if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
      if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

      // Dibujar nodo
      ctx.beginPath()
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(110, 72, 170, 0.5)"
      ctx.fill()
    })

    // Dibujar conexiones entre nodos cercanos
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(110, 72, 170, ${0.2 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(drawNeuralNetwork)
  }

  drawNeuralNetwork()
}

// // Función para configurar la navegación entre páginas
// function setupNavigation() {
//   const navButtons = document.querySelectorAll(".nav-button, .action-button, .card")

//   navButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const page = this.getAttribute("data-page")
//       if (page) {
//         if (page === "dashboard") {
//           window.location.href = "dashboard"
//         } else {
//           window.location.href = `${page}`
//         }
//       }
//     })
//   })
// }

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

  // Obtener datos desde la API
  fetch(`${API_BASE_URL}/api/entidad`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las entidades");
      }
      return response.json();
    })
    .then((data) => {
      entidades = data;
      renderEntidades(entidades); // Renderizar las entidades obtenidas
    })
    .catch((error) => console.error("Error:", error));
  // Cargar tabla de entidades
  const tablaEntidades = document.getElementById("tablaEntidades")
  if (!tablaEntidades) return

  const tbody = tablaEntidades.querySelector("tbody")

  function renderEntidades(entidadesList) {
    tbody.innerHTML = ""

    if (entidadesList.length === 0) {
      const tr = document.createElement("tr")
      tr.innerHTML = `<td colspan="5" style="text-align: center;">No se encontraron entidades</td>`
      tbody.appendChild(tr)
      return
    }

    entidadesList.forEach((entidad) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
                  <td>${entidad.id}</td>
                  <td>${entidad.nombre}</td>
                  <td>${entidad.tipo}</td>
                  <td>
                      <div class="toggle-switch">
                          <input type="checkbox" id="toggle-${entidad.id}" class="toggle-input" ${entidad.habilitada ? "checked" : ""}>
                          <label for="toggle-${entidad.id}" class="toggle-label"></label>
                          <span>${entidad.habilitada ? "Habilitada" : "Deshabilitada"}</span>
                      </div>
                  </td>
                  <td>
                      <div class="action-icons">
                          <span class="action-icon edit" data-id="${entidad.id}" title="Editar"><i class="fas fa-edit"></i></span>
                          <span class="action-icon delete" data-id="${entidad.id}" title="Eliminar"><i class="fas fa-trash"></i></span>
                      </div>
                  </td>
              `
      tbody.appendChild(tr)
    })

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
        cambiarEstadoEntidad(id, this.checked)
      })
    })
  }

  // Renderizar entidades iniciales
  renderEntidades(entidades)

  // Búsqueda de entidades
  const buscarEntidad = document.getElementById("buscarEntidad")
  if (buscarEntidad) {
    buscarEntidad.addEventListener("input", function () {
      const busqueda = this.value.toLowerCase()
      const entidadesFiltradas = entidades.filter(
        (entidad) => entidad.nombre.toLowerCase().includes(busqueda) || entidad.tipo.toLowerCase().includes(busqueda),
      )
      renderEntidades(entidadesFiltradas)
    })
  }

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

  // Función para cambiar estado de entidad
  function cambiarEstadoEntidad(id, estado) {
    const index = entidades.findIndex((e) => e.id === id)

    if (index !== -1) {
      entidades[index].habilitada = estado
      renderEntidades(entidades)
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

// Función para inicializar la página de retos
function initRetosPage() {
  // Datos de ejemplo
  const retos = [


  ]

  // Cargar tabla de retos
  const tablaRetos = document.getElementById("tablaRetos")
  if (!tablaRetos) return

  const tbody = tablaRetos.querySelector("tbody")

  function renderRetos(retosList) {
    tbody.innerHTML = ""

    if (retosList.length === 0) {
      const tr = document.createElement("tr")
      tr.innerHTML = `<td colspan="6" style="text-align: center;">No se encontraron retos</td>`
      tbody.appendChild(tr)
      return
    }

    retosList.forEach((reto) => {
      const tr = document.createElement("tr")

      // Determinar clase de badge según dificultad
      let dificultadClass = "badge-secondary"
      if (reto.dificultad === "Alta") dificultadClass = "badge-danger"
      else if (reto.dificultad === "Media") dificultadClass = "badge-primary"
      else if (reto.dificultad === "Baja") dificultadClass = "badge-success"

      // Determinar clase de badge según estado
      let estadoClass = "badge-light"
      if (reto.estado === "Activo") estadoClass = "badge-primary"
      else if (reto.estado === "Finalizado") estadoClass = "badge-secondary"
      else if (reto.estado === "Próximo") estadoClass = "badge-info"

      tr.innerHTML = `
                  <td>${reto.id}</td>
                  <td>${reto.titulo}</td>
                  <td><span class="badge ${dificultadClass}">${reto.dificultad}</span></td>
                  <td><span class="badge ${estadoClass}">${reto.estado}</span></td>
                  <td>
                      <div class="fechas-reto">
                          <div>Inicio: ${formatDate(reto.fechaInicio)}</div>
                          <div>Fin: ${formatDate(reto.fechaFin)}</div>
                      </div>
                  </td>
                  <td>
                      <div class="action-icons">
                          <span class="action-icon view" data-id="${reto.id}" title="Ver detalles"><i class="fas fa-eye"></i></span>
                          <span class="action-icon edit" data-id="${reto.id}" title="Editar"><i class="fas fa-edit"></i></span>
                          <span class="action-icon delete" data-id="${reto.id}" title="Eliminar"><i class="fas fa-trash"></i></span>
                      </div>
                  </td>
              `
      tbody.appendChild(tr)
    })

    // Agregar eventos a los botones de acción
    document.querySelectorAll(".action-icon.view").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        verDetallesReto(id)
      })
    })

    document.querySelectorAll(".action-icon.edit").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        editarReto(id)
      })
    })

    document.querySelectorAll(".action-icon.delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = Number.parseInt(this.getAttribute("data-id"))
        confirmarEliminarReto(id)
      })
    })
  }

  // Formatear fecha
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Renderizar retos iniciales
  renderRetos(retos)

  // Búsqueda de retos
  const buscarReto = document.getElementById("buscarReto")
  if (buscarReto) {
    buscarReto.addEventListener("input", function () {
      const busqueda = this.value.toLowerCase()
      const retosFiltrados = retos.filter(
        (reto) => reto.titulo.toLowerCase().includes(busqueda) || reto.descripcion.toLowerCase().includes(busqueda),
      )
      renderRetos(retosFiltrados)
    })
  }

  // Modal de reto
  const modalReto = document.getElementById("modalReto")
  const modalDetallesReto = document.getElementById("modalDetallesReto")
  const btnNuevoReto = document.getElementById("btnNuevoReto")
  const formReto = document.getElementById("formReto")
  const closeButtons = document.querySelectorAll(".close")

  // Abrir modal para nuevo reto
  if (btnNuevoReto) {
    btnNuevoReto.addEventListener("click", () => {
      document.getElementById("tituloModalReto").textContent = "Nuevo Reto"
      document.getElementById("retoId").value = ""
      document.getElementById("tituloReto").value = ""
      document.getElementById("descripcionReto").value = ""
      document.getElementById("dificultadReto").value = "Media"
      document.getElementById("estadoReto").value = "Próximo"
      document.getElementById("fechaInicioReto").value = ""
      document.getElementById("fechaFinReto").value = ""

      modalReto.style.display = "block"
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

  // Cerrar modal de detalles
  const btnCerrarDetalles = document.getElementById("btnCerrarDetalles")
  if (btnCerrarDetalles) {
    btnCerrarDetalles.addEventListener("click", () => {
      modalDetallesReto.style.display = "none"
    })
  }

  // Guardar reto
  if (formReto) {
    formReto.addEventListener("submit", (e) => {
      e.preventDefault()

      const id = document.getElementById("retoId").value
      const titulo = document.getElementById("tituloReto").value
      const descripcion = document.getElementById("descripcionReto").value
      const dificultad = document.getElementById("dificultadReto").value
      const estado = document.getElementById("estadoReto").value
      const fechaInicio = document.getElementById("fechaInicioReto").value
      const fechaFin = document.getElementById("fechaFinReto").value

      if (id) {
        // Editar reto existente
        const index = retos.findIndex((r) => r.id === Number.parseInt(id))

        if (index !== -1) {
          retos[index] = {
            ...retos[index],
            titulo,
            descripcion,
            dificultad,
            estado,
            fechaInicio,
            fechaFin,
          }
        }
      } else {
        // Crear nuevo reto
        const nuevoId = retos.length > 0 ? Math.max(...retos.map((r) => r.id)) + 1 : 1

        retos.push({
          id: nuevoId,
          titulo,
          descripcion,
          dificultad,
          estado,
          fechaInicio,
          fechaFin,
        })
      }

      renderRetos(retos)
      modalReto.style.display = "none"
    })
  }

  // Función para ver detalles del reto
  function verDetallesReto(id) {
    const reto = retos.find((r) => r.id === id)

    if (reto) {
      document.getElementById("detalleTituloReto").textContent = reto.titulo

      // Determinar clases de badges
      let dificultadClass = "badge-secondary"
      if (reto.dificultad === "Alta") dificultadClass = "badge-danger"
      else if (reto.dificultad === "Media") dificultadClass = "badge-primary"
      else if (reto.dificultad === "Baja") dificultadClass = "badge-success"

      let estadoClass = "badge-light"
      if (reto.estado === "Activo") estadoClass = "badge-primary"
      else if (reto.estado === "Finalizado") estadoClass = "badge-secondary"
      else if (reto.estado === "Próximo") estadoClass = "badge-info"

      document.getElementById("detalleBadges").innerHTML = `
                  <span class="badge ${dificultadClass}">${reto.dificultad}</span>
                  <span class="badge ${estadoClass}">${reto.estado}</span>
              `

      document.getElementById("detalleDescripcionReto").textContent = reto.descripcion
      document.getElementById("detalleFechaInicio").textContent = formatDate(reto.fechaInicio)
      document.getElementById("detalleFechaFin").textContent = formatDate(reto.fechaFin)

      modalDetallesReto.style.display = "block"
    }
  }

  // Función para editar reto
  function editarReto(id) {
    const reto = retos.find((r) => r.id === id)

    if (reto) {
      document.getElementById("tituloModalReto").textContent = "Editar Reto"
      document.getElementById("retoId").value = reto.id
      document.getElementById("tituloReto").value = reto.titulo
      document.getElementById("descripcionReto").value = reto.descripcion
      document.getElementById("dificultadReto").value = reto.dificultad
      document.getElementById("estadoReto").value = reto.estado
      document.getElementById("fechaInicioReto").value = reto.fechaInicio
      document.getElementById("fechaFinReto").value = reto.fechaFin

      modalReto.style.display = "block"
    }
  }

  // Modal de confirmación para eliminar
  const modalConfirmacion = document.getElementById("modalConfirmacion")
  const btnCancelarEliminar = document.getElementById("btnCancelarEliminar")
  const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar")
  let retoIdEliminar = null

  // Función para mostrar confirmación de eliminación
  function confirmarEliminarReto(id) {
    retoIdEliminar = id
    modalConfirmacion.style.display = "block"
  }

  // Cancelar eliminación
  if (btnCancelarEliminar) {
    btnCancelarEliminar.addEventListener("click", () => {
      modalConfirmacion.style.display = "none"
      retoIdEliminar = null
    })
  }

  // Confirmar eliminación
  if (btnConfirmarEliminar) {
    btnConfirmarEliminar.addEventListener("click", () => {
      if (retoIdEliminar !== null) {
        const index = retos.findIndex((r) => r.id === retoIdEliminar)

        if (index !== -1) {
          retos.splice(index, 1)
          renderRetos(retos)
        }

        modalConfirmacion.style.display = "none"
        retoIdEliminar = null
      }
    })
  }
}


// Función para editar usuario
function editarUsuario(id) {
  console.log("Editar usuario con ID:", id);
  const usuario = datosUsuario.find((u) => u.id === id);

  if (usuario) {
    document.getElementById("tituloModalUsuario").textContent = "Editar Usuario";
    document.getElementById("usuarioId").value = usuario.id;
    document.getElementById("nombreUsuario").value = usuario.name;
    document.getElementById("emailUsuario").value = usuario.email;
    document.getElementById("rolUsuario").value = usuario.rol;
    document.getElementById("estadoUsuario").value = usuario.estado;

    // Mostrar campo de estado para edición
    document.getElementById("estadoUsuarioContainer").style.display = "block";

    modalUsuario.style.display = "block";

    // Configurar el evento de guardar cambios
    const btnGuardarUsuario = document.getElementById("btnGuardarUsuario");
    btnGuardarUsuario.onclick = () => {
      const updatedUsuario = {
        id: document.getElementById("usuarioId").value,
        nombre: document.getElementById("nombreUsuario").value,
        email: document.getElementById("emailUsuario").value,
        rol: document.getElementById("rolUsuario").value,
        estado: document.getElementById("estadoUsuario").value,
      };

      fetch(`${API_BASE_URL}/api/user/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUsuario),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al editar el usuario");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Usuario actualizado:", data);
          modalUsuario.style.display = "none";
          // Recargar la lista de usuarios
          fetch(`${API_BASE_URL}/api/user`)
            .then((response) => response.json())
            .then((usuarios) => renderUsuarios(usuarios));
        })
        .catch((error) => console.error("Error:", error));
    };
  }
}

window.onclick = (event) => {
  if (event.target === modalUsuario) {
    modalUsuario.style.display = "none";
  }
  if (event.target === modalConfirmacion) {
    modalConfirmacion.style.display = "none";
  }
}

function setupDropdown(buttonId, menuId) {
  const btn = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Cerrar todos los demás menús antes de abrir este
    document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
      if (el !== menu) el.classList.remove("show");
    });

    // Alternar el menú actual
    menu.classList.toggle("show");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
}

// Configurar menús
setupDropdown("adminInnovacionBtn", "adminInnovacion");
setupDropdown("userMenuAdminBtn", "userMenuAdmin");

// Cerrar cualquier menú si se hace clic fuera
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
    el.classList.remove("show");
  });
});
