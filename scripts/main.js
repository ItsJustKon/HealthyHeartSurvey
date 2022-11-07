let questions = document.getElementById("currentQuestion");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = ["age", "gender", "race", "feet", "inches", "weight", "state", "diabetes", "smoking", "cholesterol", "excercise"];
let answers = {age: "", gender: "", "race": "", feet: "", inches: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: ""};
let index = -1;


function storeValue(index) {
    if (index != -1) {
        answers[questionsList[index]] = document.getElementById(questionsList[index]).value;
    }
}

function backQuestion() {
    if (index > 0) {
        storeValue(index);

        index--;
        questions.innerHTML = "";
        
        if (index === 3) {
            questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
            questions.appendChild(document.getElementById(questionsList[index + 1]).cloneNode(true));
            index++;
        }
        else {
            questions.appendChild(document.getElementById(questionsList[index]).cloneNode(true));
        }
        
        if (index === 0) 
        { backButton.style.opacity = 0; }

        nextButton.innerHTML = "Next Question";
    }
};

function nextQuestion() {
    
    if (index < (questionsList.length - 1)) {
        storeValue(index);
        
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
    console.log(answers);

    //Send a POST request to localhost://8080 with all of the answers included as a form.
};

backButton.style.opacity = 0;
nextQuestion();