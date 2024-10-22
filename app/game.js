// parte da pontuacao do estudante e boss
// funcao para obter o valor numérico de uma div e retorna esse numero.
const getValorDiv = (id) => {
    const div = document.getElementById(id);
// expressao que procura por numero dentro do texto da div
// a expressao  vai encontrar a primira sequencia de digitos
// a funcao match vai retornar essa sequencia em um array
// depois pega o primeiro numero que encontrar com [0]
// depois, parseint transforma esse numero que esta como texto em um numero de verdade
    return parseInt(div.textContent.match(/\d+/)[0], 10);
  };
  
  // função que recebe o id de uma div para ser atualizado, o novo valor que sera colocado, e um rótulo para ser exibido junto do valor
  const atualizarValorDiv = (id, novovalor, label) => {
    const div = document.getElementById(id); //busca o elemento na div pelo id
    div.textContent = `${label}: ${novovalor}`; //atualiza o texto do elemento da div em uma string no formato "label: novovalor", que foram passados na funçao
  };
  
  // Função que reduz o valor do aluno em 2 e atualiza visualmente na tela
  const aplicarDanoAluno = () => {
    const vidaAtual = getValorDiv("vida"); //obtém o valor da vida atual a partir do elemento no DOM com id "vida"
    const novaVida = vidaAtual - 2; //armazena o valor da vidaAtual decrescido de 2
  
    atualizarValorDiv("vida", novaVida, "Vida do estudante"); //atualiza na interface o valor da vida, e deixa no formato "Vida do estudante: novaVida"
  
    return novaVida; //retorna o valor "novaVida" para ser utilizado em outro lugar, se necessário
  };
  
  // função que aumenta os pontos em 1, e atualiza na interface do jogo
  const aumentarPontosAluno = () => {
    const pontosAtuais = getValorDiv("pontos"); //busca no DOM o valor atual de pontos através do id "pontos"
    const novosPontos = pontosAtuais + 1; //armazena na variável 'novosPontos' os pontos atuais somados de 1
  
    atualizarValorDiv("pontos", novosPontos, "Pontos"); //atualiza na interface o valor dos pontos, e deixa no formato "Pontos: novosPontos"
  
    console.log(novosPontos); //exibe o valor dos pontos no console
  
    return novosPontos; //retorna o valor de novosPontos para ser utilizado em outro lugar, se necessário
  };
  
  // função que avalia o vencedor do jogo baseado nos pontos e na vida do jogador
  const verificarVitoria = (pontos, vida) => { //recebe o valor dos pontos e vida atuais
    return {
      alunoGanhou: pontos > 100, //retorna 'true' se o valor de pontos for maior que 100, dando a vitória ao aluno
      bossGanhou: vida < 0, //retorna 'true' se o valor da vida for menor que 0, dando a vitória ao chefe
      ambos: pontos <= 100 && vida >= 0, //Retorna true se a condição do jogo ainda estiver em andamento, ou seja, os pontos do aluno são menores ou iguais a 100 e a vida do jogador é maior ou igual a 0.
    };
  };
  
  // função que inicia a reprodução de uma música de fundo
  const carregarAudio = () => {
    const musicaFundo = document.getElementById("musicaFundo"); //obtem o elemento de áudio da música de fundo no DOM
    musicaFundo.play().catch((error) => { //reproduz a musica obtida a partir do elemento 'musicaFundo'
      console.error("Erro ao reproduzir áudio:", error); //caso haja um erro ao reproduzir a música, registra esse erro no console e avisa na interface que houve um erro na reprodução
    });
  };

  // função que inicia a reprodução da música quando o jogador ser derrotado
  const carregarAudioDerrota = () => {
    const musicaFundo = document.getElementById("musicaFundoDerrota"); //obtém o elemento de áudio da música de derrota no DOM
    musicaFundo.play().catch((error) => {//inicia a reprodução da música e, caso haja um erro durante a reprodução, registra o erro no console e avisa que houve um erro.
      console.error("Erro ao reproduzir áudio:", error); 
    });
  };

