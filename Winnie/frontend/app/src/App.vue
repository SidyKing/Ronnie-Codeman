<template>
  <div id="app">
    <ButtonAuth />
    
    <router-view />
  </div>
</template>

<script>

import ButtonAuth from '@/components/ButtonAuth.vue'
import BanTable from '@/components/BanTable.vue'
import UserSearch from '@/components/UserSearch.vue'
import Chart from '@/components/Chart.vue'

export default {
  name: 'App',
  components: {
    ButtonAuth,
    BanTable,
    UserSearch,
    Chart
  }
};
</script>