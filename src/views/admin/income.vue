<template>
  <div class="productData-warp">
    <div class="yesterday">
      <span class="title">昨日关键指标</span>
      <Card v-for="(item,index) in cardData" :key="index" :showData="item"></Card>
    </div>
    <div class="dataAnalyze">
      <span class="title">数据分析图</span>
      <DataChart visit='income'></DataChart>
    </div>
  </div>
</template>
<script>
import Card from "../../components/card";
import DataChart from "../../components/dataChart";
import { income } from '@/https/api'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cardData:[
        // {title:'绑定用户数',count:128,day:-7.6,week:-7.6,month:-7.6},
        // {title:'解绑用户数',count:46,day:+2.4,week:+2.4,month:+2.4},
        // {title:'新增用户数',count:2,day:-7.6,week:-7.6,month:-7.6},
        // {title:'交易用户数',count:0,day:-7.6,week:-7.6,month:-7.6},
        // {title:'7日未成交用户数',count:423,day:-7.6,week:-7.6,month:-7.6},
        // {},{},{},{},{}
      ]
    };
  },
  components: {
    Card,
    DataChart
  },
   methods: {
    ...mapActions(["clearUserInfo"])
  },
   mounted() {
     income().then((result) => {
       if(result.code === '1'){
         this.cardData = result.data;
       }else if(result.code === '10002'){
         this.clearUserInfo();
          this.$router.push("/login");
       } else{
         this.$message.error(result.msg);
          setTimeout(() => {
            this.clearUserInfo();
            this.$router.push("/login");
          }, 500);
       }
     }).catch((err) => {
       console.log(err)
     });
  }
};
</script>
<style lang="scss" scoped>
.productData-warp {
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
  display: flex;
  flex-direction: column;
  .yesterday {
    *zoom:1;
    &::after{
      content: '';
      display: block;
      height: 0;
      visibility: hidden;
      clear: both;
    }
  }
  .dataAnalyze {
    flex: 1;
    margin-top: 40px;
  }
  .title {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 30px;
    width: 100%;
    margin-left: 30px;
    font-size: 24px;
    color: #2e384d;
  }
}
</style>
