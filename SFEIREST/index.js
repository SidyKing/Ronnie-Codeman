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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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

// Afficher les informations météo
function displayWeatherInfo(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  const temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
  const humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  const windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${windSpeed}km/h`;

  const weatherType = response.data.weather[0].main;
  document.querySelector("#weather-type").innerHTML = weatherType;

  // Ajouter des animations basées sur le type de météo
  if (weatherType === "Rain") {
    createRain();
    toggleSun(false);
    toggleClouds(false);
  } else if (weatherType === "Sunny") {
    toggleSun(true);
    toggleClouds(false);
    document.querySelector(".rain").innerHTML = ""; // Arrête la pluie
  } else if (weatherType === "Windy" || weatherType === "Clouds") {
    toggleSun(false);
    toggleClouds(true);
    document.querySelector(".rain").innerHTML = ""; // Arrête la pluie
  } else {
    // Aucune animation par défaut
    toggleSun(false);
    toggleClouds(false);
    document.querySelector(".rain").innerHTML = ""; // Arrête la pluie
  }
}

// Rechercher une ville via l'API
function searchCity(city) {
  const apiKey = "2b5fc755ac2ec59250868b5527df31c4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherInfo);
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
searchCity("Bristol");
