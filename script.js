const body = document.getElementById("body");
const city = document.getElementById("city");
const country = document.getElementById("country");
let lat;
let long;
console.log("loaded")
document.addEventListener("DOMContentLoaded", ()=>{
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
            console.error("GPS_ERROR:", error.code, error.message);
        }
    )
}
    