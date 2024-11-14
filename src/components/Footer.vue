<template>
  <footer class="footer">
    <p>(주) 수정 컴퍼니</p>
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
  height: 200px;
  background-color: #f2f2f2;
  border-top: 2px solid #ddd;
}
</style>
