const API_KEY = "4d553e4f2e17f36809008976da8a6f18"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherContainer = document.getElementById("weather-container");
        const city = weatherContainer.querySelector("span:first-child");
        const weatherSpan = weatherContainer.querySelector("span:last-child");
        city.innerText = data.name;
        
        const weather = `${data.weather[0].description} | ${data.main.temp}℃`;
        weatherSpan.innerText = weather;
    });
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);