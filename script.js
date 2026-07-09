const body = document.getElementById("body");
const city = document.getElementById("city");
const country = document.getElementById("country");
let lat;
let long;
let timeout;
console.log("loaded");
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