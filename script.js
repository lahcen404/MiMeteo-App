const apiKey = 'cbefa706b94ec8836e327138b61fdef2';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiFive = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q='
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

async function getFiveDaysWeather(city){
    const forecastResponse = await fetch(apiFive + city + `&appid=${apiKey}`);
    const fiveDaysData = await forecastResponse.json();
    console.log(fiveDaysData);

const days = fiveDaysData.list.filter((item) => item.dt_txt.includes('12:00:00'));
document.querySelector('#day1-name').innerHTML=new Date(days[0].dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
document.querySelector('#day2-name').innerHTML=new Date(days[1].dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
document.querySelector('#day3-name').innerHTML=new Date(days[2].dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
document.querySelector('#day4-name').innerHTML=new Date(days[3].dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
document.querySelector('#day5-name').innerHTML=new Date(days[4].dt_txt).toLocaleDateString('en-US', {weekday: 'long'});

document.querySelector('.temp1').innerHTML=Math.round(days[0].main.temp) + " °C";
document.querySelector('.temp2').innerHTML=Math.round(days[1].main.temp) + " °C";
document.querySelector('.temp3').innerHTML=Math.round(days[2].main.temp) + " °C";
document.querySelector('.temp4').innerHTML=Math.round(days[3].main.temp) + " °C";
document.querySelector('.temp5').innerHTML=Math.round(days[4].main.temp) + " °C";

document.querySelector('.icon1').src= `http://openweathermap.org/img/wn/${days[0].weather[0].icon}.png`;
document.querySelector('.icon2').src= `http://openweathermap.org/img/wn/${days[1].weather[0].icon}.png`;
document.querySelector('.icon3').src= `http://openweathermap.org/img/wn/${days[2].weather[0].icon}.png`;
document.querySelector('.icon4').src= `http://openweathermap.org/img/wn/${days[3].weather[0].icon}.png`;
document.querySelector('.icon5').src= `http://openweathermap.org/img/wn/${days[4].weather[0].icon}.png`;
}



searchButton.addEventListener('click', () => {
    getWeather(searchCity.value.trim());
    getFiveDaysWeather(searchCity.value.trim())
})

