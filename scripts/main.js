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
        console.log(Number(true))
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
    // let res = await axios.post("http://localhost:8080", {
    //     age: answers.age,
    //     gender: answers.gender,
    //     race: answers.race,
    //     heightFt: answers.heightFt,
    //     heightIn: answers.heightIn,
    //     weight: answers.weight,
    //     state: answers.state,
    //     diabetes: answers.diabetes,
    //     smoking: answers.smoking,
    //     cholesterol: answers.cholesterol,
    //     excercise: answers.excercise
    // })
    // .then(function (res) {console.log(res.data);})
    // .catch(function (err) {console.log(err);});
    formObject(answers.age, answers.gender, answers.race, answers.heightFt, answers.heightIn, answers.weight, answers.state, answers.diabetes, answers.smoking, answers.cholesterol)
    const response = await fetch("http://localhost:8080", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
        "age": "${answers.age}",
        "gender": "${answers.gender}",
        "race": "${answers.race}",
        "heightFt": "${answers.heightFt}",
        "heightIn": "${answers.heightIn}",
        "weight": "${answers.weight}",
        "state": "${answers.state}",
        "diabetes": "${answers.diabetes}",
        "smoking": "${answers.smoking}",
        "cholesterol": "${answers.cholesterol}"
        
          }`,
        }).then((response) => response.text())
        .then((data) => console.log(data));;
        // excercise: ${answers.excercise};
    

};
function formObject(age, gender, race, heightFt, heightIn, weight, state, diabetes, smoking, cholesterol) {
    self.bmi = (weight/(((heightFt*12)+heightIn)^2)*703)
    console.log(self.bmi)
    if (self.bmi > 25)
    {
        self.Hypertension = true
        self.BloodPressure = 180/120
        if(gender == "Male")
        {
            self.HDLCholesterolValue = 30
        }
        else
        {
            self.HDLCholesterolValue = 40
        }
    }
    else
    {
        self.Hypertension = false
        self.BloodPressure = 120/80
        self.HDLCholesterolValue = 70
    }
    var self = this;
    self.$debug = false;
    self.Race = race
    self.Age = age
    self.Sex = gender
    self.TotalCholesterolValue = ko.observable();
    self.Diabetic = diabetes
    self.Smoker = smoking
    self.UnitOfMeasure = ko.observable(false);
    self.UOMChange = function(newValue) {
        var type = newValue == true ? "si" : "us";
        var hdl = self.HDLCholesterolValue();
        var totc = self.TotalCholesterolValue();
        var m = .0259;
        if (newValue) {
            if (hdl != null) self.HDLCholesterolValue((hdl * m).toFixed(4));
            if (totc != null) self.TotalCholesterolValue((totc * m).toFixed(4));
        } else {
            if (hdl != null) self.HDLCholesterolValue((hdl / m).toFixed(0));
            if (totc != null) self.TotalCholesterolValue((totc / m).toFixed(0));
        }
        sessionStorage.setItem("v2uom", newValue);
    };
    self.UOMAction = function() {
        console.log(self.UnitOfMeasure());
        self.UOMChange(self.UnitOfMeasure());
        return true;
    };
    self.HDLCholesterolValue.subscribe(function(newValue) {
        sessionStorage.setItem("v2hdlc", newValue);
    });
    self.TotalCholesterolValue.subscribe(function(newValue) {
        sessionStorage.setItem("v2totalc", self.TotalCholesterolValue());
    });
    self.HDLCholesterol = ko.pureComputed(function() {
        var i = self.HDLCholesterolValue();
        var m = self.UnitOfMeasure() ? .0259 : 1;
        var value = i / m;
        return value;
    }, self);
    self.TotalCholesterol = ko.pureComputed(function() {
        var i = self.TotalCholesterolValue();
        var m = self.UnitOfMeasure() ? .0259 : 1;
        var value = i / m;
        return value;
    }, self);
    self.Age.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2age", newValue);
    });
    self.Sex.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2sex", newValue);
    });
    self.Race.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2race", newValue);
    });
    self.BloodPressure.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2bloodpressure", newValue);
    });
    self.Diabetic.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2diabetic", newValue);
    });
    self.Smoker.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2smoker", newValue);
    });
    self.Hypertension.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
        sessionStorage.setItem("v2hypertension", newValue);
    });
    self.HDLCholesterol.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
    });
    self.TotalCholesterol.subscribe(function(newValue) {
        self.TenYearRiskCalculations();
    });
    self.computedValuesAvailable = ko.pureComputed(function() {
        if (self.Sex() && self.Age() != null && self.Age() >= 20 && self.Age() <= 79 && self.Race() && self.HDLCholesterol() != null && self.HDLCholesterol() >= 20 && self.HDLCholesterol() <= 100 && self.BloodPressure() != null && self.BloodPressure() >= 90 && self.BloodPressure() <= 200 && self.TotalCholesterol() != null && self.TotalCholesterol() >= 130 && self.TotalCholesterol() <= 320 && (self.Diabetic() != null || self.Diabetic() != undefined) && (self.Smoker() != null || self.Smoker() != undefined) && (self.Hypertension() != null || self.Hypertension() != undefined)) {
//            if (self.$debug) console.log("Computed Values are available");
            return true;
        } else {
//            if (self.$debug) console.log("Computed Values are not available");
            return false;
        }
    }, self);
    self.isRealNumber = function($object) {
        if (!isNaN($object) && $object != null && $object) {
            return true;
        }
        return false;
    };
    self.isAfrican = function() {
        var i = false;
        if (self.Race() == "African American") i = true;
        return i;
    };
    self.isMale = function() {
        var i = false;
        if (self.Sex() == "Male") i = true;
        return i;
    };
    self.isFemale = function() {
        var i = false;
        if (self.Sex() == "Female") i = true;
        return i;
    };
    self.isDiabetic = function() {
        var i = false;
        if (self.Diabetic() == "Yes") i = true;
        return i;
    };
    self.isSmoker = function() {
        var i = false;
        if (self.Smoker() == "Yes") i = true;
        return i;
    };
    self.isHypertension = function() {
        var i = false;
        if (self.Hypertension() == "Yes") i = true;
        return i;
    };
    self.AgeConverted = function() {
//        if (self.$debug) console.log(self.Age() + " is the Age");
        return Math.log(self.Age());
    };
    self.AgeSquared = function() {
        return self.AgeConverted() * self.AgeConverted();
    };
    self.HDLCholesterolConverted = function() {
        return Math.log(self.HDLCholesterol());
    };
    self.TotalCholesterolConverted = function() {
        return Math.log(self.TotalCholesterol());
    };
    self.agetc = function() {
        return self.TotalCholesterolConverted() * self.AgeConverted();
    };
    self.agehdl = function() {
        return self.HDLCholesterolConverted() * self.AgeConverted();
    };
    self.agetsbp = function() {
        return self.AgeConverted() * self.trlnsbp();
    };
    self.agentsbp = function() {
        return self.AgeConverted() * self.ntlnsbp();
    };
    self.trlnsbp = function() {
        return Math.log(self.BloodPressure()) * Number(self.isHypertension());
    };
    self.ntlnsbp = function() {
        return Math.log(self.BloodPressure()) * Number(!self.isHypertension());
    };
    self.agesmoke = function() {
        return self.AgeConverted() * Number(self.isSmoker());
    };
    self.agedm = function() {
        return self.AgeConverted() * Number(self.isDiabetic);
    };
    self.opt_hdl = function() {
        return Math.log(50);
    };
    self.opt_tc = function() {
        return Math.log(170);
    };
    self.opt_agetc = function() {
        return self.opt_tc() * self.AgeConverted();
    };
    self.opt_agehdl = function() {
        return self.opt_hdl() * self.AgeConverted();
    };
    self.opt_agetsbp = function() {
        return self.AgeConverted() * self.opt_trlnsbp();
    };
    self.opt_agentsbp = function() {
        return self.AgeConverted() * self.opt_ntlnsbp();
    };
    self.opt_trlnsbp = function() {
        return Math.log(110) * Number(false);
    };
    self.opt_ntlnsbp = function() {
        return Math.log(110) * Number(!false);
    };
    self.otp_agesmoke = function() {
        return self.AgeConverted() * Number(false);
    };
    self.opt_agedm = function() {
        return self.AgeConverted() * Number(false);
    };
    self.s010 = function() {
        var i;
        if (self.isAfrican() && self.isFemale()) i = .95334;
        if (!self.isAfrican() && self.isFemale()) i = .96652;
        if (self.isAfrican() && self.isMale()) i = .89536;
        if (!self.isAfrican() && self.isMale()) i = .91436;
        return i;
    };
    self.mnxb = function() {
        var i;
        if (self.isAfrican() && self.isFemale()) i = 86.6081;
        if (!self.isAfrican() && self.isFemale()) i = -29.1817;
        if (self.isAfrican() && self.isMale()) i = 19.5425;
        if (!self.isAfrican() && self.isMale()) i = 61.1816;
        return i;
    };
    self.predictCalculate = function() {
        var i;
        if (self.isAfrican() && self.isFemale()) i = 17.1141 * self.AgeConverted() + .9396 * self.TotalCholesterolConverted() + -18.9196 * self.HDLCholesterolConverted() + 4.4748 * self.agehdl() + 29.2907 * self.trlnsbp() + -6.4321 * self.agetsbp() + 27.8197 * self.ntlnsbp() + -6.0873 * self.agentsbp() + .6908 * Number(self.isSmoker()) + .8738 * Number(self.isDiabetic());
        if (!self.isAfrican() && self.isFemale()) i = -29.799 * self.AgeConverted() + 4.884 * (self.AgeConverted() * self.AgeConverted()) + 13.54 * self.TotalCholesterolConverted() + -3.114 * self.agetc() + -13.578 * self.HDLCholesterolConverted() + 3.149 * self.agehdl() + 2.019 * self.trlnsbp() + 1.957 * self.ntlnsbp() + 7.574 * Number(self.isSmoker()) + -1.665 * self.agesmoke() + .661 * Number(self.isDiabetic());
        if (self.isAfrican() && self.isMale()) i = 2.469 * self.AgeConverted() + .302 * self.TotalCholesterolConverted() + -.307 * self.HDLCholesterolConverted() + 1.916 * self.trlnsbp() + 1.809 * self.ntlnsbp() + .549 * Number(self.isSmoker()) + .645 * Number(self.isDiabetic());
        if (!self.isAfrican() && self.isMale()) i = 12.344 * self.AgeConverted() + 11.853 * self.TotalCholesterolConverted() + -2.664 * self.agetc() + -7.99 * self.HDLCholesterolConverted() + 1.769 * self.agehdl() + 1.797 * self.trlnsbp() + 1.764 * self.ntlnsbp() + 7.837 * Number(self.isSmoker()) + -1.795 * self.agesmoke() + .658 * Number(self.isDiabetic());
        return i;
    };
    self.optimalPredictCalculate = function() {
        var i;
        if (self.isAfrican() && self.isFemale()) i = 17.1141 * self.AgeConverted() + .9396 * self.opt_tc() + -18.9196 * self.opt_hdl() + 4.4748 * self.opt_agehdl() + 29.2907 * self.opt_trlnsbp() + -6.4321 * self.opt_agetsbp() + 27.8197 * self.opt_ntlnsbp() + -6.0873 * self.opt_agentsbp() + .6908 * Number(false) + .8738 * Number(false);
        if (!self.isAfrican() && self.isFemale()) i = -29.799 * self.AgeConverted() + 4.884 * self.AgeSquared() + 13.54 * self.opt_tc() + -3.114 * self.opt_agetc() + -13.578 * self.opt_hdl() + 3.149 * self.opt_agehdl() + 2.019 * self.opt_trlnsbp() + 1.957 * self.opt_ntlnsbp() + 7.574 * Number(false) + -1.665 * self.otp_agesmoke() + .661 * Number(false);
        if (self.isAfrican() && self.isMale()) i = 2.469 * self.AgeConverted() + .302 * self.opt_tc() + -.307 * self.opt_hdl() + 1.916 * self.opt_trlnsbp() + 1.809 * self.opt_ntlnsbp() + .549 * Number(false) + .645 * Number(false);
        if (!self.isAfrican() && self.isMale()) i = 12.344 * self.AgeConverted() + 11.853 * self.opt_tc() + -2.664 * self.opt_agetc() + -7.99 * self.opt_hdl() + 1.769 * self.opt_agehdl() + 1.797 * self.opt_trlnsbp() + 1.764 * self.opt_ntlnsbp() + 7.837 * Number(false) + -1.795 * self.otp_agesmoke() + .658 * Number(false);
        return i;
    };
    self.TenYearRiskCalculations = function() {
        var valuesAvailable = false;
        if (self.Sex() && self.Age() && self.Age() >= 20 && self.Age() <= 79 && self.Race() && self.HDLCholesterol() && self.HDLCholesterol() >= 20 && self.HDLCholesterol() <= 100 && self.BloodPressure() && self.BloodPressure() >= 90 && self.BloodPressure() <= 200 && self.TotalCholesterol() && self.TotalCholesterol() >= 130 && self.TotalCholesterol() <= 320 && (self.Diabetic() != null || self.Diabetic() != undefined) && (self.Smoker() != null || self.Smoker() != undefined) && (self.Hypertension() != null || self.Hypertension() != undefined)) {
            valuesAvailable = true;
        }
//        if (self.$debug) console.log("Values are available == " + valuesAvailable);
//        if (self.$debug) console.log("ten year risk calculate");
        if (valuesAvailable) {
//            if (self.$debug) console.log("I am calculating Risk");
            self.predict(self.predictCalculate());
            self.optimalPredict(self.optimalPredictCalculate());
        } else {
//            if (self.$debug) console.log("I have set Risk to null");
            self.predict(null);
            self.optimalPredict(null);
        }
    };
    self.predict = ko.observable();
    self.optimalPredict = ko.observable();
    self.cvdPredict = ko.pureComputed(function() {
        if (self.computedValuesAvailable()) {
            return 1 - Math.pow(this.s010(), Math.exp(this.predict() - this.mnxb()));
        }
        return NaN;
    }, self);
    self.optimalCvdPredict = ko.pureComputed(function() {
        if (self.computedValuesAvailable()) {
            return 1 - Math.pow(this.s010(), Math.exp(this.optimalPredict() - this.mnxb()));
        }
        return NaN;
    }, self);
    self.TenYearRisk = ko.pureComputed(function() {
        var i = "~%";
        if (self.cvdPredict() != 1 && !isNaN(self.cvdPredict())) {
            var number = self.cvdPredict() * 100;
            i = number.toFixed(1) + "%";
        }
        return i;
    }, self);
    self.TenYearOptimal = ko.pureComputed(function() {
        var i = "~%";
        if (self.optimalCvdPredict() != 1 && !isNaN(self.optimalCvdPredict())) {
            var number = self.optimalCvdPredict() * 100;
            i = number.toFixed(1) + "%";
        }
        return i;
    }, self);
    self.major = ko.pureComputed(function() {
        var i = (self.TotalCholesterol() >= 240 ? 1 : 0) + (self.BloodPressure() >= 160 ? 1 : 0) + (self.isHypertension() ? 1 : 0) + (self.isSmoker() ? 1 : 0) + (self.isDiabetic() ? 1 : 0);
        return i;
    }, self);
    self.elevated = ko.pureComputed(function() {
        var i = ((self.TotalCholesterol() >= 200 && self.TotalCholesterol() < 240 ? 1 : 0) + (self.BloodPressure() >= 140 && self.BloodPressure() < 160 && self.isHypertension() == false ? 1 : 0) >= 1 ? 1 : 0) * (self.major() == 0 ? 1 : 0);
        return i;
    }, self);
    self.allOptimal = ko.pureComputed(function() {
        var i = ((self.TotalCholesterol() < 180 ? 1 : 0) + (self.BloodPressure() < 120 ? 1 : 0) * (self.isHypertension() ? 0 : 1) == 2 ? 1 : 0) * (self.major() == 0 ? 1 : 0);
        return i;
    }, self);
    self.notOptimal = ko.pureComputed(function() {
        var i = ((self.TotalCholesterol() >= 180 && self.TotalCholesterol() < 200 ? 1 : 0) + (self.BloodPressure() >= 120 && self.BloodPressure() < 140 && self.isHypertension() == false ? 1 : 0)) * (self.elevated() == 0 ? 1 : 0) * (self.major() == 0 ? 1 : 0) >= 1 ? 1 : 0;
        return i;
    }, self);
    self.lifeTimeRisk = ko.pureComputed(function() {
        i = "~%";
        if (self.Sex() != null || self.Sex() != undefined) {
            i = self.Sex() == "Male" ? "5%" : "8%";
        }
        return i;
    }, self);
    self.yourLifeTimeRisk = ko.pureComputed(function() {
        var i = "~";
        if (self.major() > 1) i = self.lookupASCVD("major2");
        if (self.major() == 1) i = self.lookupASCVD("major1");
        if (self.elevated() == 1) i = self.lookupASCVD("elevated");
        if (self.notOptimal() == 1) i = self.lookupASCVD("notOptimal");
        if (self.allOptimal() == 1) i = self.lookupASCVD("allOptimal");
        return i + "%";
    }, self);
    self.lookupASCVD = function(category) {
        if (self.Sex()) return eval("self.ascvdTable." + self.Sex().toLowerCase() + "." + category + "");
        return "~";
    };
    self.ascvdTable = {
        female: {
            major2: 50,
            major1: 39,
            elevated: 39,
            notOptimal: 27,
            allOptimal: 8
        },
        male: {
            major2: 69,
            major1: 50,
            elevated: 46,
            notOptimal: 36,
            allOptimal: 5
        }
    };
    self.appStorage = function() {
        isSession = false;
        if (sessionStorage.getItem("v2age") != "" && sessionStorage.getItem("v2age") !== null && sessionStorage.getItem("v2age") != "null" && sessionStorage.getItem("v2age") != "undefined") {
            self.Age(sessionStorage.getItem("v2age"));
        }
        if (sessionStorage.getItem("v2sex") != "" && sessionStorage.getItem("v2sex") !== null && sessionStorage.getItem("v2sex") != "null" && sessionStorage.getItem("v2sex") != "undefined") {
            self.Sex(sessionStorage.getItem("v2sex"));
        }
        if (sessionStorage.getItem("v2race") != "" && sessionStorage.getItem("v2race") !== null && sessionStorage.getItem("v2race") != "null" || sessionStorage.getItem("v2race") != "undefined") {
            self.Race(sessionStorage.getItem("v2race"));
        }
        if (sessionStorage.getItem("v2totalc") != "" && sessionStorage.getItem("v2totalc") !== null && sessionStorage.getItem("v2totalc") != "null" && sessionStorage.getItem("v2totalc") != "undefined") {
            self.TotalCholesterolValue(sessionStorage.getItem("v2totalc"));
        }
        if (sessionStorage.getItem("v2hdlc") != "" && sessionStorage.getItem("v2hdlc") !== null && sessionStorage.getItem("v2hdlc") != "null" && sessionStorage.getItem("v2hdlc") != "undefined") {
            self.HDLCholesterolValue(sessionStorage.getItem("v2hdlc"));
        }
        if (sessionStorage.getItem("v2bloodpressure") != "" && sessionStorage.getItem("v2bloodpressure") !== null && sessionStorage.getItem("v2bloodpressure") != "null" && sessionStorage.getItem("v2bloodpressure") != "undefined") {
            self.BloodPressure(sessionStorage.getItem("v2bloodpressure"));
        }
        if (sessionStorage.getItem("v2diabetic") != "" && sessionStorage.getItem("v2diabetic") !== null && sessionStorage.getItem("v2diabetic") != "null" && sessionStorage.getItem("v2diabetic") != "undefined") {
            self.Diabetic(sessionStorage.getItem("v2diabetic"));
        }
        if (sessionStorage.getItem("v2smoker") != "" && sessionStorage.getItem("v2smoker") !== null && sessionStorage.getItem("v2smoker") != "null" && sessionStorage.getItem("v2smoker") != "undefined") {
            self.Smoker(sessionStorage.getItem("v2smoker"));
        }
        if (sessionStorage.getItem("v2hypertension") != "" && sessionStorage.getItem("v2hypertension") !== null && sessionStorage.getItem("v2hypertension") != "null" && sessionStorage.getItem("v2hypertension") != "undefined") {
            self.Hypertension(sessionStorage.getItem("v2hypertension"));
        }
        if (sessionStorage.getItem("v3uom") !== null && sessionStorage.getItem("v3uom") !== "" && sessionStorage.getItem("v2uom") !== sessionStorage.getItem("v3uom")) {
            sessionStorage.setItem("v2uom", sessionStorage.getItem("v3uom"));
            if (sessionStorage.getItem("v2uom") === "true") {
                self.UnitOfMeasure(true);
            } else {
                self.UnitOfMeasure(false);
            }
            self.UOMChange(self.UnitOfMeasure());
        } else if (sessionStorage.getItem("v2uom") === "true") {
            self.UnitOfMeasure(true);
        } else {
            self.UnitOfMeasure(false);
        }
        isSession = true;
    };
    if (sessionStorage.length != 0) {
        var UnitOfMeasureSession;
        if (performance.navigation !== undefined) {
            if (performance.navigation.type == 0 || performance.navigation.type == 2) {
                self.appStorage();
            } else {
                UnitOfMeasureTypeSession = sessionStorage.getItem("v2uom");
                if (sessionStorage.getItem("v2uom") === "true") {
                    UnitOfMeasureSession = true;
                } else {
                    UnitOfMeasureSession = false;
                }
                sessionStorage.clear();
                sessionStorage.setItem("v2uom", UnitOfMeasureTypeSession);
                self.UnitOfMeasure(UnitOfMeasureSession);
            }
        }
    }
}

backButton.style.opacity = 0;
nextQuestion();