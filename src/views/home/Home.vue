<template>
  <div class="home">
    <navigation :common="common"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <main-left class="col-lg-9 col-md-9 col-sm-12 col-xs-12 main-left" :questions-list="showQuestionsList"
                     :page-info="showPageInfo"></main-left>
          <main-right class="col-lg-3 col-md-3 col-sm-12 col-xs-12 main-right" :hot-topics="hotTopics"></main-right>
        </div>
        <div class="col-lg-1 col-md-1"></div>
      </div>
    </div>
    <bottom></bottom>

  </div>
</template>

<script>
  import Navigation from "./childComps/Navigation";
  import Bottom from "./childComps/Bottom";
  import MainLeft from "./childComps/MainLeft";
  import MainRight from "./childComps/MainRight";

  export default {
    name: 'Home',

    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        search: "",
        common: {},
        pageInfo: {},
        hotTopics: [],
        questionsList: {
          page: 1,
          list: [],
          pageInfo: {}
        }
      }
    },
    components: {
      Navigation,
      MainLeft,
      MainRight,
      Bottom,
    },
    computed: {
      showQuestionsList() {
        return this.questionsList.list;
      },
      showPageInfo(){
        return this.questionsList.pageInfo;
      }
    },

    created() {
      this.showQuestionList();
    },
    methods: {
      showQuestionList() {
        this.$api.question.getIndexByPage(this.pageNum, this.pageSize, this.searchValue).then(res => {
          this.questionsList.list = res.data.questions;
          this.questionsList.pageInfo = res.data.pageInfo;
          this.search = res.data.search;
          this.hotTopics = res.data.hotTopics;
          this.common = res.data.common;
        })
      }
    }
  }
</script>

<style scoped>

  .main-left {
    border-right: 5px solid var(--color-background);
    padding-left: 15px;
    padding-right: 0;
    background-color: var(--color-main);
  }

  .main-right {
    padding-left: 0;
    padding-right: 0;
    border-left: 5px solid var(--color-background);
    background-color: var(--color-main);
  }

</style>
