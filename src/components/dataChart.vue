<template>
  <div class="dataChart-warp">
    <div class="searchCondition">
      <el-button class="active">前一周</el-button>
      <div class="showtime">{{showTime}}</div>
      <el-button class>后一周</el-button>
      <el-button class>最近一周</el-button>
      <!-- <el-button class>最近一个月</el-button>
      <el-button class>最近三个月</el-button>
      <div class="searchTime">
        <div class="title">日期</div>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
        <div class="title">至</div>
        <el-date-picker v-model="endTime" type="date" placeholder="选择日期"></el-date-picker>
        <el-button class="search-button">查询</el-button>
      </div> -->
    </div>
    <div class="searchResult">
      <div id="trend"></div>
      <div id="allcount"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      showTime: "06/20/2019 - 06/27/2019",
      nowTime:new Date(Date.now()).getDay()
      // startTime: "",
      // endTime: ""
    };
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById("trend"));
    // 绘制图表1
    myChart1.setOption({
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
        data: ["6/13", "6/14", "6/15", "6/16", "6/17", "6/18", "6/19", "6/20"],
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
          data: [5, 20, 36, 10, 10, 20, 42, 16]
        },
        {
          name: "解绑用户",
          type: "line",
          symbolSize: 6,
          data: [10, 25, 77, 45, -5, 20, 66, 25]
        }
      ]
    });
    var myChart2 = echarts.init(document.getElementById("allcount"));
    // 绘制图表2
    myChart2.setOption({
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
        text: ["High Score", "Low Score"],
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
    });
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
