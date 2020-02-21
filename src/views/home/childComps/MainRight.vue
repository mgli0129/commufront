<template>
  <div id="main-right">
    <div class="col-lg-12 col-md-12 col-sm-8 col-xs-8 question-right-header">
      <img src="static/imges/wechat.jpg" class="img-thumbnail index-img-wechat">
      <div class="index-img-wechat-text">
        <span>关注微信---学习交流合作</span>
      </div>
    </div>
    <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-hr">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-header">
      <h4 class="question-right-topic">热门话题</h4>
      <ul class="question-right-ul" v-for="(item, index) in hotTopics" :key="index">
        <li><a @click="goToHotTopics(item)">{{item}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MainRight",
    data() {
      return {
        weChat: '/asset/imges/wechat.jpg'
      }
    },
    props: {
      hotTopics: {
        type: Array,
        default: []
      }
    },
    methods: {
      goToHotTopics(item) {
        this.$router.push({
          path: '/hottopics',
          query: {tag: item}
        })
      }
    }
  }
</script>

<style scoped>

  .question-right-header {
    margin: 28px 0 10px 0;
    padding-left: 15px;
  }

  .index-img-wechat {
    padding: 7px;
  }

  .index-img-wechat-text {
    margin: 0;
    padding: 0;
    font-size: large;
    text-align: center;
  }

  .question-right-hr {
    margin-bottom: 0;
  }

  .question-right-topic {
    margin: 0;
    padding: 0;
  }

  .question-right-ul {
    margin: 10px 0;
    padding-left: 0;
    list-style: none;
    line-height: 15px;
  }

</style>
