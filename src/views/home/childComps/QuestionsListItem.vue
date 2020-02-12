<template>
  <div id="questionsListItem" class="media index-content" >
    <div class="media-left">
      <a href="#">
        <img class="media-object img-rounded" v-lazy="getImg" :key="getImg">
      </a>
    </div>
    <div class="media-body">
      <a :href="'/question/'+question.id">
        <h4 class="media-heading index-content-head">{{question.title}}</h4>
      </a>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 question-tag">
                        <span class="label label-info index-font-size"
                              v-for="(tag,index) in question.tag.split(',')">
                                <span class="glyphicon glyphicon-tags"> </span>
                                <span>{{tag}}</span>
                        </span>
        <span class="viewfontformat viewfontformat-dot-big">•</span>
        <span class="viewfontformat">{{question.user.name}}发起了问题</span>
        <span class="viewfontformat">•</span>
        <span class="viewfontformat">{{question.commentCount}}个回复</span>
        <span class="viewfontformat">•</span>
        <span class="viewfontformat">{{question.viewCount}}次浏览</span>
        <span class="viewfontformat">•</span>
        <!--          <span class="viewfontformat">{{dates.format(question.gmtModified,'yyyy-MM-dd HH:mm:ss')}}</span>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuestionsListItem",
    props: {
      question: {
        type: Object,
        default: {}
      }
    },
    computed: {
      getImg(){
        console.log(this.question);
        return this.question.user.avatarUrl
      }
    },
  }
</script>

<style scoped>
  .media-object {
    width: 38px;
    height: 38px;
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

  .question-tag {
    padding-left: 0;
  }

  .viewfontformat {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999;
  }

  .viewfontformat-dot-big {
    FONT-SIZE: small;
  }

</style>
