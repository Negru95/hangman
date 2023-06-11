window.addEventListener("load", () => {
  hangmanGame.initialize();
});

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", () => {
  hangmanGame.resetGame();
});
newGameBtn.classList.add("special");
