var highscoresDiv = document.querySelector(".highscores");
var highscoreList = document.querySelector("#highscoreList");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var quizList = document.querySelector(".Questions");
var title = document.querySelector("#title");
var options = document.querySelector("#options");
var answer = document.querySelector("#answer");
var finish = document.querySelector("#finish");
var finalScoreElement = document.querySelector("#score");
var enterName = document.querySelector(".submit-button");
var goBack = document.querySelector("#back-button");
var nameInputOrig = document.querySelector("#name");
var screenLogMouseEvent = document.querySelector("#screenLog");

var timer;
var timerCount;
var highscores;
var qIndex = 0;
var score = 0;

var quizQuestions = [
  {
    title: "I am question 1 YAY",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },

  {
    title: "I am question 2",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },

  {
    title: "I am question 3",
    options: ["A", "B", "C", "D"],
    answer: "D",
  },

  {
    title: "I am question 4",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
];

function startQuiz() {
  timerCount = 10;
  startButton.classList.add("hidden");
  quizList.classList.remove("hidden");
  startTimer();
  quiz();
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount <= 0) {
      clearInterval(timer);
      //ENDGAME
    }
  }, 1000);
}

function quiz() {
  title.textContent = quizQuestions[qIndex].title;
  document.getElementById("option1").textContent =
    quizQuestions[qIndex].options[0];
  document.getElementById("option2").textContent =
    quizQuestions[qIndex].options[1];
  document.getElementById("option3").textContent =
    quizQuestions[qIndex].options[2];
  document.getElementById("option4").textContent =
    quizQuestions[qIndex].options[3];
}

function checkAnswer(event) {
  console.log(event);
  if (event.target.matches("button")) {
    console.log(event.target.textContent + " was clicked");
    if (event.target.textContent === quizQuestions[qIndex].answer) {
      answer.classList.remove("hidden");
      answer.textContent = "CORRECT";
      score++;
    } else {
      answer.classList.remove("hidden");
      answer.textContent = "WRONG";
      timerCount = timerCount - 10;
    }
  }
  qIndex++;

  if (qIndex == quizQuestions.length) {
    clearInterval(timer);
    endGame();
  } else if (timerCount <= 0) {
    endGame();
    console.log("end game");
  } else {
    quiz();
  }
}

//Aim of this code is to run end game function after start quiz is selected when no questions are annswered and the timer runs out
function timerLimits(event) {
  if (qIndex == quizQuestions[0] && timerCount <= 0) {
    endGame();
  }
}

screenLogMouseEvent.addEventListener("mousemove",timerLimits);




function endGame() {
  timerElement.textContent = 0;
  finalScore = score;
  finalScoreElement.textContent = finalScore;
  answer.classList.add("hidden");
  quizList.classList.add("hidden");
  finish.classList.remove("hidden");
  clearInterval(timerCount);
  //localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
}

function highscoreDisplayScreen() {
  // if (event.target.matches("button")) {
  // highscores.textContent = highscoresList;
  //localStorage.setItem("highscores", highscoresList);
  highscoresDiv.classList.remove("hidden");
  finish.classList.add("hidden");
}
//let nameInput = document.querySelector("#name")
//var name = nameInput.ariaValueMax.trim();

//NOT COMPLETE - Working on storing name and scores to localstorage
//JSON.parse(localStorage.getItem("highscoreList"));
// }

//var nameInput = nameInputOrig.value.trim();
//if (nameInput !== "") {
// var highscores =
// JSON.parse(window.localStorage.getItem("highscoreList");

// var newScore = {
//  score: score,
//  name: nameInput,
// };

// highscores.textContent = highscores;
// save to localstorage
//highscores.push(newScore);
//window.localStorage.setItem(")ighscoreList", JSON.stringify(nweStore));
// }
//}

function reset() {
  startButton.classList.remove("hidden");
  quizList.classList.add("hidden");
  highscoresDiv.classList.add("hidden");
  qIndex = 0;
  startButton.addEventListener("click", startQuiz);
  timerCount = 10;
  console.log(reset);
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);
options.addEventListener("click", checkAnswer);

enterName.addEventListener("click", highscoreDisplayScreen);
goBack.addEventListener("click", reset);

//IGNORE COMMENTED OUT CODE - Need bits and pieces to finish the assignment requirements
//goBack.addEventListener("click", startQuiz); function {
// qIndex = 0
//};
//options.addEventListener("click", checkAnswer, lastQuestion);
//options.addEventListener("click",lastQuestion);

// Calls init() so that it fires when page opened

// Bonus: Add reset button
//var resetButton = document.querySelector(".goback-button");

// Attaches event listener to button
//resetButton.addEventListener("click", resetGame);

//if (state === "hidden") {
// Change the data-state attribute's value
// There are two different ways this attribute can be set
//var state = element.getAttribute("hidden");
//element.dataset.state = "hidden";
// element.setAttribute("hidden")

//timer.textContent = timerCount;
//console.log(startTimer);
//let timer = seconds;

//if (timerCount >= 0) {
//clearInterval(timer);

//if (--timer < 0) {
//timer = duration;

// console.log(quizQuestions.length)
//console.log(endGame);

// if (qIndex > quizQuestions.length) {
// console.log("end game")
// endGame;
// }; //else {
//qIndex++;
//quiz();
// }

//IF QINDEX > ARRAY ENDGAME

//function lastQuestion (event) {
// if (qIndex > quizQuestions.length) {
//  console.log("end game")
// endGame();
//  }
//};
