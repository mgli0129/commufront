<template>
  <div id="my-questions-left">
    <br>
    <h4>我的问题</h4>
    <hr class="index-hr-top">
    <questions-list-item v-for="(item, index) in questionsList"
                         :key="index" :question="item" :edit-value="editValue" :belongs-to-value="belongsToValue"
                         :common="common" v-if="readyToLeft(item)">
    </questions-list-item>
    <page :page-info="pageInfo" @toPage="toPage"></page>
  </div>
</template>

<script>
  import QuestionsListItem from "components/content/questionlistitem/QuestionsListItem";
  import Page from "components/common/page/Page";

  export default {
    name: "MyQuestionsLeft",
    data() {
      return {
        editValue: true,
        belongsToValue: 'ME',
      }
    },
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
    components: {
      QuestionsListItem,
      Page
    },
    methods: {
      toPage(page) {
        return this.$emit("toPage", page);
      },
      readyToLeft() {
        return this.questionsList != null
      },
    }
  }
</script>

<style scoped>
</style>
