<template>
  <div class="footer-warp">
    <div class="statement">拼车吧数据详细报表</div>
    <div class="download">
      <el-button class="download-button">下载</el-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.footer-warp {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .statement {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 14px;
    color: #8898AA;
  }
  .download {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    .download-button {
      width: 100px;
      height: 40px;
      background: #6eb239;
      color: #fff;
    }
  }
}
</style>
