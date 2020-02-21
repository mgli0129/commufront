<template>
  <div id="hot-topics-left">
    <h3><span class="glyphicon glyphicon-fire" aria-hidden="true"></span>&nbsp;{{tag}}</h3>
    <hr class="index-hr-top">

    <div id="selectTags" class="publish-selectTags" style="display: block;">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" v-for="(_tab, index) in tabsList" :key="index"
            :class="{active: currentIndex === index}">
          <a class="hottopic-tab" aria-controls="home" role="tab"
             data-toggle="tab" @click="chooseTag(index)">{{_tab.name}}</a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" :class="[{active: currentIndex === index},'tab-pane fade in publish-taglib-tag']"
             v-for="(_tab, index) in tabsList" :key="index">
          <questions-list-item v-for="(item, index) in questionsList"
                               :key="index" :question="item" :common="common"/>
        </div>
      </div>
      <page :page-info="pageInfo" @toPage="toPage"></page>
    </div>
  </div>
</template>

<script>
  import QuestionsListItem from "components/content/questionlistitem/QuestionsListItem";
  import Page from "components/common/page/Page";

  export default {
    name: "HotTopicsLeft",
    data() {
      return {
        currentIndex: 0,
      }
    },
    props: {
      tag: String,
      pageInfo: {
        type: Object,
        default: {}
      },
      questionsList: {
        type: Array,
        default: []
      },
      tabsList: {
        type: Array,
        default: []
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
      chooseTag(index) {
        this.$emit("changeTab", this.tabsList[index].index, this.tag);
        this.currentIndex = index;
      },
      goToQuestion(qId) {
        this.$router.push({
          path: '/detail',
          query: {id: qId}
        })
      },
      toPage(page) {
        return this.$emit("toPage", page);
      }
    }

  }
</script>

<style scoped>

  .publish-selectTags {
    display: none;
  }

  .hottopic-tab:hover {
    cursor: pointer;
  }

  .publish-taglib-tag {
    margin: 15px 15px 30px 15px;
  }

</style>
