<template>
  <div id="detail">
    <navigation :common="common" @toSearch="toSearch"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <!--左侧内容-->
          <question-left class="col-lg-9 col-md-9 col-sm-9 col-xs-12 question_left" :question="question"
                         :comments-list="showCommentsList" :common="common"
                         v-if="readyToLeft()"
                         @reloadQuestion="reloadQuestion"></question-left>
          <!--右侧内容-->
          <question-right class="col-lg-3 col-md-3 col-sm-3 col-xs-12 question-right" :question="question"
                          :question-related="questionRelated" @reloadQuestion="reloadQuestion"
                          v-if="readyToRight()"></question-right>
          <div class="col-lg-1 col-md-1"></div>
        </div>
      </div>
      <bottom></bottom>
    </div>
  </div>
</template>

<script>

  import Navigation from "../../components/content/navigation/Navigation";
  import Bottom from "../../components/content/bottom/Bottom";
  import QuestionLeft from "./childComps/QuestionLeft";
  import QuestionRight from "./childComps/QuestionRight";

  export default {
    name: "Detail",
    data() {
      return {
        id: this.$route.query.id,
        search: '',
        common: {},
        question: {},
        commentsList: [],
        questionRelated: [],
      }
    },
    components: {
      Navigation,
      Bottom,
      QuestionLeft,
      QuestionRight,
    },
    created() {
      this.loadQuestion();
    },
    computed: {
      showCommentsList() {
        return this.commentsList;
      }
    },
    methods: {
      loadQuestion() {
        this.$api.question.getQuestionById(this.id).then(res => {
          this.common = res.data.common;
          this.question = res.data.question;
          this.commentsList = res.data.comments;
          console.log(this.commentsList);
          this.questionRelated = res.data.questionRelated;
        })
      },

      /**
       * 刷新页面或者定位到另一个问题
       * 由指定的id决定
       * @param id
       */
      reloadQuestion(id) {
        this.id = id;
        this.$route.query.id = this.id;
        this.commentsList = null;
        this.loadQuestion();
      },

      toSearch(s) {
        this.search = s;
        //do nothing!
      },
      readyToLeft() {
        return this.question.content !== undefined
      },
      readyToRight() {
        return this.question.user != null
      },

    }
  }
</script>

<style scoped>
  .question_left {
    border-right: 5px solid var(--color-background);
    background-color: var(--color-main);
  }

  .question-right {
    padding-left: 0;
    border-left: 5px solid var(--color-background);
    background-color: var(--color-main);
  }

</style>
