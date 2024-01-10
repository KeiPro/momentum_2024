function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherContainer = document.getElementById("weather");
        const city = weatherContainer.querySelector("span:first-child");
        const weatherSpan = weatherContainer.querySelector("span:last-child");
        city.innerText = data.name;

        const weather = `${data.weather[0].main} / ${data.main.temp}`;
        weatherSpan.innerText = weather;
    });
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);