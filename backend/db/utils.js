import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function obtenerTresPalabrasAleatorias() {
  const rutaArchivo = path.join(__dirname, 'palabras.txt');
  const contenido = readFileSync(rutaArchivo, 'utf8');

  const palabras = contenido
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean);

  if (palabras.length < 3) {
    throw new Error('El archivo debe contener al menos 3 palabras');
  }

  const seleccionadas = [];
  const usadas = new Set();

  while (seleccionadas.length < 3) {
    const indice = Math.floor(Math.random() * palabras.length);
    const palabra = palabras[indice];
    if (!usadas.has(palabra)) {
      usadas.add(palabra);
      seleccionadas.push(palabra);
    }
  }
  return seleccionadas;
}
