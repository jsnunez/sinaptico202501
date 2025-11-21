document.addEventListener("DOMContentLoaded", () => {
  // ---------- Tabs ----------
  const tabTriggers = document.querySelectorAll(".tab-trigger");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      tabTriggers.forEach((t) => t.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));
      trigger.classList.add("active");
      const tabId = trigger.getAttribute("data-tab");
      document.getElementById(tabId)?.classList.add("active");
    });
  });

  // ---------- Utils ----------
  const safeJson = async (res) => {
    try { return await res.json(); } catch { return {}; }
  };
  const showErrorInline = (msg) => {
    const mensajeError = document.getElementsByClassName("error")[0];
    if (mensajeError) {
      mensajeError.classList.remove("escondido");
      mensajeError.textContent = msg;
    }
  };

  // ---------- Forms ----------
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // ===== LOGIN =====
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const btn = e.submitter;
      btn?.setAttribute("disabled", "disabled");

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          credentials: "include",                 // 👈 aquí va
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await safeJson(res);
        if (!res.ok) throw new Error(data.message || "Correo o contraseña incorrectos");

        const redirectTo = data.redirect || "/";
        console.log(redirectTo);
        await Swal.fire({
          title: "¡Bienvenido!",
          text: "Inicio de sesión exitoso.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        window.location.href = redirectTo;

      } catch (error) {
        Swal.fire({
          title: "Error de inicio de sesión",
          text: error.message,
          icon: "error",
          confirmButtonText: "Intentar de nuevo"
        });
        showErrorInline(error.message);
      } finally {
        btn?.removeAttribute("disabled");
      }
    });
  }

  // ===== REGISTRO =====
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("user").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const telefono = document.getElementById("telefono").value.trim();

      if (password !== confirmPassword) {
        Swal.fire({ icon: "warning", title: "¡Oops!", text: "Las contraseñas no coinciden" });
        return;
      }

      const btn = e.submitter;
      btn?.setAttribute("disabled", "disabled");

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, telefono })
        });

        const data = await safeJson(res);
        if (!res.ok) throw new Error(data.message || "Error desconocido");

        await Swal.fire({
          title: "¡Éxito!",
          text: `Tu información ha sido guardada correctamente. El email registrado fue ${email}`,
          icon: "success",
          confirmButtonText: "Entendido"
        });

        // Opción A: recargar (como tenías)
        // window.location.reload();

        // --- Opción B: login automático tras registrar ---
        const loginRes = await fetch("/api/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const loginData = await safeJson(loginRes);

        if (!loginRes.ok) throw new Error(loginData.message || "Correo o contraseña incorrectos");

        await Swal.fire({ title: "¡Bienvenido!", text: "Inicio de sesión exitosoq.", icon: "success" });
        window.location.href = loginData.redirect || "/";

      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `No se pudo registrar: ${error.message} `,
          icon: "error",
          confirmButtonText: "Entendido"
        });
      } finally {
        btn?.removeAttribute("disabled");
      }
    });
  }

  // (tu animación de neuronas puede quedar como estaba, solo asegúrate de que el <canvas> existe antes de usarlo)
});

// Show modal on "Retos" button click
const retosButton = document.getElementById("retosButton");
const eventosButton = document.getElementById("eventosButton");
const serviciosButton = document.getElementById("serviciosButton");
const recupearPass = document.getElementById("recuperarPass");
const retosModal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModalButton");

// retosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });
// eventosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });

// serviciosButton.addEventListener("click", () => {
//   Swal.fire({
//     icon: 'info',
//     title: 'Registrate para obtener mas informacion',
//     confirmButtonText: 'Cerrar'
//   });
// });

recupearPass.addEventListener("click", async () => {
  const { value: email } = await Swal.fire({
    title: 'Recuperar contraseña',
    text: 'Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
    input: 'email',
    inputLabel: 'Correo electrónico',
    inputPlaceholder: 'ejemplo@correo.com',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor ingresá un correo válido';
      }
      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === "string" && !emailRegex.test(value.trim())) {
        return 'El correo electrónico no es válido';
      }
      return null;
    }
  });

  if (email) {
    try {
      const res = await fetch("/api/recuperarPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        throw new Error("No se pudo enviar el correo.");
      }

      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisá tu bandeja de entrada para continuar con el restablecimiento.'
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  }
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === retosModal) {
    retosModal.style.display = "none";
  }
});



