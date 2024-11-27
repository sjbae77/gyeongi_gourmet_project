<template>
  <div class="review-wrap">
    <div class="title-wrap">
      <h2 class="title color-green">리뷰 쓰기</h2>
    </div>
    <div class="review-cont-wrap">
      <div class="review-cont" >
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="title">제목: </label>
            <input type="text" id="writeTitle" v-model="writeTitle" required />
          </div>
          <div>
            <label for="reviewText">내용:</label>
            <textarea name="reviewText" id="writeContent" v-model="writeContent" required></textarea>
          </div>
          <button type="submit">저장</button>
        </form>
      </div>
    </div>
    <!-- <button>닫기</button> -->
  </div>
</template>

<script>
import { addPost } from "../firebase";
export default {
  name: 'ReviewCont',
  props: {
  },
  data() {
    return {
      item: [],
      writeTitle: "",
      writeContent: "",
    }
  },
  mounted() {
  },
  methods: {
    async handleSubmit() {
      if (this.writeTitle && this.writeContent) {
        try {
          await addPost(this.writeTitle, this.writeContent);
          alert("글이 저장되었습니다!");
          this.writeTitle = "";
          this.writeContent = "";
        } catch (error) {
          console.error("글 저장 실패:", error);
          alert("글 저장에 실패했습니다.");
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
