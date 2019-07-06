<template>
  <div class="card-warp">
    <div class="left">
      <div class="title">{{this.showData.name}}</div>
      <div class="count">{{this.showData.statisticsNum}}</div>
    </div>
    <div class="right">
      <div class="day">
        <div class="hint">日</div>
        <div class="icon">
          <i class="el-icon-top-right" v-if="+this.showData.dailyStatistics >= 0"></i>
          <i class="el-icon-bottom-right" v-else></i>
        </div>
        <!-- <div
          class="figure"
          v-if="this.showData.dailyStatistics === undefined"
        ></div> -->
        <div
          class="figure"
        >{{+this.showData.dailyStatistics > 0?'+'+this.showData.dailyStatistics+'%':this.showData.dailyStatistics+'%'}}</div>
      </div>
      <div class="week">
        <div class="hint">周</div>
        <div class="icon">
          <i class="el-icon-top-right" v-if="+this.showData.weeklyStatistics >= 0"></i>
          <i class="el-icon-bottom-right" v-else></i>
        </div>
        <!-- <div
          class="figure"
          v-if="this.showData.weeklyStatistics === undefined"
        ></div> -->
        <div
          class="figure"
        >{{+this.showData.weeklyStatistics > 0?'+'+this.showData.weeklyStatistics+'%':this.showData.weeklyStatistics+'%'}}</div>
      </div>
      <!-- <div class="month">
        <div class="hint">月</div>
        <div class="icon">
          <i class="el-icon-top-right" v-if="this.showData.month > 0"></i>
          <i class="el-icon-bottom-right" v-else></i>
        </div>
        <div
          class="figure"
        >{{this.showData.month > 0?'+'+this.showData.month+'%':this.showData.month+'%'}}</div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["showData"]
};
</script>
<style lang="scss" scoped>
.card-warp {
  display: flex;
  min-width: 230px;
  height: 150px;
  background: #fff;
  margin-left: 20px;
  float: left;
  font-size: 14px;
  padding: 30px 20px;
  box-sizing: border-box;
  .left {
    display: inline-block;
    // width: 50%;
    // max-width: 60%;
    .title {
      white-space: nowrap;
      // text-align: center;
      color: #8798ad;
    }
    .count {
      // text-align: center;
      color: #2e384d;
      font-size: 48px;
      line-height: 80px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .day {
      display: flex;
      flex: 1;
    }
    .week {
      display: flex;
      flex: 1;
    }
    .hint {
      text-align: right;
      flex: 1;
      color: #8798ad;
      line-height: 30px;
    }
    .icon {
      text-align: center;
      flex: 1;
      line-height: 30px;
      color: #2DB744;
    }
    .figure {
      text-align: left;
      // flex: 1;
      color: #e84a50;
      line-height: 30px;
    }
  }
}
</style>

