let randomNumber = parseInt((Math.random()*100)+1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
let restartBtn=$('#restart')
restartBtn.hide()

if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if (isNaN(guess)){
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100){
        alert('Please enter a number less than 500!')
    } else {
        //Keep record of number of attempted guesses
        previousGuesses.push(guess);
        //Check to see if game is over
        if (numGuesses === 11){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
        //Display previous guessed numbers
        displayGuesses(guess);
        //Check guess and display if wrong
        checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    //Display clue if guess is too high or too low
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too High! Try again!`);
    }
}

function displayGuesses(guess){
    restartBtn.show()
    userInput.value = '';
    guessSlot.innerHTML += `<span class="guess_div">${guess}  </span>`;
    numGuesses++
    remaining.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message){
        lowOrHi.innerHTML = `<h1>${message}</h1>`
}

function endGame(){
    //Clear user input
    userInput.value = '';
    //Disable user input button
    userInput.setAttribute('disabled', '');
    //Display Start new Game Button
          p.classList.add('button');
          p.innerHTML = `<h1 id="newGame">Start New Game</h1>`
    startOver.appendChild(p);
    playGame = false;
    restartBtn.hide()
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        //Pick a new random number
        randomNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}

restartBtn.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
        
});