<template>
  <div class="login-container">
    <div class="cont">
      <h2 class="title">로그인</h2>
      <div class="input-wrap">
        <input type="text" v-model="email" placeholder="email"><br>
        <input type="password" v-model="password" placeholder="password"><br>
      </div>
      <div class="btn-wrap">
        <button @click="login()">로그인</button>
        <button class="darkColor"><router-link to="/SignUp">회원가입</router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginEmail } from "../firebase/index.js";
import { mapActions } from "vuex";

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      console.log('Email : ' + this.email);
      console.log('Password : ' + this.password);

      if (this.email == "") {
        alert("이메일을 입력해주세요.");
        return;
      }

      if (this.password == "") {
        alert("패스워드를 입력해주세요.");
        return;
      }

      loginEmail(this.email, this.password).then((result) => {
        this.$store.commit("setUser", result.user); // Vuex에 사용자 저장
        console.log("User logged in:", result.user);
        this.$router.replace('/gyeongi_gourmet_page');
        console.log("로그인")
        console.log(result);
        alert("로그인 완료되었습니다.\r\n" + result.user.email);
      })
      .catch((err) => {
        switch(err.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일 형식입니다");
            break;
          case "auth/wrong-password":
            alert("비밀번호가 틀립니다.");
            break;
          case "auth/user-not-found":
            alert("등록되지 않은 이메일입니다.");
            break;
            case "auth/invalid-credential":
            alert("등록되지 않은 이메일 이거나 비밀번호가 틀립니다.");
            break;
          default:
            console.log(err);
            break;
        }
      });
    },
    ...mapActions(["fetchUser"]),
  }
}
</script>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    display: block;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
  }


  .input-wrap {
    width: 100%;
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .btn-wrap {
    width: 500px;
    display: flex;
    gap: 10px;

    button {
      cursor: pointer;

      a {
        color: #fff;
      }

    }
  }
}
  
</style>