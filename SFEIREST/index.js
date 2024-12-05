// Formater l'heure et le jour
function formatTime(date) {
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

function formatDay(date) {
  const dayArray = date.getDay();
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];
  const day = days[dayArray];
  return day;
}

// Mettre à jour l'heure et le jour actuels
const currentTime = document.querySelector("#current-time");
let newCurrentTime = new Date();
currentTime.innerHTML = formatTime(newCurrentTime);

const currentDay = document.querySelector("#current-day");
let newCurrentDay = new Date();
currentDay.innerHTML = formatDay(newCurrentDay);

// Générer des gouttes de pluie
function createRain() {
  const rainContainer = document.querySelector(".rain");
  rainContainer.innerHTML = ""; // Réinitialiser la pluie

  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDelay = `${Math.random()}s`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
    rainContainer.appendChild(drop);
  }
}

// Activer/Désactiver le soleil
function toggleSun(show) {
  const sun = document.querySelector(".sun");
  sun.style.display = show ? "block" : "none";
}

// Activer/Désactiver les nuages
function toggleClouds(show) {
  const clouds = document.querySelectorAll(".cloud");
  clouds.forEach((cloud) => {
    cloud.style.display = show ? "block" : "none";
  });
}

// Activer/Désactiver les éclairs
function toggleLightning(show) {
  const lightning = document.querySelector(".lightning");
  lightning.style.display = show ? "block" : "none";
}

// Activer/Désactiver le brouillard
function toggleMist(show) {
  const mist = document.querySelector(".mist");
  mist.style.display = show ? "block" : "none";
}

// Générer la neige
function createSnow() {
  const snowContainer = document.querySelector(".snow");
  snowContainer.innerHTML = ""; // Réinitialiser la neige

  for (let i = 0; i < 100; i++) {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");
    flake.style.left = `${Math.random() * 100}vw`;
    flake.style.animationDelay = `${Math.random() * 5}s`;
    flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowContainer.appendChild(flake);
  }
}

function translateWeatherType(type) {
  const translations = {
    Rain: "Pluie",
    Sunny: "Ensoleillé",
    Snow: "Neige",
    Thunderstorm: "Orage",
    Mist: "Brouillard",
    Clouds: "Nuageux",
    Windy: "Venteux"
  };
  return translations[type] || type;
}

// Afficher les informations météo
function displayWeatherInfo(response) {
  console.log(response.data);


  // Récupérer les coordonnées
  const lat = response.data.coord.lat;
  const lon = response.data.coord.lon;
  getWeeklyForecast(lat, lon);
  document.querySelector("#searched-city").innerHTML = response.data.name;
  const temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
  const humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  const windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${windSpeed}km/h`;

  const weatherType = response.data.weather[0].main;
  //document.querySelector("#weather-type").innerHTML = weatherType;
  document.querySelector("#weather-type").innerHTML = translateWeatherType(weatherType);


  // Ajouter des animations basées sur le type de météo
  // Ajouter des animations basées sur le type de météo
  if (weatherType === "Thunderstorm") {
    toggleLightning(true);
    toggleMist(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Mist") {
    toggleMist(true);
    toggleLightning(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Snow") {
    createSnow();
    toggleMist(false);
    toggleLightning(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Rain") {
    createRain();
    toggleMist(false);
    toggleLightning(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Sunny") {
    toggleSun(true);
    toggleMist(false);
    toggleLightning(false);
    toggleClouds(false);
    document.querySelector(".rain").innerHTML = "";
    document.querySelector(".snow").innerHTML = "";
  } else {
    // Par défaut
    toggleSun(false);
    toggleClouds(true);
    toggleMist(false);
    toggleLightning(false);
    document.querySelector(".rain").innerHTML = "";
    document.querySelector(".snow").innerHTML = "";
  }

}

// Rechercher une ville via l'API
function searchCity(city) {
  const apiKey = "2b5fc755ac2ec59250868b5527df31c4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherInfo);
}
// Afficher les prévisions météo hebdomadaires
function getWeeklyForecast(lat, lon) {
  const apiKey = "2b5fc755ac2ec59250868b5527df31c4"; // Remplacez par votre clé API
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  axios.get(apiUrl)
    .then(response => {
      displayWeeklyForecast(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des prévisions :", error);
    });
}

function displayWeeklyForecast(data) {
  const weekForecast = document.querySelector("#week-forecast-2");
  weekForecast.innerHTML = ""; // Efface le contenu actuel


  // Filtrer pour une prévision par jour (heure : 12:00:00)
  const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

  dailyForecasts.forEach(day => {
    const new_weather = translateWeatherType(day.weather[0].main);
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" });

    const forecastHTML = `
      <div class="col">
        <h3 class="day">${dayName}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
        <p class="weather">${new_weather}</p>
        <span class="temp">${Math.round(day.main.temp)}°C</span>
      </div>
    `;
    weekForecast.innerHTML += forecastHTML;
  });
}



// Gestion de la soumission du formulaire de recherche
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}



const searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

// Recherche par défaut pour afficher une ville au chargement
searchCity("Anglet");

