const apiKey = 'cbefa706b94ec8836e327138b61fdef2';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchCity = document.getElementById('search-input');
const searchButton = document.querySelector('.btn-primary');

async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    // update elemnts with weather data
    document.querySelector('#city-name').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector("#desc").innerHTML = data.weather[0].description;
    document.querySelector('#humidity').innerHTML = data.main.humidity + " %";
    document.querySelector('#wind').innerHTML = data.wind.speed + " km/h";
    document.querySelector(".icon-weather-main").src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    console.log(data);
}

searchButton.addEventListener('click', () => {
    getWeather(searchCity.value.trim());
})
