<template>
  <div id="my-questions">
    <navigation :common="common" @toSearch="toSearch"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <my-questions-left class="col-lg-9 col-md-9 col-sm-9 col-xs-12 main-left"
                             @toPage="toPage"
                             :questions-list="questionsList"
                             :page-info="pageInfo"
                             :common="common"
                             v-if="questionsList != undefined"
          ></my-questions-left>
          <my-questions-right class="col-lg-3 col-md-3 col-sm-3 col-xs-12 main-right2" :common="common"
                              v-if="readyToRight()"></my-questions-right>
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
  import MyQuestionsLeft from "./childComps/MyQuestionsLeft";
  import MyQuestionsRight from "./childComps/MyQuestionsRight";

  export default {
    name: "MyQuestions",
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        search: "",
        common: {},
        pageInfo: {},
        questionsList: [],
      }
    },
    components: {
      Navigation,
      Bottom,
      MyQuestionsLeft,
      MyQuestionsRight
    },
    created() {
      this.initData();
      this.loadMyQuestionsData();
    },
    methods: {
      initData() {
        // if (this.$route.query.common != null) {
        //   this.common = this.$route.query.common;
        // }
      },
      loadMyQuestionsData() {
        this.$api.question.getQuestionByPage(this.pageNum, this.pageSize, this.search).then(res => {
          this.common = res.data.common;
          this.questionsList = res.data.questions;
          this.pageInfo = res.data.pageInfo;
          this.search = res.data.search;
        })
      },
      toPage(page) {
        this.pageNum = page;
        this.loadMyQuestionsData();
      },
      toSearch(s) {
        this.search = s;
        this.loadMyQuestionsData();
      },
      readyToRight() {
        return this.common
      },
    }
  }
</script>

<style scoped>

</style>
