<template>
  <footer class="footer">
    <p>
      본 페이지는 상업적 목적이 아닌 한양사이버대학교 졸업프로젝트를 목적으로 만들어졌습니다.<br />
      2023100000 배수정
    </p>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout',
  props: {
  }
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #1E3049;
  color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 25px;
  font-size: 14px;
}
</style>
