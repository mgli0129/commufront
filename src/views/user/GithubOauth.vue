<template>
</template>

<script>
  export default {
    name: "GithubOauth",
    data() {
      return {
        code: this.$route.query.code,
        state: this.$route.query.state,
      }
    },
    created() {
      this.callback();
    },
    mounted() {
      // this.callback();
    },
    methods: {
      callback() {
        this.$api.githuboauth.callback(this.code, this.state).then(res => {
          //将用户token存入Vuex
          let token = res.data.common.token;
          this.$store.commit('saveAuthorization', token);
          this.$toast({
            message: "用户登录成功！",
            duration: 1000,
            forbidClick: true
          });
          this.$router.push("/home")
        }).catch(rej => {
          this.$router.go(-1);
        })
      },
    }
  }
</script>

<style scoped>
</style>
