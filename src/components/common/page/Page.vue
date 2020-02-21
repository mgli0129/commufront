<template>
  <div id="page">
    <nav class="nav-right index-nav" aria-label="Page navigation">
      <ul class="pagination pagination-md">
        <li v-if="pageInfo.pageNum > 5" aria-label="Previous">
          <a aria-label="Previous" @click="toPage(1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-if="pageInfo.hasPreviousPage">
          <a @click="toPage(pageInfo.prePage)">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li v-for="(pageNum,index) in pageInfo.navigatepageNums" :key="index"
            :class="[pageInfo.pageNum === pageNum ? 'active' : '']">
          <a @click="toPage(pageNum)">{{pageNum}}</a>
        </li>
        <li v-if="pageInfo.hasNextPage">
          <a @click="toPage(pageInfo.nextPage)">
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li v-if="pageInfo.pageNum < pageInfo.pages" aria-label="Next">
          <a aria-label="Next" @click="toPage(pageInfo.pages)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Page",
    props: {
      pageInfo: {
        type: Object,
        default: {}
      },
    },
    watch: {
      pageInfo: function (newValue) {
        this.pageInfo = newValue;
      }
    },
    methods: {
      toPage(page) {
        return this.$emit("toPage", page);
      }
    }
  }
</script>

<style scoped>
  .nav-right {
    float: right;
    margin-right: 30px;
  }

  .index-nav {
    margin-right: 30px;
  }
</style>
