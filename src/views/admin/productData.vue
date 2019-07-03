<template>
  <div class="productData-warp">
    <div class="yesterday">
        <span class="title">昨日关键指标</span>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div>
    <div class="dataAnalyze">
        <span class="title">数据分析图</span>
    </div>
  </div>
</template>
<script>
import Card from '../../components/card'
export default {
    components: {
        Card
    }
};
</script>
<style lang="scss" scoped>
.productData-warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .yesterday{}
  .dataAnalyze{}
  .title{
      display: inline-block;
      margin-top: 10px;
      margin-bottom: 30px;
      width: 100%;
      margin-left: 30px;
      font-size: 22px;
      color:#2E384D;
  }
}
</style>
