<template>
  <div id="app">
    <ButtonAuth />
    <router-view />
  </div>
</template>

<script>

import ButtonAuth from '@/components/ButtonAuth.vue'

export default {
  name: 'App',
  components: {
    ButtonAuth
  }
};
</script>