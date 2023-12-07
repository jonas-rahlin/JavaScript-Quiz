//Array with questions

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
        answer: [false],
    },
    {
        image:"/Assets/gita.avif",
        question: "Vilken gud slåss vid Arjunas sida på stridsvagnen i Bhagavad Gita?",
        type: "mc",
        answer: ["a"],
        choice: ["Krishna", "Hanuman", "Ganesha", "Lakshmi"],
    },
    {
        image:"/Assets/pan.avif",
        question: "Guden Pan syns ofta spelandes vilket instrument?",
        type: "mc",
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

//Selectors for answer inputs and forms (content is set in later functionality)
let answerInputs;
let labelForms;

//Game functionality ->

//Variables for storing index, copy of questions array, arr for colleecting answers, and scorekeeper.
let q;
let questionsCopy;
let answerArr = [];
let score = 0;

//Function for creating answer inputs
let createAnswerAlts = () => {

    //Global Code for all types of answers
    let div = document.createElement("div");
    let p = document.createElement("p");
    div.appendChild(p);
    div.className = "answer-alternatives";

    //If question type is: True or False
    if(questionsCopy[q].type === "tf"){
        div.id = "answer-alternativesA";
        p.textContent = "Sant eller Falskt?";

        let trueFalseLabels = ["Sant", "Falskt"];
        trueFalseLabels.forEach( (labelText, index) => {

            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.id = "tf-" + (index === 0 ? "a" : "b");
            radioButton.name = "tf";
            radioButton.value = index === 0 ? "true" : "false";

            let label = document.createElement("label");
            label.htmlFor = "tf-" + (index === 0 ? "a" : "b");
            label.textContent = labelText;

            div.appendChild(radioButton);
            div.appendChild(label);
        });
    }

    //If questions type is: Multiple Choice
    else if(questionsCopy[q].type === "mc"){
        div.id = "answer-alternativesB";
        p.textContent = "Vilket svar är rätt?";

        let radioButtons = ["a", "b", "c", "d"];
        radioButtons.forEach(function (value) {

            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.id = "mc-" + value;
            radioButton.name = "mc";
            radioButton.value = value;

            var label = document.createElement("label");
            label.htmlFor = "mc-" + value;

            div.appendChild(radioButton);
            div.appendChild(label);
        });
    }

    //If questions type is: Checkbox
    else if(questionsCopy[q].type === "cb"){
        div.id = "answer-alternativesC";
        p.textContent = "Vilka svar är rätt?";

        let checkboxes = ["a", "b", "c", "d"];

        checkboxes.forEach(function (value) {

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "cb-" + value;
        checkbox.name = "cb";
        checkbox.value = value;

        let label = document.createElement("label");
        label.htmlFor = "cb-" + value;

        div.appendChild(checkbox);
        div.appendChild(label);
        });
    }

    answerSection.appendChild(div);

    labelForms = [...document.querySelectorAll("label")];
    for(let i = 0; i<labelForms.length; i++){
        if(questionsCopy[q].type != "tf"){
            labelForms[i].innerText = questionsCopy[q].choice[i];
        } else{
            labelForms[0].innerText = "True";
            labelForms[1].innerText = "False";
        }
    }
}

//Generate a question
let generateQuestion = () =>{
    answerSection.innerHTML = "";
    answerArr = [];
    q = Math.floor(Math.random() * questionsCopy.length);

    questionImage.src = questionsCopy[q].image;
    questionText.innerText = questionsCopy[q].question;
    
    createAnswerAlts();
    answerInputs = [...document.querySelectorAll(`[name = ${questionsCopy[q].type}]`)];
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
    } else(alert("oh nooes!"));

    questionsCopy.splice(q, 1);
    generateQuestion();
});
