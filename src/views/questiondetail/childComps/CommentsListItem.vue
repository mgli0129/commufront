<template>
  <div id="commentsListItem">
    <div class="media-left">
      <img class="media-object img-rounded" :src="'static' + currentComment.user.avatarUrl">
    </div>
    <div class="media-body">
      <span>{{currentComment.user.name}}</span>
      <!--回复内容-->
      <div class="comment_content">
        <span>{{currentComment.content}}</span>
      </div>
      <div class="">
          <span class="glyphicon glyphicon-thumbs-up comment_content_icon"
                aria-hidden="true"></span>
        <span class="glyphicon glyphicon-thumbs-down comment_content_icon"
              aria-hidden="true"></span>
        <span class="glyphicon glyphicon-comment comment_content_icon" aria-hidden="true"
              @click="collapseComments()"></span>
        <span class="badge sub-comment-count">{{currentComment.commentCount}}</span>
        <span class="pull-right comment_content_date">{{currentComment.gmtModified | dateFormat}}</span>
      </div>
      <!--二级评论-->
      <div :class="[{collapse: isCollapse}, 'col-lg-12 col-md-12 col-sm-12 col-xs-12','sub-commented']">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 sub-commented-3" id="second-reply">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 sub-commented-2" v-for="(item, index) in subCommentsList"
               :key="index">
            <div class="media-left">
              <img class="media-object img-rounded" :src="'static' + item.user.avatarUrl">
            </div>
            <div class="media-body">
              <span>{{item.user.name}}</span>
              <!--回复内容-->
              <div class="comment_content">
                <span>{{item.content}}</span>
              </div>
              <div class="pull-right comment_content_date">
                <span>{{formatTime(item.gmtModified)}}</span>
              </div>
            </div>
          </div>
          <input type="text" class="form-control" v-model="subCommentContent" placeholder="评论一下...">
          <button type="button" class="btn btn-success pull-right sub-btn" @click="postSubComment(currentComment.id)">评论
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {leftTime} from 'common/utils.js';

  export default {
    name: "CommentsListItem",
    data() {
      return {
        isCollapse: true,
        subCommentsList: [],
        subCommentContent: '',
        type: 2,
        currentComment: this.comment,
      }
    },
    props: {
      comment: {
        type: Object,
        default: {}
      }
    },
    created(){
      // this.loadComments();
    },
    methods: {
      formatTime(value){
        // const newTime = this.$moment(value).format('YYYY-MM-DD HH:mm:ss')
        // console.log(newTime);
        return leftTime(value,'N');
      },
      loadComments(){
        this.$api.comment.getCommentList(this.currentComment.id).then(res => {
          this.subCommentsList = res.data.comments;
          this.currentComment = res.data.parentComment;
        })
      },
      collapseComments() {
        this.isCollapse = !this.isCollapse;
        this.loadComments();
      },
      postSubComment(id) {
        this.$api.comment.comment({
          parentId: id,
          content: this.subCommentContent,
          type: this.type
        }).then(res => {

          this.subCommentContent = '';
          this.loadComments();

          //定位到指定的地方
          //比如定位到id为"second-reply"的地方
          let scrollToPos = document.querySelector('second-reply');
          window.scrollTo({
            "top": scrollToPos.offsetTop,
            "behavior": 'smooth'
          });
        }).catch(rej => {
          // this.$toast.fail(res.message);
        });

      }
    }
  }
</script>

<style scoped>
  .comment_content {
    margin: 10px 0;
  }

  .comment_content_icon {
    font-size: 16px;
    color: #cccccc;
    cursor: pointer;
    padding-bottom: 5px;
    margin-right: 5px;
  }

  .sub-comment-count {
    display: inline-block;
    min-width: 10px;
    padding: 0;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #ccc;
    border-radius: 10px;
  }

  .comment_content_date {
    color: #cccccc;
  }

  .sub-commented {
    border: 1px solid #eeeeee;
    margin: 14px 0;
    padding: 15px 5px;
  }

  .sub-commented-2 {
    border-bottom: 1px solid #eeeeee;
    padding-top: 5px;
    padding-bottom: 15px;
  }

  .sub-commented-3 {
    margin: 15px 0;
  }

  .sub-btn {
    margin-top: 10px;
  }
</style>
