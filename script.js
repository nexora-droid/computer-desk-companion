const body = document.getElementById("body");
const city = document.getElementById("city");
const country = document.getElementById("country");
const eventForm = document.getElementById("event-form");
const eventDiv = document.getElementById("event-div"); // event-form parent
const eventAdd = document.getElementsByClassName("event-add");
const eventDelete = [document.getElementById("remove-1"), document.getElementById("remove-2"), document.getElementById("remove-3"), document.getElementById("remove-4")]
const batteryValue = document.getElementById("battery-value");
const currentBatteryDiv = document.getElementById("current-battery");
const chargingIcon = document.getElementById("charging-icon");
const overlay = document.getElementById("overlay");
const taskAdd = document.getElementById("task-add");
const taskName = document.getElementById("task-name");
const taskTemplate = document.getElementById("task-template");
let lat;
let long;
let timeout;
let events = JSON.parse(localStorage.getItem("events")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log("loaded");
eventDiv.hidden = true;
overlay.hidden = true;
document.querySelector(".container").classList.remove("container");
document.addEventListener("DOMContentLoaded", () => {
    /*checkVisited();
    if (navigator.permissions) {
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
            if (result.state == "granted") {
            return;
            } else if (result.state == "prompt") {
            alert(
                "We use your location for approximate location detection, and weather statistics",
            );
            } else {
            const temp_e = document.getElementById("temp-c");
            temp_e.textContent = "Permission Denied";
            temp_e.style.fontSize = "medium";
            country.textContent = "Permission Denied";
            country.style.fontSize = "small";
            city.textContent = "Permission Denied";
            city.style.fontSize = "medium";
            const weather = document.getElementById("weather");
            weather.textContent = "Permission Denied";
            weather.style.fontSize = "medium";
            }
        });
    }*/
    fetch("https://api.ipapi.is/")
        .then((res) => res.json())
        .then((data) => {
        console.log(data.location.city);
        console.log(data.location.country);
        city.textContent = data.location.city;
        country.textContent = data.location.country;
        /*(if (data.location.city == data.location.country) {
            country.hidden = true;
        } else {
            country.textContent = data.location.country;
        }*/
        lat = data.location.latitude;
        long = data.location.longitude;
        getLocation()
        //return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,visibility,relative_humidity_2m,is_day&forecast_days=1&timezone=auto`)
        });
    /*.then(res => res.json())
            .then(data => {
                const hour = new Date().getHours();
                const temp = data.hourly.temperature_2m[hour];
                const wc = data.hourly.weather_code[hour];
                const day = Boolean(data.hourly.is_day[hour]);
                const temp_e = document.getElementById("temp-c"); 
                temp_e.textContent = temp + "℃";  
            })*/
    });
    async function getLocation() {
        console.log("fetching");
        console.log(lat, long);
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,visibility,relative_humidity_2m,is_day&forecast_days=1&timezone=auto`,
        );
        console.log(response.status);
        const data = await response.json();
        const hour = new Date().getHours();
        let temp = data.hourly.temperature_2m[hour];
        const wc = data.hourly.weather_code[hour];
        const day = Boolean(data.hourly.is_day[hour]);

        const temp_e = document.getElementById("temp-c");
        const temp_f = document.getElementById("temp-f");
        const weather = document.getElementById("weather");
        const weatherIcon = document.getElementById("weather-icon");
        const timeIcon = document.getElementById("time-icon");
        const dayNight = document.getElementById("daynight");
        temp_e.textContent = Math.round(temp) + "℃";
        temp_f.textContent = toFarenheit(temp) + "℉";
        switch (wc) {
            case 0:
            weather.textContent = "Clear Sky";
            weatherIcon.textContent = "clear_day";
            break;
            case 1:
            weather.textContent = "Mainly clear";
            weatherIcon.textContent = "partly_cloudy_day";
            break;
            case 2:
            weather.textContent = "Partly Cloudy";
            weatherIcon.textContent = "partly_cloudy_day";
            break;
            case 3:
            weather.textContent = "Overcast";
            weatherIcon.textContent = "cloud";
            break;
            case 45:
            case 48:
            weather.textContent = "Foggy";
            weatherIcon.textContent = "foggy";
            break;
            case 51:
            weather.textContent = "Light Drizzle";
            weatherIcon.textContent = "rainy_light";
            break;
            case 53:
            weather.textContent = "Moderate Drizzle";
            weatherIcon.textContent = "rainy_light";
            break;
            case 55:
            weather.textContent = "Dense Drizzle";
            weatherIcon.textContent = "rainy";
            break;
            case 56:
            case 57:
            weather.textContent = "Freezing Drizzle";
            weatherIcon.textContent = "rainy";
            break;
            case 61:
            weather.textContent = "Slightly Rainy";
            weatherIcon.textContent = "rainy_light";
            break;
            case 63:
            case 80:
            case 81:
            weather.textContent = "Moderately Rainy";
            weatherIcon.textContent = "rainy_light";
            break;
            case 65:
            case 82:
            weather.textContent = "Heavy Rain";
            weatherIcon.textContent = "rainy";
            break;
            case 66:
            case 67:
            weather.textContent = "Freezing Rain";
            weatherIcon.textContent = "rainy";
            break;
            case 71:
            weather.textContent = "Slight Snow fall";
            weatherIcon.textContent = "snowing";
            break;
            case 73:
            case 85:
            weather.textContent = "Moderate Snow fall";
            weatherIcon.textContent = "snowing";
            break;
            case 75:
            case 86:
            weather.textContent = "Heavy Snow fall";
            weatherIcon.textContent = "snowing_heavy";
            break;
            case 77:
            weather.textContent = "Snowy";
            weatherIcon.textContent = "weather_snowy";
            break;
            default:
            weather.textContent = "N/A";
            weatherIcon.textContent = "N/A";
            break;
        }
        switch (day) {
            case true:
                timeIcon.textContent = "wb_sunny";
                dayNight.textContent = "Day";
                break;
            case false:
                timeIcon.textContent = "moon_stars";
                dayNight.textContent = "Night"
                break;
            default:
                timeIcon.textContent = "pending";
                dayNight.textContent = "Loading API";
                break;
        }
    }
    setInterval(getLocation, 900000)
    //console.log("timeout value:", timeout)
    /*navigator.geolocation.getCurrentPosition(
            async(position) => {
                console.log("func called");
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log(lat, long);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,visibility,relative_humidity_2m,is_day&forecast_days=1&timezone=auto`
                );
                console.log(response.status);
                const data = await response.json();
                const hour = new Date().getHours();

                const temp = data.hourly.temperature_2m[hour];
                const wc = data.hourly.weather_code[hour];
                const day = Boolean(data.hourly.is_day[hour]);

                const temp_e = document.getElementById("temp-c");
                const weather = document.getElementById("weather");
                const icons = document.getElementById("weather-icon")
                temp_e.textContent = temp + "℃";
                switch (wc) {
                    case 0:
                        weather.textContent = "Clear Sky";
                        icons.textContent = "clear_day";
                        break;
                    case 1:
                        weather.textContent = "Mainly clear";
                        icons.textContent = "partly_cloudy_day";
                        break;
                    case 2:
                        weather.textContent = "Partly Cloudy";
                        icons.textContent = "partly_cloudy_day";
                        break;
                    case 3: 
                        weather.textContent = "Overcast";
                        icons.textContent = "cloud";
                        break;
                    case 45, 48:
                        weather.textContent = "Foggy";
                        icons.textContent = "foggy";
                        break;
                    case 51:
                        weather.textContent = "Light Drizzle";
                        icons.textContent = "rainy_light";
                        break;
                    case 53:
                        weather.textContent = "Moderate Drizzle";
                        icons.textContent = "rainy_light";
                        break;
                    case 55:
                        weather.textContent = "Dense Drizzle";
                        icons.textContent = "rainy";
                        break;
                    case 56, 57:
                        weather.textContent = "Freezing Drizzle";
                        icons.textContent = "rainy";
                        break;
                    case 61:
                        weather.textContent = "Slightly Rainy";
                        icons.textContent = "rainy_light";
                        break;
                    case 63, 80, 81:
                        weather.textContent = "Moderately Rainy";
                        icons.textContent = "rainy_light";
                        break;
                    case 65, 82:
                        weather.textContent = "Heavy Rain";
                        icons.textContent = "rainy";
                        break;
                    case 66, 67:
                        weather.textContent = "Freezing Rain";
                        icons.textContent = "rainy";
                        break;
                    case 71:
                        weather.textContent = "Slight Snow fall";
                        icons.textContent = "snowing";
                        break;
                    case 73, 85:
                        weather.textContent = "Moderate Snow fall";
                        icons.textContent = "snowing";
                        break;
                    case 75, 86:
                        weather.textContent = "Heavy Snow fall";
                        icons.textContent = "snowing_heavy";
                        break;
                    case 77:
                        weather.textContent = "Snowy";
                        icons.textContent = "weather_snowy";
                        break;
                    default:
                        weather.textContent = "N/A"
                        icons.textContent = "N/A"
                        break;
                }
            }, (error) => {
                console.error(error);
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied permissions");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location unavailable");
                        break;
                    case error.TIMEOUT:
                        console.log("Location request took too long");
                        break;
                    default:
                        console.log("Unknown error");
                }
            }, 
            {
                enableHighAccuracy : false,
                timeout : timeout,
                maximumAge : 300000
            }
        )
    }*/
