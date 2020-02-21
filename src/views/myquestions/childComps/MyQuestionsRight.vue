<template>
  <div id="my-questions-right">
    <div class="list-group">
      <a href="#" class="list-group-item active">我的提问</a>
      <a @click="goToReply()" class="list-group-item">最新回复
        <span class="badge">{{common.countUnread}}</span>
      </a>
      <a href="#" class="list-group-item">我的关注</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyQuestionsRight",
    props: {
      common: {
        type: Object,
        default: {}
      },
    },
    methods: {
      goToReply() {
        this.$router.push({
          path: '/newreply',
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
