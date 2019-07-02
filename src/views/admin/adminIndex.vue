<template></template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    if(!this.userInfo){
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
