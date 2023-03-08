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
var submitName = document.querySelector(".submit-button");
var goBack = document.querySelector("#back-button");
var enterName = document.querySelector("#enterName");
var clearHighscores = document.querySelector("#clear-button");

//Initialising variables
var timer;
var timerCount;
var qIndex = 0;
var score = 0;

//Questions array
var quizQuestions = [
  {
    title: "Which is the correct way to write a comment in JavaScript?",
    options: ["{# ... #}", "<!--- .... ---!>", "// ....", "\\ ..."],
    answer: "// ....",
  },

  {
    title: "Which one of the following is correct?",
    options: ["i =+ 1;", "i += 1;", "i = i++1;", "+i+;"],
    answer: "i += 1;",
  },

  {
    title: "Which of the following does the pop() method do?",
    options: [
      "It increments the total length by 1",
      "It doubles the length of a string",
      "It prints the first element but no effect on the length",
      "None of the above options",
    ],
    answer: "None of the above options",
  },

  {
    title: "What kind of scope does JavaScript use?",
    options: ["Segmental", "Literal", "Lexical", "Sequential"],
    answer: "Lexical",
  },
];

//Start Quiz function hides start button and displays questions (QuizList)
function startQuiz() {
  timerCount = 60;
  startButton.classList.add("hidden");
  quizList.classList.remove("hidden");
  startTimer();
  quiz();
}

//Timer function
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    //If timer is less than or equal 0 run end game page
    if (timerCount <= 0) {
      clearInterval(timer);
      console.log("timer=0");
      endGame();
    }
  }, 1000);
}

//Quiz moves through array of questions
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

//Check if button selected matches with quiz answer from QuizQuestions array
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
  // Hide answer button after 1 second
  setTimeout(function () {
    answer.classList.add("hidden");
  }, 1000);

  qIndex++;

  //If all questions are answered run end game function
  if (qIndex == quizQuestions.length) {
    clearInterval(timer);
    endGame();
  } else if (timerCount <= 0) {
    endGame();
  } else {
    quiz();
  }
}

//Endgame function, hides questions and displays finished quiz output
function endGame() {
  timerElement.textContent = 0;
  finalScore = score;
  finalScoreElement.textContent = finalScore;
  answer.classList.add("hidden");
  quizList.classList.add("hidden");
  finish.classList.remove("hidden");
}

//Function options Highscore Page on click event
function highscoreDisplayScreen() {
  highscoresDiv.classList.remove("hidden");
  finish.classList.add("hidden");
  var nameValue = enterName.value.trim();
  var scoreList = {
    name: nameValue,
    score: score,
  };

  //Store score list
  var old = JSON.parse(localStorage.getItem("highscoresFINAL")) || [];
  old.push(scoreList);

  localStorage.setItem("highscoresFINAL", JSON.stringify(old));

  var highscores = JSON.parse(localStorage.getItem("highscoresFINAL"));
  //Ordering scores in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  //Setting variables to empty string to resolve duplicates in HighscoreList
  highscoreList.innerHTML = "";
  enterName.value = "";

  for (var i = 0; i < highscores.length; i++) {
    var store = document.createElement("li");
    store.textContent = `${highscores[i].name}: ${highscores[i].score}`;
    highscoreList.appendChild(store);
  }
}

//Clear all saved highscores in local storage
function clearScores() {
  localStorage.clear();
  window.location.reload();
}

function reset() {
  startButton.classList.remove("hidden");
  quizList.classList.add("hidden");
  highscoresDiv.classList.add("hidden");
  qIndex = 0;
  startButton.addEventListener("click", startQuiz);
  timerCount = 10;
  console.log(reset);
  score = 0;
}

//Eventlisteners
startButton.addEventListener("click", startQuiz);
options.addEventListener("click", checkAnswer);
submitName.addEventListener("click", highscoreDisplayScreen);
goBack.addEventListener("click", reset);
clearHighscores.addEventListener("click", clearScores);
