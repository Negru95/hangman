class Hangman {
  constructor() {
    this.guessedLetters = [];
    this.word = "";
    this.remainingGuesses = 6;
    this.hint = "";
    this.hintCount = 0;
    this.keyboardButtons = [];
  }

  selectWord() {
    this.word = Words.getRandomWord();
  }

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
  }

  updateWordDisplay() {
    const wordDisplay = document.getElementById("word-display");
    let displayedWord = "";
    for (const letter of this.word) {
      if (this.guessedLetters.includes(letter.toUpperCase())) {
        displayedWord += letter.toUpperCase() + " ";
      } else {
        displayedWord += "_ ";
      }
    }
    wordDisplay.textContent = displayedWord.trim();
  }

checkLetter(letter) {
  if (!this.guessedLetters.includes(letter.toUpperCase())) {
    this.guessedLetters.push(letter.toUpperCase());
    if (!this.word.toUpperCase().includes(letter.toUpperCase())) {
      this.remainingGuesses--;
      this.updateHangman();
    }
    this.updateWordDisplay();
    this.updateGuessedLetters();
    this.disableLetterButton(letter);
    this.checkWin();
    this.checkLoss();
  }
}


  updateGuessedLetters() {
    const guessedLettersDisplay = document.getElementById("guessed-letters");
    guessedLettersDisplay.textContent = "Litere ghicite: " + this.guessedLetters.join(", ");
  }

  disableLetterButton(letter) {
    const button = document.getElementById(letter.toLowerCase());
    button.disabled = true;
    button.classList.add("disabled");
  }

  checkWin() {
    const remainingLetters = this.word.split("").filter((letter) => !this.guessedLetters.includes(letter.toUpperCase()));
    if (remainingLetters.length === 0) {
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
  }

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
  }

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
  }
  

  resetGame() {
    this.guessedLetters = [];
    this.word = "";
    this.remainingGuesses = 6;
    this.hintCount = 0;
    this.selectWord();
    this.updateWordDisplay();
    this.resetKeyboard();
    document.getElementById("hint").style.display = "none";
    this.updateHangman();
  }

  resetKeyboard() {
    for (const button of this.keyboardButtons) {
      button.disabled = false;
      button.classList.remove("disabled");
    }
  }

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
        button.id = letter.toLowerCase();
        button.addEventListener("click", () => {
          this.checkLetter(letter.toLowerCase());
        });
        rowContainer.appendChild(button);
        this.keyboardButtons.push(button);
      });
      keyboard.appendChild(rowContainer);
    });
  }

  showHint() {
    if (this.hintCount < 2) {
      const unguessedLetters = this.word.split("").filter((letter) => !this.guessedLetters.includes(letter.toUpperCase()));
      if (unguessedLetters.length > 0) {
        const hintIndex = Math.floor(Math.random() * unguessedLetters.length);
        this.hint = unguessedLetters[hintIndex];
        document.getElementById("hint-text").textContent = this.hint;
        document.getElementById("hint").style.display = "block";
        this.hintCount++;
      }
    }
  }
}
