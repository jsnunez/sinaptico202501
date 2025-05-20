document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-classified-form');
    const submitButton = document.getElementById('submit-contact-btn');
    const cancelButton = document.getElementById('cancel-contact-btn');

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const telefono = document.getElementById('contact-phone').value.trim();
        const mensaje = document.getElementById('contact-message').value.trim();

        if (!nombre || !email || !mensaje) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos obligatorios.',
            });
            return;
        }

        const formData = {
            nombre,
            email,
            telefono,
            mensaje,
            clasificadoId: clasificadoIdSelect,
            userId: userid,
        };

        try {
            // Mostrar loading
            Swal.fire({
                title: 'Enviando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        
            const response = await fetch('/api/contactarSolicitud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            Swal.close(); // Cierra el loading
        
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje enviado',
                    text: 'Mensaje enviado exitosamente.',
                });
                contactForm.reset();
                 
        document.getElementById('contact-classified-modal').style.display = 'none';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.',
                });
            }
        } catch (error) {
            Swal.close(); // Asegúrate de cerrar si hay error también
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.',
            });
        }
        
    });

    // cancelButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     contactForm.reset();
    //     document.getElementById('contact-classified-modal').style.display = 'none';
    // });
});