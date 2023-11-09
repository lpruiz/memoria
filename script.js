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

  this.classList.add('virar');

  if (!virouCarta) {
    virouCarta = true;
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  verificarIgualdade();
}

function verificarIgualdade() {
  let saoIguais = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

  saoIguais ? desabilitarCartas() : desvirarCartas();
}

function desabilitarCartas() {
  primeiraCarta.classList.add('desabilitada');
  segundaCarta.classList.add('desabilitada');
  travaTabuleiro = true;

  setTimeout(() => {
    travaTabuleiro = false;
  }, 1000);
}

function desvirarCartas() {
  primeiraCarta.classList.remove('virar');
  segundaCarta.classList.remove('virar');
}

// Adiciona um evento de clique a cada carta
cartas.forEach(carta => {
  carta.addEventListener('click', virarCarta);
});
