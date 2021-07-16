let randomNumber = parseInt((Math.random()*100)+1); //parseInt() metodu, kendisine ondalıklı olarak verdiğiniz değerin ondalık kısmını siler ve kalan kısımdan yeni bir değişken oluşturarak döndürür.parseInt(), veri türü ne olursa olsun girilen değeri number veri türüne dönüştürecektir. Y 
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');//p tag i oluşturduk
let previousGuesses = []; //Önceki tahminleri buraya atacağız
let numGuesses = 1; //başlangıç depğerini 1 verdik , 11 den düşeceğiz
let playGame = true;
let restartBtn=$('#restart')
restartBtn.hide()

if (playGame){
    subt.addEventListener('click', function(e){   //#subt tıklandığında function(e) çağrılacak
        e.preventDefault();                       // preventDefault() varsayılan eylemi engelliyor
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if (isNaN(guess)){                        //isNaN metodu aldığı değerin/değişkenin rakam olup-olmadığını kontrol eder. 
        alert('Please enter a valid number'); // Eğer rakam değilse (NaN - Not a Number) true döndürür. Diğer türlü false döndürür.
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100){
        alert('Please enter a number less than 100!')
    } else {        
        previousGuesses.push(guess);
        if (numGuesses === 11){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
        displayGuesses(guess);
        checkGuess(guess);
        }
    }
}

function checkGuess(guess){                           //bu fonksiyonla girilen sayıyı random sayı ile karşılaştırıyoruz
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!(BZ)`);
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
    userInput.value = '';
    userInput.setAttribute('disabled', '');
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