function checkVisited() {
    if (!localStorage.getItem("hasVisited")) {
        localStorage.setItem("hasVisited", true);
        timeout = 60000;
    } else {
        timeout = 30000;
    }
    return timeout;
}
function toFarenheit(celcius) {
    celcius = Math.round((celcius * 1.8) + 32)
    return celcius;
}
function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = 
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
}
updateClock()
setInterval(updateClock, 1000)

eventForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const emptyIndex = events.findIndex(event => !event.date);
    if (emptyIndex !== -1){
        events[emptyIndex] = {
            name: name,
            date: date
        };
    } else {
        if (events.length >= 4 ) {
        alert("Maximum 4 events allowed!");
        return;
        }
        events.push({
            name: name,
            date: date
        })
    }
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();

})
const eventCountdown = [document.getElementById("event-1"), document.getElementById("event-2"), document.getElementById("event-3"), document.getElementById("event-4") ]
const eventNames = [document.getElementById("event-name-1"),document.getElementById("event-name-2"), document.getElementById("event-name-3"), document.getElementById("event-name-4") ]
function displayEvents() {
    for (let i = 0; i < events.length; i++) {
        if (!events[i].date) {
            eventNames[i].textContent = "No event";
            eventCountdown[i].textContent = "---";
            continue;
        }
        eventNames[i].textContent = events[i].name;
        const today = new Date();
        const eventDate = new Date(events[i].date);
        const diffMs = eventDate - today; // difference in millseconds
        const daysLeft = Math.ceil(diffMs / (24 * 60 * 60 * 1000) ); // milliseconds to days
        //console.log(daysLeft);
        eventNames[i].textContent = events[i].name + " in ...";
        eventCountdown[i].textContent = daysLeft + " days";

    }
            
}
document.getElementById("close").addEventListener("click", ()=>{
    eventDiv.hidden = true;
    overlay.hidden = true;
    const name = document.getElementById("name");
    const date = document.getElementById("date");
    name.value = "";
    date.value = "";

});
document.querySelectorAll(".event-add").forEach(button => {
    button.addEventListener("click", ()=>{
        eventDiv.hidden = false;
        overlay.hidden = false;
        
    })
});
overlay.addEventListener("click", (e)=>{
    if (e.target == overlay) {
        eventDiv.hidden = true;
        overlay.hidden = true;
        const name = document.getElementById("name");
        const date = document.getElementById("date");
        name.value = "";
        date.value = "";
    }
})
/*
function getBattery() {
    navigator.getBattery()
        .then(function(battery){
            var batteryLevel = Math.round(battery.level * 100);
            batteryValue.textContent = batteryLevel + "%";
            currentBatteryDiv.style.width = batteryLevel + "%";
            battery.onchargingchange = () => {
                chargingIcon.hidden = !chargingIcon.hidden;
            }
            battery.addEventListener("levelchange", getBattery);
            battery.addEventListener("chargingchange", getBattery);
        })
}
getBattery();*/
if (navigator.getBattery) {
    navigator.getBattery()
        .then((battery) => {
            function updateBattery() {
                const batteryLevel = Math.round(battery.level * 100);
                batteryValue.textContent = batteryLevel + "%";
                currentBatteryDiv.style.width = batteryLevel + "%";
                if (battery.charging) {
                    chargingIcon.style.display = "block";
                } else {
                    chargingIcon.style.display = "none";
                }
            }
            updateBattery()
            console.log(battery.charging);
            battery.addEventListener("levelchange", updateBattery);
            battery.addEventListener("chargingchange", updateBattery);
        })
        .catch((err) => {
            batteryValue.textContent = "N/A";
            alert("Battery API error: " + err);
        })
} else {
    batteryValue.textContent = "N/A";
}
for (let i = 0; i < eventDelete.length; i++ ) {
    eventDelete[i].addEventListener("click", (e)=>{
        const confirmed = confirm("This will delete the event. Are you sure you want to proceed?");
        if (confirmed) {
            console.log("Deletion Queued");
            events[i] = {
                name: "No event",
                date: ""
            }
            localStorage.setItem("events", JSON.stringify(events));
            displayEvents();
        } else {
            console.log("Deletion cancelled");
        }
    })
}
displayEvents();
async function getQuote() {
    const apiUrl = "https://quotetato.vercel.app/api/quotes/random";
    const response = await fetch(apiUrl);
    var data = await response.json();
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    quoteElement.textContent = data.quote;
    authorElement.textContent = data.author;
}
getQuote();
function addTask() {
    const title = taskName.value;
    taskName.value = "";
    const clone = document.importNode(taskTemplate.content, true);
    clone.querySelector(".task-title").textContent = title;
    document.getElementById("tasks").appendChild(clone);
    tasks.push({
        name: title,
        completed: false
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
taskAdd.addEventListener("click", (e)=>{
    e.preventDefault();
    if (taskName.value === ""){
        alert("You cannot add an empty task!");
    } else {
        addTask()
    }
});
// finish website
document.addEventListener("click", (event)=>{
    if (event.target.classList.contains("task-delete")){
        const taskElement = event.target.closest(".task");
        const titleToDelete = taskElement.querySelector(".task-title").textContent;
        taskElement.remove();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].name === titleToDelete) {
                tasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                break;
            }
        }
    }
})
function loadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const clone = document.importNode(taskTemplate.content, true);
        clone.querySelector(".task-title").textContent = tasks[i].name;
        clone.querySelector(".status").checked = tasks[i].completed;
        document.getElementById("tasks").appendChild(clone);
    }
}
document.addEventListener("change", (event)=>{
    if (event.target.classList.contains("status")){
        const taskElement = event.target.closest(".task");
        const title = taskElement.querySelector(".task-title").textContent;
        const task = tasks.find(t => t.name === title);
        if (task) {
            task.completed = event.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
})
loadTasks()
taskName.addEventListener("keydown", (event)=>{
    if (event.key === "Enter") {
        addTask();
    }
})
document.getElementById("switch-bg").addEventListener("click", ()=>{
    if (document.querySelector(".container")){
        document.querySelector(".container").classList.add("container-2");
        document.querySelector(".container").classList.remove("container");
    } else {
        document.querySelector(".container-2").classList.add("container");
        document.querySelector(".container-2").classList.remove("container-2");
    }

})
document.getElementById("turn-off").addEventListener("click", ()=>{
    if (document.querySelector(".container")){
        document.querySelector(".container").classList.remove("container");
    } else if (document.querySelector(".container-2")) {
        document.getElementById("bg").classList.remove("container-2");
    } else {
        document.getElementById("bg").classList.add("container");
    }
});
const mouseFollower = document.getElementById("mouse-follower");
document.body.addEventListener("pointermove", (event)=>{
    PointerEvent.hidden = true;
    const {clientX, clientY} = event;
    mouseFollower.animate({
        left: `${clientX - 12.5}px`,
        top: `${clientY - 12.5}px`
    
    }, {duration: 0, fill: "forwards"})
})