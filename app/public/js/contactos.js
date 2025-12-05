
async function cargarContactos(userId) {
    try {
        const res = await fetch(`/api/invitacion/mis-contactos/${userId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const lista = [...(data.recibidos || []), ...(data.enviados || [])];

        const cargoCache = new Map();
        const getCargoNombre = async (id) => {
            if (!id) return 'Sin asignar';
            if (cargoCache.has(id)) return cargoCache.get(id);
            try {
                const r = await fetch(`/api/cargos/${id}`);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const d = await r.json();
                const nombre = d?.nombre ?? 'N/A';
                cargoCache.set(id, nombre);
                return nombre;
            } catch {
                return 'N/A';
            }
        };

        const pickCargoId = (c) =>
            c?.cargoId ?? c?.empresa?.cargoId ?? c?.empresaCargoId ?? c?.User?.cargoId ?? null;

        for (const contacto of lista) {
            contacto._cargoNombre = await getCargoNombre(pickCargoId(contacto));
        }

        listaContactos = lista;
        llenarFiltros(listaContactos);
        aplicarFiltros(); // Render inicial con todos los contactos
    } catch (err) {
        console.error(err);
        document.getElementById('tablaContactosVerificados').innerHTML =
            '<tr><td colspan="5" style="text-align:center;color:#b00;">Error al cargar contactos</td></tr>';
    }
}

// === EVENTOS ===

// Abrir modal y cargar contactos
document.getElementById('misContactos').addEventListener('click', async () => {
    const modal = document.getElementById('modalMisContactos');
    modal.style.display = 'block';
    await cargarContactos(userIdNotify, 'tablaContactosVerificados');
});

// Cerrar modal
['cerrarModalMisContactos', 'cerrarModalMisContactosBtn'].forEach(id => {
    document.getElementById(id).onclick = () => {
        document.getElementById('modalMisContactos').style.display = 'none';
    };
});

// Cerrar modal
['cerrarModalBtn'].forEach(id => {
    document.getElementById(id).onclick = () => {
        document.getElementById('myModalAsignarServicio').style.display = 'none';
    };
});

// Toggle entre contactos verificados y en espera
document.getElementById('btnContactosVerificados').onclick = async function () {

    document.getElementById('tablaVerificados').style.display = 'block';
    document.getElementById('contact-controls').style.display = 'flex';
    document.getElementById('contact-controls-espera').style.display = 'none';
    document.getElementById('tablaEspera').style.display = 'none';
    this.classList.add('active');
    document.getElementById('btnContactosEspera').classList.remove('active');
    await cargarContactos(userIdNotify, 'tablaContactosVerificados');
};


document.getElementById('btnContactosEspera').onclick = function () {
    document.getElementById('contact-controls').style.display = 'none';
    document.getElementById('contact-controls-espera').style.display = 'flex';
    document.getElementById('tablaVerificados').style.display = 'none';
    document.getElementById('tablaEspera').style.display = 'block';
    this.classList.add('active');
    document.getElementById('btnContactosVerificados').classList.remove('active');

    // Cargar contactos en espera
    fetch(`/api/invitacion/mis-contactos-pendientes/${userIdNotify}`)
        .then(res => res.json())
        .then(async data => {
            const tbody = document.getElementById('tablaContactosEspera');
            tbody.innerHTML = '';

            // ==== Función para obtener nombre del cargo ====
            const cargoCache = new Map();
            const getCargoNombre = async (id) => {
                if (!id) return 'Sin asignar';
                if (cargoCache.has(id)) return cargoCache.get(id);
                try {
                    const r = await fetch(`/api/cargos/${id}`);
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    const d = await r.json();
                    const nombre = d?.nombre ?? 'Sin asignar';
                    cargoCache.set(id, nombre);
                    return nombre;
                } catch {
                    return 'Sin asignar';
                }
            };

            // ==== Unificamos listas ====
            listaContactosEspera = [];

            if (data.recibidos && Array.isArray(data.recibidos)) {
                for (const c of data.recibidos) {
                    const cargoNombre = await getCargoNombre(c.cargoId ?? c.User?.cargoId ?? null);
                    listaContactosEspera.push({ ...c, estado: 'recibido', _cargoNombre: cargoNombre });
                }
            }

            if (data.enviados && Array.isArray(data.enviados)) {
                for (const c of data.enviados) {
                    const cargoNombre = await getCargoNombre(c.cargoId ?? c.User?.cargoId ?? null);
                    listaContactosEspera.push({ ...c, estado: 'enviado', _cargoNombre: cargoNombre });
                }
            }

            // ==== Llenar filtros ====
            llenarFiltrosEspera(listaContactosEspera);
            aplicarFiltrosEspera();


            // ==== Funciones de acción ====
            window.aceptarInvitacion = async function (invitacionId) {
                try {
                    const res = await fetch(`/api/invitacion/${invitacionId}/verificar`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const data = await res.json();
                    if (data.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Invitación aceptada',
                            text: 'El contacto ha sido agregado exitosamente',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        document.getElementById('btnContactosEspera').click();
                    } else throw new Error(data.message || 'Error al aceptar invitación');
                } catch (error) {
                    Swal.fire({ icon: 'error', title: 'Error', text: error.message });
                }
            };

            window.rechazarInvitacion = async function (invitacionId) {
                try {
                    const res = await fetch(`/api/invitacion/${invitacionId}/rechazar`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const data = await res.json();
                    if (data.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Invitación cancelada',
                            text: 'La invitación ha sido rechazada',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        document.getElementById('btnContactosEspera').click();
                    } else throw new Error(data.message || 'Error al rechazar invitación');
                } catch (error) {
                    Swal.fire({ icon: 'error', title: 'Error', text: error.message });
                }
            };
        })
        .catch(err => {
            console.error(err);
            document.getElementById('tablaContactosEspera').innerHTML =
                '<tr><td colspan="5" style="text-align:center;color:#b00;">Error al cargar contactos en espera</td></tr>';
        });

};
document.getElementById('cerrarModalMisContactos').onclick = function () {
    document.getElementById('modalMisContactos').style.display = 'none';
};
document.getElementById('cerrarModalMisContactosBtn').onclick = function () {
    document.getElementById('modalMisContactos').style.display = 'none';
}
