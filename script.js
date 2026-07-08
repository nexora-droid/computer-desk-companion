const body = document.getElementById("body");
const city = document.getElementById("city");
const country = document.getElementById("country");
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
    });
});
    