<template>
    <div v-if="userDetails.length" class="card p-4 mb-5">
      <h2>Details for IP: {{ userDetails[0].IP }}</h2>
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>IP</th>
            <th>Ban Type</th>
            <th>Timestamp</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in userDetails" :key="index">
            <td>{{ detail.IP }}</td>
            <td>{{ detail['Ban Type'] }}</td>
            <td>{{ detail.Timestamp }}</td>
            <td>{{ detail['User Agent'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userDetails: Array
    }
  };
  </script>
  