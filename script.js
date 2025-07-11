const colors = ["green", "red", "yellow", "blue"];
const gameSeq = [];
const userSeq = [];
const boardBtns = document.querySelectorAll(".btn");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

    let level = 0;
    let allowInput = false;

    function randomColor() {
      return colors[Math.floor(Math.random() * 4)];
    }

    function flash(btn) {
      btn.classList.add("flash");
      setTimeout(() => btn.classList.remove("flash"), 300);
    }

    function playSequence() {
      allowInput = false;
      let i = 0;
      const interval = setInterval(() => {
        const color = gameSeq[i];
        const btn = document.querySelector(`.btn.${color}`);
        flash(btn);
        i++;
        if (i >= gameSeq.length) {
          clearInterval(interval);
          allowInput = true;
          statusEl.textContent = `Your turn: repeat ${gameSeq.length} step${gameSeq.length>1?"s":""}`;
        }
      }, 600);
    }

    function nextRound() {
      userSeq.length = 0;
      gameSeq.push(randomColor());
      level++;
      statusEl.textContent = `Level ${level}`;
      playSequence();
    }

    function resetGame() {
      gameSeq.length = 0;
      userSeq.length = 0;
      level = 0;
      statusEl.textContent = "Game over! Press Start to try again.";
      allowInput = false;
      startBtn.disabled = false;
    }

    boardBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (!allowInput) return;
        const color = btn.dataset.color;
        flash(btn);
        userSeq.push(color);
        const currentIndex = userSeq.length - 1;
        if (userSeq[currentIndex] !== gameSeq[currentIndex]) {
          resetGame();
          return;
        }
        if (userSeq.length === gameSeq.length) {
          allowInput = false;
          setTimeout(nextRound, 800);
        }
      });
    });

    startBtn.addEventListener("click", () => {
      startBtn.disabled = true;
      statusEl.textContent = "Watch the pattern";
      nextRound();
    });
