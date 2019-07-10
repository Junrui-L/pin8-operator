<template>
  <div class="header-warp">
    <div class="header-main">
      <div class="user-msg">
        <div
          class="userName"
          style="line-height: 60px;"
          v-if="userInfo"
        >{{userInfo.name === null?userInfo.accountNo:userInfo.name}}</div>
        <div class="header-avater" style="margin-top: 10px;">
          <el-avatar class="avater-img" :size="40" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </div>
    <div class="header-exit" style="width:60px;height:60px" @click="toexit">
      <i class="el-icon-switch-button exit" style="line-height:60px"></i>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { out } from "@/https/api";

export default {
  data() {
    return {
      circleUrl:
        "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchSlicePng50b513dcda8961df336cbfb339f04713"
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["clearUserInfo"]),
    toexit() {
      this.$confirm("是否退出登陆?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await out();
          console.log(result);
          if (result.code === "1") {
            this.$message({
              type: "success",
              message: "退出成功"
            });
            this.clearUserInfo();
            this.$router.replace("/login");
          } else {
            this.$message.error("退出失败，请稍后重试");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.header-warp {
  width: 100%;
  height: 100%;
  display: flex;
  .header-main {
    flex: 1;
    position: relative;
    .user-msg {
      display: inline-block;
      position: absolute;
      right: 0;
      height: 100%;
      .header-avater {
        float: right;
        margin-right: 10px;
      }
      .userName {
        float: right;
        margin-right: 25px;
        text-align: right;
        font-size: 14px;
      }
    }
  }
  .header-exit {
    border-left: 1px solid #e4e8f0;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    // height: 60px;
    // width: 60px;
    .exit {
      color: #71b43d;
    }
  }
}
</style>
