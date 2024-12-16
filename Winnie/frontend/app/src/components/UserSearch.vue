<template>
    <div class="card p-4 mb-5">
      <h2>Search for Banned User</h2>
      <form @submit.prevent="searchUser">
        <div class="mb-3">
          <label for="searched_ip" class="form-label">Enter IP Address:</label>
          <input type="text" class="form-control" id="searched_ip" v-model="searchedIP" placeholder="e.g., 192.168.1.1" />
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchedIP: ''
      };
    },
    methods: {
      searchUser() {
        // Traitez la recherche ici, peut-être une requête API
        console.log('Recherche IP:', this.searchedIP);
      }
    }
  };
  </script>
  