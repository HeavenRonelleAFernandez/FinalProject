document.addEventListener("DOMContentLoaded", function() {
    //quiz data containing questions, choices, and correct answers
    const quizData = [
        { 
            question: "What is the definition of poverty?", 
            choices: ["Not having enough money for basic needs", "Being unemployed", "Living in a small house", "Earning less than $10 per day"], 
            answer: 0 
        },
        { 
            question: "Which country has the highest poverty rate?", 
            choices: ["USA", "India", "Nigeria", "Brazil"], 
            answer: 2 
        },
        { 
            question: "What is the first Sustainable Development Goal (SDG)?", 
            choices: ["Zero Hunger", "No Poverty", "Quality Education", "Clean Water"], 
            answer: 1 
        },
        { 
            question: "How many children die each day due to poverty?", 
            choices: ["10,000", "15,000", "22,000", "30,000"], 
            answer: 2 
        },
        { 
            question: "Which factor contributes most to poverty?", 
            choices: ["Lack of education", "Overpopulation", "Climate change", "All of the above"], 
            answer: 3 
        }
    ];

    let currentQuestionIndex = 0; //tracks the current question number
    let score = 0; //stores the total score
    let timeLeft = 30; //timer for the quiz
    let timer; //variable to hold the timer function
    let selectedAnswers = new Array(quizData.length).fill(null); //stores selected answers
    let submittedAnswers = new Array(quizData.length).fill(false); //tracks submitted answers
    
    //creating quiz container dynamically
    const quizContainer = document.createElement("div");
    quizContainer.id = "quiz-container";
    document.getElementById("test").appendChild(quizContainer);

    //function to start the quiz
    function startQuiz() {
        document.getElementById("test").innerHTML = "<p id='timer'>Time Left: 30s</p>";
        document.getElementById("test").appendChild(quizContainer);
        startTimer();
        loadQuestion();
    }

    //function to start the timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showResults();
            }
        }, 1000);
    }

    //function to load a question
    function loadQuestion() {
        quizContainer.innerHTML = "";
        let questionData = quizData[currentQuestionIndex];
        
        let questionElement = document.createElement("h3");
        questionElement.textContent = questionData.question;
        quizContainer.appendChild(questionElement);

        let choicesContainer = document.createElement("div");
        choicesContainer.className = "choices-container";
        quizContainer.appendChild(choicesContainer);

        //creating buttons for each answer choice
        questionData.choices.forEach((choice, index) => {
            let button = document.createElement("button");
            button.textContent = choice;
            button.className = "choice-button";
            button.onclick = function () {
                if (!submittedAnswers[currentQuestionIndex]) {
                    selectedAnswers[currentQuestionIndex] = index;
                    updateButtonStyles();
                }
            };
            choicesContainer.appendChild(button);
        });
        
        createNavigationButtons();
        updateButtonStyles();
    }

    //function to update button styles after selection or submission
    function updateButtonStyles() {
        let buttons = quizContainer.querySelectorAll(".choice-button");
        buttons.forEach((button, index) => {
            if (submittedAnswers[currentQuestionIndex]) {
                button.style.backgroundColor = index === quizData[currentQuestionIndex].answer ? "darkgreen" : (index === selectedAnswers[currentQuestionIndex] ? "darkred" : "#444");
                button.style.color = "white";
                button.classList.add("answered");
            } else {
                button.style.backgroundColor = selectedAnswers[currentQuestionIndex] === index ? "#666" : "#222";
                button.style.color = "white";
            }
        });
    }

    //function to create navigation buttons
    function createNavigationButtons() {
        let navContainer = document.createElement("div");
        navContainer.className = "nav-container";
        quizContainer.appendChild(navContainer);

        let prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.className = "nav-button";
        prevButton.onclick = function () {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion();
            }
        };
        navContainer.appendChild(prevButton);

        let nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.className = "nav-button";
        nextButton.onclick = function () {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            }
        };
        navContainer.appendChild(nextButton);

        let submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.className = "submit-button";
        submitButton.onclick = function () {
            if (selectedAnswers[currentQuestionIndex] !== null) {
                submittedAnswers[currentQuestionIndex] = true;
                if (selectedAnswers[currentQuestionIndex] === quizData[currentQuestionIndex].answer) {
                    score++;
                }
                updateButtonStyles();
            }
            if (submittedAnswers.every(answer => answer)) {
                showResults();
            }
        };
        navContainer.appendChild(submitButton);
    }

    //function to display the final quiz results
    function showResults() {
        clearInterval(timer);
        quizContainer.innerHTML = `<h3>Quiz Completed!</h3><p>Your Score: ${score}/${quizData.length}</p>`;
    }

    //event listener to start the quiz when the button is clicked
    document.querySelector("#test button").addEventListener("click", startQuiz);
});
