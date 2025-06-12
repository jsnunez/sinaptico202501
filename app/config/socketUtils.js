// socketUtils.js

let io = null;
const userSockets = {};

// Inicializar con la instancia de io (se llama desde server.js)
function initSocketIO(serverIo) {
  io = serverIo;

  io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('login', (userId) => {
      console.log(`Usuario ${userId} conectado con socket ${socket.id}`);
      userSockets[userId] = socket;
    });

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
      for (const id in userSockets) {
        if (userSockets[id] === socket) {
          delete userSockets[id];
        }
      }
    });
  });
}

// Función para enviar notificación a un usuario
function enviarNotificacion(userId, mensaje) {
  const socket = userSockets[userId];
  if (socket) {
    socket.emit('nuevaNotificacion', mensaje);
    console.log(`Notificación enviada a ${userId}`);
  } else {
    console.log(`Usuario ${userId} no está conectado`);
  }
}

export { initSocketIO, enviarNotificacion };
