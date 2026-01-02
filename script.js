const apiKey = "4afa06fd90985c81fb2fee1385ad12a5"; // OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});


async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
   
   const condition = data.weather[0].description.toLowerCase();
   const iconEl = document.getElementById("icon");
   const now = data.dt;
   const sunrise = data.sys.sunrise;
   const sunset = data.sys.sunset;
   const isNight = now < sunrise || now > sunset;


if (condition.includes("clear")) {
  iconEl.textContent = isNight ? "🌙" : "☀️";
} else if (condition.includes("cloud")) {
  iconEl.textContent = "☁️";
} else if (condition.includes("rain")) {
  iconEl.textContent = "🌧️";
} else if (condition.includes("snow")) {
  iconEl.textContent = "❄️";
} else if (condition.includes("thunder")) {
  iconEl.textContent = "⛈️";
} else if (condition.includes("mist") || condition.includes("fog")) {
  iconEl.textContent = "🌫️";
} else {
  iconEl.textContent = "🌡️";
}


  } catch (error) {
    alert("City not found!");
  }
}
