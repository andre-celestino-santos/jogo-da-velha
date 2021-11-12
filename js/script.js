/* VARIAVEIS */
const popUp = document.querySelector('[data-popup]');
const mensagemPopUp = document.querySelector('[data-mensagem-popup]');
const botaoPopUpOk = document.querySelector('[data-botao-popup-ok]');

const formJogador = document.querySelector('[data-form-jogador]');
const inputNome = document.querySelector('[data-input-nome]');
const nomeJogadorAtual = document.querySelector('[data-nome-jogador-atual]');

const jogoDaVelha = document.querySelector('[data-jogo-da-velha]');
const tabelaMatriz = document.getElementById('table-matriz');
const celulas = tabelaMatriz.getElementsByTagName('td');
const botaoJogar = document.querySelector('[data-botao-jogar]');
const botaoParar = document.querySelector('[data-botao-parar]');

/* EVENTOS */
const eventoClickBotaoJogar = (evento) => {
    evento.preventDefault();

    formJogadorHide();

    criarJogador(inputNome.value);

    nomeJogadorAtual.innerText = "Boa sorte " + inputNome.value;

    botaoPararShow();

    adicionarEventoTabelaMatriz();

    const posicaoSorteada = sortearPosicaoTabelaMatriz();

    const celula = celulas[posicaoSorteada];

    preencherCelulaTabelaMatriz(celula, "O");
};

const eventoClickBotaoParar = (evento) => {
    evento.preventDefault();

    formJogadorShow();

    limparNomeJogadorAtual();

    botaoPararHide();

    removerEventoTabelaMatriz();

    limparInputNomeJogador();

    limparCelulasTabelaMatriz();
};

const eventoClickBotaoPopUpOk = (evento) => {
    jogoDaVelhaRelease();
    fecharPopup();
}

const eventoTabelaMatriz = (evento) => {
    const celula = evento.target;

    preencherCelulaTabelaMatriz(celula, "X");

    if (verificarVitoriaDoJogador("X")) {
        abrirPopUp(inputNome.value + " você ganhou! :)");
        guardarVitoriaDoJogador(inputNome.value);
        return;
    }

    let posicaoSorteada = sortearPosicaoTabelaMatriz();

    let celulaPc = celulas[posicaoSorteada];

    while (celulaPc.innerText != "") {
        posicaoSorteada = sortearPosicaoTabelaMatriz();
        celulaPc = celulas[posicaoSorteada];
    }

    preencherCelulaTabelaMatriz(celulaPc, "O");

    if (verificarVitoriaDoJogador("O")) {
        abrirPopUp(inputNome.value + " você perdeu! :(");
        guardarDerrotaJogador(inputNome.value);
        return;
    }

    if (verificarSeDeuVelha()) {
        abrirPopUp("Ninguem ganhou deu velha! :)")
    }

};

/* INICIO */
botaoJogar.addEventListener('click', eventoClickBotaoJogar);
botaoParar.addEventListener('click', eventoClickBotaoParar);
botaoPopUpOk.addEventListener('click', eventoClickBotaoPopUpOk);

limparCelulasTabelaMatriz();
fecharPopup();

/* FUNÇÕES */
function abrirPopUp(mensagem) {
    popUp.classList.remove("popup-hide");
    popUp.classList.add("popup-show");

    jogoDaVelhaLock();

    mensagemPopUp.innerText = mensagem;
}

function limparCelulasTabelaMatriz() {
    for (let i = 0; i < celulas.length; i++) {
        const celula = celulas[i];
        celula.innerText = "";
        celula.classList.remove("marcacao-jogador-X",
            "marcacao-jogador-O");
    }
}

function preencherCelulaTabelaMatriz(celula, texto) {
    if (celula.classList.length > 0) {
        throw new Error("Celula ja possui style");
    }

    if (texto == "X") {
        celula.classList.add("marcacao-jogador-X");
    } else if (texto == "O") {
        celula.classList.add("marcacao-jogador-O");
    }
    celula.innerText = texto;
}

function adicionarEventoTabelaMatriz() {
    for (let i = 0; i < celulas.length; i++) {
        const celula = celulas[i];
        celula.addEventListener('click', eventoTabelaMatriz);
    }
}

function sortearPosicaoTabelaMatriz() {
    return Math.floor(Math.random() * 9);
}

