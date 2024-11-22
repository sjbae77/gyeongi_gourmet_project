<template>
  <div class="container">
    <div class="inner">
      <HeaderLayout />
      <!-- <MainPage />
      <RestaurantList />
      <Location /> -->
      <!-- <Login /> -->
      <!-- 변경될 페이지 보여질 공간 -->
      <div class="content-layout">
        <router-view />
      </div>
      <FooterLayout />
    </div>
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
body {
	font-family: 'Noto Sans KR', sans-serif;
  color: #1E3049;
}

.color-green {
  color: #2E9A47;
  font-weight: bold;
  font-size: 22px;
}

a {
  text-decoration: none;
  outline: none;
  color: #666;
}

#app {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
.inner {
  padding: 0 140px;
}
.content-layout {
  width: 100%;
  height: calc(100% - 340px);
  padding: 140px 0 340px;
}

/* 스크롤바 전체 */
::-webkit-scrollbar {
    width: 12px;               /* 스크롤바 너비 */
    height: 12px;              /* 가로 스크롤바 높이 */
}

/* 스크롤바 트랙 (배경) */
::-webkit-scrollbar-track {
    // background: #f1f1f1;       /* 스크롤바 배경색 */
    border-radius: 10px;       /* 둥근 모서리 */
}

/* 스크롤바 핸들 */
::-webkit-scrollbar-thumb {
    background-color: #888;    /* 스크롤 핸들 색상 */
    border-radius: 10px;       /* 둥근 모서리 */
    border: 3px solid #f1f1f1; /* 트랙과의 간격 */
}

/* 스크롤바 핸들 호버 시 */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;    /* 호버 시 핸들 색상 */
}

</style>
