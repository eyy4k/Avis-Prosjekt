const triviaQ = document.getElementById("triviaQ");
const optionsQA = document.querySelector(".triviaOptions");
const resultsQA = document.getElementById("results");
const checkBtn = document.getElementById("checkAnswer");
const replayBtn = document.getElementById("playAgain");
const correctA = document.getElementById("riktige");
const antallQ = document.getElementById("antallQ");

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    if (typeof data.results === 'undefined') {
        setTimeout(loadQuestion, 1000);
    } else {
        console.log(data.results[0])
    }
    showQuestion(data.results[0]);
    resultsQA.innerHTML = "";
}

function eventListeners(){
    checkBtn.addEventListener('click', checkAnswer);
    replayBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    antallQ.textContent = totalQuestion;
    correctA.textContent = correctScore;
});

function showQuestion(data){
    checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(correctAnswer); 
    
    triviaQ.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    optionsQA.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

function selectOption(){
    optionsQA.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(optionsQA.querySelector('.selected')){
                const activeOption = optionsQA.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
    checkBtn.disabled = true;
    if(optionsQA.querySelector('.selected')){
        let selectedAnswer = optionsQA.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            resultsQA.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            resultsQA.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        resultsQA.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        checkBtn.disabled = false;
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        resultsQA.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        replayBtn.style.display = "block";
        checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}

function setCount(){
    antallQ.textContent = totalQuestion;
    correctA.textContent = correctScore;
}


function restartQuiz(){
    correctScore = askedCount = 0;
    replayBtn.style.display = "none";
    checkBtn.style.display = "block";
    checkBtn.disabled = false;
    setCount();
    loadQuestion();
}
