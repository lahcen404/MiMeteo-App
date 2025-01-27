const apiKey = 'cbefa706b94ec8836e327138b61fdef2';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiFive = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const searchCity = document.getElementById('search-input');
const searchButton = document.querySelector('.btn-primary');

async function getWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        // update elements with weather data
        document.querySelector('#city-name').innerHTML = data.name;
        document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector("#desc").innerHTML = data.weather[0].description;
        document.querySelector('#humidity').innerHTML = data.main.humidity + " %";
        document.querySelector('#wind').innerHTML = data.wind.speed + " km/h";
        document.querySelector(".icon-weather-main").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        console.log(data);
    } catch (error) {
        alert('City not found..  enter a valid city name!!');
        console.error(error);
    }
}

async function getFiveDaysWeather(city) {
    const forecastResponse = await fetch(apiFive + city + `&appid=${apiKey}`);
    const fiveDaysData = await forecastResponse.json();
    console.log(fiveDaysData);

    const days = fiveDaysData.list.filter((item) => item.dt_txt.includes('12:00:00'));

    for (let i = 0; i < 5; i++) {
        document.querySelector(`#day${i + 1}-name`).innerHTML = new Date(days[i].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        document.querySelector(`.temp${i + 1}`).innerHTML = Math.round(days[i].main.temp) + " °C";
        document.querySelector(`.icon${i + 1}`).src = `http://openweathermap.org/img/wn/${days[i].weather[0].icon}.png`;
    }
}

function Localisation() {

        navigator.geolocation.getCurrentPosition((position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByCoordinates(lat, lon);
            getFiveDaysWeatherByCoordinates(lat, lon);
        });
    
}

async function getWeatherByCoordinates(lat, lon) {
   
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        // update elements with weather data
        document.querySelector('#city-name').innerHTML = data.name;
        document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector("#desc").innerHTML = data.weather[0].description;
        document.querySelector('#humidity').innerHTML = data.main.humidity + " %";
        document.querySelector('#wind').innerHTML = data.wind.speed + " km/h";
        document.querySelector(".icon-weather-main").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        console.log(data);
   
}

async function getFiveDaysWeatherByCoordinates(lat, lon) {
    
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const fiveDaysData = await forecastResponse.json();
        console.log(fiveDaysData);

        const days = fiveDaysData.list.filter((item) => item.dt_txt.includes('12:00:00'));

        for (let i = 0; i < 5; i++) {
            document.querySelector(`#day${i + 1}-name`).innerHTML = new Date(days[i].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            document.querySelector(`.temp${i + 1}`).innerHTML = Math.round(days[i].main.temp) + " °C";
            document.querySelector(`.icon${i + 1}`).src = `http://openweathermap.org/img/wn/${days[i].weather[0].icon}.png`;
        }
   
}

searchButton.addEventListener('click', () => {
    getWeather(searchCity.value.trim());
    getFiveDaysWeather(searchCity.value.trim());
});

// loaading automatic page
window.addEventListener('load', Localisation);