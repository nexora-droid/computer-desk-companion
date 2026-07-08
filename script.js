const body = document.getElementById("body");
const city = document.getElementById("city");
const country = document.getElementById("country");
let lat;
let long;
let timeout;
console.log("loaded")
document.addEventListener("DOMContentLoaded", ()=>{
    checkVisited()
    if (navigator.permissions) {
        navigator.permissions.query({name: "geolocation"})
            .then(function(result) {
                if (result.state == "granted") {
                    return;
                } else if (result.state == "prompt") {
                    alert("We use your location for approximate location detection, and weather statistics");
                } else {
                    const temp_e = document.getElementById("temp-c"); 
                    temp_e.textContent = "Permission Denied";
                    temp_e.style.fontSize = "medium";
                    country.textContent = "Permission Denied"
                    country.style.fontSize = "small";
                    city.textContent = "Permission Denied";
                    city.style.fontSize = "medium";
                    const weather = document.getElementById("weather");
                    weather.textContent = "Permission Denied";
                    weather.style.fontSize = "medium";
                }
            })
    }
    fetch("https://api.ipapi.is/")
        .then(res => res.json())
        .then(data => {
            console.log(data.location.city);
            console.log(data.location.country);
            city.textContent = data.location.city;
            if (data.location.city == data.location.country) {
                country.hidden = true;
            } else {
                country.textContent = data.location.country;
            }
            getLocation()
            //return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,visibility,relative_humidity_2m,is_day&forecast_days=1&timezone=auto`)
        })
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
function getLocation() {
    console.log("fetching")
    navigator.geolocation.getCurrentPosition(
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
            console.log(data)
            const hour = new Date().getHours();
            const temp = data.hourly.temperature_2m[hour];
            const wc = data.hourly.weather_code[hour];
            const day = Boolean(data.hourly.is_day[hour]);
            const temp_e = document.getElementById("temp-c"); 
            temp_e.textContent = temp + "℃";
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
            maximumAge : 30000
        }
    )
}
function checkVisited() {
    if (!localStorage.getItem("hasVisited")){
        localStorage.setItem("hasVisited", true);
        timeout = 60000;
    } else {
        timeout = 20000;
    }
    return;
}
    