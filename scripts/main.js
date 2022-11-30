let answers = { age: "", sex: "", heightFt: "", heightIn: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: "" };
let index = -1;
let risk = 0;
let BMI = 0;

async function recallValues() {
	//Checks if a question has already been answered;
	//If it has, update the answer field to have the saved answer.
	let answerindex = index;
	if(index >= 2)
	{
		answerindex = index + 1;
	}
	if (Object.values(answers)[answerindex] != "") {
		window.questions.childNodes[0].value = Object.values(answers)[answerindex];
		if (index === 2) {
			window.questions.childNodes[0].value = answers["heightFt"];
			window.questions.childNodes[1].value = answers["heightIn"];
		}
	}
}

async function revealBackButton() {
	window.backButton.style.opacity = 1;
}

function storeValue(index) {
	if (index != -1) {
		if (index === 2) {
			answers["heightFt"] = `${document.getElementById("feet").value}`;
			answers["heightIn"] = `${document.getElementById("inches").value}`;
		}
		else {
			answers[window.questionsList.children[index].id] = document.getElementById(window.questionsList.children[index].id).value;
		}
	}
}

async function nextToSubmit() {
	window.nextButton.innerHTML = "Submit";
	window.nextButton.addEventListener("click", infoSubmit);
}

async function submitToNext() {
	window.nextButton.innerHTML = "Next Question";
	window.nextButton.removeEventListener("click", infoSubmit);
}

function wipeQuestions() {
	window.questions.innerHTML = "";
	window.labels.innerHTML = "";
}

function renderRisk() {
	let recHead = document.getElementById("RecomendationHeader");	
	document.getElementById("recomendations_list").innerHTML = "";

	if(risk < 40)
	{
		recHead.innerText = "Congraulations! Your risk factor is very low.";
	} else if(risk > 40 && risk < 130) {
		recHead.innerText = "Your risk factor is moderate - consider following some of the recommendations below.";
	} else if(risk > 130) {
		recHead.innerText = "Your risk factor is high! You are at high relative risk. Improve it by following some of the recommentations below.";
	}
}

function updateQuestion() {
	//Gets one question from questions list based on the index.
	//This prevents a lot of declarations at the top of the file.
	//We clone the node because if we don't, the element is deleted and cannot be used again.
	if (index === 2) {
		window.questions.appendChild(document.getElementById("feet").cloneNode(true));
		window.questions.appendChild(document.getElementById("inches").cloneNode(true));
	} else {
		window.questions.appendChild(window.questionsList.children[index].cloneNode(true));
	}

	window.labels.appendChild(window.labelsList.children[index].cloneNode(true));
}

function addAnchor(text, link) {
	let a = document.createElement("a");
	let newline = document.createElement("br");
	a.text = text;
	a.href = link;
	a.className = "recAnchor";
	document.getElementById("recomendations_list").appendChild(a);
	document.getElementById("recomendations_list").appendChild(newline);
}

function backQuestion() {
	if (index > 0) {
		storeValue(index);
		
		index--;
		
		wipeQuestions();
		updateQuestion();
		recallValues();
		submitToNext();
	}
}

function nextQuestion() {
	if (index < (window.questionsList.children.length - 1)) {
		storeValue(index);

		index++;
		
		wipeQuestions();
		updateQuestion();
		recallValues();
		revealBackButton();
		
		if (index === window.questionsList.children.length - 1) {
			nextToSubmit();
		}
	}
}

async function infoSubmit() {
	storeValue(index);
	console.log(answers);
	let riskVal = 0;
	let onePoint = 20;
	
	//Formula to calculate BMI
	let height = (answers.heightFt * 12) + parseInt(answers.heightIn);
	BMI = 703 * (parseInt(answers.weight) / (height * height));

	//Add a point if...
	//BMI is in an unhealthy range
	BMI < 18.5 || BMI > 25.9 ? riskVal += onePoint : null;
	console.log(`Risk Factor post BMI: ${riskVal}`);
	//They are a regular smoker
	answers.smoking === "Yes" ? riskVal += onePoint : null;
	console.log(`Risk Factor post Smoking: ${riskVal}`);
	//They have high cholesterol
	answers.cholesterol === "Yes" ? riskVal += onePoint : null;
	console.log(`Risk Factor post Cholesterol: ${riskVal}`);
	//They smoke regularly
	answers.diabetes === "Yes" ? riskVal += onePoint : null;
	console.log(`Risk Factor post Diabetes: ${riskVal}`);
	//They do not get enough excercise
	answers.excercise === "No" ? riskVal += onePoint : null;
	console.log(`Risk Factor post Excercise: ${riskVal}`);

	//Males contract heart disease at a rate rougly 41.5% more than Females.
	answers.sex === "Male" ? riskVal = riskVal * 1.415 : null;
	console.log(`Risk Factor post Sex: ${riskVal}`);

	
	//Add 15% to risk factor for every 20 years of age.
	let ageRisk = 0;
	let age = answers.age;
	if (age > 20) {
		while (age >= 0) {
			age -= 20;
			ageRisk += 0.15;
		}
	}
	console.log(`Age Risk: ${ageRisk}`);
	riskVal = riskVal * (1 + ageRisk);
	console.log(`Final Risk Value: ${riskVal}`);

	risk = riskVal;
	displayResults();
}

function displayResults()
{
	const container = document.getElementById("resultsContainer");
	container.style.marginTop = "50px";
	container.style.opacity = "1";

	wipeQuestions();
	window.backButton.remove();
	window.nextButton.remove();
	renderRisk();

	
	document.getElementById("percentage_label").innerText = "Your heart disease risk factor is";
	document.getElementById("RecomendationsLabel").innerText = "Recomendations:";
	
	let percentage = document.getElementById("percentage");
	percentage.innerText = Math.ceil(risk) + " / 248";

	if(BMI < 18.5 || BMI > 25.9)
	{
		addAnchor("Be mindful of the way you eat.",
			"https://www.cdc.gov/healthyweight/healthy_eating/index.html");
	}

	if(answers.smoking === "Yes")
	{
		addAnchor("Cigarette addiction can be tough - but today could be the day you quit.", 
			"https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html");
	}

	if(answers.cholesterol === "Yes")
	{
		addAnchor("Be mindful of your cholesterol levels.", 
			"https://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/in-depth/reduce-cholesterol/art-20045935");
	}

	if(answers.excercise === "No")
	{ 
		addAnchor("Get Active! Activity has a huge impact on health.", 
			"https://health.gov/moveyourway"); 
	}
}

window.addEventListener("DOMContentLoaded", () => {
	window.questions = document.getElementById("currentQuestion");
	window.labels = document.getElementById("currentLabel");
	window.labelsList = document.getElementById("labelsList");
	window.backButton = document.getElementById("backButton");
	window.nextButton = document.getElementById("nextButton");
	window.questionsList = document.getElementById("questions");
	
	window.backButton.addEventListener("click", backQuestion);
	window.nextButton.addEventListener("click", nextQuestion);

	nextQuestion();
});