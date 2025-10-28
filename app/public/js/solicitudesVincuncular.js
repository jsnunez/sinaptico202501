// solicitudesVincuncular.js
document.getElementById('verIntegrantesEntidad').onclick = function () {

    document.getElementById('modalVerIntegrantesEntidad').style.display = 'block';

    // Opcional: cargar foto actual si tienes la URL
    // document.getElementById('previewFotoPerfil').src = 'URL_DE_LA_FOTO_ACTUAL';
};
// Cerrar modal
document.getElementById('cerrarModalVerIntegrantesEntidad').onclick = function () {
    document.getElementById('modalVerIntegrantesEntidad').style.display = 'none';
};
document.getElementById('cerrarModalVerIntegrantesEntidadBtn').onclick = function () {
    document.getElementById('modalVerIntegrantesEntidad').style.display = 'none';
};



const tableBody = document.getElementById('solicitudes-list-body');


async function fetchSolicitudes(idEntidad) {
    console.log('id entidad', idEntidad);
    let adminUserId = null;
    try {
        const response = await fetch('/api/entidad/verificar-admin/' + idEntidad);
        console.log('Verfiicar admin', response);
        if (!response.ok) throw new Error('Error al obtener datos');
        const data = await response.json();
        console.log('data entidad', data);
        adminUserId = data.entidad.UserAdminId;
        try {
            const response = await fetch('/api/usuarioempresa/empresa/' + idEntidad);
            if (!response.ok) throw new Error('Error al obtener datos');
            const data = await response.json();

            renderTable(data, adminUserId);

        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
        }

    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
    }

}

function renderTable(solicitudes, adminUserId) {
    console.log('solicitudes', solicitudes);
    console.log('adminUserId', adminUserId);
    if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No hay solicitudes vinculadas.</td></tr>';
        return;
    }
    tableBody.innerHTML = solicitudes.map(solicitud => `
            <tr style="border-bottom:1px solid #e9ecef;">
         
            <td style="padding:12px 8px;font-weight:600;color:#2b2f3a;">
            ${solicitud.User ? solicitud.User.name : ''}
            </td>
            <td style="padding:12px 8px;color:#6c757d;">
            ${solicitud.User ? solicitud.User.email : ''}
            </td>
            <td style="padding:12px 8px;">
            ${solicitud.Cargo ? solicitud.Cargo.nombre : ''}
            </td>
            <td style="display:flex;justify-content: center ; aling-item: center;">
            <!-- Toggle bonito (si es administrador no se puede cambiar) -->
            ${(solicitud.User && solicitud.User.id === adminUserId) ?
            `<button aria-disabled="true"
            title="No se puede modificar el estado de un administrador"
            style="display:inline-flex;align-items:center;gap:10px;border:0;padding:6px 10px;border-radius:999px;cursor:not-allowed;
               background: linear-gradient(180deg,#6c757d,#495057);
               color:#fff;box-shadow:0 2px 6px rgba(43,52,69,0.08);font-weight:600;opacity:0.85;">
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
            </td>
        
            <td >
            <!-- Botón eliminar con ícono -->
            ${(solicitud.User && solicitud.User.id === adminUserId)
            ? `
                <!-- Si es administrador: ícono gris e inhabilitado -->
                <button
                    aria-disabled="true"
                    title="No se puede eliminar un administrador"
                    style="
                    background: transparent;
                    border: 0;
                    padding: 6px;
                    border-radius: 8px;
                    cursor: not-allowed;
                    color: #adb5bd; /* gris claro */
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    opacity: 0.6;
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9.5A1.5 1.5 0 0 1 11.5 15h-7A1.5 1.5 0 0 1 3 13.5V4H2.5a1 1 0 1 1 0-2h3.1a1 1 0 0 1 .9-.6h2a1 1 0 0 1 .9.6H13.5a1 1 0 0 1 1 1zM5.118 4 5 4.059V13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4.059L10.882 4H5.118z"/>
                    </svg>
                </button>
                `
            : `
                <!-- Si NO es administrador: botón normal de eliminar -->
                <button
                    class="delete-solicitud-btn"
                    data-id="${solicitud.id}"
                    title="Eliminar solicitud"
                    style="
                    background: transparent;
                    border: 0;
                    padding: 6px;
                    border-radius: 8px;
                    cursor: pointer;
                    color: #c92a2a;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9.5A1.5 1.5 0 0 1 11.5 15h-7A1.5 1.5 0 0 1 3 13.5V4H2.5a1 1 0 1 1 0-2h3.1a1 1 0 0 1 .9-.6h2a1 1 0 0 1 .9.6H13.5a1 1 0 0 1 1 1zM5.118 4 5 4.059V13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V4.059L10.882 4H5.118z"/>
                    </svg>
                </button>
                `}
            </td>
            </tr>
        `).join('');

    // Agregar listeners para los botones toggle
    document.querySelectorAll('.toggle-estado-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
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

// Delegated handler para botones "Eliminar solicitud"
tableBody.addEventListener('click', async (event) => {
    const btn = event.target.closest('.delete-solicitud-btn');
    if (!btn) return;

    const id = btn.getAttribute('data-id');
    if (!id) return;

    const result = await Swal.fire({
        title: '¿Eliminar solicitud?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
        btn.disabled = true;
        btn.style.opacity = '0.6';

        const response = await fetch(`/api/usuarioempresa/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            let msg = 'No se pudo eliminar la solicitud';
            try {
                const payload = await response.json();
                msg = payload.message || JSON.stringify(payload);
            } catch (e) {
                try { msg = await response.text(); } catch (_) { }
            }
            throw new Error(msg);
        }

        // Remover la fila correspondiente del DOM
        const row = btn.closest('tr');
        if (row) row.remove();

        await Swal.fire({
            title: '¡Eliminado!',
            text: 'La solicitud ha sido eliminada correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    } catch (error) {
        await Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        btn.disabled = false;
        btn.style.opacity = '';
    }
});



