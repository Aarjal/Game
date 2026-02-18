let score = 0;
let lives = 3;
let timeLeft = 60;
let gameInterval;
let eventInterval;
let playing = false;

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timeEl = document.getElementById("time");
const eventsEl = document.getElementById("events");
const startBtn = document.getElementById("startBtn");

const eventTypes = [
  "🚑 Ambulance needs route!",
  "🚒 Fire reported in building!",
  "🚓 Police chase ongoing!",
  "🚦 Traffic jam detected!",
  "🚌 Bus delayed — reroute!"
];

function updateUI() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  timeEl.textContent = timeLeft;
}

function createEvent() {
  if (!playing) return;

  const div = document.createElement("div");
  div.className = "event";

  const text = document.createElement("span");
  text.textContent = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  const btn = document.createElement("button");
  btn.textContent = "Fix";
  btn.className = "good";

  let handled = false;

  btn.onclick = () => {
    if (handled) return;
    handled = true;
    score += 10;
    updateUI();
    div.remove();
  };

  div.appendChild(text);
  div.appendChild(btn);
  eventsEl.appendChild(div);

  // auto-fail if not clicked
  setTimeout(() => {
    if (!handled && playing) {
      lives--;
      updateUI();
      div.remove();
      if (lives <= 0) endGame();
    }
  }, 2000);
}

function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 60;
  eventsEl.innerHTML = "";
  playing = true;
  updateUI();

  startBtn.disabled = true;

  gameInterval = setInterval(() => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0) endGame();
  }, 1000);

  eventInterval = setInterval(() => {
    createEvent();
  }, 900);
}

function endGame() {
  playing = false;
  clearInterval(gameInterval);
  clearInterval(eventInterval);
  alert("Round Over! Score: " + score);
  startBtn.disabled = false;
}

startBtn.onclick = startGame;