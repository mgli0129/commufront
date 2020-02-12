<template>
  <div id="mainLeft">
    <h3><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>&nbsp;发现</h3>
    <hr class="index-hr-top">
    <questions-list-item v-for="(item, index) in questionsList"
                         :key="index" :question="item">
    </questions-list-item>

    <nav class="nav-right index-nav" aria-label="Page navigation">
      <ul class="pagination pagination-md">
        <li v-if="pageInfo.pageNum > 5" aria-label="Previous">
          <a href="/pageNum=1" + aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
          <a :href="'/pageNum='+pageInfo.prePage">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li v-for="(pageNum,index) in pageInfo.navigatepageNums" :key="index"
            :class="[pageInfo.pageNum == pageNum ? 'active' : '']">
          <a :href="'/pageNum='+ pageNum">{{pageNum}}
          </a>
        </li>
        <li v-if="pageInfo.hasNextPage">
          <a :href="'/pageNum=' + pageInfo.nextPage">
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li v-if="pageInfo.pageNum < pageInfo.pages" aria-label="Next">
          <a :href="'/pageNum='+pageInfo.total" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!--    <div class="alert alert-danger" style="margin-top:60px;" role="alert" v-if="${error != null}">-->
    <!--      <p th:text="${error}"></p>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import QuestionsListItem from "./QuestionsListItem"

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
      }
    },
    components:{
      QuestionsListItem
    }

  }
</script>

<style scoped>

  .index-hr-top {
    margin-top: 20px;
    margin-bottom: 5px;
    border: 1px;
    border-top: 2px solid #eee;
  }


  .nav-right {
    float: right;
    margin-right: 30px;
  }

  .index-nav {
    margin-right: 30px;
  }

</style>
