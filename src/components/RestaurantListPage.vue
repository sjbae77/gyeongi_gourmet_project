<template>
  <div class="container">
    <h1>음식점 리스트 페이지</h1>
    <div>
      {{ lacationArr[0] }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RestaurantListPage',
  props: {
  },
  data() {
    return {
      lacationArr: []
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      .then(response => {
        const xmlData = response.data;
        let jsonData = this.parseXML(xmlData);
        // console.log("xmlData", xmlData);
        console.log(jsonData); // JSON 데이터 출력
        
        // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
        jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

        // 'SIGUN_NM' 값을 중복 없이 추출하여 시군명 배열 생성
        const sigunNMArr = [...new Set(jsonData.map(item => item.sigunNM))];

        // 지역별로 필터링하여 새로운 배열 생성
        sigunNMArr.forEach(sigunItem => {
          this.lacationArr.push(jsonData.filter(item => item.sigunNM == sigunItem));
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },

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

</style>
