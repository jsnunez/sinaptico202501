document.getElementById('btnNuevoReto').addEventListener('click', function () {
    // Crear un modal dinámico para el formulario de creación de retos
    const modalCrearReto = document.createElement('div');
    modalCrearReto.classList.add('modal');
    modalCrearReto.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1>Crear Nuevo Reto</h1>
            <form id="crearRetoForm">
                <label for="nombre">Nombre del Reto:</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="ubicacionVideo">Ubicación del Video:</label>
                <input type="file" id="video" name="video" accept="video/*">

                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion"></textarea>

                <label for="ubicacionFicha">Ubicación de la Ficha:</label>
                <input type="file" id="ficha" name="ficha" accept=".pdf,.doc,.docx">

                <button type="submit">Crear Reto</button>
            </form>
        </div>
    `;

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modalCrearReto);

    // Mostrar el modal
    modalCrearReto.style.display = 'block';

    // Cerrar el modal al hacer clic en el botón de cerrar
    modalCrearReto.querySelector('.close').addEventListener('click', function () {
        modalCrearReto.style.display = 'none';
        document.body.removeChild(modalCrearReto);
    });

    // Manejar el envío del formulario
    document.getElementById('crearRetoForm').addEventListener('submit', function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'Reto Creado',
            text: 'El reto se ha creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        modalCrearReto.style.display = 'none';
        document.body.removeChild(modalCrearReto);
    });
});
