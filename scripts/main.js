let questions = document.getElementById("currentQuestion");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = ["age", "gender", "race", "height", "weight", "state", "diabetes", "smoking", "cholesterol", "excercise"];
let answers = {age: "", gender: "", "race": "", height: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: "" };
let index = -1;

backButton.style.opacity = 0;

function getValue(index) {
    let value;
    let element= document.getElementById(questionsList[index]);

    // if () 
    // {}


    return value;
}

function backQuestion() {

    if (index > 0) {
        index--;
        questions.innerHTML = "";
        
        let current = questionsList[index];
        answers.current = document.getElementById(current);
        

        questions.appendChild(document.getElementById(current).cloneNode(true));

        if (index === 0) {
            backButton.style.opacity = 0;
        }

        nextButton.innerHTML = "Next Question";
    }
};

function nextQuestion() {
    
    if (index < (questionsList.length - 1)) {
        
        try {
            let current = questionsList[index];
            
            answers.current = document.getElementById(current).value;
    
            questions.innerHTML = "";
        }
        catch (e) { console.log(e); }

        index++;
        questions.innerHTML = "";

        //Gets one question from questions list based on the index.
        //This prevents a lot of declarations at the top of the file.
        //We clone the node because if we don't, the element is deleted and cannot be used again.
        questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
        
        if (index === questionsList.length - 1) {
            nextButton.innerHTML = "Submit";
            nextButton.addEventListener('click', infoSubmit)
        }
        
        backButton.style.opacity = 1;
    }
};


function infoSubmit() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let race = document.getElementById("race").value;
    let gender = document.getElementById("gender").value;
    let state = document.getElementById("state").value;
    
    console.log(name, age, race, gender, state);
};