// Dimensões do cenário e do estudante. Nessas 3 constantes, esta havendo a manipulaçao da DOM (document object model), onde é a representação dos elementos descritos no HTML
//nesse caso, o cenario, o personagem estudante e o botao principal de iniciar. Esta havendo sua manipulação, pois durante o codigo, as constante estao sendo alteradas 
const elementosHTML = () => {

    const cenario = document.getElementById("cenario");
    const estudante = document.getElementById("estudante");
    const botaoIniciar = document.getElementById("iniciar");

    return {cenario, estudante, botaoIniciar};
};

// essas 4 constantes definem as mimensoes do cenario e do estudante, o offsetWidth e offsetHeight, sao elementos do JS para onter as dimensoes de um elemento. No caso do 
//cenario, foi definino do style  width: 100vw, height: 100vh para o cenario e para o estudante foi definido  width: 150px, height: 150px.

const obterDimensoesDoCenario = (cenario, estudante ) => { 
    const larguraCenario = cenario.offsetWidth;
    const alturaCenario = cenario.offsetHeight;
    const larguraEstudante = estudante.offsetWidth;
    const alturaEstudante = estudante.offsetHeight;

    return {larguraCenario, alturaCenario, larguraEstudante, alturaEstudante};
}


// Função para calcular a posição inicial, ela garante que assim que iniciar o jogo, o estudante esteja fixo centralizado na tela. As variaveis direcaoHorizontal e direcaoVertical
// estao definidas em 0, pois o estudante inicia o jogo parado.
const calcularPosicaoInicial = (larguraCenario, larguraEstudante, alturaCenario, alturaEstudante) => ({
    horizontal: (larguraCenario - larguraEstudante) / 2,
    vertical: (alturaCenario - alturaEstudante) / 2,
    direcaoHorizontal: 0,
    direcaoVertical: 0
});

//funcao para atualizar a posicao do boneco, onde recebe 3 parametros.A funcao é responsavel por garantir que o boneco nao saia da tela
const atualizarPosicao = (posicaoAtual, direcao, limite) => {
    const velocidade = 10; // define uma velocidade de 10 unidades, que diz o quanto a posição irá mudar em cada atualização
    const novaPosicao = posicaoAtual  +  direcao * velocidade; //calcula a nova posição somando a posição atual com a direção e multiplica pela velocidade
    if(novaPosicao < 0) {return 0}; //se a nova posição for menor que 0, retorna a posição no zero para que o objeto nao saia dos limite inferior da tela
    if(novaPosicao > limite){ return limite}; //se a nova posição for menor que 0, retorna a posição no zero para que o objeto nao saia dos limite superior da tela
    return novaPosicao; //retorna o valor da nova posição para que possa ser usada em outro lugar, se necessário
}

// função que atualiza a posição do estudante no cenário
const moverEstudante = (estado,larguraCenario, larguraEstudante, alturaCenario, alturaEstudante) => {// recebe o valor de estado atual do estudante, a largura e a altura, tanto do cenário quanto do estudante
    const novaPosicaoHorizontal = atualizarPosicao(estado.horizontal, estado.direcaoHorizontal, larguraCenario - larguraEstudante); // essa variável calcula a nova posição do estudante, garantindo que saia dos limites laterais
    const novaPosicaoVertical = atualizarPosicao(estado.vertical, estado.direcaoVertical, alturaCenario - alturaEstudante ); //faz a mesma coisa da variável acima, mas para os limites superior e inferior

    return { ...estado, horizontal: novaPosicaoHorizontal, vertical: novaPosicaoVertical }; //a função retorna um novo estado, copiando todas as propriedades do objeto estado original, e substituindo os valores de horizontal e vertical pelas novas posições calculadas.
};

