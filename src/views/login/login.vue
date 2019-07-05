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
            <el-input class="input" maxlength="11" v-model="accountNo" placeholder="请输入用户名/手机号/邮箱"></el-input>
          </div>
          <div class="lable">
            <div class="hint">密码</div>
            <el-input class="input" v-model="pwd" placeholder="请输入密码"></el-input>
          </div>
          <div class="lable">
            <div class="hint">验证码</div>
            <div class="yanzhen-warp">
              <el-input class="input yanzhen" v-model="verifyCode" placeholder="请输入验证码"></el-input>
              <div class="yanzhenPic" @click="VerifyCode">
                <img style="width:100%;height:100%;" :src="imgurl" alt />
              </div>
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
import { login } from "@/https/api";
export default {
  data() {
    return {
      accountNo: "",
      pwd: "",
      verifyCode: "",
      imgurl:
        "http://pinbauat.cnlaunch.com/manage-api/api/v1/login/getVerifyCode",
      errmsg: ""
    };
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    async toLogin() {
      const { accountNo, pwd, verifyCode } = this;
      if (!/^1\d{10}$/.test(accountNo)) {
        this.errmsg = "非法手机号";
        this.$message.error(this.errmsg);
        return;
      }
      if (this.pwd.trim().length < 6 || this.pwd.trim().length > 20) {
        this.errmsg = "密码长度在6至20位";
        this.$message.error(this.errmsg);
        return;
      }
      const result = await login({
        accountNo: +accountNo,
        pwd: +pwd,
        type: "01",
        validCodes: "0000",
        verifyCode: verifyCode
      });
      if (result.code === "1") {
        this.$message({
          message: "登陆成功",
          type: "success"
        });
        this.setUserInfo(result.data);
        this.$router.push("/admin");
      } else {
        this.errmsg = result.msg;
        // this.setUserInfo({name:'你爸爸爸爸爸爸吧',accountNo:'17512088321'});
        this.$message.error(this.errmsg);
      }
    },
    VerifyCode() {
      this.imgurl ="http://pinbauat.cnlaunch.com/manage-api/api/v1/login/getVerifyCode?date=" + Date.now();
      // this.imgurl ="http://localhost:8080/manage-api/api/v1/login/getVerifyCode?date=" + Date.now();
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
          .input {
            /deep/ .el-input__inner {
              background: #e0e7ff;
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
              border: 1px solid rgba(224, 231, 255, 1);
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
