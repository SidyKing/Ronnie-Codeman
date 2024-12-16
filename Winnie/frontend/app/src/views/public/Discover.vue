<template>
  <div class="discover-page">
    <div class="content-container">
      <h1 class="title">Découvrez l'univers de Ronnie Codeman</h1>
      <p class="description">
        Explorez des solutions innovantes, plongez dans le code et découvrez un monde d'opportunités technologiques.
      </p>
      <router-link to="/" class="home-link">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discover',
};
</script>

<style scoped>
.discover-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e1e1e, #2b2b2b);
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

.content-container {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
}

.title {
  font-size: 2.5rem;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
}

.description {
  margin: 20px 0;
  font-size: 1.2rem;
  color: #bfbfbf;
  line-height: 1.5;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: #00ff00;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.home-link:hover {
  background-color: #00cc00;
  transform: scale(1.1);
}
</style>