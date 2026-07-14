const timerStart = document.getElementById("timer-start");
const timerStop = document.getElementById("timer-stop");
const timerReset = document.getElementById("timer-reset");
const session = document.getElementById("timer-session");
const break5 = document.getElementById("timer-sbreak");
const break15 = document.getElementById("timer-lbreak");
const timer = document.getElementById("timer");
const calendar = document.getElementById("calendar");
let isBgOn = false;
let isSecondBg = false;
const bg = document.getElementById("bg");
let remainingSeconds = 1500;
let breakSeconds = 300; //short break
let lBreakSeconds = 900; //long break
let timerInterval = null;

document.querySelector(".container").classList.remove("container");

timerStart.addEventListener("click", ()=>{
    if (!timerInterval) {
        timerInterval = setInterval(updateSessionTimer, 1000);
    }
})
timerStop.addEventListener("click", ()=> {
    clearInterval(timerInterval);
    timerInterval = null;
})
timerReset.addEventListener("click", ()=>{
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = 1500;
    let minutes = Math.floor(remainingSeconds/60);
    let seconds = remainingSeconds % 60;
    timer.textContent = minutes + ":0" + seconds;
})
function updateSessionTimer() {
    remainingSeconds--;
    let minutes = Math.floor(remainingSeconds/60);
    let seconds = remainingSeconds % 60;
    if (seconds < 10) {
        seconds = "0" + (remainingSeconds % 60);
    }
    if (minutes < 10) {
        minutes = "0" + (Math.floor(remainingSeconds/60));
    }
    timer.textContent = minutes + ":" + seconds;
    if (remainingSeconds === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
const template = document.getElementById("template");
const clone = template.content.cloneNode(true);
function calculateDay() {
    //F = k + ⌊(13m - 1)/5⌋ + D + ⌊D/4⌋ + ⌊C/4⌋ - 2C
    //where k is day of the month, m is month number, d is last 2 digits of the year, c is first 2 digits of year
    const year = new Date().getFullYear().toString();
    const lastDigits = Number(year.slice(-2)); // D
    console.log(lastDigits);
    const firstDigits = Number(year.slice(0,2)); // C
    console.log(firstDigits);
    const dayOfMonth = 1; // k
    let monthNumber = new Date().getMonth(); // M
    switch(monthNumber) {
        case 2: // march is 1 in the formula, JS date gives march = 2
            monthNumber = 1;
            break;
        case 3: // april
            monthNumber = 2;
            break;
        case 4: // may
            monthNumber = 3;
            break;
        case 5: // june
            monthNumber = 4;
            break;
        case 6: // july
            monthNumber = 5;
            break;
        case 7: // august
            monthNumber = 6;
            break;
        case 8: // september
            monthNumber = 7;
            break;
        case 9: // october
            monthNumber = 8;
            break;
        case 10: // november
            monthNumber = 9;
            break;
        case 11: // december
            monthNumber = 10;
            break;
        case 0: // january
            monthNumber = 11;
            break;
        case 1: // feburary
            monthNumber = 12;
            break;
        default:
            break;
    }
    console.log(monthNumber);
    const day = dayOfMonth + Math.floor((13 * monthNumber - 1) / 5) + lastDigits + Math.floor(lastDigits/4) + Math.floor(firstDigits/4) - 2 * firstDigits;
    const dayOfWeek = ((day % 7) + 7) % 7;
    console.log(dayOfWeek);
    switch (dayOfWeek) {
        case 0:
            console.log("Sunday");
            break;
        case 1:
            calendar.prepend(clone);
            console.log("Monday");
            break;
        case 2:
            calendar.prepend(clone);
            calendar.prepend(clone);
            console.log("Tuesday");
            break;
        case 3:
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            console.log("Wednesday");
            break;
        case 4:
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            console.log("Thursday");
            break;
        case 5:
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            console.log("Friday");
            break;
        case 6:
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            calendar.prepend(clone);
            console.log("Saturday");
            break;
        default:
            break;
    }
}
calculateDay();
document.getElementById("switch-bg").addEventListener("click", ()=>{
    bg.classList.toggle("container");
    bg.classList.toggle("container-2");
    isSecondBg = bg.classList.contains("container-2");
    saveBgState();
})
document.getElementById("turn-off").addEventListener("click", ()=>{
    if (bg.classList.contains("container")){
        bg.classList.remove("container");
        isBgOn = false;
    } else if (bg.classList.contains("container-2")) {
        bg.classList.remove("container-2");
        isBgOn = false;
    } else if (bg.isSecondBg) {
        bg.classList.add("container-2");
        isBgOn = true;
    } else {
        bg.classList.add("container");
        isBgOn = true;
    }
    saveBgState();
});
function setBg() {
    const bgState = JSON.parse(localStorage.getItem("bg"));
    if (bgState.isBgOn) {
        if (bgState.isSecondBg) {
            document.getElementById("bg").classList.add("container-2");
        } else {
            document.getElementById("bg").classList.add("container");
        }
    } 
}
setBg();
function saveBgState() {
    const bgState = {
        isBgOn,
        isSecondBg
    }
    localStorage.setItem("bg", JSON.stringify(bgState));
}