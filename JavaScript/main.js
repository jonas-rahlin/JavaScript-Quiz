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
        question: "Vilken grekisk gudinna skapade kaos på gudafest med sitt gyllende äpple?",
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

// Selectors Main Section
const startArea = document.querySelector("#start-area");

const darkModeBtn = document.querySelector("#dark-mode__btn");
const startBtn = document.querySelector("#start-game__btn");

const gameArea = document.querySelector("#game-area");

const questionSection = document.querySelector("#question");
const questionImage = document.querySelector("#question__img");
const questionText = document.querySelector("#question__p");

const answerSection = document.querySelector("#answer");
const commitBtn = document.querySelector("#commit-answer__btn");

const resetGameBtn = document.querySelector("#reset-game__btn");

const messageDisplay = document.querySelector("#message-display");
const resultDisplay = document.querySelector("#result-display");

const root = document.documentElement;

//Selectors for answer inputs and forms (content is set in later functionality)
let answerInputs;
let labelForms;

//Game functionality ->

//Variables for storing index, copy of questions array, arr for colleecting answers, and scorekeeper.
let q;
let questionsCopy = [];
let answerArr = [];
let score = 0;

//Arrays for collecting rightly and wrongly answered questions
let wrongAnswer = [];
let correctAnswer = [];

//Function for creating answer inputs
let createAnswerAlts = () => {

    //Global Code for all types of answers
    let div = document.createElement("div");
    div.className = "answer-alternatives";

    //If question type is: True or False
    if(questionsCopy[q].type === "tf"){
        div.id = "answer-alternativesA";

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

//Function for generating a question
let generateQuestion = () =>{
    answerSection.innerHTML = "";
    answerArr = [];
    q = Math.floor(Math.random() * questionsCopy.length);

    questionImage.src = questionsCopy[q].image;
    questionText.innerText = questionsCopy[q].question;
    
    createAnswerAlts();
    answerInputs = [...document.querySelectorAll(`[name = ${questionsCopy[q].type}]`)];
}

//Function for generating colors for correct and faulty answers
let colorCorrectAnswer = ()=> {
    let idArr = [];
    answerInputs.forEach((input)=>{
        if(questionsCopy[q].answer.includes(input.value)){
            idArr.push(input.id);
        }
    })

    answerInputs.forEach((input) => {
        let stringAnswers = questionsCopy[q].answer.map((answer) => answer.toString());
    
        if (stringAnswers.includes(String(input.value))) {
            idArr.push(input.id);
        }
    });

    labelForms.forEach((form)=>{
        if(idArr.includes(form.getAttribute("for"))){
            form.style.backgroundColor = "green";
        } else{
            form.style.backgroundColor = "red";
        }
    })
}

//Function for restarting the Game
let resetGame = ()=>{
    questionsCopy = [];
    answerArr = [];
    score = 0;
    wrongAnswer = [];
    correctAnswer = [];

    answerSection.innerHTML = "";
    startArea.classList.remove("displayNone");
    gameArea.classList.add("displayNone");
}

//Function for displaying the result on screen
let showResult = ()=>{
    let right = document.createElement("ul");
    right.textContent = "RÄTT";
    correctAnswer.forEach((object)=>{
        let question = document.createElement("li");
        question.textContent = object.question;
        right.append(question);
    })

    let wrong = document.createElement("ul");
    wrong.textContent = "FEL";
    wrongAnswer.forEach((object)=>{
        let question = document.createElement("li");
        question.textContent = object.question;
        wrong.append(question);
    })

    resultDisplay.append(right, wrong);
    resultDisplay.classList.remove("displayNone");
}

//Function for setting color variables
let setColors = () => {
    if(document.body.classList.contains("darkMode")){
        root.style.setProperty('--bg', '#000000');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--h1', '#8fa0b2');
        root.style.setProperty('--c1', '#c63f3f');
        root.style.setProperty('--c2', '#29337f');
        root.style.setProperty('--c3', '#5b7f29');
    }
    else{
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--text', '#000000');
        root.style.setProperty('--h1', '#8fa0b2');
        root.style.setProperty('--c1', '#c63f3f');
        root.style.setProperty('--c2', '#29337f');
        root.style.setProperty('--c3', '#5b7f29');
    }
}

//Set color theme
setColors();

//Start Game
startBtn.addEventListener("click", ()=>{
    questionsCopy = questions;
    generateQuestion();

    startArea.classList.add("displayNone");

    setTimeout(()=>{
        gameArea.classList.remove("displayNone");
    }, "1200");
})

//Answer question
commitBtn.addEventListener("click", () => {
    //If there are no questions left
    if(questionsCopy.length === 1){
            showResult();
    }

    //If there is more questions left
    else{
        answerInputs.forEach((input) => {
            if (input.checked === true) {
                answerArr.push(input.value);
            }
        });
    
        //If the answer is correct
        if(answerArr.toString() === questionsCopy[q].answer.toString()){
            score ++;
            correctAnswer.push(questionsCopy[q]);
            let correct = document.createElement("h2");
            correct.textContent = "RÄTT!";
            messageDisplay.append(correct);
        }
    
        //If the answer is wrong
        else{
            wrongAnswer.push(questionsCopy[q]);
            let wrong = document.createElement("h2");
            wrong.textContent = "FEL!";
            messageDisplay.append(wrong);
        };
    
        colorCorrectAnswer();
    
        messageDisplay.classList.remove("displayNone");
    
        questionsCopy.splice(q, 1);
    
        setTimeout(()=>{
            messageDisplay.classList.add("displayNone");
            generateQuestion();
            messageDisplay.innerHTML = "";
        },1200)
    }
});

//Enable Dark Mode
darkModeBtn.addEventListener("click", ()=>{
    darkModeBtn.firstChild.classList.toggle("displayNone");
    darkModeBtn.lastChild.classList.toggle("displayNone");
    document.body.classList.toggle("darkMode");
    setColors();
});

//Restart the Game
resetGameBtn.addEventListener("click", ()=>{
    resetGame();
})






