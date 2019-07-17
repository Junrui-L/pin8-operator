<template>
  <el-card>
    <div class="headerTitlt" slot="header">选择{{showText}}原因</div>
    <div class="main">
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item" v-for="(item,index) in checkOption" :key="index"></el-checkbox>
      </el-checkbox-group>
      <div class="other">
        <span>其他原因</span>
        <el-input type="textarea" :rows="3" placeholder v-model="otherText"></el-input>
      </div>
      <div class="buttons">
        <el-button class="left" @click="submit">提交</el-button>
        <el-button class="right" @click="()=>$router.back()">关闭</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import { auditMission } from "@/https/api";
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      checkList: [],
      model: this.$route.query.model,
      otherText: ""
    };
  },
  computed: {
    ...mapGetters(["selectAuditId"]),
    showText() {
      return this.model === "rurn" ? "驳回" : "拒绝";
    },
    checkOption() {
      const { model } = this;
      let optionList = [];
      if (model === "rurn") {
        optionList = [
          "行驶证照片不清晰",
          "驾驶证照片不清晰",
          "人车合影照片不清晰",
          "从业资格证照片不清晰",
          "从业资格证个人信息与身份证个人信息不符",
          "人车合影车牌号与行驶证不符",
          "人车合影人员与驾驶证人员不符"
        ];
      } else if (model === "reject") {
        optionList = ["资料不真实", "年龄大于60周岁"];
      }
      return optionList;
    }
  },
  methods: {
    ...mapActions(["clearUserInfo"]),
    submit() {
      console.log(this.otherText.trim().length);
      if (this.otherText.trim().length !== 0) {
        this.checkList.push(this.otherText.trim());
      }
      let rjectText = this.checkList.join(";");
      let status = 0;
      if (this.model === "rurn") {
        status = 3;
      } else if (this.model === "reject") {
        status = 4;
      }
      auditMission({
        missionId: this.selectAuditId,
        auditStatus: status,
        rejectReason: rjectText
      }).then(res => {
        if (res.code === "1") {
          this.$message({
            type: "success",
            message: "提交通过"
          });
          this.$router.replace("/auditDispose");
        } else if (result.code === "20011" || result.code === "10001" || result.code === "10002" || result.code === "10003") {
          this.$message.error(result.msg);
          this.clearUserInfo();
          this.$router.push("/login");
        } else {
          this.$message.error(result.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  .headerTitlt {
    font-size: 25px;
  }
  /deep/ .el-card__body {
    flex: 1;
    position: relative;
    .main {
      width: 30%;
      position: absolute;
      left: 20%;
      //   top: 50%;
      //   transform: translateX(-50%) translateY(-50%);
      .el-checkbox {
        display: block;
        font-size: 35px;
        font-weight: 600;
      }
      .other {
        margin-top: 20px;
        .el-textarea {
          margin-top: 20px;
        }
      }
      .buttons {
        margin-top: 20px;
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
      .el-button {
        width: 100px;
        height: 40px;
        background: #6eb239;
        color: #fff;
      }
    }
  }
}
</style>
