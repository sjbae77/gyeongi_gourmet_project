<template>
  <div class="login">
    <p>로그인</p>
    <input type="text" v-model="email" placeholder="email"><br>
    <input type="password" v-model="password" placeholder="password"><br>
    <button v-on:click="login">로그인</button>
    <button><router-link to="/SignUp">회원가입</router-link></button>
  </div>
</template>

<script>
import { loginEmail } from "../firebase/index.js";

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
          this.$router.replace('/');
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
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 20px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>