let cartelas = [];

let numerosSorteados = [];

let intervaloNumeros;

function gerarCartela() {
    let nomeJogador = prompt("Qual o nome do jogador?");
    if (!nomeJogador) return;

    let numeros = [];
    let numerosGerados = [];
    for (let i = 0; i < 5; i++) {
        numeros[i] = [];
        for (let j = 0; j < 5; j++) {
            let numero;
            do {
                numero = Math.floor(Math.random() * 15) + 1 + (j * 15);
            } while (numerosGerados.includes(numero));
            numeros[i][j] = numero;
            numerosGerados.push(numero);
        }
    }

    cartelas.push({ nome: nomeJogador, numeros: numeros });
    atualizarCartelas();
}


function atualizarCartelas() {
    let areaCartelas = document.querySelector(".cartelas");
    areaCartelas.innerHTML = "";

    for (let cartela of cartelas) {
        let divCartela = document.createElement("div");
        divCartela.classList.add("cartela");

        let h3Nome = document.createElement("h3");
        h3Nome.textContent = cartela.nome;
        divCartela.appendChild(h3Nome);

        let tabela = document.createElement("table");
        let thead = document.createElement("thead");
        let trHead = document.createElement("tr");
        let ths = ["B", "I", "N", "G", "O"];
        for (let thText of ths) {
            let th = document.createElement("th");
            th.textContent = thText;
            trHead.appendChild(th);
        }
        thead.appendChild(trHead);
        tabela.appendChild(thead);

        for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 5; j++) {
                let td = document.createElement("td");
                td.textContent = cartela.numeros[i][j];
                if (numerosSorteados.includes(cartela.numeros[i][j])) {
                    td.classList.add("marcado");
                }
                tr.appendChild(td);
            }
            tabela.appendChild(tr);
        }

        divCartela.appendChild(tabela);
        areaCartelas.appendChild(divCartela);
    }
}

function comecarJogo() {
    if (cartelas.length === 0) {
        alert("Adicione pelo menos um jogador antes de começar o jogo.");
        return;
    }

    intervaloNumeros = setInterval(sortearNumero, 1000);
}

function sortearNumero() {
    if (numerosSorteados.length === 75) {
        clearInterval(intervaloNumeros);
        return;
    }

    let numero;
    do {
        numero = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numero));
    numerosSorteados.push(numero);

    atualizarNumerosSorteados();

    atualizarCartelas();

    verificarVencedor();
}

function atualizarNumerosSorteados() {
    let areaNumeros = document.querySelector("#area_numeros");
    
    if(numerosSorteados.length === 1){
      let divNumerosSorteados = document.createElement("div");
      divNumerosSorteados.id="numeros_sorteado";
      areaNumeros.insertBefore(divNumerosSorteados, areaNumeros.children[1]);
      
      let divNumero = document.createElement("div");
      divNumero.classList.add("numero_sorteado");
      divNumero.textContent = numerosSorteados[numerosSorteados.length - 1];
      divNumerosSorteados.appendChild(divNumero);
    }else{
      let divNumerosSorteados = document.querySelector("#numeros_sorteado");
      let divNumero = document.createElement("div");
      divNumero.classList.add("numero_sorteado");
      divNumero.textContent = numerosSorteados[numerosSorteados.length - 1];
      divNumerosSorteados.appendChild(divNumero);
    }
}

function verificarVencedor() {
    let vencedores = [];

    for (let cartela of cartelas) {
        let numerosCartela = cartela.numeros.flat();
        if (numerosCartela.every(numero => numerosSorteados.includes(numero))) {
            vencedores.push(cartela.nome);
        }
    }

    if (vencedores.length > 0) {
        clearInterval(intervaloNumeros);
        if (vencedores.length === 1) {
            alert(`O vencedor é ${vencedores[0]}!`);
        } else {
            alert(`Os vencedores são ${vencedores.join(", ")}!`);
        }
    }
}

function reiniciarJogo() {
    cartelas = [];

    numerosSorteados = [];

    clearInterval(intervaloNumeros);

    atualizarCartelas();
    
    let areaNumeros = document.querySelector("#area_numeros");
    let divNumerosSorteados = document.querySelector("#numeros_sorteado");
    
    if(divNumerosSorteados){
      areaNumeros.removeChild(divNumerosSorteados);
    }
}
