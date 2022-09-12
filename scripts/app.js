//Variables
const btnAumentar = document.querySelector('#btnAumentar');
const btnDisminuir = document.querySelector('#btnDisminuir');
const contador = document.querySelector('#showContador');
let newContador = 0;

//EventListener

EventListeners();

function EventListeners() {
    //Evento para detectar los botonos
    // document.addEventListener('DOMContentLoaded', () => {});
    document.addEventListener('click', (e) => {
        contadorLogica(e);
    });
}

function contadorLogica(e) {
    //En el caso que toque el boton aumentar
    if (e.target.id == 'btnAumentar') {
        newContador++;
        valoresContador(newContador);
    } else if (e.target.id == 'btnDisminuir') {
        newContador--;
        valoresContador(newContador);
    }
    contador.textContent = newContador;
}

function valoresContador(valor) {
    if (valor >= 1) {
        contador.classList.add('positivo');
        contador.classList.remove('negativo');
        contador.classList.remove('neutral');
    } else if (valor < 0) {
        contador.classList.remove('positivo');
        contador.classList.add('negativo');
        contador.classList.remove('neutral');
    } else if (valor == 0) {
        contador.classList.add('neutral');
        contador.classList.remove('positivo');
        contador.classList.remove('negativo');
    }
}
