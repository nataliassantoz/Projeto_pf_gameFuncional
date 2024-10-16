

let score = 0;
let gameInterval;

// // Inicializa o canvas
// canvas.width = 800;
// canvas.height = 600;

// Variáveis para movimentação do jogador
let playerX = 375; // Posição inicial do jogador
const playerSpeed = 5; // Velocidade do jogador

// Função para desenhar o jogador
const drawPlayer = (x, y) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, 50, 50); // Desenha um quadrado azul representando o jogador
};
const iniciarJogo = () => { 
    vida = 0;
    scoreDisplay.textContent = `Vida do estudante: ${score}`;
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
};
// Adiciona eventos de teclado para movimentação
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - playerSpeed); // Move para a esquerda
            break;
        case 'ArrowRight':
            playerX = Math.min(canvas.width - 50, playerX + playerSpeed); // Move para a direita
            break;
    }
});

// Função para atualizar o jogo
const updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(playerX, 525); // Usa playerX para movimentação do jogador
    scoreDisplay.textContent = `Pontuação: ${score}`;
};

//Iniciando o jogo funcao principal 


// Adiciona evento ao botão de início
//startButton.addEventListener('click', startGame);

               //  FUNCOES QUE FALTAM IMPLEMENTAR  



//funcao para movimentar o jogador - 
// Adiciona eventos de teclado para movimentação
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - playerSpeed); // Move para a esquerda
            break;
        case 'ArrowRight':
            playerX = Math.min(canvas.width - 50, playerX + playerSpeed); // Move para a direita
            break;
    }
});


a//tualziar o jogo
