<template>
    <div class="homepage">
      <div class="welcome-container">
        <h1 class="title">Bienvenue chez</h1>
        <h1 class="highlight">RONNIE CODEMAN</h1>
        <p class="subtitle">L'univers du code et de l'innovation.</p>
        <button class="cta-button" @click="navigateToDiscover">Découvrir</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    methods: {
      navigateToDiscover() {
        this.$router.push('/discover'); // Redirection vers la route Discover
      },
    },
  };
  </script>
  
  <style scoped>
  .homepage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, black, black);
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
  }
  
  .welcome-container {
    text-align: center;
    padding: 20px;
    max-width: 800px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  }
  
  .title {
    font-size: 2rem;
    color: #bfbfbf;
  }
  
  .highlight {
    font-size: 3rem;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
    margin: 10px 0;
  }
  
  .subtitle {
    margin: 20px 0;
    font-size: 1.2rem;
    color: #bfbfbf;
    line-height: 1.5;
  }
  
  .cta-button {
    padding: 15px 30px;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;
    background: #00ff00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #00cc00;
    transform: scale(1.1);
  }
  </style>
  