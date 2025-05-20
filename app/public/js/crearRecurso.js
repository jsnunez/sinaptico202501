

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crearRetoForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío predeterminado del formulario
console.log('Formulario enviado'); // Agrega un log para verificar el envío del formulario
        const formData = new FormData(form);

        try {
            const response = await fetch(`${API_BASE_URL}/api/recurso`, {
                method: 'POST',
                body: formData,
            });
modalCrearReto.style.display = 'none';

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: '¡Reto creado exitosamente!',
                    text: 'El reto se ha registrado correctamente.',
                    confirmButtonColor: '#3085d6'
                });
                console.log(result);
                form.reset();
            } else {
                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el reto',
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
document.getElementById('btnNuevoReto').addEventListener('click', function () {

modalCrearReto.style.display = 'block';});


document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
        modalCrearReto.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === modalCrearReto) {
        modalCrearReto.style.display = 'none';
    }
});