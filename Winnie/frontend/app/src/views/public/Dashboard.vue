<template>
    <div class="login-page">
      <!-- Texte Matrix -->
      <h1>RONNIE CODEMAN</h1>
      
      <!-- Formulaire de connexion -->
      <div class="login-form">
        <h2>Connexion</h2>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input v-model="username" type="text" required />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input v-model="password" type="password" required />
          </div>
          <button type="submit" class="login-button">Se connecter</button>
        </form>
        <p>Pas encore de compte ? <router-link to="/register">S'inscrire</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',  // Ce champ peut être un email ou un username
        password: '',
      };
    },
    methods: {
      async loginUser() {
        try {
          // Appel API pour se connecter
          const response = await axios.post('https://voituresuperrapide.pythonanywhere.com/login', {
            username: this.username,
            password: this.password,
          });
  
          // Si la connexion est réussie, rediriger l'utilisateur
          // vers le tableau de bord externe
          if (response.data.token) {
            // Vous pouvez également stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirection vers le tableau de bord externe
            window.location.href = 'https://voituresuperrapide.pythonanywhere.com/banned_dashboard';
          }
        } catch (error) {
          console.error('Erreur de connexion:', error);
          alert('Erreur de connexion, veuillez réessayer.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles globaux pour la page */
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: black;
    color: white;
  }
  
  /* Texte Matrix */
  .matrix-text {
    font-family: 'Press Start 2P', monospace;
    font-size: 3rem;
    color: #00ff00;
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
    margin-bottom: 30px;
  }
  
  /* Conteneur du formulaire */
  .login-form {
    background-color: #1e1e1e;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 100%;
    max-width: 400px;
  }
  
  /* Champs de formulaire */
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #00ff00;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #333;
    color: white;
  }
  
  /* Bouton de connexion */
  .login-button {
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  /* Lien d'inscription */
  p {
    margin-top: 15px;
    font-size: 0.9rem;
  }
  
  router-link {
    color: #00ff00;
    text-decoration: none;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  