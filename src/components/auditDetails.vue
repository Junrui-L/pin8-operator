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
          <div class="msg">{{idNo}}</div>
        </div>
      </div>
      <div class="main">
        <div class="image-item">
          <div class="image-title">驾驶证</div>
          <el-image></el-image>
        </div>
        <div class="image-item">
          <div class="image-title">从业资格证</div>
          <el-image></el-image>
        </div>
        <div class="image-item">
          <div class="image-title">行驶证</div>
          <el-image></el-image>
        </div>
        <div class="image-item">
          <div class="image-title">人车合影</div>
          <el-image></el-image>
        </div>
      </div>
      <div class="footer">
        <div v-if="model === 'dispose'" class="dispose">
          <el-button @click="auditPass">审核通过</el-button>
          <el-button @click="auditReject('rurn')">驳回</el-button>
          <el-button @click="auditReject('reject')">审核拒绝</el-button>
        </div>
        <div v-else-if="model === 'inquire'" class="inquire">
          <div class="inquire-top">
            <div class="inquire-title">驳回原因</div>
            <div class="inquire-show">图片不清晰</div>
          </div>
          <div class="inquire-bottom">
            <el-button @click="()=>$router.back()">返回</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "张三",
      idNo: "440859326548665875",
      checkList: []
    };
  },
  computed: {
    model() {
      return this.$route.query.model;
    }
  },
  mounted() {
    // console.log(this.$route.query.model);
  },
  methods: {
    auditPass() {
      this.$confirm("确认通过审核吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "审核通过"
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
      this.$router.push(`auditRject?model=${model}`)
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
          width: 180px;
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
        }
      }
    }
  }
}
</style>
