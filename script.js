var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<js>", "<scripting>", "<script>"],
    answer: "<script>",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choices: [
      "myFunction()",
      "call myFunction()",
      "call function myFunction()",
      "function myFunction()",
    ],
    answer: "myFunction()",
  },
  {
    question: "What javascipt method can we use to select an html element?",
    choices: [
      "document.queryselector()",
      "document.getElementChild",
      "document.getElementById",
      "Both 1 and 3",
    ],
    answer: "Both 1 and 3",
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onmouseover", "onclick", "onchange", "onmouseclick"],
        answer: "onclick",
  }
];

var body = document.body;
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

var secondsLeft = 75;
var currentQuestionIndex = 0;
var timerId = 0;



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
    
    document.getElementById("home").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");
    setTimer();
    getQuestion();
}

function getQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionEl = document.getElementById("questiontitle");
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = " ";

    currentQuestion.choices.forEach(function (choice, i) {
        
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "choice");
        answerEl.setAttribute("value", choice);
  
        answerEl.textContent = choice;
        choicesEl.appendChild(answerEl);
        answerEl.addEventListener("click", questionClick);

        
        
    });
}

function questionClick() {
    
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

    feedbackEl.setAttribute("class", "feedback");
    

    currentQuestionIndex++;

    if (currentQuestionIndex === quizQuestions.length) {
      quizEnd();
    } else {

         getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("highscore").classList.remove("d-none");

    finalScore.textContent = secondsLeft;

}

function saveHighscore(event) {
    event.preventDefault();
    document.getElementById("highscore").classList.add("d-none");
    document.getElementById("quizend").classList.remove("d-none");
    document.getElementById("header").classList.add("d-none");
    var newScore = {
        score: secondsLeft,
        initials: initialsEl.value.trim()
      };
    // var initials = initialsEl.value.trim();
    // if (newScore !== "") { 
    //      =
    // }

    // localStorage.setItem("newScore", newScore);
    localStorage.setItem("newScore", JSON.stringify(newScore));

    // var highScore = JSON.parse(localStorage.getItem("highScore"));
    // highScore.push(newScore);

}

// function playAgain() {
//     document.getElementById("quizend").classList.add("d-none");
//     document.getElementById("home").classList.remove("d-none");
// }


startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveHighscore);
