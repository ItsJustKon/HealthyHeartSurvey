let questions = document.getElementById("currentQuestion");
let labels = document.getElementById("currentLabel");
let labelsList = document.getElementById("labelsList");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = document.getElementById("questions");
let answers = { age: "", gender: "", race: "", heightFt: "", heightIn: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: "" };
let index = -1;

async function recallValues() {
	if (Object.values(answers)[index] != "") {
		questions.childNodes[0].value = Object.values(answers)[index];
		if (index === 3) {
			questions.childNodes[1].value = answers["heightIn"];
		}
	}
}

async function hideBackButton() {
	backButton.style.opacity = 0;
}

async function revealBackButton() {
	backButton.style.opacity = 1;
}

function storeValue(index) {
	if (index != -1) {
		if (index === 3) {
			answers["heightFt"] = `${document.getElementById("feet").value}`;
			answers["heightIn"] = `${document.getElementById("inches").value}`;
		}
		else {
			answers[questionsList.children[index].id] = document.getElementById(questionsList.children[index].id).value;
		}
	}
}

async function nextToSubmit() {
	nextButton.innerHTML = "Submit";
	nextButton.addEventListener("click", infoSubmit);
}

async function submitToNext() {
	nextButton.innerHTML = "Next Question";
	nextButton.removeEventListener("click", infoSubmit);
}

function wipeQuestions() {
	questions.innerHTML = "";
	labels.innerHTML = "";
}

function updateQuestion() {
	//Gets one question from questions list based on the index.
	//This prevents a lot of declarations at the top of the file.
	//We clone the node because if we don't, the element is deleted and cannot be used again.
	if (index === 3) {
		questions.appendChild(document.getElementById("feet").cloneNode(true));
		questions.appendChild(document.getElementById("inches").cloneNode(true));
	} else {
		questions.appendChild(questionsList.children[index].cloneNode(true));
	}

	labels.appendChild(labelsList.children[index].cloneNode(true));
}



function backQuestion() {
	if (index > 0) {
		storeValue(index);
		
		index--;
		
		wipeQuestions();
		updateQuestion();
		hideBackButton();
		recallValues();
		submitToNext();
		
	}
}

function nextQuestion() {
	if (index < (questionsList.children.length - 1)) {
		storeValue(index);

		index++;
		
		wipeQuestions();
		updateQuestion();
		revealBackButton();
		
		if (index === questionsList.children.length - 1) {
			nextToSubmit();
		}
	}
}

async function infoSubmit() {
	console.log(answers);
}

hideBackButton();
backButton.addEventListener("click", backQuestion);
nextButton.addEventListener("click", nextQuestion);

nextQuestion();