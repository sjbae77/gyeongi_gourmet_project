<template>
  <div class="detail-wrap result-cont">
    <div class="title-wrap">
      <span class="title">음식점 상세 정보</span>
      <em></em>
    </div>
    <div class="cont" >
      <div class="info-cont">
        <div class="img-wrap">
          <img src="../assets/sample_img_1.png" alt="샘플 이미지 1">
        </div>
        <div class="info-wrap">
          <div class="tag-wrap">
            <span class="tag color-green">#{{ item.bizcondNM }}</span>
            <span class="tag color-green">#{{ item.mainMenuNM }}</span>
          </div>
          <span class="title color-green">{{ item.biszestblNM }}</span>
          <p class="addr"><em></em>{{ item.refineRoadnmAddr }}</p>
          <span class="tel-title">연락처</span>
          <span class="tel">{{ item.telNo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RestaurantDetailModal',
  props: {
  },
  data() {
    return {
      item: [],
    }
  },
  mounted() {
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      .then(response => {
        const xmlData = response.data;
        let jsonData = this.parseXML(xmlData);
        // console.log("xmlData", xmlData);
        // console.log(jsonData); // JSON 데이터 출력
        
        // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
        jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

        this.item = jsonData[0];

        console.log(this.item)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
.detail-wrap {
  // padding: 32px 60px;

  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #999999;
    margin-bottom: 36px;

    .title {
      display: block;
      padding: 20px;
      font-size: 32px;
      font-weight: bold;
    }
    em {
      width: 33px;
      height: 33px;
      background-image: url("../assets/close-icon.png");
    }
  }

  .cont{
    padding: 0;
    border: none;

    .img-wrap {
      width: 240px;
      height: 240px;
      flex: 0 0 240px;
    }
  }

  .info-wrap {
    text-align: left;

    .title {
      font-size: 24px;
    }
    .addr {
      font-size: 18px;
    }
    .tel-title {
      font-size: 24px;
    }
    .tel {
      font-size: 18px;
    }
  }
}
</style>
