import socket from "./socket";

function crearSala(username, roomCode) {
    return new Promise((resolve, reject) => {
        // Emitimos la solicitud de creación de sala
        socket.emit("crear_sala", { username, roomCode });

        // Esperamos la respuesta del servidor
        socket.once("sala_creada", ({ mesaId, roomCode }) => {
            resolve({ mesaId, roomCode });
        });

        // Opcional: puedes agregar un timeout en caso de que no haya respuesta
        setTimeout(() => {
            reject(new Error("No se recibió respuesta del servidor al crear la sala"));
        }, 5000);
    });
}
export default crearSala;