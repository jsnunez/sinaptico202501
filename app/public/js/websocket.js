
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