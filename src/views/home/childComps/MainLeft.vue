<template>
  <div id="main-left">
    <h3><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>&nbsp;发现</h3>
    <hr class="index-hr-top">
    <questions-list-item v-for="(item, index) in questionsList"
                         :key="index" :question="item" :common="common"/>
    <page :page-info="pageInfo" @toPage="toPage"></page>
  </div>
</template>

<script>
  import QuestionsListItem from "components/content/questionlistitem/QuestionsListItem";
  import Page from "components/common/page/Page";

  export default {
    name: "MainLeft",
    props: {
      questionsList: {
          type: Array,
          default: []
      },
      pageInfo: {
        type: Object,
        default: {}
      },
      common: {
        type: Object,
        default: {}
      },
    },
    components:{
      QuestionsListItem,
      Page,
    },
    methods:{
      toPage(page){
        return this.$emit("toPage", page);
      }
    }

  }
</script>

<style scoped>
</style>
