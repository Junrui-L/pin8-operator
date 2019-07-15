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
            <el-input class="input" v-model="carNo" placeholder="请输入车牌号"></el-input>
          </div>
          <div class="condition-item">
            <div class="condition-title">时间范围</div>
            <el-date-picker
              v-model="timevalue"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="condition-item">
            <el-button @click="handleInquire">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
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
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="size"
          :total="total"
          @current-change="handleInquire"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getMissionListByPage, getHistoryMissionListByPage } from "@/https/api";
export default {
  data() {
    return {
      phone: "",
      name: "",
      carNo: "",
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
        },
        {
          value: "4",
          label: "审核拒绝"
        }
      ],
      value: "1",
      timevalue: "",
      tableData: [],
      total: 100,
      size: 8,
      current: 1 //当前页数
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
          { prop: "id", label: "序号" },
          { prop: "missionId", label: "任务编号" },
          { prop: "auditName", label: "姓名" },
          { prop: "auditMobile", label: "手机号" },
          { prop: "carNo", label: "车牌号" },
          { prop: "applyTime", label: "申请日期" },
          { prop: "auditStatus", label: "状态" }
        ];
      } else if (this.model === "inquire") {
        columnlist = [
          { prop: "id", label: "序号" },
          { prop: "missionId", label: "任务编号" },
          { prop: "auditName", label: "姓名" },
          { prop: "auditMobile", label: "手机号" },
          { prop: "carNo", label: "车牌号" },
          { prop: "applyTime", label: "申请日期" },
          { prop: "auditStatus", label: "状态" },
          { prop: "auditBy", label: "审核人员" },
          { prop: "auditTime", label: "审核时间" }
        ];
      }
      return columnlist;
    }
  },
  methods: {
    // 列表点击其中一行
    headleClick(row) {
      // console.log(row);
      if (this.model === "dispose") {
        this.$router.push("auditDetails?model=dispose");
      } else if (this.model === "inquire") {
        this.$router.push("auditDetails?model=inquire");
      }
    },
    // 获取数据
    handleInquire(no) {
      if (typeof no === "object") {
        // 代表点击查询获取数据
        this.current = 1;
      } else if (typeof no === "number") {
        // 代表改变页数获取数据
        this.current = no;
      }
      const { model } = this;
      if (model === "dispose") {
        getMissionListByPage({
          auditStatus: 1,
          carNo: this.carNo,
          current: this.current,
          endTime: this.timevalue[0],
          mobile: this.phone,
          name: this.name,
          size: this.size,
          startTime: this.timevalue[1]
        }).then(res => {
          if (res.code === "1") {
            console.log(res.data);
            this.total = res.data.total;
            this.tableData = res.data.records.map(item => {
              // {
              // { prop: "id", label: "序号" },
              // { prop: "missionId", label: "任务编号" },
              // { prop: "auditName", label: "姓名" },
              // { prop: "auditMobile", label: "手机号" },
              // { prop: "carNo", label: "车牌号" },
              // { prop: "applyTime", label: "申请日期" },
              // { prop: "auditStatus", label: "状态" }
              // }

              // {
              // accountNo: "13316595376"
              // applyTime: "2019-07-15T19:49:02.000+0000"
              // auditBy: null
              // auditMobile: "手机号"
              // auditName: "姓名"
              // auditStatus: 1
              // auditTime: null
              // carNo: "车牌号"
              // drivingLicenseUrl: "http://119.23.14.40/nrbc-admin-app/static/avatar_default.jpeg"
              // drivingPermitUrl: "http://119.23.14.40/nrbc-admin-app/static/avatar_default.jpeg"
              // id: 3
              // identityNo: "身份证号"
              // missionId: "M201907151449023819"
              // qualificationCertificateUrl: "http://119.23.14.40/nrbc-admin-app/static/avatar_default.jpeg"
              // rejectReason: null
              // userIdentifyUrl: "http://119.23.14.40/nrbc-admin-app/static/avatar_default.jpeg"
              //               }
              return {
                id: item.id,
                missionId: item.missionId,
                auditName: item.auditName,
                auditMobile: item.auditMobile,
                carNo: item.carNo,
                applyTime: item.applyTime,
                auditStatus: item.auditStatus
              };
            });
          }
        });
      } else if (model === "inquire") {
        getHistoryMissionListByPage({
          auditStatus: 1,
          carNo: this.carNo,
          current: this.current,
          endTime: this.timevalue[0],
          mobile: this.phone,
          name: this.name,
          size: this.size,
          startTime: this.timevalue[1]
        }).then(res => {
          if (res.code === "1") {
            console.log(res.data);
            this.total = res.data.total;
          }
        });
      }
    },
    handleReset() {
      this.phone = "";
      this.name = "";
      this.carNo = "";
      (this.value = "1"), (this.timevalue = "");
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
    .el-pagination {
      float: right;
    }
  }
}
</style>
