<template>
  <div class="search-wrap">
    <div class="search-box">
      <i class="material-icons">search</i>
      <input type="text" class="search-input" placeholder="검색어를 입력해주세요">
      <button class="search-button">검색</button>
    </div>
  </div>
  <div class="cont-wrap">
    <div class="cont" v-for="(totalItem, idx) in lacationArr" :key="idx">
      <span class="title">{{ totalItem[0].sigunNM }}</span>
      <div class="item-wrap">
        <div v-for="(item, i) in totalItem" :key="i"  class="item">
          <span class="name">{{ item.biszestblNM }}</span>
          <span class="tag">- # {{ item.bizcondNM }} # {{ item.mainMenuNM }}</span>
        </div>
      </div>
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
        // console.log(jsonData); // JSON 데이터 출력
        
        // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
        jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

        // 'SIGUN_NM' 값을 중복 없이 추출하여 시군명 배열 생성
        const sigunNMArr = [...new Set(jsonData.map(item => item.sigunNM))];
        console.log(sigunNMArr)

        // 지역별로 필터링하여 새로운 배열 생성
        sigunNMArr.forEach(sigunItem => {
          this.lacationArr.push(jsonData.filter(item => item.sigunNM == sigunItem));
        })

        console.log(this.lacationArr)
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
/* 검색창 스타일 */
.search-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
.search-box {
  display: flex;
  align-items: center;
  width: 500px;
  padding: 10px;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  background-color: #fff;
  box-shadow: 0px 1px 6px rgba(32, 33, 36, 0.28);
}

/* 돋보기 아이콘 */
.search-box i {
  font-size: 20px;
  color: #5f6368;
  margin-right: 10px;
}

/* 입력 필드 스타일 */
.search-input {
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 16px;
}

/* 입력 필드 포커스 시 스타일 */
.search-input:focus {
  outline: none;
}

/* 검색 버튼 스타일 */
.search-button {
  background-color: #f8f9fa;
  border: none;
  padding: 8px 16px;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #5f6368;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* 버튼 호버 효과 */
.search-button:hover {
  background-color: #e8e8e8;
}

.cont-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 0;
  gap: 30px;
  width: 100%;
  height: calc(100% - 160px);
  overflow-y: scroll;
}

.cont{
  width: 95%;
  padding: 15px 15px 30px;
  // border-radius: 10px;
  // box-shadow: 0 0 10px 7px #ddd;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border: none;
  }
  
  .title {
    display: block;
    margin-bottom: 35px;
    font-size: 30px;
    font-weight: bold;
  }

  .item-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    width: 50%;
    margin-bottom: 20px;
    font-size: 18px;

    .name {
      font-weight: bold;
    }

    .tag {
      margin-left: 10px;
      font-size: 15px;
    }
  }
}
</style>
