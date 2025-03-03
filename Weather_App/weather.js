const apikey = "1e97ae59c3871d829d46cc74f621acdf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  if (response.ok) {
    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // 🌦️ Change Weather Icon According to Condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    
    if (weatherCondition.includes("cloud")) {
      weatherIcon.src = "images/cloudy.png";
    } else if (weatherCondition.includes("clear")) {
      weatherIcon.src = "images/clear.jpeg";
    } else if (weatherCondition.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (weatherCondition.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition.includes("thunderstorm")) {
      weatherIcon.src = "images/thunderstorm.png";
    } else if (weatherCondition.includes("snow")) {
      weatherIcon.src = "images/snow.jpeg";
    } else {
      weatherIcon.src = "images/weather.png"; 
    }

  } else {
    alert("City not found. Please try again.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Default city weather on load
checkWeather("Pakistan");