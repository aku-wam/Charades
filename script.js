document.addEventListener('DOMContentLoaded', () => {
    const words = {
      easy: ['apple', 'banana', 'car', 'dog', 'fish'],
      medium: ['giraffe', 'jacket', 'kite', 'monkey', 'notebook'],
      hard: ['elephant', 'ice cream', 'robot', 'xylophone', 'yacht']
    };
  
    const teamAWords = [...words.easy];
    const teamBWords = [...words.easy];
    
    let currentWords = [];
    let timer;
    let timeLeft = 120; // 2 minutes
    let wordsGuessed = 0;
    const totalWordsToGuess = 6;
    let currentIndex = 0;
  
    const wordElement = document.getElementById('word');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const nextButton = document.getElementById('next-button');
    const difficultySelect = document.getElementById('difficulty');
    
    const teamANameInput = document.getElementById('team-a-name');
    const teamANewWordInput = document.getElementById('team-a-new-word');
    const teamAAddWordButton = document.getElementById('team-a-add-word');
    
    const teamBNameInput = document.getElementById('team-b-name');
    const teamBNewWordInput = document.getElementById('team-b-new-word');
    const teamBAddWordButton = document.getElementById('team-b-add-word');
  
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    function startGame() {
      startButton.disabled = true;
      stopButton.disabled = false;
      nextButton.disabled = false;
  
      timeLeft = 120;
      wordsGuessed = 0;
      currentIndex = 0;
      updateTimer();
  
      currentWords = [...teamAWords, ...teamBWords];
      currentWords = shuffleArray(currentWords).slice(0, totalWordsToGuess);
  
      generateWord();
  
      timer = setInterval(() => {
        timeLeft -= 1;
        updateTimer();
  
        if (timeLeft <= 0 || wordsGuessed >= totalWordsToGuess) {
          clearInterval(timer);
          startButton.disabled = false;
          stopButton.disabled = true;
          skipButton.disabled = true;
          nextButton.disabled = true;
          if (wordsGuessed < totalWordsToGuess) {
            wordElement.textContent = 'Time\'s up!';
          }
        }
      }, 1000);
    }
  
    function stopGame() {
      clearInterval(timer);
      startButton.disabled = false;
      stopButton.disabled = true;
      nextButton.disabled = true;
    }
  
    function generateWord() {
      if (currentIndex < currentWords.length) {
        wordElement.textContent = currentWords[currentIndex];
      } else {
        wordElement.textContent = 'No more words!';
      }
    }
  
    function nextWord() {
      if (currentIndex < currentWords.length - 1) {
        wordsGuessed += 1;
        currentIndex += 1;
        generateWord();
      }
    }
  
    function addWord(team) {
      const newWordInput = team === 'A' ? teamANewWordInput : teamBNewWordInput;
      const newWord = newWordInput.value.trim();
      if (newWord) {
        const selectedDifficulty = difficultySelect.value;
        if (!words[selectedDifficulty].includes(newWord)) {
          if (team === 'A') {
            teamAWords.push(newWord);
          } else {
            teamBWords.push(newWord);
          }
          newWordInput.value = '';
        }
      }
    }
  
    function shuffleArray(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  
    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    nextButton.addEventListener('click', nextWord);
    
    teamAAddWordButton.addEventListener('click', () => addWord('A'));
    teamBAddWordButton.addEventListener('click', () => addWord('B'));
  });
  