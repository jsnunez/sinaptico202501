function contactarIntegrante(id, nombre) {
    const miNombre = obtenerCookie("user");
    Swal.fire({
        title: 'Contactar Integrante',
        text: `¿Deseas contactar a ${nombre}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, contactar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const userId = obtenerCookie("userId");
            const paraUserId = id; // Using the id parameter from the function
            const mensaje = `Hola, me gustaría ponerme en contacto con ${nombre}`;

            if (userId && paraUserId) {
            fetch(`${API_BASE_URL}/api/invitacion`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                desdeuserid: parseInt(userId),
                parauserid: parseInt(paraUserId),
                mensaje
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                if (data && data.id) {
                fetch(`${API_BASE_URL}/api/contactar/solicitar-datos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        miNombre: miNombre,
                        userId: id
                    })
                })
                .then(res => res.json())
                .then(infoData => {
                    console.log('Información solicitada:', infoData);
                })
                .catch(err => {
                    console.error('Error al solicitar información:', err);
                });
                Swal.fire(
                    'Enviado',
                    `Se ha enviado la invitación a ${nombre}`,
                    'success'
                );
                } else {
                Swal.fire(
                    'Error',
                    'No se pudo enviar la invitación: ' + (data.error || 'Error desconocido.'),
                    'error'
                );
                }
            })
            .catch(err => {
                console.error('Error al enviar invitación:', err);
                Swal.fire(
                'Error',
                'Error al enviar la invitación.',
                'error'
                );
            });
            } else {
            Swal.fire(
                'Error',
                'No se pudo obtener la información del usuario.',
                'error'
            );
            }
        }
    });
}