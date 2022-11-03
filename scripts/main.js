// tbh you can just set up a sever or whatever you did kinda like what you did with leostats
// and just convert the csv to json and store it please Kingston
let name = document.getElementById("name");
let indicator = document.getElementById("indicator");
let questions = document.getElementById("currentQuestion");
let backbutton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = ["age", "gender", "race", "height", "weight", "state"];
let index = -1;

//backbutton.style.display = "none";

function backQuestion() {

    if (index > 0) {
        index--;
        questions.innerHTML = "";

        questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
    }
};

function nextQuestion() {
    
    //Change this number when we add more questions.
    if (index <= 5) {
        index++;
        questions.innerHTML = "";

        //Gets one question from questions list based on the index.
        //This prevents a lot of declarations at the top of the file.
        //We clone the node because if we don't, the element is deleted and cannot be used again.
        questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
        
        //I'm assuming that we will have 12 questions.
        if (index === 12) {
            nextButton.innerHTML = "Submit";
        }

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

