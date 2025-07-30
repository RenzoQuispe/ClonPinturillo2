# Clon del juego Pinturillo2
Clon del juego Pinturillo2 (https://www.pinturillo2.com/es/)

## Sobre el Juego

Pinturillo es un juego de dibujo online, en el que los jugadores deben adivinar palabras mediante los dibujos que realiza el artista en la pizarra. Con un tiempo limitado por ronda, los jugadores deberán escribir las palabras en el chat hasta acertar. Cuanto antes acierten, más puntos ganarán. Con el boton "!A JUGAR!" te unes a una partida publica.

<img src="./frontend/public/readme/inicio.png" width="800%">

  - Crear y unirse a salas privadas
  
    <img src="./frontend/public/readme/crear_sala.png" width="40%">
    <img src="./frontend/public/readme/unirse_sala.png" width="40%">

  - Juego

    <img src="./frontend/public/readme/juego1.png" width="60%">

  - Fin de Partida

    <img src="./frontend/public/readme/fin_partida.png" width="40%">

## Configuración

### Setup .env
Modificar frontend/.env - Ejemplo:

```
VITE_API_URL=http://192.168.1.10:5000
```
### Inicio rapido con Docker
```
git clone https://github.com/RenzoQuispe/ClonePinturillo2.git
cd ClonePinturillo2
docker-compose up --build
```

