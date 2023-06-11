const hangmanGame = {
  guessedLetters: [],
  word: "",
  remainingGuesses: 6,
  hint: "",
  hintCount: 0,

  selectWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    this.word = words[randomIndex];
  },

  initialize() {
    this.selectWord();
    this.updateWordDisplay();
    this.createKeyboard();

    const newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.addEventListener("click", () => {
      this.resetGame();
    });
    newGameBtn.classList.add("special");

    const hintBtn = document.getElementById("hint-btn");
    hintBtn.addEventListener("click", () => {
      this.showHint();
    });
  },

  updateWordDisplay() {
    const wordDisplay = document.getElementById("word-display");
    let displayedWord = "";
    for (const letter of this.word) {
      if (this.guessedLetters.includes(letter)) {
        displayedWord += letter + " ";
      } else {
        displayedWord += "_ ";
      }
    }
    wordDisplay.textContent = displayedWord.trim();
  },

  checkLetter(letter) {
    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters.push(letter);
      if (!this.word.includes(letter)) {
        this.remainingGuesses--;
      }
      this.updateWordDisplay();
      this.updateHangman();
      this.checkWin();
      this.checkLoss();
    }
  },

  checkWin() {
    if (!this.word.split("").some((letter) => !this.guessedLetters.includes(letter))) {
      Swal.fire({
        title: "Felicitări!",
        text: "Ai ghicit cuvântul.",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Joc nou",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame();
        }
      });
    }
  },
  
  checkLoss() {
    if (this.remainingGuesses === 0) {
      Swal.fire({
        title: "Ai pierdut.",
        text: "Cuvântul era: " + this.word,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Joc nou",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame();
        }
      });
    }
  },

  updateHangman() {
    const canvas = document.getElementById("hangman-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hangmanParts = [
      // Cap
      () => {
        ctx.beginPath();
        ctx.arc(200, 100, 50, 0, Math.PI * 2);
        ctx.stroke();
      },
      // Corp
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(200, 300);
        ctx.stroke();
      },
      // Braț stâng
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(150, 250);
        ctx.stroke();
      },
      // Braț drept
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(250, 250);
        ctx.stroke();
      },
      // Picior stâng
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 300);
        ctx.lineTo(150, 370);
        ctx.stroke();
      },
      // Picior drept
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 300);
        ctx.lineTo(250, 370);
        ctx.stroke();
      },
    ];

    const remainingParts = 6 - this.remainingGuesses;
    for (let i = 0; i < remainingParts; i++) {
      hangmanParts[i]();
    }
  },

  resetGame() {
    this.guessedLetters = [];
    this.word = "";
    this.remainingGuesses = 6;
    this.hintCount = 0;
    this.selectWord();
    this.updateWordDisplay();
    this.updateHangman();
    document.getElementById("hint").style.display = "none";
  },

  createKeyboard() {
    const keyboard = document.getElementById("keyboard");

    const qwertyLayout = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    qwertyLayout.forEach((row) => {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("keyboard-row");
      row.forEach((letter) => {
        const button = document.createElement("button");
        button.classList.add("keyboard-letter");
        button.textContent = letter;
        button.addEventListener("click", () => {
          this.checkLetter(letter.toLowerCase());
        });
        rowContainer.appendChild(button);
      });
      keyboard.appendChild(rowContainer);
    });
  },

  showHint() {
    if (this.hintCount < 2) {
      const unguessedLetters = this.word.split("").filter((letter) => !this.guessedLetters.includes(letter));
      if (unguessedLetters.length > 0) {
        const hintIndex = Math.floor(Math.random() * unguessedLetters.length);
        this.hint = unguessedLetters[hintIndex];
        document.getElementById("hint-text").textContent = this.hint;
        document.getElementById("hint").style.display = "block";
        this.hintCount++;
      }
    }
  },
};