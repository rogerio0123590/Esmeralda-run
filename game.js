const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Jogador
const player = {
  x: 50,
  y: 300,
  w: 40,
  h: 40,
  vx: 0,
  vy: 0,
  speed: 4,
  jumpForce: 12,
  onGround: false
};

// Controles
let left = false;
let right = false;
let jump = false;

// Botões mobile
document.getElementById("btnEsq").ontouchstart = () => left = true;
document.getElementById("btnEsq").ontouchend   = () => left = false;

document.getElementById("btnDir").ontouchstart = () => right = true;
document.getElementById("btnDir").ontouchend   = () => right = false;

document.getElementById("btnPular").ontouchstart = () => jump = true;
document.getElementById("btnPular").ontouchend   = () => jump = false;

// Loop principal
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movimento
  if (left) player.x -= player.speed;
  if (right) player.x += player.speed;

  // Pulo
  if (jump && player.onGround) {
    player.vy = -player.jumpForce;
    player.onGround = false;
  }

  // Gravidade
  player.vy += 0.6;
  player.y += player.vy;

  // Chão
  if (player.y + player.h >= canvas.height - 20) {
    player.y = canvas.height - 20 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  // Desenhar chão
  ctx.fillStyle = "#334155";
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

  // Desenhar jogador
  ctx.fillStyle = "#22c55e";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  requestAnimationFrame(update);
}

update();
