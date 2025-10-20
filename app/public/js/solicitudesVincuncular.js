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
            <tr style="border-bottom:1px solid #e9ecef;">
            <td style="padding:12px 8px;">${solicitud.id}</td>
            <td style="padding:12px 8px;font-weight:600;color:#2b2f3a;">
            ${solicitud.User ? solicitud.User.name : ''}
            </td>
            <td style="padding:12px 8px;color:#6c757d;">
            ${solicitud.User ? solicitud.User.email : ''}
            </td>
            <td style="padding:12px 8px;">
            ${solicitud.Cargo ? solicitud.Cargo.nombre : ''}
            </td>
            <td style="padding:12px 8px;display:flex;gap:8px;justify-content: center  ;align-items:center;">
            <!-- Toggle bonito (si es administrador no se puede cambiar) -->
            ${ (solicitud.Cargo && (solicitud.Cargo.nombre || '').toLowerCase().includes('admin')) ? 
                `<button
                aria-disabled="true"
                title="No se puede modificar el estado de un administrador"
                style="display:inline-flex;align-items:center;gap:10px;border:0;padding:6px 10px;border-radius:999px;cursor:not-allowed;
                       background: linear-gradient(180deg,#6c757d,#495057);
                       color:#fff;box-shadow:0 2px 6px rgba(43,52,69,0.08);font-weight:600;opacity:0.85;"
                >
                <span style="position:relative;width:44px;height:24px;display:inline-block;border-radius:12px;background:rgba(255,255,255,0.18);flex-shrink:0;">
                    <span style="position:absolute;top:2px;left:${solicitud.estado ? '22px' : '2px'};width:20px;height:20px;background:#fff;border-radius:50%;
                     box-shadow:0 2px 4px rgba(0,0,0,0.15);transition:left .18s;"></span>
                </span>
                <span style="font-size:0.88rem;">${solicitud.estado ? 'Habilitado' : 'Deshabilitado'} </span>
                </button>` 
              : 
                `<button
                class="toggle-estado-btn"
                data-id="${solicitud.id}"
                aria-pressed="${solicitud.estado ? 'true' : 'false'}"
                title="${solicitud.estado ? 'Deshabilitar' : 'Habilitar'}"
                style="display:inline-flex;align-items:center;gap:10px;border:0;padding:6px 10px;border-radius:999px;cursor:pointer;
                       background: linear-gradient(180deg, ${solicitud.estado ? '#46d36a' : '#ff8a8a'}, ${solicitud.estado ? '#28a745' : '#dc3545'});
                       color:#fff;box-shadow:0 2px 6px rgba(43,52,69,0.08);font-weight:600;"
                >
                <span style="position:relative;width:44px;height:24px;display:inline-block;border-radius:12px;background:rgba(255,255,255,0.18);flex-shrink:0;">
                    <span style="position:absolute;top:2px;left:${solicitud.estado ? '22px' : '2px'};width:20px;height:20px;background:#fff;border-radius:50%;
                     box-shadow:0 2px 4px rgba(0,0,0,0.15);transition:left .18s;"></span>
                </span>
                <span style="font-size:0.88rem;">${solicitud.estado ? 'Habilitado' : 'Deshabilitado'}</span>
                </button>` }
            
            <!-- Botón eliminar con ícono -->
            <button
            class="delete-solicitud-btn"
            data-id="${solicitud.id}"
            title="Eliminar solicitud"
            style="background:transparent;border:0;padding:6px;border-radius:8px;cursor:pointer;color:#c92a2a;display:inline-flex;align-items:center;gap:6px;"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9.5A1.5 1.5 0 0 1 11.5 15h-7A1.5 1.5 0 0 1 3 13.5V4H2.5a1 1 0 1 1 0-2h3.1a1 1 0 0 1 .9-.6h2a1 1 0 0 1 .9.6H13.5a1 1 0 0 1 1 1zM5.118 4 5 4.059V13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4.059L10.882 4H5.118z"/>
            </svg>
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




