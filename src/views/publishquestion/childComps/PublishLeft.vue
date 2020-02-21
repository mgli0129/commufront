<template>
  <div id="publish-left">
    <h3><span class="glyphicon glyphicon-hand-right" aria-hidden="true" :toolbars="toolbars"></span>&nbsp;提问</h3>
    <hr>
    <div class="form-group">
      <label for="title">问题标题（简单扼要）:</label>
      <input type="text" class="form-control" id="title" name="title" v-model="title"
             autocomplete="off" placeholder="问题标题...">
    </div>
    <label for="content">问题补充 (必填，请参照右侧提示):</label>
    <div class="form-group" id="question-editor">
      <mavon-editor
        v-model="content"
        id="content"
        ref=md
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
      />
    </div>
    <button @click="uploadImg" class="btn btn-default">上传图片</button><span class="tips-color">*若有上传图片，请统一点击上传</span>
    <div class="form-group">
      <label for="tag">添加标签:</label>
      <input type="text" class="form-control" id="tag" name="tag" v-model="tag" autocomplete="off"
             placeholder="多个标签以，隔开" @click="showSelectTags()">
    </div>
    <!--#############第一种方式实现显示标签和子标签###########-->
    <!--<div id="selectTags" :class="{ 'publish-selectTags': isShowTags}">-->
      <!--&lt;!&ndash; Nav tabs &ndash;&gt;-->
      <!--<ul class="nav nav-tabs" role="tablist">-->
        <!--<li role="presentation" v-for="(selectedTag, index) in selectTagsList" :key="index">-->
          <!--<a :href="'#'+ selectedTag.categoryName" aria-controls="home" role="tab"-->
             <!--data-toggle="tab">{{selectedTag.categoryName}}-->
          <!--</a>-->
        <!--</li>-->
      <!--</ul>-->
      <!--&lt;!&ndash; Tab panes &ndash;&gt;-->
      <!--<div class="tab-content">-->
        <!--<div role="tabpanel" class="tab-pane fade in publish-taglib-tag" :id="selectedTag.categoryName"-->
             <!--v-for="(selectedTag, index) in selectTagsList" :key="index">-->
             <!--<span class="label label-info tag-style publish-taglib-cursor"-->
                   <!--v-for="(sTag, index) in selectedTag.tags" :key="index">-->
                   <!--<span class="glyphicon glyphicon-ok-circle" @click="setTag(sTag)">-->
                     <!--<span class="tag-font-size">{{sTag}}</span></span>-->
            <!--</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>    -->
    <!--#############第二种方式实现显示标签和子标签###########-->
    <div id="selectTags" :class="{ 'publish-selectTags': isShowTags}">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: index === currentIndex }" role="presentation" v-for="(selectedTag, index) in selectTagsList"
            :key="index" @click="showTagsDetail(index)">
          <a  aria-controls="home" role="tab"
             data-toggle="tab">{{selectedTag.categoryName}}
          </a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" :class="['tab-pane fade in publish-taglib-tag',{active: index === currentIndex}]"
             v-for="(selectedTag, index) in selectTagsList" :key="index">
             <span class="label label-info tag-style publish-taglib-cursor"
                   v-for="(sTag, index) in selectedTag.tags" :key="index">
                   <span class="glyphicon glyphicon-ok-circle" @click="setTag(sTag)">
                     <span class="tag-font-size">{{sTag}}</span></span>
            </span>
        </div>
      </div>
    </div>
    <div class="publish-div-btn">
      <button class="btn btn-success publish-btn" @click="publishQuestion()">发布</button>
    </div>
    <div class="alert alert-danger publish-error" style="margin-top:60px;" role="alert"
         v-if="errorMessage != ''">
      <p>{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: "PublishLeft",
    data() {
      return {
        questionId: 0,
        title: '',
        content: '',
        tag: '',
        isShowTags: true,
        currentIndex: 0,
        selectTagsList: [],
        errorMessage: '',
        img_file: {},  /*存储需要上传对文件*/

        /*
            默认工具栏按钮全部开启, 传入自定义对象
            例如: {
            bold: true, // 粗体
            italic: true,// 斜体
            header: true,// 标题
            }
            此时, 仅仅显示此三个功能键
          */
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }

      }
    },
    props: {
      question: {
        type: Object,
        default: {}
      }
    },
    watch: {
      question: function (newValue) {
        this.question = newValue;
        this.initData();
      }
    },
    created() {
      this.loadSelectedTags();
      this.initData();
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
          defaultOpen: "edit", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: false,
          toolbarsFlag: false,
          scrollStyle: false,
          boxShadow: false,
        };
        return data;
      }
    },
    methods: {
      initData(){
        if(this.question != null) {
          this.questionId = this.question.id;
          this.title = this.question.title;
          this.content = this.question.content;
          this.tag = this.question.tag;
        }
      },
      loadSelectedTags() {
        this.$api.publish.getSelectedTags().then(res => {
          this.selectTagsList = res.data.selectTags;
        })
      },
      showSelectTags() {
        this.isShowTags = !this.isShowTags;
        this.currentIndex = 0;

        /*###############以下代码是第一种实现显示标签和子标签中使用的#############*/
        /*####这些代码是通过jQuery方式操作Dom元素，设置相应的class####*/
        //给第一个li增加active class
        // $("#selectTags").children("ul").children("li").eq(0).addClass("active");
        //给第一个sheet设置active class
        // $("#selectTags").children("div").eq(0).children("div").eq(0).addClass("active");

      },
      showTagsDetail(index) {
        this.currentIndex = index;
      },

      //设置tag
      setTag(value) {
        if (this.tag === undefined || this.tag === '') {
          this.tag = value;
        } else {
          this.tag = this.tag + ',' + value;
        }
      },

      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 缓存图片信息
        this.img_file[pos] = $file;
      },
      // 删除缓存的图片
      $imgDel(pos) {
        delete this.img_file[pos];
      },

      uploadImg($e) {
        // 第一步.将图片上传到服务器.
        let formData = new FormData();
        for (var _img in this.img_file) {
          formData.append("files", this.img_file[_img]);
        }

        this.$api.upload.upload(formData).then(res => {
          /**
           * 例如：返回数据为 res = [[pos, url], [pos, url]...]
           * pos 为原图片标志（0）
           * url 为上传后图片的url地址
           */
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          const urlList = res.data.urlList;
          for (let i = 0; i < urlList.length; i++) {
            // $vm.$img2Url 详情见本页末尾
            this.$refs.md.$img2Url(i + 1, urlList[i]);
          }
          this.$toast({
            message: "图片上传成功！",
            duration: 2000,
            forbidClick: true
          });
        }).catch(rej => {
        });
      },

      /**
       * 发布问题
       */
      publishQuestion() {
        // this.uploadImg();
        this.$api.publish.publishQuestion({
          title: this.title,
          content: this.content,
          tag: this.tag,
          id: this.questionId,
        }).then(res => {
          this.$router.push({
            path: "/home",
            query: {}
          });
        })
      }

    }

  }
</script>

<style scoped>
  .publish-selectTags {
    display: none;
  }

  .publish-taglib-tag {
    margin: 15px 15px 30px 15px;
  }

  .tag-style {
    font-size: 12px;
    margin-right: 10px;
    line-height: 30px;
  }

  .publish-taglib-cursor {
    cursor: pointer;
  }

  .tag-font-size {
    font-size: 14px;
  }

  .publish-div-btn {
    padding: 1px 0;
    margin-right: 30px;
  }

  .publish-error {
    margin-top: 45px;
  }

  .publish-btn {
    margin-bottom: 15px;
    width: 80px;
    float: right;
  }

  .tips-color{
    color: red;
  }

</style>
