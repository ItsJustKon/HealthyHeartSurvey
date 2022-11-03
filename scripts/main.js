// tbh you can just set up a sever or whatever you did kinda like what you did with leostats
// and just convert the csv to json and store it please Kingston
let namediv = document.getElementById("name");
let agediv = document.getElementById("age");
let racediv = document.getElementById("race");
let genderdiv = document.getElementById("gender");
let statediv = document.getElementById("state");
let indicatordiv = document.getElementById("indicator");
let questionsdiv = document.getElementById("currentquestion");
let backbutton = document.createElement("backButton");
let nextButton = document.getElementById("nextButton");
let obejectsarray = [namediv, agediv, racediv, genderdiv, statediv, indicatordiv];
let index = 1;

backbutton.style.display = "none";
function infosubmit() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let race = document.getElementById("race").value;
    let gender = document.getElementById("gender").value;
    let state = document.getElementById("state")
    let indicator = document.getElementById("indicator").value;
    console.log(`your name is ${name}`);
    calculateprobs(age, race, gender, state, indicator);
};

function nextquestion() {
    index = index + 1;
    //I'm assuming that we have 12 questions.
    if (index === 12) {

    }

    if (backbutton.style.display == "none") {
        console.log("TRUE");
        if (index >= 2) {
            backbutton.style.display = "";
        }
    }

    console.log(backbutton.style.display);
};

function backquestion() {
    index = index - 1;
};

function calculateprobs(age, race, gender, state, indicator) {
    // probibilty of getting heart diease or whatever = a whole lotta math or something like that y'know
    return probibilty;
};