<template>
<header class="header">
  <h1><router-link to="/">모범 음식점 소개 사이트</router-link></h1>
  <nav class="nav">
    <ul class="menu-wrap">
      <li class="active"><router-link to="/">메인화면</router-link></li>
      <li><router-link to="/RestaurantList">음식점 목록</router-link></li>
      <li><router-link to="/Location">지도</router-link></li>
      <li><router-link to="/Login">로그인</router-link></li>
    </ul>
  </nav>
</header>
</template>

<script>
export default {
  name: 'HeaderLayout',
  props: {
  }
}
</script>

<style lang="scss">
.header { 
  width: 100%;
  height: 100px;
  display: flex;
  align-content: center;
  justify-content: space-around;
  line-height: 100px;
  background-color: aliceblue; 

  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  ul {
    display: flex;
    gap: 20px;

    li.active {
      font-weight: bold;
    }
  }
}
</style>
