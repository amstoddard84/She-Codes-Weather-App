let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let fullDate = new Date();
let currentDay = days[fullDate.getDay()];
let currentMonth = months[fullDate.getMonth()];
let currentDate = fullDate.getDate();

let date = document.querySelector("#current-date");
let time = document.querySelector("#current-time");

date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${fullDate.getFullYear()}`;
time.innerHTML = fullDate.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  currentTemperature = Math.round(response.data.main.temp);

  document.querySelector(
    "#precipitation"
  ).innerHTML = `Precipitation: ${response.data.main.humidity}%`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
<div class="col-2">
<h4 class="forecast-time">${formatHours(forecast.dt * 1000)}</h4>
<img 
src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
/>
<span class="temp">${Math.round(forecast.main.temp_max)}° | ${Math.round(
      forecast.main.temp_min
    )}°
      </span>
</div>`;
  }
}

function searchCity(city) {
  let apiKey = "eaba586c718e9928d025519220f8eb35";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "eaba586c718e9928d025519220f8eb35";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function tempConvertCels(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".current-temp");
  tempElement.innerHTML = `${Math.round(((currentTemperature - 32) * 5) / 9)}`;
}

function tempConvertFar(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `${currentTemperature}`;
}

let currentTemperature = 0;

let celciusTemperataure = document.querySelector("#cels-temp");
celciusTemperataure.addEventListener("click", tempConvertCels);
let fahrenheitTemperataure = document.querySelector("#far-temp");
fahrenheitTemperataure.addEventListener("click", tempConvertFar);

let citySubmit = document.querySelector(".search-form");
citySubmit.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Atlanta");
