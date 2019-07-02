<template>
  <div>
    <img class="loginImg" src="@/assets/image/car.png" />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setUserInfo"])
  }
};
</script>
<style lang="scss" scoped>
.loginImg {
  display: inline-block;
  width: 1005px;
  height: 1024px;
  // height: 100%;
}
</style>
