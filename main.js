const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "eed0568fdda777d38384e5c2faebea73";
  const city = document.querySelector(".search-box input").value;
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  if (city === "")
    return;

  fetch(API)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./Rasmlar/clear.png";
          break;

        case "Rain":
          image.src = "./Rasmlar/rain.jpg.png";
          break;

        case "Snow":
          image.src = "./Rasmlar/snow.jpg";
          break;

        case "Clouds":
          image.src = "./Rasmlar/images.jpg";
          break;

        case "Haze":
          image.src = "./Rasmlar/mist.jpg.png";
          break;

        default:
          image.src = "";
      }
      temperature.innerHTML = `${parseInt(json.main.temp - 273.15).toFixed(1)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
    console.log(API);
});