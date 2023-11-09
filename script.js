const cartas = document.querySelectorAll('.carta');

let virouCarta = false;
let travaTabuleiro = false;
let primeiraCarta, segundaCarta;

function embaralharCartas() {
  cartas.forEach(carta => {
    const posicaoAleatoria = Math.floor(Math.random() * cartas.length);
    carta.style.order = posicaoAleatoria;
  });
}

embaralharCartas();

function virarCarta() {
  if (travaTabuleiro || this.classList.contains('desabilitada')) return;
  if (this === primeiraCarta) return;

  this.removeEventListener('click', virarCarta); // Prevent multiple clicks

  setTimeout(() => {
    this.classList.add('virar');

    if (!virouCarta) {
      virouCarta = true;
      primeiraCarta = this;
      return;
    }

    segundaCarta = this;
    verificarIgualdade();
  }, 50); // Reduce flipping delay
}

function verificarIgualdade() {
  let saoIguais = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

  saoIguais ? desabilitarCartas() : desvirarCartas();
}

function desabilitarCartas() {
  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);

  primeiraCarta.classList.add('desabilitada');
  segundaCarta.classList.add('desabilitada');

  resetarTabuleiro();
}

function desvirarCartas() {
  travaTabuleiro = true;

  setTimeout(() => {
    primeiraCarta.classList.remove('virar');
    segundaCarta.classList.remove('virar');

    primeiraCarta.addEventListener('click', virarCarta); // Reset click listeners
    segundaCarta.addEventListener('click', virarCarta);

    resetarTabuleiro();
  }, 1000);
}

function resetarTabuleiro() {
  [virouCarta, travaTabuleiro] = [false, false];
  [primeiraCarta, segundaCarta] = [null, null];

  cartas.forEach(carta => {
    carta.classList.remove('desabilitada');
    carta.addEventListener('click', virarCarta); // Reset click listeners
  });
}
