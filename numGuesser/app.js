/**
 * GAME FUNCTION:
 * Player must guess a number between a min and max
 * Player gets a certain amount of guesses
 * Notify of guesses remaining
 * Notify the player of the correct answer if loose
 * Let player choose to play again
 */

//Game values
let min = 1;
    max = 10;
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;
//Defining our UI element 
const game = document.querySelector('#game');
      minNum = document.querySelector('.min-num');
      maxNum = document.querySelector('.max-num');
      guessBtn = document.querySelector('#guess-btn');
      guessInput = document.querySelector('#guess-input');
      message = document.querySelector('.message');

      //Making the UI min and max number 
      minNum.textContent = min;
      maxNum.textContent = max;

      //Play again event Listener
      game.addEventListener('mousedown', function(e){
        if(e.target.className === 'play-again'){
          window.location.reload();
        }
      });

      //Adding event Listener to the submit button to listen for guess
      guessBtn.addEventListener('click', function(e){
        let guess = parseInt(guessInput.value);
        
        //Validating our inputs
        if(isNaN(guess) || guess < min || guess > max){
          setMessage(`Please enter a number between ${min} and ${max}`, 'red');
      
        }

        //Check if the game has been won
        if(guess === winningNum){
          //Game over - won

          //Disable the input
          //guessInput.disabled = true;

          //change the border color when the guess is right
          //guessInput.style.borderColor = 'green';

          //Setting the message after guess is correct
          //setMessage(`${winningNum} is correct, YOU WIN!!`, 'green');

           //Replacing the above code with the optimized function 
           gameOver(true, `${winningNum} is correct, YOU WIN!!`);

        }else {
          //When the guess is wrong reducing the number of guesses left
          guessesLeft -= 1;

          //Checking for the number of guesses left
          if(guessesLeft === 0){
          //Game over - Lost

          //Disable the input
          //guessInput.disabled = true;

          //change the border color when the guess is wrong
          //guessInput.style.borderColor = 'red';

          //Setting the message after guess is wrong
          //setMessage(`Game Over, you lost, The correct number was ${winningNum}`, 'red');

           //Replacing the above code with the optimized function 
           gameOver(false, `Game Over, you lost, The correct number was ${winningNum}`)

          }else {
          //Game continue - answer is worng

          //change the border color when the guess is wrong
          guessInput.style.borderColor = 'red';

          //Clear the input after each guess
          guessInput.value = '',

          //Tell the user its guess is the wrong number
          setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
          }

        }
      });

      //Optimizing our code by creating the GameOver function
      function gameOver(won, msg){
        let color;
        won === true ? color = 'green' : 'red';

        //Disable the input
        guessInput.disabled = true;

        //change the border color if guess is right or wrong
        guessInput.style.borderColor = color;

        //change the color of the message if guess is right or wrong
        message.style.color = color;

        //Setting the message if guess is also right or wrong
        setMessage(msg);

        //Play again
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';
      }

      //Getting winningNum function
      function getRandomNum(min, max){
         return Math.floor(Math.random()*(max-min+1)+min);
      }

      //setMessage function
      function setMessage(msg, color){
        message.style.color = color;
        message.textContent = msg;
      }
