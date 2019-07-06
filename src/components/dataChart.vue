<template>
  <div class="dataChart-warp">
    <div class="searchCondition">
      <el-button :class="selectIndex===1?'active':''" @click="controlTime(-1,1)">前一周</el-button>
      <div class="showtime">{{`${startShow} - ${endShow}`}}</div>
      <el-button :class="selectIndex===2?'active':''" v-if="!nextFlag" @click="controlTime(1,2)">后一周</el-button>
      <el-button v-else disabled>后一周</el-button>
      <el-button :class="selectIndex===3?'active':''" class @click="controlTime(-1,3)">最近一周</el-button>
      <!-- <el-button class>最近一个月</el-button>
      <el-button class>最近三个月</el-button>
      <div class="searchTime">
        <div class="title">日期</div>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
        <div class="title">至</div>
        <el-date-picker v-model="endTime" type="date" placeholder="选择日期"></el-date-picker>
        <el-button class="search-button">查询</el-button>
      </div>-->
    </div>
    <div class="searchResult">
      <div id="trend"></div>
      <div id="allcount"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import {
  productRunChart,
  productTotalChart,
  incomeRunChart,
  incomeTotalChart
} from "@/https/api";
import { dateFormat } from "@/uitls";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      controlCount: 0, //时间基数，默认上周
      selectIndex: 1,
      runOption: {
        color: [
          "#8C54FF",
          "#87cefa",
          "#da70d6",
          "#32cd32",
          "#6495ed",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c",
          "#ffa500",
          "#40e0d0",
          "#1e90ff",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6699FF",
          "#ff6666",
          "#3cb371",
          "#b8860b",
          "#30e0e0"
        ],
        title: {
          text: "数据增量走势图",
          textStyle: {
            color: "#8798AD",
            fontSize: 16
          }
        },
        legend: {
          data: [
            { name: "新增用户", icon: "circle" },
            { name: "解绑用户", icon: "circle" }
          ],
          left: "right",
          textStyle: {
            color: "#8798AD"
          },
          inactiveColor: "#333"
        },
        tooltip: {},
        xAxis: {
          data: [
            // "6/13",
            // "6/14",
            // "6/15",
            // "6/16",
            // "6/17",
            // "6/18",
            // "6/19",
            // "6/20"
          ],
          axisLine: {
            lineStyle: {
              color: "#B0BAC9"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#B0BAC9"
            }
          }
        },
        series: [
          {
            name: "新增用户",
            type: "line",
            // textStyle: {
            //   color: "#8798AD",
            //   fontSize: 16
            // },
            symbolSize: 6,
            data: []
          },
          {
            name: "解绑用户",
            type: "line",
            symbolSize: 6,
            data: []
          }
        ]
      },
      TotalOption: {
        title: {
          text: "数据总量图",
          textStyle: {
            color: "#8798AD",
            fontSize: 16
          }
        },
        dataset: {
          source: [
            [19.6, "交易用户数"],
            [10.6, "绑定用户数"],
            [32.7, "新增用户数"]
          ]
        },
        grid: { containLabel: true },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#B0BAC9"
            }
          }
        },
        yAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#B0BAC9"
            }
          }
        },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["高", "低"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#D7DA8B", "#E15457"]
          }
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product"
            }
          }
        ]
      }
    };
  },
  props: ["visit"],
  mounted() {
    this.initTime();
  },
  computed: {
    nextFlag() {
      const { controlCount } = this;
      return controlCount >= -1;
    },
    startShow() {
      let { startTime } = this;
      startTime = new Date(startTime);
      return dateFormat(startTime.getTime() / 1000, "dd/MM/yyyy");
    },
    endShow() {
      let { endTime } = this;
      endTime = new Date(endTime);
      return dateFormat(endTime.getTime() / 1000, "dd/MM/yyyy");
    }
  },
  methods: {
    // 更新图表1
    updateRunChart() {
      var myChart1 = echarts.init(document.getElementById("trend"));
      myChart1.setOption(this.runOption);
    },
    // 更新图表2
    updateTotalChart() {
      var myChart2 = echarts.init(document.getElementById("allcount"));
      myChart2.setOption(this.TotalOption);
    },
    // 处理走势数据
    disposeRunData(res) {
      // console.log(res);
      if (res.code === "1") {
        this.runOption.xAxis.data = res.data.dates;
        if (this.visit === "product") {
          this.runOption.legend.data[0] = {name:"新增用户",icon:"circle"}
          this.runOption.series[0] = {name:"新增用户",type:"line",symbolSize:6,data:res.data.addUserNum}
          this.runOption.legend.data[1] = {name:"解绑用户",icon:"circle"}
          this.runOption.series[1] = {name:"解绑用户",type:"line",symbolSize:6,data:res.data.unbindNum}
        } else if (this.visit === "income") {
          this.runOption.legend.data[0] = {name:"平台收入",icon:"circle"}
          this.runOption.series[0] = {name:"平台收入",type:"line",symbolSize:6,data:res.data.incomeNum}
          this.runOption.legend.data[1] = {name:"拉新支出",icon:"circle"}
          this.runOption.series[1] = {name:"拉新支出",type:"line",symbolSize:6,data:res.data.inviteNum}
          this.runOption.legend.data[2] = {name:"平台净收入",icon:"circle"}
          this.runOption.series[2] = {name:"平台净收入",type:"line",symbolSize:6,data:res.data.netIncomNum}
          this.runOption.legend.data[3] = {name:"订单数量",icon:"circle"}
          this.runOption.series[3] = {name:"订单数量",type:"line",symbolSize:6,data:res.data.orderNum}
        }
        this.updateRunChart();
      }
    },
    // 处理总量数据
    disposeTotalData(res) {
      // console.log(res)
      if (res.code === "1") {
        if (this.visit === "product") {
          this.TotalOption.dataset.source[0] = [+res.data.transferNum,"交易用户数"];
          this.TotalOption.dataset.source[1] = [+res.data.bingNum,"绑定用户数"];
          this.TotalOption.dataset.source[2] = [+res.data.addNum,"新增用户数"];
        } else if (this.visit === "income") {
          this.TotalOption.dataset.source[3] = [+res.data.incomeNum,"平台收入"];
          this.TotalOption.dataset.source[2] = [+res.data.inviteNum,"拉新支出"];
          this.TotalOption.dataset.source[1] = [+res.data.netIncomNum,"平台净收入"];
          this.TotalOption.dataset.source[0] = [+res.data.orderNum,"订单数量"];
        }

        this.updateTotalChart();
      }
    },
    // 获取图表数据
    getData() {
      let { startTime, endTime } = this;
      startTime = dateFormat(
        new Date(startTime).getTime() / 1000,
        "yyyy-MM-dd"
      );
      endTime = dateFormat(new Date(endTime).getTime() / 1000, "yyyy-MM-dd");
      const query = { startDate: startTime, endDate: endTime };
      if (this.visit === "product") {
        productRunChart(query).then(this.disposeRunData);
        productTotalChart(query).then(this.disposeTotalData);
      } else if (this.visit === "income") {
        incomeRunChart(query).then(this.disposeRunData);
        incomeTotalChart(query).then(this.disposeTotalData);
      }
    },
    //初始化开始结束时间函数，默认上一周
    initTime() {
      this.controlCount = -1;
      const now = new Date(Date.now());
      // const whatDay = now.getDay();
      // if (whatDay === 0) whatDay === 7;
      // now.setDate(now.getDate() - whatDay);
      now.setDate(now.getDate() - 1);
      this.endTime = now;
      const start = new Date(now);
      start.setDate(start.getDate() - 6);
      this.startTime = start;
      this.getData();
    },
    // 控制开始结束时间变化，目前只控制一周
    controlTime(controlNum, clickIndex) {
      this.selectIndex = clickIndex;
      let { startTime, endTime } = this;
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      if (controlNum === 1) {
        this.startTime = new Date(startTime.setDate(startTime.getDate() + 7));
        this.endTime = new Date(endTime.setDate(endTime.getDate() + 7));
        this.controlCount++;
        this.getData();
      } else if (controlNum === -1) {
        this.startTime = new Date(startTime.setDate(startTime.getDate() - 7));
        this.endTime = new Date(endTime.setDate(endTime.getDate() - 7));
        this.controlCount--;
        this.getData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dataChart-warp {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .searchCondition {
    display: flex;
    .el-button {
      color: #6eb239;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
      border-radius: 4px;
      min-width: 100px;
    }
    .active {
      background: #6eb239;
      color: #ffffff;
    }
    .showtime {
      line-height: 40px;
      padding: 0 15px;
      color: #8898aa;
      font-size: 14px;
    }
    .searchTime {
      flex: 1;
      display: flex;
      //   background: #6eb239;
      margin-left: 70px;
      .title {
        padding: 0 20px;
        line-height: 40px;
      }
      .el-button {
        background: #6eb239;
        color: #ffffff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
          0px 4px 6px 0px rgba(50, 50, 93, 0.11);
        border-radius: 4px;
        min-width: 100px;
      }
      .search-button {
        margin-left: 30px;
      }
    }
  }
  .searchResult {
    flex: 1;
    padding: 30px 0;
    display: flex;
    #trend {
      width: 558px;
      height: 404px;
      background: #ffffff;
      box-shadow: 0px 10px 20px 0px rgba(46, 91, 255, 0.07);
      border-radius: 1px;
      padding: 20px;
      box-sizing: border-box;
    }
    #allcount {
      padding: 20px;
      box-sizing: border-box;
      width: 769px;
      height: 404px;
      background: #ffffff;
      margin-left: 27px;
    }
  }
}
</style>
