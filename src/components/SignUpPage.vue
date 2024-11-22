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

        signUpEmail(this.email, this.password).then((result) => {
          console.log('sign up');
          console.log(result);
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