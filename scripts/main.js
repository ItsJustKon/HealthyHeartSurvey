let questions = document.getElementById("currentQuestion");
let labels = document.getElementById("currentLabel")
let labelsList = document.getElementById("labelsList")
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = document.getElementById("questions")
let answers = {age: "", gender: "", race: "", heightFt: "", heightIn: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: ""};
let index = -1;

function storeValue(index) {
    if (index != -1) {
        if (index === 3)
        {
            answers["heightFt"] = `Feet:${document.getElementById("feet").value}`
            answers["heightIn"] = `${document.getElementById("inches").value}`
        }
        else
        {
            answers[questionsList.children[index].id] = document.getElementById(questionsList.children[index].id).value;
        }
    }
}

function backQuestion() {
    if (index > 0) {
        storeValue(index);

        index--;
        questions.innerHTML = "";
        labels.innerHTML = ""
        
        if (index === 3) {
            questions.appendChild(document.getElementById("feet").cloneNode(true));
            questions.appendChild(document.getElementById("inches").cloneNode(true));
        }
        else {
            questions.appendChild(questionsList.children[index].cloneNode(true));
        }
        
        labels.appendChild(labelsList.children[index].cloneNode(true))
        
        if (index === 0) 
        { backButton.style.opacity = 0; }

        nextButton.innerHTML = "Next Question";
        nextButton.removeEventListener('click', infoSubmit)
    }
};

function nextQuestion() {
    if (index < (questionsList.children.length - 1)) {
        storeValue(index);
        
        index++;
        questions.innerHTML = "";
        labels.innerHTML = ""
        
        //Gets one question from questions list based on the index.
        //This prevents a lot of declarations at the top of the file.
        //We clone the node because if we don't, the element is deleted and cannot be used again.
        if (index === 3) {
            questions.appendChild(document.getElementById("feet").cloneNode(true));
            questions.appendChild(document.getElementById("inches").cloneNode(true));
        }
        else {
            questions.appendChild(questionsList.children[index].cloneNode(true));
        }
        labels.appendChild(labelsList.children[index].cloneNode(true))
        
        if (index === questionsList.children.length - 1) {
            nextButton.innerHTML = "Submit";
            nextButton.addEventListener('click', infoSubmit)
        }

        backButton.style.opacity = 1;
        
    }
};
//let answers = {age: "", gender: "", race: "", heightFt: "", heightIn: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: ""};

async function infoSubmit() {
    console.log(answers);

    //Send a POST request to localhost://8080 with all of the answers included as a form.
    let res = await axios.post("http://localhost:8080", {
        age: answers.age,
        gender: answers.gender,
        race: answers.race,
        heightFt: answers.heightFt,
        heightIn: answers.heightIn,
        weight: answers.weight,
        state: answers.state,
        diabetes: answers.diabetes,
        smoking: answers.smoking,
        cholesterol: answers.cholesterol,
        excercise: answers.excercise
    })
    .then(function (res) {console.log(res.data);})
    .catch(function (err) {console.log(err);});


};

backButton.style.opacity = 0;
nextQuestion();