// solicitudesVincuncular.js
document.getElementById('misAsociados').onclick = function () {

    document.getElementById('modalAsociadosUser').style.display = 'block';

};
// Cerrar modal
document.getElementById('cerrarModalAsociadosUser').onclick = function () {
    document.getElementById('modalAsociadosUser').style.display = 'none';
};
document.getElementById('cerrarModalAsociadosUserBtn').onclick = function () {
    document.getElementById('modalAsociadosUser').style.display = 'none';
};


const tableBodyUser = document.getElementById('solicitudes-list-body-user');


async function fetchMisAsociados(idEntidad) {
    console.log('id entidad', idEntidad);
    const userId = obtenerCookie("userId");

    try {
        const responseUser = await fetch('/api/usuarioempresa/empresa/' + idEntidad);
        console.log('Empresa', responseUser);
        if (!responseUser.ok) throw new Error('Error al obtener datos');
        const dataUser = await responseUser.json();

        renderTableUser(dataUser, userId);
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        tableBodyUser.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
    }


}

function renderTableUser(solicitudes, UserId) {
    console.log('solicitudes', solicitudes);
    console.log('UserId', UserId);
    if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
        tableBodyUser.innerHTML = '<tr><td colspan="4">No hay solicitudes vinculadas.</td></tr>';
        return;
    }
    tableBodyUser.innerHTML = solicitudes.map(solicitud => `
            <tr style="border-bottom:1px solid #e9ecef;">
         
            <td style="padding:12px 8px;font-weight:600;color:#2b2f3a;">
            ${solicitud.User ? solicitud.User.name : ''}
            </td>
            <td style="padding:12px 8px;color:#6c757d;">
            ${solicitud.User ? solicitud.User.email : ''}
            </td>
            <td style="padding:12px 8px;">
            ${solicitud.Cargo ? solicitud.Cargo.nombre : ''}
            </td>
            </tr>
        `).join('');

    // Agregar listeners para los botones toggle
    document.querySelectorAll('.toggle-estado-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
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