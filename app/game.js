// Dimensões do cenário e do estudante. Nessas 3 constantes, esta havendo a manipulaçao da DOM (document object model), onde é a representação dos elementos descritos no HTML
//nesse caso, o cenario, o personagem estudante e o botao principal de iniciar. Esta havendo sua manipulação, pois durante o codigo, as constante estao sendo alteradas 
const cenario = document.getElementById("cenario");
const estudante = document.getElementById("estudante");
const botaoIniciar = document.getElementById("iniciar");

// essas 4 constantes definem as mimensoes do cenario e do estudante, o offsetWidth e offsetHeight, sao elementos do JS para onter as dimensoes de um elemento. No caso do 
//cenario, foi definino do style  width: 100vw, height: 100vh para o cenario e para o estudante foi definido  width: 150px, height: 150px.
const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;
const larguraEstudante = estudante.offsetWidth;
const alturaEstudante = estudante.offsetHeight;



// Função para calcular a posição inicial, ela garante que assim que iniciar o jogo, o estudante esteja fixo centralizado na tela. As variaveis direcaoHorizontal e direcaoVertical
// estao definidas em 0, pois o estudante inicia o jogo parado.
const calcularPosicaoInicial = () => ({
    horizontal: (larguraCenario - larguraEstudante) / 2,
    vertical: (alturaCenario - alturaEstudante) / 2,
    direcaoHorizontal: 0,
    direcaoVertical: 0
});


// Função NAO pura para atualizar a posição, onde recebe 3 parametros ***** REFAZER, POIS NAO PODE USAR  Math.min E  Math.max.
// const atualizarPosicao = (posicao, direcao, limite) =>
// Math.max(0, Math.min(posicao + direcao * velocidade, limite));



//funcao para atualizar a posicao do boneco, onde recebe 3 parametros.A funcao é responsavel por garantir que o boneco nao saia da tela
const atualizarPosicao = (posicaoAtual, direcao, limite) => {
    const velocidade = 10; 
    const novaPosicao = posicaoAtual  +  direcao * velocidade; 
    if(novaPosicao < 0) {return 0;} 
    if(novaPosicao > limite){ return limite;}
    return novaPosicao;
}




// Função para mover o estudante com base no estado atual - AINDA NAO ESTA EM FUNCIONAL- TA MANIPULAMDO A DOM*** REFAZER - CRIAR OUTRA FUNCAO QUE, COM BASE NO RETORNO
// DA FUNCAO moverEstudante, POSSA MANIPULAR A DOM
const moverEstudante = (estado) => {
    const estadoAtual = ...estado
    const novaPosicaoHorizontal = atualizarPosicao(estado.horizontal, estado.direcaoHorizontal, larguraCenario - larguraEstudante);
    const novaPosicaoVertical = atualizarPosicao(estado.vertical, estado.direcaoVertical, alturaCenario - alturaEstudante );

    estudante.style.left = `${novaPosicaoHorizontal}px`;                            // deve ser fora dessa funcao 
    estudante.style.top = `${novaPosicaoVertical}px`;

    return { ...estado, horizontal: novaPosicaoHorizontal, vertical: novaPosicaoVertical };
};

const manipularDom = () => {}



// Função pura para criar o elemento do tiro -- AINDA NAO ESTA EM FUNCIONAL- TA MANIPULAMDO A DOM*** REFAZER
const criarLivro = (left, top) => {                 
    const livro = document.createElement("div");
    livro.className = "livro";
    livro.style.position = "absolute";
    livro.style.width = "10px";
    livro.style.height = "10px";
    livro.style.background = "red";
    livro.style.left = `${left}px`;
    livro.style.top = `${top}px`;
    cenario.appendChild(livro);
    return livro;
};

// Função recursiva pura para mover o livro
const moverLivro = (livro) => {
    const novaPosicaoTop = parseInt(livro.style.top) - 5;
    livro.style.top = `${novaPosicaoTop}px`;

    if (novaPosicaoTop > 0) {
        requestAnimationFrame(() => moverLivro(livro));
    } else {
        livro.remove();
    }
};

// Função pura para disparar o tiro
const atirar = (estado) => {
    const livro = criarLivro(estado.horizontal + larguraEstudante / 2, estado.vertical - 10);
    moverLivro(livro);
    return estado;
};

// Função para manipular eventos de teclas
const atualizarDirecao = (estado, tecla, valor) => {
    switch (tecla) {
        case "ArrowRight": return { ...estado, direcaoHorizontal: valor };
        case "ArrowLeft": return { ...estado, direcaoHorizontal: -valor };
        case "ArrowDown": return { ...estado, direcaoVertical: valor };
        case "ArrowUp": return { ...estado, direcaoVertical: -valor };
        default: return estado;
    }
};

// Função para lidar com eventos de tecla pressionada
const teclaPressionada = (estado, tecla) => atualizarDirecao(estado, tecla, 1);

// Função para lidar com eventos de tecla liberada
const teclaNaoPressionada = (estado, tecla) => atualizarDirecao(estado, tecla, 0);

// Função principal para iniciar o jogo
const iniciarJogo = () => {
    let estado = calcularPosicaoInicial();

    const loop = () => {
        estado = moverEstudante(estado);
        requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener("keydown", (event) => {
        estado = teclaPressionada(estado, event.key);
        if (event.key === " ") estado = atirar(estado);
    });

    document.addEventListener("keyup", (event) => {
        estado = teclaNaoPressionada(estado, event.key);
    });

    botaoIniciar.style.display = "none";
};

// Associar a função iniciar ao botão
botaoIniciar.addEventListener("click", iniciarJogo);


