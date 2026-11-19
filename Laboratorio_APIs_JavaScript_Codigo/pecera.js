// Pregunta 1. El lado x indica cuántas filas y columnas tiene el tablero.
function crearPecera(x) {
  if (!Number.isInteger(x) || x < 1 || x > 24) {
    throw new RangeError('El lado debe ser un entero entre 1 y 24.');
  }

  const celdas = document.createDocumentFragment();
  for (let fila = 0; fila < x; fila++) {
    for (let columna = 0; columna < x; columna++) {
      const celda = document.createElement('div');
      celda.className = 'celda';
      celdas.append(celda);
    }
  }

  const tablero = document.getElementById('tablero');
  tablero.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  tablero.style.gridTemplateRows = `repeat(${x}, 1fr)`;
  tablero.replaceChildren(celdas);
  document.getElementById('medidas').textContent = `${x} × ${x} · ${x * x} celdas`;
}

const lado = document.getElementById('lado');
crearPecera(lado.valueAsNumber);
document.getElementById('dimensiones').addEventListener('submit', (evento) => {
  evento.preventDefault();
  crearPecera(lado.valueAsNumber);
});

// Pregunta 2. Nemo comparte su conteo por origen. Dory lo guarda en su pestaña.
const peces = {
  nemo: { nombre: 'Nemo', memoria: localStorage, clave: 'pecera.nemo' },
  dory: { nombre: 'Dory', memoria: sessionStorage, clave: 'pecera.dory' }
};

function leerConteo(pez) {
  const valor = Number(pez.memoria.getItem(pez.clave) ?? '0');
  return Number.isSafeInteger(valor) && valor >= 0 ? valor : 0;
}

function mostrarConteo(id) {
  document.getElementById(`contador-${id}`).textContent = leerConteo(peces[id]);
}

function sumarPez(id) {
  const pez = peces[id];
  pez.memoria.setItem(pez.clave, String(leerConteo(pez) + 1));
  mostrarConteo(id);
}

const zonas = document.querySelectorAll('.pez');
zonas.forEach((zona) => {
  const id = zona.dataset.pez;
  mostrarConteo(id);
  zona.querySelector('.sumar').addEventListener('click', () => sumarPez(id));
});

// Las otras pestañas reciben el evento storage cuando cambia el conteo de Nemo.
window.addEventListener('storage', (evento) => {
  if (evento.storageArea === localStorage &&
      (evento.key === peces.nemo.clave || evento.key === null)) {
    mostrarConteo('nemo');
  }
});

// El agua empieza de nuevo al recargar. El tono HSL cambia de 199° a 145°.
const pecera = document.querySelector('.pecera');
const estadoAgua = document.getElementById('estado-agua');
const inicio = performance.now();

function actualizarAgua() {
  const segundos = Math.floor((performance.now() - inicio) / 1000);
  const progreso = Math.min(segundos / 12, 1);
  pecera.style.setProperty('--agua', `hsl(${199 - 54 * progreso} 79% 86%)`);
  estadoAgua.textContent = `${segundos} s · ${segundos === 0 ? 'Azul claro' : progreso === 1 ? 'Verde' : 'En transición'}`;
}

actualizarAgua();
setInterval(actualizarAgua, 1000);
document.getElementById('limpiar').addEventListener('click', () => location.reload());

// Pregunta 3. El color de la burbuja determina su destino.
const bandeja = document.getElementById('burbujas');
const mensaje = document.getElementById('mensaje');
const destinos = Object.keys(peces);
const tipoArrastre = 'application/x-pecera-burbuja';
let numeroBurbuja = 0;

function crearBurbuja() {
  const destino = destinos[numeroBurbuja % destinos.length];
  numeroBurbuja++;
  const burbuja = document.createElement('div');
  burbuja.id = `burbuja-${numeroBurbuja}`;
  burbuja.className = `burbuja ${destino}`;
  burbuja.dataset.destino = destino;
  burbuja.setAttribute('role', 'img');
  burbuja.setAttribute('aria-label', `Burbuja para ${peces[destino].nombre}`);
  burbuja.draggable = true;

  burbuja.addEventListener('dragstart', (evento) => {
    evento.dataTransfer.setData(tipoArrastre, burbuja.id);
    evento.dataTransfer.effectAllowed = 'move';
    burbuja.classList.add('arrastrando');
  });

  burbuja.addEventListener('dragend', (evento) => {
    burbuja.classList.remove('arrastrando');
    if (evento.dataTransfer.dropEffect === 'none') {
      mensaje.textContent = 'Fuera de las zonas. La burbuja vuelve a su lugar.';
    }
  });

  bandeja.append(burbuja);
}

zonas.forEach((zona) => {
  zona.addEventListener('dragover', (evento) => {
    if (evento.dataTransfer.types.includes(tipoArrastre)) {
      evento.preventDefault();
      evento.dataTransfer.dropEffect = 'move';
    }
  });

  zona.addEventListener('drop', (evento) => {
    const idBurbuja = evento.dataTransfer.getData(tipoArrastre);
    if (!idBurbuja) return;
    evento.preventDefault();

    const burbuja = document.getElementById(idBurbuja);
    if (!bandeja.contains(burbuja)) return;

    const destino = zona.dataset.pez;
    if (burbuja.dataset.destino !== destino) {
      mensaje.textContent = `Destino incorrecto. La burbuja sigue en su lugar (${peces[burbuja.dataset.destino].nombre}).`;
      return;
    }

    sumarPez(destino);
    burbuja.remove();
    mensaje.textContent = `Burbuja recibida por ${peces[destino].nombre}. Su conteo aumentó en 1.`;
  });
});

setInterval(crearBurbuja, 2000);
