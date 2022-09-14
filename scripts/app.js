//Variables

//input
const horaInput = document.querySelector('#horas');
const minutosInput = document.querySelector('#minutos');
const segundosInput = document.querySelector('#segundos');

//Contenedores

const tiempoSeccion = document.querySelector('#tiempoSeccion');
const contadorSeccion = document.querySelector('#contadorSeccion');

//Botones
const btnAumentar = document.querySelector('#btnAumentar');
const btnDisminuir = document.querySelector('#btnDisminuir');
const btnReset = document.querySelector('#btnReset');
const btnCrono = document.querySelector('#btnCronometro');
const btnTemporizador = document.querySelector('#btnTemporizador');
const btnVuelta = document.querySelector('#btnVuelta');
const btnBorrarVuelta = document.querySelector('#btnBorrarVueltas');
const radioContador = document.querySelector('#radioContador');
const radioTiempo = document.querySelector('#radioTiempo');

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
let runnigTiempo = false;
let newContador = 0;
let id;
let temp;
let tempColor;
let vueltaValor = 0;
let modo = 'contador';
let horas;
let minutos;
let segundos;
let intervalTiempo;
let newHora;
let newMinuto;
let newSegundo;

//EventListener

EventListeners();

function EventListeners() {
    //Evento para detectar los botonos
    document.addEventListener('DOMContentLoaded', () => {
        esteticaBtns();
        btnTempoFuncionalidad();
    });
    document.addEventListener('click', (e) => {
        Logica(e);
    });

    btnVuelta.addEventListener('click', () => {
        if (modo == 'contador') {
            vueltasCrono();
            vueltaValor = newContador;
        } else {
            vueltasTiempo();
        }
    });

    btnBorrarVuelta.addEventListener('click', () => {
        borrarVueltas();
    });

    radioTiempo.addEventListener('click', () => {
        if (radioTiempo.checked) {
            modo = 'tiempo';
            btnVuelta.disabled = false;
            cargarModo();
        }
    });
    radioContador.addEventListener('click', () => {
        if (radioContador.checked) {
            modo = 'contador';
            cargarModo();
        }
    });
}

//Funcion principal encargada de la logica
function Logica(e) {
    //En el caso que toque el boton aumentar
    if (modo == 'contador') {
        btnTemporizador.textContent = 'Iniciar Temporizador';
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
    } else {
        btnTemporizador.textContent = 'Iniciar Tiempo';
        btnTemporizador.disabled = false;
        if (e.target.id == 'btnTemporizador') {
            if (!runnigTiempo) {
                empezarTiempo();
                btnTemporizador.textContent = 'Finalizar Tiempo';
                btnTemporizador.classList.remove('btn-success');
                btnTemporizador.classList.add('btn-danger');
                runnigTiempo = true;
            } else {
                runnigTiempo = false;
                clearInterval(intervalTiempo);
                valoresTiempo();
                btnTemporizador.textContent = 'Iniciar tiempo';
                btnTemporizador.classList.add('btn-success');
                btnTemporizador.classList.remove('btn-danger');
            }
        }
    }
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
    li.innerHTML = `
        Vuelta n°: ${numeroVuelta} - Valor: ${newContador} - Diferencia con vuelta anterior: ${diff}
        <input type="text" class="notaVuelta"  placeholder="Ingrese una nota"/>
    `;

    ul.appendChild(li);

    vueltasContainer.appendChild(ul);
    li.addEventListener('mouseover', (e) => {
        agregarNota(e);
    });
    li.addEventListener('mouseleave', (e) => {
        desaparecerNota(e);
    });
    numeroVuelta += 1;
}

function vueltasTiempo() {
    const li = document.createElement('li');

    let diff;
    if (numeroVuelta == 1) {
        newHora = horas;
        newMinuto = minutos;
        newSegundo = segundos;
        diff = 0;
    } else {
        diff = `${
            newHora - horas > 9 ? newHora - horas : '0' + (newHora - horas)
        }:${
            newMinuto - minutos > 9
                ? newMinuto - minutos
                : '0' + (newMinuto - minutos)
        }:${
            newSegundo - segundos > 9
                ? newSegundo - segundos
                : '0' + (newSegundo - segundos)
        }`;
        newHora = horas;
        newMinuto = minutos;
        newSegundo = segundos;
        console.log(newSegundo);
    }
    li.innerHTML = `
        Vuelta n°: ${numeroVuelta} - Valor: ${horas}:${minutos}:${segundos} - Diferencia con vuelta anterior: ${diff}
        <input type="text" class="notaVuelta"  placeholder="Ingrese una nota"/>
    `;

    ul.appendChild(li);

    vueltasContainer.appendChild(ul);
    li.addEventListener('mouseover', (e) => {
        agregarNota(e);
    });
    li.addEventListener('mouseleave', (e) => {
        desaparecerNota(e);
    });
    numeroVuelta += 1;
}

//Funcion encargada de borrar las vueltas
function borrarVueltas() {
    ul.innerHTML = ``;
    vueltaValor = 0;
    numeroVuelta = 1;
}

function agregarNota(e) {
    const input = e.target.childNodes[1];
    if (input == undefined) {
        return;
    }
    input.style.display = 'block';
    input.readonly = false;
}

function desaparecerNota(e) {
    const input = e.target.childNodes[1];
    if (input == undefined) {
        return;
    }
    input.style.display = 'none';
    input.readonly = true;
}

function cargarModo() {
    if (modo == 'contador') {
        contadorSeccion.style.display = 'block';
        tiempoSeccion.style.display = 'none';
    } else if (modo == 'tiempo') {
        tiempoSeccion.style.display = 'block';
        contadorSeccion.style.display = 'none';
    }
}

function valoresTiempo() {
    horas = Number(horaInput.value);
    minutos = Number(minutosInput.value);
    segundos = Number(segundosInput.value);
}

function cambiarTiempo() {
    horaInput.value = horas > 9 ? horas : '0' + horas;
    minutosInput.value = minutos > 9 ? minutos : '0' + minutos;
    segundosInput.value = segundos > 9 ? segundos : '0' + segundos;
}

function run() {
    if (segundos > 0) {
        segundos--;
    } else {
        if (minutos > 0) {
            segundos = 59;
            minutos = 59;
        } else {
            if (horas > 0) {
                segundos = 59;
                minutos = 59;
                horas--;
            }
        }
    }
    cambiarTiempo();
}

function empezarConteo() {
    intervalTiempo = setInterval(run, 1000);
}

function empezarTiempo() {
    valoresTiempo();
    cambiarTiempo();
    empezarConteo();
}
