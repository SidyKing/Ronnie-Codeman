<template>
    <div v-if="!isAuthPage" class="auth-buttons-container">
      <button @click="goToRegister">S'inscrire</button>
      <button @click="goToLogin">Se connecter</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonAuth',
    computed: {
      // Vérifie si la route actuelle est l'une des pages d'authentification
      isAuthPage() {
        return this.$route.path === '/login' || this.$route.path === '/register';
      }
    },
    methods: {
      goToRegister() {
        this.$router.push('/register'); // Redirection vers la page d'inscription
      },
      goToLogin() {
        this.$router.push('/login'); // Redirection vers la page de connexion
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-buttons-container {
    display: flex;
    gap: 10px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
  }
  
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  