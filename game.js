// Game.js
class Personagem {
    constructor(nome, corCabo, corOlhos) {
        this.nome = nome;
        this.corCabo = corCabo;
        this.corOlhos = corOlhos;
        this.posX = 100;
        this.posY = 100;
        this.velX = 0;
        this.velY = 0;
        this.lar = 50;
        this.alt = 50;
        this.gravidade = 0.5;
        this.noChao = false;
    }

    desenhar(ctx) {
        ctx.fillStyle = this.corCabo;
        ctx.fillRect(this.posX, this.posY, this.lar, this.alt);
        ctx.fillStyle = this.corOlhos;
        ctx.fillRect(this.posX + 10, this.posY + 10, 5, 5);
    }

    atualizar() {
        this.velY += this.gravidade;
        this.posX += this.velX;
        this.posY += this.velY;

        if (this.posY + this.alt > canvas.height - 50) {
            this.posY = canvas.height - 50 - this.alt;
            this.velY = 0;
            this.noChao = true;
        } else {
            this.noChao = false;
        }
    }

    pular() {
        if (this.noChao) {
            this.velY = -10;
        }
    }

    moverEsq() {
        this.velX = -5;
    }

    moverDir() {
        this.velX = 5;
    }

    parar() {
        this.velX = 0;
    }
}

// Inicialização do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const personagem = new Personagem('Humano Loiro', 'yellow', 'green');

// Controles mobile
const btnEsq = document.createElement('button');
btnEsq.innerText = '←';
btnEsq.style.position = 'absolute';
btnEsq.style.left = '10px';
btnEsq.style.bottom = '10px';
btnEsq.style.width = '50px';
btnEsq.style.height = '50px';
document.body.appendChild(btnEsq);

const btnDir = document.createElement('button');
btnDir.innerText = '→';
btnDir.style.position = 'absolute';
btnDir.style.left = '70px';
btnDir.style.bottom = '10px';
btnDir.style.width = '50px';
btnDir.style.height = '50px';
document.body.appendChild(btnDir);

const btnPular = document.createElement('button');
btnPular.innerText = 'Pular';
btnPular.style.position = 'absolute';
btnPular.style.right = '10px';
btnPular.style.bottom = '10px';
btnPular.style.width = '50px';
btnPular.style.height = '50px';
document.body.appendChild(btnPular);

// Eventos
btnEsq.addEventListener('touchstart', () => personagem.moverEsq());
btnEsq.addEventListener('touchend', () => personagem.parar());
btnDir.addEventListener('touchstart', () => personagem.moverDir());
btnDir.addEventListener('touchend', () => personagem.parar());
btnPular.addEventListener('touchstart', () => personagem.pular());

// Loop do jogo
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Desenha chão
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    personagem.atualizar();
    personagem.desenhar(ctx);
    requestAnimationFrame(update);
}

update();
