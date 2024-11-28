<template>
  <div class="review-cont" >
    <form @submit.prevent="handleSubmit">
      <div class="user-info">
        <span>{{ currentUser.email }}</span>
      </div>
      <div class="text-contet">
        <!-- <label for="reviewText">내용: </label> -->
        <textarea name="reviewText" id="writeContent" v-model="writeContent" required></textarea>
      </div>
      <button type="submit">저장</button>
    </form>
  </div>
</template>

<script>
import { db } from "@/firebase"; // Firebase Firestore 초기화
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: 'ReviewCont',
  props: ["restaurantName"],
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"]), // Vuex 상태를 계산 속성으로 가져오기
  },
  data() {
    return {
      item: [],
      writeContent: "",
    }
  },
  mounted() {
    console.log("this.restaurantName", this.restaurantName)
  },
  methods: {
    async handleSubmit() {
      if (this.writeContent) {
        try {
          const reviewsRef = collection(db, `restaurants/${this.restaurantName}/reviews`);
          await addDoc(reviewsRef, {
            // userId: "sampleUserId", // 로그인 기능과 연동 시 실제 사용자 ID 사용
            userInfo: this.currentUser.email,
            comment: this.writeContent,
            timestamp: serverTimestamp(),
          });
          alert("리뷰가 정상적으로 등록되었습니다.");
          this.$emit("writeMode", false); // 상위로 값 전달
        } catch(error) {
          console.error("리뷰 저장 실패:", error);
          alert("리뷰 저장에 실패하였습니다.");
        }
        
      }
    },
  }
}
</script>

<style lang="scss">
.review-wrap {
  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    padding: 15px;
  }
}
.review-cont-wrap {
  margin: 20px 0 40px;

  .review-cont {
    margin-bottom: 16px;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(#000, 0.1);

    .user-info {
      text-align: left;
    }
    .text-contet {
      width: 100%;
      margin-top: 20px;

      textarea {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
      }
    }

    button {
      margin-top: 20px;
    }
  }
}
</style>
