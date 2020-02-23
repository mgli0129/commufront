<template>
  <div id="home" ref="home">
    <navigation :common="common" @toSearch="toSearch" @forceReflesh="forceReflesh" @logout="logout"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <main-left class="col-lg-9 col-md-9 col-sm-12 col-xs-12 main-left" :questions-list="showQuestionsList"
                     :page-info="showPageInfo" :common="common" @toPage="toPage" />
          <main-right class="col-lg-3 col-md-3 col-sm-12 col-xs-12 main-right" :hot-topics="hotTopics"/>
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
        questionsList: [],
        hotTopics: [],
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
        return this.questionsList;
      },
      showPageInfo() {
        return this.pageInfo;
      }
    },
    created() {
      this.loadQuestionList();
    },
    // mounted(){
    //   this.loadQuestionList();
    // },
    methods: {
      loadQuestionList() {
        this.$api.question.getIndexByPage(this.pageNum, this.pageSize, this.search).then(res => {
          this.common = res.data.common;
          this.questionsList = res.data.questions;
          console.log(this.questionsList);
          console.log(res.data.questions);
          this.pageInfo = res.data.pageInfo;
          this.search = res.data.search;
          this.hotTopics = res.data.hotTopics;
        }).catch(rej => {
        })
      },
      toPage(page) {
        this.pageNum = page;
        this.loadQuestionList();
      },
      toSearch(s) {
        this.search = s;
        this.loadQuestionList();
      },
      forceReflesh() {
        this.$nextTick(() => {
          this.loadQuestionList();
          // console.log("我已经刷新了首页");
        })
      },
      logout() {
        this.loadQuestionList();
      },

    }
  }
</script>

<style scoped>

</style>
