<template>
  <div class="card-warp">
    <div class="left">
      <div class="title"></div>
      <div class="count"></div>
    </div>
    <div class="right">
      <div class="day">
        <div class="hint">日</div>
        <div class="icon"></div>
        <div class="figure"></div>
      </div>
      <div class="week">
        <div class="hint">周</div>
        <div class="icon"></div>
        <div class="figure"></div>
      </div>
      <div class="month">
        <div class="hint">月</div>
        <div class="icon"></div>
        <div class="figure"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.card-warp {
  display: inline-block;
  width: 230px;
  height: 150px;
  background: #fff;
  margin-left: 10px;
  .left{
      .title{}
      .count{}
  }
  .right{
      .day{}
      .week{}
      .month{}
      .hint{}
      .icon{}
      .figure{}
  }
}
</style>
