<template>
  <div class="container">
    <h1>음식점 리스트 페이지</h1>
    <div>
      데이터 표시
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
    // apiList: [],
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939')
      .then(response => {
        const xmlData = response.data;
        const jsonData = this.parseXML(xmlData);
        console.log(jsonData); // JSON 데이터 출력
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },

    parseXML(xmlString) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, "text/xml");

      // 필요한 데이터 추출
      const items = xml.getElementsByTagName("row"); // 예시로 item 태그를 가정
      const result = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const name = item.getElementsByTagName("BIZESTBL_NM")[0].textContent; // 예시로 name 태그
        // const value = item.getElementsByTagName("value")[0].textContent; // 예시로 value 태그
        result.push({ name });
      }

      return result;
    }
  }
}
</script>

<style lang="scss">

</style>
