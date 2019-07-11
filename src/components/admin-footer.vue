<template>
  <div class="footer-warp">
    <div class="statement">拼车吧数据详细报表</div>
    <div class="download">
      <el-button @click="download" class="download-button">下载</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    imgType(ty) {
      let type = ty.toLowerCase().replace(/jpg/i, "jpeg");
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return "image/" + r;
    },
    download() {
      var canvas1 = document.querySelector("#trend > div > canvas");
      var canvas2 = document.querySelector("#allcount > div > canvas");
      if(canvas1 === null || canvas2 === null ) return
      let type = "png"; //设置下载图片的格式

      let img_png_src1 = canvas1.toDataURL("image/png"); //将canvas保存为图片
      let img_png_src2 = canvas2.toDataURL("image/png"); //将canvas保存为图片

      let imgData1 = img_png_src1.replace(this.imgType(type), "image/octet-stream");
      let imgData2 = img_png_src2.replace(this.imgType(type), "image/octet-stream");

      let filename = "图片" + "." + type; //下载图片的文件名

      this.saveFile(imgData1, filename);
      this.saveFile(imgData2, filename);
    },
    saveFile(data, fileName) {
      let save_link = document.createElement("a");
      save_link.href = data;
      save_link.download = fileName;

      let event = document.createEvent("MouseEvents");
      event.initEvent("click", true, false);
      save_link.dispatchEvent(event);
    }
  }
};
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
    color: #8898aa;
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
