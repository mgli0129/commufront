<template>
  <div id="new-reply-left">
    <br>
    <h4 class="reply-title">最新回复</h4>
    <div class="reply-all-read" v-if="common.countUnread != 0">
      <a class="btn btn-primary btn-xs reply-all-read-btn" @click="clearNotifications()" role="button">全部已读</a>
    </div>
    <hr class="reply-hr-top">
    <div class="media index-content" v-for="(notification, index) in notificationsList" :key="index">
      <span>{{notification.notifierName}} </span>
      <span>{{notification.notificationTypeName}} </span>
      <a @click="readNotification(notification.id)"><span>{{notification.notifyTitle}}</span></a>
      <span class="label label-danger index-font-size">{{notification.notificationStatusName}}</span>
    </div>
    <page :page-info="pageInfo" @toPage="toPage"></page>
  </div>
</template>

<script>
  import Page from "components/common/page/Page";

  export default {
    name: "NewReplyLeft",
    props: {
      notificationsList: {
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
      Page
    },
    methods: {
      clearNotifications() {
        this.$api.notification.clearNotifications().then(res => {
          this.$toast({
            message: "全部通知已读！",
            duration: 2000,
            forbidClick: true
          });
        })
        //刷新页面
        this.toPage(1);
      },
      goToQuestion(qId) {
        this.$router.push({
          path: '/detail',
          query: {id: qId}
        })
      },
      readNotification(nId) {
        this.$api.notification.readNotifyMessage(nId).then(res => {
          this.$toast({
            message: "已读该通知...",
            duration: 2000,
            forbidClick: true
          });
          //成功后跳转问题详情页面
          this.goToQuestion(res.data.id);
        })
      },
      toPage(page) {
        return this.$emit("toPage", page);
      },
    }
  }
</script>

<style scoped>
  .reply-title {
    margin-bottom: 0;
  }

  .reply-all-read {
    text-align: right;
    margin: 0;
    padding: 0;
  }

  .reply-all-read-btn {
    margin-right: 30px;
    padding: 0 5px;
    color: white;
    font-weight: 800;
  }

  .reply-all-read-btn:hover {
    color: red;
  }

  .reply-hr-top {
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px;
    border-top: 2px solid #eee;
  }

  .index-content {
    margin: 0 30px 0 0;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 0;
  }

  .index-font-size {
    font-size: 12px;
    margin-right: 5px;
  }
</style>
