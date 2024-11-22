<template>
  <div class="sign-up">
    <p>회원가입</p>
    <input type="text" v-model="email" placeholder="email"><br>
    <input type="password" v-model="password" placeholder="password"><br>
    <button><router-link to="/Login">로그인</router-link></button>
    <button v-on:click="signUp">가입하기</button>
  </div>
</template>

<script>
import { signUpEmail } from "../firebase/index.js";

  export default {
    name: 'SignUpPage',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      signUp() {
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

        signUpEmail(this.email, this.password).then((result) => {
          this.$router.replace('/');
          alert("회원가입 완료되었습니다.\r\n" + result.user.email);
        })
        .catch((err) => {
          switch(err.code) {
            case "auth/invalid-email":
              alert("잘못된 이메일 형식입니다.");
              break;
            case "auth/email-already-in-use":
              alert("이미 사용중인 이메일입니다.");
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
  .signUp {
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
  span {
    display: block;
    margin-top: 20px;
    font-size: 15px;
  }
</style>