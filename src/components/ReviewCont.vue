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
          <span>{{ review.title }}</span>
          <span>{{ review.timestamp }}</span>
        </div>
        <p>
          {{ review.comment }}
        </p>
      </div>
    </div>
    <div v-else class="review-cont-wrap">
      <ReviewWrite :restaurantName="restaurant" />
    </div>
    <button v-if="!showReviewWrite" @click="modeChange">리뷰 등록</button>
  </div>
</template>

<script>
import ReviewWrite from "@/components/ReviewWrite.vue";
import { fetchPosts, subscribeToPosts } from "../firebase";
import { subscribeToPostCount } from "../firebase/index";
import { db } from "@/firebase"; // Firebase Firestore 초기화
import { collection, onSnapshot } from "firebase/firestore";

export default {
  name: 'ReviewCont',
  props: ["restaurant"],
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
    // this.mounted();
    this.fetchReviews();
    subscribeToPostCount((count) => {
      // console.log(`실시간 등록된 데이터 개수: ${count}`);
      this.reviewCount = count;
    });
  },
  methods: {
    fetchReviews() {
      const reviewsRef = collection(db, `restaurants/${this.restaurant}/reviews`);
      onSnapshot(reviewsRef, (snapshot) => {
        this.reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    },
    async mounted() {
      // Firestore에서 한 번 데이터 가져오기
      try {
        this.posts = await fetchPosts();
      } catch (error) {
        console.error("글 목록 불러오기 실패:", error);
      }

      // Firestore 실시간 데이터 구독
      subscribeToPosts((updatedPosts) => {
        this.posts = updatedPosts;
      });
    },
    modeChange() {
      this.showReviewWrite = !this.showReviewWrite;
    }
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
  }
}

.is-hide {
  display: none;
}
</style>
