// QUESTIONS

const questions = [
  {
    "question": "Qual desses locais seria o local de trabalho dos sonhos para você?",
    "answer1": "Uma multinacional, como a Amazon, Microsoft, Ambev, Google etc",
    "answer1Total": "1",
    "answer2": "Uma Organização Intergovernamental, como uma das agências da ONU",
    "answer2Total": "2",
    "answer3": "Consulado, Embaixadas, Itamaraty ou secretaria de Relações Internacionais",
    "answer3Total": "3"
  },
  {
    "question": " Você tem interesse em seguir a carreira diplomática?",
    "answer1": "Com certeza!",
    "answer1Total": "1",
    "answer2": "Não tenho certeza ainda",
    "answer2Total": "2",
    "answer3": "Absolutamente não!",
    "answer3Total": "3"
  },
  {
    "question":
      "O que você mais prioriza no ambiente de trabalho?",
    "answer1": "Novos desafios, mudanças constantes e dia a dia de trabalho dinãmico, com várias coisas acontecendo ao mesmo tempo",
    "answer1Total": "1",
    "answer2": "Um ambiente mais tranquilo, que não seja tão grande e que apesar de ter muito trabalho para realizar é um ambiente tranquilo",
    "answer2Total": "3",
    "answer3": "Um lugar no qual haja uma hierarquia e protocolos, que seja um ambiente mais formal",
    "answer3Total": "2"
  },
  {
    "question": "Quais destas áreas mais te interessa?",
    "answer1": "Direito Internacional",
    "answer1Total": "3",
    "answer2": "Comércio e economia internacional",
    "answer2Total": "2",
    "answer3":
      "Impacto Social",
    "answer3Total": "1"
  },
  {
    "question": "Você prefere:",
    "answer1": "Trabalhar sempre em equipe, estabelecer metas e dasfios que alcaçarão juntos",
    "answer1Total": "1",
    "answer2": "Trabalhar sozinho e interagir com a equipe somente quando precisar apresentar os resultados que você atingiu com sua tarefa",
    "answer2Total": "2",
    "answer3": "Discutir as ideias em equipe e colher feedbacks mas trabalhar sozinho no processo criativo",
    "answer3Total": "3"
  },
  {
    "question":
      "Qual outro bacharelado você faria se  pudesse, além de RI",
    "answer1":
      "Economia ou Comércio Exterior",
    "answer1Total": "3",
    "answer2": "Ciência Política ou Políticas Públicas",
    "answer2Total": "2",
    "answer3": "Sociologia ou Antropologia",
    "answer3Total": "1"
  },
  {
    "question": "Para você, qual tem maior peso na hora de tomar uma decisão?",
    "answer1": "Sem dúvidas o salário! O locar que paga melhor é o melhor local para trabalhar",
    "answer1Total": "1",
    "answer2": "O ambiente de trabalho harmônico e tranquilo e uma boa convivência com os colegas",
    "answer2Total": "2",
    "answer3": "Um local no qual eu sei que estou gerando grande impacto social e influencio os processos de tomada de decisão",
    "answer3Total": "3"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;


const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');


//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions && totalScore <= 1) {
        container.style.display = 'none';
        const terceiroSetor = document.querySelector('.terceiro-setor');
        result.innerHTML = 
        `<h1 class="final-score">Pontuação: ${totalScore}</h1>
         <div class="summary">`;
        terceiroSetor.classList.remove('hiden');
        /*`
            <h1>Summary</h1>
            <p>Possible - Personality Traits, 
            see below for a summary based on your results:</p>
            >
        </div>
        <button class="restart">Restart Quiz</button>
         `;*/
        return;
    }

    if(currentQuestion == totalQuestions && totalScore <= 2) {
      container.style.display = 'none';
      const primeiroSetor = document.querySelector('.primeiro-setor');
      result.innerHTML = 
      `<h1 class="final-score">Pontuação: ${totalScore}</h1>
       <div class="summary">`;
     primeiroSetor.classList.remove('hiden');
    }

    if(currentQuestion == totalQuestions && totalScore >3) {
      container.style.display = 'none';
      const segundoSetor = document.querySelector('.segundo-setor');
      result.innerHTML = 
      `<h1 class="final-score">Pontuação: ${totalScore}</h1>
       <div class="summary">`;
     segundoSetor.classList.remove('hiden');
    }
    generateQuestions(currentQuestion);
}


//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);