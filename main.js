// please convert the csv to json to be able to modify things easier
// use jQuery library to fetch "heartdata.json" and use that json to calculateprobs 
function infosubmit()
{
 
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var race = document.getElementById("race").value
    var gender = document.getElementById("gender").value
    var state = document.getElementById("state")
    var indicator = document.getElementById("indicator").value
    calculateprobs(age, race, gender, state, indicator)
}

function calculateprobs(age, race, gender, state, indicator)
{
    // probibilty of getting heart diease or whatever = a whole lotta math or something like that y'know
    return probibilty
}