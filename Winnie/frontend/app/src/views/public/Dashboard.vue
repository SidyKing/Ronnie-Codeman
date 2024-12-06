<template>
    <div class="dashboard-container">
      <h1>Banned Users Dashboard</h1>
  
      <!-- Bouton de déconnexion -->
      <button @click="logoutUser" class="logout-button">Déconnexion</button>
  
      <!-- Section de recherche -->
      <div class="card p-4 mb-5">
        <h2>Search for Banned User</h2>
        <form @submit.prevent="searchUser">
          <div class="mb-3">
            <label for="searched_ip" class="form-label">Enter IP Address:</label>
            <input type="text" v-model="searchedIp" class="form-control" id="searched_ip" placeholder="e.g., 192.168.1.1" />
          </div>
          <button type="submit" class="btn btn-primary">Search</button>
        </form>
      </div>
  
      <!-- Résultats de la recherche -->
      <div v-if="userDetails" class="card p-4 mb-5">
        <h2>Details for IP: {{ userDetails.IP }}</h2>
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">IP</th>
              <th scope="col">Ban Type</th>
              <th scope="col">Timestamp</th>
              <th scope="col">User Agent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userDetails.IP }}</td>
              <td>{{ userDetails.BanType }}</td>
              <td>{{ userDetails.Timestamp }}</td>
              <td>{{ userDetails.UserAgent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Section des graphiques -->
      <div class="chart-container mb-5">
        <h2>Ban Types Distribution</h2>
        <canvas id="banTypeChart"></canvas>
      </div>
  
      <div class="chart-container mb-5">
        <h2>Bans by IP</h2>
        <canvas id="bansByIPChart"></canvas>
      </div>
  
      <!-- Section des utilisateurs bannis -->
      <div class="card p-4">
        <h2>Banned Users</h2>
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">IP</th>
              <th scope="col">Ban Type</th>
              <th scope="col">Timestamp</th>
              <th scope="col">User Agent</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ban in bannedUsers" :key="ban.IP">
              <td>{{ ban.IP }}</td>
              <td>{{ ban.BanType }}</td>
              <td>{{ ban.Timestamp }}</td>
              <td>{{ ban.UserAgent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      searchedIp: '',
      userDetails: null,
      bannedUsers: [],
    };
  },
  methods: {
    logoutUser() {
      // Supprimer le jeton de connexion (si stocké dans localStorage ou autre méthode)
      localStorage.removeItem('token');
      // Rediriger vers la racine ("/")
      this.$router.push('/');
    },
    searchUser() {
      // Logique de recherche utilisateur (ici, une simulation)
      if (this.searchedIp === '192.168.1.1') {
        this.userDetails = {
          IP: '192.168.1.1',
          BanType: 'Temporary',
          Timestamp: '2024-12-06 12:30:00',
          UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        };
      } else {
        this.userDetails = null;
        alert('User not found!');
      }
    },
  },
  mounted() {
    // Vérifier si un token existe, sinon rediriger vers la page de connexion
    if (!localStorage.getItem('token')) {
      this.$router.push('/login');
    } else {
      this.bannedUsers = [
        { IP: '192.168.1.1', BanType: 'Temporary', Timestamp: '2024-12-06 12:30:00', UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        { IP: '192.168.1.2', BanType: 'Permanent', Timestamp: '2024-12-05 15:15:00', UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      ];
      this.renderCharts();
    }
  },
  methods: {
    renderCharts() {
      // Logique de rendu des graphiques
    },
  },
};
</script>
  
  <style scoped>
  .logout-button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .logout-button:hover {
    background-color: darkred;
  }
  </style>
  