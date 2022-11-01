// tbh you can just set up a sever or whatever you did kinda like what you did with leostats
// and just convert the csv to json and store it please Kingston
var namediv = document.getElementById("name")
var agediv = document.getElementById("age")
var racediv = document.getElementById("race")
var genderdiv = document.getElementById("gender")
var statediv = document.getElementById("state")
var indicatordiv = document.getElementById("indicator")
var obejectsarray = [namediv, agediv, racediv, genderdiv, statediv, indicatordiv]
var questionsdiv = document.getElementById("currentquestion")
var index = 1
var backbutton = document.createElement("button")
backbutton.style.display = "none"
function infosubmit()
{
 
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var race = document.getElementById("race").value
    var gender = document.getElementById("gender").value
    var state = document.getElementById("state")
    var indicator = document.getElementById("indicator").value
    console.log(`your name is ${name}`)
    calculateprobs(age, race, gender, state, indicator)
}

function nextquestion()
{
    index = index + 1
    if(backbutton.style.display == "none")
    {
        console.log("TRUE")
        if(index >= 2)
        {
            backbutton.style.display = ""
        }
    }

    console.log(backbutton.style.display)
}

function backquestion()
{
    index = index - 1

}

function calculateprobs(age, race, gender, state, indicator)
{
    // probibilty of getting heart diease or whatever = a whole lotta math or something like that y'know
    return probibilty
}