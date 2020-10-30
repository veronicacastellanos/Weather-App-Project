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
  document.querySelector("#temp-now").innerHTML = `${currentTemp}°C`;
  document.querySelector("#high-temp").innerHTML = `${highTemp}°C`;
  document.querySelector("#low-temp").innerHTML = `${lowTemp}°C`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeed} KM/H`;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
