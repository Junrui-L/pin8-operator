<template>
  <div class="leftNav-warp">
    <div class="avater">
      <el-avatar class="avater-img" :size="40" :src="circleUrl"></el-avatar>
      <span class="avater-title">拼车吧</span>
    </div>
    <!-- @open="handleOpen" -->
    <!-- @close="handleClose" -->
    <!-- default-active="/productData" -->
    <el-menu
      default-active="/productData"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      text-color="#B0BAC9"
      active-text-color="#fff"
    >
      <el-submenu index="/operation">
        <template>
          <span slot="title">
            <i class="el-icon-setting"></i>运营管理
          </span>
        </template>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/productData">
          <span slot="title">
            <i class="el-icon-menu"></i>产品数据分析
          </span>
        </el-menu-item>
        <el-menu-item index="/income">
          <span slot="title">
            <i class="el-icon-s-data"></i>收入分析
          </span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/audit">
        <template>
          <span slot="title">
            <i class="el-icon-setting"></i>审核管理
          </span>
        </template>
        <el-menu-item index="/auditDispose">
          <span slot="title">
            <i class="el-icon-menu"></i>审核处理
          </span>
        </el-menu-item>
        <el-menu-item index="/auditInquire">
          <span slot="title">
            <i class="el-icon-s-data"></i>审核查询
          </span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchSlicePng50b513dcda8961df336cbfb339f04713"
    };
  },
  mounted() {
    this.handleSelect("/productData");
    // this.handleSelect("/auditDispose");
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index);
    }
  }
};
</script>
<style lang="scss" scoped>
.leftNav-warp {
  width: 100%;
  height: 100%;
  .avater {
    width: 100%;
    height: 80px;
    position: relative;
  }
  .avater-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    margin: auto;
  }
  .avater-title {
    line-height: 80px;
  }
  .el-menu {
    border: none;
    text-align: initial;
    background: #2e384d;
  }
  .el-submenu__title {
    text-align: initial;
  }
  .el-menu-item {
    border-left: 3px solid rgba(110, 178, 57, 0);
    text-align: initial;
    background: rgb(60, 75, 105);
  }
  .el-menu-item:hover {
    background: rgba(60, 75, 105, 0.5);
    border-left: 3px solid rgba(110, 178, 57, 1);
  }
  .el-menu-item.is-active {
    border-left: 3px solid rgba(110, 178, 57, 1);
  }
  // .is-active {
    // background: rgba(135, 152, 173, 0.1);
    // border-left: 3px solid rgb(110, 178, 57);
  // }
}
</style>
