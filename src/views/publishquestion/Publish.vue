<template>
  <div id="publish">
    <navigation :common="common" v-if="isNavigation()"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <publish-left class="col-lg-9 col-md-9 col-sm-9 col-xs-12 main-left" :question="question"></publish-left>
          <publish-right class="col-lg-3 col-md-3 col-sm-3 col-xs-12 main-right" id="publish-right"></publish-right>
        </div>
        <div class="col-lg-1 col-md-1"></div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Navigation from "components/content/navigation/Navigation";
  import Bottom from "components/content/bottom/Bottom";
  import PublishLeft from "./childComps/PublishLeft";
  import PublishRight from "./childComps/PublishRight";

  export default {
    name: "Publish",
    data() {
      return {
        common: {},
        questionId: 0,
        question: {},
      }
    },
    created() {
      this.initData();
    },
    components: {
      Navigation,
      Bottom,
      PublishLeft,
      PublishRight
    },
    methods: {
      initData() {
        //从导航栏传递过来的
        if (this.$route.query.params.common != null) {
          this.common = this.$route.query.params.common;
        }
        //从问题详细页传递过来编辑的id
        if (this.$route.query.params.id != null) {
          this.questionId = this.$route.query.params.id;
        }
        this.loadQuestion();
      },
      loadQuestion() {
        if (this.questionId != null && this.questionId > 0) {
          this.$api.question.getQuestionById(this.questionId).then(res => {
            this.common = res.data.common;
            this.question = res.data.question;
          })
        }
      },

      isNavigation() {
        return this.common
      }
    }

  }
</script>

<style scoped>
</style>
