<template>
<header class="header">
  <div class="header-inner">
    <h1><router-link to="/">Gourmet Site</router-link></h1>
    <nav class="nav">
      <ul class="menu-wrap">
        <li class="active"><router-link to="/">메인</router-link></li>
        <li><router-link to="/RestaurantList">음식점 목록</router-link></li>
        <li><router-link to="/Location">지도</router-link></li>
      </ul>
      <ul class="login-wrap">
        <li><router-link to="/Login" class="color-green">로그인</router-link></li>
        <li><router-link to="/SignUp">회원가입</router-link></li>
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
  height: 80px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background-color: #fff;
  
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
  }

  h1 {
    font-size: 28px;
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
      gap: 25px;
  
      li {
        a {
          font-size: 18px;
        }
        
        &.active a {
          font-weight: bold;
          color: #2E9A47;
        }
      }
    }

    .login-wrap li {
      a {
        font-size: 18px;
      }

      &:last-child a {
        padding: 8px 16px;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        background-color: #2E9A47;
      }
    }
  }
}
</style>
