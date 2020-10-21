// stolen from https://codepen.io/bnsddk/pen/pojMGGN
// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    // let formattedMS = ms.toString().padStart(2, "0");

    // return `${formattedMM}:${formattedSS}:${formattedMS}`;
    return `${formattedMM}:${formattedSS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function timerPrint(txt) {
    document.querySelector(".secondCount").innerHTML = txt;
    document.querySelector(".finalSecondCount").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function timerStart() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        timerPrint(timeToString(elapsedTime));
    }, 10);
    // showButton("PAUSE");
}

function timerPause() {
    clearInterval(timerInterval);
    // showButton("PLAY");
}

function timerReset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    // showButton("PLAY");
}

// Create event listeners

// let playButton = document.getElementById("playButton");
// let pauseButton = document.getElementById("pauseButton");
// let resetButton = document.getElementById("resetButton");

// playButton.addEventListener("click", timerStart);
// pauseButton.addEventListener("click", timerPause);
// resetButton.addEventListener("click", timerReset);
