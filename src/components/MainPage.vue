<template>
  <div class="content">
    <div class="img-wrap">
    <img src="../assets/good_restaurant.jpg" alt="모범 음식점 인증 마크">
  </div>
  <section class="sec1">
    <p>
      <em>모범 음식점 이란?</em><br />
      모범 음식점은 위생적이고 서비스 수준이 높은 음식점을 인증하여 위생적이고 안전한 외식 문화를 조성하고자 하는 제도입니다.<br />
      이 인증은 지방자치단체에서 주관하며, 음식점의 위생 상태, 서비스 품질, 안전성 등을 평가하여 일정 기준을 충족한 경우 부여됩니다.
    </p>
  </section>
  <section class="sec2">
    <p>
      <em>모범 음식점 선정기준은?</em><br />
      위생 관리 수준: 조리 시설, 식재료 보관, 청결 상태 등의 위생 관리가 철저해야 합니다.<br />
      서비스 품질: 친절한 고객 응대, 서비스의 일관성 등을 평가합니다.<br />
      안전성: 조리 과정에서의 안전 준수, 고객의 안전을 고려한 시설물 관리 등이 포함됩니다.<br />
      기타: 지속적인 품질 유지와 지역 사회 기여도, 친환경 경영 등도 일부 평가 항목에 포함될 수 있습니다.<br />
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
.content {
  padding: 30px;
}

.img-wrap {
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
}

section {
  margin-bottom: 30px;
  font-size: 20px;

  p {
    line-height: 30px;

    em {
      display: block;
      font-weight: bold;
    }
  }
}

</style>
