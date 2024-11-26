<template>
  <div class="List-page-cont">
    <div class="search-wrap">
      <span class="title color-green">음식점 목록</span>
      <div class="search-box">
        <input type="text" id="searchInput" class="search-input" placeholder="검색어를 입력해주세요">
        <button class="search-button"></button>
      </div>
    </div>
    <div class="list-container">
      <div class="category-wrap">
        <div class="title-wrap">
          <span class="title color-green">지역</span>
        </div>
        <div class="sigun-wrap">
          <div class="sec">
            <div class="wrap">
              <span @click="getData()">전체</span>
              <em></em>
            </div>
          </div>
          <div class="sec">
            <div class="wrap">
              <span @click="getSigunList()">경기</span>
              <em></em>
            </div>
            <ul>
              <li v-for="(item, idx) in sigunNMArr" :key="idx" @click="getData(item)">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cont-wrap">
        <div class="title-wrap">
          <span class="title color-green">검색 결과</span>
          <span class="title color-green">총 {{ resultLength }}건</span>
        </div>
  
        <div class="result-cont" v-if="resultFlag">
          <div class="cont" v-for="(item, idx) in resultArr" :key="idx">
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
            <button @click="openModal(item)">자세히 보기</button>
          </div>
        </div>
        <div v-else class="result-cont">
          <div class="content-box">
            <p>검색 결과가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="title-wrap">
        <span class="title">음식점 상세 정보</span>
        <em @click="closeModal()"></em>
      </div>
      <DetailModal :tag1="clickItem.bizcondNM" :tag2="clickItem.mainMenuNM" :title="clickItem.biszestblNM" :addr="clickItem.refineRoadnmAddr" :tel="clickItem.telNo"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DetailModal from './RestaurantDetail.vue';

export default {
  name: 'RestaurantListPage',
  props: {
  },
  components: {
    DetailModal
  },
  data() {
    return {
      resultArr: [],
      resultLength: 0,
      sigunNMArr: [],
      resultFlag: false,
      showModal: false,
      clickItem: null,
    }
  },
  mounted() {
  
  },
  methods: {
    getData(sigun) {
      this.resultArr = [];
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      .then(response => {
        if(response.data != null && response.data != []) {
          const xmlData = response.data;
          let jsonData = this.parseXML(xmlData);
          // console.log("xmlData", xmlData);
          // console.log(jsonData); // JSON 데이터 출력
          
          // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
          jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

          this.resultArr = jsonData;
          console.log(this.resultArr)
          this.resultLength = jsonData.length;

          this.resultFlag = true;

          if(sigun) {
            this.resultArr = [];

            // 지역별로 필터링하여 새로운 배열 생성
            this.sigunNMArr.forEach(sigunItem => {
              if(sigunItem == sigun) {
                this.resultArr.push(jsonData.filter(item => item.sigunNM == sigun));
              }
            })
            this.resultArr = this.resultArr[0];
            this.resultLength = this.resultArr.length;
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },
    getSigunList() {
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      .then(response => {
        const xmlData = response.data;
        let jsonData = this.parseXML(xmlData);
        
        // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
        jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

        // 'SIGUN_NM' 값을 중복 없이 추출하여 시군명 배열 생성
        const sigunNMArr = [...new Set(jsonData.map(item => item.sigunNM))];
        this.sigunNMArr = sigunNMArr;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },
    search() {
      axios.get('https://openapi.gg.go.kr/ParagonRestaurant?KEY=c526a4e53c9d41e6956418615a2f9939&plndex=1&pSize=1000')
      .then(response => {
        const xmlData = response.data;
        let jsonData = this.parseXML(xmlData);
        // console.log("xmlData", xmlData);
        // console.log(jsonData); // JSON 데이터 출력
        
        // 'SIGUN_NM' 키를 기준으로 가나다 순 정렬
        jsonData = jsonData.sort((a, b) => a.sigunNM.localeCompare(b.sigunNM));

        this.dataArr = jsonData;

        this.totalLocationArr = jsonData;
        this.totalLocationLength = jsonData.length
        // console.log("정렬 완료한 총 데이터", jsonData)

        // 'SIGUN_NM' 값을 중복 없이 추출하여 시군명 배열 생성
        const sigunNMArr = [...new Set(jsonData.map(item => item.sigunNM))];
        // console.log(sigunNMArr)
        this.sigunNMArr = sigunNMArr;

        // 지역별로 필터링하여 새로운 배열 생성
        sigunNMArr.forEach(sigunItem => {
          this.locationArr.push(jsonData.filter(item => item.sigunNM == sigunItem));
        })

        // console.log(this.locationArr)
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
    },
    openModal(item) {
      this.showModal = true;
      this.clickItem = item;
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style lang="scss">
.List-page-cont {
  height: 100%;
}
/* 검색창 스타일 */
.search-wrap {
  width: 100%;
  padding-top: 50px;

  .title {
    font-size: 26px;
  }
}
.search-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 7px;
  border: 3px solid #2E9A47;
  border-radius: 24px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(#000, 0.25);
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
  width: 32px;
  height: 32px;
  background-image: url("../assets/search_icon.png");
  background-repeat: no-repeat;
  background-color: inherit;
  border: none;
}

.list-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  height: calc(100% - 200px);

  .category-wrap {
    width: 20%;
    height: 100%;
  }
  .cont-wrap {
    width: 76%;
    height: 100%;
  }

  .title-wrap {
    border-bottom: 1px solid #000;
    padding: 15px;
  }
}

.sigun-wrap {
  height: calc(100% - 53px);
  overflow: scroll;

  .sec {
    &:last-child {
      border-top: 1px solid #2E9A47;
      border-bottom: 1px solid #D9D9D9;
      background-color: #E5FFEB;
      color: #3F3D56;

      ul {
        height: 100%;
        overflow: scroll;

        li {
        padding: 18px 25px;
      }
      } 
    }
  }

  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: inline-block;
      font-weight: bold;
      padding: 18px 15px;
      width: 70%;
    }

    em {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 15px;
      background-image: url("../assets/arrow-up-icon.png");
    }
  }
}
.result-cont {
  width: 100%;
  height: calc(100% - 85px);

  .cont{
    margin-bottom: 30px;
    padding: 25px 20px;
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid #2E9A47;

    .info-cont {
      display: flex;
      margin-bottom: 20px;
    }

    .info-wrap {
      .tag-wrap {
        .tag {
          display: inline-block;
          background-color: #E5FFEB;
          border-radius: 5px;
          font-size: 16px;
          padding: 10px 15px;
          border: 1px solid #2E9A47;
          margin-right: 10px;
        }
      }

      .title {
        display: block;
        margin-top: 15px;
      }

      .addr {
        display: flex;
        margin-top: 9px;

        em {
          display: inline-block;
          width: 17px;
          height: 17px;
          margin-right: 4px;
          background-image: url("../assets/location_icon.png");
        }
      }

      .tel-title {
        display: block;
        margin: 15px 0 5px;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .img-wrap {
      width: 165px;
      height: 165px;
      flex: 0 0 165px;
      margin-right: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.cont-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  overflow-y: scroll;

  .title-wrap {
    width:100%;
    height: 23px;
    display: flex; 
    justify-content: space-between;
  }
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 800px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

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
}
</style>
