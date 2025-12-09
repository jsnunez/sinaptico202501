document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-container");
    const buscarInput = document.getElementById("buscarCurso");
    const paginador = document.getElementById("paginador");

    let recursosGlobal = [];   // Recursos desde la API
    let recursosFiltrados = []; // Para búsquedas
    let paginaActual = 1;
    const porPagina = 12;

    // Renderiza tarjetas según la página
    function renderCursosPaginados() {
        const inicio = (paginaActual - 1) * porPagina;
        const fin = inicio + porPagina;
        const items = recursosFiltrados.slice(inicio, fin);
        renderCursos(items);
        renderPaginador();
    }

    // Renderizar tarjetas
    function renderCursos(Recursos) {
        gridContainer.innerHTML = "";
        Recursos.forEach(recurso => {
            const card = document.createElement("div");
            card.className = "grid-item";
            card.innerHTML = `
                <div class="card-recurso">
                    <h3 class="card-title">${recurso.nombre}</h3>
                    <p class="card-subtitle">${recurso.descripcion}</p>
                    
                     <button class="action-button" onclick="window.location.href='/detalleBiblioteca'">Ver documentos</button>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }
// <button class="action-button" onclick="window.open('recursos/${recurso.ubicacion}', '_blank')">Ver documentos</button>



    // Crear paginador
    function renderPaginador() {
        paginador.innerHTML = "";
        const totalPaginas = Math.ceil(recursosFiltrados.length / porPagina);

        if (totalPaginas <= 1) return; // No mostrar si no hay varias páginas

        // Botón anterior
        const btnAnterior = document.createElement("button");
        btnAnterior.innerText = "« Anterior";
        btnAnterior.className = "btn-pagina";
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.onclick = () => {
            paginaActual--;
            renderCursosPaginados();
        };
        paginador.appendChild(btnAnterior);

        // Páginas numeradas
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.className = "btn-pagina";
            if (i === paginaActual) btn.classList.add("activo");
            btn.onclick = () => {
                paginaActual = i;
                renderCursosPaginados();
            };
            paginador.appendChild(btn);
        }

        // Botón siguiente
        const btnSiguiente = document.createElement("button");
        btnSiguiente.innerText = "Siguiente »";
        btnSiguiente.className = "btn-pagina";
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.onclick = () => {
            paginaActual++;
            renderCursosPaginados();
        };
        paginador.appendChild(btnSiguiente);
    }

    // Obtener Recursos desde API
    async function cargarCursos() {
        try {
            const res = await fetch(`/api/recurso`);
            recursosGlobal = await res.json();
            recursosFiltrados = recursosGlobal;
            renderCursosPaginados();
        } catch (error) {
            console.error("Error al cargar Recursos:", error);
        }
    }

    // Búsqueda
    buscarInput.addEventListener("input", () => {
        const texto = buscarInput.value.toLowerCase();
        recursosFiltrados = recursosGlobal.filter(r =>
            r.nombre.toLowerCase().includes(texto)
        );
        paginaActual = 1;
        renderCursosPaginados();
    });

    // Botón limpiar
    document.getElementById('filter-biblioteca').addEventListener('click', () => {
        document.getElementById('buscarCurso').value = '';

        cargarCursos();

    });
    cargarCursos();
});
