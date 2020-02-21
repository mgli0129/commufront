<template>
  <div id="new-reply-right">
    <div class="list-group">
      <a @click="goToMyQuestions()" class="list-group-item">我的提问</a>
      <a href="#" class="list-group-item active">最新回复
        <span class="badge">{{common.countUnread}}</span></a>
      <a href="#" class="list-group-item">我的关注</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewReplyRight",
    props: {
      common: {
        type: Object,
        default: {}
      },
    },
    methods: {
      goToMyQuestions() {
        this.$router.push({
          path: '/myquestions',
          query: {
            common: this.common
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
