// Dimensões do cenário e do estudante
const cenario = document.getElementById("cenario");
const estudante = document.getElementById("estudante");
const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;
const larguraEstudante = estudante.offsetWidth;
const alturaEstudante = estudante.offsetHeight;
const botaoIniciar = document.getElementById("iniciar");

const velocidade = 15;

// Função para calcular a posição inicial
const calcularPosicaoInicial = () => ({
    horizontal: (larguraCenario - larguraEstudante) / 2,
    vertical: (alturaCenario - alturaEstudante) / 2,
    direcaoHorizontal: 0,
    direcaoVertical: 0
});

// Função pura para atualizar a posição
const atualizarPosicao = (posicao, direcao, limite) =>
    Math.max(0, Math.min(posicao + direcao * velocidade, limite));

// Função para mover o estudante com base no estado atual
const moverEstudante = (estado) => {
    const novaPosicaoHorizontal = atualizarPosicao(
        estado.horizontal, estado.direcaoHorizontal, larguraCenario - larguraEstudante
    );
    const novaPosicaoVertical = atualizarPosicao(
        estado.vertical, estado.direcaoVertical, alturaCenario - alturaEstudante
    );

    estudante.style.left = `${novaPosicaoHorizontal}px`;
    estudante.style.top = `${novaPosicaoVertical}px`;

    return { ...estado, horizontal: novaPosicaoHorizontal, vertical: novaPosicaoVertical };
};

// Função pura para criar o elemento do tiro
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
