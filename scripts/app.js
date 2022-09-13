//Variables

//Botones
const btnAumentar = document.querySelector('#btnAumentar');
const btnDisminuir = document.querySelector('#btnDisminuir');
const btnReset = document.querySelector('#btnReset');
const btnCrono = document.querySelector('#btnCronometro');
const btnTemporizador = document.querySelector('#btnTemporizador');
const btnVuelta = document.querySelector('#btnVuelta');
const btnBorrarVuelta = document.querySelector('#btnBorrarVueltas');

//Variable del contador
const contador = document.querySelector('#showContador');

//Deshabilito el boton de marcar vueltas hasta que inicie el cronometro
btnVuelta.disabled = true;

//Contenedor de las vueltas y la lista
const vueltasContainer = document.querySelector('#vueltas');
const ul = document.createElement('ul');

//Variables varias
let numeroVuelta = 1;
let running = false;
let runningTemp = false;
let newContador = 0;
let id;
let temp;
let tempColor;
let vueltaValor = 0;
//EventListener

EventListeners();

function EventListeners() {
    //Evento para detectar los botonos
    document.addEventListener('DOMContentLoaded', () => {
        esteticaBtns();
        btnTempoFuncionalidad();
    });
    document.addEventListener('click', (e) => {
        contadorLogica(e);
    });

    btnVuelta.addEventListener('click', () => {
        vueltasCrono();
        vueltaValor = newContador;
    });

    btnBorrarVuelta.addEventListener('click', () => {
        borrarVueltas();
    });
}

//Funcion principal encargada de la logica
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
            btnVuelta.disabled = false;
        } else {
            running = false;
            clearInterval(id);
            restablecerCronometro();
            btnVuelta.disabled = true;
        }
    } else if (e.target.id == 'btnTemporizador') {
        if (!runningTemp) {
            if (newContador > 0) {
                temp = setInterval(() => {
                    temporizador();
                    if (newContador == 0) {
                        clearInterval(temp);
                        clearInterval(tempColor);
                        document.body.style.backgroundColor = 'white';
                        document.body.classList.remove('bodyColorNew');
                        restablecerTemporizador();
                        runningTemp = false;
                    }
                }, 1000);
                tempColor = setInterval(() => {
                    document.body.classList.toggle('bodyColorNew');
                }, 2000);
                runningTemp = true;
            }
        } else {
            runningTemp = false;
            clearInterval(temp);
            clearInterval(tempColor);
            restablecerTemporizador();
            document.body.style.backgroundColor = 'white';
            document.body.classList.remove('bodyColorNew');
            btnTemporizador.disabled = false;
        }
    }
    contador.textContent = newContador;
    esteticaBtns();
    btnTempoFuncionalidad();
}

//Funcion encargada de la estetica del contador
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

//Funcion encargada de deshabilitar el boton de cronometro
function esteticaBtns() {
    if (newContador < 0) {
        btnCrono.disabled = true;
    } else {
        btnCrono.disabled = false;
    }
}

const btnTempoFuncionalidad = () => {
    if (newContador <= 0 || running == true) {
        btnTemporizador.disabled = true;
    } else {
        btnTemporizador.disabled = false;
    }
};

//Funcion encargada de la funcionalidad del cronometro
const crono = () => {
    newContador++;
    btnCrono.textContent = 'Detener';
    btnCrono.classList.remove('btn-success');
    btnCrono.classList.add('btn-danger');
    contador.textContent = newContador;
    valoresContador(newContador);
};

const restablecerCronometro = () => {
    btnCrono.textContent = 'Iniciar cronometro';
    btnCrono.classList.remove('btn-danger');
    btnCrono.classList.add('btn-success');
};

const temporizador = () => {
    newContador--;
    btnTemporizador.textContent = 'Temporizador OK';
    btnTemporizador.classList.remove('btn-success');
    btnTemporizador.classList.add('btn-danger');
    contador.textContent = newContador;
    valoresContador(newContador);
};

const restablecerTemporizador = () => {
    btnTemporizador.textContent = 'Iniciar Temporizador';
    btnTemporizador.classList.remove('btn-danger');
    btnTemporizador.classList.add('btn-success');
};

//Funcion encargada de visualizar las vueltas del cronometro
function vueltasCrono() {
    const li = document.createElement('li');

    let diff = newContador - vueltaValor;
    if (numeroVuelta == 1) {
        diff = 0;
    }
    li.innerHTML = `Vuelta n°: ${numeroVuelta} - Valor: ${newContador} - Diferencia con vuelta anterior: ${diff}`;
    ul.appendChild(li);

    vueltasContainer.appendChild(ul);
    numeroVuelta += 1;
}

//Funcion encargada de borrar las vueltas
function borrarVueltas() {
    ul.innerHTML = ``;
    vueltaValor = 0;
    numeroVuelta = 1;
}
