<template>
  <div class="header-warp">
    <div class="header-main">
      <div class="user-msg">
        <div class="header-avater">
          <el-avatar class="avater-img" :size="40" :src="circleUrl"></el-avatar>
        </div>
        <div class="userName" style="line-height:80px">{{userName}}</div>
      </div>
    </div>
    <div class="header-exit" style="height:80px;width:80px;">
      <i class="el-icon-switch-button exit" style="line-height:80px;"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchSlicePng50b513dcda8961df336cbfb339f04713",
      userName: "tangjia"
    };
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
        display: inline-block;
        margin-right: 10px;
        position: absolute;
        top: 50%;
        right: 80px;
        transform: translateY(-50%);
      }
      .userName {
        display: inline-block;
        margin-right: 25px;
        width: 60px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowra;
      }
    }
  }
  .header-exit {
    border-left: 1px solid #e4e8f0;
    text-align: center;
    font-size: 24px;
    .exit {
      color: #71b43d;
    }
  }
}
</style>
