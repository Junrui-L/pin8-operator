<template>
  <div class="list-warp">
    <el-card>
      <div class="list-header" slot="header">
        <div class="top">
          <div class="condition-item">
            <div class="condition-title">手机号</div>
            <el-input class="input" v-model="phone" placeholder="请输入手机号"></el-input>
          </div>
          <div class="condition-item">
            <div class="condition-title">姓名</div>
            <el-input class="input" v-model="name" placeholder="请输入姓名"></el-input>
          </div>
          <div class="condition-item" v-show="model === 'inquire'">
            <div class="condition-title">审核状态</div>
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="bottom">
          <div class="condition-item">
            <div class="condition-title">车牌号</div>
            <el-input class="input" v-model="plate" placeholder="请输入车牌号"></el-input>
          </div>
          <div class="condition-item">
            <div class="condition-title">时间范围</div>
            <el-date-picker
              v-model="timevalue"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="condition-item">
            <el-button>查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
      </div>
      <div class="main">
        <el-table
          :data="tableData"
          @row-click="headleClick"
          height="550"
          border
          style="width: 100%"
        >
          <!-- width=170  -->
          <el-table-column
            v-for="(item,index) in columnList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      name: "",
      plate: "",
      options: [
        {
          value: "1",
          label: "--请选择--"
        },
        {
          value: "2",
          label: "审核通过"
        },
        {
          value: "3",
          label: "驳回"
        }
      ],
      value: "",
      timevalue: "",
      tableData: [
        {
          number: "1",
          taskNo: "A12002",
          name: "张三",
          phone: "13800013800",
          plate: "京A0000",
          applyDate: "2019-7-11 08:30",
          flag: "审核",
          auditPersonn: "1659956265",
          auditTime: "2019-7-11 11:30"
        }
      ]
    };
  },
  props: ["model"],
  mounted() {
    // console.log(this.model);
  },
  computed: {
    columnList() {
      let columnlist = [];
      if (this.model === "dispose") {
        columnlist = [
          { prop: "number", label: "序号" },
          { prop: "taskNo", label: "任务编号" },
          { prop: "name", label: "姓名" },
          { prop: "phone", label: "手机号" },
          { prop: "plate", label: "车牌号" },
          { prop: "applyDate", label: "申请日期" },
          { prop: "flag", label: "状态" }
        ];
      } else if (this.model === "inquire") {
        columnlist = [
          { prop: "number", label: "序号" },
          { prop: "taskNo", label: "任务编号" },
          { prop: "name", label: "姓名" },
          { prop: "phone", label: "手机号" },
          { prop: "plate", label: "车牌号" },
          { prop: "applyDate", label: "申请日期" },
          { prop: "flag", label: "状态" },
          { prop: "auditPersonn", label: "审核人员" },
          { prop: "auditTime", label: "审核时间" }
        ];
      }
      return columnlist;
    }
  },
  methods: {
    headleClick(row) {
      // console.log(row);
      if (this.model === "dispose") {
        this.$router.push("auditDetails?model=dispose");
      } else if (this.model === "inquire") {
        this.$router.push("auditDetails?model=inquire");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.list-warp {
  width: 100%;
  height: 100%;
  .el-card {
    width: 100%;
    height: 100%;
    .list-header {
      width: 100%;
      display: flex;
      flex-direction: column;
      .top {
        width: 100%;
        display: flex;
      }
      .bottom {
        width: 100%;
        display: flex;
        margin-top: 10px;
      }
      .condition-item {
        width: 33.33333333333333%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        display: flex;
        .condition-title {
          display: inline-block;
          width: 150px;
          font-size: 20px;
        }
        .input {
          /deep/ .el-input__inner {
            background: #e0e7ff;
          }
        }
        .el-date-editor {
          margin-top: 10px;
        }
        .el-button {
          background: #6eb239;
          color: #ffffff;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
            0px 4px 6px 0px rgba(50, 50, 93, 0.11);
          border-radius: 4px;
          min-width: 100px;
          height: 60px;
          margin-left: 40px;
        }
      }
    }
    .main {
    }
  }
}
</style>
