<template>
  <el-container>
    <el-aside><leftNav></leftNav></el-aside>
    <el-container>
      <el-header><adminHeader></adminHeader></el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer><adminFooter v-if="$route.fullPath === '/productData' || $route.fullPath === '/income'"></adminFooter></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import leftNav from '../../components/leftNav'
import adminHeader from '../../components/admin-header'
import adminFooter from '../../components/admin-footer'
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted (){
    console.log( this.$route.fullPath)
    if (!this.userInfo) {
      this.$router.replace("/login");
    }
  },
  components: {
    leftNav,
    adminHeader,
    adminFooter
  }
};
</script>

<style lang="scss" scoped>
.el-container{
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #2E384D;
  padding:0;
  height: 80px;
  // line-height: 80px;
}
.el-footer {
  background-color: #fff;
  color: #2E384D;
  padding:0;
  height: 60px;
  // text-align: center;
  line-height: 60px;
}
.el-footer{
    padding:0 20px;
}
.el-aside {
  background-color: #2E384D;
  color: #fff;
  text-align: center;
  // width: 200px;
  // line-height: 200px;
}

.el-main {
  background-color: #f8f8f8;
  color: #333;
  // overflow: hidden;
  // text-align: center;
  // line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
