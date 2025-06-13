let usuariosFiltrados = []; // Se usará para mostrar los usuarios después del filtro


document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el fondo neuronal
    initNeuralBackground()
  
    // Navegación entre páginas
    setupNavigation()
  
    // Inicializar la página actual
    initCurrentPage()
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
  
  // Función para inicializar la página de usuarios
  function initUsuariosPage() {
    // Cargar tabla de usuarios
    const tablaUsuarios = document.getElementById("tablaUsuarios");
    if (!tablaUsuarios) return;
  
    const tbody = tablaUsuarios.querySelector("tbody");
      const inputBuscar = document.getElementById("buscarUsuario");

inputBuscar.addEventListener("input", function () {
  const texto = this.value.toLowerCase().trim();
  paginaActual = 1;

  usuariosFiltrados = datosUsuario.filter(usuario =>
    usuario.name.toLowerCase().includes(texto)
  );

  renderUsuariosPaginados();
});

    function renderUsuariosPaginados() {
        tbody.innerHTML = "";
      
        const inicio = (paginaActual - 1) * filasPorPagina;
        const fin = inicio + filasPorPagina;
        const usuariosPagina = usuariosFiltrados.slice(inicio, fin);
        const totalPaginas = Math.ceil(usuariosFiltrados.length / filasPorPagina);

      
        if (usuariosPagina.length === 0) {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td colspan="6" style="text-align: center;">No se encontraron usuarios</td>`;
          tbody.appendChild(tr);
          return;
        }
      
        usuariosPagina.forEach((usuario) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${usuario.id}</td>
              <td>${usuario.name}</td>
              <td>${usuario.email}</td>
              <td>${usuario.rol === 1 ? "Usuario" : "Administrador"}</td>
              <td><span class="badge ${usuario.estado == "1" ? "badge-success" : "badge-secondary"}">${usuario.estado == "1" ? "Activo" : "Inactivo"}</span></td>
              <td>
                <div class="action-icons">
                  <span class="action-icon edit" data-id="${usuario.id}" title="Editar"><i class="bi bi-pencil-square"></i></span>
                  <span class="action-icon delete" data-id="${usuario.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
                </div>
              </td>
          `;
          tbody.appendChild(tr);
        });
      
        document.querySelectorAll(".action-icon.edit").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = Number.parseInt(this.getAttribute("data-id"));
            editarUsuario(id);
          });
        });
      
        document.querySelectorAll(".action-icon.delete").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = Number.parseInt(this.getAttribute("data-id"));
            confirmarEliminarUsuario(id);
          });
        });
      
        renderControlesPaginacion();
      }
      function renderControlesPaginacion() {
        const totalPaginas = Math.ceil(datosUsuario.length / filasPorPagina);
        const contenedor = document.querySelector(".pagination");
        contenedor.innerHTML = "";
      
        for (let i = 1; i <= totalPaginas; i++) {
          const boton = document.createElement("button");
          boton.textContent = i;
          boton.className = "pagination-button";
          if (i === paginaActual) boton.classList.add("active");
      
          boton.addEventListener("click", () => {
            paginaActual = i;
            renderUsuariosPaginados();
          });
      
          contenedor.appendChild(boton);
        }
      }
      
  
    // Fetch API para obtener usuarios
    fetch(`${API_BASE_URL}/api/user`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => {
        datosUsuario = data;
        usuariosFiltrados = [...datosUsuario]; // ← aquí importante
        paginaActual = 1;
        renderUsuariosPaginados();
      })
      .catch((error) => {
        console.error("Error:", error);
        tbody.innerHTML = `<td colspan="6" style="text-align: center;">Error al cargar usuarios</td>`;
      });
  
    // Modal de confirmación para eliminar
    const modalConfirmacion = document.getElementById("modalConfirmacion");
    const btnCancelarEliminar = document.getElementById("btnCancelarEliminar");
    const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
    const mostratNombre = document.getElementById("idEliminar");
    let usuarioIdEliminar = null;
  
    // Función para mostrar confirmación de eliminación
    function confirmarEliminarUsuario(id) {
        mostratNombre.innerHTML = `¿Está seguro de que desea eliminar al usuario con ID ${id}?`;
      usuarioIdEliminar = id;
      modalConfirmacion.style.display = "block";
    }
  
    // Cancelar eliminación
    if (btnCancelarEliminar) {
      btnCancelarEliminar.addEventListener("click", () => {
        modalConfirmacion.style.display = "none";
        usuarioIdEliminar = null;
      });
    }
  
    // Confirmar eliminación
    btnConfirmarEliminar.addEventListener("click", () => {
        if (usuarioIdEliminar !== null) {
          fetch(`${API_BASE_URL}/api/user/${usuarioIdEliminar}`, {
            method: "DELETE",
          })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                if (data.error && data.decision) {
                  // Si hay un error y se detecta la necesidad de eliminar entidades
                  return Swal.fire({
                    title: 'Advertencia',
                    text: data.error + "\n" + data.decision,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar Usuario y Entidades',
                    cancelButtonText: 'Cancelar',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Si el usuario confirma, proceder a eliminar también las entidades
                      return fetch(`${API_BASE_URL}/api/user/${usuarioIdEliminar}/with-entidades`, {
                        method: "DELETE",
                      }).then((response) => {
                        if (response.ok) {
                          return response.json();
                        }
                        throw new Error('Error al eliminar usuario y entidades');
                      });
                    } else {
                      // Si el usuario cancela, mostrar el mensaje con el nuevo texto de error
                      Swal.fire({
                        title: 'Eliminación Cancelada',
                        text: 'No se puede eliminar este usuario debido a que tiene una entidad asociada.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                      // Retornar una promesa resuelta para continuar el flujo
                      return Promise.resolve();
                    }
                  });
                }
                // Si no hay error o decisión, lanza una excepción
                throw new Error(data.error);
              });
            }
            return response.json(); // Obtener la respuesta JSON
          })
          .then((data) => {
            // Si la eliminación fue exitosa, mostrar el mensaje de éxito con SweetAlert2
            if (data.message) {
              Swal.fire({
                title: '¡Éxito!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                // Recargar la lista de usuarios después de eliminar
                fetch(`${API_BASE_URL}/api/user`)
                  .then((response) => response.json())
                  .then((data) => {
                    datosUsuario = data;
                    usuariosFiltrados = [...datosUsuario];
                    paginaActual = 1;
                    renderUsuariosPaginados();
                  });
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          })
          .finally(() => {
            modalConfirmacion.style.display = "none";
            usuarioIdEliminar = null;
          });
        }
      });
      
      
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
          name: document.getElementById("nombreUsuario").value,
          email: document.getElementById("emailUsuario").value,
          rol: document.getElementById("rolUsuario").value,
          estado: document.getElementById("estadoUsuario").value,
        };
  
        fetch(`/api/user/${updatedUsuario.id}` , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsuario),
        })
          .then((response) => {
            if (!response.ok) {
              alert("Error al editar el usuario");

              throw new Error("Error al editar el usuario");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Usuario actualizado:", data);
            modalUsuario.style.display = "none";
            // Recargar la lista de usuarios
            alert("Usuario actualizado correctamente");
            fetch("/api/user")
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
    if (event.target ===  modalConfirmacion) {
        modalConfirmacion.style.display = "none";
    }
}
    
    ;
    document.getElementById("cerrarModalEditar").addEventListener("click", () => {
        document.getElementById("modalUsuario").style.display = "none";
    });


