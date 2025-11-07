
const userIdNotify = obtenerCookie("userId");

// Conectar socket y escuchar notificaciones al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    
  // Mostrar contador de notificaciones pendientes
async function actualizarContadorNotificaciones() {
  console.log('Actualizando contador de notificaciones...');

  if (!userIdNotify) return;
  const res = await fetch(`/api/invitacion/${userIdNotify}`);
  const data = await res.json();
  // Solo cuenta las no verificadas
  console.log(data);
  const pendientes = data.filter(n => !n.verificado).length;
  const icono = document.getElementById('icono-notif');
  icono.innerHTML = `🔔 <span id="notificaciones" style='background:red;color:white;border-radius:50%;padding:2px 7px;font-size:0.9em;'>${pendientes}</span>`;
}

// Modificar verNotificaciones para mostrar detalles
async function verNotificaciones() {
  const id = document.getElementById('notif-id').value;
  if (!id) return;
  const res = await fetch(api + '/notificaciones/' + id);
  const data = await res.json();
  const div = document.getElementById('notificaciones');
  if (data.length === 0) {
    div.innerHTML = '<em>No hay notificaciones</em>';
  } else {
    div.innerHTML = data.map(n => `<div><b>De:</b> ${n.de} <b>Mensaje:</b> ${n.mensaje} <b>Tel:</b> ${n.telefono} <b>${n.verificado ? "<span class='verificado'>(Verificado)</span>" : ''}</b></div>`).join('');
  }
  actualizarContadorNotificaciones();
}
// Mostrar/ocultar notificaciones al hacer click en la campana
const iconoNotif = document.getElementById('icono-notif');
iconoNotif.style.position = 'relative';
let notificacionesVisibles = false;
iconoNotif.onclick = async function() {
    if (!userIdNotify) return;
    notificacionesVisibles = !notificacionesVisibles;
    const div = document.getElementById('notificaciones');
    if (notificacionesVisibles) {
        // Mostrar solo invitaciones NO verificadas
        const res = await fetch(`/api/invitacion/${userIdNotify}`);
        const data = await res.json();
        console.log(data);
        const noVerificadas = data.filter(n => !n.verificado);
        if (noVerificadas.length === 0) {
            div.innerHTML = '<em>No hay notificaciones</em>';
        } else {
            div.innerHTML = noVerificadas.map(n => `
                      <div id="notif-div-${n.desdeuserid}" style='color:#333; background:#f8f9fa;padding:12px;margin:8px;border:2px solid var(--primary-color);border-radius:8px;box-shadow:0 2px 4px rgba(0,123,255,0.1);'>
                        <div style="margin-bottom:8px;">
                        <b style="color:var(--primary-color);">De:</b> <span style="color:color:#666;";">${n.desdeUser.name}</span>
                        </div>
                        <div style="margin-bottom:10px;">
                        <b style="color:var(--primary-color);">Mensaje:</b> <span style="color:#666;">${n.mensaje}</span>
                        </div>
                        <div style="display:flex;gap:8px;justify-content:flex-end;">
                        <button class="filter-btn" style="background-color:#28a745;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.9em;" onclick="aceptarInvitacion(${n.desdeuserid})">
                          <i class="bi bi-check-circle"></i> Aceptar
                        </button>
                        <button class="filter-btn" style="background-color:#dc3545;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:0.9em;" onclick="rechazarInvitacion(${n.desdeuserid})">
                          <i class="bi bi-x-circle"></i> Rechazar
                        </button>
                        </div>
                        <span id="verif-${n.de}" style="display:none;"></span>
                        <span id="tel-${n.de}" style="display:none;"></span>
                      </div>
                      `).join('');
        }
        // Mostrar como popup flotante bajo el icono
        div.style.display = 'block';
        div.style.position = 'absolute';
        div.style.top = '35px';
        div.style.right = '0px';
        div.style.minWidth = '320px';
        div.style.maxWidth = '400px';
        div.style.background = '#fff';
        div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        div.style.borderRadius = '8px';
        div.style.zIndex = '2000';
    } else {
        div.style.display = 'none';
    }
};

window.aceptarInvitacion = async function(de) {
  const res = await fetch(`${API_BASE_URL}/api/invitacion/verificar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ de, para: userIdNotify })
  });
  // Enviar solicitud para compartir información
  await fetch(`${API_BASE_URL}/api/contactar/compartir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ de: userIdNotify, para: de })
  });
  const data = await res.json();
  if (data.ok) {
    // Eliminar la notificación visualmente
    const notifDiv = document.getElementById('notif-div-' + de);
    if (notifDiv) notifDiv.remove();
    actualizarContadorNotificaciones();
    // Agregar a la lista de personas que me han enviado solicitudes
    agregarPersonaSolicitante(de);
  }
};

window.rechazarInvitacion = async function(de) {
  const res = await fetch(`${API_BASE_URL}/api/invitacion/rechazar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ de, para: userIdNotify })
  });
  const data = await res.json();
  if (data.ok) {
    // Eliminar la notificación visualmente
    const notifDiv = document.getElementById('notif-div-' + de);
    if (notifDiv) notifDiv.remove();
    actualizarContadorNotificaciones();
  }
};

// Al cargar la página, ocultar el div de notificaciones
window.onload = function() {
    document.getElementById('notificaciones').style.display = 'none';
};
actualizarContadorNotificaciones();
})

