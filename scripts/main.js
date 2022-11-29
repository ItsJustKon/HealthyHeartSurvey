let questions = document.getElementById("currentQuestion");
let labels = document.getElementById("currentLabel");
let labelsList = document.getElementById("labelsList");
let backButton = document.getElementById("backButton");
let nextButton = document.getElementById("nextButton");
let questionsList = document.getElementById("questions");
let answers = { age: "", sex: "", heightFt: "", heightIn: "", weight: "", state: "", diabetes: "", smoking: "", cholesterol: "", excercise: "" };
let index = -1;
let risk = 0;
let BMI = 0;

async function recallValues() {
	//Checks if a question has already been answered;
	//If it has, update the answer field to have the saved answer.
	let answerindex = index;
	console.log(index);
	if(index >= 2)
	{
		answerindex = index + 1;
	}
	if (Object.values(answers)[answerindex] != "") {
		questions.childNodes[0].value = Object.values(answers)[answerindex];
		if (index === 2) {
			questions.childNodes[0].value = answers["heightFt"];
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
		if (index === 2) {
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

function renderRisk() {
	let recHead = document.getElementById("RecomendationHeader");
	let percentage = document.getElementById("percentage");
	
	document.getElementById("recomendations_list").innerHTML = "";

	if(risk < 40)
	{
		percentage.className = "green";
		recHead.innerText = "You are healthy and have a low chance of getting heart diease";
	} else if(risk > 40 && risk < 130) {
		percentage.className = "yellow";
		recHead.innerText = "You are at a moderate risk of getting heart diease";
	} else if(risk > 130) {
		percentage.className = "red";
		recHead.innerText = "You are at a severe of getting heart diease";
	}
}

function updateQuestion() {
	//Gets one question from questions list based on the index.
	//This prevents a lot of declarations at the top of the file.
	//We clone the node because if we don't, the element is deleted and cannot be used again.
	if (index === 2) {
		questions.appendChild(document.getElementById("feet").cloneNode(true));
		questions.appendChild(document.getElementById("inches").cloneNode(true));
	} else {
		questions.appendChild(questionsList.children[index].cloneNode(true));
	}

	labels.appendChild(labelsList.children[index].cloneNode(true));
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
		if (index === 0) {
			hideBackButton();
		}
	}
}

function nextQuestion() {
	if (index < (questionsList.children.length - 1)) {
		storeValue(index);

		index++;
		
		wipeQuestions();
		updateQuestion();
		recallValues();
		revealBackButton();
		
		if (index === questionsList.children.length - 1) {
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
		while (age > 0) {
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
	renderRisk();

	
	document.getElementById("percentage_label").innerText = "Your heart disease risk factor is";
	document.getElementById("RecomendationsLabel").innerText = "Recomendations:";
	
	let percentage = document.getElementById("percentage");
	percentage.innerText = risk;

	if(BMI < 18.5 || BMI > 25.9)
	{
		addAnchor("A basic plan on healthy eating",
			"https://www.heartandstroke.ca/healthy-living/healthy-eating/healthy-eating-basics");
	}

	if(answers.smoking === "Yes")
	{
		addAnchor("Ways to help you quit smoking", 
			"https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html");
	}

	if(answers.cholesterol === "Yes")
	{
		addAnchor("Try these things to lower your cholesterol", 
			"https://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/in-depth/reduce-cholesterol/art-20045935");
	}

	if(answers.excercise === "No")
	{ 
		addAnchor("Try a beginner excercise routine", 
			"https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/fitness/art-20048269#:~:text=Start%20slowly%20and%20build%20up,amount%20of%20time%20you%20exercise"); 
	}
}

hideBackButton();

backButton.addEventListener("click", backQuestion);
nextButton.addEventListener("click", nextQuestion);

nextQuestion();