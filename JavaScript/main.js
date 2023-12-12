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
        question: "Myten om Regnbågsormen härstammar bla. från Aboriginerna i Australien.",
        type: "tf",
        answer: [true],
    },
    {
        image:"/Assets/hebrew.avif",
        question: "Vem delade på det röda havet?",
        type: "mc",
        answer: ["b"],
        choice: ["Daniel", "Moses", "Noah", "Pharaoh"],
    },
    {
        image:"/Assets/apple.avif",
        question: "Vilken grekisk gudinna skapade kaos på gudabröllop med sitt gyllene äpple?",
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
        question: "Vilken gud slåss vid Arjunas sida i Kurukshetra kriget?",
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

//Selectors
const startBtn = document.querySelector("#start-game__btn");
const startArea = document.querySelector("#start-area");
const darkModeBtn = document.querySelector("#dark-mode__btn");

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

//Selectors for answer inputs and labels (content is set in later functionality)
let answerInputs;
let labelForms;

//Game functionality --->

//Variable for storing index, copy of questions array, array for colleecting answers, and scorekeeper variable.
let q;
let questionsCopy = [];
let answerArr = [];
let score = 0;

//Arrays for collecting rightly and wrongly answered questions
let correctAnswer = [];
let wrongAnswer = [];

//Function for creating answer inputs
let createAnswerAlts = () => {
    //Global code for all types of answers
    let div = document.createElement("div");
    div.className = "answer-alternatives";
    let label = document.createElement("label");

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

            let label = document.createElement("label");
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

    //Append
    answerSection.appendChild(div);

    //Set text for answer input labels
    labelForms = [...document.querySelectorAll("label")];
    for(let i = 0; i<labelForms.length; i++){
        if(questionsCopy[q].type != "tf"){
            labelForms[i].innerText = questionsCopy[q].choice[i];
        } else{
            labelForms[0].innerText = "Sant";
            labelForms[1].innerText = "Falskt";
        }
    }
}

//Function for generating a question
let generateQuestion = () =>{
    answerSection.innerHTML = "";
    answerArr = [];

    //Get a random index (for quiz order randomisation)
    q = Math.floor(Math.random() * questionsCopy.length);

    questionImage.src = questionsCopy[q].image;
    questionText.innerText = questionsCopy[q].question;
    
    //Create Answer alternatives and save the store coresponding selectors
    createAnswerAlts();
    answerInputs = [...document.querySelectorAll(`[name = ${questionsCopy[q].type}]`)];
}

//Function for generating seting colors, for correct and faulty answers
let colorCorrectAnswer = ()=> {
    //Collect the id for each input with correct answer
    let idArr = [];
    answerInputs.forEach((input)=>{
        if(questionsCopy[q].answer.includes(input.value)){
            idArr.push(input.id);
        }

        let stringAnswers = questionsCopy[q].answer.map((answer) => answer.toString());
        if (stringAnswers.includes(String(input.value))) {
            idArr.push(input.id);
        }
    })

    //Set the label colors depending on collected id's
    labelForms.forEach((form)=>{
        if(idArr.includes(form.getAttribute("for"))){
            form.style.backgroundColor = "var(--correct)";
        } else{
            form.style.backgroundColor = "var(--wrong)";
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

//Function for creating and displaying the quiz results
let showResult = ()=>{
    //Correct Answers
    let correct = document.createElement("ul");
    correct.textContent = "RÄTT" + " - " + ((score / questions.length) * 100) + "%";
    
    correctAnswer.forEach((object)=>{
        let question = document.createElement("li");
        question.textContent = object.question;
        correct.append(question);
    })

    //Wrong answers
    let wrong = document.createElement("ul");
    wrong.textContent = "FEL" + " - " + (questions.length - score) / questions.length * 100 + "%";
    wrongAnswer.forEach((object)=>{
        let question = document.createElement("li");
        question.textContent = object.question;
        wrong.append(question);
    })

    //Append
    resultDisplay.append(correct, wrong);
    resultDisplay.classList.remove("displayNone");
}

//Function for setting color variables (used for Dark Mode)
let setColors = () => {
    root.style.setProperty('--correct', '#359035');
    root.style.setProperty('--wrong', '#d63737');
    root.style.setProperty('--yellow', '#f9f94e');
    
    if (document.body.classList.contains("darkMode")) {
        root.style.setProperty('--bg', '#222222');
        root.style.setProperty('--text', '#FFFFFF');
        root.style.setProperty('--h1', '#FFD700');
        root.style.setProperty('--c1', '#483D8B');
        root.style.setProperty('--c2', '#8c6c41;');
        root.style.setProperty('--c3', '#4f330e');
    } else {
        root.style.setProperty('--bg', '#ede1b9');
        root.style.setProperty('--text', '#222222');
        root.style.setProperty('--h1', '#6a5a2e');
        root.style.setProperty('--c1', '#483D8B');
        root.style.setProperty('--c2', '#8c6c41');
        root.style.setProperty('--c3', '#8fa0b2');
    }
}

//Set color theme on page load
setColors();

//Start Game
startBtn.addEventListener("click", ()=>{
    //Create Question
    questionsCopy = questions.slice();
    generateQuestion();

    //Display functionality
    startArea.classList.add("displayNone");
    setTimeout(()=>{
        gameArea.classList.remove("displayNone");
    }, "1200");
})

//Answer question
commitBtn.addEventListener("click", () => {
    //Disable overclicking
    document.body.classList.add("disableClick");
    setTimeout(()=>{
        document.body.classList.remove("disableClick");  
    }, 1200)

    //Collect answers
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
        correct.style.backgroundColor = "var(--correct)";
        messageDisplay.append(correct);
    }

    //If the answer is wrong
    else{
        wrongAnswer.push(questionsCopy[q]);
        let wrong = document.createElement("h2");
        wrong.textContent = "FEL!";
        wrong.style.backgroundColor = "var(--wrong)";
        messageDisplay.append(wrong);
    };

    //Show Answer
    colorCorrectAnswer();
    messageDisplay.classList.remove("displayNone");

    //Delete question
    questionsCopy.splice(q, 1);

    //If the quiz is over then show grades
    if(questionsCopy.length === 0){
        //Display functionality
        document.body.classList.add("disableClick");
        setTimeout(()=>{
            messageDisplay.innerHTML = "";
            messageDisplay.classList.add("displayNone");
        },1200)
        
        //Show grade
        setTimeout(()=>{
            let grade = document.createElement("h2");
            if((score / questions.length) * 100 < 50){
                grade.textContent = "IG!";
                grade.style.backgroundColor = "var(--wrong)";
            }
            
            else if((score / questions.length) * 100 >= 50 && (score / questions.length) * 100 < 75){
                grade.textContent = "G!";
                grade.style.backgroundColor = "var(--yellow)";
            } 

            else{
                grade.textContent = "VG!";
                grade.style.backgroundColor = "var(--correct)";
            }

            messageDisplay.append(grade);
            messageDisplay.classList.remove("displayNone");
        },1800)

        //Show Result
        setTimeout(()=>{
            showResult();
            document.body.classList.remove("disableClick");
        },4800)
    } 

    //If the quiz is not over, then generate next question
    else{
        setTimeout(()=>{
            messageDisplay.classList.add("displayNone");
            generateQuestion();
            messageDisplay.innerHTML = "";
        },1200)
    }
});

//Enable Dark Mode
darkModeBtn.addEventListener("click", ()=>{
    //Alter Dark Mode Icon
    darkModeBtn.firstChild.classList.toggle("displayNone");
    darkModeBtn.lastChild.classList.toggle("displayNone");

    //Toggle Mode 
    document.body.classList.toggle("darkMode");
    setColors();
});

//Restart the Game
resetGameBtn.addEventListener("click", ()=>{
    resetGame();
    resultDisplay.classList.add("displayNone");
    messageDisplay.classList.add("displayNone");
})






