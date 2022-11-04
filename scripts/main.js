let name = document.getElementById("name");
let indicator = document.getElementById("indicator");
let questions = document.getElementById("currentQuestion");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = ["age", "gender", "race", "height", "weight", "state", "diabetes", "smoking", "cholesterol", "excercise"];

//4459 is the default for our answer fields because I like that number
let answers = { "age": 4459, "gender": "4459", "race": "4459", "heightft": 4459, "heightin": 4459, "weight": 4459, 
                "state": "4459", "diabetes": "4459", "smoking": "4459", "cholesterol": "4459", "excercise": "4459"};

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

        if (index === questionsList.length - 1) {
            nextButton.innerHTML = "Submit";
            nextButton.addEventListener('click', sumbitInfo());
        }

        backButton.style.opacity = 1;
    }
};


function sumbitInfo() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let race = document.getElementById("race").value;
    let gender = document.getElementById("gender").value;
    let state = document.getElementById("state").value;

    console.log("Submitted!");

    let res = axios({
        method: 'POST',
        url: 'http://localhost:8080',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: {
            "name": name,
            "age": age,
            "race": race,
            "gender": gender,
            "state": state
        }
    });

    console.log(res.data);
};

