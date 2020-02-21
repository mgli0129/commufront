<template>
  <div id="hot-topics-right">
    <div class="col-lg-12 col-md-12 col-sm-8 col-xs-8 hottopic-right-header">
      <h4>话题信息</h4>
      <br>
      <kbd>总问题数</kbd>: &nbsp;&nbsp;&nbsp;&nbsp;<code>{{showQuestionCount}}</code>
      <br><br>
      <kbd>总回复数</kbd>: &nbsp;&nbsp;&nbsp;&nbsp;<code>{{showCommentCount}}</code>
      <br><br>
      <kbd>总阅读数</kbd>: &nbsp;&nbsp;&nbsp;&nbsp;<code>{{showViewCount}}</code>
    </div>
    <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-hr">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 hottopic-right-header">
      <h4 class="hottopic-userwall-title">用户墙</h4>
      <div class="hottopic-userwall-out-pos">
      <span v-for="(user, index) in tagUsersList" :key="index">
         <a href="#"><img class="hottopic-userwall img-circle" :src="'static' + user.avatarUrl"></a>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HotTopicsRight",
    props: {
      tagUsersList: {
        type: Array,
        default: []
      },
      hotTopicData: {
        type: Object,
        default: {}
      }
    },
    computed: {
      showQuestionCount() {
        return this.hotTopicData === null ? '计算中...' : this.hotTopicData.questionCount;
      },
      showCommentCount() {
        return this.hotTopicData == null ? '计算中...' : this.hotTopicData.commentCount
      },
      showViewCount() {
        return this.hotTopicData == null ? '计算中...' : this.hotTopicData.viewCount;
      }
    }
  }
</script>

<style scoped>
  .hottopic-right-header {
    margin: 16px 0 10px 0;
    padding-left: 15px;
  }

  .hottopic-userwall-title {
    margin-bottom: 20px;
  }

  .hottopic-userwall-out-pos{
    text-align: center;
  }

  .hottopic-userwall {
    margin: 3px;
    padding: 0;
    width: 38px;
    height: 38px;
  }

  .question-right-hr {
    margin-bottom: 0;
  }
</style>
