<template>
  <div id="app">
    <AccountList />
  </div>
</template>

<script setup lang="ts">
import AccountList from './components/AccountList.vue'
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: $app-background-color;
}

#app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>