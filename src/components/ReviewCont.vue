<template>
  <div class="review-wrap">
    <div class="title-wrap">
      <span class="title color-green">리뷰</span>
      <span class="title color-green">총 000건</span>
    </div>
    <div class="review-cont-wrap">
      <div class="review-cont" >
        <div class="top">
          <span>유저 ID 및 닉네임</span>
          <span>2024-11-24</span>
        </div>
        <p>
          가족들과 방문하기 딱 좋은 분위기였습니다<br />
          직원분들도 친절하시고 음식도 맛있어서 좋은 가족모임이 되었습니다! 다시 방문할 의사가 있는 맛집입니다~
        </p>
      </div>
      <div class="review-cont" >
        <div class="top">
          <span>유저 ID 및 닉네임</span>
          <span>2024-11-24</span>
        </div>
        <p>
          가족들과 방문하기 딱 좋은 분위기였습니다<br />
          직원분들도 친절하시고 음식도 맛있어서 좋은 가족모임이 되었습니다! 다시 방문할 의사가 있는 맛집입니다~
        </p>
      </div>
    </div>
    <button>닫기</button>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'ReviewCont',
  props: {
  },
  data() {
    return {
      item: [],
    }
  },
  mounted() {
      // axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      // .then(response => {
      //   const xmlData = response.data;
      //   let jsonData = this.parseXML(xmlData);
      //   // console.log("xmlData", xmlData);
      //   // console.log(jsonData); // JSON 데이터 출력
        
      //   // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
      //   jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

      //   this.item = jsonData[0];

      //   console.log(this.item)
      // })
      // .catch((error) => {
      //   console.error('Error fetching data:', error);
      // });
  },
  methods: {
    parseXML(xmlString) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, "text/xml");

      // 필요한 데이터 추출
      const items = xml.getElementsByTagName("row");
      const result = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const sumYY = item.getElementsByTagName("SUM_YY")[0].textContent; // 집계년도
        const sigunCode = item.getElementsByTagName("SIGUN_CD")[0].textContent; // 시군코드
        const sigunNM = item.getElementsByTagName("SIGUN_NM")[0].textContent; // 시군명
        const biszestblNM = item.getElementsByTagName("BIZESTBL_NM")[0].textContent; // 업소명
        const bizcondNM = item.getElementsByTagName("BIZCOND_NM")[0].textContent; // 업태명
        const telNo = item.getElementsByTagName("TELNO")[0].textContent; // 전화번호
        const mainMenuNM = item.getElementsByTagName("MAIN_MENU_NM")[0].textContent; // 주메뉴명
        const refineRoadnmAddr = item.getElementsByTagName("REFINE_ROADNM_ADDR")[0].textContent; // 소재지 도로명 주소
        result.push({ sumYY, sigunCode, sigunNM, biszestblNM, bizcondNM, telNo, mainMenuNM, refineRoadnmAddr });
      }

      return result;
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
</style>
