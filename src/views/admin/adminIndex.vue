<template>
  <el-container>
    <el-aside width="200px"><leftNav></leftNav></el-aside>
    <el-container>
      <el-header height="80px"><adminHeader></adminHeader></el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer height="60px"><adminFooter></adminFooter></el-footer>
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
  created() {
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
.el-header,
.el-footer {
  background-color: #fff;
  color: #2E384D;
  padding:0;
  // text-align: center;
  // line-height: 60px;
}
.el-footer{
    padding:0 20px;
}
.el-aside {
  background-color: #2E384D;
  color: #fff;
  text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #f8f8f8;
  color: #333;
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
