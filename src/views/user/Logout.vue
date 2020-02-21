<template>
</template>

<script>
  export default {
    name: "Logout",
    created() {
      this.logout();
    },
    methods: {

      logout() {
        let _this = this;
        this.$api.loginout.logout().then(res => {
          this.$toast({
            message: "用户已退出登录！",
            duration: 2000,
            forbidClick: true
          });

          //删除token
          _this.$store.commit('removeAuthorization');

          setTimeout(() => {
            this.$router.push("/home");
          }, 2000);
        });
      }
    }
  }
</script>

<style scoped>
</style>
