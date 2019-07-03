<template>
  <div class="login-warp">
    <img class="loginImg" src="@/assets/image/car.png" />
    <div class="title">
      <div class="title-warp">
        <div class="login">登录</div>
        <div class="pin8">拼车吧运营管理系统</div>
        <div class="login-form">
          <div class="lable">
            <div class="hint">用户名/手机号/邮箱</div>
            <el-input class="input" v-model="email" placeholder="请输入用户名/手机号/邮箱"></el-input>
          </div>
          <div class="lable">
            <div class="hint">密码</div>
            <el-input class="input" v-model="pwd" placeholder="请输入密码"></el-input>
          </div>
          <div class="lable">
            <div class="hint">验证码</div>
            <div class="yanzhen-warp">
              <el-input class="input yanzhen" v-model="verification" placeholder="请输入验证码"></el-input>
              <div class="yanzhenPic"></div>
            </div>
          </div>
          <el-button @click="toLogin" class="login-button">登录</el-button>
          <div class="suggest">请使用Chrome或Firefox、IE9+浏览器访问本站</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      pwd: "",
      verification: ""
    };
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    toLogin(){
      // this.$router.push
      console.log('jump')
      this.setUserInfo({})
      this.$router.push('/admin')
    }
  }
};
</script>
<style lang="scss" scoped>
.login-warp {
  width: 100%;
  height: 100%;
  display: flex;
  .loginImg {
    display: inline-block;
    // width: 1005px;
    // height: 1024px;
    width: 59.82%;
    height: 100%;
  }
  .title {
    flex: 1;
    position: relative;
    .title-warp {
      // background: pink;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      .login {
        font-size: 30px;
        color: #2e384d;
      }
      .pin8 {
        margin-top: 10px;
        font-size: 16px;
        color: #8798ad;
      }
      .login-form {
        margin-top: 40px;
        .lable {
          .hint {
            font-size: 12px;
            color: #b0bac9;
            margin: 10px 0 5px 0;
          }
          .input{
            /deep/ .el-input__inner{
              background: #E0E7FF;
            }
          }
          .yanzhen-warp {
            display: flex;
            .yanzhen {
              width: 50%;
            }
            .yanzhenPic {
              margin-left: 10px;
              flex: 1;
              border-radius: 4px;
              border: 1px solid rgba(224,231,255,1);
            }
          }
        }
        .login-button {
          width: 100%;
          margin: 15px 0 10px 0;
          background: #2e384d;
          color: #fff;
        }
        .suggest {
          font-size: 14px;
          color: #b0bac9;
        }
      }
    }
  }
}
</style>
