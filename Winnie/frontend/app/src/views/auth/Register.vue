<template>
    <div class="register-page">
      <!-- Texte Matrix -->
      <h1 class="matrix-text">INFORMATRIQUES</h1>
      
      <!-- Formulaire d'inscription -->
      <div class="register-form">
        <h2>Inscription</h2>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="firstname">Prénom</label>
            <input v-model="firstname" type="text" required />
          </div>
          <div class="form-group">
            <label for="lastname">Nom</label>
            <input v-model="lastname" type="text" required />
          </div>
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input v-model="username" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" required />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input v-model="password" type="password" required />
          </div>
          <button type="submit" class="register-button">S'inscrire</button>
        </form>
        <p>Déjà un compte ? <router-link to="/login">Se connecter</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async registerUser() {
        if (!this.firstname || !this.lastname || !this.username || !this.email || !this.password) {
          alert('Tous les champs sont requis.');
          return;
        }
        if (this.password.length < 6) {
          alert('Le mot de passe doit contenir au moins 6 caractères.');
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:8000/auth/register', {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            password: this.password,
          });
  
          alert(response.data.message || 'Inscription réussie!');
          this.$router.push('/login');
        } catch (error) {
          console.error('Erreur d\'inscription:', error.response ? error.response.data : error.message);
          alert(error.response?.data?.message || 'Une erreur s\'est produite, veuillez réessayer.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles globaux pour la page */
  .register-page {
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
  .register-form {
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
  
  /* Bouton d'inscription */
  .register-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  
  /* Lien de connexion */
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
  