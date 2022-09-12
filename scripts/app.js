//Variables
const btnAumentar = document.querySelector('#btnAumentar');
const btnDisminuir = document.querySelector('#btnDisminuir');
const btnReset = document.querySelector('#btnReset');
const btnCrono = document.querySelector('#btnCronometro');
const contador = document.querySelector('#showContador');
let running = false;
let newContador = 0;
let id;
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
    } else if (e.target.id == 'btnReset') {
        newContador = 0;
        valoresContador(newContador);
    } else if (e.target.id == 'btnCronometro') {
        if (!running) {
            id = setInterval(() => {
                crono();
            }, 1000);

            running = true;
        } else {
            running = false;
            clearInterval(id);
            btnCrono.textContent = 'Iniciar cronometro';
        }
    }
    contador.textContent = newContador;
    esteticaBtns();
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

function esteticaBtns() {
    if (newContador < 0) {
        btnCrono.disabled = true;
    } else {
        btnCrono.disabled = false;
    }

    if (running) {
        btnAumentar.disabled = true;
        btnDisminuir.disabled = true;
        btnReset.disabled = true;
    } else {
        btnAumentar.disabled = false;
        btnDisminuir.disabled = false;
        btnReset.disabled = false;
    }
}

const crono = () => {
    newContador++;
    btnCrono.textContent = 'Detener';
    contador.textContent = newContador;
    valoresContador(newContador);
};
