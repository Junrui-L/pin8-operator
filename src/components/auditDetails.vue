<template>
  <div class="audit-Details-warp">
    <el-card>
      <div class="Details-header" slot="header">
        <div class="showItem">
          <div class="title">姓名</div>
          <div class="msg">{{name}}</div>
        </div>
        <div class="showItem">
          <div class="title">身份证号</div>
          <div class="msg">{{identityNo}}</div>
        </div>
      </div>
      <div class="main" v-if="imageMag.length !== 0">
        <div class="image-item" v-for="(item,index) in imageMag" :key="index">
          <div class="image-title">{{item.title}}</div>
          <el-image :src="item.src"></el-image>
        </div>
      </div>
      <div class="footer">
        <div v-if="model === 'dispose'" class="dispose">
          <el-button @click="auditPass">审核通过</el-button>
          <el-button @click="auditReject('rurn')">驳回</el-button>
          <el-button @click="auditReject('reject')">审核拒绝</el-button>
        </div>
        <div v-else-if="model === 'inquire' && auditFlag !== 2" class="inquire">
          <div class="inquire-top">
            <div class="inquire-title">{{auditText}}原因</div>
            <div class="inquire-show">
              <p v-for="(item,index) in rejectReason" :key="index">{{item}}</p>
            </div>
          </div>
          <div class="inquire-bottom">
            <el-button @click="()=>$router.back()">返回</el-button>
          </div>
        </div>
        <div v-else-if="model === 'inquire' && auditFlag === 2" class="inquire">
          <div class="inquire-bottom flag2">
            <el-button @click="()=>$router.back()">返回</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import { auditMission, getMissionDetail } from "@/https/api";
export default {
  data() {
    return {
      name: "张三",
      identityNo: "440859326548665875",
      imageMag: [],
      auditFlag: 0,
      auditText: "",
      rejectReason:''
    };
  },
  computed: {
    ...mapGetters(["selectAuditId"]),
    model() {
      return this.$route.query.model;
    }
  },
  watch: {
    auditFlag(newval) {
      if (newval === 3) {
        this.auditText = "驳回";
      } else if (newval === 4) {
        this.auditText = "拒绝";
      }
    }
  },
  mounted() {
    getMissionDetail({
      missionId: this.selectAuditId
    }).then(res => {
      if (res.code === "1") {
        console.log(res.data);
        this.name = res.data.auditName;
        this.identityNo = res.data.identityNo;
        this.imageMag.push({
          title: "驾驶证",
          src: res.data.drivingLicenseUrl
        });
        this.imageMag.push({
          title: "从业资格证",
          src: res.data.qualificationCertificateUrl
        });
        this.imageMag.push({ title: "行驶证", src: res.data.drivingPermitUrl });
        this.imageMag.push({
          title: "人车合影",
          src: res.data.userIdentifyUrl
        });
        this.auditFlag = res.data.auditStatus;
        this.rejectReason = res.data.rejectReason.split(';');
      } else if (res.code === "20011" || res.code === "10001" || res.code === "10002" || res.code === "10003") {
        this.$message.error(res.msg);
        this.clearUserInfo();
        this.$router.push("/login");
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  methods: {
    ...mapActions(["clearUserInfo"]),
    auditPass() {
      this.$confirm("确认通过审核吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          auditMission({
            missionId: this.selectAuditId,
            auditStatus: 2,
            rejectReason: null
          }).then(res => {
            if (res.code === "1") {
              this.$message({
                type: "success",
                message: "审核通过"
              });
              this.$router.back();
            } else if (res.code === "20011" || res.code === "10001" || res.code === "10002" || res.code === "10003") {
              this.$message.error(res.msg);
              this.clearUserInfo();
              this.$router.push("/login");
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消通过审核"
          });
        });
    },
    auditReject(model) {
      this.$router.push(`auditRject?model=${model}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.audit-Details-warp {
  width: 100%;
  height: 100%;
  .el-card {
    width: 100%;
    height: 100%;
    .Details-header {
      .showItem {
        height: 60px;
        width: 500px;
        display: inline-flex;
        line-height: 60px;
        .title {
          width: 150px;
        }
        .msg {
          flex: 1;
        }
      }
    }
    .main {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 400px;
      .image-item {
        margin-top: 10px;
        display: flex;
        width: 600px;
        .image-title {
          margin-right: 20px;
          margin-left: 20px;
          margin-top: 20px;
          font-size: 20px;
        }
        .el-image {
          width: 288px;
          height: 180px;
        }
      }
    }
    .footer {
      border-top: 1px solid #dcdcdc;
      margin-top: 10px;
      height: 200px;
      .el-button {
        width: 200px;
        height: 40px;
        background: #6eb239;
        color: #fff;
      }
      .dispose {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
      }
      .inquire {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        .inquire-top {
          height: 120px;
          display: flex;
          .inquire-title {
            width: 100px;
            text-align: center;
            display: inline-block;
            line-height: 40px;
            font-size: 14px;
            color: #2f444e;
          }
          .inquire-show {
            overflow: auto;
            display: inline-block;
            // background: green;
            padding: 10px;
            border: 1px solid #dcdcdc;
            flex: 1;
            height: 90px;
            font-size: 14px;
            color: #8888a7;
          }
        }
        .inquire-bottom {
          text-align: center;
          height: 40px;
          &.flag2 {
            margin-top: 50px;
          }
        }
      }
    }
  }
}
</style>
