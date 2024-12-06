const API_URL = "https://voituresuperrapide.pythonanywhere.com";

// Navigation entre les pages
function showLogin() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("homePage").classList.add("hidden");
}

function showRegister() {
  document.getElementById("registerPage").classList.remove("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("homePage").classList.add("hidden");
}

function showHome(user) {
  document.getElementById("homePage").classList.remove("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("welcomeMessage").textContent = `Bonjour, ${user.email}`;
}

// Gestion du login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token); // Stocke le token
      showHome({ email });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erreur lors du login";
    alert(errorMessage);
  }
});

// Gestion du register
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const response = await axios.post(`${API_URL}/register`, {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      alert("Inscription réussie ! Veuillez vous connecter.");
      showLogin();
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
    alert(errorMessage);
  }
});

// Gestion du logout
function logout() {
  localStorage.removeItem("token");
  showLogin();
}
