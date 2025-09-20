// script.js
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const quizEl = document.getElementById("quiz");
const startScreen = document.getElementById("start-screen");
const resultEl = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const reviewEl = document.getElementById("review");

const questionCountSelect = document.getElementById("question-count");
const difficultySelect = document.getElementById("difficulty");

let quizData = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// ----------------------
// QUESTION BANK (100 total)
// ----------------------
const allQuestions = [
  // EASY (1–40)
  { question: "What is 2 + 2?", options: { a: "3", b: "4", c: "5", d: "6" }, correct: "b", difficulty: "easy" },
  { question: "Which is the largest planet?", options: { a: "Mars", b: "Earth", c: "Jupiter", d: "Saturn" }, correct: "c", difficulty: "easy" },
  { question: "What color is the sky on a clear day?", options: { a: "Blue", b: "Red", c: "Green", d: "Yellow" }, correct: "a", difficulty: "easy" },
  { question: "How many days are in a week?", options: { a: "5", b: "6", c: "7", d: "8" }, correct: "c", difficulty: "easy" },
  // ... add until 40 easy

  // MEDIUM (41–70)
  { question: "Who discovered gravity?", options: { a: "Einstein", b: "Newton", c: "Galileo", d: "Tesla" }, correct: "b", difficulty: "medium" },
  { question: "Which is the capital of Canada?", options: { a: "Toronto", b: "Vancouver", c: "Ottawa", d: "Montreal" }, correct: "c", difficulty: "medium" },
  { question: "What is H2O commonly known as?", options: { a: "Salt", b: "Water", c: "Oxygen", d: "Hydrogen" }, correct: "b", difficulty: "medium" },
  { question: "Which gas do humans need to breathe?", options: { a: "Carbon dioxide", b: "Oxygen", c: "Nitrogen", d: "Helium" }, correct: "b", difficulty: "medium" },
  // ... add until 70 medium

  // ADVANCED (71–100)
  { question: "What is the chemical symbol for Gold?", options: { a: "Ag", b: "Au", c: "Gd", d: "Go" }, correct: "b", difficulty: "advanced" },
  { question: "Who developed the theory of relativity?", options: { a: "Einstein", b: "Newton", c: "Bohr", d: "Maxwell" }, correct: "a", difficulty: "advanced" },
  { question: "What is the capital of Australia?", options: { a: "Sydney", b: "Melbourne", c: "Canberra", d: "Perth" }, correct: "c", difficulty: "advanced" },
  { question: "Which organ in the human body produces insulin?", options: { a: "Heart", b: "Liver", c: "Pancreas", d: "Kidney" }, correct: "c", difficulty: "advanced" },
  // ... add until 100 advanced
];

// ----------------------
// START QUIZ
// ----------------------
startBtn.addEventListener("click", () => {
  const count = parseInt(questionCountSelect.value);
  const difficulty = difficultySelect.value;

  let filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
  quizData = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, count);

  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  startScreen.classList.add("hidden");
  quizEl.classList.remove("hidden");
  resultEl.classList.add("hidden");

  loadQuestion();
});

// ----------------------
// LOAD QUESTION
// ----------------------
function loadQuestion() {
  resetState();
  let current = quizData[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${current.question}`;

  for (let key in current.options) {
    const button = document.createElement("button");
    button.textContent = current.options[key];
    button.onclick = () => selectAnswer(key, current.correct, button);
    optionsEl.appendChild(button);
  }
}

// ----------------------
// RESET STATE
// ----------------------
function resetState() {
  nextBtn.classList.add("hidden");
  optionsEl.innerHTML = "";
}

// ----------------------
// SELECT ANSWER
// ----------------------
function selectAnswer(selected, correct, button) {
  userAnswers.push({ q: quizData[currentQuestion].question, selected, correct });
  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
  nextBtn.classList.remove("hidden");
}

// ----------------------
// NEXT BUTTON
// ----------------------
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ----------------------
// SHOW RESULT
// ----------------------
function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;

  reviewEl.innerHTML = "<h3>Review:</h3>";
  userAnswers.forEach((ans, index) => {
    reviewEl.innerHTML += `<p>${index + 1}. ${ans.q} <br>
      Your answer: ${quizData[index].options[ans.selected]} <br>
      Correct: ${quizData[index].options[ans.correct]}</p><hr>`;
  });
}

// ----------------------
// RETRY
// ----------------------
retryBtn.addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  resultEl.classList.add("hidden");
});

