
    const socket = io(); // ⚠️ Ajusta si usas otro puerto
  socket.on('connect', () => {
    console.log('Conectado con id:', socket.id);
    // Emitir login o autenticación cada vez que se conecta
    socket.emit('login', userId);
  });

    // Recibir notificaciones
  socket.on('nuevaNotificacion', (data) => {
    console.log('🔔 Notificación recibida:', data);
    mostrarNotificacion(data.titulo, data.texto);
    const notificaciones = document.getElementById('notificaciones'); // Actualizar vista de notificaciones
    let numeroActual = parseInt(notificaciones.textContent, 10) || 0;
    notificaciones.textContent = numeroActual + 1;
  });
  // Mostrar notificación visual estilo "toast"
  function mostrarNotificacion(titulo, mensaje) {
    const noti = document.createElement('div');
    noti.classList.add('toast');
    noti.innerHTML = `<strong>${titulo}</strong><br>${mensaje}`;
    document.body.appendChild(noti);

    setTimeout(() => {
      noti.remove();
    }, 5000); // se borra después de 5 segundos
  }

// Escuchar evento de usuarios en línea
socket.on('usuariosEnLinea', (cantidad) => {
    mostrarUsuariosEnLinea(cantidad);
});

// Crear o actualizar el contador de usuarios en línea
function mostrarUsuariosEnLinea(cantidad) {
    let contador = document.getElementById('usuarios-en-linea');
    if (!contador) {
        contador = document.createElement('div');
        contador.id = 'usuarios-en-linea';
        contador.style.position = 'fixed';
        contador.style.bottom = '20px';
        contador.style.right = '20px';
        contador.style.background = 'rgba(0,0,0,0.7)';
        contador.style.color = '#fff';
        contador.style.padding = '10px 18px';
        contador.style.borderRadius = '8px';
        contador.style.zIndex = '9999';
        contador.style.fontSize = '16px';
        document.body.appendChild(contador);
    }
    contador.textContent = `Usuarios en línea: ${cantidad}`;
}