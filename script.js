var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    chioces: ["<javascript>", "<js>", "<scripting>", "<script>"],
    answer: "<script>",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    chioces: [
      "myFunction()",
      "call myFunction()",
      "call function myFunction()",
      "function myFunction()",
    ],
    answer: "myFunction()",
  },
];

var body = document.body;
var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector("#timer");
var homeContainer = document.getElementById("home");

var secondsLeft = 75;

function setTimer() {
  var countdown = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function startQuiz() {
  homeContainer.remove();
  var quizQuestionsEl = document.createElement("div");
  var quizEl = document.createElement("div");
  var questionLabelEl = document.createElement("label");
  var button1El = document.createElement("button");
  var button2El = document.createElement("button");
  var button3El = document.createElement("button");
  var button4El = document.createElement("button");

  body.appendChild(quizQuestionsEl);
  quizQuestionsEl.appendChild(quizEl);
  quizEl.appendChild(questionLabelEl);
  quizEl.appendChild(button1El);
  quizEl.appendChild(button2El);
  quizEl.appendChild(button3El);
  quizEl.appendChild(button4El);

  setTimer();
  for (var i = 0; i < questions.length; i++) {
    console.log(questions[i].question);

    questionLabelEl.textContent = questions[i].question;
    //   for (var a = 0; a < questions[i].chioces.length; a++) {
    //       console.log(questions[i].chioces[a]);
    //     quizEl.appendChild(
    //       (document.createElement("button").innerHTML = questions[i].chioces[a])
    //     );

    button1El.innerHTML = questions[i].chioces[0];
    button2El.innerHTML = questions[i].chioces[1];
    button3El.innerHTML = questions[i].chioces[2];
    button4El.innerHTML = questions[i].chioces[3];
  }
}

startBtn.addEventListener("click", startQuiz);
