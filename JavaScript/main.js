let questions = [
    {
        image:"/Assets/osirisset.avif",
        question: "Dom egyptiska gudarna Osiris och Set är bröder.",
        type: "tf",
        answer: [true],
    },
    {
        image:"/Assets/rainbow.avif",
        question: "Myten om Regnbågsormen härstammar från Aboriginerna i Australien.",
        type: "tf",
        answer: [true],
    },
    {
        image:"/Assets/judah.avif",
        question: "Judahs stam representeras ofta av vilket djur?",
        type: "mc",
        answer: ["b"],
        choice: ["Elefanten", "Lejonet", "Ormen", "Örnen"],
    },
    {
        image:"/Assets/apple.avif",
        question: "Vilken grekisk guddina skapade kaos på gudafest med sitt gyllende äpple?",
        type: "mc",
        answer: ["b"],
        choice: ["Athena", "Eris", "Aphrodite", "Hecate"],
    },
    {
        image:"/Assets/raven.avif",
        question: "Vad heter Odens korpar?",
        type: "cb",
        answer: ["a", "d"],
        choice: ["Hugin", "Gråan", "Svarv", "Munin"],
    },
    {
        image:"/Assets/shiva.avif",
        question: "Vilka av följande är andra namn för Shiva?",
        type: "cb",
        answer: ["a", "b", "d"],
        choice: ["Bholenath", "Shankara", "Rama", "Shambho"],
    },
    {
        image:"/Assets/prometheus.avif",
        question: "Vad stal Prometheus från gudarna för att ge till människorna?",
        type: "mc",
        answer: ["a"],
        choice: ["Eld", "Vin", "Guld", "Jorden"],
    },
    {
        image:"/Assets/frostgiant.avif",
        question: "Frostjättarna från nordisk mytologi bor i Muspelheim.",
        type: "tf",
        answer: [true],
    },
    {
        image:"/Assets/gita.avif",
        question: "Vem slåss vid Krishnas sida på stridsvagnen i Bhagavad Gita?",
        type: "mc",
        answer: ["a"],
        choice: ["Arjuna", "Hanuman", "Kripa", "Subhadra"],
    },
    {
        image:"/Assets/pan.avif",
        question: "Guden Pan syns ofta spelandes vilket instrument?",
        type: "tf",
        answer: ["d"],
        choice: ["Gitarr", "Trumma", "Fiol", "Flöjt"],
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

const resetGameBtn = document.querySelector('#gameArea-resetGame__btn');

//Selector for answer inputs and forms (content is set in later functionality)
let answerInputs;
let labelForms;

//Variables for answer templates and selector for the answer container
let answerAlternativesAinner = `<div class="answer-alternatives" id="answer-alternativesA"><p>True or False?</p><input type="radio" id="tf-a" name="tf" value="true"><label for="tf-a">Sant</label><br><input type="radio" id="tf-b" name="tf" value="false"><label for="tf-b">Falskt</label><br></div>`;
const answerAlternativesA = document.querySelector("#answer-alternativesA");

let answerAlternativesBinner = `<div class="answer-alternatives" id="answer-alternativesB"><p>Choose One:</p><input type="radio" id="mc-a" name="mc" value="a"><label for="mc-a"></label><input type="radio" id="mc-b" name="mc" value="b"><label for="mc-b"></label><input type="radio" id="mc-c" name="mc" value="c"><label for="mc-c"></label><input type="radio" id="mc-d" name="mc" value="d"><label for="mc-d"></label></div>`;
const answerAlternativesB = document.querySelector("#answer-alternativesB");

let answerAlternativesCinner = `<div class="answer-alternatives" id="answer-alternativesC"><p>Which answers are correct?</p><input type="checkbox" id="cb-a" name="cb" value="a"><label for="cb-a"></label><input type="checkbox" id="cb-b" name="cb" value="b"><label for="cb-b"></label><input type="checkbox" id="cb-c" name="cb" value="c"><label for="cb-c"></label><input type="checkbox" id="cb-d" name="cb" value="d"><label for="cb-d"></label></div>`;
const answerAlternativesC = document.querySelector("#answer-alternativesC");




//Game functionality

//Variables for storing index, copy of questions array, arr for colleecting answers, and scorekeeper.
let q;
let questionsCopy;
let answerArr = [];
let score = 0;

//Generate a random int based on how many questions there is
let getRandomArrIndex = (arr) =>{
    return Math.floor(Math.random() * arr.length);
}

//Generate a question
let generateQuestion = () =>{
    answerArr = [];
    q = getRandomArrIndex(questionsCopy);

    questionImage.src = questionsCopy[q].image;
    questionText.innerText = questionsCopy[q].question;
    

    if(questionsCopy[q].type === "tf"){
        answerSection.innerHTML = answerAlternativesAinner;
        answerInputs = [...document.querySelectorAll('[name = tf]')];
    }
    else if(questionsCopy[q].type === "mc"){
        answerSection.innerHTML = answerAlternativesBinner;
        answerInputs = [...document.querySelectorAll('[name = mc]')];
    }
    else if(questionsCopy[q].type === "cb"){
        answerSection.innerHTML = answerAlternativesCinner;
        answerInputs = [...document.querySelectorAll('[name = cb]')];
    }

    labelForms = [...document.querySelectorAll("label")];

    for(let i = 0; i<labelForms.length; i++){
        if(questionsCopy[q].type != "tf"){
            labelForms[i].innerText = questionsCopy[q].choice[i];
        }
    }
}

//Start Game
startBtn.addEventListener("click", ()=>{
    questionsCopy = questions;
    generateQuestion();
})

commitBtn.addEventListener("click", () => {
    answerInputs.forEach((input) => {
        if (input.checked === true) {
            answerArr.push(input.value);
        }
    });

    if(answerArr.toString() === questionsCopy[q].answer.toString()){
        alert("yeehaw!");
        score ++;
    }
    else(alert("oh nooes!"));

    questionsCopy.splice(q, 1);
    generateQuestion();
});