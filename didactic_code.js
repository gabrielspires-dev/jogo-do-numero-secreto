   //document.querySelector('h1') seleciona o "titulo" da página (h1) no html
//let titulo = document.querySelector('h1');   //seletor do h1
   //innerHTML altera o conteúdo do "titulo" para 'Jogo do número secreto'
//titulo.innerHTML = 'Jogo do número secreto';

   //Selecionando o parágrafo (p) no html alterando visualmente no site
//let paragrafo = document.querySelector('p'); //seletor do p
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//____________________________________________________________________________________________________________________________________________
let listaDeNumerosSorteados = []; // Lista/Array para armazenar os números sorteados
// Chama a função gerarNumeroAleatorio() e atribui o valor à variável numeroSecreto
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; //Iniciando em 1
exibirMensagemIncicial();

// Função criada para linkar a um nome e deixar mais prático o uso e entendimento
// Usa (tag) para selecionar qualquer elemento html, logo anulando os codes acima, tag = h1, p, div, span, etc
function exibirTextoNaTela(tag, texto) { //texto linka com innerHTML
    let campo = document.querySelector(tag); //tag pode ser h1, p, div, span, etc e serve para selecionar qualquer elemento html
    campo.innerHTML = texto; //innerHTML altera o conteúdo do "campo" para o valor de "texto"
     if ('speechSynthesis' in window) { // if pronto para corrigir erro de API não suportada
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.0; 
        window.speechSynthesis.speak(utterance); 
    //  ⬑Adiciona a funcionalidade de voz usando a biblioteca ResponsiveVoice linkando ao html inportado
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemIncicial() {
// Sustitui o valor de tag, ou seja, todos os lugares que tiver "tag" será substituído por "h1" e "p"
//   ⇙Puxa o valor d/tag      ⇙Acrecenta o valor d/texto
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Criando uma função para linkar ao botão (button onclick="verificarChute()") alterado no html
function verificarChute() {
    let chute = document.querySelector('input').value; //Seleciona o VALOR(value) digitado no input (caixa de texto) da linha 25 do html
    //console.log(chute == numeroSecreto); // BOTÃO, Compara e mostra no console o número secreto gerado aleatoriamente

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Você acertou!'); //Se o chute for igual ao número secreto, exibe "Você acertou!" no lugar do h1
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //evita exesso de ifs, simplifica a condicional
        // ⬑Ou seja: SE a tentativa for MAIOR que 1 (?) será alterada p/'tentativaS', SENÃO (:) alterado p/'tentativa' 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', `Você descobriu o número secreto, realmente é ${numeroSecreto}`); //Exibe o número secreto no lugar do p
        // ⬑Ou seja, o h1 é o texto maior superior e p é o parágrafo menor inferior
        document.getElementById('reiniciar').removeAttribute('disabled'); //precisa de 'd' no final
        // ⬑Ou seja, habilita o botão reiniciar (Novo jogo) quando o jogador acerta o número secreto,'disabled' é o atributo que desabilita o botão
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor! Tente novamente.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior! Tente novamente.');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // ⬑Gera um número aleatório entre 1 e num.limite (10)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    //⬑Se a lista já tiver o número limite, reinicia a lista para evitar muitos números armazenados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    // ⬑Se o número já estiver na lista, gera outro número aleatório diferente
    //.inculdes serve para verificar se o número já está incluído na lista
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // Mostra no console a lista de números já sorteados
        return numeroEscolhido;
    //⬑Senão, adiciona o número à lista e o retorna
    }
}

function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o input (caixa de texto)
    chute.value = ''; // Limpa o VALOR digitado no input
}

function reiniciarJogo() { // Linkado ao botão "Novo jogo" no html (está desabilitado até acionar o if chute == numeroSecreto)
    // Refazendo a linha temporal do jogo:
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncicial();
}