<template>
  <div id="question-left">
    <!--问题内容-->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <br>
      <h4><span>{{question.title}}</span></h4>
      <br>
      <span class="viewfontformat">作者 {{question.user.name}} |</span>
      <span class="viewfontformat">发布时间 {{question.gmtCreate | dateFormat}} |</span>
      <span class="viewfontformat">阅读数： {{question.viewCount}}</span>
      <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr1">
      <div id="question_content">
        <!--使用mavon-editor显示Markdown语法的内容-->
        <mavon-editor :value="question.content" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen"
                      :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable"
                      :scrollStyle="prop.scrollStyle" :boxShadow="prop.boxShadow"
                      :ishljs="prop.ishljs"
                      :externalLink="prop.externalLink"
        ></mavon-editor>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_edit">
        <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr2">
        <!--标签-->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-tag">
          <span class="label label-info index-font-size" v-for="(tag,index) in splitTags()">
            <span class="glyphicon glyphicon-tags"> </span>
            <span>{{tag}}</span>
          </span>
          <a @click="edit()"
             v-if="isEditable()"><span
            class="glyphicon glyphicon-edit"></span><span
            class="viewfontformat">编辑</span></a>
        </div>
        <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr2">
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_edit"
           v-if="question.tag.length < 1">
        <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr2">
      </div>
    </div>
    <!--回复列表-->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <h4>共【{{question.commentCount}}】个回复</h4>
      <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr1">
      <comments-list-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12 commented"
                          v-for="(comment, index) in commentsList" :key="index" :comment="comment"
                          v-if="comment.id !== undefined">
      </comments-list-item>
    </div>
    <!--分割线-->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_reply">
      <h4>提交回复</h4>
      <hr class="col-lg-12 col-md-12 col-sm-12 col-xs-12 comment_top_hr1">
    </div>
    <!--提交回复-->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="comment_area">
      <div class="media-left" v-if="userIsNotNull()">
        <img class="media-object img-rounded" :src="loadCurAvatar()">
      </div>
      <div class="media-body media-body-avartar-name" v-if="userIsNotNull()">
        <span>{{loadCurName()}}</span>
      </div>
      <div class="question-div-publish-textarea">
        <input type="hidden" name="parentId" id="parentId" v-model="questionId">
        <textarea name="content" id="content" class="form-control" rows="10"
                  v-model="commentContent"></textarea>
      </div>
      <div class="question-div-publish-btn pull-right">
        <button type="button" class="btn btn-success btn-publish" @click="postComment()">回复</button>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentsListItem from "./CommentsListItem";

  export default {
    name: "QuestionLeft",
    data() {
      return {
        questionContent: '',
        commentContent: '',
        type: 1,
        questionId: this.question.id,
        defaultDate: 'preview'
      }
    },
    props: {
      question: {
        type: Object,
        default: {}
      },
      common: {
        type: Object,
        default: {}
      },
      commentsList: {
        type: Array,
        default: []
      },
    },
    components: {
      CommentsListItem,
    },
    created() {
      // this.initData();
    },
    watch: {
      question: function (newQuestion) {
        this.questionId = newQuestion.id;
      }
    },

    computed: {
      /**
       * 设置markdown显示参数
       * @returns {{boxShadow: boolean, subfield: boolean, editable: boolean, scrollStyle: boolean,
       * defaultOpen: string, toolbarsFlag: boolean}}
       */
      prop() {
        let data = {
          subfield: false, // 单双栏模式
          defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: false,
          toolbarsFlag: false,
          scrollStyle: false,
          boxShadow: false,
          ishljs: true,
          externalLink: true,
        };
        return data;
      }
    },
    methods: {
      initData() {
        this.questionId = this.question.id;
      },

      isEditable() {
        return this.common && this.common.userId === this.question.user.id
      },

      splitTags() {
        return this.question.tag.split(',');
      },

      loadCurAvatar() {
        if (this.userIsNotNull()) {
          return 'static' + this.common.avatarUrl;
        } else {
          return 'static/imges/default_logo.jgp'
        }
      },
      loadCurName() {
        return this.userIsNotNull() ? this.common.userName : 'no one'
      },

      userIsNotNull() {
        return this.common
      },

      postComment() {
        this.$api.comment.comment({
          parentId: this.questionId,
          content: this.commentContent,
          type: this.type
        }).then(res => {
          //清空回复框内容
          this.commentContent = '';
          //页面定位到顶部
          window.scrollTo(0, 0);
          //刷新页面
          return this.$emit("reloadQuestion", this.questionId);
        })
      },
      edit() {
        let params = {
          id: this.question.id,
          common: this.common
        }
        this.$router.push(
          {
            path: '/publish',
            query: {params}
          }
        )
      },

    }
  }
</script>

<style scoped>
  .comment_top_hr1 {
    margin-top: 5px;
  }

  .comment_top_hr2 {
    margin: 5px 0;
    padding: 0;
  }

  .comment_edit {
    padding: 30px 0 15px 0;
  }

  .question-tag {
    padding-left: 0;
  }

  .index-font-size {
    font-size: 12px;
    margin-right: 5px;
  }

  .commented {
    border-bottom: 1px solid #eeeeee;
    padding-top: 13px;
  }

  .comment_reply {
    margin: 15px 0;
  }

  .media-body-avartar-name {
    padding-top: 8px;
  }

  .question-div-publish-textarea {
    padding: 0;
    margin: 10px 0 20px 0;
  }

  .question-div-publish-btn {
    margin: 10px 0 30px 0;
  }

  .question-div-publish-textarea {
    padding: 0;
    margin: 10px 0 20px 0;
  }

</style>
