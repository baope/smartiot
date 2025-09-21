<template>
  <div class="wrapper">
     <i class="fas" :class="'fa-' + type"/>
  </div>
</template>
<script>
export default {
    props: ['type']
}
</script>
<style lang="less" scoped>
.fas {
    color: #22A0DC;
    font-size: 50px;
}
</style>