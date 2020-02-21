<template>
  <div id="new-reply">
    <navigation :common="common" @toSearch="toSearch"></navigation>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 main">
          <new-reply-left class="col-lg-9 col-md-9 col-sm-9 col-xs-12 main-left"
                          @toPage="toPage"
                          :notifications-list="notificationsList"
                          :page-info="pageInfo"
                          :common="common"
                          v-if="readyToLeft()"
          />
          <new-reply-right class="col-lg-3 col-md-3 col-sm-3 col-xs-12 main-right2"
                           :common="common" v-if="readyToRight()"
          />
          <div class="col-lg-1 col-md-1"></div>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Navigation from "components/content/navigation/Navigation";
  import Bottom from "components/content/bottom/Bottom";
  import NewReplyLeft from "./childComps/NewReplyLeft";
  import NewReplyRight from "./childComps/NewReplyRight";


  export default {
    name: "NewReply",
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        search: "",
        notificationsList: [],
        pageInfo: {},
        common: {},
      }
    },
    components: {
      Navigation,
      Bottom,
      NewReplyLeft,
      NewReplyRight
    },
    created() {
      this.loadNotificationsData();
    },
    methods: {
      loadNotificationsData() {
        this.$api.question.getLatelyReply(this.pageNum, this.pageSize).then(res => {
          this.common = res.data.common;
          this.notificationsList = res.data.notifications;
          this.pageInfo = res.data.pageInfo;
        })
      },
      readyToLeft() {
        return this.notificationsList != null
      },
      readyToRight() {
        return this.common
      },
      toPage(page) {
        this.pageNum = page;
        this.loadNotificationsData();
      },
      toSearch(s) {
        this.search = s;
        this.loadNotificationsData();
      },
    }
  }
</script>

<style scoped>

</style>
