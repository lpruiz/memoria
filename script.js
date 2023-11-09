const cartas = document.querySelectorAll('.carta');

let virouCarta = false;
let travaTabuleiro = false;
let primeiraCarta, segundaCarta;

function virarCarta() {
    if (travaTabuleiro) return;
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
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetarTabuleiro();
}

function desvirarCartas() {
    travaTabuleiro = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('virar');
        segundaCarta.classList.remove('virar');

        resetarTabuleiro();
    }, 1000);
}

function resetarTabuleiro() {
    [virouCarta, travaTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

cartas.forEach(carta => carta.addEventListener('click', virarCarta));
