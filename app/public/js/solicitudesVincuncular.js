// solicitudesVincuncular.js

    const tableBody = document.getElementById('solicitudes-list-body');

    async function fetchSolicitudes(idEntidad) {
            console.log('id entidad', idEntidad);

        try {
            const response = await fetch('/api/usuarioempresa/empresa/' + idEntidad);
            if (!response.ok) throw new Error('Error al obtener datos');
            const data = await response.json();
            renderTable(data);
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
        }
    }

    function renderTable(solicitudes) {
        console.log('solicitudes', solicitudes);
        if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">No hay solicitudes vinculadas.</td></tr>';
            return;
        }
        tableBody.innerHTML = solicitudes.map(solicitud => `
            <tr>
            <td>${solicitud.id}</td>
            <td>${solicitud.User.name}</td>
            <td>${solicitud.User.email}</td>
            <td>${solicitud.Cargo.nombre}</td>
            <td>
            <button class="toggle-estado-btn" data-id="${solicitud.id}">
            ${solicitud.estado ? 'Habilitado' : 'Deshabilitado'}
            </button>
            </td>
            </tr>
        `).join('');

        // Agregar listeners para los botones toggle
        document.querySelectorAll('.toggle-estado-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            try {
                const response = await fetch(`/api/usuarioempresa/habilitar/${id}`, {
                method: 'PUT'
                });
                if (!response.ok) throw new Error('No se pudo cambiar el estado');
                // Opcional: refrescar la tabla
                fetchSolicitudes(idEntidad);
            } catch (error) {
                alert('Error: ' + error.message);
            }
            });
        });
    }

