<template>
  <Main msg ="hello" />
</template>

<script>
import Main from './pages/main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="scss">
@import './css/reset.css';
#app {
  width: 100%;
  height: 100%;
}

</style>
