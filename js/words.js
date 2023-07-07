class Words {
    static words = ["BANANA", "CURCUBEU", "VACANTA", "PRIETENII", "RESTAURANT", "CASA", "PISCINA", "FLOARE", "MASINA", "AUTOBUZ", "COPIL", "JOC", "CAL", "VACA", "PORC", "LEU"];
  
    static getRandomWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      return this.words[randomIndex];
    }
  }