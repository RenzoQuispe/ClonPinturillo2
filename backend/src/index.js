import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const salas = {};

function generarMesaId() {
  let id;
  do {
    id = Math.floor(100000 + Math.random() * 900000);
  } while (salas[id]);
  return id;
}

io.on("connection", (socket) => {

  console.log('Usuario conectado:', socket.id);

  // Verificar existencia de sala
  socket.on("verificar_sala", (numMesa) => {
    if (!salas[numMesa]) {
      socket.emit("sala_eliminada");
    }
  });

  // Crear sala
  socket.on("crear_sala", ({ username, roomCode }) => {
    const mesaId = generarMesaId().toString();
    salas[mesaId] = {
      codigo: roomCode,
      jugadores: [{ id: socket.id, username }],
    };
    socket.join(mesaId);
    console.log(`${username} creo la sala ${mesaId} con contraseña ${roomCode}`);
    console.log(JSON.stringify(salas, null, 2));
    const sala = salas[mesaId];
    io.to(mesaId).emit("actualizar_jugadores", sala.jugadores);
    socket.emit('sala_creada', { mesaId, roomCode });
  });

  // Unirse a sala
  socket.on("unirse_sala", ({ username, numMesa, codigoMesa }, callback) => {
    const sala = salas[numMesa];
    if (!sala) return callback({ success: false, message: 'Sala no existe' });
    if (sala.codigo !== codigoMesa) return callback({ success: false, message: 'Código incorrecto' });

    const existeJugador = sala.jugadores.some(j => j.id === socket.id);
    if (!existeJugador) {
      sala.jugadores.push({ id: socket.id, username });
      console.log(`${username} se unió a la sala ${numMesa}`);
    }

    socket.join(numMesa);
    io.to(numMesa).emit("actualizar_jugadores", sala.jugadores);

    return callback({ success: true });
  });
  // Lista de jugadores en Mesa.jsx
  socket.on("solicitar_jugadores", (numMesa) => {
    const sala = salas[numMesa];
    console.log(`Jugadores Solicitados y emitidos por ${socket.id}: `, sala.jugadores)
    io.to(numMesa).emit("actualizar_jugadores", sala.jugadores);
  });
  // Para el chat en tiempo real
  socket.on("enviar_mensaje", ({ numMesa, mensaje }) => {
    io.to(numMesa).emit("nuevo_mensaje", mensaje);
  });

  // Desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
    for (const mesaId in salas) {
      const sala = salas[mesaId];
      const index = sala.jugadores.findIndex(j => j.id === socket.id);
      if (index !== -1) {
        const jugador = sala.jugadores[index];
        sala.jugadores.splice(index, 1);
        console.log(`${jugador.username} salió de la sala ${mesaId}`);
        if (sala.jugadores.length === 0) {
          // Notificar que la sala fue eliminada
          io.to(mesaId).emit("sala_eliminada");
          delete salas[mesaId];
          console.log(`Sala ${mesaId} eliminada por estar vacía`);
        } else {
          io.to(mesaId).emit("actualizar_jugadores", sala.jugadores);
        }
        break;
      }
    }
  });
  // Debug socket-sala
  socket.on("debug_sala", async (mesaId) => {
    const sockets = await io.in(mesaId).fetchSockets();
    console.log(`Clientes en la sala ${mesaId}:`);
    sockets.forEach(s => {
      console.log(`- ID: ${s.id}`);
      console.log(`Rooms de este socket:`, [...s.rooms]);
    });
  });

});

server.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});
