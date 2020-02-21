<template>
  <div id="hot-topics">
    <navigation :common="common" @toSearch="toSearch"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <hot-topics-left class="col-lg-9 col-md-9 col-sm-12 col-xs-12 main-left"
                           :tag="tag" :page-info="pageInfo" :questions-list="questionsList"
                           :common="common"
                           :tabs-list="tabsList" v-if="tabsList != undefined"
                           @toPage="toPage" @changeTab="changeTab"
          ></hot-topics-left>
          <hot-topics-right class="col-lg-3 col-md-3 col-sm-12 col-xs-12 main-right"
                            :tag-users-list="tagUsersList" :hot-topic-data="hotTopicData"
                            v-if="tagUsersList != undefined"
          ></hot-topics-right>
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
  import HotTopicsLeft from "./childComps/HotTopicsLeft";
  import HotTopicsRight from "./childComps/HotTopicsRight";

  export default {
    name: "HotTopics",
    data() {
      return {
        id: 1, /* 1 --- 最多回复数列表查询; 2 --- 最多阅读数列表查询*/
        tag: this.$route.query.tag,
        pageNum: 1,
        pageSize: 15,
        search: "",
        common: {},
        pageInfo: {},
        questionsList: [],
        tabsList: [],
        tagUsersList: [],
        hotTopicData: {},
      }
    },
    created() {
      this.loadHotTopicsData();
    },
    components: {
      Navigation,
      Bottom,
      HotTopicsLeft,
      HotTopicsRight
    },
    methods: {
      loadHotTopicsData() {
        this.$api.hottopics.getHotTopics(
          this.id, this.tag, this.pageNum, this.pageSize, this.search
        ).then(res => {
          this.questionsList = res.data.questions;
          this.common = res.data.common;
          this.search = res.data.search;
          this.pageInfo = res.data.pageInfo;
          this.tabsList = res.data.tabs;
          this.tagUsersList = res.data.tagUsers;
          this.hotTopicData = res.data.hotTopicData;
          this.id = res.data.id;
        })
      },
      toSearch(s) {
        this.search = s;
        this.loadHotTopicsData();
      },
      toPage(page) {
        this.pageNum = page;
        this.loadHotTopicsData();
      },
      changeTab(id, tag) {
        this.id = id;
        this.tag = tag;
        this.pageNum = 1;
        this.loadHotTopicsData();
      }
    }
  }
</script>

<style scoped>
</style>
