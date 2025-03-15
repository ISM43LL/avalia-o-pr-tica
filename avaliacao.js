const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

class Jogo {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }
}

class Raquete extends Jogo {
    #velocidade;

    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#velocidade = 10;
    }
}

class Bolinha extends Jogo {
    #velocidadeX;
    #velocidadeY;

    constructor(x, y, tamanho) {
        super(x, y, tamanho, tamanho);
        this.#velocidadeX = 5;
        this.#velocidadeY = -5;
    }
}
class Bloco extends Jogo {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
    }
    desenhar() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

let raquete, bolinha, blocos;

function loop() {
    
}
