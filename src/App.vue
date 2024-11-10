<template>
  <div class="container">
    <HeaderLayout />
    <!-- <MainPage />
    <RestaurantList />
    <Location /> -->
    <!-- <Login /> -->
     <!-- 변경될 페이지 보여질 공간 -->
		<router-view />
    <FooterLayout />
  </div>
  <!-- <Main msg ="hello" /> -->
</template>

<script>
import HeaderLayout from './components/Header.vue';
import FooterLayout from './components/Footer.vue';
// import MainPage from './components/MainPage.vue';
// import Location from './components/LocationPage.vue';
// import RestaurantList from './components/RestaurantListPage.vue';

export default {
  name: 'App',
  components: {
    HeaderLayout,
    FooterLayout,
    // MainPage,
    // Location,
    // RestaurantList,
  }
}
</script>

<style lang="scss">
@import './css/reset.css';
#app {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}

</style>
