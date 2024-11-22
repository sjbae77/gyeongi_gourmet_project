<template>
<header class="header">
  <div class="inner">
    <h1><router-link to="/">모범 음식점 소개 사이트</router-link></h1>
    <nav class="nav">
      <ul class="menu-wrap">
        <li class="active"><router-link to="/">메인</router-link></li>
        <li><router-link to="/RestaurantList">음식점 목록</router-link></li>
        <li><router-link to="/Location">지도</router-link></li>
        <li><router-link to="/Login">로그인</router-link></li>
      </ul>
      <ul class="login-wrap">
        <li><router-link to="/">로그인</router-link></li>
        <li><router-link to="/">회원가입</router-link></li>
      </ul>
    </nav>
  </div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background-color: #fff;
  
  .inner {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;

    a {
      color: #1E3049;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 100px;

    ul {
      display: flex;
      gap: 20px;
  
      li.active a {
        font-weight: bold;
        color: #2E9A47;
  
        a{
          font-size: 22px;
        }
      }
    }

    .login-wrap li {
      &:last-child a {
        padding: 8px 16px;
        color: #fff;
        border-radius: 5px;
        background-color: #2E9A47;
      }
    }
  }
}
</style>
