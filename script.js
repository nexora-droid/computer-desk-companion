const body = document.getElementById("body");
const country = document.getElementById("location-data");
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
        console.log(data.city);
        console.log(data.country_name);
        console.log(data.latitude);
        console.log(data.longitude);
        city.textContent = data.city;
        if (data.city == data.country_name) {
            country.textContent = " ";
        } else {
            country.textContent = data.country_name;
        }
    });
});
    