const quiz = [
    { question: "Vad betyder 'avoir mal'?", options: ["Ha tur", "Ha ont", "Vara glad"], answer: 1 },
    { question: "Vad betyder 'avoir l'air fatigué'?", options: ["Se trött ut", "Vara ledsen", "Vara hungrig"], answer: 0 },
    { question: "Vad betyder 'cheveux'?", options: ["Händer", "Hår", "Ögon"], answer: 1 },
    { question: "Vad betyder 'depuis'?", options: ["Före", "Sedan", "Under"], answer: 1 },
    { question: "Vad betyder 'trop vite'?", options: ["För snabbt", "För långsamt", "Väldigt försiktigt"], answer: 0 },
    { question: "Vad betyder 'fracturé-e'?", options: ["Liten", "Bruten", "Stark"], answer: 1 },
    { question: "Vad betyder 'ensuite'?", options: ["Sedan", "Före", "Samtidigt"], answer: 0 },
    { question: "Vad betyder 'on sait'?", options: ["Man tror", "Man vet", "Man vill"], answer: 1 },
    { question: "Vad betyder 'boulot'?", options: ["Jobb", "Skola", "Mat"], answer: 0 },
    { question: "Vad betyder 'patron'?", options: ["Chef", "Anställd", "Kund"], answer: 0 },
    { question: "Vad betyder 'bavard-e'?", options: ["Tystlåten", "Pratsam", "Trött"], answer: 1 },
    { question: "Vad betyder 'ennuyeux-se'?", options: ["Rolig", "Jobbig", "Tråkig"], answer: 2 },
    { question: "Vad betyder 'mignon-ne'?", options: ["Söt", "Stark", "Liten"], answer: 0 },
    { question: "Vad betyder 'mince'?", options: ["Smal", "Stark", "Kort"], answer: 0 },
    { question: "Vad betyder 'doué-e'?", options: ["Trög", "Begåvad", "Svag"], answer: 1 },
  ];

  function shuffleQuiz(quiz) {
      for (let i = quiz.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quiz[i], quiz[j]] = [quiz[j], quiz[i]]; // Swap elements
   }
  }

shuffleQuiz(quiz); // Shuffle the quiz questions when the page loads

  let currentQuestionIndex = 0;
  let score = 0;
  let wrongAnswers = 0;
  let completedQuestions = [];

  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const scoreTracker = document.getElementById("score-tracker");

  function loadQuestion() {
    const questionObj = quiz[currentQuestionIndex];
    quizContainer.innerHTML = `
      <div class="question">${questionObj.question}</div>
      <ul class="options">
        ${questionObj.options.map((option, index) => `
          <li><button id="option-${index}" onclick="checkAnswer(${index})">${option}</button></li>
        `).join('')}
      </ul>
      <div id="feedback" class="feedback"></div>
      <button id="next-btn" style="display: none; margin-top: 1rem;" onclick="nextQuestion()">Nästa</button>
    `;
    updateScoreTracker();
  }

  function checkAnswer(selectedOption) {
const correctAnswer = quiz[currentQuestionIndex].answer;
const feedback = document.getElementById("feedback");
const selectedButton = document.getElementById(`option-${selectedOption}`);
const nextButton = document.getElementById("next-btn");

if (selectedOption === correctAnswer) {
  score++;
  feedback.textContent = "Rätt svar!";
  feedback.className = "feedback correct";
  selectedButton.className = "correct";
  completedQuestions.push({ question: quiz[currentQuestionIndex].question, correct: true });
} else {
  wrongAnswers++;
  feedback.textContent = `Fel svar! Rätt svar är: ${quiz[currentQuestionIndex].options[correctAnswer]}`;
  feedback.className = "feedback incorrect";
  selectedButton.className = "incorrect";
  completedQuestions.push({ question: quiz[currentQuestionIndex].question, correct: false });
}

// Gör alla knappar inaktiverade utom "Nästa"
document.querySelectorAll(".options button").forEach(button => {
  button.disabled = true;
});

// Visa "Nästa" knappen och gör den klickbar
nextButton.style.display = "block";
nextButton.disabled = false; // Sätt knappen som aktiverad
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function updateScoreTracker() {
    scoreTracker.textContent = `Fråga ${currentQuestionIndex + 1} av ${quiz.length} | Rätt: ${score} | Fel: ${wrongAnswers}`;
  }

  function showResult() {
    quizContainer.innerHTML = '<h2>Resultat</h2>';
    resultContainer.innerHTML = `Du fick ${score} rätt och ${wrongAnswers} fel av ${quiz.length}.`;

    setTimeout(() => {
      currentQuestionIndex = 0;
      score = 0;
      wrongAnswers = 0;
      completedQuestions = [];
      shuffleQuiz(quiz);
      resultContainer.innerHTML = '';
      loadQuestion();
    }, 5000);
  }

  loadQuestion();
