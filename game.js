// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Classe do personagem
class Personagem {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.w = 50;
        this.h = 50;

        this.vx = 0;
        this.vy = 0;

        this.gravidade = 0.6;
        this.noChao = false;
    }

    atualizar() {
        this.vy += this.gravidade;
        this.x += this.vx;
        this.y += this.vy;

        const chao = canvas.height - 60;

        if (this.y + this.h >= chao) {
            this.y = chao - this.h;
            this.vy = 0;
            this.noChao = true;
        } else {
            this.noChao = false;
        }
    }

    desenhar() {
        // Corpo
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Olho
        ctx.fillStyle = "green";
        ctx.fillRect(this.x + 12, this.y + 12, 6, 6);
    }

    pular() {
        if (this.noChao) {
            this.vy = -12;
        }
    }
}

// Instância do jogador
const player = new Personagem();

// Controles mobile
const controles = document.getElementById("controles");

function criarBotao(texto, left, right, acaoPressionar) {
    const btn = document.createElement("button");
    btn.innerText = texto;

    if (left) btn.style.left = left;
    if (right) btn.style.right = right;

    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        acaoPressionar();
    });

    btn.addEventListener("touchend", () => {
        player.vx = 0;
    });

    controles.appendChild(btn);
}

// Botões
criarBotao("←", "10px", null, () => player.vx = -5);
criarBotao("→", "80px", null, () => player.vx = 5);
criarBotao("⬆", null, "10px", () => player.pular());

// Loop do jogo
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chão
    ctx.fillStyle = "brown";
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    player.atualizar();
    player.desenhar();

    requestAnimationFrame(loop);
}

loop();
