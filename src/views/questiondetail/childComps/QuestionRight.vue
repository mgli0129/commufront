<template>
  <div id="question-right">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-header">
      <h4 class="question-right-topic">发起人</h4>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 media question-right-media">
      <div class="media-left">
        <a href="#"><img class="media-object img-circle" :src="'static' + question.user.avatarUrl"></a>
      </div>
      <div class="media-body media-body-avartar-name">
        <span>{{question.user.name}}</span>
      </div>
    </div>
    <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-hr">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-right-header">
      <h4 class="question-right-topic">相关问题</h4>
      <ul class="question-right-ul" v-for="(item,index) in questionRelated" :key="index">
        <li><a @click="goToQuestion(item.id)">{{item.title}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuestionRight",
    data(){
      return {
      }
    },
    props: {
      question: {
        type: Object,
        default: () =>{
          return {}
        }
      },
      questionRelated: {
        type: Array,
        default: []
      }
    },
    methods: {
      /**
       * 跳转至另一问题
       * @param id
       * @returns {*|void|this}
       */
      goToQuestion(id) {
        //刷新页面
        this.$emit("reloadQuestion", id);
        window.scrollTo(0,0);
      },
    }
  }
</script>

<style scoped>
  .question-right-header {
    margin: 28px 0 10px 0;
    padding-left: 15px;
  }

  .question-right-topic {
    margin: 0;
    padding: 0;
  }

  .question-right-media {
    margin-top: 20px;
    padding-left: 15px;
  }

  .media-body-avartar-name {
    padding-top: 8px;
  }

  .question-right-hr {
    margin-bottom: 0;
  }

  .question-right-ul {
    margin: 10px 0;
    padding-left: 0;
    list-style: none;
    line-height: 15px;
  }
</style>
