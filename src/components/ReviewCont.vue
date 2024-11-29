<template>
  <div class="review-wrap">
    <div v-if="!showReviewWrite" class="title-wrap">
      <span class="title color-green">리뷰</span>
      <span class="title color-green">총 {{reviewCount}}건</span>
    </div>
    <div v-else class="title-wrap">
      <h2 class="title color-green">리뷰 등록</h2>
    </div>
    <div v-if="!showReviewWrite" class="review-cont-wrap">
      <div v-for="review in reviews" :key="review.id" class="review-cont">
        <div class="top">
          <span>{{ review.userInfo }}</span>
          <span v-if="review.timestamp">{{ new Date(review.timestamp.seconds * 1000).toLocaleString() }}</span>
        </div>
        <p>
          {{ review.comment }}
        </p>
      </div>
    </div>
    <div v-else class="review-cont-wrap" :class="{ writeHeight: showReviewWrite === true }">
      <ReviewWrite :restaurantName="restaurant" @writeMode="updateReview" />
    </div>
    <button v-if="!showReviewWrite" @click="modeChange">리뷰 등록</button>
  </div>
</template>

<script>
import ReviewWrite from "@/components/ReviewWrite.vue";
import { db } from "@/firebase"; // Firebase Firestore 초기화
import { collection, onSnapshot } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: 'ReviewCont',
  props: ["restaurant"],
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"]), // Vuex 상태를 계산 속성으로 가져오기
  },
  components:{
    ReviewWrite
  },
  data() {
    return {
      reviews: [],
      reviewCount: 0,
      showReviewWrite: false,
    }
  },
  mounted() {
    this.fetchReviews();
  },
  methods: {
    // updateReview(newValue) {
    //   this.showReviewWrite = newValue; // 하위 컴포넌트 값 업데이트
    // },
    updateReview(newValue) {
      // console.log("####", this.newValue)
      this.showReviewWrite = newValue; // 하위 컴포넌트 값 업데이트
    },
    fetchReviews() {
      const reviewsRef = collection(db, `restaurants/${this.restaurant}/reviews`);
      onSnapshot(reviewsRef, (snapshot) => {
        // 리뷰 데이터 저장
        this.reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // 총 리뷰 수 저장
        this.reviewCount = snapshot.size;
      });
    },
    modeChange() {
      if(!this.currentUser) {
        alert("로그인을 해주세요.");
        return;
      }
      this.showReviewWrite = !this.showReviewWrite;
    }
  }
}
</script>

<style lang="scss">
.review-wrap {
  width: 100%;
  height: calc(100% - 257px);
  position: relative;

  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    padding: 15px 0;
  }
}
.review-cont-wrap {
  padding: 10px;
  height: calc(100% - 157px);
  overflow-y: scroll;

  &.writeHeight {
    height: calc(100% - 76px);
    padding: 0;
    overflow: hidden;
  }

  .review-cont {
    margin-bottom: 16px;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(#000, 0.1);

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;

      span {
        font-size: 18px;
        font-weight: bold;

        &:last-child {
          font-weight: normal;
          color: #999;
        }
      }
    }

    p {
      text-align: left;
    }
  }
}

.is-hide {
  display: none;
}
</style>
