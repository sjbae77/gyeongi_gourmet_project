<template>
  <div class="review-wrap">
    <div class="title-wrap">
      <span class="title color-green">리뷰</span>
      <span class="title color-green">총 {{reviewCount}}건</span>
    </div>
    <div class="review-cont-wrap">
      <div v-for="post in posts" :key="post.id" class="review-cont">
        <div class="top">
          <span>{{ post.author }}</span>
          <span>{{ new Date(post.createdAt.seconds * 1000).toLocaleString() }}</span>
        </div>
        <!-- <h3>{{ post.title }}</h3> -->
        <p>
          {{ post.content }}
        </p>
      </div>
      <!-- <div class="review-cont" >
        <div class="top">
          <span>유저 ID 및 닉네임</span>
          <span>2024-11-24</span>
        </div>
        <p>
          가족들과 방문하기 딱 좋은 분위기였습니다<br />
          직원분들도 친절하시고 음식도 맛있어서 좋은 가족모임이 되었습니다! 다시 방문할 의사가 있는 맛집입니다~
        </p>
      </div> -->
    </div>
    <button>닫기</button>
  </div>
</template>

<script>
import { fetchPosts, subscribeToPosts } from "../firebase";
import { subscribeToPostCount } from "../firebase/index";

export default {
  name: 'ReviewCont',
  props: {
  },
  data() {
    return {
      item: [],
      posts: [],
      reviewCount: 0,
    }
  },
  mounted() {
    this.mounted();
    subscribeToPostCount((count) => {
      // console.log(`실시간 등록된 데이터 개수: ${count}`);
      this.reviewCount = count;
    });
  },
  methods: {
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
</style>