//função que atualiza a posição de um elemento no DOM com base nas coordenadas fornecidas no estado
const manipularDom = (estudante, estado) => { //recebe o elemento de imagem do estudante, e um objeto que representa a posição atual do estudante na tela
    estudante.style.left = `${estado.horizontal}px`;  //atualiza a posição do estudante através do valor 'estado.horizontal'                         
    estudante.style.top = `${estado.vertical}px`; //atualiza a posição do estudante através do valor 'estado.horizontal'
}

//função responsável por reiniciar o jogo
const reniciarJogo = () => {
    const { botaoIniciar } = elementosHTML(); //desestrutura o objeto dos elementosHTML para obter a referência do botão iniciar
    botaoIniciar.style.display = "block"; //altera a propriedade css para "block", que faz o botão ser novamente visível na tela
    console.log("Jogo reniciado!"); //imprime no console a mensagem "jogo reiniciado"
  };

  // funcao que lida com a pontuação e a finalização do jogo
const manipularPontuacao = (morreu) => { //recebe o parametro 'morreu'
    console.log(`Morreu em iniciar jogo: ${morreu}`);
    if (morreu <= 0) {
      console.log("Jogo finalizado!");
      carregarAudioDerrota();
      reniciarJogo(); // renicia o jogo
    }
  };
  

const Criartiros = (cenario, left, top, label = "aluno") => {      

    const tiro = document.createElement("div");
    tiro.className = label;
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.background = "blue";
    tiro.style.left = `${left}px`;
    tiro.style.top = `${top}px`;
    cenario.appendChild(tiro);
    return tiro;
};

const moverTiros = (tiro, boss) => {
    const novaPosicaoTop = parseInt(tiro.style.top) - 5;
    tiro.style.top = `${novaPosicaoTop}px`;
  
    verificarColisaoAlunoComBoss(tiro, boss);
  
    if (novaPosicaoTop > 0) {
      requestAnimationFrame(() => moverTiros(tiro, boss));
    } else {
      tiro.remove();
    }
  };

  // Função para mover tiros do boss com verificação de colisão
const moverTirosBoss = (tiro, aluno, callback) => {
    const loopTiro = () => {
      const posicaoAtual = parseInt(tiro.style.top) || 0;
      tiro.style.top = `${posicaoAtual + 5}px`;
  
      const pontuacao = verificarColisaoBossComAluno(tiro, aluno);
  
      if (pontuacao === 0) {
        callback(true);
      }
  
      if (posicaoAtual > window.innerHeight) {
        tiro.remove();
      } else {
        requestAnimationFrame(loopTiro);
      }
    };
    loopTiro();
  };

  // Funções para verificar colisões
const verificarColisaoAlunoComBoss = (tiro, boss) => {
    const tiroRect = tiro.getBoundingClientRect();
    const bossRect = boss.getBoundingClientRect();
  
    if (
      tiroRect.top < bossRect.bottom &&
      tiroRect.bottom > bossRect.top &&
      tiroRect.left < bossRect.right &&
      tiroRect.right > bossRect.left
    ) {
      console.log("Tiro do aluno atingiu o boss!");
  
      tiro.remove();
      return aumentarPontosAluno();
    }
  
    return 0;
  };

const verificarColisaoBossComAluno = (tiro, aluno) => {
    const tiroRect = tiro.getBoundingClientRect();
    const alunoRect = aluno.getBoundingClientRect();
  
    if (
      tiroRect.top < alunoRect.bottom &&
      tiroRect.bottom > alunoRect.top &&
      tiroRect.left < alunoRect.right &&
      tiroRect.right > alunoRect.left
    ) {
      console.log("Tiro do boss atingiu o aluno!");
  
      tiro.remove();
      return aplicarDanoAluno();
    }
  
    return;
  };
  
// Função pura para disparar o tiro
const atirar = ( cenario, estado, larguraEstudante, boss) => {
    const tiro = Criartiros(cenario, estado.horizontal + larguraEstudante / 2, estado.vertical - 10);
    moverTiros(tiro, boss);
    return estado;
};

