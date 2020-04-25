var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<js>", "<scripting>", "<script>"],
    answer: "<script>",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choices: ["myFunction()", "call myFunction()", "call function myFunction()", "function myFunction()"],
    answer: "myFunction()",
  },
  {
    question: "What javascipt method can we use to select an html element?",
    choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
    answer: "Both 1 and 3",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseover", "onclick", "onchange", "onmouseclick"],
    answer: "onclick",
  },
];


var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector("#timer");
var homeContainer = document.querySelector("#home");
var quizContainer = document.querySelector("#quiz");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var finalScore = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var gobackBtn = document.querySelector("#goback");
var clearBtn = document.querySelector("#clear");
var olEl = document.querySelector("#highscores");
var viewHighscoreEl = document.querySelector("#viewHighscore");

var secondsLeft = 75;
var currentQuestionIndex = 0;
var timerId = 0;
var liEl;

function setTimer() {
  timerId = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerId);
      quizEnd();
    }
  }, 1000);
}

function startQuiz() {
  setTimer();
  document.getElementById("home").classList.add("d-none");
  document.getElementById("quiz").classList.remove("d-none");
  document.getElementById("timer").classList.remove("d-none");

  getQuestion();
}

function getQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var questionEl = document.getElementById("questiontitle");
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = " ";

  console.log("inside get question. current index: ", currentQuestionIndex);

  currentQuestion.choices.forEach(function (choice, i) {
    var answerEl = document.createElement("button");
    answerEl.setAttribute("class", "choice");
    answerEl.setAttribute("value", choice);
    answerEl.setAttribute("style", "background:darkslateblue; color:white");
    answerEl.setAttribute("class", "btn btn-secondary d-block btn-md");
    answerEl.textContent = i + 1 + ". " + choice;
    choicesEl.appendChild(answerEl);
    answerEl.addEventListener("click", answerClick);
  });
}

function answerClick() {
  console.log("inside answer click. current index: ", currentQuestionIndex);
  if (this.value !== quizQuestions[currentQuestionIndex].answer) {
    secondsLeft -= 15;

    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
    timer.textContent = secondsLeft;
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  setTimeout(function () {
    feedbackEl.textContent = "";
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === quizQuestions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  setTimeout(function () {
    document.getElementById("quiz").classList.add("d-none");
    clearInterval(timerId);

    document.getElementById("highscore").classList.remove("d-none");

    finalScore.textContent = secondsLeft;
  }, 500);
}

// saving scores to local storage
function saveHighscore(event) {
  event.preventDefault();
  document.getElementById("highscore").classList.add("d-none");
  document.getElementById("quizend").classList.remove("d-none");
  document.getElementById("header").classList.add("d-none");

  console.log("initials: ", initialsEl.value);

  if (initialsEl.value !== "") {
    var newScore = {
      score: secondsLeft,
      initials: initialsEl.value.trim(),
    };

    var existingHighScoreArr = [];
    existingHighScoreArr = JSON.parse(localStorage.getItem("highScore") || "[]");
    existingHighScoreArr.push(newScore);

    // sorting the array for highscores
    localStorage.setItem("highScore", JSON.stringify(existingHighScoreArr.sort((a, b) => (b.score > a.score ? 1 : -1))));
    olEl.innerHTML = "";
    existingHighScoreArr.forEach((existingHighScore) => {
      liEl = document.createElement("li");
      liEl.textContent = existingHighScore.initials + "-" + existingHighScore.score;
      olEl.appendChild(liEl);
    });
  }
}

function playAgain() {
  location.reload();
}

function clearHighscore() {
  localStorage.removeItem("highScore");
  olEl.innerHTML = "";
}


startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveHighscore);
gobackBtn.addEventListener("click", playAgain);
clearBtn.addEventListener("click", clearHighscore);


