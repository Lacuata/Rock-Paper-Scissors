let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lose: 0,
  tie: 0,
};

showScore();
// we remove the onclick in html code  onclick=gamePlay('Rock, Paper, Scissors') and move it in javascript

// and run the playerMove function using addEventListener
document.querySelector(".js-rock-button").addEventListener("click", () => {
  gamePlay("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  gamePlay("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  gamePlay("Scissors");
});

// target the body so we can play rock paper scissors using R for Rock P Paper S Scissors
// using keydown
document.body.addEventListener("keydown", () => {
  //target body in document add eventListner
  if (event.key === "r" || event.key === "R") {
    //if event.key or pressed is === r or R Rock
    gamePlay("Rock");
  } else if (event.key === "p" || event.key === "P") {
    //if event.key or pressed is === p or P Paper
    gamePlay("Paper");
  } else if (event.key === "s" || event.key === "S") {
    //if event.key or pressed is === s or S scissors
    gamePlay("Scissors");
  }
  // 12u. update the code so pressing a on keyboardwill auto play the game
  else if (event.key === "a" || event.key === "A") {
    autoPlay();
  }
  // 12w. Update the code so pressing 'Backspace willreset the score
  else if (event.key === "enter" || event.key === "Enter") {
    // resetScore(); change to
    showResetConfirmation();
  }
});

// gameplay
function gamePlay(userMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (userMove === computerMove) {
    result = "Tie.";
    score.tie++;
  } else if (
    (userMove === "Rock" && computerMove === "Scissors") ||
    (userMove === "Paper" && computerMove === "Rock") ||
    (userMove === "Scissors" && computerMove === "Paper")
  ) {
    result = "You Win.";
    score.wins++;
  } else {
    result = "You Lose.";
    score.lose++;
  }

  document.querySelector(".game-result").innerHTML = result;
  document.querySelector(".game-move").innerHTML =
    // to insert image use the ${userMove} and computer move inside of src/img example src=img/${uerMove}-emoji means src= img/rock/paper/scissors-emoji same to computerMove
    ` 
    You <img class="move-icon" src="img/${userMove}-emoji.png" alt="">
    -
    <img class="move-icon" src="img/${computerMove}-emoji.png" alt="">  Computer`;

  showScore();
}

// computerMove
function pickComputerMove() {
  const randomNumber = Math.random() * 1;
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }

  return computerMove;
}

// function autoPlay(){
// let buttonName = document.querySelector('.js-auto')

// let isAutoPlaying; //set isAutoPlaying as none
// if(buttonName.innerHTML === 'Auto Play'){
//     // update the isAutoPlaying
//     isAutoPlaying = setInterval(function() {
//         buttonName.innerHTML = 'Stop'
//         const playerMove = pickComputerMove();
//         gamePlay(playerMove)
//     }, 2000)
// } else {
//     buttonName.innerHTML = 'Auto Play'
//     clearInterval(isAutoPlaying); // to stop the interval to run
// }
// }

// or
let isAutoPlaying = false; //set as false the autoPlaying

let intervalId; //set isAutoPlaying as none

//challenge by 12s update the Auto Play button to   use addEventListener('click' instead of onclick)
// autoplay onclick
document.querySelector(".js-auto").addEventListener("click", () => {
  autoPlay();
});

function autoPlay() {
  let buttonName = document.querySelector(".js-auto");

  if (!isAutoPlaying) {
    //if !isAutoPlaying is true thx to function autoPlay it becomes a true in our condition
    // run this code below

    //12t.  update the 'Auto Play' button so that when the game is autopalying the text in the button is stop Playing otherwise the text button is auto play
    (buttonName.innerHTML = "Stop Playing"),
      // update intervalId
      (intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        gamePlay(playerMove);
      }, 2000));
    isAutoPlaying = true;
  } else {
    // else run this
    buttonName.innerHTML = "Auto Play";
    clearInterval(intervalId); // to stop the setInterval running
    isAutoPlaying = false;
  }
}

function showScore() {
  document.querySelector(
    ".game-score"
  ).innerHTML = `Wins: ${score.wins}, Lose: ${score.lose}, Tie: ${score.tie}`;

  localStorage.setItem("score", JSON.stringify(score));
}

// 12v update the resetScore button to use addEventListner('click')
document.querySelector(".js-reset").addEventListener("click", () => {
  // resetScore(); change to
  showResetConfirmation();
});

function resetScore() {
  score.wins = 0;
  score.lose = 0;
  score.tie = 0;

  showScore();
}

function showResetConfirmation() {
  let resetChoice = document.querySelector(".js-reset-confirmation");
  resetChoice.innerHTML = `
        Are you sure you want to reset the score?
        <button class='js-reset-confirm-yes reset-confirm-button'>
        Yes
        </button>
        <button class='js-reset-confirm-no reset-confirm-button'>
        No
        </button>
        `;

  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      setTimeout(() => {
        hideResetConfirmation();
      }, 1000);
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

// function for hiding the confirmation message
function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}