const bossAtirar = (cenario, posicaoChefeX, posicaoChefeY, aluno, callback) => {
    const tiro = Criartiros(cenario,posicaoChefeX + 50 / 2, posicaoChefeY + 5,"boss"
    );
    moverTirosBoss(tiro, aluno, (morreu) => {
      console.log("Estudante morreu:", morreu);
      if (callback) callback(morreu); // os pontos e passado via calback
    });
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


let chefeAdicionado = false;
const adicionarChefe = (cenario) => {
    if (chefeAdicionado) {return};
    
    const chefe = document.createElement("div");
    chefe.id = "chefe";
    chefe.style.position = "absolute";
    
    const posicaoAleatoria = Math.random() * (cenario.offsetWidth - 100); 
    chefe.style.left = `${posicaoAleatoria}px`;
    chefe.setAttribute("vida", 3);
    cenario.appendChild(chefe);
    
    chefeAdicionado = true; 
    return chefe;
  };


// Função para lidar com eventos de tecla pressionada
const teclaPressionada = (estado, tecla) => atualizarDirecao(estado, tecla, 1);

// Função para lidar com eventos de tecla liberada
const teclaNaoPressionada = (estado, tecla) => atualizarDirecao(estado, tecla, 0);



const movimentochefe= (chefe, larguraCenario,  cenario, callback) => {
    let direcaochefe = 1; 

    let pararChefe = false;

    const processarPontuacao = (morreu) => {
        console.log("movimentoChefe", morreu);
       pararChefe = morreu;
        if (callback) callback(morreu); 
      };

    const loopChefe = () => {
        if(pararChefe) { return};
        
        const posicaoAtual = parseInt(chefe.style.left) || 0;
        const novaposicao = posicaoAtual + direcaochefe *5;

        if (novaposicao <= 0 || novaposicao >= larguraCenario - 100) {
            direcaochefe *= -1; 
    }
    chefe.style.left = `${novaposicao}px`;

    if (Math.random() < 0.05) {
        bossAtirar(cenario, novaposicao, 0, estudante, processarPontuacao);
      }
        requestAnimationFrame(loopChefe);
    };

  loopChefe();
};

// Função principal para iniciar o jogo
const iniciarJogo = () => {
    carregarAudio();
    const {cenario, estudante, botaoIniciar} = elementosHTML();
    const { larguraCenario, alturaCenario, larguraEstudante, alturaEstudante } = obterDimensoesDoCenario(cenario, estudante);
    let estado = calcularPosicaoInicial(larguraCenario, larguraEstudante, alturaCenario, alturaEstudante);

    const bodyBoss = adicionarChefe(cenario);

    let parar = false;
    const manipularPontuacao = (morreu, callback) => {
      console.log("manipular", morreu);
  
      if (morreu) {
        parar = morreu;
        if (alert("Estudante morreu!") === undefined) {
          // FAZER O MESMO QUANDO O BOSS MORRE DAR REFESH NA PAG
          location.reload();
        }
      }
      
    };
  
    const loop = () => {
        if (parar) return;
        estado = moverEstudante(estado,larguraCenario, larguraEstudante, alturaCenario, alturaEstudante);
        manipularDom(estudante, estado);
        
        animationId = requestAnimationFrame(loop);
    };


     movimentochefe(bodyBoss, larguraCenario, cenario, manipularPontuacao);
    loop();

    document.addEventListener("keydown", (event) => {
        estado = teclaPressionada(estado, event.key);
        if (event.key === " ") atirar(cenario, estado, larguraEstudante, bodyBoss);
    });

    document.addEventListener("keyup", (event) => {
        estado = teclaNaoPressionada(estado, event.key);
    });

    botaoIniciar.style.display = "none";
};

const { botaoIniciar } = elementosHTML();
// Associar a função iniciar ao botão
botaoIniciar.addEventListener("click", iniciarJogo);


