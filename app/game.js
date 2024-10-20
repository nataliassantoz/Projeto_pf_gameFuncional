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
    const estadoAtual = {...estado}
    const novaPosicaoHorizontal = atualizarPosicao(estadoAtual.horizontal, estadoAtual.direcaoHorizontal, larguraCenario - larguraEstudante);
    const novaPosicaoVertical = atualizarPosicao(estadoAtual.vertical, estadoAtual.direcaoVertical, alturaCenario - alturaEstudante );

    return { ...estadoAtual, horizontal: novaPosicaoHorizontal, vertical: novaPosicaoVertical };
};


const manipularDom = (estudante, estado) => {
    estudante.style.left = `${estado.horizontal}px`;                            // encontrar forma de fazer 
    estudante.style.top = `${estado.vertical}px`;
}
//refazer***
//funcao que atualiza oe integra a funcao moverEstudante e moverEstudante
 const atualizarJogo = (estado, estudante) => {
    const novoEstado = moverEstudante(estado);
    manipularDom(estudante, novoEstado);
    return novoEstado;
 }



// refazer
const Criartiros = (left, top) => {                 
    const tiro = document.createElement("div");
    tiro.className = "livro";
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.background = "red";
    tiro.style.left = `${left}px`;
    tiro.style.top = `${top}px`;
    cenario.appendChild(tiro);
    return tiro;
};

//refazer
const moverTiros = (tiro) => {
    const novaPosicaoTop = parseInt(tiro.style.top) - 5;
    tiro.style.top = `${novaPosicaoTop}px`;

    if (novaPosicaoTop > 0) {
        requestAnimationFrame(() => moverTiros(tiro));
    } else {
        tiro.remove();
    }
};

//refazer
// Função pura para disparar o tiro
const atirar = (estado) => {
    const tiro = Criartiros(estado.horizontal + larguraEstudante / 2, estado.vertical - 10);
    moverTiros(tiro);
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

//verificar se ta funcional e adicionar o que falta
const Criarchefe = (larguraCenario) => ({
    className: "chefe",
    //vida: , 
    width: " ", 
    height: " ",
    backgroundImage: "url()",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    left: `/*nao sei o que coloca aqui*/`, 
    top: "0px"
  });
  
  const criarElementoChefe = (chefe) => {
    const div = document.createElement("div");
    div.className = chefe.className;
    div.style.position = "absolute";
    div.setAttribute("data-vida", chefe.vida);
    div.style.width = chefe.width;
    div.style.height = chefe.height;
    div.style.backgroundImage = chefe.backgroundImage;
    div.style.backgroundPosition = chefe.backgroundPosition;
    div.style.backgroundRepeat = chefe.backgroundRepeat;
    div.style.backgroundSize = chefe.backgroundSize;
    div.style.left = chefe.left;
    div.style.top = chefe.top;
    return div; 
  };
  
  const AdicionarChefe = (cenario, chefe) => {
    const novoElementoChefe = criarElementoChefe(chefe);
    const novoCenario = [...cenario, novoElementoChefe];
    return novoCenario; 
  };
  //completar aqui e testar tudo
  /*const dcompChefe = (larguraCenario, cenario) => {
    const chefe = criarChefe(larguraCenario);
    const novoCenario = adicionarChefeAoCenario(cenario, chefe);
    return novoCenario;
  };*/
  

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


