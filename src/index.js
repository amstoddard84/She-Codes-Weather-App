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
let hour = fullDate.getHours();
let minute = fullDate.getMinutes();

let date = document.querySelector("#current-date");
let time = document.querySelector("#current-time");

date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${fullDate.getFullYear()}`;
time.innerHTML = `${hour}:${minute}`;

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}% humidity`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph wind`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "eaba586c718e9928d025519220f8eb35";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
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
let farenheitTemperataure = document.querySelector("#far-temp");
farenheitTemperataure.addEventListener("click", tempConvertFar);

let citySubmit = document.querySelector(".search-form");
citySubmit.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Atlanta");
