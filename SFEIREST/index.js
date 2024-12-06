// Fonction pour formater l'heure
function formatTime2(date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Fonction pour formater le jour
function formatDay2(date) {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[date.getDay()];
}
function updateWeather(weatherData) {
  // Supposons que weatherData soit l'objet retourné par l'API avec des infos météo.
  console.log(weatherData);
  const mainWeather = weatherData.weather[0].main.toLowerCase(); // Type de météo, ex. 'rain', 'clear'

  // 1. Mettez à jour la température et les données textuelles
  document.getElementById('current-temperature').textContent = `${Math.round(weatherData.main.temp)}°`;
  document.getElementById('weather-type').textContent = weatherData.weather[0].description;
  document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
  document.getElementById('wind').textContent = `${weatherData.wind.speed} km/h`;

  // Mettre à jour l'heure
  const currentTime = document.querySelector("#current-time");
  const timestamp = weatherData.dt * 1000; // Convertir en millisecondes
  const date = new Date(timestamp);
  currentTime.innerHTML = formatTime2(date);

  // Mettre à jour le jour
  const currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formatDay2(date);



  // 2. Reset des classes CSS des backgrounds
  document.body.className = ''; // Enlève toutes les classes précédentes
  document.querySelector('.rain').style.display = 'none';
  document.querySelector('.snow').style.display = 'none';
  document.querySelector('.mist').style.display = 'none';
  document.querySelector('.sun').style.display = 'none';
  document.querySelectorAll('.cloud').forEach((cloud) => (cloud.style.display = 'none'));
  document.querySelector('.lightning').style.display = 'none';

  // 3. Appliquez la classe et animations correspondantes
  switch (mainWeather) {
    case 'clear':
      document.body.classList.add('sunny-background');
      document.querySelector('.sun').style.display = 'block';
      break;

    case 'rain':
      document.body.classList.add('rain-background');
      document.querySelector('.rain').style.display = 'block';
      break;

    case 'snow':
      document.body.classList.add('snow-background');
      document.querySelector('.snow').style.display = 'block';
      break;

    case 'clouds':
      document.body.classList.add('default-background');
      document.querySelectorAll('.cloud').forEach((cloud) => (cloud.style.display = 'block'));
      break;

    case 'thunderstorm':
      document.body.classList.add('thunderstorm-background');
      document.querySelector('.lightning').style.display = 'block';
      break;

    case 'mist':
      document.body.classList.add('mist-background');
      document.querySelector('.mist').style.display = 'block';
      break;
    case 'fog':
      document.body.classList.add('mist-background');
      document.querySelector('.mist').style.display = 'block';
      break;

    default:
      document.body.classList.add('default-background');
      break;
  }
}





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
  //change body color attribute
  document.body.style.color = "#fff";

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
  document.body.style.color = "#000";
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
  document.body.style.color = "#fff";
  const mist = document.querySelector(".mist");
  mist.style.display = show ? "block" : "none";
}

// Générer la neige
function createSnow() {
  document.body.style.color = "#000";
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
  let weatherType = response.data.weather[0].main;

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

  //const weatherType = response.data.weather[0].main;
  //document.querySelector("#weather-type").innerHTML = weatherType;
  document.querySelector("#weather-type").innerHTML = translateWeatherType(weatherType);

  // Ajouter des animations et le fond d'écran
  updateBackground(weatherType);

  // Ajouter des animations basées sur le type de météo
  // Ajouter des animations basées sur le type de météo
  if (weatherType === "Thunderstorm" || weatherType === "Drizzle") {
    toggleLightning(true);
    toggleMist(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Mist" || weatherType === "Fog" || weatherType === "Haze") {
    toggleMist(true);
    toggleLightning(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Snow" || weatherType === "Sleet") {
    document.querySelector(".rain").innerHTML = "";
    createSnow();
    toggleMist(false);
    toggleLightning(false);
    toggleSun(false);
    toggleClouds(true);
  } else if (weatherType === "Rain") {
    document.querySelector(".snow").innerHTML = "";
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

  // Ajouter un tableau pour garder les données des jours
  const daysData = {};

  dailyForecasts.forEach((day, index) => {
    const new_weather = translateWeatherType(day.weather[0].main);
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" });

    // Stocker les données dans l'objet daysData
    daysData[index] = day;

    const forecastHTML = `
      <div class="col" data-day="${index}">
        <h3 class="day">${dayName}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
        <p class="weather">${new_weather}</p>
        <span class="temp">${Math.round(day.main.temp)}°C</span>
      </div>
    `;
    weekForecast.innerHTML += forecastHTML;
  });
  // Ajouter des écouteurs sur chaque jour
  document.querySelectorAll('.col').forEach(dayElement => {
    dayElement.addEventListener('click', () => {
      const day = dayElement.getAttribute('data-day');
      console.log(daysData[day]);
      updateWeather(daysData[day]); // Met à jour la météo pour le jour sélectionné
    });
  });
}

function updateBackground(weatherType) {
  const body = document.querySelector("body");

  // Supprimer les anciennes classes de fond
  body.className = "";

  // Ajouter une nouvelle classe basée sur le type de météo
  switch (weatherType) {
    case "Clear":
      body.classList.add("sunny-background");
      break;
    case "Rain":
      body.classList.add("rain-background");
      break;
    case "Thunderstorm":
      body.classList.add("thunderstorm-background");
      break;
    case "Mist":
    case "Fog":
      body.classList.add("mist-background");
      break;
    case "Snow":
      body.classList.add("snow-background");
      break;
    default:
      body.classList.add("default-background");
      break;
  }
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

