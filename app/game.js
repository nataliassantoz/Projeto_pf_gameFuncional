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
  
  // fucao para atualizar o valor da div
  const atualizarValorDiv = (id, novovalor, label) => {
    const div = document.getElementById(id);
    div.textContent = `${label}: ${novovalor}`;
  };
  
  // Funcao pra manipular o dano do aluno
  const aplicarDanoAluno = () => {
    const vidaAtual = getValorDiv("vida");
    const novaVida = vidaAtual - 2;
  
    atualizarValorDiv("vida", novaVida, "Vida do estudante");
  
    return novaVida;
  };
  
  // funcao pra manipular os pontos do aluno
  const aumentarPontosAluno = () => {
    const pontosAtuais = getValorDiv("pontos");
    const novosPontos = pontosAtuais + 1;
  
    atualizarValorDiv("pontos", novosPontos, "Pontos");
  
    console.log(novosPontos);
  
    return novosPontos;
  };
  
  // funcao para verificar o ganhador
  const verificarVitoria = (pontos, vida) => {
    return {
      alunoGanhou: pontos > 100,
      bossGanhou: vida < 0,
      ambos: pontos <= 100 && vida >= 0,
    };
  };
  
  // =============================================================================
  

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
    const velocidade = 10; 
    const novaPosicao = posicaoAtual  +  direcao * velocidade; 
    if(novaPosicao < 0) {return 0;} 
    if(novaPosicao > limite){ return limite;}
    return novaPosicao;
}


const moverEstudante = (estado,larguraCenario, larguraEstudante, alturaCenario, alturaEstudante) => {
    const novaPosicaoHorizontal = atualizarPosicao(estado.horizontal, estado.direcaoHorizontal, larguraCenario - larguraEstudante);
    const novaPosicaoVertical = atualizarPosicao(estado.vertical, estado.direcaoVertical, alturaCenario - alturaEstudante );

    return { ...estado, horizontal: novaPosicaoHorizontal, vertical: novaPosicaoVertical };
};


const manipularDom = (estudante, estado) => {
    estudante.style.left = `${estado.horizontal}px`;                           
    estudante.style.top = `${estado.vertical}px`;
}

const reniciarJogo = () => {
    const { botaoIniciar } = elementosHTML();
    botaoIniciar.style.display = "block";
    console.log("Jogo reniciado!");
  };

  // funcao para manipular a pontuacao e parar o jogo 
const manipularPontuacao = (morreu) => {
    console.log(`Morreu em iniciar jogo: ${morreu}`);
    if (morreu <= 0) {
      console.log("Jogo finalizado!");
      reiniciarJogo(); // renicia o jogo
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
        let pararChefe = morreu;
        if (callback) callback(morreu); 
      };

    const loopchefe = () => {
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
        requestAnimationFrame(loopchefe);
    };

    loopChefe();
}

// Função principal para iniciar o jogo
const iniciarJogo = () => {
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


