<template>
  <div class="main-page-cont">
    <div class="banner">
      <div class="left">
        <p>
          경기도의 바르고 좋은 음식점을 소개합니다
        </p>
        <p>
          경기도 모범음식점<br />
          소개 사이트
        </p>
      </div>
      <div class="right">
        <span># 친절한 서비스</span>
        <span># 맛집</span>
        <span># 믿음직한 위생 상태</span>
      </div>
    </div>
    <section class="sec1">
      <div class="img-wrap">
        <img src="../assets/good_restaurant.jpg" alt="모범 음식점 인증 마크">
      </div>
      <p>
        <em class="color-green">모범 음식점 이란?</em><br />
        모범 음식점은 위생적이고 서비스 수준이 높은 음식점을 인증하여 위생적이고 안전한 외식 문화를 조성하고자 하는 제도입니다.<br />
        <br />
        이 인증은 지방자치단체에서 주관하며, 음식점의 위생 상태, 서비스 품질, 안전성 등을 평가하여 일정 기준을 충족한 경우 부여됩니다.
      </p>
    </section>
    <section class="sec2">
      <p>
        <em class="color-green">모범 음식점 선정기준은?</em><br />
        <strong>위생 관리 수준 - </strong> 조리 시설, 식재료 보관, 청결 상태 등의 위생 관리가 철저해야 합니다.<br />
        <strong>서비스 품질 - </strong> 친절한 고객 응대, 서비스의 일관성 등을 평가합니다.<br />
        <strong>안전성 - </strong> 조리 과정에서의 안전 준수, 고객의 안전을 고려한 시설물 관리 등이 포함됩니다.<br />
        <strong>기타 - </strong> 지속적인 품질 유지와 지역 사회 기여도, 친환경 경영 등도 일부 평가 항목에 포함될 수 있습니다.<br />
      </p>
    </section>  
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
.main-page-cont {
  padding: 50px 0;
}
strong {
  font-weight: bold;
}
.banner {
  padding: 80px 38px 108px 64px;
  border-radius: 40px;
  background-image: linear-gradient(to left, rgba(#00BF71, 0.2), #E5FFEB);
  color: #2E9A47;
  display: flex;
  justify-content: space-between;

  .left {
    p {
      font-size: 32px;
    
    &:last-child {
      margin-top: 32px;
      font-size: 55px;
      font-weight: bold;
    }

    }
  }
  .right {
    display: flex;
    flex-direction: column;
  }
}

section {
  display: flex;
  align-items: flex-end;
  gap: 50px;
  margin-bottom: 120px;
  font-size: 20px;

  p {
    line-height: 30px;

    em {
      display: block;
      font-size: 38px;
    }
  }
}

.sec1 {
  padding-top: 50px;

  .img-wrap {
    // width: 397px;
    // height: 428px;
    width: 320px;
    height: 330px;
    flex: 0 0 320px;
  
    img {
      width: 100%;
      height: 100%;
      border-radius: 35px;
      box-shadow: 0 -5px 20px rgba(#000, 0.2);
    }
  }
}

</style>
