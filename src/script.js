function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp= Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#temp-now").innerHTML = `${currentTemp}`;
  document.querySelector("#high-temp").innerHTML = `${highTemp}`;
  document.querySelector("#low-temp").innerHTML = `${lowTemp}`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeed} KM/H`;
  let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  celsiusHighTemp = response.data.main.temp_max;
  celsiusLowTemp = response.data.main.temp_min;
}

function searchCity(event) {
  let apiKey = "28e5d779cb15e67167736268bc70d36f";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
 let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
 let temperatureElement = document.querySelector("#temp-now");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
let fahrenheitHighTemperature = (celsiusHighTemp * 9) / 5 + 32;
let fahrenheitLowTemperature = (celsiusLowTemp * 9) / 5 + 32;
document.querySelector("#high-temp").innerHTML = Math.round(fahrenheitHighTemperature);
document.querySelector("#low-temp").innerHTML = Math.round(fahrenheitLowTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
let celsiusHighTemperature = celsiusHighTemp;
let celsiusLowTemperature = celsiusLowTemp;
document.querySelector("#high-temp").innerHTML = Math.round(celsiusHighTemperature);
document.querySelector("#low-temp").innerHTML = Math.round(celsiusLowTemperature);
}

let celsiusTemperature = null;
let celsiusHighTemp = null;
let celsiusLowTemp= null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
