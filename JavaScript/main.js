let questions = [
    {
        image:"x",
        question: "Apollo representerar Solen?",
        type: "tf",
        answer: [true],
    },
    {
        image:"x",
        question: "Myten om Regnbågsormen härstammar från Aboriginerna i Australien?",
        type: "tf",
        answer: [true]
    },
    {
        image:"x",
        question: "Judas stam representeras ofta av vilket djur?",
        type: "mc",
        answer: ["b"],
        choice: ["Elefanten", "Lejonet", "Ormen", "Örnen"],
    },
    {
        image:"x",
        question: "Vilken grekisk guddina skapade kaos på gudafest med sitt gyllende äpple?",
        type: "mc",
        answer: ["b"],
        choice: ["Athena", "Eris", "Aphrodite", "Hecate"],
    },
    {
        image:"x",
        question: "Vad heter Odens korpar",
        type: "cb",
        answer: ["a", "d"],
        choice: ["Hugin", "Gråan", "Svarv", "Munin"],
    },
    {
        image:"x",
        question: "Vilka av följande är andra namn för Shiva",
        type: "cb",
        answer: ["a", "b"],
        choice: ["Bholenath", "Shankara", "Rama", "Ganesha"],
    },
];

// Selectors Header Section
const titleBar = document.querySelector('#titleBar');
const darkModeBtn = document.querySelector('#titleBar-darkMode__btn');

// Selectors Main Section
const gameArea = document.querySelector('#gameArea');
const startBtn = document.querySelector('#gameArea-start__btn');

const questionSection = document.querySelector('#question');
const questionImage = document.querySelector('#question__img');
const questionText = document.querySelector('#question__p');

const answerSection = document.querySelector('#answer');
const answerAlternatives = document.querySelector('#answer-alternatives');
const commitBtn = document.querySelector('#answer-commit__btn');

//Variables for answers depending on type, and function for defining them
let tf;
let mc;
let cb;
let setAnswerVars = ()=> {
    tf = [...document.querySelectorAll('[name = tf]')];
    mc = [...document.querySelectorAll('[name = mc]')];
    cb = [...document.querySelectorAll('[name = cb]')];
}

const resetGameBtn = document.querySelector('#gameArea-resetGame__btn');


//Variables for answer templates and Selector for the answer container
let answerAlternativesAinner = `<div class="answer-alternatives" id="answer-alternativesA"><p>True or False?</p><input type="radio" id="true" name="tf" value="true"><label for="html">TRUE</label><br><input type="radio" id="false" name="tf" value="false"><label for="css">False</label><br></div><button id="answer-commit__btn">ANSWER!</button>`;
const answerAlternativesA = document.querySelector("#answer-alternativesA");

let answerAlternativesBinner = `<div class="answer-alternatives" id="answer-alternativesB"><p>Choose One:</p><input type="radio" id="mc-a" name="mc" value="a"><label for="A">A</label><br><input type="radio" id="mc-b" name="mc" value="b"><label for="B">B</label><br><input type="radio" id="mc-c" name="mc" value="c"><label for="C">C</label><br><input type="radio" id="mc-d" name="mc" value="d"><label for="D">D</label><br></div><button id="answer-commit__btn">ANSWER!</button>`
const answerAlternativesB = document.querySelector("#answer-alternativesB");

let answerAlternativesCinner = `<div class="answer-alternatives" id="answer-alternativesC"><p>Which answers are correct?</p><input type="checkbox" id="cb-a" name="cb" value="a"><label for="A">A</label><br><input type="checkbox" id="cb-b" name="cb" value="b"><label for="B">B</label><br><input type="checkbox" id="cb-c" name="cb" value="c"><label for="C">C</label><br><input type="checkbox" id="cb-d" name="cb" value="d"><label for="D">D</label><br></div><button id="answer-commit__btn">ANSWER!</button>`
const answerAlternativesC = document.querySelector("#answer-alternativesC");




//Game functionality

//Variables for storing index and copy of questions array
let q;
let questionsCopy;

//Generate a random int based on how many questions there is
let getRandomArrIndex = (arr) =>{
    return Math.floor(Math.random() * arr.length);
}

//Generate a question
let generateAnswers = () =>{
    q = getRandomArrIndex(questionsCopy);

    questionText.innerText = questionsCopy[q].question;
    
    if(questionsCopy[q].type === "tf"){
        answerSection.innerHTML = answerAlternativesAinner;
    }
    else if(questionsCopy[q].type === "mc"){
        answerSection.innerHTML = answerAlternativesBinner;
    }
    else if(questionsCopy[q].type === "cb"){
        answerSection.innerHTML = answerAlternativesCinner;
    }

    questionsCopy.splice(q, 1);
}

//Start Game
startBtn.addEventListener("click", ()=>{
    questionsCopy = questions;
    generateAnswers();
    setAnswerVars();
})

//Answer question and generate a new one
/* commitBtn.addEventListener("click", ()=>{
    let answer = [];

    if(questionsCopy[q].type === "tf"){
        
        .filter((element)=>{
            
        })
    }

    else if(questionsCopy[q].type === "mc"){
        
    }

    else if(questionsCopy[q].type === "cb"){
        
    }
}) */