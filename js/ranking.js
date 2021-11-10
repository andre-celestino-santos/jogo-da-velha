/* VARIAVEIS */
const dadosJogador = document.querySelector('[data-table]');
const listaJogadores = carregarListaDeJogadores();

/* INICIO */
for(let i=0; i<listaJogadores.length; i++){
    incluirJogadorNaTabela(listaJogadores[i]);
}

/* FUNCOES */
function carregarListaDeJogadores(){
    const listaJogadores = new Array();
    Object.keys(localStorage).forEach(function(key){
        const json = localStorage.getItem(key);
        const jogador = parseJson(json);
        listaJogadores.push(jogador);
     });
    return listaJogadores;
}

function incluirJogadorNaTabela(jogador){
    const linha = document.createElement("tr");
    const nome = document.createElement("td");
    nome.innerText = jogador.nome;
    const vitoria = document.createElement("td");
    vitoria.innerText = jogador.vitoria;
    const derrota = document.createElement("td");
    derrota.innerText = jogador.derrota;
    linha.appendChild(nome);
    linha.appendChild(vitoria);
    linha.appendChild(derrota);
    dadosJogador.appendChild(linha);
}

function parseJson(json){
    return JSON.parse(json);
}