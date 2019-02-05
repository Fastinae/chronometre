// Divs's declaration
var divChrono = document.querySelector("#chrono");
var divTime = document.querySelector("#time");
var divSave = document.querySelector("#save");
var divLoad = document.querySelector("#load");
var divsaveTime = document.querySelector("#saveTime");

// buttons's declaration
var btnStart = document.querySelector("#start");
var btnPause = document.querySelector("#pause");
var btnReset = document.querySelector("#reset");
var btnSave = document.querySelector("#btnsave");
var btnSup = document.querySelector("#btnsup");
var btnSaveTime = document.querySelector("#save");

// Inputs's declaration
var inputFirst = document.querySelector("#firstname");
var inputLast = document.querySelector("#lastname");

// Addlistener's declaration
btnStart.addEventListener("click", start);
btnPause.addEventListener("click", pause);
btnReset.addEventListener("click", reset);
btnSave.addEventListener("click", save);
btnSup.addEventListener("click", supp);
btnSaveTime.addEventListener("click", saveTime);

// Variables's declaration
var start = 0;
var fin = 0;
var time = 0;
var timerID = 0;
var varpause = 2;
var varstart = 0;


// Event chrono
function chrono(){  
    fin = new Date();
    time = fin - start;
    time = new Date(time);
    var milsec = time.getMilliseconds();
    var sec = time.getSeconds();
    var min = time.getMinutes();
    var hr = time.getHours()-1;
    if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(milsec < 10){
		milsec = "00" +milsec;
	}
	else if(milsec < 100){
		milsec = "0" +milsec;
	}
    divTime.innerHTML = hr + ":" + min + ":" + sec + ":" + milsec;
    timerID = setTimeout("chrono()", 10);
}

// Event start time
function start(){
    if(varstart == 0){
        start = new Date();
        varstart = 1;
        varpause = 0;
        chrono();
    }
    else if (varpause == 1){
        varpause = 0;
        start = new Date()-time;
	    start = new Date(start);
        chrono();
    }
}


// Event pause time
function pause(){
    if(varpause == 0){
        clearTimeout(timerID);
        varpause = 1;
    }
}

// Event reset time
function reset(){
    clearTimeout(timerID);
    varpause = 2;
    varstart = 0;
    divTime.innerHTML = "0:00:00:000";
    start = new Date();
}

// Save all time
function saveTime(){
        var newTime = divTime.innerText;
        divsaveTime.className = "card text-white bg-dark mb-3";
        divsaveTime.style = "width: 18rem";
        var liste = document.createElement("li");
        liste.className = "savedtime";
        divsaveTime.appendChild(liste);
        liste.innerText = newTime;
}

var arrayStud = {students : []};

// Save names and time in localstorage
function save(){
    var newStud = {};
    newStud.firstname = inputFirst.value;
    newStud.lastname = inputLast.value;
    newStud.time = divsaveTime.innerHTML; 
    arrayStud.students.push(newStud);
    localStorage.setItem("studJson", JSON.stringify(arrayStud));
    print();
    reset();
    divsaveTime.innerHTML = "";
    divsaveTime.className = "";

}

// Print all the names and their time
function print(){
        divLoad.innerHTML = "";
        arrayStud = JSON.parse(localStorage.getItem("studJson"));
        for(i=0; i < arrayStud.students.length; i++){
            var cardDiv = document.createElement("div");
            cardDiv.className = "card text-white bg-dark mb-3";
            cardDiv.style = "width: 18rem";
            divLoad.appendChild(cardDiv);
            var cardHead = document.createElement("div");
            cardHead.className = "card-header title";
            cardHead.innerHTML = `${arrayStud.students[i].firstname} ${arrayStud.students[i].lastname}`;
            cardDiv.appendChild(cardHead);
            var cardBody = document.createElement("div");
            cardBody.className = "card-body";
            cardDiv.appendChild(cardBody);
            var cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerHTML = `Temps: ${arrayStud.students[i].time}`;
            cardBody.appendChild(cardText);
        }
}

// function delete localstorage
function supp(){
    localStorage.removeItem("studJson");
    arrayStud = {students : []};
    divLoad.innerHTML = "";
}

// Activate the print function when reloading the page if localstorage is not null
if(JSON.parse(localStorage.getItem("studJson"))){
    print();
}




