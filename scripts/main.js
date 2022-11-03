// tbh you can just set up a sever or whatever you did kinda like what you did with leostats
// and just convert the csv to json and store it please Kingston
let name = document.getElementById("name");
let indicator = document.getElementById("indicator");
let questions = document.getElementById("currentQuestion");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = ["age", "gender", "race", "height", "weight", "state", "diabetes", "smoking", "cholesterol", "excercise"];
let index = -1;

backButton.style.opacity = 0;

function backQuestion() {

    if (index > 0) {
        index--;
        questions.innerHTML = "";

        questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));

        if (index === 0) {
            backButton.style.opacity = 0;
        }

        nextButton.innerHTML = "Next Question";
    }
};

function nextQuestion() {
    
    if (index < (questionsList.length - 1)) {
        index++;
        questions.innerHTML = "";

        //Gets one question from questions list based on the index.
        //This prevents a lot of declarations at the top of the file.
        //We clone the node because if we don't, the element is deleted and cannot be used again.
        questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
        
        //I'm assuming that we will have 12 questions.
        if (index === questionsList.length - 1) {
            nextButton.innerHTML = "Submit";
        }
        
        backButton.style.opacity = 1;
    }
};


function infosubmit() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let race = document.getElementById("race").value;
    let gender = document.getElementById("gender").value;
    let state = document.getElementById("state")
    let indicator = document.getElementById("indicator").value;
    console.log(`your name is ${name}`);
};

