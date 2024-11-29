<template>
  <div class="login-container sign-up">
    <div class="cont">
      <h2 class="title">회원가입</h2>
      <div class="input-wrap">
        <input type="text" v-model="email" placeholder="email"><br>
        <input type="password" v-model="password" placeholder="password"><br>
      </div>
      <div class="btn-wrap">
        <button @click="signUp">가입하기</button>
      </div>
    </div>
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
        // console.log('Email : ' + this.email);
        // console.log('Password : ' + this.password);

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
</style>