function removerEventoTabelaMatriz() {
    for (let i = 0; i < celulas.length; i++) {
        const celula = celulas[i];
        celula.innerHTML = "";
        celulas[i].removeEventListener('click', eventoTabelaMatriz);
    }
}

function limparInputNomeJogador() {
    inputNome.value = "";
}

function verificarVitoriaDoJogador(texto) {
    let primeiraPosicaoH = 0;
    let primeiraPosicaoD = 0;
    for (let i = 0; i < 3; i++) {
        // vertical
        if (celulas[i].innerText == texto) {
            const proximaPosicaoV = i + 3;
            const ultimaPosicaoV = proximaPosicaoV + 3;
            if (celulas[proximaPosicaoV].innerText == texto &&
                celulas[ultimaPosicaoV].innerText == texto) {
                return true;
            }
        }
        // horizontal
        primeiraPosicaoH = (i > 0 ? primeiraPosicaoH + 3 : 0);
        const proximaPosicaoH = primeiraPosicaoH + 1;
        const ultimaPosicaoH = proximaPosicaoH + 1;

        if (celulas[primeiraPosicaoH].innerText == texto &&
            celulas[proximaPosicaoH].innerText == texto &&
            celulas[ultimaPosicaoH].innerText == texto) {
            return true;
        }
        // diagonal
        if (i < 2) {
            primeiraPosicaoD = (i > 0 ? primeiraPosicaoD + 2 : 0);
            const proximaPosicaoD = primeiraPosicaoD == 0 ? primeiraPosicaoD + 4 : primeiraPosicaoD + 2;
            const ultimaPosicaoD = primeiraPosicaoD == 0 ? proximaPosicaoD + 4 : proximaPosicaoD + 2;

            if (celulas[primeiraPosicaoD].innerText == texto &&
                celulas[proximaPosicaoD].innerText == texto &&
                celulas[ultimaPosicaoD].innerText == texto) {
                return true;
            }
        }
    }
}

function verificarSeDeuVelha() {
    for (let i = 0; i < celulas.length; i++) {
        if (celulas[i].innerText == "") {
            return false;
        }
    }
    return true;
}

function fecharPopup() {
    popUp.classList.remove("popup-show");
    popUp.classList.add("popup-hide");
}

function jogoDaVelhaLock() {
    jogoDaVelha.classList.remove("box-jogo-da-velha-release");
    jogoDaVelha.classList.add("box-jogo-da-velha-lock");
}

function jogoDaVelhaRelease() {
    jogoDaVelha.classList.remove("box-jogo-da-velha-lock");
    jogoDaVelha.classList.add("box-jogo-da-velha-release");
}

function formJogadorHide() {
    formJogador.classList.remove("form-jogador-show");
    formJogador.classList.add("form-jogador-hide");
}

function formJogadorShow() {
    formJogador.classList.remove("form-jogador-hide");
    formJogador.classList.add("form-jogador-show");
}

function botaoPararShow() {
    botaoParar.classList.remove("botao-parar-hide");
    botaoParar.classList.add("botao-parar-show");
}

function botaoPararHide() {
    botaoParar.classList.remove("botao-parar-show");
    botaoParar.classList.add("botao-parar-hide");
}

function limparNomeJogadorAtual() {
    nomeJogadorAtual.innerText = "";
}

function criarJogador(nome) {
    console.log("Criando o jogador com nome", nome);
    if (buscarDadosJogador(nome) == null) {
        const jogador = {
            nome : nome,
            vitoria : 0,
            derrota : 0
        };
        guardarDadosJogador(jogador);
    }
}

function buscarDadosJogador(nome) {
    console.log("Buscando jogador com nome", nome);
    return window.localStorage.getItem(nome);
}

function guardarVitoriaDoJogador(nome) {
     const json = buscarDadosJogador(nome);
     console.log(json);
     const jogador = jsonParse(json);
     console.log(jogador);
     let somaVitoria = jogador.vitoria + 1;
     jogador.vitoria = somaVitoria;
     guardarDadosJogador(jogador);
}

function guardarDerrotaJogador(nome) {
    const json = buscarDadosJogador(nome);
    const jogador = jsonParse(json);
    let somaDerrota = jogador.derrota + 1;
    jogador.derrota = somaDerrota;
    guardarDadosJogador(jogador);
}

function guardarDadosJogador(jogador) {
    console.log("Guardando o jogador", jogador);
    window.localStorage.setItem(jogador.nome, JSON.stringify(jogador));
}

function jsonParse(json){
    return JSON.parse(json);
}