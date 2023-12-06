let questions = [
    {
        image:"x",
        question: "Apollo representerar Solen?",
        type: "tf",
        answer: true,
    },
    {
        image:"x",
        question: "Myten om Regnbågsormen härstammar från Aboriginerna i Australien?",
        type: "tf",
        answer: true
    },
    {
        image:"x",
        question: "Judahs stam representeras ofta av ett lejon?",
        type: "mc",
        answer: "b",
        choice: ["Elefanten", "Lejonet", "Ormen", "Örnen"],
    },
    {
        image:"x",
        question: "Vilken grekisk guddina skapade kaos på gudafest med sitt gyllende äpple?",
        type: "mc",
        answer: "b",
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

const questionSection = document.querySelector('#question');
const questionImage = document.querySelector('#question__img');
const questionText = document.querySelector('#question__p');

const answerSection = document.querySelector('#answer');
const answerAlternatives = document.querySelector('#answer-alternatives');
const commitBtn = document.querySelector('#answer-commit__btn');

const resetGameBtn = document.querySelector('#gameArea-resetGame__btn');


//Variables for answer templates and Selector for the answer container
let answerAlternativesAinner = `<div class="answer-alternatives" id="answer-alternativesA"><p>True or False?</p><input type="radio" id="true" name="tf" value="true"><label for="html">TRUE</label><br><input type="radio" id="false" name="tf" value="false"><label for="css">False</label><br></div>`;
const answerAlternativesA = document.querySelector("#answer-alternativesA");

let answerAlternativesBinner = `<div class="answer-alternatives displayNone" id="answer-alternativesB"><p>Choose One:</p><input type="radio" id="mc-a" name="mc" value="a"><label for="A">A</label><br><input type="radio" id="mc-b" name="mc" value="b"><label for="B">B</label><br><input type="radio" id="mc-c" name="mc" value="c"><label for="C">C</label><br><input type="radio" id="mc-d" name="mc" value="d"><label for="D">D</label><br></div>`
const answerAlternativesB = document.querySelector("#answer-alternativesB");

let answerAlternativesinner = `<div class="answer-alternatives displayNone" id="answer-alternativesC"><p>Which answers are correct?</p><input type="checkbox" id="cb-a" name="cb" value="a"><label for="A">A</label><br><input type="checkbox" id="cb-b" name="cb" value="b"><label for="B">B</label><br><input type="checkbox" id="cb-c" name="cb" value="c"><label for="C">C</label><br><input type="checkbox" id="cb-d" name="cb" value="d"><label for="D">D</label><br></div>`
const answerAlternativesC = document.querySelector("#answer-alternativesC");

//




