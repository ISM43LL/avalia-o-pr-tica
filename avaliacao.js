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
    mover(direcao) {
        if (direcao === 'esquerda' && this.x > 0) {
            this.x -= this.#velocidade;
        } else if (direcao === 'direita' && this.x + this.largura < canvas.width) {
            this.x += this.#velocidade;
        }
    }

    desenhar() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
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
    atualizar(raquete, blocos) {
        this.x += this.#velocidadeX;
        this.y += this.#velocidadeY;

        if (this.x <= 0 || this.x + this.largura >= canvas.width) {
            this.#velocidadeX *= -1;
        }

        if (this.y <= 0) {
            this.#velocidadeY *= -1;
        }

        if (this.y + this.altura >= canvas.height) {
            jogoAtivo = false;
        }

        if (
            this.x < raquete.x + raquete.largura &&
            this.x + this.largura > raquete.x &&
            this.y + this.altura > raquete.y
        ) {
            this.#velocidadeY *= -1;
        }

        blocos.forEach((bloco, index) => {
            if (
                this.x < bloco.x + bloco.largura &&
                this.x + this.largura > bloco.x &&
                this.y < bloco.y + bloco.altura &&
                this.y + this.altura > bloco.y
            ) {
                blocos.splice(index, 1);
                this.#velocidadeY *= -1;
                pontuacao++;
            }
        });
    }

    desenhar() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.largura / 2, 0, Math.PI * 2);
        ctx.fill();
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

function iniciarJogo() {
    raquete = new Raquete(canvas.width / 2 - 75, canvas.height - 40, 150, 15);
    bolinha = new Bolinha(canvas.width / 2, canvas.height / 2, 15);
    blocos = [];

    for (let i = 0; i < 4; i++) {
        blocos.push(new Bloco(i * 200 + 50, 50, 150, 25));
    }
}



function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raquete.desenhar();
    bolinha.atualizar(raquete, blocos);
    bolinha.desenhar();
    blocos.forEach(bloco => bloco.desenhar());
    desenharPontuacao();

    
}

iniciarJogo();
