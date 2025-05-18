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
    id = Math.floor(100000 + Math.random() * 900000); // 6 dígitos únicos
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
    const mesaId = generarMesaId();
    socket.join(mesaId);
    salas[mesaId] = {
      codigo: roomCode,
      jugadores: [{ id: socket.id, username }],
    };
    console.log(`${username} creo la sala ${mesaId} con contraseña ${roomCode}`);
    console.log(JSON.stringify(salas, null, 2));
    socket.emit('sala_creada', { mesaId, roomCode });
  });



  /*
  // Unirse a sala
  socket.on("unirse_sala", ({ username, numMesa, codigoMesa }) => {
    const sala = salas[numMesa];
    if (!sala) return callback({ success: false, message: 'Sala no existe' });
    if (sala.codigo !== codigoMesa) return callback({ success: false, message: 'Código incorrecto' });

    const existeJugador = sala.jugadores.some(j => j.id === socket.id);
    if (!existeJugador) {
      sala.jugadores.push({ id: socket.id, username });
    }

    socket.join(numMesa);

    console.log(`${username} se unió a la sala ${numMesa}`);
    io.to(numMesa).emit("actualizar_jugadores", sala.jugadores);
  });

  socket.on('solicitar_jugadores', (numMesa) => {
    const sala = salas[numMesa];
    if (sala) {
      socket.emit('actualizar_jugadores', sala.jugadores);
    }
  });
  */
  

  
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
});

server.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});
