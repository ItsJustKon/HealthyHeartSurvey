// tbh you can just set up a sever or whatever you did kinda like what you did with leostats
// and just convert the csv to json and store it please Kingston

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

function calculateprobs(age, race, gender, state, indicator)
{
    // probibilty of getting heart diease or whatever = a whole lotta math or something like that y'know
    return probibilty
}