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
            console.log("📊 Datos recibidos de la API:", entidades);

            // Obtener datos de contacto para cada entidad
            if (entidades.empresas && entidades.empresas.length > 0) {
                console.log(`📋 Procesando ${entidades.empresas.length} entidades`);
                
                const contactPromises = entidades.empresas.map((entidad) => {
                    console.log(`🔍 Procesando entidad ID: ${entidad.id}, contactoId: ${entidad.contactoId}`);
                    return fetch(`${API_BASE_URL}/api/contactos/${entidad.contactoId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener los datos de contacto");
                            }
                            return response.json();
                        })
                        .then((contacto) => {
                            console.log(`📞 Contacto para entidad ${entidad.id}:`, contacto);
                            entidad.contacto = contacto; // Agregar datos de contacto a la entidad
                        })
                        .catch((error) => console.error("Error:", error));
                });
              // Obtener el email del administrador para cada entidad
            entidades.empresas.forEach((entidad) => {
                console.log(`📧 Obteniendo email del admin para entidad ${entidad.id}, UserAdminId: ${entidad.UserAdminId}`);
                contactPromises.push(
                    fetch(`${API_BASE_URL}/api/user/email/${entidad.UserAdminId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener el email del administrador");
                            }
                            return response.json();
                        })
                        .then((email) => {
                            console.log(`📧 Email del admin para entidad ${entidad.id}:`, email);
                            entidad.emailAdmin = email; // Agregar email del administrador a la entidad
                        })
                        .catch((error) => console.error("Error:", error))
                );
            });
            // Esperar a que se resuelvan todas las promesas de contacto
            Promise.all(contactPromises).then(() => {
                console.log("✅ Todos los datos adicionales cargados. Entidades finales:", entidades.empresas);
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
                    .catch((error) => console.error("Error:", error));                      // Cargar tabla de entidades
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${entidad.id ?? ''}</td>
                    <td>
                        ${entidad.razonSocial ?? ''}
                        ${entidad.ubicaciones && entidad.ubicaciones.length > 0 ? '<span style="color: green; margin-left: 5px;" title="Tiene ubicación en mapa">📍</span>' : '<span style="color: #ccc; margin-left: 5px;" title="Sin ubicación en mapa">📍</span>'}
                    </td>
                    <td>${entidad.numIdentificacion ?? ''}</td>
                    <td>${entidad.contacto?.nombre ?? ''}</td>
                    <td>${entidad.contacto?.telefono ?? ''}</td>
                    <td>${entidad.emailAdmin?.email ?? ''}</td>
                    <td>
                        <div class="toggle-switch">
                            <input type="checkbox" id="toggle-${entidad.id}" class="toggle-input" ${entidad.habilitado ? "checked" : ""}>
                            <label for="toggle-${entidad.id}" class="toggle-label"></label>
                            <span>${entidad.habilitado ? "Habilitada" : "Deshabilitada"}</span>
                        </div>
                    </td>
                    <td>
                        <div class="action-icons">
                            <span class="action-icon edit-full" data-id="${entidad.id}" title="Editar Entidad"> <i class="bi bi-gear"></i></span>
                            <span class="action-icon delete" data-id="${entidad.id}" title="Eliminar"><i class="bi bi-trash3"></i></span>
                        </div>
                    </td>
                `;   tbody.appendChild(tr);
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
        document.querySelectorAll(".action-icon.edit-full").forEach((btn) => {
            btn.addEventListener("click", function () {
                const id = Number.parseInt(this.getAttribute("data-id"))
                editarEntidadCompleto(id) // Edición completa
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
    const buscarEntidad = document.getElementById("buscarEntidad");
    if (buscarEntidad) {
        buscarEntidad.addEventListener("input", function () {
            const busqueda = this.value.toLowerCase();
            filtradas = entidades.empresas.filter(
                (entidad) => entidad.razonSocial.toLowerCase().includes(busqueda)
            );
            renderEntidades(filtradas, 1);
        });
    }

    // Modal de entidad
    const modalEntidad = document.getElementById("modalEntidad")
    const btnNuevaEntidad = document.getElementById("btnNuevaEntidad")
    const formEntidad = document.getElementById("formEntidad")
    const closeButtons = document.querySelectorAll(".close")

    // Abrir modal para nueva entidad
    if (btnNuevaEntidad) {
        btnNuevaEntidad.addEventListener("click", () => {
            abrirFormularioNuevaEntidad();
        })
    }

    // Cerrar modales
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none"
            })
            
            // Limpiar mapa y variables globales al cerrar modal
            if (mapaEntidad) {
                mapaEntidad.remove();
                mapaEntidad = null;
                marcadorEntidad = null;
            }
            
            // Limpiar variables de ubicación
            window.entidadTieneUbicacion = false;
            window.ubicacionActual = null;
        })
    })

    // Cambiar texto del toggle
    const estadoEntidadToggle = document.getElementById("estadoEntidad")
    if (estadoEntidadToggle) {
        estadoEntidadToggle.addEventListener("change", function () {
            document.getElementById("estadoEntidadText").textContent = this.checked ? "Habilitada" : "Deshabilitada"
        })
    }

    // Event listener para cambio de departamento
    const departamentoSelect = document.getElementById("departamentoEntidad");
    if (departamentoSelect) {
        departamentoSelect.addEventListener("change", async function() {
            const departamentoId = this.value;
            await cargarCiudadesPorDepartamento(departamentoId);
        });
    }

    // Event listener para cancelar modal
    const cancelarModal = document.getElementById("cancelarModal");
    if (cancelarModal) {
        cancelarModal.addEventListener("click", function() {
            modalEntidad.style.display = "none";
            
            // Limpiar mapa y variables globales al cancelar
            if (mapaEntidad) {
                mapaEntidad.remove();
                mapaEntidad = null;
                marcadorEntidad = null;
            }
            
            // Limpiar variables de ubicación
            window.entidadTieneUbicacion = false;
            window.ubicacionActual = null;
        });
    }

    // Event listeners para botones del mapa
    const btnUbicarEnMapa = document.getElementById("btnUbicarEnMapa");
    const btnLimpiarUbicacion = document.getElementById("btnLimpiarUbicacion");
    
    if (btnUbicarEnMapa) {
        btnUbicarEnMapa.addEventListener("click", function() {
            inicializarMapaParaUbicacion();
        });
    }
    
    if (btnLimpiarUbicacion) {
        btnLimpiarUbicacion.addEventListener("click", function() {
            limpiarUbicacionMapa();
        });
    }

    // Guardar entidad
    if (formEntidad) {
        formEntidad.addEventListener("submit", async (e) => {
            e.preventDefault()

            const id = document.getElementById("entidadId").value
            const formData = new FormData();

            // Recopilar todos los datos del formulario
            formData.append('claseEntidad', document.getElementById("claseEntidad").value);
            formData.append('razonSocial', document.getElementById("nombreEntidad").value);
            formData.append('numIdentificacion', document.getElementById("numIdentificacion").value);
            formData.append('tipoEntidad', document.getElementById("tipoEntidad").value);
            formData.append('naturalezaJuridica', document.getElementById("naturalezaJuridica").value);
            formData.append('actividadEconomica', document.getElementById("actividadEconomica").value);
            formData.append('correo', document.getElementById("correoEntidad").value);
            formData.append('telefono', document.getElementById("telefonoEntidad").value);
            formData.append('fechaConstitucion', document.getElementById("fechaConstitucion").value);
            formData.append('departamento', document.getElementById("departamentoEntidad").value);
            formData.append('ciudadId', document.getElementById("ciudadEntidad").value);
            formData.append('direccion', document.getElementById("direccionEntidad").value);
            formData.append('nombreContacto', document.getElementById("nombreContacto").value);
            formData.append('cargoPersona', document.getElementById("cargoContacto").value);
            formData.append('correoContacto', document.getElementById("correoContacto").value);
            formData.append('telefonoContacto', document.getElementById("telefonoContacto").value);
            formData.append('facebook', document.getElementById("facebookEntidad").value);
            formData.append('instagram', document.getElementById("instagramEntidad").value);
            formData.append('paginaweb', document.getElementById("paginawebEntidad").value);
            
            // Usuario Administrador
            const userAdminId = document.getElementById("usuarioAdmin").value || '1'; // Valor por defecto si no se selecciona
            formData.append('UserAdminId', userAdminId);
            
            // Agregar datos de ubicación del mapa
            const latitud = document.getElementById("latitudEntidad").value;
            const longitud = document.getElementById("longitudEntidad").value;
            
            if (latitud && longitud) {
                formData.append('latitud', latitud);
                formData.append('longitud', longitud);
                console.log(`📍 Enviando ubicación: ${latitud}, ${longitud}`);
            }

            const habilitado = document.getElementById("estadoEntidad").checked;

            if (id) {
                // Editar entidad existente
                try {
                    // Verificar que API_BASE_URL esté definida
                    if (typeof API_BASE_URL === 'undefined') {
                        throw new Error('API_BASE_URL no está definida. Verifique la configuración.');
                    }

                    // Mostrar indicador de carga
                    Swal.fire({
                        title: 'Actualizando entidad...',
                        text: 'Por favor espere mientras se actualiza la información',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    const response = await fetch(`${API_BASE_URL}/api/entidad/editar/${id}`, {
                        method: "POST",
                        body: formData
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Error al actualizar entidad: ${response.status} - ${errorText}`);
                    }

                    const result = await response.json();

                    // Actualizar la entidad en el array local
                    const index = entidades.empresas.findIndex((e) => e.id === Number.parseInt(id));
                    if (index !== -1) {
                        // Actualizar con los nuevos datos
                        entidades.empresas[index] = {
                            ...entidades.empresas[index],
                            claseEntidad: document.getElementById("claseEntidad").value,
                            razonSocial: document.getElementById("nombreEntidad").value,
                            numIdentificacion: document.getElementById("numIdentificacion").value,
                            tipoEntidad: document.getElementById("tipoEntidad").value,
                            naturalezaJuridica: document.getElementById("naturalezaJuridica").value,
                            actividadEconomica: document.getElementById("actividadEconomica").value,
                            correo: document.getElementById("correoEntidad").value,
                            telefono: document.getElementById("telefonoEntidad").value,
                            fechaConstitucion: document.getElementById("fechaConstitucion").value,
                            departamento: document.getElementById("departamentoEntidad").value,
                            ciudadId: document.getElementById("ciudadEntidad").value,
                            direccion: document.getElementById("direccionEntidad").value,
                            facebook: document.getElementById("facebookEntidad").value,
                            instagram: document.getElementById("instagramEntidad").value,
                            paginaweb: document.getElementById("paginawebEntidad").value,
                            UserAdminId: userAdminId,
                            habilitado: habilitado
                        };
                        
                        // Actualizar ubicación si se proporcionó
                        if (latitud && longitud) {
                            if (!entidades.empresas[index].ubicaciones) {
                                entidades.empresas[index].ubicaciones = [];
                            }
                            
                            // Buscar ubicación existente o crear nueva
                            let ubicacionIndex = entidades.empresas[index].ubicaciones.findIndex(u => u.esUbicacionPrincipal);
                            if (ubicacionIndex === -1) {
                                ubicacionIndex = 0;
                                entidades.empresas[index].ubicaciones.push({});
                            }
                            
                            entidades.empresas[index].ubicaciones[ubicacionIndex] = {
                                ...entidades.empresas[index].ubicaciones[ubicacionIndex],
                                latitud: latitud,
                                longitud: longitud,
                                direccionCompleta: document.getElementById("direccionEntidad").value,
                                activa: true,
                                verificada: true,
                                esUbicacionPrincipal: true
                            };
                        }
                    }

                    Swal.fire({
                        icon: 'success',
                        title: '¡Entidad actualizada!',
                        text: 'La información de la entidad se ha actualizado correctamente',
                        timer: 3000,
                        showConfirmButton: false
                    });

                    // Actualizar la tabla sin recargar la página
                    renderEntidades(entidades.empresas, paginaActual);
                    modalEntidad.style.display = "none";
                } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: error.message || 'Error al actualizar la entidad',
                    });
                }
            } else {
                // Crear nueva entidad
                try {
                    // Verificar que API_BASE_URL esté definida
                    if (typeof API_BASE_URL === 'undefined') {
                        throw new Error('API_BASE_URL no está definida. Verifique la configuración.');
                    }

                    // Mostrar indicador de carga
                    Swal.fire({
                        title: 'Creando entidad...',
                        text: 'Por favor espere mientras se crea la nueva entidad',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    const response = await fetch(`${API_BASE_URL}/api/entidad/crear`, {
                        method: "POST",
                        body: formData
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Error al crear entidad: ${response.status} - ${errorText}`);
                    }

                    const result = await response.json();
                    console.log("Nueva entidad creada:", result);

                    Swal.fire({
                        icon: 'success',
                        title: '¡Entidad creada!',
                        text: 'La nueva entidad se ha creado correctamente',
                        timer: 3000,
                        showConfirmButton: false
                    });

                    // Recargar la página para mostrar la nueva entidad
                    // O alternativamente, agregar la entidad al array y re-renderizar
                    window.location.reload();
                    
                    modalEntidad.style.display = "none";
                } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear entidad',
                        text: error.message || 'Error al crear la nueva entidad',
                    });
                }
            }
        })
    }

    // Función para edición rápida (solo modal básico)
    function editarEntidadRapido(id) {
        const entidad = entidades.empresas.find((e) => e.id === id)

        if (entidad) {
            mostrarModalEdicionRapida(entidad);
        }
    }

    // Función para edición completa
    function editarEntidadCompleto(id) {
        const entidad = entidades.empresas.find((e) => e.id === id)

        if (entidad) {
            // Abrir directamente el formulario completo en el modal
            abrirFormularioCompletoEdicion(entidad);
        }
    }

    // Función para abrir el formulario completo de edición
    async function abrirFormularioCompletoEdicion(entidad) {
        try {
            // Mostrar loading mientras carga
            Swal.fire({
                title: 'Cargando datos...',
                text: 'Por favor espere mientras se cargan los datos de la entidad',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Primero cargar departamentos, ciudades y cargos
            await cargarDatosFormulario();

            // Usar los datos ya disponibles de la entidad
            console.log("Datos de entidad completos:", entidad);

            // Configurar el modal con los datos de la entidad
            document.getElementById("tituloModalEntidad").textContent = "Editar Entidad - Formulario Completo";
            document.getElementById("entidadId").value = entidad.id || "";
            
            // Datos básicos
            document.getElementById("claseEntidad").value = entidad.claseEntidad || "Empresa";
            document.getElementById("nombreEntidad").value = entidad.razonSocial || "";
            document.getElementById("numIdentificacion").value = entidad.numIdentificacion || "";
            document.getElementById("tipoEntidad").value = entidad.tipoEntidad || "Corporativa";
            document.getElementById("naturalezaJuridica").value = entidad.naturalezaJuridica || "Privada";
            document.getElementById("actividadEconomica").value = entidad.actividadEconomica || "";
            
            // Información de contacto
            document.getElementById("correoEntidad").value = entidad.correo || "";
            document.getElementById("telefonoEntidad").value = entidad.telefono || "";
            
            // Formatear fecha si existe
            if (entidad.fechaConstitucion) {
                const fecha = new Date(entidad.fechaConstitucion);
                if (!isNaN(fecha.getTime())) {
                    document.getElementById("fechaConstitucion").value = fecha.toISOString().split('T')[0];
                }
            }
            
            document.getElementById("direccionEntidad").value = entidad.direccion || "";
            
            // Ubicación - usar datos de la relación de ciudad y departamento
            const departamentoId = entidad.ciudad?.departamento?.id || entidad.departamento;
            const ciudadId = entidad.ciudad?.id || entidad.ciudadId;
            
            console.log("📍 Datos de ubicación:", {
                ciudad: entidad.ciudad,
                departamentoId: departamentoId,
                ciudadId: ciudadId
            });
            
            // Departamento primero
            if (departamentoId) {
                document.getElementById("departamentoEntidad").value = departamentoId;
                // Cargar ciudades del departamento seleccionado
                await cargarCiudadesPorDepartamento(departamentoId);
            }
            
            // Luego ciudad
            if (ciudadId) {
                // Esperar un poco para que se carguen las ciudades
                setTimeout(() => {
                    document.getElementById("ciudadEntidad").value = ciudadId;
                }, 200);
            }
            
            // Persona de contacto - múltiples fuentes posibles
            const contactoData = entidad.Contacto || entidad.contacto || {};
            const nombreContacto = contactoData.nombre || entidad.nombreContacto || "";
            const cargoContacto = contactoData.cargoId || entidad.cargoPersona || "";
            const correoContacto = contactoData.email || entidad.correoContacto || "";
            const telefonoContactoVal = contactoData.telefono || entidad.telefonoContacto || "";
            
            console.log("👤 Datos de contacto:", {
                contactoOriginal: entidad.Contacto,
                contactoLowercase: entidad.contacto,
                nombreContacto,
                cargoContacto,
                correoContacto,
                telefonoContactoVal
            });
            
            document.getElementById("nombreContacto").value = nombreContacto;
            document.getElementById("cargoContacto").value = cargoContacto;
            document.getElementById("correoContacto").value = correoContacto;
            document.getElementById("telefonoContacto").value = telefonoContactoVal;
            
            // Redes sociales
            document.getElementById("facebookEntidad").value = entidad.facebook || "";
            document.getElementById("instagramEntidad").value = entidad.instagram || "";
            document.getElementById("paginawebEntidad").value = entidad.paginaweb || "";
            
            // Estado
            const estadoEntidad = entidad.habilitado !== undefined ? entidad.habilitado : true;
            document.getElementById("estadoEntidad").checked = estadoEntidad;
            document.getElementById("estadoEntidadText").textContent = estadoEntidad ? "Habilitada" : "Deshabilitada";
            
            // Usuario Administrador
            if (entidad.UserAdminId) {
                setTimeout(() => {
                    document.getElementById("usuarioAdmin").value = entidad.UserAdminId;
                    cargarInfoAdminActual(entidad.UserAdminId);
                }, 300);
            }
            
            // Configurar event listener para selección de admin
            setupAdminSelectListener();
            
            // Cerrar loading y mostrar el modal
            Swal.close();
            modalEntidad.style.display = "block";

            // Cargar ubicación de la entidad e inicializar mapa automáticamente
            setTimeout(() => {
                cargarUbicacionDesdeEntidad(entidad);
                // Inicializar el mapa automáticamente
                inicializarMapaParaUbicacion();
            }, 300);

            console.log("Formulario poblado con datos:", {
                id: entidad.id,
                razonSocial: entidad.razonSocial,
                correo: entidad.correo,
                telefono: entidad.telefono,
                contacto: entidad.contacto,
                habilitado: entidad.habilitado,
                ubicaciones: entidad.ubicaciones
            });

        } catch (error) {
            console.error("Error al cargar datos de la entidad:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar todos los datos de la entidad. Algunos campos pueden estar vacíos.',
            });
            
            // Aún así mostrar el modal con los datos disponibles
            modalEntidad.style.display = "block";
        }
    }

    // Función para abrir el formulario completo para nueva entidad
    async function abrirFormularioNuevaEntidad() {
        try {
            // Mostrar loading mientras carga
            Swal.fire({
                title: 'Preparando formulario...',
                text: 'Por favor espere mientras se cargan los datos necesarios',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Cargar departamentos, ciudades y cargos
            await cargarDatosFormulario();

            // Configurar el modal para nueva entidad
            document.getElementById("tituloModalEntidad").textContent = "Nueva Entidad - Formulario Completo";
            document.getElementById("entidadId").value = "";
            
            // Limpiar todos los campos del formulario
            document.getElementById("claseEntidad").value = "Empresa";
            document.getElementById("nombreEntidad").value = "";
            document.getElementById("numIdentificacion").value = "";
            document.getElementById("tipoEntidad").value = "Corporativa";
            document.getElementById("naturalezaJuridica").value = "Privada";
            document.getElementById("actividadEconomica").value = "";
            
            // Información de contacto
            document.getElementById("correoEntidad").value = "";
            document.getElementById("telefonoEntidad").value = "";
            document.getElementById("fechaConstitucion").value = "";
            document.getElementById("direccionEntidad").value = "";
            
            // Ubicación
            document.getElementById("departamentoEntidad").value = "";
            document.getElementById("ciudadEntidad").value = "";
            
            // Persona de contacto
            document.getElementById("nombreContacto").value = "";
            document.getElementById("cargoContacto").value = "";
            document.getElementById("correoContacto").value = "";
            document.getElementById("telefonoContacto").value = "";
            
            // Redes sociales
            document.getElementById("facebookEntidad").value = "";
            document.getElementById("instagramEntidad").value = "";
            document.getElementById("paginawebEntidad").value = "";
            
            // Estado - habilitada por defecto para nueva entidad
            document.getElementById("estadoEntidad").checked = true;
            document.getElementById("estadoEntidadText").textContent = "Habilitada";
            
            // Limpiar campos de ubicación del mapa
            document.getElementById("latitudEntidad").value = "";
            document.getElementById("longitudEntidad").value = "";
            
            // Limpiar variables de ubicación
            window.entidadTieneUbicacion = false;
            window.ubicacionActual = null;
            
            // Configurar event listener para selección de admin
            setupAdminSelectListener();
            
            // Cerrar loading y mostrar el modal
            Swal.close();
            modalEntidad.style.display = "block";

            // Inicializar el mapa automáticamente para nueva entidad
            setTimeout(() => {
                inicializarMapaParaUbicacion();
            }, 300);

            console.log("Formulario de nueva entidad inicializado");

        } catch (error) {
            console.error("Error al preparar formulario para nueva entidad:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar formulario',
                text: 'No se pudieron cargar todos los datos necesarios. Algunos campos pueden no estar disponibles.',
            });
            
            // Aún así mostrar el modal
            modalEntidad.style.display = "block";
        }
    }

    // Función para cargar departamentos, ciudades y cargos
    async function cargarDatosFormulario() {
        try {
            // Verificar que API_BASE_URL esté definida
            if (typeof API_BASE_URL === 'undefined') {
                console.warn('API_BASE_URL no está definida, usando datos por defecto');
                return;
            }

            // Cargar departamentos
            try {
                const responseDeptos = await fetch(`${API_BASE_URL}/api/departamentos`);
                if (responseDeptos.ok) {
                    const dataDep = await responseDeptos.json();
                    const departamentos = dataDep.departamentos || dataDep;
                    
                    const selectDep = document.getElementById('departamentoEntidad');
                    if (selectDep) {
                        selectDep.innerHTML = '<option value="">Seleccione un departamento</option>';
                        
                        if (Array.isArray(departamentos)) {
                            departamentos.forEach(dep => {
                                const option = document.createElement('option');
                                option.value = dep.id;
                                option.textContent = dep.nombre;
                                selectDep.appendChild(option);
                            });
                            console.log(`Cargados ${departamentos.length} departamentos`);
                        }
                    }
                } else {
                    console.warn('Error al cargar departamentos:', responseDeptos.status);
                }
            } catch (error) {
                console.error('Error al cargar departamentos:', error);
            }

            // Cargar cargos
            try {
                const responseCargos = await fetch(`${API_BASE_URL}/api/cargos`);
                if (responseCargos.ok) {
                    const dataCargos = await responseCargos.json();
                    const cargos = dataCargos.cargos || dataCargos;
                    
                    const selectCargo = document.getElementById('cargoContacto');
                    if (selectCargo) {
                        selectCargo.innerHTML = '<option value="">Seleccione un cargo</option>';
                        
                        if (Array.isArray(cargos)) {
                            cargos.forEach(cargo => {
                                const option = document.createElement('option');
                                option.value = cargo.id;
                                option.textContent = cargo.nombre;
                                selectCargo.appendChild(option);
                            });
                            console.log(`Cargados ${cargos.length} cargos`);
                        }
                    }
                } else {
                    console.warn('Error al cargar cargos:', responseCargos.status);
                }
            } catch (error) {
                console.error('Error al cargar cargos:', error);
            }

            // Cargar usuarios administradores
            await cargarUsuariosAdmin();

        } catch (error) {
            console.error('Error general al cargar datos del formulario:', error);
        }
    }

    // Función para cargar ciudades por departamento
    async function cargarCiudadesPorDepartamento(departamentoId) {
        const selectCiudad = document.getElementById('ciudadEntidad');
        if (!selectCiudad) return;
        
        selectCiudad.innerHTML = '<option value="">Seleccione una ciudad</option>';
        
        if (!departamentoId) return;

        try {
            // Verificar que API_BASE_URL esté definida
            if (typeof API_BASE_URL === 'undefined') {
                console.warn('API_BASE_URL no está definida');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/ciudades/${departamentoId}`);
            if (response.ok) {
                const data = await response.json();
                const ciudades = data.ciudades || data;
                
                if (Array.isArray(ciudades)) {
                    ciudades.forEach(ciudad => {
                        const option = document.createElement('option');
                        option.value = ciudad.id;
                        option.textContent = ciudad.nombre;
                        selectCiudad.appendChild(option);
                    });
                    console.log(`Cargadas ${ciudades.length} ciudades para departamento ${departamentoId}`);
                } else {
                    console.warn('La respuesta de ciudades no es un array:', ciudades);
                }
            } else {
                console.warn(`Error al cargar ciudades: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al cargar ciudades:', error);
        }
    }

    // Función para modal de edición rápida (solo estado)
    function mostrarModalEdicionRapida(entidad) {
        document.getElementById("tituloModalEntidad").textContent = "Edición Rápida - Entidad"
        document.getElementById("entidadId").value = entidad.id
        document.getElementById("nombreEntidad").value = entidad.razonSocial
        document.getElementById("tipoEntidad").value = entidad.tipoEntidad || "Corporativa"
        document.getElementById("estadoEntidad").checked = entidad.habilitado
        document.getElementById("estadoEntidadText").textContent = entidad.habilitado ? "Habilitada" : "Deshabilitada"

        // Mostrar advertencia de que es edición limitada
        const modalContent = document.querySelector("#modalEntidad .modal-content");
        
        // Eliminar advertencia previa si existe
        const existingWarning = modalContent.querySelector('.warning-message');
        if (existingWarning) {
            existingWarning.remove();
        }

        // Agregar advertencia
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning-message';
        warningDiv.style.cssText = 'background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; border-radius: 4px; color: #856404;';
        warningDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle"></i> 
            <strong>Edición Limitada:</strong> Solo puede cambiar el estado. Para editar otros campos, use el "Formulario Completo".
        `;
        
        modalContent.insertBefore(warningDiv, modalContent.querySelector('form'));

        modalEntidad.style.display = "block"
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
        btnConfirmarEliminar.addEventListener("click", async () => {
            if (entidadIdEliminar !== null) {
                // NOTA: La funcionalidad de eliminar entidad no está implementada en el backend
                Swal.fire({
                    icon: 'warning',
                    title: 'Funcionalidad no disponible',
                    text: 'La eliminación de entidades no está implementada en el sistema.',
                });

                modalConfirmacion.style.display = "none";
                entidadIdEliminar = null;

                /* TODO: Implementar endpoint de eliminación en el backend
                try {
                    const response = await fetch(`${API_BASE_URL}/api/entidad/eliminar/${entidadIdEliminar}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar la entidad");
                    }

                    // Eliminar la entidad del array local
                    const index = entidades.empresas.findIndex((e) => e.id === entidadIdEliminar);
                    if (index !== -1) {
                        entidades.empresas.splice(index, 1);
                        renderEntidades(entidades.empresas);
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Entidad eliminada correctamente',
                    });

                    modalConfirmacion.style.display = "none";
                    entidadIdEliminar = null;
                } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar la entidad',
                    });
                }
                */
            }
        })
    }
}

// Variables globales para el mapa
let mapaEntidad = null;
let marcadorEntidad = null;

// Función para inicializar el mapa para ubicación
function inicializarMapaParaUbicacion() {
    console.log("🗺️ Inicializando mapa para ubicación...");
    
    // Si el mapa ya existe, destruirlo
    if (mapaEntidad) {
        mapaEntidad.remove();
        mapaEntidad = null;
        marcadorEntidad = null;
    }
    
    // Coordenadas por defecto (Bogotá, Colombia)
    let latInicial = 4.6097;
    let lngInicial = -74.0817;
    let zoomInicial = 6;
    
    // Si hay coordenadas previas, usarlas
    const latActual = document.getElementById("latitudEntidad").value;
    const lngActual = document.getElementById("longitudEntidad").value;
    
    // Priorizar ubicación desde los datos cargados
    if (window.ubicacionActual && window.ubicacionActual.lat && window.ubicacionActual.lng) {
        latInicial = window.ubicacionActual.lat;
        lngInicial = window.ubicacionActual.lng;
        zoomInicial = 15;
        console.log(`📍 Usando ubicación desde datos: ${latInicial}, ${lngInicial}`);
    } else if (latActual && lngActual && latActual !== "" && lngActual !== "") {
        latInicial = parseFloat(latActual);
        lngInicial = parseFloat(lngActual);
        zoomInicial = 15;
        console.log(`📍 Usando coordenadas de campos: ${latInicial}, ${lngInicial}`);
    } else {
        console.log("📍 Usando coordenadas por defecto (Bogotá)");
    }
    
    // Crear el mapa
    mapaEntidad = L.map('mapaEntidad').setView([latInicial, lngInicial], zoomInicial);
    
    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(mapaEntidad);
    
    // Si hay coordenadas, mostrar marcador
    if ((window.ubicacionActual && window.ubicacionActual.lat) || (latActual && lngActual && latActual !== "" && lngActual !== "")) {
        marcadorEntidad = L.marker([latInicial, lngInicial])
            .addTo(mapaEntidad)
            .bindPopup(`Ubicación actual<br>Lat: ${latInicial.toFixed(7)}<br>Lng: ${lngInicial.toFixed(7)}`)
            .openPopup();
    }
    
    // Event listener para clic en el mapa
    mapaEntidad.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        // Actualizar campos de latitud y longitud
        document.getElementById("latitudEntidad").value = lat.toFixed(7);
        document.getElementById("longitudEntidad").value = lng.toFixed(7);
        
        // Remover marcador anterior si existe
        if (marcadorEntidad) {
            mapaEntidad.removeLayer(marcadorEntidad);
        }
        
        // Agregar nuevo marcador
        marcadorEntidad = L.marker([lat, lng])
            .addTo(mapaEntidad)
            .bindPopup(`Ubicación seleccionada:<br>Lat: ${lat.toFixed(7)}<br>Lng: ${lng.toFixed(7)}`)
            .openPopup();
        
        console.log(`📍 Nueva ubicación seleccionada: ${lat.toFixed(7)}, ${lng.toFixed(7)}`);
    });
    
    // Redimensionar mapa después de un breve delay
    setTimeout(() => {
        if (mapaEntidad) {
            mapaEntidad.invalidateSize();
            console.log("🗺️ Mapa redimensionado");
        }
    }, 100);
}

// Función para limpiar la ubicación del mapa
function limpiarUbicacionMapa() {
    document.getElementById("latitudEntidad").value = "";
    document.getElementById("longitudEntidad").value = "";
    
    if (marcadorEntidad && mapaEntidad) {
        mapaEntidad.removeLayer(marcadorEntidad);
        marcadorEntidad = null;
    }
    
    console.log("🗑️ Ubicación del mapa limpiada");
}

// Función para cargar ubicación desde los datos de la entidad (más eficiente)
function cargarUbicacionDesdeEntidad(entidad) {
    try {
        console.log(`🔍 Cargando ubicación desde datos de entidad ${entidad.id}`);
        console.log("📍 Ubicaciones disponibles:", entidad.ubicaciones);
        
        // Buscar la ubicación principal o la primera activa
        let ubicacion = null;
        
        if (entidad.ubicaciones && entidad.ubicaciones.length > 0) {
            // Buscar ubicación principal primero
            ubicacion = entidad.ubicaciones.find(u => u.esUbicacionPrincipal && u.activa);
            
            // Si no hay principal, tomar la primera activa
            if (!ubicacion) {
                ubicacion = entidad.ubicaciones.find(u => u.activa);
            }
            
            // Si no hay activa, tomar la primera
            if (!ubicacion) {
                ubicacion = entidad.ubicaciones[0];
            }
        }
        
        if (ubicacion) {
            console.log("📍 Ubicación encontrada:", ubicacion);
            
            // Llenar campos de coordenadas
            document.getElementById("latitudEntidad").value = ubicacion.latitud;
            document.getElementById("longitudEntidad").value = ubicacion.longitud;
            
            // Marcar que hay ubicación para que el mapa se centre correctamente
            window.entidadTieneUbicacion = true;
            window.ubicacionActual = {
                lat: parseFloat(ubicacion.latitud),
                lng: parseFloat(ubicacion.longitud)
            };
        } else {
            console.log("📍 No se encontró ubicación para esta entidad");
            // Limpiar campos si no hay ubicación
            document.getElementById("latitudEntidad").value = "";
            document.getElementById("longitudEntidad").value = "";
            
            // Marcar que no hay ubicación
            window.entidadTieneUbicacion = false;
            window.ubicacionActual = null;
        }
    } catch (error) {
        console.error('Error al cargar ubicación desde entidad:', error);
    }
}

// Función para cargar ubicación existente de la entidad (mantener como respaldo)
async function cargarUbicacionEntidad(entidadId) {
    try {
        console.log(`🔍 Cargando ubicación para entidad ${entidadId}`);
        
        if (typeof API_BASE_URL === 'undefined') {
            console.warn('API_BASE_URL no está definida');
            return;
        }
        
        const response = await fetch(`${API_BASE_URL}/api/ubicacion-entidad/entidad/${entidadId}`);
        if (response.ok) {
            const data = await response.json();
            
            if (data.ubicaciones && data.ubicaciones.length > 0) {
                const ubicacion = data.ubicaciones[0]; // Tomar la primera ubicación
                
                console.log("📍 Ubicación encontrada:", ubicacion);
                
                // Llenar campos de coordenadas
                document.getElementById("latitudEntidad").value = ubicacion.latitud;
                document.getElementById("longitudEntidad").value = ubicacion.longitud;
                
                // Si el mapa está inicializado, centrar y agregar marcador
                if (mapaEntidad) {
                    const lat = parseFloat(ubicacion.latitud);
                    const lng = parseFloat(ubicacion.longitud);
                    
                    mapaEntidad.setView([lat, lng], 15);
                    
                    if (marcadorEntidad) {
                        mapaEntidad.removeLayer(marcadorEntidad);
                    }
                    
                    marcadorEntidad = L.marker([lat, lng])
                        .addTo(mapaEntidad)
                        .bindPopup('Ubicación actual de la entidad')
                        .openPopup();
                }
            } else {
                console.log("📍 No se encontró ubicación para esta entidad");
            }
        } else {
            console.warn(`Error al cargar ubicación: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al cargar ubicación de entidad:', error);
    }
}

// Funciones para manejar usuarios administradores
async function cargarUsuariosAdmin() {
    try {
        console.log("👥 Cargando usuarios administradores...");
        
        if (typeof API_BASE_URL === 'undefined') {
            console.warn('API_BASE_URL no está definida');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/user`);
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.status}`);
        }

        const data = await response.json();
        console.log("👥 Datos de usuarios recibidos:", data);
        console.log("👥 Tipo de data:", typeof data);
        console.log("👥 Es array data?:", Array.isArray(data));

        // La API parece devolver directamente un array de usuarios
        const usuarios = Array.isArray(data) ? data : (data.usuarios || data);
        console.log("👥 Usuarios extraídos:", usuarios);
        console.log("👥 Tipo de usuarios:", typeof usuarios);
        console.log("👥 Es array usuarios?:", Array.isArray(usuarios));
        
        if (usuarios && usuarios.length > 0) {
            console.log("👥 Primer usuario como ejemplo:", usuarios[0]);
            console.log("👥 Campos disponibles en el primer usuario:", Object.keys(usuarios[0]));
        }
        const selectAdmin = document.getElementById('usuarioAdmin');
        
        if (!selectAdmin) {
            console.warn('Elemento usuarioAdmin no encontrado');
            return;
        }

        // Limpiar opciones existentes
        selectAdmin.innerHTML = '<option value="">Seleccione un usuario administrador</option>';

        if (Array.isArray(usuarios) && usuarios.length > 0) {
            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id;
                
                // Usar el campo correcto: 'name' en lugar de 'nombre'
                const nombre = usuario.name || usuario.nombre || usuario.username || usuario.firstName || 
                              (usuario.firstName && usuario.lastName ? `${usuario.firstName} ${usuario.lastName}` : '') ||
                              usuario.email || `Usuario ${usuario.id}`;
                
                const email = usuario.email || '';
                
                // Mostrar nombre y email si están disponibles
                if (email && email !== nombre) {
                    option.textContent = `${nombre} (${email})`;
                } else {
                    option.textContent = nombre;
                }
                
                selectAdmin.appendChild(option);
                
                // Log para debugging
                console.log(`👥 Usuario agregado: ID=${usuario.id}, Nombre=${nombre}, Email=${email}`);
            });
            console.log(`👥 Cargados ${usuarios.length} usuarios administradores`);
        } else {
            console.warn('No se encontraron usuarios o la respuesta no es válida');
            console.log('👥 Estructura de datos recibida:', usuarios);
        }
    } catch (error) {
        console.error('Error al cargar usuarios administradores:', error);
    }
}

async function cargarInfoAdminActual(userAdminId) {
    try {
        if (!userAdminId) {
            document.getElementById('emailAdminActual').value = '';
            return;
        }

        console.log(`📧 Cargando info del admin actual ID: ${userAdminId}`);
        
        if (typeof API_BASE_URL === 'undefined') {
            console.warn('API_BASE_URL no está definida');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/user/email/${userAdminId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener email del admin: ${response.status}`);
        }

        const data = await response.json();
        console.log("📧 Datos del admin actual:", data);

        const emailInput = document.getElementById('emailAdminActual');
        if (emailInput && data.email) {
            emailInput.value = data.email;
        }
    } catch (error) {
        console.error('Error al cargar info del admin actual:', error);
        const emailInput = document.getElementById('emailAdminActual');
        if (emailInput) {
            emailInput.value = '';
        }
    }
}

// Event listener para cambios en la selección del admin
function setupAdminSelectListener() {
    const selectAdmin = document.getElementById('usuarioAdmin');
    if (selectAdmin) {
        selectAdmin.addEventListener('change', function() {
            const selectedUserId = this.value;
            if (selectedUserId) {
                cargarInfoAdminActual(selectedUserId);
            } else {
                document.getElementById('emailAdminActual').value = '';
            }
        });
        console.log("👥 Event listener para selección de admin configurado");
    }
}



