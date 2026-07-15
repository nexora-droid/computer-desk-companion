const timerStart = document.getElementById("timer-start");
const timerStop = document.getElementById("timer-stop");
const timerReset = document.getElementById("timer-reset");
const session = document.getElementById("timer-session");
const break5 = document.getElementById("timer-sbreak");
const break15 = document.getElementById("timer-lbreak");
const timer = document.getElementById("timer");
const calendar = document.getElementById("calendar");
const eventForm = document.getElementById("event-form");
const eventDiv = document.getElementById("event-div"); // event-form parent
const dragBar = document.getElementById("buttons");
const overlay = document.getElementById("overlay");
const eventTemplate = document.getElementById("event-template");
const eventName = document.getElementById("event-name");
const eventColor = document.getElementById("event-color");
const eventAdd = document.getElementById("send-button");
const dates = document.querySelectorAll('.date');
const editDragBar = document.getElementById("close-buttons");
const editDiv = document.getElementById("edit-event");
const editClose = document.getElementById("edit-close");
const editOverlay = document.getElementById("e-overlay");
const editEventName = document.getElementById("name");
const editEventColor = document.getElementById("color");
const editDescription = document.getElementById("eventDesc");
const editSave = document.getElementById("edit-save");
const editDelete = document.getElementById("edit-delete");
let isDraggingEdit = false;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let isBgOn = false;
let isSecondBg = false;
let dateAddingTo = 0;
const bg = document.getElementById("bg");
let remainingSeconds = 1500;
let breakSeconds = 300; //short break
let lBreakSeconds = 900; //long break
let timerInterval = null;
let cEvents = JSON.parse(localStorage.getItem("c-events")) || [];
eventDiv.hidden = true;
overlay.hidden = true;
editDiv.hidden = true;
editOverlay.hidden = true;
document.querySelector(".container").classList.remove("container");
function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);

    return "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0");
}
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
            calendar.prepend(template.content.cloneNode(true));
            console.log("Monday");
            break;
        case 2:
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            console.log("Tuesday");
            break;
        case 3:
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            console.log("Wednesday");
            break;
        case 4:
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            console.log("Thursday");
            break;
        case 5:
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            console.log("Friday");
            break;
        case 6:
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
            calendar.prepend(template.content.cloneNode(true));
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
    } else if (isSecondBg) {
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
function loadEditEvent(dateToView, colorHex){
    const targetData = Array.from(cEvents).find(data => {
        return data.date === Number(dateToView) && data.color.toLowerCase() === colorHex.toLowerCase();
    })
    editEventName.textContent = targetData.name;
    editDescription.value = targetData.description || " ";
    document.getElementById("color").value = targetData.color;
    editSave.addEventListener("click", ()=>{
        const description = editDescription.value;
        targetData.description = description;
        targetData.description = editDescription.value; 
        targetData.color = editEventColor.value;
        localStorage.setItem("c-events", JSON.stringify(cEvents));
        location.reload();
    })
    editDelete.addEventListener("click", ()=>{
        const toDelete = confirm("This action will permanently delete the event off your calendar, including the colour. You cannot undo this action. Do you still want to proceed?");
        if (toDelete) {
            const index = cEvents.indexOf(targetData);
            if (index !== -1) {
                cEvents.splice(index, 1);
            }
            localStorage.setItem("c-events", JSON.stringify(cEvents));
            location.reload();
        }
    })
}
calendar.addEventListener("click", (event)=>{
    if (event.target.classList.contains("event")) {
        // event editing, viewing, deleting bla bla bla
        const eventPressed = event.target;
        //console.log(eventPressed);
        const eventsDiv = eventPressed.parentElement;
        const eventDateDiv = eventsDiv.parentElement.parentElement;
        //console.log(eventDateDiv);
        const dateViewing = eventDateDiv.querySelector("p").textContent;
        const eventColor = eventPressed.style.backgroundColor;
        const eventColorHex = rgbToHex(eventColor);
        //console.log(dateViewing);
        const targetData = Array.from(cEvents).find(data => {
            return data.date === Number(dateViewing) && data.color.toLowerCase() === eventColorHex.toLowerCase();
        })
        editDiv.hidden = false;
        editOverlay.hidden = false;
        loadEditEvent(dateViewing, eventColorHex);
    } else {
        const dateElement = event.target.closest(".date");  
        if (!dateElement) {
            return;
        }
        const numberElement = dateElement.querySelector("p");
        if (numberElement){
            dateAddingTo = Number(numberElement.textContent);
            console.log(dateAddingTo);
        }
        eventDiv.hidden = false;
        overlay.hidden = false;
    }
})
function addEvent(name, color) {
    const eventNode = eventTemplate.content.cloneNode(true);
    const eventElement = eventNode.querySelector(".event");
    eventElement.style.backgroundColor = color;
    const targetDiv = Array.from(dates).find(div => {
        const pElement = Number(div.querySelector("p").textContent);
        //console.log("Checking ", pElement);
        return pElement === dateAddingTo;
    })
    const eventsDiv = targetDiv.querySelector(".events-container").querySelector(".events");
    eventsDiv.append(eventNode);
    cEvents.push({
        name: eventName.value,
        color: eventColor.value,
        date: dateAddingTo,
        description: null
    })
    localStorage.setItem("c-events", JSON.stringify(cEvents));
}
function loadEvents() {
    for (let i = 0; i < cEvents.length; i++) {
        const eventNode = eventTemplate.content.cloneNode(true);
        const eventElement = eventNode.querySelector(".event");
        const eName = cEvents[i].name; // for use later (hopefully)
        const eColor = cEvents[i].color;
        const eDate = cEvents[i].date;
        eventElement.style.backgroundColor = eColor;
        const targetDiv = Array.from(dates).find(div => {
            const pElement = Number(div.querySelector("p").textContent);
            //console.log("Checking ", pElement);
            return pElement === eDate;
        })
        const eventsDiv = targetDiv.querySelector(".events-container").querySelector(".events");
        eventsDiv.append(eventNode);
    }
}
eventAdd.addEventListener("click", (e)=>{
    e.preventDefault();
    const event = {
        name: eventName.value,
        color: eventColor.value,
        date: dateAddingTo
    }
    addEvent(event.name, event.color);
    console.log("clicked");
})
document.getElementById("close").addEventListener("click", ()=>{
    eventDiv.hidden = true;
    overlay.hidden = true;
    const name = document.getElementById("name");
    const ecolor = document.getElementById("event-color");
    name.value = null;
    ecolor.value = "#ff0000";

});
overlay.addEventListener("click", (e)=>{
    if (e.target == overlay) {
        eventDiv.hidden = true;
        overlay.hidden = true;
        const name = document.getElementById("name");
        const ecolor = document.getElementById("event-color");
        name.value = null;
        ecolor.value = "#ff0000";
    }
})
dragBar.addEventListener("mousedown", (e)=>{
    isDragging = true;
    e.preventDefault();
    const rect = eventDiv.getBoundingClientRect();
    eventDiv.style.left = `${rect.left}px`;
    eventDiv.style.top = `${rect.top}px`;
    eventDiv.style.transform = "none";
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
})
document.addEventListener("mousemove", (e)=>{
    if (!isDragging) {
        return;
    }
    eventDiv.style.left = `${e.clientX - offsetX}px`
    eventDiv.style.top = `${e.clientY - offsetY}px`
})
document.addEventListener("mouseup", ()=>{
    isDragging = false;
})
editDragBar.addEventListener("mousedown", (e)=>{
    isDraggingEdit = true;
    e.preventDefault();
    const rect = editDiv.getBoundingClientRect();
    editDiv.style.left = `${rect.left}px`;
    editDiv.style.top = `${rect.top}px`;
    editDiv.style.transform = "none";
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
})
document.addEventListener("mousemove", (e)=>{
    if (!isDraggingEdit) {
        return;
    }
    editDiv.style.left = `${e.clientX - offsetX}px`
    editDiv.style.top = `${e.clientY - offsetY}px`
})
document.addEventListener("mouseup", ()=>{
    isDraggingEdit = false;
})
editClose.addEventListener("click", ()=>{
    editDiv.hidden = true;
    editOverlay.hidden = true;
})
editOverlay.addEventListener("click", (e)=>{
    if (e.target === editOverlay) {
        editDiv.hidden = true;
        editOverlay.hidden = true;
    }
})
loadEvents();