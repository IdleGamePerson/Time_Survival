const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let lives = 3;
let player = { x: 500, y: 300, radius: 15, speed: 450 };
let enemies = [];
let winCircle = null;
let levelStartTime = 0;
let currentLevel = null;
let lastTime = null;
let gameRunning = false;
let wasHitByEnemy = false;
const progressDisplay = document.getElementById("progress");



const levels = [
  {
    name: "Einführung",
    lives: 2,
    winTime: 16000,
    enemies: [
      { type: "square", time: 500, x: 0, y: 100, dir: [1, 0], speed: 1000 },
      { type: "square", time: 500, x: 0, y: 200, dir: [1, 0], speed: 1000 },
      { type: "square", time: 500, x: 0, y: 300, dir: [1, 0], speed: 1000 },
      { type: "square", time: 500, x: 0, y: 400, dir: [1, 0], speed: 1000 },
      { type: "square", time: 500, x: 0, y: 500, dir: [1, 0], speed: 1000 },
      { type: "square", time: 1500, x: 1000, y: 100, dir: [-1, 0], speed: 1000 },
      { type: "square", time: 1500, x: 1000, y: 200, dir: [-1, 0], speed: 1000 },
      { type: "square", time: 1500, x: 1000, y: 300, dir: [-1, 0], speed: 1000 },
      { type: "square", time: 1500, x: 1000, y: 400, dir: [-1, 0], speed: 1000 },
      { type: "square", time: 1500, x: 1000, y: 500, dir: [-1, 0], speed: 1000 },
      { type: "plus", time: 3000, x: 500, y: 300, speed: 100 },
      { type: "square", time: 2800, x: 0, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 50, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3200, x: 100, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3400, x: 150, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3600, x: 200, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3800, x: 250, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 4000, x: 300, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 4200, x: 350, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 4400, x: 400, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 4600, x: 450, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 4800, x: 500, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 5000, x: 550, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 5200, x: 600, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 5400, x: 650, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 5600, x: 700, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 5800, x: 750, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 6000, x: 800, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 6200, x: 850, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 6400, x: 900, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 6600, x: 950, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 6800, x: 1000, y: 0, dir: [0, 1], speed: 500 },
      { type: "triangle", time: 7500, x: 0, y: 300, dir: [1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 7750, x: 0, y: 300, dir: [1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 8000, x: 0, y: 300, dir: [1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 8250, x: 0, y: 300, dir: [1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 8500, x: 0, y: 300, dir: [1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 8750, x: 1000, y: 300, dir: [-1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 9000, x: 1000, y: 300, dir: [-1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 9250, x: 1000, y: 300, dir: [-1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 9500, x: 1000, y: 300, dir: [-1, 0], speed: 750, rot: 1 },
      { type: "triangle", time: 9750, x: 1000, y: 300, dir: [-1, 0], speed: 750, rot: 1 },
      { type: "star", time: 12000, x: 500, y: 0, speed: 300, duration: 4000 },
      { type: "star", time: 12000, x: 500, y: 600, speed: 300, duration: 4000 }
    ]
  },
  {
    name: "Dreiecksgefahr",
    lives: 2,
    winTime: 14000,
    enemies: [
      { type: "triangle", time: 0, x: 0, y: 0, dir: [1, 1], speed: 130, rot: 1.0 },
      { type: "triangle", time: 1000, x: 0, y: 100, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 0, y: 200, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 0, y: 300, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 0, y: 400, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 0, y: 500, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 1000, y: 100, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 1000, y: 200, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 1000, y: 300, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 1000, y: 400, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 1000, x: 1000, y: 500, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "square", time: 2500, x: 100, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 2500, x: 200, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 2500, x: 300, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 2500, x: 400, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 2500, x: 500, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 2500, x: 600, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 2500, x: 700, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 2500, x: 800, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 2500, x: 900, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 100, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 200, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3000, x: 300, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 400, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3000, x: 500, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 600, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3000, x: 700, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3000, x: 800, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3000, x: 900, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3500, x: 100, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3500, x: 200, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3500, x: 300, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3500, x: 400, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3500, x: 500, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3500, x: 600, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3500, x: 700, y: 0, dir: [0, 1], speed: 500 },
      { type: "square", time: 3500, x: 800, y: 600, dir: [0, -1], speed: 500 },
      { type: "square", time: 3500, x: 900, y: 0, dir: [0, 1], speed: 500 },
      { type: "star", time: 5000, x: 0, y: 0, speed: 300, duration: 4000 },
      { type: "star", time: 5000, x: 1000, y: 0, speed: 300, duration: 4000 },
      { type: "star", time: 5000, x: 0, y: 600, speed: 300, duration: 4000 },
      { type: "star", time: 5000, x: 1000, y: 600, speed: 300, duration: 4000 },
      { type: "triangle", time: 10000, x: 0, y: 100, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 10000, x: 1000, y: 100, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 10500, x: 0, y: 200, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 10500, x: 1000, y: 200, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 11000, x: 0, y: 300, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 11000, x: 1000, y: 300, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 11500, x: 0, y: 400, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 11500, x: 1000, y: 400, dir: [-1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 12000, x: 0, y: 500, dir: [1, 0], speed: 1000, rot: 1.0 },
      { type: "triangle", time: 12000, x: 1000, y: 500, dir: [-1, 0], speed: 1000, rot: 1.0 }
    ]
  },
  {
    name: "Formenchaos",
    lives: 4,
    winTime: 16000,
    enemies: [
      { type: "square", time: 1000, x: 0, y: 100, dir: [1, 0], speed: 750 },
      { type: "square", time: 1000, x: 0, y: 300, dir: [1, 0], speed: 750 },
      { type: "square", time: 1000, x: 0, y: 500, dir: [1, 0], speed: 750 },
      { type: "square", time: 1000, x: 1000, y: 200, dir: [-1, 0], speed: 750 },
      { type: "square", time: 1000, x: 1000, y: 400, dir: [-1, 0], speed: 750 },
      { type: "square", time: 1500, x: 0, y: 100, dir: [1, 0], speed: 750 },
      { type: "square", time: 1500, x: 0, y: 300, dir: [1, 0], speed: 750 },
      { type: "square", time: 1500, x: 0, y: 500, dir: [1, 0], speed: 750 },
      { type: "square", time: 1500, x: 1000, y: 200, dir: [-1, 0], speed: 750 },
      { type: "square", time: 1500, x: 1000, y: 400, dir: [-1, 0], speed: 750 },
      { type: "square", time: 2000, x: 0, y: 100, dir: [1, 0], speed: 750 },
      { type: "square", time: 2000, x: 0, y: 300, dir: [1, 0], speed: 750 },
      { type: "square", time: 2000, x: 0, y: 500, dir: [1, 0], speed: 750 },
      { type: "square", time: 2000, x: 1000, y: 200, dir: [-1, 0], speed: 750 },
      { type: "square", time: 2000, x: 1000, y: 400, dir: [-1, 0], speed: 750 },
      { type: "square", time: 2500, x: 0, y: 100, dir: [1, 0], speed: 750 },
      { type: "square", time: 2500, x: 0, y: 300, dir: [1, 0], speed: 750 },
      { type: "square", time: 2500, x: 0, y: 500, dir: [1, 0], speed: 750 },
      { type: "square", time: 2500, x: 1000, y: 200, dir: [-1, 0], speed: 750 },
      { type: "square", time: 2500, x: 1000, y: 400, dir: [-1, 0], speed: 750 },
      { type: "triangle", time: 4000, x: 1000, y: 25, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 4250, x: 1000, y: 50, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 4500, x: 1000, y: 75, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 4750, x: 1000, y: 100, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 5000, x: 1000, y: 125, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 5250, x: 1000, y: 150, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 5500, x: 1000, y: 175, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 5750, x: 1000, y: 200, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 6000, x: 1000, y: 225, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 6250, x: 1000, y: 250, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 6500, x: 1000, y: 275, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 6750, x: 1000, y: 300, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 7000, x: 1000, y: 325, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 7250, x: 1000, y: 350, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 7500, x: 1000, y: 375, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 7750, x: 1000, y: 400, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 8000, x: 1000, y: 425, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 8250, x: 1000, y: 450, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 8500, x: 1000, y: 475, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 8750, x: 1000, y: 500, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 9000, x: 1000, y: 525, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 9250, x: 1000, y: 550, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 9500, x: 1000, y: 575, dir: [-1, 0], speed: 500, rot: 0.7 },
      { type: "triangle", time: 9750, x: 1000, y: 600, dir: [-1, 0], speed: 500, rot: 0.7 },

      { type: "star", time: 11000, x: 0, y: 0, speed: 160, duration: 5000 },
      { type: "star", time: 11000, x: 0, y: 600, speed: 170, duration: 5000 },
      { type: "star", time: 11000, x: 1000, y: 0, speed: 180, duration: 5000 },
      { type: "star", time: 11000, x: 1000, y: 600, speed: 165, duration: 5000 },
    ]
  },
  {
    name: "Überlebe!",
    lives: 1,
    winTime: 8000,
    enemies: [
      { type: "square", time: 200, x: 0, y: 100, dir: [1, 0], speed: 400 },
      { type: "square", time: 400, x: 0, y: 200, dir: [1, 0], speed: 400 },
      { type: "square", time: 600, x: 0, y: 300, dir: [1, 0], speed: 400 },
      { type: "square", time: 800, x: 0, y: 400, dir: [1, 0], speed: 400 },
      { type: "square", time: 1000, x: 0, y: 500, dir: [1, 0], speed: 400 },
      { type: "square", time: 1200, x: 1000, y: 50, dir: [-1, 0], speed: 400 },
      { type: "square", time: 1400, x: 1000, y: 150, dir: [-1, 0], speed: 400 },
      { type: "square", time: 1600, x: 1000, y: 250, dir: [-1, 0], speed: 400 },
      { type: "square", time: 1800, x: 1000, y: 350, dir: [-1, 0], speed: 400 },
      { type: "square", time: 2000, x: 1000, y: 450, dir: [-1, 0], speed: 400 },
      { type: "square", time: 2200, x: 1000, y: 550, dir: [-1, 0], speed: 400 },
      { type: "triangle", time: 3000, x: 100, y: 20, dir: [0, 1], speed: 300, rot: 0.5 },
      { type: "triangle", time: 3000, x: 300, y: 20, dir: [0, 1], speed: 300, rot: 0.5 },
      { type: "triangle", time: 3000, x: 700, y: 20, dir: [0, 1], speed: 300, rot: 0.5 },
      { type: "triangle", time: 3000, x: 900, y: 20, dir: [0, 1], speed: 300, rot: 0.5 },
      { type: "plus", time: 3000, x: 500, y: 200, speed: 90 },
      { type: "star", time: 5000, x: 300, y: 600, speed: 200, duration: 5000 },
      { type: "star", time: 5000, x: 700, y: 600, speed: 200, duration: 5000 }
    ]
  }
];

const customLevels = [];

document.getElementById("toggleEditorButton").addEventListener("click", () => {
  const editor = document.getElementById("editorContainer");
  const btn = document.getElementById("toggleEditorButton");
  if (editor.style.display === "none") {
    editor.style.display = "block";
    btn.textContent = "Editor verstecken";
  } else {
    editor.style.display = "none";
    btn.textContent = "Leveleditor";
  }
});

let currentLevelIndex = null;
let currentLevelData = null;

function startLevel(levelOrIndex) {
  // Wenn ein Index übergeben wurde
  wasHitByEnemy = false;
  if (typeof levelOrIndex === "number") {
    currentLevelIndex = levelOrIndex;
    currentLevelData = levels[levelOrIndex];
  } else {
    // Wenn ein komplettes Levelobjekt übergeben wurde
    currentLevelIndex = -1;
    currentLevelData = levelOrIndex;
  }

  currentLevel = JSON.parse(JSON.stringify(currentLevelData));
  enemies = [];
  player.x = 500;
  player.y = 300;
  lives = currentLevel.lives;
  document.getElementById("lives").textContent = lives;
  progressDisplay.textContent = "Fortschritt: 0%";
  levelStartTime = Date.now();
  lastTime = null;
  gameRunning = true;

  document.getElementById("endScreen").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  requestAnimationFrame(gameLoop);
}





function backToMenu() {
  gameRunning = false;
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("menu").style.display = "block";
}


canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function spawnEnemy(data) {
  const base = { x: data.x, y: data.y, type: data.type };

  switch (data.type) {
    case "square":
      enemies.push({
        ...base,
        vx: data.dir[0] * data.speed,
        vy: data.dir[1] * data.speed,
      });
      break;

    case "triangle":
      const initialAngle = Math.atan2(data.dir[1], data.dir[0]);
      enemies.push({
        ...base,
        angle: initialAngle,
        speed: data.speed,
        rot: data.rot
      });
      break;

    case "star":
      enemies.push({
        ...base,
        spawnTime: Date.now(),
        duration: data.duration,
        speed: data.speed,
        rotationAngle: 0 // visuelle Rotation
      });
      break;
    case "plus":
      enemies.push({
        ...base,
        speed: data.speed
      });
      break;

  }
}


function updateEnemy(enemy, delta) {
  switch (enemy.type) {
    case "square":
      // Linear bewegend
      enemy.x += enemy.vx * delta;
      enemy.y += enemy.vy * delta;
      break;

    case "triangle":
      // Zielwinkel zum Spieler berechnen
      const targetAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
      let angleDiff = targetAngle - enemy.angle;

      // Kürzesten Rotationsweg wählen
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

      // Rotation langsam anpassen
      enemy.angle += angleDiff * enemy.rot * delta;

      // Immer in Blickrichtung bewegen
      const vx = Math.cos(enemy.angle) * enemy.speed;
      const vy = Math.sin(enemy.angle) * enemy.speed;
      enemy.x += vx * delta;
      enemy.y += vy * delta;

      // Entfernen, wenn außerhalb
      if (
        enemy.x < -50 || enemy.x > canvas.width + 50 ||
        enemy.y < -50 || enemy.y > canvas.height + 50
      ) {
        enemy.remove = true;
      }
      break;

    case "star":
      // Richtung zum Spieler
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 1) {
        enemy.x += (dx / dist) * enemy.speed * delta;
        enemy.y += (dy / dist) * enemy.speed * delta;
      }

      // Visuelle Rotation erhöhen (unabhängig von Bewegung)
      if (enemy.rotationAngle === undefined) {
        enemy.rotationAngle = 0;
      }
      enemy.rotationAngle += 2 * Math.PI * delta * 0.5; // 0.5 Umdrehungen pro Sekunde

      // Nach Ablauf der Lebenszeit entfernen
      if (Date.now() - enemy.spawnTime > enemy.duration) {
        enemy.remove = true;
      }
      break;
    case "plus":
      const dxPlus = player.x - enemy.x;
      const dyPlus = player.y - enemy.y;
      const distPlus = Math.hypot(dxPlus, dyPlus);

      if (distPlus > 1) {
        // Bewegung vom Spieler weg
        enemy.x -= (dxPlus / distPlus) * enemy.speed * delta;
        enemy.y -= (dyPlus / distPlus) * enemy.speed * delta;
      }

      break;

  }
}

function startCustomLevel() {
  const input = document.getElementById("jsonInput").value;
  const errorBox = document.getElementById("jsonError");

  try {
    const rawLevel = JSON.parse(input);

    // Prüfung auf gültige Struktur
    if (!rawLevel.name || !rawLevel.lives || !rawLevel.winTime || !Array.isArray(rawLevel.enemies)) {
      throw new Error("Ungültige Levelstruktur.");
    }

    // Trim & Einmaliges (Custom)
    const baseName = rawLevel.name.trim();
    const fullName = baseName.startsWith("(Custom) ") ? baseName : `(Custom) ${baseName}`;
    rawLevel.name = fullName;

    // Ersetzen oder Hinzufügen
    const existingIndex = customLevels.findIndex(l => l.name === fullName);
    if (existingIndex !== -1) {
      customLevels[existingIndex] = rawLevel; // 🔁 Ersetze altes Level
      errorBox.textContent = "Custom-Level ersetzt! WARNUNG: Nicht gespeichert, speichere bitte woanders.";
    } else {
      customLevels.push(rawLevel); // ➕ Neues hinzufügen
      errorBox.textContent = "Custom-Level hinzugefügt! WARNUNG: Nicht gespeichert, speichere bitte woanders.";
    }

    generateLevelButtons();

    setTimeout(() => errorBox.textContent = "", 2000);
  } catch (e) {
    errorBox.textContent = "Fehler im JSON: " + e.message;
  }
}



function showEndScreen(text, color) {
  gameRunning = false;
  const screen = document.getElementById("endScreen");
  const message = document.getElementById("endMessage");
  screen.style.display = "flex";
  screen.style.backgroundColor = color;
  message.textContent = text;
}

function restartLevel() {
  document.getElementById("endScreen").style.display = "none";
  startLevel(currentLevelData);
}


function update(delta) {
  // Spielerbewegung zur Maus
  const dx = mouseX - player.x;
  const dy = mouseY - player.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 1) {
    const moveDist = Math.min(player.speed * delta, dist);
    player.x += (dx / dist) * moveDist;
    player.y += (dy / dist) * moveDist;
  }

  // Gegner updaten
  enemies.forEach((enemy) => updateEnemy(enemy, delta));

  // Entferne markierte Gegner
  enemies = enemies.filter(e => !e.remove);

  // Kollisionen prüfen
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const d = Math.hypot(player.x - e.x, player.y - e.y);
    if (d < player.radius + 15) {
      if (e.type === "plus") {
        // Plus gibt Leben
        lives++;
      } else {
        // Andere nehmen Leben
        lives--;
        wasHitByEnemy = true;
      }
      enemies.splice(i, 1);
      document.getElementById("lives").textContent = lives;
      if (lives <= 0) {
        showEndScreen("Du hast verloren...", "red");
        return;
    }
  }

  // Fortschritt anzeigen
  const timePassed = Date.now() - levelStartTime;
  const progress = Math.min(1, timePassed / currentLevel.winTime);
  progressDisplay.textContent = `Fortschritt: ${(progress * 100).toFixed(1)}%`;

  // Levelende
  if (timePassed >= currentLevel.winTime) {
    if (wasHitByEnemy) {
      showEndScreen("Du hast gewonnen!", "green");
    } else {
      showEndScreen("PERFEKT!", "blue"); // etwas kräftigeres Grün
    }
  }
}

}


function drawEnemy(enemy) {
  switch (enemy.type) {
    case "square":
      ctx.fillStyle = "red";
      ctx.fillRect(enemy.x - 15, enemy.y - 15, 30, 30);
      break;

    case "triangle":
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.angle);
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-15, -10);
      ctx.lineTo(-15, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;

    case "star":
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.rotationAngle); // visuelle Drehung
      ctx.fillStyle = "yellow";
      ctx.beginPath();

      const spikes = 5;
      const outerRadius = 12;
      const innerRadius = 5;
      let rotation = Math.PI / 2 * 3;
      const step = Math.PI / spikes;

      ctx.moveTo(Math.cos(rotation) * outerRadius, Math.sin(rotation) * outerRadius);

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rotation) * outerRadius, Math.sin(rotation) * outerRadius);
        rotation += step;
        ctx.lineTo(Math.cos(rotation) * innerRadius, Math.sin(rotation) * innerRadius);
        rotation += step;
      }

      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    case "plus":
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.fillStyle = "lime";
      ctx.fillRect(-5, -15, 10, 30); // vertikaler Balken
      ctx.fillRect(-15, -5, 30, 10); // horizontaler Balken
      ctx.restore();
      break;

  }
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spieler zeichnen
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();

  // Gegner zeichnen
  enemies.forEach(drawEnemy);

  // Zielkreis zeichnen
  if (winCircle) {
    ctx.fillStyle = "lime";
    ctx.beginPath();
    ctx.arc(winCircle.x, winCircle.y, winCircle.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}


function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 1000; // in Sekunden
  lastTime = timestamp;

  // Gegner spawnen laut Leveldefinition
  currentLevel.enemies.forEach(enemy => {
    if (!enemy.spawned && Date.now() - levelStartTime >= enemy.time) {
      spawnEnemy(enemy);
      enemy.spawned = true;
    }
  });

  // Spiellogik aktualisieren und zeichnen
  update(delta);
  draw();

  // Nächster Frame
  requestAnimationFrame(gameLoop);
}

const levelColors = {
  "Einführung": "#2ecc71",       // grün
  "Dreiecksgefahr": "#3498db",   // grau
  "Formenchaos": "#3498db",      // grau
  "Überlebe!": "#3498db"         // blau
};

function generateLevelButtons() {
  const levelList = document.getElementById("levelList");
  const searchInput = document.getElementById("searchInput");

  function renderLevels(filter = "") {
    levelList.innerHTML = "";

    // Kombiniere Standard + Custom Levels
    const allLevels = [...levels, ...customLevels];

    allLevels.forEach((level, index) => {
      if (level.name.toLowerCase().includes(filter.toLowerCase())) {
        const button = document.createElement("button");
        button.className = "level-button";
        button.textContent = level.name;
        button.onclick = () => startLevel(level);

        // Färbung nach Name
        const color = levelColors[level.name] || (level.name.startsWith("(Custom)") ? "#e74c3c" : "#444");
        button.style.backgroundColor = color;
        button.style.color = "#ffffff";


        levelList.appendChild(button);
      }
    });
  }

  searchInput.addEventListener("input", () => {
    renderLevels(searchInput.value);
  });

  renderLevels(); // initiales Rendering
}

document.getElementById("jsonInput").value = `{
  "name": "Beispiel-Level",
  "lives": 3,
  "winTime": 10000,
  "enemies": [
    { "type": "square", "time": 1000, "x": 0, "y": 150, "dir": [1, 0], "speed": 200 },
    { "type": "triangle", "time": 3000, "x": 1000, "y": 300, "dir": [-1, 0], "speed": 250, "rot": 0.5 },
    { "type": "star", "time": 5000, "x": 500, "y": 0, "speed": 180, "duration": 4000 },
    { "type": "plus", "time": 6000, "x": 500, "y": 300, "speed": 100 }
  ]
}`;


generateLevelButtons();