// Seleccionar elementos
const userLogo = document.getElementById('user-logo');
const authPanel = document.getElementById('auth-panel');
const sidePanel = document.getElementById('side-panel');

// // Añadir un evento de clic al logo del usuario
// userLogo.addEventListener('click', () => {
//   // Cambiar el estado del panel de autenticación
//   authPanel.style.display = 'block'; // Asegura que el panel sea visible
//   authPanel.classList.toggle('active'); // Desliza el panel hacia la derecha

//   // Expandir o contraer el panel lateral
//   sidePanel.classList.toggle('expanded');
// });


function mensajeAdministrador() {
  Swal.fire({
    icon: 'info',
    title: 'Comunicate con el administrador',
    showCancelButton: true,

    cancelButtonText: 'Cerrar'
  });

}

function mensajeRegistrar() {
  Swal.fire({
    icon: 'info',
    title: 'Registrate para obtener más información',
    showCancelButton: true,
    confirmButtonText: 'Registrarme',
    cancelButtonText: 'Cerrar'
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("authModal").style.display = "block";
      // Cambia a la pestaña de registro
      document.querySelector('.tab-trigger[data-tab="register"]').click();
    }
  });

}

document.addEventListener('DOMContentLoaded', function () {
  // Cargar el mapa SVG
  fetch('mapa/5.svg')
    .then(response => response.text())
    .then(svg => {
      document.getElementById('mapa').innerHTML = svg;
      agregarInteractividad();
    });
});
function agregarInteractividad() {
  const paths = document.querySelectorAll('#mapa svg path');
  let selectedPath = null;

  paths.forEach(path => {
    path.style.cursor = 'pointer';

    path.addEventListener('mouseenter', function () {
      if (this !== selectedPath) {
        this.style.fill = 'var(--select-btn)';
      }

      // Mostrar nombre del departamento al pasar el mouse
      const departamento = this.getAttribute('id') || this.getAttribute('data-name') || this.getAttribute('title') || 'Departamento';
      this.setAttribute('title', departamento);
      // Crear o actualizar tooltip
      let tooltip = document.getElementById('map-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'map-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        tooltip.style.fontSize = '14px';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
      }

      // Mostrar tooltip
      tooltip.textContent = this.getAttribute('data-name') || departamento;
      tooltip.style.display = 'block';

      // Actualizar posición del tooltip siguiendo el mouse
      const updateTooltipPosition = (e) => {
        tooltip.style.left = (e.pageX + 15) + 'px';
        tooltip.style.top = (e.pageY + 15) + 'px';
      };

      this.addEventListener('mousemove', updateTooltipPosition);

      // Guardar referencia para remover en mouseleave
      this._tooltipHandler = updateTooltipPosition;
    });

    path.addEventListener('mouseleave', function () {
      if (this !== selectedPath) {
        this.style.fill = '';
      }
    });

    path.addEventListener('click', function () {
      const departamento = this.getAttribute('data-name') || this.getAttribute('title') || 'Departamento';

      // Restablecer el departamento previamente seleccionado
      if (selectedPath && selectedPath !== this) {
        selectedPath.style.fill = '';
      }
      actualizarLogosSlider(departamento);

      // Mostrar modal con mapa interactivo del departamento
      Swal.fire({
        title: departamento,
        html: `
              <div style="text-align: center;">
                <p>Has seleccionado el departamento de <strong>${departamento}</strong></p>
                <div style="margin-bottom: 15px;">
                  <label for="filtro-crci" style="display: block; margin-bottom: 5px; font-weight: bold;">Filtrar por :</label>
                  <select id="filtro-crci" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: white;">
                    <option value="">Todos</option>
                    <option value="crci">CRCI</option>
                    <option value="no-crci">Codecti Santander</option>
                    <option value="cluster-sb">Clúster SbN</option>
                    <option value="cluster-construccion">Clúster Construcción</option>
                    
                  </select>
                </div>
                <div id="mapa-modal" style="width: 100%; height: 300px; margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <!-- El mapa se inicializará aquí -->
                </div>
                <p><small>Empresas disponibles en esta región</small></p>
              </div>
              `,
        width: 600,
        confirmButtonText: 'Cerrar',
        customClass: {
          container: 'mapa-modal-container'
        },
        didOpen: () => {
          // Inicializar el mapa de Leaflet cuando se abre el modal
          setTimeout(() => {
            // Coordenadas por departamento de Colombia
            const coordenadasDepartamentos = {
              'Amazonas': [3.4372, -70.3340],
              'Antioquia': [6.2442, -75.5812],
              'Arauca': [7.0906, -70.7574],
              'Atlántico': [10.6966, -74.8741],
              'Bolívar': [8.0000, -74.0000],
              'Boyacá': [5.4544, -72.7587],
              'Caldas': [5.3012, -75.2847],
              'Caquetá': [0.8637, -72.5055],
              'Casanare': [5.7589, -71.9842],
              'Cauca': [2.4389, -76.6114],
              'Cesar': [9.3077, -73.2535],
              'Chocó': [5.6956, -76.6569],
              'Córdoba': [8.7480, -75.8814],
              'Cundinamarca': [4.5709, -74.2973],
              'Guainía': [2.5670, -67.9297],
              'Guaviare': [1.9085, -72.6460],
              'Huila': [2.5358, -75.5278],
              'La Guajira': [11.5444, -72.9072],
              'Magdalena': [10.4142, -74.4065],
              'Meta': [3.3234, -72.6460],
              'Nariño': [1.2136, -77.2811],
              'Norte de Santander': [7.8939, -72.5078],
              'Putumayo': [0.5136, -75.5278],
              'Quindío': [4.4611, -75.6722],
              'Risaralda': [5.3158, -75.9928],
              'San Andrés y Providencia': [12.5847, -81.7006],
              'Santander': [6.6437, -73.6538],
              'Sucre': [9.2982, -75.3975],
              'Tolima': [4.0925, -75.1545],
              'Valle del Cauca': [3.8009, -76.6413],
              'Vaupés': [0.2319, -70.2369],
              'Vichada': [4.4256, -69.2711]
            };

            // Obtener coordenadas del departamento o usar coordenadas por defecto de Colombia
            const coordenadas = coordenadasDepartamentos[departamento] || [4.5709, -74.2973];

            const modalMap = L.map('mapa-modal').setView(coordenadas, 8);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(modalMap);


            console.log('🔄 Cargando entidades desde la API...');
            // Cargar entidades desde la API
            fetch(`${API_BASE_URL}/api/ubicacion-entidad/mapa/entidades`)
              .then(response => {
                console.log('📡 Respuesta de la API:', response.status);
                if (!response.ok) {
                  throw new Error('Error al cargar entidades');
                }
                return response.json();
              })
              .then(data => {
                console.log('✅ Entidades cargadas:', data);
                usersData = data;
                filteredUsers = [...usersData];
                //   updateStatistics();
                //   populateCityFilter();
                //   populateDptoFilter();
                //   populateClaseFilter();
                displayMarkersOnMap();
                // displayUsersList();
              })
              .catch(error => {
                console.error('❌ Error:', error);
                console.log('Usando datos de ejemplo debido a un error en la carga de entidades.');
                // Usar datos de ejemplo en caso de error



              });

            // Cargar datos del departamento específico si están disponibles
            // Aquí puedes agregar lógica para centrar el mapa en el departamento seleccionado

            // Forzar redimensionamiento del mapa
            modalMap.invalidateSize();
            function displayMarkersOnMap() {
              // Limpiar marcadores existentes
              markers.forEach(marker => modalMap.removeLayer(marker));
              markers = [];

              filteredUsers.forEach(user => {
                console.log('Añadiendo marcador para usuario:', user);
                const marker = createUserMarker(user);
                markers.push(marker);
                marker.addTo(modalMap);
              });

              // // Ajustar vista si hay marcadores
              // if (markers.length > 0) {
              //     const group = new L.featureGroup(markers);
              //     map.fitBounds(group.getBounds().pad(0.1));
              // }
            }
          }, 100);

        }
      });
      // Marcar el nuevo departamento como seleccionado
      selectedPath = this;
      this.style.fill = 'var(--select-btn)';
      // Swal.fire({
      //   icon: 'info',
      //   title: departamento,
      //   text: `Has seleccionado el departamento de ${departamento}`,
      //   confirmButtonText: 'Cerrar'
      // });

      // Log para identificar cada departamento
      console.log('Departamento seleccionado:', {
        id: this.getAttribute('id'),
        dataName: this.getAttribute('data-name'),
        title: this.getAttribute('title'),
        element: this
      });

    });
  });

  // Listar todos los departamentos disponibles
  console.log('Departamentos encontrados:', Array.from(paths).map(path => ({
    id: path.getAttribute('id'),
    dataName: path.getAttribute('data-name'),
    title: path.getAttribute('title')
  })));
}
function inicioSesion() {
  document.getElementById("authModal").style.display = "block";
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function (event) {
  const modal = document.getElementById("authModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}





// Logos slider por departamento
function actualizarLogosSlider(departamento) {
  const logosSlider = document.querySelector('.logos-slider .logos-track');
  console.log('Departamento para logos:', departamento);
  if (!logosSlider) return;

  // Definir logos por departamento de Colombia
  const logosPorDepartamento = {
    'Amazonas': [
      { src: 'img/amazonas1.svg', alt: 'Empresa Amazonas 1' },
      { src: 'img/amazonas2.svg', alt: 'Empresa Amazonas 2' },
      { src: 'img/amazonas3.svg', alt: 'Empresa Amazonas 3' },
      { src: 'img/amazonas4.svg', alt: 'Empresa Amazonas 4' },
      { src: 'img/amazonas5.svg', alt: 'Empresa Amazonas 5' },
      { src: 'img/amazonas6.svg', alt: 'Empresa Amazonas 6' }
    ],
    'Antioquia': [
      { src: 'img/antioquia1.svg', alt: 'Empresa Antioquia 1' },
      { src: 'img/antioquia2.svg', alt: 'Empresa Antioquia 2' },
      { src: 'img/antioquia3.svg', alt: 'Empresa Antioquia 3' },
      { src: 'img/antioquia4.svg', alt: 'Empresa Antioquia 4' },
      { src: 'img/antioquia5.svg', alt: 'Empresa Antioquia 5' },
      { src: 'img/antioquia6.svg', alt: 'Empresa Antioquia 6' }
    ],
    'Arauca': [
      { src: 'img/arauca1.svg', alt: 'Empresa Arauca 1' },
      { src: 'img/arauca2.svg', alt: 'Empresa Arauca 2' },
      { src: 'img/arauca3.svg', alt: 'Empresa Arauca 3' },
      { src: 'img/arauca4.svg', alt: 'Empresa Arauca 4' },
      { src: 'img/arauca5.svg', alt: 'Empresa Arauca 5' },
      { src: 'img/arauca6.svg', alt: 'Empresa Arauca 6' }
    ],
    'Atlántico': [
      { src: 'img/atlantico1.svg', alt: 'Empresa Atlántico 1' },
      { src: 'img/atlantico2.svg', alt: 'Empresa Atlántico 2' },
      { src: 'img/atlantico3.svg', alt: 'Empresa Atlántico 3' },
      { src: 'img/atlantico4.svg', alt: 'Empresa Atlántico 4' },
      { src: 'img/atlantico5.svg', alt: 'Empresa Atlántico 5' },
      { src: 'img/atlantico6.svg', alt: 'Empresa Atlántico 6' }
    ],
    'Bolívar': [
      { src: 'img/bolivar1.svg', alt: 'Empresa Bolívar 1' },
      { src: 'img/bolivar2.svg', alt: 'Empresa Bolívar 2' },
      { src: 'img/bolivar3.svg', alt: 'Empresa Bolívar 3' },
      { src: 'img/bolivar4.svg', alt: 'Empresa Bolívar 4' },
      { src: 'img/bolivar5.svg', alt: 'Empresa Bolívar 5' },
      { src: 'img/bolivar6.svg', alt: 'Empresa Bolívar 6' }
    ],
    'Boyacá': [
      { src: 'img/boyaca1.svg', alt: 'Empresa Boyacá 1' },
      { src: 'img/boyaca2.svg', alt: 'Empresa Boyacá 2' },
      { src: 'img/boyaca3.svg', alt: 'Empresa Boyacá 3' },
      { src: 'img/boyaca4.svg', alt: 'Empresa Boyacá 4' },
      { src: 'img/boyaca5.svg', alt: 'Empresa Boyacá 5' },
      { src: 'img/boyaca6.svg', alt: 'Empresa Boyacá 6' }
    ],
    'Caldas': [
      { src: 'img/caldas1.svg', alt: 'Empresa Caldas 1' },
      { src: 'img/caldas2.svg', alt: 'Empresa Caldas 2' },
      { src: 'img/caldas3.svg', alt: 'Empresa Caldas 3' },
      { src: 'img/caldas4.svg', alt: 'Empresa Caldas 4' },
      { src: 'img/caldas5.svg', alt: 'Empresa Caldas 5' },
      { src: 'img/caldas6.svg', alt: 'Empresa Caldas 6' }
    ],
    'Caquetá': [
      { src: 'img/caqueta1.svg', alt: 'Empresa Caquetá 1' },
      { src: 'img/caqueta2.svg', alt: 'Empresa Caquetá 2' },
      { src: 'img/caqueta3.svg', alt: 'Empresa Caquetá 3' },
      { src: 'img/caqueta4.svg', alt: 'Empresa Caquetá 4' },
      { src: 'img/caqueta5.svg', alt: 'Empresa Caquetá 5' },
      { src: 'img/caqueta6.svg', alt: 'Empresa Caquetá 6' }
    ],
    'Casanare': [
      { src: 'img/casanare1.svg', alt: 'Empresa Casanare 1' },
      { src: 'img/casanare2.svg', alt: 'Empresa Casanare 2' },
      { src: 'img/casanare3.svg', alt: 'Empresa Casanare 3' },
      { src: 'img/casanare4.svg', alt: 'Empresa Casanare 4' },
      { src: 'img/casanare5.svg', alt: 'Empresa Casanare 5' },
      { src: 'img/casanare6.svg', alt: 'Empresa Casanare 6' }
    ],
    'Cauca': [
      { src: 'img/cauca1.svg', alt: 'Empresa Cauca 1' },
      { src: 'img/cauca2.svg', alt: 'Empresa Cauca 2' },
      { src: 'img/cauca3.svg', alt: 'Empresa Cauca 3' },
      { src: 'img/cauca4.svg', alt: 'Empresa Cauca 4' },
      { src: 'img/cauca5.svg', alt: 'Empresa Cauca 5' },
      { src: 'img/cauca6.svg', alt: 'Empresa Cauca 6' }
    ],
    'Cesar': [
      { src: 'img/cesar1.svg', alt: 'Empresa Cesar 1' },
      { src: 'img/cesar2.svg', alt: 'Empresa Cesar 2' },
      { src: 'img/cesar3.svg', alt: 'Empresa Cesar 3' },
      { src: 'img/cesar4.svg', alt: 'Empresa Cesar 4' },
      { src: 'img/cesar5.svg', alt: 'Empresa Cesar 5' },
      { src: 'img/cesar6.svg', alt: 'Empresa Cesar 6' }
    ],
    'Chocó': [
      { src: 'img/choco1.svg', alt: 'Empresa Chocó 1' },
      { src: 'img/choco2.svg', alt: 'Empresa Chocó 2' },
      { src: 'img/choco3.svg', alt: 'Empresa Chocó 3' },
      { src: 'img/choco4.svg', alt: 'Empresa Chocó 4' },
      { src: 'img/choco5.svg', alt: 'Empresa Chocó 5' },
      { src: 'img/choco6.svg', alt: 'Empresa Chocó 6' }
    ],
    'Córdoba': [
      { src: 'img/cordoba1.svg', alt: 'Empresa Córdoba 1' },
      { src: 'img/cordoba2.svg', alt: 'Empresa Córdoba 2' },
      { src: 'img/cordoba3.svg', alt: 'Empresa Córdoba 3' },
      { src: 'img/cordoba4.svg', alt: 'Empresa Córdoba 4' },
      { src: 'img/cordoba5.svg', alt: 'Empresa Córdoba 5' },
      { src: 'img/cordoba6.svg', alt: 'Empresa Córdoba 6' }
    ],
    'Cundinamarca': [
      { src: 'img/cundinamarca1.svg', alt: 'Empresa Cundinamarca 1' },
      { src: 'img/cundinamarca2.svg', alt: 'Empresa Cundinamarca 2' },
      { src: 'img/cundinamarca3.svg', alt: 'Empresa Cundinamarca 3' },
      { src: 'img/cundinamarca4.svg', alt: 'Empresa Cundinamarca 4' },
      { src: 'img/cundinamarca5.svg', alt: 'Empresa Cundinamarca 5' },
      { src: 'img/cundinamarca6.svg', alt: 'Empresa Cundinamarca 6' }
    ],
    'Guainía': [
      { src: 'img/guainia1.svg', alt: 'Empresa Guainía 1' },
      { src: 'img/guainia2.svg', alt: 'Empresa Guainía 2' },
      { src: 'img/guainia3.svg', alt: 'Empresa Guainía 3' },
      { src: 'img/guainia4.svg', alt: 'Empresa Guainía 4' },
      { src: 'img/guainia5.svg', alt: 'Empresa Guainía 5' },
      { src: 'img/guainia6.svg', alt: 'Empresa Guainía 6' }
    ],
    'Guaviare': [
      { src: 'img/guaviare1.svg', alt: 'Empresa Guaviare 1' },
      { src: 'img/guaviare2.svg', alt: 'Empresa Guaviare 2' },
      { src: 'img/guaviare3.svg', alt: 'Empresa Guaviare 3' },
      { src: 'img/guaviare4.svg', alt: 'Empresa Guaviare 4' },
      { src: 'img/guaviare5.svg', alt: 'Empresa Guaviare 5' },
      { src: 'img/guaviare6.svg', alt: 'Empresa Guaviare 6' }
    ],
    'Huila': [
      { src: 'img/huila1.svg', alt: 'Empresa Huila 1' },
      { src: 'img/huila2.svg', alt: 'Empresa Huila 2' },
      { src: 'img/huila3.svg', alt: 'Empresa Huila 3' },
      { src: 'img/huila4.svg', alt: 'Empresa Huila 4' },
      { src: 'img/huila5.svg', alt: 'Empresa Huila 5' },
      { src: 'img/huila6.svg', alt: 'Empresa Huila 6' }
    ],
    'La Guajira': [
      { src: 'img/laguajira1.svg', alt: 'Empresa La Guajira 1' },
      { src: 'img/laguajira2.svg', alt: 'Empresa La Guajira 2' },
      { src: 'img/laguajira3.svg', alt: 'Empresa La Guajira 3' },
      { src: 'img/laguajira4.svg', alt: 'Empresa La Guajira 4' },
      { src: 'img/laguajira5.svg', alt: 'Empresa La Guajira 5' },
      { src: 'img/laguajira6.svg', alt: 'Empresa La Guajira 6' }
    ],
    'Magdalena': [
      { src: 'img/magdalena1.svg', alt: 'Empresa Magdalena 1' },
      { src: 'img/magdalena2.svg', alt: 'Empresa Magdalena 2' },
      { src: 'img/magdalena3.svg', alt: 'Empresa Magdalena 3' },
      { src: 'img/magdalena4.svg', alt: 'Empresa Magdalena 4' },
      { src: 'img/magdalena5.svg', alt: 'Empresa Magdalena 5' },
      { src: 'img/magdalena6.svg', alt: 'Empresa Magdalena 6' }
    ],
    'Meta': [
      { src: 'img/meta1.svg', alt: 'Empresa Meta 1' },
      { src: 'img/meta2.svg', alt: 'Empresa Meta 2' },
      { src: 'img/meta3.svg', alt: 'Empresa Meta 3' },
      { src: 'img/meta4.svg', alt: 'Empresa Meta 4' },
      { src: 'img/meta5.svg', alt: 'Empresa Meta 5' },
      { src: 'img/meta6.svg', alt: 'Empresa Meta 6' }
    ],
    'Nariño': [
      { src: 'img/narino1.svg', alt: 'Empresa Nariño 1' },
      { src: 'img/narino2.svg', alt: 'Empresa Nariño 2' },
      { src: 'img/narino3.svg', alt: 'Empresa Nariño 3' },
      { src: 'img/narino4.svg', alt: 'Empresa Nariño 4' },
      { src: 'img/narino5.svg', alt: 'Empresa Nariño 5' },
      { src: 'img/narino6.svg', alt: 'Empresa Nariño 6' }
    ],
    'Norte de Santander': [
      { src: 'img/nortesantander1.svg', alt: 'Empresa Norte de Santander 1' },
      { src: 'img/nortesantander2.svg', alt: 'Empresa Norte de Santander 2' },
      { src: 'img/nortesantander3.svg', alt: 'Empresa Norte de Santander 3' },
      { src: 'img/nortesantander4.svg', alt: 'Empresa Norte de Santander 4' },
      { src: 'img/nortesantander5.svg', alt: 'Empresa Norte de Santander 5' },
      { src: 'img/nortesantander6.svg', alt: 'Empresa Norte de Santander 6' }
    ],
    'Putumayo': [
      { src: 'img/putumayo1.svg', alt: 'Empresa Putumayo 1' },
      { src: 'img/putumayo2.svg', alt: 'Empresa Putumayo 2' },
      { src: 'img/putumayo3.svg', alt: 'Empresa Putumayo 3' },
      { src: 'img/putumayo4.svg', alt: 'Empresa Putumayo 4' },
      { src: 'img/putumayo5.svg', alt: 'Empresa Putumayo 5' },
      { src: 'img/putumayo6.svg', alt: 'Empresa Putumayo 6' }
    ],
    'Quindío': [
      { src: 'img/quindio1.svg', alt: 'Empresa Quindío 1' },
      { src: 'img/quindio2.svg', alt: 'Empresa Quindío 2' },
      { src: 'img/quindio3.svg', alt: 'Empresa Quindío 3' },
      { src: 'img/quindio4.svg', alt: 'Empresa Quindío 4' },
      { src: 'img/quindio5.svg', alt: 'Empresa Quindío 5' },
      { src: 'img/quindio6.svg', alt: 'Empresa Quindío 6' }
    ],
    'Risaralda': [
      { src: 'img/risaralda1.svg', alt: 'Empresa Risaralda 1' },
      { src: 'img/risaralda2.svg', alt: 'Empresa Risaralda 2' },
      { src: 'img/risaralda3.svg', alt: 'Empresa Risaralda 3' },
      { src: 'img/risaralda4.svg', alt: 'Empresa Risaralda 4' },
      { src: 'img/risaralda5.svg', alt: 'Empresa Risaralda 5' },
      { src: 'img/risaralda6.svg', alt: 'Empresa Risaralda 6' }
    ],
    'San Andrés y Providencia': [
      { src: 'img/sanandres1.svg', alt: 'Empresa San Andrés 1' },
      { src: 'img/sanandres2.svg', alt: 'Empresa San Andrés 2' },
      { src: 'img/sanandres3.svg', alt: 'Empresa San Andrés 3' },
      { src: 'img/sanandres4.svg', alt: 'Empresa San Andrés 4' },
      { src: 'img/sanandres5.svg', alt: 'Empresa San Andrés 5' },
      { src: 'img/sanandres6.svg', alt: 'Empresa San Andrés 6' }
    ],
    'Santander': [
      { src: 'img/santander1.svg', alt: 'Empresa Santander 1' },
      { src: 'img/santander2.svg', alt: 'Empresa Santander 2' },
      { src: 'img/santander3.svg', alt: 'Empresa Santander 3' },
      { src: 'img/santander4.svg', alt: 'Empresa Santander 4' },
      { src: 'img/santander5.svg', alt: 'Empresa Santander 5' },
      { src: 'img/santander6.svg', alt: 'Empresa Santander 6' }
    ],
    'Sucre': [
      { src: 'img/sucre1.svg', alt: 'Empresa Sucre 1' },
      { src: 'img/sucre2.svg', alt: 'Empresa Sucre 2' },
      { src: 'img/sucre3.svg', alt: 'Empresa Sucre 3' },
      { src: 'img/sucre4.svg', alt: 'Empresa Sucre 4' },
      { src: 'img/sucre5.svg', alt: 'Empresa Sucre 5' },
      { src: 'img/sucre6.svg', alt: 'Empresa Sucre 6' }
    ],
    'Tolima': [
      { src: 'img/tolima1.svg', alt: 'Empresa Tolima 1' },
      { src: 'img/tolima2.svg', alt: 'Empresa Tolima 2' },
      { src: 'img/tolima3.svg', alt: 'Empresa Tolima 3' },
      { src: 'img/tolima4.svg', alt: 'Empresa Tolima 4' },
      { src: 'img/tolima5.svg', alt: 'Empresa Tolima 5' },
      { src: 'img/tolima6.svg', alt: 'Empresa Tolima 6' }
    ],
    'Valle del Cauca': [
      { src: 'img/valledelcauca1.svg', alt: 'Empresa Valle del Cauca 1' },
      { src: 'img/valledelcauca2.svg', alt: 'Empresa Valle del Cauca 2' },
      { src: 'img/valledelcauca3.svg', alt: 'Empresa Valle del Cauca 3' },
      { src: 'img/valledelcauca4.svg', alt: 'Empresa Valle del Cauca 4' },
      { src: 'img/valledelcauca5.svg', alt: 'Empresa Valle del Cauca 5' },
      { src: 'img/valledelcauca6.svg', alt: 'Empresa Valle del Cauca 6' }
    ],
    'Vaupés': [
      { src: 'img/vaupes1.svg', alt: 'Empresa Vaupés 1' },
      { src: 'img/vaupes2.svg', alt: 'Empresa Vaupés 2' },
      { src: 'img/vaupes3.svg', alt: 'Empresa Vaupés 3' },
      { src: 'img/vaupes4.svg', alt: 'Empresa Vaupés 4' },
      { src: 'img/vaupes5.svg', alt: 'Empresa Vaupés 5' },
      { src: 'img/vaupes6.svg', alt: 'Empresa Vaupés 6' }
    ],
    'Vichada': [
      { src: 'img/vichada1.svg', alt: 'Empresa Vichada 1' },
      { src: 'img/vichada2.svg', alt: 'Empresa Vichada 2' },
      { src: 'img/vichada3.svg', alt: 'Empresa Vichada 3' },
      { src: 'img/vichada4.svg', alt: 'Empresa Vichada 4' },
      { src: 'img/vichada5.svg', alt: 'Empresa Vichada 5' },
      { src: 'img/vichada6.svg', alt: 'Empresa Vichada 6' }
    ],
    'default': [
      { src: 'img/empresa1.svg', alt: 'Empresa 1' },
      { src: 'img/empresa2.svg', alt: 'Empresa 2' },
      { src: 'img/empresa3.svg', alt: 'Empresa 3' },
      { src: 'img/empresa4.svg', alt: 'Empresa 4' },
      { src: 'img/empresa5.svg', alt: 'Empresa 5' },
      { src: 'img/empresa6.svg', alt: 'Empresa 6' }
    ]
  };

  // Obtener logos del departamento o usar default
  const logos = logosPorDepartamento[departamento] || logosPorDepartamento['default'];

  // Limpiar slider
  logosSlider.innerHTML = '';

  // Crear slides (duplicados para efecto infinito)
  const crearSlides = () => {
    return logos.map(logo => `
              <div class="logo-slide">
          <img src="${logo.src}" alt="${logo.alt}">
              </div>
            `).join('');
  };

  // Agregar logos duplicados para efecto infinito
  logosSlider.innerHTML = crearSlides() + crearSlides();
}

// Llamar cuando se seleccione un departamento
const pathsOriginal = document.querySelectorAll('#mapa svg path');
pathsOriginal.forEach(path => {
  path.addEventListener('click', function () {
    const departamento = this.getAttribute('data-name') || this.getAttribute('title') || 'default';
    console.log('Departamento seleccionado:', departamento);
    actualizarLogosSlider(departamento);
    // Mostrar modal con mapa del departamento

  });
}); function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function (event) {
  const modal = document.getElementById("authModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


